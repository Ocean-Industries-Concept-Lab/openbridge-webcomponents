const fs = require('fs');
const packageJson = require('@ocean-industries-concept-lab/openbridge-webcomponents-react/package.json');
const tsConfigFile = require('@ocean-industries-concept-lab/openbridge-webcomponents-react/tsconfig.json');

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

function fixPackageJsonAngular() {
  const packageJson = require('../openbridge-webcomponents-ng/package.json');
  const ngPackageJson = require('../openbridge-webcomponents-ng/ng-package.json');
  const tsconfiglibJson = require('../openbridge-webcomponents-ng/tsconfig.lib.json');
  packageJson.files = packageJson.files.map((file) => {
    return file.replace('dist/', '');
  });
  packageJson['scripts'] = {
    'build': 'ng-packagr -p ng-package.json -c tsconfig.lib.json',
  };
  packageJson.dependencies['tslib'] = '^2.8.1';
  packageJson.peerDependencies = {
    '@angular/common': '^20.0.0',
    '@angular/core': '^20.0.0',
  };
  packageJson['devDependencies'] = {
    '@angular/core': '^20.0.1',
    '@angular/common': '^20.0.1',
    '@angular/compiler': '^20.0.1',
    '@angular/compiler-cli': '^20.0.1',
    'ng-packagr': '^20.0.1',
  };

  fs.writeFileSync(
    '../openbridge-webcomponents-ng/package.json',
    JSON.stringify(packageJson, null, 2)
  );
}

function addTsConfigAngular() {
  const tsconfig = {
    compilerOptions: {
      target: 'ES2022',
      module: 'ES2022',
      moduleResolution: 'Bundler',

      strict: true,
      skipLibCheck: true,

      declaration: false,
      sourceMap: true,

      lib: ['ES2022', 'DOM'],
      types: [],
    },
  };

  fs.writeFileSync(
    '../openbridge-webcomponents-ng/tsconfig.json',
    JSON.stringify(tsconfig, null, 2) + '\n'
  );
}

function addTsConfigLibAngular() {
  const tsconfig = {
    extends: './tsconfig.json',
    compilerOptions: {
      declaration: true,
      declarationMap: true,
      inlineSources: true,
      target: 'ES2022',
    },
    angularCompilerOptions: {
      compilationMode: 'partial',
    },
    exclude: ['**/*.spec.ts', 'dist', 'node_modules'],
  };

  fs.writeFileSync(
    '../openbridge-webcomponents-ng/tsconfig.lib.json',
    JSON.stringify(tsconfig, null, 2) + '\n'
  );
}

function addNgPackageAngular() {
  const content = {
    $schema: './node_modules/ng-packagr/ng-package.schema.json',
    dest: 'dist',
    lib: {
      entryFile: 'src/public-api.ts',
    },
  };

  fs.writeFileSync(
    '../openbridge-webcomponents-ng/ng-package.json',
    JSON.stringify(content, null, 2) + '\n'
  );
}

addRepositoryToPackageJsonVue();
addRepositoryToPackageJsonReact();
fixFilePathInPackageJsonReact();
addNgPackageAngular();
addTsConfigAngular();
addTsConfigLibAngular();
fixPackageJsonAngular();