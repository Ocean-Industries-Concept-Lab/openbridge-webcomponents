import * as fs from 'fs';
import * as path from 'path';

const scriptPath = path.resolve(process.argv[1]);
const scriptDirectory = path.dirname(scriptPath);

const packageRoot = path.resolve(scriptDirectory, '..');
const sourcePackagePath = path.join(packageRoot, 'package.json');
const fullBundlePackageRoot = path.join(packageRoot, '.full-bundle-publish');
const sourcePackage = JSON.parse(fs.readFileSync(sourcePackagePath, 'utf-8'));
const releaseVersion = process.argv[2] ?? sourcePackage.version;
const {scripts: _scripts, ...sourcePackageWithoutScripts} = sourcePackage;

const nonWorkingScripts = new Set([
  'wrappers',
  'build:full',
  'wrappers:clean',
  'wrappers:build',
  'wrappers:generate',
  'wrappers:post-fix',
  'test-storybook:docker',
]);

const scripts = Object.fromEntries(
  Object.entries(_scripts).filter(([name]) => !nonWorkingScripts.has(name))
);

const fullBundlePackage = {
  ...sourcePackageWithoutScripts,
  name: '@oicl/openbridge-webcomponents-full-bundle',
  version: releaseVersion,
  scripts,
  files: [
    'dist',
    '!dist/AR-test-image.png',
    '!dist/companylogo-day.png',
    'bundle/openbridge-webcomponents.bundle.js',
    'bundle/openbridge-webcomponents.bundle.js.map',
    '.storybook',
    'script',
    'xliff',
    'src',
    'docs',
    'custom-elements.json',
    'tsconfig.json',
    'eslint.config.mjs',
    'vite.config.ts',
    'postcss.config.mjs',
    'lit-localize.json',
    'new-component.ts',
    'fix-imports.mjs',
    'fix-js-extensions.mjs',
    'vitest.browser.config.ts',
    'vitest.config.ts',
  ],
};

fs.rmSync(fullBundlePackageRoot, {recursive: true, force: true});
fs.mkdirSync(fullBundlePackageRoot, {recursive: true});

for (const dirName of [
  'dist',
  'bundle',
  'src',
  'docs',
  'xliff',
  'script',
  '.storybook',
]) {
  fs.cpSync(
    path.join(packageRoot, dirName),
    path.join(fullBundlePackageRoot, dirName),
    {
      recursive: true,
    }
  );
}

for (const file of [
  'custom-elements.json',
  'tsconfig.json',
  'vite.config.ts',
  'eslint.config.mjs',
  'postcss.config.mjs',
  'lit-localize.json',
  'new-component.ts',
  'fix-imports.mjs',
  'fix-js-extensions.mjs',
  'vitest.browser.config.ts',
  'vitest.config.ts',
]) {
  fs.copyFileSync(
    path.join(packageRoot, file),
    path.join(fullBundlePackageRoot, file)
  );
}

fs.writeFileSync(
  path.join(fullBundlePackageRoot, 'package.json'),
  JSON.stringify(fullBundlePackage, null, 2) + '\n'
);

console.log(
  `✓ Prepared full-bundle publish directory: ${fullBundlePackageRoot}`
);
