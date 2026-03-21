const fs = require('fs');

const replacements = {
  'index.html': { '%%ACCESS_PWD%%': process.env.ACCESS_PWD || '' },
  'app.js':     { '%%ACCESS_PWD%%': process.env.ACCESS_PWD || '' }
};

let ok = true;
for (const [file, vars] of Object.entries(replacements)) {
  if (!fs.existsSync(file)) { console.error(`ERROR: ${file} not found`); ok=false; continue; }
  let content = fs.readFileSync(file, 'utf8');
  for (const [ph, val] of Object.entries(vars)) {
    if (!val) console.warn(`WARNING: ${ph} has no value`);
    content = content.split(ph).join(val);
    console.log(`  ${file}: ${ph} → ${val?val.slice(0,12)+'...':'(empty)'}`);
  }
  fs.writeFileSync(file, content, 'utf8');
}
if (!ok) process.exit(1);
console.log('Build complete.');
