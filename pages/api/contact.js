import { supabase } from '../../lib/supabaseClient';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 1. Save to Supabase (messages table)
    const { data, error } = await supabase
      .from('messages')
      .insert([{ name, email, message, status: 'pending' }]);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    // 2. Send emails using Gmail (Nodemailer)
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
  subject: `✨ New Contact Form Submission from ${name}`,
  html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background: #f3f4f6;
        margin: 0;
        padding: 20px;
        color: #111827;
      }
      .container {
        max-width: 640px;
        margin: auto;
        background: #ffffff;
        border-radius: 18px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        overflow: hidden;
      }
      /* ===== HEADER ===== */
      .header {
        background: linear-gradient(135deg, #4f46e5, #3b82f6, #2563eb);
        color: #fff;
        padding: 36px 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
      }
      .header img {
        width: 36px;
        height: 36px;
      }
      /* ===== CONTENT ===== */
      .content {
        padding: 32px 28px;
        line-height: 1.7;
        font-size: 15px;
      }
      .field {
        margin-bottom: 18px;
      }
      .field strong {
        color: #111;
        font-weight: 600;
        display: inline-block;
        min-width: 90px;
      }
      .message {
        background: #f9fafb;
        padding: 20px;
        border-left: 4px solid #4f46e5;
        border-radius: 10px;
        margin-top: 12px;
        font-size: 15px;
        line-height: 1.6;
        color: #374151;
      }
      /* ===== BUTTON ===== */
      .button-wrapper {
        text-align: center;
        margin: 36px 0 16px;
      }
      .button {
        display: inline-block;
        background: linear-gradient(90deg, #4f46e5, #3b82f6);
        color: white !important;
        padding: 14px 36px;
        font-size: 15px;
        font-weight: 600;
        border-radius: 12px;
        text-decoration: none;
        box-shadow: 0 4px 16px rgba(99,102,241,0.35);
        transition: all 0.3s ease;
      }
      .button:hover {
        background: linear-gradient(90deg, #4338ca, #1d4ed8);
      }
      /* ===== FOOTER ===== */
      .footer {
        background: #f9fafb;
        text-align: center;
        padding: 22px;
        font-size: 13px;
        color: #6b7280;
        border-top: 1px solid #eee;
      }
      .footer a {
        color: #2563eb;
        text-decoration: none;
        font-weight: 500;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- HEADER -->
      <div class="header">
        <h1>
          <img src="https://img.icons8.com/color/48/000000/filled-message.png" alt="Mail Icon"/>
          New Contact Submission
        </h1>
      </div>
      
      <!-- CONTENT -->
      <div class="content">
        <div class="field"><strong>Name:</strong> ${name}</div>
        <div class="field"><strong>Email:</strong> <a href="mailto:${email}" style="color:#2563eb; text-decoration:none;">${email}</a></div>
        <div class="field"><strong>Message:</strong></div>
        <div class="message">${message.replace(/\n/g, '<br>')}</div>
        
        <!-- BUTTON -->
        <div class="button-wrapper">
          <a href="mailto:${email}" class="button">✉️ Reply to ${name}</a>
        </div>
      </div>
      
      <!-- FOOTER -->
      <div class="footer">
        <p>This message was sent from your <a href="#">Portfolio Contact Form</a></p>
      </div>
    </div>
  </body>
  </html>
  `,
  text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
};
      mailOptions.headers = {
        'X-Priority': '1', // High priority
        'X-MSMail-Priority': 'High',
        'Importance': 'High',
      };
      mailOptions.attachments = [
  {
    filename: 'contact-form-submission.txt',
    content: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  },
];

      // Send notification email to admin/inbox
      const adminInfo = await transporter.sendMail(mailOptions);

      // Send confirmation email to the user
      const userMailOptions = {
        from: `kartik Team <${gmailUser}>`,
        to: email,
        subject: `Thanks for reaching out, ${name}!`,
        text: `Hi ${name},\n\nThanks for reaching out! We’ve received your message and will get back to you soon.\n\nBest regards,\nkartik Team`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body { font-family: 'Inter','Segoe UI',Roboto,Helvetica,Arial,sans-serif; background:#f8fafc; margin:0; padding:24px; color:#0f172a; }
            .container { max-width:640px; margin:auto; background:#ffffff; border-radius:14px; box-shadow:0 10px 24px rgba(0,0,0,0.06); overflow:hidden; }
            .header { background:linear-gradient(135deg,#22c55e,#06b6d4); color:#fff; padding:28px 24px; text-align:center; font-weight:700; font-size:20px; }
            .content { padding:24px; font-size:15px; line-height:1.7; }
            .footer { background:#f8fafc; color:#64748b; font-size:13px; text-align:center; padding:16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">We received your message</div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thanks for reaching out! We’ve received your message and will get back to you soon.</p>
              <p style="margin-top:18px;">Best regards,<br/>🚀 kartik Team</p>
            </div>
            <div class="footer">This is an automated confirmation. No action is required.</div>
          </div>
        </body>
        </html>
        `,
      };

      const userInfo = await transporter.sendMail(userMailOptions);

      return res.status(200).json({
        message: 'Saved and emails sent successfully',
        data,
        adminEmailId: adminInfo.messageId,
        userEmailId: userInfo.messageId
      });
      
    } catch (mailError) {
      console.error('Error sending email:', mailError);
      return res.status(500).json({
        error: 'Failed to send email notification',
        details: mailError.message
      });
    }
  } else if (req.method === 'GET') {
    // Fetch messages ordered by date desc
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ messages: data });
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
