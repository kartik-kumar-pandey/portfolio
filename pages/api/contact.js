import { supabase } from '../../lib/supabaseClient';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 1. Save to Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // 2. Send email using Gmail (Nodemailer)
    try {
      console.log('Attempting to send email...');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER, // send to yourself
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      console.log('Mail options:', mailOptions);
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info);
    } catch (mailError) {
      console.error('Error sending email:', mailError);
      // Email failed, but Supabase save succeeded
      return res.status(200).json({
        message: 'Contact information saved, but failed to send email notification.',
        data,
        mailError: mailError.message,
      });
    }

    return res.status(200).json({ message: 'Contact information saved and email sent successfully', data });
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
