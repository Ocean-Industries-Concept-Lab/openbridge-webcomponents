const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixBackslashesInAngularFiles() {
  const ngSrcPath = path.join(__dirname, '../openbridge-webcomponents-ng/src');
  const files = glob.sync('**/*.ts', {cwd: ngSrcPath, absolute: true});

  files.forEach((file) => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace all backslashes with forward slashes in import paths
    content = content.replace(
      /from\s+['"]([^'"]+)['"]/g,
      (match, importPath) => {
        const fixedPath = importPath.replace(/\\/g, '/');
        // Preserve the original quote style
        const quote = match.includes('"') ? '"' : "'";
        return `from ${quote}${fixedPath}${quote}`;
      }
    );

    fs.writeFileSync(file, content, 'utf8');
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

function addRepositoryToPackageJsonAngular() {
  const packageJson =
    require.cache[
      require.resolve('../openbridge-webcomponents-ng/package.json')
    ];
  if (packageJson) {
    delete require.cache[
      require.resolve('../openbridge-webcomponents-ng/package.json')
    ];
  }
  const pkg = require('../openbridge-webcomponents-ng/package.json');

  pkg.repository = {
    type: 'git',
    url: 'git+https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents-jip.git',
    directory: 'packages/openbridge-webcomponents-ng',
  };
  pkg.license = 'Apache-2.0';
  // Don't set files here - it will be on the source package.json, not dist

  // Preserve build script with npm install
  if (pkg.scripts && pkg.scripts.build) {
    if (!pkg.scripts.build.includes('npm install')) {
      pkg.scripts.build = 'npm install && ' + pkg.scripts.build;
    }
  }

  fs.writeFileSync(
    '../openbridge-webcomponents-ng/package.json',
    JSON.stringify(pkg, null, 2) + '\n'
  );
}

// Check if running for specific framework or all frameworks
const args = process.argv.slice(2);
const frameworkArg = args.find((arg) => arg.startsWith('--framework='));
const framework = frameworkArg ? frameworkArg.split('=')[1] : 'all';

if (['all', 'angular'].includes(framework)) {
  fixBackslashesInAngularFiles();
  addRepositoryToPackageJsonAngular();
}
if (['all', 'vue'].includes(framework)) {
  addRepositoryToPackageJsonVue();
}
if (['all', 'react'].includes(framework)) {
  addRepositoryToPackageJsonReact();
  fixFilePathInPackageJsonReact();
}
