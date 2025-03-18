import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('src');
const IMPORT_REGEX = /import(.+?)['"](\.*\/[^'";?]+)['"]/g; // Skip filenames with ?

function checkAndFixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasFixes = false;

    content = content.replace(IMPORT_REGEX, (fullMatch, middelPart, importPath) => {
        if (!importPath.endsWith('.js')) {
            hasFixes = true;
            return `import${middelPart}'${importPath}.js'`;
        }
        return fullMatch;
    });

    if (hasFixes) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`🔧 Fixed imports in: ${filePath}`);
    }
}

function getAllTsFiles(dir) {
    let files = [];
    for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            files = files.concat(getAllTsFiles(fullPath));
        } else if (file.endsWith('.ts')) {
            files.push(fullPath);
        }
    }
    return files;
}

function main() {
    const tsFiles = getAllTsFiles(SRC_DIR);
    tsFiles.forEach(file => checkAndFixFile(file));
    console.log('✅ All imports are now correctly formatted.');
}

main();
