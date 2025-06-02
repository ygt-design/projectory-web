// /api/comboconvo.ts (Node.js serverless)
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Deployed Apps Script “exec” URL:
const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwkRIM-9HS6bAtntSb-0tUHE2PGqdJTRVBSRINmKd3CEqHvPx4LF-Vd-FyNvvuuypPrKg/exec';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Always allow CORS from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Respond to preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Forward GET to Apps Script
  if (req.method === 'GET') {
    const scriptRes = await fetch(SCRIPT_URL);
    const json = await scriptRes.json();
    return res.status(200).json(json);
  }

  // Forward POST body to Apps Script
  if (req.method === 'POST') {
    const scriptRes = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const json = await scriptRes.json();
    return res.status(200).json(json);
  }

  // Reject other methods
  res.setHeader('Allow', 'GET, POST, OPTIONS');
  return res.status(405).send('Method Not Allowed');
}