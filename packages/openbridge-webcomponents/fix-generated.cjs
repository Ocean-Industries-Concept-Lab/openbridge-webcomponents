const {execSync} = require('child_process');
const fs = require('fs');

const revertFiles = [
  'app-menu/AppMenu.vue',
  'brilliance-menu/BrillianceMenu.vue',
  'divider/Divider.vue',
  'navigation-menu/NavigationMenu.vue',
];

function revertFilesToGitHead() {
  revertFiles.forEach((file) => {
    execSync(
      `git checkout -- ../openbridge-webcomponents-vue/src/components/${file}`
    );
  });
}

function fixViteConfig() {
  /** Change from:
  * preserveModules: true,
			preserveModulesRoot: 'src',
      preserveEntrySignatures: true,
      output: {
        format: 'es',
        entryFileNames: ({ name }) => `${name}.js`,
        dir: './',
        sourcemap: true
      }
  * to:
      
      preserveEntrySignatures: 'strict',
      output: {
        format: 'es',
        entryFileNames: ({ name }) => `${name}.js`,
        dir: './',
        sourcemap: true,
        preserveModules: true,
			  preserveModulesRoot: 'src',
      }
  */
  const viteConfig = '../openbridge-webcomponents-vue/vite.config.ts';

  const data = fs.readFileSync(viteConfig, 'utf8');
  const result = data.replace(
    /preserveModules: true,\n\s*?preserveModulesRoot: 'src',\n\s*?preserveEntrySignatures: true,\n\s*?output: {\n\s*?format: 'es',\n\s*?entryFileNames: \(\{ name \}\) => `\$\{name\}.js`,\n\s*?dir: '\.\/',\n\s*?sourcemap: true/g,
    "preserveEntrySignatures: 'strict',\n      output: {\n        format: 'es',\n        entryFileNames: ({ name }) => `${name}.js`,\n        dir: './',\n        sourcemap: true,\n        preserveModules: true,\n        preserveModulesRoot: 'src'"
  );
  fs.writeFileSync(viteConfig, result, 'utf8');
}

revertFilesToGitHead();
fixViteConfig();
