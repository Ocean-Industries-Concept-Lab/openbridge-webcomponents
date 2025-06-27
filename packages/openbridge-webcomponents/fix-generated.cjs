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
    url: 'git+https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents-jip.git',
    directory: 'packages/openbridge-webcomponents-vue',
  };

  // add license
  packageJson.license = 'Apache-2.0';

  // update vite
  packageJson.devDependencies['vite'] = '^6.3.5';
  packageJson.devDependencies['@rollup/plugin-typescript'] = '^12.1.2';
  fs.writeFileSync(
    '../openbridge-webcomponents-vue/package.json',
    JSON.stringify(packageJson, null, 2)
  );
}

function addRepositoryToPackageJsonReact() {
  const packageJson = require('../openbridge-webcomponents-react/package.json');
  packageJson.repository = {
    type: 'git',
    url: 'git+https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents-jip.git',
    directory: 'packages/openbridge-webcomponents-react',
  };
  packageJson.license = 'Apache-2.0';
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
  packageJson.peerDependencies = {
    react: '^17 || ^18 || ^19',
    '@types/react': '^17 || ^18 || ^19',
  };
  fs.writeFileSync(
    '../openbridge-webcomponents-react/package.json',
    JSON.stringify(packageJson, null, 2)
  );

  const tsConfigFile = require('../openbridge-webcomponents-react/tsconfig.json');
  tsConfigFile.compilerOptions.skipLibCheck = true;
  fs.writeFileSync(
    '../openbridge-webcomponents-react/tsconfig.json',
    JSON.stringify(tsConfigFile, null, 2)
  );
}

fixIndexFiles();
addRepositoryToPackageJsonVue();
addRepositoryToPackageJsonReact();
fixFilePathInPackageJsonReact();
