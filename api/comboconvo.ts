// /api/comboconvo.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Read‐only “echo” URL (only for GET lookups, no CORS issues)
const LOOKUP_URL =
  'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLilc4c1ho2STgzQjdfuHV0WN25ZORffdC_DnTyTceRqqTwkGPKB5toXf6hl0J3JRMgxbQNTRqEmmEP0LhIlYMwzLTYsV3OlVcv8LXYFTkwgj9AGo8V1s6gTlO7IAm1gtnGMmnqSp5hREA3yrX1AI_5bMpJcOOusQzRtNZ7d8lCv5afSKZz7mUtgKbTX9jDITfzZImVLg9FiQDF544qha0IPCuMh4tFen1XwUo4eIyJlAgr0n6c9u5yOoU-vKFHepceHPrBIja-xhlu-2YQZTYTVvClNrNheyyzSv6RJ&lib=MW3M9wDoA0QM9R0Fi0Ne2k42rhhqwptNs';

// The “exec” URL that actually runs doPost and writes to the sheet
const SUBMIT_URL =
  'https://script.google.com/macros/s/AKfycbwkRIM-9HS6bAtntSb-0tUHE2PGqdJTRVBSRINmKd3CEqHvPx4LF-Vd-FyNvvuuypPrKg/exec';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Always return CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    // Just fetch lookup data from the “echo” URL
    try {
      const scriptRes = await fetch(LOOKUP_URL);
      const json = await scriptRes.json();
      return res.status(200).json(json);
    } catch (err) {
      console.error('Lookup proxy error:', err);
      return res.status(500).json({ error: 'Lookup failed' });
    }
  }

  if (req.method === 'POST') {
    // Forward the exact POST body to the “exec” URL so doPost(e) actually runs
    try {
      const scriptRes = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const json = await scriptRes.json();
      return res.status(200).json(json);
    } catch (err) {
      console.error('Submit proxy error:', err);
      return res.status(500).json({ error: 'Submission failed' });
    }
  }

  // Any other HTTP method is not allowed
  res.setHeader('Allow', 'GET, POST, OPTIONS');
  return res.status(405).send('Method Not Allowed');
}