module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subject, text, html } = req.body;

  if (!text || !subject) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const apiKey = process.env.BREVO_EMAIL_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "BREVO_EMAIL_KEY not configured" });
  }

  const recipient = process.env.EMAIL_RECEIVING_ADDRESS || "k.krystev@lestoproduct.com";

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Анкета ППМГ 2026", email: "k.krystev@lestoproduct.com" },
        to: [{ email: recipient }],
        subject,
        textContent: text,
        htmlContent: html || undefined,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo error:", data);
      return res.status(500).json({ error: "Brevo rejected email", detail: data });
    }

    return res.status(200).json({ ok: true, id: data.messageId });
  } catch (err) {
    console.error("Email send failed:", err.message);
    return res.status(500).json({ error: "Failed to send email", detail: err.message });
  }
};
