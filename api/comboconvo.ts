// /api/comboconvo.ts (Node.js serverless)
import type { VercelRequest, VercelResponse } from '@vercel/node';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwuYeetQ5x3Iqs4LYYQu869YC-pA2RAKEarl1va5fVbNvkvDpwKw-bdrjOevQNl7_BpkA/exec';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    // Reply to preflight
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    // Forward GET to Apps Script
    const scriptRes = await fetch(SCRIPT_URL);
    const json = await scriptRes.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(json);
  }

  if (req.method === 'POST') {
    // Forward POST body to Apps Script
    const scriptRes = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const json = await scriptRes.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(json);
  }

  res.setHeader('Allow', 'GET, POST, OPTIONS');
  return res.status(405).send('Method Not Allowed');
}