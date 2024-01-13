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

fixIndexFiles();
