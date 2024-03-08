const fs = require('fs');

const releaseItVersion = require('./package.json').devDependencies['release-it'];
const releaseItBumperVersion = require('./package.json').devDependencies['@release-it/bumper'];

console.log('releaseItVersion', releaseItVersion);

function fixIndexFiles() {
  const indexFiles = [
    '../openbridge-webcomponents-vue/src/components/table/table.ts',
  ];

  indexFiles.forEach((indexFile) => {
    const data = fs.readFileSync(indexFile, 'utf8');
    // Replace /n with new line
    const result = data.replace(/\/n/g, '\n');
    fs.writeFileSync(indexFile, result, 'utf8');
  });
}

function addRepositoryToPackageJsonVue() {
  const packageJson = require('../openbridge-webcomponents-vue/package.json');
  packageJson.repository = {
    type: 'git',
    url: 'git+https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents.git',
    directory: 'packages/openbridge-webcomponents-vue',
  };
  packageJson.scripts = {
    ...packageJson.scripts,
    "release": "release-it",
    "@release-it/bumper": releaseItBumperVersion,
  }
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    "release-it": releaseItVersion
  }

  // add license
  packageJson.license = 'Apache-2.0';
  fs.writeFileSync(
    '../openbridge-webcomponents-vue/package.json',
    JSON.stringify(packageJson, null, 2)
  );
}

function addRepositoryToPackageJsonReact() {
  const packageJson = require('../openbridge-webcomponents-react/package.json');
  packageJson.repository = {
    type: 'git',
    url: 'git+https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents.git',
    directory: 'packages/openbridge-webcomponents-react',
  };
  packageJson.license = 'Apache-2.0';
  packageJson.scripts = {
    ...packageJson.scripts,
    "release": "release-it"
  }
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    "release-it": releaseItVersion,
    "@release-it/bumper": releaseItBumperVersion,
  }
  fs.writeFileSync(
    '../openbridge-webcomponents-react/package.json',
    JSON.stringify(packageJson, null, 2)
  );
}

function fixFilePathInPackageJsonReact() {
  const packageJson = require('../openbridge-webcomponents-react/package.json');
  packageJson.files = packageJson.files.map((file) => {
    return file.replace('dist/', '');
  });
  fs.writeFileSync(
    '../openbridge-webcomponents-react/package.json',
    JSON.stringify(packageJson, null, 2)
  );
}

fixIndexFiles();
addRepositoryToPackageJsonVue();
addRepositoryToPackageJsonReact();
fixFilePathInPackageJsonReact();
