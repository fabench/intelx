// netlify/functions/claude-proxy.js
// Proxies requests to Anthropic API — key never leaves the server

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const SESSION_SECRET = process.env.SESSION_SECRET || 'intelx-secret-2026';

import crypto from 'crypto';

function verifyToken(token) {
  if (!token) return null;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length < 3) return null;
    const sig = parts.pop();
    const payload = parts.join(':');
    const expected = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
    if (sig !== expected) return null;
    const [username, timestamp] = payload.split(':');
    if (Date.now() - parseInt(timestamp) > 12 * 60 * 60 * 1000) return null;
    return username;
  } catch { return null; }
}

export default async function handler(req, context) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }

  // Verify session token
  const authHeader = req.headers.get('authorization') || '';
  const token = authHeader.replace('Bearer ', '');
  const username = verifyToken(token);
  if (!username) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }

  if (!ANTHROPIC_KEY) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500, headers });
  }

  try {
    const body = await req.json();

    // Forward to Anthropic — inject our server-side key
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: body.model || 'claude-sonnet-4-5-20251001',
        max_tokens: Math.min(body.max_tokens || 1500, 4000), // cap to control costs
        system: body.system,
        messages: body.messages,
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: response.status, headers });

  } catch (err) {
    console.error('Proxy error:', err);
    return new Response(JSON.stringify({ error: 'Proxy error', detail: err.message }), { status: 500, headers });
  }
}

export const config = { path: '/api/claude' };
