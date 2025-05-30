import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run') || args.includes('-d');
const isVerbose = args.includes('--verbose') || args.includes('-v');

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: node fix-imports.mjs [options]

Options:
  --dry-run, -d    Show what would be changed without making changes
  --verbose, -v    Show detailed output
  --help, -h       Show this help message

Examples:
  node fix-imports.mjs                # Fix all imports
  node fix-imports.mjs --dry-run      # Check imports without changing files
  node fix-imports.mjs -d -v          # Dry run with verbose output
`);
  process.exit(0);
}

// Function to recursively find all .ts files
function findTsFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (
      stat.isDirectory() &&
      !item.startsWith('.') &&
      item !== 'node_modules' &&
      item !== 'dist'
    ) {
      findTsFiles(fullPath, files);
    } else if (item.endsWith('.ts') && !item.endsWith('.d.ts')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Function to check/fix imports in a file
function processImportsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  const changes = [];

  // Fix relative imports with 'from' that don't have extensions
  let fixedContent = content.replace(
    /import\s+([^'"]*)\s+from\s+['"](\.[^'"]*?)(?<!\.ts|\.js|\.css|\.json|\.vue|\.mjs)['"];?/g,
    (match, importPart, importPath, offset) => {
      // Skip CSS imports with ?inline
      if (importPath.includes('.css?inline')) {
        return match;
      }

      // Check if the imported file exists with .ts extension (source file)
      const resolvedPath = path.resolve(
        path.dirname(filePath),
        importPath + '.ts'
      );
      if (fs.existsSync(resolvedPath)) {
        const lineNumber = content.substring(0, offset).split('\n').length;
        const newImport = `import ${importPart} from '${importPath}.js';`;
        changes.push({
          line: lineNumber,
          old: match,
          new: newImport,
          type: 'import-from',
        });
        modified = true;
        return newImport;
      }

      return match;
    }
  );

  // Fix side-effect imports without 'from' that don't have extensions
  fixedContent = fixedContent.replace(
    /import\s+['"](\.[^'"]*?)(?<!\.ts|\.js|\.css|\.json|\.vue|\.mjs)['"];?/g,
    (match, importPath, offset) => {
      // Skip CSS imports with ?inline
      if (importPath.includes('.css?inline')) {
        return match;
      }

      // Check if the imported file exists with .ts extension (source file)
      const resolvedPath = path.resolve(
        path.dirname(filePath),
        importPath + '.ts'
      );
      if (fs.existsSync(resolvedPath)) {
        const lineNumber = content.substring(0, offset).split('\n').length;
        const newImport = `import '${importPath}.js';`;
        changes.push({
          line: lineNumber,
          old: match,
          new: newImport,
          type: 'import-side-effect',
        });
        modified = true;
        return newImport;
      }

      return match;
    }
  );

  const relativePath = path.relative(__dirname, filePath);

  if (modified) {
    if (isDryRun) {
      console.log(`❌ ${relativePath} - would be modified`);
      if (isVerbose) {
        changes.forEach((change) => {
          console.log(`  Line ${change.line}: ${change.old} → ${change.new}`);
        });
      }
    } else {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`✅ Fixed imports in: ${relativePath}`);
      if (isVerbose) {
        changes.forEach((change) => {
          console.log(`  Line ${change.line}: ${change.old} → ${change.new}`);
        });
      }
    }
  } else if (isVerbose) {
    console.log(`✅ ${relativePath} - no changes needed`);
  }

  return {modified, changes: changes.length};
}

// Main execution
const srcDir = path.join(__dirname, 'src');
const tsFiles = findTsFiles(srcDir);

console.log(`Found ${tsFiles.length} TypeScript files`);
if (isDryRun) {
  console.log('🔍 Running in dry-run mode - no files will be modified\n');
}

let totalFilesModified = 0;
let totalChanges = 0;

for (const file of tsFiles) {
  const result = processImportsInFile(file);
  if (result.modified) {
    totalFilesModified++;
  }
  totalChanges += result.changes;
}

console.log('\n📊 Summary:');
console.log(`Files processed: ${tsFiles.length}`);
console.log(
  `Files ${isDryRun ? 'that would be modified' : 'modified'}: ${totalFilesModified}`
);
console.log(`Total changes ${isDryRun ? 'needed' : 'made'}: ${totalChanges}`);

if (isDryRun && totalFilesModified > 0) {
  console.log(
    '\n❌ Some files need import fixes. Run without --dry-run to fix them.'
  );
  process.exit(1);
} else if (isDryRun) {
  console.log('\n✅ All imports have correct file extensions!');
} else if (totalFilesModified > 0) {
  console.log('\n✅ All imports have been fixed!');
} else {
  console.log('\n✅ All imports already had correct file extensions!');
}
