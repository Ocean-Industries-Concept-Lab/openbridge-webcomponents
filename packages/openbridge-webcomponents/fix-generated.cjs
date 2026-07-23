const fs = require('fs');
const path = require('path');

// `lit labs gen` builds import specifiers with the OS path separator. On
// Windows the backslashes are consumed as string escapes when the
// generated source is written (`\b` even becomes a backspace character),
// producing unrecoverable specifiers like
// "@oicl/openbridge-webcomponents/distarpoi-cardpoi-card.js". The
// corruption cannot be repaired after the fact, so detect it and abort
// with actionable guidance instead of letting a broken build land.
function assertNoCorruptedImports(directory) {
  const root = path.resolve(__dirname, '..', directory, 'src');
  if (!fs.existsSync(root)) return;
  const offenders = [];
  const visit = (dir) => {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        visit(full);
      } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.js')) {
        const source = fs.readFileSync(full, 'utf8');
        if (/@oicl\/openbridge-webcomponents\/dist[^/'"\s]/.test(source)) {
          offenders.push(full);
        }
      }
    }
  };
  visit(root);
  if (offenders.length > 0) {
    throw new Error(
      `Wrapper generation produced corrupted import paths (Windows path-separator escaping) in ${directory}:\n` +
        offenders
          .slice(0, 5)
          .map((f) => `  ${f}`)
          .join('\n') +
        (offenders.length > 5
          ? `\n  ...and ${offenders.length - 5} more`
          : '') +
        '\nRun "npm run wrappers" on Linux/macOS (or WSL/devcontainer) instead.'
    );
  }
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

  packageJson.license = 'Apache-2.0';

  packageJson.publishConfig = {
    access: 'public',
  };

  if (!packageJson.files) {
    packageJson.files = [];
  }
  if (packageJson.files && !packageJson.files.includes('README.md')) {
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

assertNoCorruptedImports('openbridge-webcomponents-vue');
assertNoCorruptedImports('openbridge-webcomponents-react');
assertNoCorruptedImports('openbridge-webcomponents-ng');
assertNoCorruptedImports('openbridge-webcomponents-svelte');

fixPackageJson('vue', 'openbridge-webcomponents-vue');
fixPackageJson('react', 'openbridge-webcomponents-react');
fixPackageJson('angular', 'openbridge-webcomponents-ng');
fixPackageJson('svelte', 'openbridge-webcomponents-svelte');
