const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subject, text, html } = req.body;

  if (!text || !subject) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    tls: {
      rejectUnauthorized: false,
    },
  });

  const recipient = process.env.EMAIL_RECEIVING_ADDRESS || process.env.EMAIL_USER;

  try {
    await transporter.sendMail({
      from: `"Анкета ППМГ 2026" <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject,
      text,
      html: html || undefined,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Email send failed:", err.message, err.code);
    return res.status(500).json({ error: "Failed to send email", detail: err.message });
  }
};
