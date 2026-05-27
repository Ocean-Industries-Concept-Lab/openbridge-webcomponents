import * as fs from 'fs';
import * as path from 'path';

const scriptPath = path.resolve(process.argv[1]);
const scriptDirectory = path.dirname(scriptPath);

const packageRoot = path.resolve(scriptDirectory, '..');
const sourcePackagePath = path.join(packageRoot, 'package.json');
const fullBundlePackageRoot = path.join(packageRoot, '.full-bundle-publish');
const releaseVersion = process.argv[2];

if (!releaseVersion) {
  throw new Error('Missing release version argument. Usage: tsx script/prepare-full-bundle.ts <version>');
}

const sourcePackage = JSON.parse(fs.readFileSync(sourcePackagePath, 'utf-8'));

const fullBundlePackage = {
  ...sourcePackage,
  name: '@oicl/openbridge-webcomponents-full-bundle',
  version: releaseVersion,
  files: [
    'dist',
    '!dist/AR-test-image.png',
    '!dist/companylogo-day.png',
    'bundle/openbridge-webcomponents.bundle.js',
    'bundle/openbridge-webcomponents.bundle.js.map',
    'custom-elements.json',
    'src',
    'docs'
  ]
};

fs.rmSync(fullBundlePackageRoot, { recursive: true, force: true });
fs.mkdirSync(fullBundlePackageRoot, { recursive: true });

for (const dirName of ['dist', 'bundle', 'src', 'docs']) {
  fs.cpSync(path.join(packageRoot, dirName), path.join(fullBundlePackageRoot, dirName), {
    recursive: true
  });
}

fs.copyFileSync(
  path.join(packageRoot, 'custom-elements.json'),
  path.join(fullBundlePackageRoot, 'custom-elements.json')
);

fs.writeFileSync(
  path.join(fullBundlePackageRoot, 'package.json'),
  JSON.stringify(fullBundlePackage, null, 2) + '\n'
);

console.log(`✓ Prepared full-bundle publish directory: ${fullBundlePackageRoot}`);
