import { supabase } from '../../lib/supabaseClient';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ messages: data });
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body;
    if (!id || !status) return res.status(400).json({ error: 'id and status are required' });
    const { data, error } = await supabase
      .from('messages')
      .update({ status })
      .eq('id', id)
      .select('*')
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: data });
  }

  if (req.method === 'POST') {
    const { to, subject, text, html, name } = req.body;
    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({ error: 'to, subject and text or html are required' });
    }

    try {
      const gmailUser = process.env.GMAIL_USER || '2k23.csai2313425@gmail.com';
      const gmailPass = process.env.GMAIL_PASS;
      if (!gmailPass) {
        return res.status(500).json({ error: 'Email service not configured' });
      }
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { user: gmailUser, pass: gmailPass },
      });

      const safeText = text || '';
      const greetingName = name || 'there';
      const generatedHtml = html || `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { font-family: 'Inter','Segoe UI',Roboto,Helvetica,Arial,sans-serif; background:#0b0b0f; margin:0; padding:24px; color:#e5e7eb; }
          .container { max-width:640px; margin:auto; background:#111111; border-radius:14px; box-shadow:0 10px 24px rgba(0,0,0,0.4); border:1px solid rgba(139,92,246,0.25); overflow:hidden; }
          .header { background: linear-gradient(135deg,#8b5cf6,#7c3aed); color:#fff; padding:24px; text-align:center; font-weight:800; font-size:20px; letter-spacing:0.3px; }
          .content { padding:24px; font-size:15px; line-height:1.8; }
          .message { white-space:pre-wrap; background:#1a1a1a; border:1px solid rgba(139,92,246,0.25); padding:16px; border-radius:12px; color:#d1d5db; }
          .footer { background:#0f0f14; color:#9ca3af; font-size:13px; text-align:center; padding:16px; border-top:1px solid rgba(139,92,246,0.15); }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Reply from Kartik</div>
          <div class="content">
            <p>Hi ${greetingName},</p>
            <div class="message">${safeText.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br/>')}</div>
            <p style="margin-top:18px;">Best regards,<br/>— kartik</p>
          </div>
          <div class="footer">Sent from the Admin Dashboard</div>
        </div>
      </body>
      </html>`;

      const info = await transporter.sendMail({ from: `kartik <${gmailUser}>`, to, subject, text: safeText, html: generatedHtml });
      return res.status(200).json({ emailId: info.messageId });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}


