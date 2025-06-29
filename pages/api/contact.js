import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Contact information saved successfully', data });
  } else if (req.method === 'GET') {
    // Fetch contacts with formatted timestamp
    const { data, error } = await supabase.rpc('get_contacts_with_formatted_timestamp');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ contacts: data });
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
