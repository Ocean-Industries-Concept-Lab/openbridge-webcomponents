// Collapses the Angular package's per-entry-point `exports` into one subpath
// pattern. ng-packagr writes an explicit export for every secondary entry
// point (one per component and icon, ~2400), which makes dist/package.json
// ~445 kB. Some npm-compatible registries cap package.json at 384000 bytes
// and reject the publish. Every generated entry follows the same layout, so
// a single `./*` pattern resolves to exactly the same files.
//
// Usage: node compact-ng-exports.mjs <path/to/dist/package.json>
import * as fs from 'node:fs';
import * as path from 'node:path';
import {fileURLToPath} from 'node:url';

const PATTERN_KEY = './*';
/** The smallest registry `package.json` cap seen in the field. */
const MAX_PACKAGE_JSON_BYTES = 384000;

/**
 * Returns a copy of `packageJson` whose secondary entry-point exports are
 * replaced by one `./*` pattern. Entries that do not match the pattern exactly
 * (nested subpaths, extra conditions) are kept as explicit exports, which take
 * precedence over the pattern.
 */
export function compactNgExports(packageJson) {
  const exportsMap = packageJson.exports;
  const mainBundle = exportsMap?.['.']?.default;
  if (!mainBundle || !/^\.\/fesm2022\/[^/]+\.mjs$/.test(mainBundle)) {
    throw new Error(
      `Unexpected main export ${JSON.stringify(mainBundle)}; refusing to compact exports.`
    );
  }
  if (exportsMap[PATTERN_KEY]) {
    return {packageJson, collapsed: 0};
  }
  const bundlePrefix = mainBundle.replace(/\.mjs$/, '-');
  const pattern = {
    types: './*/index.d.ts',
    default: `${bundlePrefix}*.mjs`,
  };

  const kept = {};
  let collapsed = 0;
  for (const [key, value] of Object.entries(exportsMap)) {
    const name = key.slice(2);
    const matchesPattern =
      key.startsWith('./') &&
      name !== '' &&
      !name.includes('/') &&
      !name.includes('*') &&
      value !== null &&
      typeof value === 'object' &&
      Object.keys(value).join() === 'types,default' &&
      value.types === pattern.types.replace('*', name) &&
      value.default === pattern.default.replace('*', name);
    if (matchesPattern) {
      collapsed++;
    } else {
      kept[key] = value;
    }
  }
  if (collapsed === 0) {
    return {packageJson, collapsed};
  }
  return {
    packageJson: {...packageJson, exports: {...kept, [PATTERN_KEY]: pattern}},
    collapsed,
  };
}

function main() {
  const packageJsonPath = process.argv[2];
  if (!packageJsonPath) {
    throw new Error('Usage: compact-ng-exports.mjs <dist/package.json>');
  }
  const before = fs.readFileSync(packageJsonPath, 'utf-8');
  const {packageJson, collapsed} = compactNgExports(JSON.parse(before));

  // Every collapsed entry must still resolve to files that exist.
  const root = path.dirname(packageJsonPath);
  const pattern = packageJson.exports[PATTERN_KEY];
  const names = fs
    .readdirSync(root, {withFileTypes: true})
    .filter((entry) => fs.existsSync(path.join(root, entry.name, 'index.d.ts')))
    .map((entry) => entry.name);
  for (const name of names) {
    if (packageJson.exports[`./${name}`]) continue;
    for (const target of [pattern.types, pattern.default]) {
      const file = path.join(root, target.replaceAll('*', name));
      if (!fs.existsSync(file)) {
        throw new Error(`Pattern export for ./${name} misses ${file}`);
      }
    }
  }

  const after = JSON.stringify(packageJson, null, 2) + '\n';
  fs.writeFileSync(packageJsonPath, after);
  console.log(
    `compact-ng-exports: collapsed ${collapsed} exports into "${PATTERN_KEY}", ` +
      `package.json ${Buffer.byteLength(before)} -> ${Buffer.byteLength(after)} bytes`
  );
  if (Buffer.byteLength(after) > MAX_PACKAGE_JSON_BYTES) {
    throw new Error(
      `${packageJsonPath} is still over ${MAX_PACKAGE_JSON_BYTES} bytes; registries will reject the publish.`
    );
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
