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
      console.log('Attempting to send email...');
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '2k23.csai2313425@gmail.com',
          pass: process.env.GMAIL_PASS, // Still need app password from env
        },
        secure: true,
        port: 465,
      });

      const mailOptions = {
        from: '2k23.csai2313425@gmail.com',
        to: '2k23.csai2313425@gmail.com', // Direct hardcoded email
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

      console.log('Mail options:', {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject
      });
      
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      
      return res.status(200).json({ 
        message: 'Contact information saved and email sent successfully', 
        data,
        emailId: info.messageId
      });
      
    } catch (mailError) {
      console.error('Error sending email:', mailError);
      
      // Return success for Supabase save but include email error
      return res.status(200).json({
        message: 'Contact information saved successfully, but failed to send email notification.',
        data,
        emailError: mailError.message,
        emailErrorDetails: {
          code: mailError.code,
          command: mailError.command,
          response: mailError.response,
          responseCode: mailError.responseCode
        }
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
