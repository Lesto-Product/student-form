module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sheetUrl = process.env.GOOGLE_APP_URL;
  if (!sheetUrl) {
    return res.status(500).json({ error: "GOOGLE_APP_URL not configured" });
  }

  try {
    const body = JSON.stringify(req.body);
    const response = await fetch(sheetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body).toString(),
      },
      body,
      redirect: "follow",
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!response.ok) {
      return res.status(500).json({ error: "Google Sheets rejected request", detail: data });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Sheet submission failed:", err.message);
    return res.status(500).json({ error: "Failed to submit", detail: err.message });
  }
};
