export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const GS_URL = 'https://script.google.com/macros/s/AKfycbwIqg2z2I1egJCIX1hulQtVaoL9CBmPv1toRR0ay4sgr8iv5VkLTl0ojL6UOD6AWIk6bQ/exec';

  try {
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const encoded = encodeURIComponent(JSON.stringify(body));
      await fetch(`${GS_URL}?data=${encoded}`);
      res.status(200).json({ ok: true });
    } else {
      const response = await fetch(GS_URL);
      const data = await response.json();
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
