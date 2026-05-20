export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const GS_URL = 'https://script.google.com/macros/s/AKfycbwIqg2z2I1egJCIX1hulQtVaoL9CBmPv1toRR0ay4sgr8iv5VkLTl0ojL6UOD6AWIk6bQ/exec';

  try {
    if (req.method === 'POST') {
      // Save data to Google Sheets
      const body = req.body;
      const encoded = encodeURIComponent(JSON.stringify(body));
      const response = await fetch(`${GS_URL}?data=${encoded}`);
      const text = await response.text();
      res.status(200).json({ ok: true });
    } else {
      // Read data from Google Sheets
      const response = await fetch(GS_URL);
      const data = await response.json();
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
