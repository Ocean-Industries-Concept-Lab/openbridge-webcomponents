import * as fs from 'fs';
import * as path from 'path';

interface Declaration {
  kind: string;
  name?: string;
  [key: string]: unknown;
}

interface Module {
  kind: string;
  path: string;
  declarations?: Declaration[];
  exports?: unknown[];
  [key: string]: unknown;
}

interface CustomElementsJson {
  schemaVersion: string;
  readme: string;
  modules: Module[];
}

const filePath = path.join(process.cwd(), 'custom-elements.json');

const data: CustomElementsJson = JSON.parse(
  fs.readFileSync(filePath, 'utf8')
);

const filteredModules = data.modules
  .map((module): Module | null => {
    if (!module.declarations || !Array.isArray(module.declarations)) {
      return null;
    }

    const filteredDeclarations = module.declarations.filter(
      (declaration: Declaration) => {
        return declaration.name && declaration.name.startsWith('Obc');
      }
    );

    if (filteredDeclarations.length === 0) {
      return null;
    }

    return {
      ...module,
      declarations: filteredDeclarations,
    };
  })
  .filter((module): module is Module => module !== null);

filteredModules.sort((a, b) => {
  const pathA = a.path || '';
  const pathB = b.path || '';
  return pathA.localeCompare(pathB);
});

const result: CustomElementsJson = {
  ...data,
  modules: filteredModules,
};

fs.writeFileSync(filePath, JSON.stringify(result, null, 2) + '\n', 'utf8');

console.log(
  `Filtered and sorted ${filteredModules.length} modules with Obc declarations`
);
console.log(`Original file had ${data.modules.length} modules`);
