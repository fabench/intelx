// netlify/functions/claude-proxy.js
const https = require('https');

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY || '';
const ACCESS_PWD    = process.env.ACCESS_PWD || '';

function resp(code, body) {
  return { statusCode: code, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
}

function httpsPost(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(body) }); }
        catch (e) { resolve({ status: res.statusCode, body }); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, body: '' };
  if (event.httpMethod !== 'POST') return resp(405, { error: 'Method not allowed' });

  // Simple password check — token sent is the access password itself
  const auth = event.headers['authorization'] || event.headers['Authorization'] || '';
  const token = auth.replace('Bearer ', '').trim();
  if (!ACCESS_PWD || token !== ACCESS_PWD) return resp(401, { error: 'Unauthorized' });

  if (!ANTHROPIC_KEY) return resp(500, { error: 'API key not configured' });

  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch (e) { return resp(400, { error: 'Invalid JSON' }); }

  const payload = JSON.stringify({
    model: body.model || 'claude-haiku-4-5-20251001',
    max_tokens: Math.min(body.max_tokens || 1500, 4000),
    system: body.system,
    messages: body.messages,
  });

  try {
    const result = await httpsPost({
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(payload),
      },
    }, payload);
    return { statusCode: result.status, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(result.body) };
  } catch (err) {
    return resp(500, { error: 'Proxy error: ' + err.message });
  }
};
