import { AbsolutePath, createPackageAnalyzer } from '@lit-labs/analyzer/package-analyzer.js';
import * as path from 'path';
import { Component, genComponent } from './analyze';
import { globSync } from 'glob';
import fs from 'fs';

const packagePath = path.resolve('../openbridge-webcomponents') as AbsolutePath;
const analyzer = createPackageAnalyzer(packagePath);
const components: Component[] = []
// delete all components from the lib folder
const rootOut = path.resolve("..", "openbridge-webcomponents-svelte", "src", 'lib');
// delete all files and folders in the lib folder
for (const file of fs.readdirSync(rootOut)) {
    fs.rmSync(path.resolve(rootOut, file), { recursive: true });
}

// glob search for all components
for (const file of globSync(path.resolve(packagePath, 'src/**/input.ts'))) {
    // exclude storybook files
    if (file.includes('.stories.')) {
        continue;
    }
    const comp = genComponent(analyzer, file as AbsolutePath);
    components.push(...comp);
}

if (components) {

}