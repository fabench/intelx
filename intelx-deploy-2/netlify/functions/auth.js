// netlify/functions/auth.js
// Handles: POST /login, POST /admin/users (CRUD)
// Users stored in Netlify Blobs — no database needed

import { getStore } from '@netlify/blobs';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';
const SESSION_SECRET = process.env.SESSION_SECRET || 'intelx-secret-2026';

function hashPassword(password) {
  return crypto.createHmac('sha256', SESSION_SECRET).update(password).digest('hex');
}

function makeToken(username) {
  const payload = `${username}:${Date.now()}`;
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${sig}`).toString('base64');
}

function verifyToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length < 3) return null;
    const sig = parts.pop();
    const payload = parts.join(':');
    const expected = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
    if (sig !== expected) return null;
    const [username, timestamp] = payload.split(':');
    // Token valid for 12 hours
    if (Date.now() - parseInt(timestamp) > 12 * 60 * 60 * 1000) return null;
    return username;
  } catch { return null; }
}

async function getUsers(store) {
  try {
    const data = await store.get('users', { type: 'json' });
    return data || {};
  } catch { return {}; }
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

  const url = new URL(req.url);
  const path = url.pathname.replace('/.netlify/functions/auth', '');
  const store = getStore('intelx-users');

  try {
    const body = await req.json().catch(() => ({}));

    // ── POST /login ──
    if (path === '/login' || path === '') {
      const { username, password } = body;
      if (!username || !password) {
        return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400, headers });
      }
      const users = await getUsers(store);
      const user = users[username.toLowerCase()];
      if (!user || user.hash !== hashPassword(password)) {
        // Small delay to prevent brute-force
        await new Promise(r => setTimeout(r, 400));
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers });
      }
      const token = makeToken(username.toLowerCase());
      return new Response(JSON.stringify({ token, username: username.toLowerCase() }), { status: 200, headers });
    }

    // ── POST /verify ── (check token validity)
    if (path === '/verify') {
      const { token } = body;
      const username = verifyToken(token);
      if (!username) {
        return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 401, headers });
      }
      return new Response(JSON.stringify({ valid: true, username }), { status: 200, headers });
    }

    // ── All /admin/* routes require admin password ──
    if (path.startsWith('/admin')) {
      const { adminPassword } = body;
      if (adminPassword !== ADMIN_PASSWORD) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403, headers });
      }

      // GET users list
      if (path === '/admin/users') {
        const users = await getUsers(store);
        const list = Object.entries(users).map(([u, d]) => ({ username: u, createdAt: d.createdAt }));
        return new Response(JSON.stringify({ users: list }), { status: 200, headers });
      }

      // POST /admin/users/add
      if (path === '/admin/users/add') {
        const { username, password } = body;
        if (!username || !password) {
          return new Response(JSON.stringify({ error: 'Username and password required' }), { status: 400, headers });
        }
        const clean = username.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '');
        if (!clean || clean.length < 2) {
          return new Response(JSON.stringify({ error: 'Invalid username (min 2 chars, a-z 0-9 _ -)' }), { status: 400, headers });
        }
        if (password.length < 6) {
          return new Response(JSON.stringify({ error: 'Password must be at least 6 characters' }), { status: 400, headers });
        }
        const users = await getUsers(store);
        if (users[clean]) {
          return new Response(JSON.stringify({ error: `User "${clean}" already exists` }), { status: 409, headers });
        }
        users[clean] = { hash: hashPassword(password), createdAt: new Date().toISOString() };
        await store.setJSON('users', users);
        return new Response(JSON.stringify({ success: true, username: clean }), { status: 200, headers });
      }

      // POST /admin/users/delete
      if (path === '/admin/users/delete') {
        const { username } = body;
        const users = await getUsers(store);
        if (!users[username]) {
          return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers });
        }
        delete users[username];
        await store.setJSON('users', users);
        return new Response(JSON.stringify({ success: true }), { status: 200, headers });
      }

      // POST /admin/users/reset-password
      if (path === '/admin/users/reset-password') {
        const { username, newPassword } = body;
        if (!newPassword || newPassword.length < 6) {
          return new Response(JSON.stringify({ error: 'Password must be at least 6 characters' }), { status: 400, headers });
        }
        const users = await getUsers(store);
        if (!users[username]) {
          return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers });
        }
        users[username].hash = hashPassword(newPassword);
        users[username].updatedAt = new Date().toISOString();
        await store.setJSON('users', users);
        return new Response(JSON.stringify({ success: true }), { status: 200, headers });
      }
    }

    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers });

  } catch (err) {
    console.error('Auth error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500, headers });
  }
}

export const config = { path: ['/api/auth', '/api/auth/*'] };
