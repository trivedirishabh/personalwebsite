const fs = require('fs');
const path = require('path');

const INDEX_FILE = path.join(__dirname, 'index.json');

if (!fs.existsSync(INDEX_FILE)) {
  console.error('❌ index.json not found. Run merge script first.');
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

const seenCNs = new Map();
let hasErrors = false;

function checkBucket(bucketName, areas = []) {
  for (const area of areas) {
    const areaId = area.id || 'unknown-area';
    const roles = area.Roles || [];

    for (const role of roles) {
      const roleName = role.IIQ_Role_Name;
      const dn = role.AD_Organizational_Unit;
      const cn = extractCN(dn);

      if (!cn) {
        console.error(`
❌ Invalid AD DN
Role       : ${roleName}
Value      : ${dn}
Location   : ${bucketName} / ${areaId}
`);
        hasErrors = true;
        continue;
      }

      if (seenCNs.has(cn)) {
        console.error(`
❌ Duplicate CN detected
CN          : ${cn}
Role Name   : ${roleName}
Location    : ${bucketName} / ${areaId}
Previously  : ${seenCNs.get(cn)}
`);
        hasErrors = true;
      } else {
        seenCNs.set(cn, `${bucketName} / ${areaId} → ${roleName}`);
      }
    }
  }
}

checkBucket('SSDP_IIQ_Roles', data.SSDP_IIQ_Roles || []);
checkBucket('EDC_IIQ_Roles', data.EDC_IIQ_Roles || []);

if (hasErrors) {
  console.error('\n❌ Duplicate CN check failed.');
  process.exit(1);
}

console.log('✅ CN duplicate check passed.');
