const fs = require('fs');
const path = require('path');

const INDEX_FILE = path.join(__dirname, 'index.json');

if (!fs.existsSync(INDEX_FILE)) {
  console.error('❌ index.json not found. Run merge-roles first.');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));

/**
 * Extract CN from AD DN
 * Example:
 * CN=IAM_SSDP_XYZ,OU=SSDP,... → IAM_SSDP_XYZ
 */
function extractCN(dn) {
  if (typeof dn !== 'string') return null;
  const match = dn.match(/^CN=([^,]+)/i);
  return match ? match[1] : null;
}

const seenCNs = new Map();          // CN → location
const seenRoleNames = new Map();    // IIQ_Role_Name → location
let hasErrors = false;

function checkBucket(bucketName, areas = []) {
  for (const area of areas) {
    const areaId = area.id || 'unknown-area';
    const roles = Array.isArray(area.Roles) ? area.Roles : [];

    for (const role of roles) {
      const roleName = role.IIQ_Role_Name;
      const dn = role.AD_Organizational_Unit;
      const cn = extractCN(dn);
      const location = `${bucketName} / ${areaId}`;

      // -------------------------
      // CN extraction validation
      // -------------------------
      if (!cn) {
        console.error(`
❌ Invalid AD Organizational Unit
Role Name : ${roleName}
Value     : ${dn}
Location  : ${location}
`);
        hasErrors = true;
        continue;
      }

      // -------------------------
      // CN duplicate check
      // -------------------------
      if (seenCNs.has(cn)) {
        console.error(`
❌ Duplicate CN detected
CN          : ${cn}
Role Name   : ${roleName}
Location    : ${location}
Previously  : ${seenCNs.get(cn)}
`);
        hasErrors = true;
      } else {
        seenCNs.set(cn, `${location} → ${roleName}`);
      }

      // -------------------------
      // IIQ Role Name duplicate check
      // -------------------------
      if (seenRoleNames.has(roleName)) {
        console.error(`
❌ Duplicate IIQ Role Name detected
Role Name   : ${roleName}
CN          : ${cn}
Location    : ${location}
Previously  : ${seenRoleNames.get(roleName)}
`);
        hasErrors = true;
      } else {
        seenRoleNames.set(roleName, `${location} → ${cn}`);
      }
    }
  }
}

// Run checks
checkBucket('SSDP_IIQ_Roles', data.SSDP_IIQ_Roles || []);
checkBucket('EDC_IIQ_Roles', data.EDC_IIQ_Roles || []);

// Final result
if (hasErrors) {
  console.error('\n❌ Duplicate check failed.');
  process.exit(1);
}

console.log('✅ Duplicate check passed (CN + IIQ Role Name).');
