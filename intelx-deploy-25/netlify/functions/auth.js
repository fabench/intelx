const crypto = require('crypto');

const SESSION_SECRET = process.env.SESSION_SECRET || 'intelx-default-secret';

function hashPwd(password) {
  return crypto.createHmac('sha256', SESSION_SECRET).update(password).digest('hex');
}

function makeToken(username) {
  const payload = username + ':' + Date.now();
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return Buffer.from(payload + ':' + sig).toString('base64');
}

function verifyToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const lastColon = decoded.lastIndexOf(':');
    const payload = decoded.slice(0, lastColon);
    const sig = decoded.slice(lastColon + 1);
    if (crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex') !== sig) return null;
    const colonIdx = payload.lastIndexOf(':');
    const ts = parseInt(payload.slice(colonIdx + 1));
    if (Date.now() - ts > 12 * 60 * 60 * 1000) return null;
    return payload.slice(0, colonIdx);
  } catch (e) { return null; }
}

function getUsers() {
  try { return JSON.parse(process.env.INTELX_USERS || '[]'); }
  catch (e) { return []; }
}

function resp(code, body) {
  return { statusCode: code, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
}

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, body: '' };
  if (event.httpMethod !== 'POST') return resp(405, { error: 'Method not allowed' });

  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch (e) { return resp(400, { error: 'Invalid JSON' }); }

  const path = event.path
    .replace(/\/.netlify\/functions\/auth/, '')
    .replace(/\/api\/auth/, '')
    .replace(/\/$/, '') || '/';

  if (path === '/login') {
    const { username, password } = body;
    if (!username || !password) return resp(400, { error: 'Missing credentials' });

    const users = getUsers();
    const computedHash = hashPwd(password);
    const user = users.find(u => u.u.toLowerCase() === username.toLowerCase());

    // Debug info (remove after fixing)
    const debug = {
      usersLoaded: users.length,
      usersEnvSet: !!process.env.INTELX_USERS,
      secretSet: !!process.env.SESSION_SECRET,
      usernameReceived: username,
      userFound: !!user,
      hashMatch: user ? (user.h === computedHash) : false,
      computedHash: computedHash.slice(0, 8) + '...',
      storedHash: user ? user.h.slice(0, 8) + '...' : 'no user',
    };

    await new Promise(r => setTimeout(r, 300));

    if (!user || user.h !== computedHash) {
      return resp(401, { error: 'Invalid credentials', debug });
    }
    return resp(200, { token: makeToken(username.toLowerCase()), username: username.toLowerCase() });
  }

  if (path === '/verify') {
    const username = verifyToken(body.token || '');
    if (!username) return resp(401, { error: 'Invalid or expired token' });
    return resp(200, { valid: true, username });
  }

  if (path === '/admin/users') {
    const users = getUsers();
    return resp(200, { users: users.map(u => ({ username: u.u, createdAt: u.c || null })) });
  }

  return resp(404, { error: 'Not found', path });
};
