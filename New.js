const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const ROOT = __dirname;
const SCHEMA_PATH = path.join(ROOT, 'schema.json');
const DATA_PATH = path.join(ROOT, 'index.json');

// ---------- helpers ----------

function getRoleContext(instancePath, data) {
  if (typeof instancePath !== 'string' || instancePath.length === 0) {
    return { area: 'UNKNOWN', roleIndex: 'N/A', roleName: 'UNKNOWN' };
  }

  const parts = instancePath.split('/').filter(Boolean);

  // SSDP_IIQ_Roles or EDC_IIQ_Roles
  const area = parts[0] || 'UNKNOWN';

  const rolesIdx = parts.indexOf('Roles');
  if (rolesIdx === -1 || !parts[rolesIdx + 1]) {
    return { area, roleIndex: 'N/A', roleName: 'UNKNOWN' };
  }

  const roleIndex = Number(parts[rolesIdx + 1]);
  const areaIndex = Number(parts[1]);

  try {
    const role =
      data?.[area]?.[areaIndex]?.Roles?.[roleIndex];

    return {
      area,
      roleIndex,
      roleName: role?.IIQ_Role_Name || 'UNKNOWN'
    };
  } catch {
    return { area, roleIndex, roleName: 'UNKNOWN' };
  }
}

// ---------- load files ----------

if (!fs.existsSync(SCHEMA_PATH)) {
  console.error('❌ schema.json not found');
  process.exit(1);
}

if (!fs.existsSync(DATA_PATH)) {
  console.error('❌ index.json not found. Run merge first.');
  process.exit(1);
}

const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

// ---------- AJV ----------

const ajv = new Ajv({
  allErrors: true,
  strict: false
});

const validate = ajv.compile(schema);
const valid = validate(data);

// ---------- output ----------

if (!valid) {
  console.error('\n❌ Schema validation failed\n');

  validate.errors.forEach(err => {
    const { area, roleIndex, roleName } =
      getRoleContext(err.instancePath, data);

    console.error('----------------------------------------');
    console.error(`Area       : ${area}`);
    console.error(`Role index : ${roleIndex}`);
    console.error(`Role name  : ${roleName}`);
    console.error(`Keyword    : ${err.keyword}`);
    console.error(`Path       : ${err.instancePath || '(root)'}`);
    console.error(`Message    : ${err.message}`);

    if (err.params?.pattern) {
      console.error(`Expected   : ${err.params.pattern}`);
    }
  });

  console.error('\n❌ Fix the above errors and retry\n');
  process.exit(1);
}

console.log('✅ Schema validation passed');
