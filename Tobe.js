const fs = require("fs");
const path = require("path");

/**
 * Folders that contain domain-level role JSONs
 * Example:
 * src/data/roles/ssdp/clearstream-data-layer/cdl.json
 * src/data/roles/edc/clearstream-data-layer/cdl.json
 */
const ROLES_ROOT = path.join(__dirname);
const OUTPUT_FILE = path.join(__dirname, "roles.json");

/**
 * Recursively find all *.json files except roles.json
 */
function findJsonFiles(dir) {
  let results = [];

  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results = results.concat(findJsonFiles(fullPath));
    } else if (
      entry.isFile() &&
      entry.name.endsWith(".json") &&
      entry.name !== "roles.json" &&
      entry.name !== "schema.json"
    ) {
      results.push(fullPath);
    }
  });

  return results;
}

/**
 * Merge logic:
 * - Group by domain id
 * - Concatenate Roles arrays
 * - Preserve original structure
 */
function mergeRoles() {
  const files = findJsonFiles(ROLES_ROOT);
  const domainMap = new Map();

  files.forEach((filePath) => {
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Expecting each file to export:
    // { id: "...", Roles: [...] }
    if (!content.id || !Array.isArray(content.Roles)) {
      console.warn(`⚠️ Skipping invalid file: ${filePath}`);
      return;
    }

    if (!domainMap.has(content.id)) {
      domainMap.set(content.id, {
        id: content.id,
        Roles: [],
      });
    }

    domainMap.get(content.id).Roles.push(...content.Roles);
  });

  const merged = Array.from(domainMap.values());

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(merged, null, 2));
  console.log(`✅ roles.json created with ${merged.length} domains`);
}

mergeRoles();
