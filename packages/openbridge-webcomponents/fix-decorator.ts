import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

function fixImports(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Regex for matching the import statement
    const importRegex = /import\s*{([^}]*)}\s*from\s*['"]lit\/decorators\.js['"]/g;

    const matches = Array.from(content.matchAll(importRegex));
    if (matches.length === 0) return false;

    let newContent = content;
    let hasCustomElement = false;
    let otherImports = new Set<string>();

    // Collect all imports from lit/decorators.js
    for (const match of matches) {
        const imports = match[1].split(',').map(i => i.trim());
        for (const imp of imports) {
            if (imp === 'customElement') {
                hasCustomElement = true;
            } else {
                otherImports.add(imp);
            }
        }
    }

    if (!hasCustomElement) return false;

    // Remove all lit/decorators.js imports
    newContent = newContent.replace(/import\s*{[^}]*}\s*from\s*['"]lit\/decorators\.js['"];\n?/g, '');

    // Add back other imports if any
    if (otherImports.size > 0) {
        const otherImportsStr = `import {${Array.from(otherImports).join(', ')}} from 'lit/decorators.js';\n`;
        newContent = otherImportsStr + newContent;
    }

    // Remove any existing decorator.js import
    newContent = newContent.replace(/import\s*{\s*customElement\s*}\s*from\s*['"][\.\/]*decorator\.js['"];\n?/g, '');

    // Add the new customElement import
    const relativePathToDecorator = path.relative(path.dirname(filePath), path.join(path.dirname(filePath), 'decorator.js')).replace(/\\/g, '/');
    const decoratorImport = `import { customElement } from '${relativePathToDecorator}';\n`;

    // Add the new import at the start of the file
    newContent = decoratorImport + newContent;

    fs.writeFileSync(filePath, newContent);
    return true;
}

async function main() {
    try {
        const files = await glob('packages/openbridge-webcomponents/**/*.ts', {
            ignore: ['**/node_modules/**', '**/dist/**', '**/build/**'],
            absolute: true
        });

        console.log(`Found ${files.length} TypeScript files`);
        let changedFiles = 0;

        for (const file of files) {
            try {
                if (fixImports(file)) {
                    console.log(`Updated imports in ${file}`);
                    changedFiles++;
                }
            } catch (error) {
                console.error(`Error processing ${file}:`, error);
            }
        }

        console.log(`\nTotal files changed: ${changedFiles}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

main(); 