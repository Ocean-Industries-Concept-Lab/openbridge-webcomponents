const fs = require('fs');

// LICENSE.txt refers to the other two by filename, so all three have to ship.
// npm auto-includes LICENSE.txt only, which is why they are listed explicitly.
const LICENSE_FILES = ['LICENSE.txt', 'LICENSE-AGPL.txt', 'LICENSE-APACHE.txt'];

function copyLicenses(directory) {
  for (const file of LICENSE_FILES) {
    fs.copyFileSync(file, `../${directory}/${file}`);
  }
}

// Angular publishes from dist/, and ng-packagr copies only a file literally
// named LICENSE, so the license files have to be declared as assets.
function addNgPackageAssets(directory) {
  const ngPackagePath = `../${directory}/ng-package.json`;
  const ngPackage = require(ngPackagePath);
  const assets = new Set([...(ngPackage.assets ?? []), ...LICENSE_FILES]);
  ngPackage.assets = [...assets];
  fs.writeFileSync(ngPackagePath, JSON.stringify(ngPackage, null, 2) + '\n');
}

function fixPackageJson(packageName, directory) {
  const packageJsonPath = `../${directory}/package.json`;
  const corePackageJson = require('./package.json');
  const packageJson = require(packageJsonPath);

  // set version to match core
  packageJson.version = corePackageJson.version;

  // set core dependency version
  if (
    packageJson.dependencies &&
    packageJson.dependencies['@oicl/openbridge-webcomponents']
  ) {
    packageJson.dependencies['@oicl/openbridge-webcomponents'] =
      `^${corePackageJson.version}`;
  }

  packageJson.repository = {
    type: 'git',
    url: 'git+https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents.git',
    directory: `packages/${directory}`,
  };

  packageJson.homepage = 'https://www.openbridge.no';

  packageJson.license = 'AGPL-3.0-only';

  packageJson.publishConfig = {
    access: 'public',
  };

  copyLicenses(directory);

  // Angular publishes from dist/, which ng-packagr builds to contain exactly
  // the right output. ng-packagr copies `files` through to dist/package.json,
  // so setting it here would cap the published package at just those entries.
  if (packageName !== 'angular') {
    if (!packageJson.files) {
      packageJson.files = [];
    }
    for (const file of ['README.md', ...LICENSE_FILES]) {
      if (!packageJson.files.includes(file)) {
        packageJson.files.push(file);
      }
    }
  } else {
    delete packageJson.files;
    addNgPackageAssets(directory);
  }

  if (packageName === 'vue') {
    packageJson.devDependencies['vite'] = '^6.3.5';
    packageJson.devDependencies['@rollup/plugin-typescript'] = '^12.1.2';
  }

  if (packageName === 'react') {
    packageJson.files = packageJson.files.map((file) => {
      return file.replace('dist/', '');
    });
    packageJson.peerDependencies = {
      react: '^17 || ^18 || ^19',
      '@types/react': '^17 || ^18 || ^19',
    };

    const tsConfigFile = require(`../${directory}/tsconfig.json`);
    tsConfigFile.compilerOptions.skipLibCheck = true;
    fs.writeFileSync(
      `../${directory}/tsconfig.json`,
      JSON.stringify(tsConfigFile, null, 2)
    );
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

fixPackageJson('vue', 'openbridge-webcomponents-vue');
fixPackageJson('react', 'openbridge-webcomponents-react');
fixPackageJson('angular', 'openbridge-webcomponents-ng');
fixPackageJson('svelte', 'openbridge-webcomponents-svelte');
