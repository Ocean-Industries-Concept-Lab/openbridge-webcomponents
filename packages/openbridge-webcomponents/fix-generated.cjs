const fs = require('fs');

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
    url: 'git+https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents-jip.git',
    directory: `packages/${directory}`,
  };

  packageJson.homepage = 'https://www.openbridge.no';

  packageJson.license = 'Apache-2.0';

  packageJson.publishConfig = {
    access: 'public',
  };

  if (!packageJson.files) {
    packageJson.files = [];
  }
  if (!packageJson.files.includes('README.md')) {
    packageJson.files.push('README.md');
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
