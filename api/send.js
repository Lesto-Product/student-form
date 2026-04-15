const { Resend } = require("resend");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subject, text, html } = req.body;

  if (!text || !subject) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const recipient = process.env.EMAIL_RECEIVING_ADDRESS || "k.krystev@lestoproduct.com";

  try {
    await resend.emails.send({
      from: "Анкета ППМГ 2026 <students@form.lestoproduct.com>",
      to: recipient,
      subject,
      text,
      html: html || undefined,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Email send failed:", err.message);
    return res.status(500).json({ error: "Failed to send email", detail: err.message });
  }
};
