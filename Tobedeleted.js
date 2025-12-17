const Ajv = require('ajv');
const schema = require('../src/data/roles/schema.json');
const data = require('../src/data/roles/index.json');

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

function getByPath(obj, path) {
  return path
    .split('/')
    .filter(Boolean)
    .reduce((o, p) => (o ? o[isNaN(p) ? p : Number(p)] : undefined), obj);
}

function getRoleFromPath(path) {
  // Strip field name (e.g. /AD_Organizational_Unit)
  const rolePath = path.replace(/\/[^/]+$/, '');
  return getByPath(data, rolePath);
}

const valid = validate(data);

if (!valid) {
  console.error('❌ Schema validation failed\n');

  validate.errors.forEach(err => {
    const role = getRoleFromPath(err.instancePath);
    const roleName = role?.IIQ_Role_Name || '<unknown role>';

    console.error(`• Role: ${roleName}`);
    console.error(`  Path: ${err.instancePath}`);
    console.error(`  Error: ${err.message}\n`);
  });

  process.exit(1);
}

console.log('✅ Schema validation passed');
