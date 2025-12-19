const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname);
const OUTPUT = path.join(BASE_DIR, 'roles.json');

const ROLE_TYPES = ['SSDP_IIQ_Roles', 'EDC_IIQ_Roles'];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function collectJsonFiles(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(collectJsonFiles(fullPath));
    } else if (entry.endsWith('.json') && entry !== 'roles.json' && entry !== 'schema.json') {
      results.push(fullPath);
    }
  }
  return results;
}

const merged = {
  SSDP_IIQ_Roles: [],
  EDC_IIQ_Roles: [],
};

for (const roleType of ROLE_TYPES) {
  const domainMap = new Map();

  const files = collectJsonFiles(
    path.join(BASE_DIR, roleType.startsWith('SSDP') ? 'ssdp' : 'edc')
  );

  for (const file of files) {
    const json = readJson(file);

    if (!json.id || !Array.isArray(json.Roles)) continue;

    if (!domainMap.has(json.id)) {
      domainMap.set(json.id, { id: json.id, Roles: [] });
    }

    domainMap.get(json.id).Roles.push(...json.Roles);
  }

  merged[roleType] = Array.from(domainMap.values());
}

fs.writeFileSync(OUTPUT, JSON.stringify(merged, null, 2));
console.log('✅ roles.json generated successfully');
