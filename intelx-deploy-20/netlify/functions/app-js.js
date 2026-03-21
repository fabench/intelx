// Serves app.js only to authenticated users
const fs = require('fs');
const path = require('path');

const ACCESS_PWD = process.env.ACCESS_PWD || '';

exports.handler = async function(event) {
  // Verify password
  const auth = event.headers['authorization'] || event.headers['Authorization'] || '';
  const token = auth.replace('Bearer ', '').trim();
  
  // Also allow cookie-based (passed as query param on initial load)
  const pwd = token || (event.queryStringParameters || {}).t || '';
  
  if (!ACCESS_PWD || pwd !== ACCESS_PWD) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  try {
    const appJs = fs.readFileSync(path.join(__dirname, '../../app.js'), 'utf8');
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
      body: appJs,
    };
  } catch(e) {
    return { statusCode: 500, body: 'Error loading app' };
  }
};
