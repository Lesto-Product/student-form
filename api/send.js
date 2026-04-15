const { Resend } = require("resend");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subject, text, html } = req.body;

  if (!text || !subject) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "RESEND_API_KEY not configured" });
  }

  const resend = new Resend(apiKey);
  const recipient = process.env.EMAIL_RECEIVING_ADDRESS || "kaimikan@protonmail.com";

  try {
    const result = await resend.emails.send({
      from: "Анкета ППМГ 2026 <onboarding@resend.dev>",
      to: recipient,
      subject,
      text,
      html: html || undefined,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return res.status(500).json({ error: "Resend rejected email", detail: result.error });
    }

    return res.status(200).json({ ok: true, id: result.data?.id });
  } catch (err) {
    console.error("Email send failed:", err.message);
    return res.status(500).json({ error: "Failed to send email", detail: err.message });
  }
};
