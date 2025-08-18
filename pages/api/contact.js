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
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    // 2. Send email using Gmail (Nodemailer)
    try {
      const gmailUser = process.env.GMAIL_USER || '2k23.csai2313425@gmail.com';
      const gmailPass = process.env.GMAIL_PASS;
      const emailTo = process.env.CONTACT_TO || gmailUser;

      if (!gmailPass) {
        return res.status(500).json({
          error: 'Email service not configured',
          details: 'Missing GMAIL_PASS environment variable.'
        });
      }

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });

      const mailOptions = {
        from: `Portfolio Contact <${gmailUser}>`,
        to: emailTo,
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Sent from your portfolio contact form</small></p>
        `,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      const info = await transporter.sendMail(mailOptions);

      return res.status(200).json({ 
        message: 'Contact information saved and email sent successfully', 
        data,
        emailId: info.messageId
      });
      
    } catch (mailError) {
      console.error('Error sending email:', mailError);
      return res.status(500).json({
        error: 'Failed to send email notification',
        details: mailError.message
      });
    }
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
