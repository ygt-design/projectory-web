// /api/comboconvo.ts (Node.js serverless)
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Deployed Apps Script CORS-bypassing URL:
const SCRIPT_URL =
  'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLilc4c1ho2STgzQjdfuHV0WN25ZORffdC_DnTyTceRqqTwkGPKB5toXf6hl0J3JRMgxbQNTRqEmmEP0LhIlYMwzLTYsV3OlVcv8LXYFTkwgj9AGo8V1s6gTlO7IAm1gtnGMmnqSp5hREA3yrX1AI_5bMpJcOOusQzRtNZ7d8lCv5afSKZz7mUtgKbTX9jDITfzZImVLg9FiQDF544qha0IPCuMh4tFen1XwUo4eIyJlAgr0n6c9u5yOoU-vKFHepceHPrBIja-xhlu-2YQZTYTVvClNrNheyyzSv6RJ&lib=MW3M9wDoA0QM9R0Fi0Ne2k42rhhqwptNs';

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