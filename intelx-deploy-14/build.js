// build.js — runs at Netlify build time
// Injects environment variables into HTML/JS files

const fs = require('fs');

const replacements = {
  'index.html': {
    '%%ACCESS_PWD%%': process.env.ACCESS_PWD || '',
  },
  'app.js': {
    '%%SUPABASE_URL%%': process.env.SUPABASE_URL || '',
    '%%SUPABASE_ANON_KEY%%': process.env.SUPABASE_ANON_KEY || '',
  }
};

let ok = true;

for (const [file, vars] of Object.entries(replacements)) {
  if (!fs.existsSync(file)) {
    console.error(`ERROR: ${file} not found`);
    ok = false;
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');
  for (const [placeholder, value] of Object.entries(vars)) {
    if (!value) {
      console.warn(`WARNING: ${placeholder} has no value (env var not set?)`);
    }
    content = content.split(placeholder).join(value);
    console.log(`  ${file}: replaced ${placeholder} → ${value ? value.slice(0,8)+'...' : '(empty)'}`);
  }
  fs.writeFileSync(file, content, 'utf8');
}

if (!ok) process.exit(1);
console.log('Build complete.');
