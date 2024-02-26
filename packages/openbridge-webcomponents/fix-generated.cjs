const fs = require('fs');

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
    url: 'https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents.git',
    directory: "packages/openbridge-webcomponents-vue"
  }
  fs.writeFileSync(
    '../openbridge-webcomponents-vue/package.json',
    JSON.stringify(packageJson, null, 2)
  );
}

function addRepositoryToPackageJsonReact() {
  const packageJson = require('../openbridge-webcomponents-react/package.json');
  packageJson.repository = {
    type: 'git',
    url: 'https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents.git',
    directory: "packages/openbridge-webcomponents-react"
  }
  fs.writeFileSync(
    '../openbridge-webcomponents-react/package.json',
    JSON.stringify(packageJson, null, 2)
  );
}

fixIndexFiles();
addRepositoryToPackageJsonVue();
addRepositoryToPackageJsonReact();
