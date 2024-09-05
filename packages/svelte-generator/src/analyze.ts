import { AbsolutePath, Analyzer } from '@lit-labs/analyzer/package-analyzer.js';
import fs from 'fs';
import { genSvelte } from './tsx-gen';
import { ReactiveProperty } from '@lit-labs/analyzer/lib/model.js';
import ts from 'typescript';

export interface PropBase {
  description: string;
  canBeUndefined?: boolean;
}

export interface PropString extends PropBase {
  type: 'string';
  default: string;
  options?: string;
}

export interface PropInt extends PropBase {
  type: 'integer';
  default: number;
}

export interface PropNumber extends PropBase {
  type: 'number';
  default: number;
}

export interface PropBoolean extends PropBase {
  type: 'boolean';
  default: boolean;
}

export interface PropEnum extends PropBase {
  type: 'enum';
  default: string;
  enumDef: {
    name: string;
    path: string;
  }
}

export type Prop = PropString | PropInt | PropNumber | PropBoolean | PropEnum;
export type PropTree = { [key: string]: Prop };

// name, path: `./${categoryFolder}/${name}`, categoryFolder, id
export interface Component {
  name: string;
  path: string;
  events: string[];
  slots: string[];
  categoryFolder: string;
  id: string;
}


export function genComponent(analyzer: Analyzer, modulePath: AbsolutePath): Component[] {
  const module = analyzer.getModule(modulePath);
  for (const exportName of module.exportNames) {
    const component = module.getResolvedExport(exportName);
    if (!component.isLitElementDeclaration()) {
      continue;
    }
    const name = component.name;
    const id = modulePath.split('src/')[1].replace(/\//g, '.').replace('.ts', '');
    const categoryFolder = modulePath.split('src/')[1].split('/')[0];
    const jsProps = {};
    for (const jsDoc of component.node.jsDoc ?? []) {
      for (const tag of jsDoc.tags) {
        if (["prop", "property"].includes(tag.tagName.getText())) {
          const propNameRegex = /(\{.*?\}\W+)*(.*?)-(.*)/;
          const match = tag.comment.match(propNameRegex);
          if (match === null) {
            throw new Error(`Could not match prop name in comment: ${tag.comment}`);
          }
          const text = match[3].trim();
          const propName = match[2].trim();
          jsProps[propName] = text;
        }
      }
    }
    const props: PropTree = {}
    for (const prop of component.reactiveProperties) {
      const p = prop[1];
      const name = p.name;
      if (p.typeOption === "String") {
        if (isStringOrUndefined(p)) {
          props[name] = {
            type: 'string',
            default: component.getField(p.name)?.default ?? '',
            description: jsProps[name] ?? name,
            canBeUndefined: true
          }
        } else if (isPropEnum(p)) {
          const type = p.type?.type as ts.UnionType;
          if (type === undefined || type.types === undefined) {
            throw new Error(`Enum type is undefined ${component.name} ${p.name}`);
          }
          let canBeUndefined = false;
          for (const t of type.types) {
            if (t.intrinsicName === "undefined") {
              canBeUndefined = true;
            }
          }
          const defaultName = component.getField(p.name)?.default?.split('.').pop();
          if (p.type?.references.length !== 1) {
            throw new Error('Enum type should have exactly one reference');
          }

          let path = p.type.references[0].package! + "/" + p.type.references[0].module!;
          if (!path.endsWith('.js')) {
            // check if the folder exists
            const folder = "../openbridge-webcomponents/" + p.type.references[0].module;
            if (fs.existsSync(folder)) {
              path += '/index.js';
            } else {
              path += '.js';
            }
          }

          props[name] = {
            type: 'enum',
            default: defaultName as string,
            description: jsProps[name] ?? name,
            canBeUndefined,
            enumDef: {
              name: p.type.references[0].name!,
              path: path
            }
          }
        } else if (isStringOptions(p)) {
          props[name] = {
            type: 'string',
            options: "'" + p.node.type.types.map(v => v.literal.text).join("' | '") + "'",
            default: component.getField(p.name)?.default ?? '',
            description: jsProps[name] ?? name
          };
        } else if (isStringType(p)) {
          throw new Error('String type not implemented');
        }
        else {
          props[name] = {
            type: 'string',
            default: component.getField(p.name)?.default ?? '',
            description: jsProps[name] ?? name
          };
        }

      } else if (isPropNumberOrUndefined(p)) {
        props[name] = {
          type: 'number',
          default: parseFloat(component.getField(p.name)?.default ?? '0'),
          description: jsProps[name] ?? name,
          canBeUndefined: true
        };

      } else if (p.typeOption === "Number") {
        props[name] = {
          type: 'number',
          default: parseFloat(component.getField(p.name)?.default ?? '0'),
          description: jsProps[name] ?? name
        };
      } else if (p.typeOption === "Boolean") {
        props[name] = {
          type: 'boolean',
          default: component.getField(p.name)?.default === 'true',
          description: jsProps[name] ?? name
        };
      }
    }
    const events: string[] = [];
    for (const event of component.events) {
      events.push(event[1].name);
    }
    const slots: string[] = [];
    for (const slot of component.slots) {
      if (slot[1].name === undefined || slot[1].name === "-") {
        continue;
      }
      slots.push(slot[1].name);
    }

    const tsx = genSvelte({ className: name, componentId: id, props: props, tagName: component.tagname!, distFile: modulePath.split('src/')[1].replace('.ts', '.js'), events, slots });
    const folder = `../openbridge-webcomponents-svelte/src/lib/${categoryFolder}`;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    fs.writeFileSync(`${folder}/${name}.svelte`, tsx);
    return [{ name, path: `./${categoryFolder}/${name}`, categoryFolder, id, events, slots }];
  }
  return []
}

function isStringOrUndefined(p: ReactiveProperty) {
  if (p.typeOption !== "String")
    return false;
  if (p.type === undefined)
    return false;
  if (p.type.type.isUnion() === false)
    return false;
  if (p.type.type.types.length !== 2)
    return false;
  let hasUndefined = false;
  let hasString = false;
  for (let t of p.type.type.types) {
    if (t.intrinsicName === "undefined")
      hasUndefined = true;
    if (t.intrinsicName === "string")
      hasString = true;
  }
  return hasUndefined && hasString;
}

function isStringOptions(p: ReactiveProperty) {
  if (p.typeOption !== "String")
    return false;
  if (p.type === undefined)
    return false;
  if (!("type" in p.node))
    return false;
  if (!("types" in p.node.type))
    return false;
  if (p.node.type?.types === undefined)
    return false;
  if (p.node.type.types.length > 1)
    return true
  return false;
}

function isStringType(p: ReactiveProperty) {
  if (p.typeOption !== "String")
    return false;
  if (p.type === undefined)
    return false;
  if (!("type" in p.node))
    return false;
  if (("typeName" in p.node.type))
    return true;
  return false;
}


function isPropEnum(p: ReactiveProperty) {
  return p.typeOption === "String" && p.type?.type.isUnion() === true;
}

function isPropNumberOrUndefined(p: ReactiveProperty) {
  if (p.typeOption !== "Number")
    return false;
  if (p.type === undefined)
    return false;
  if (p.type.type.isUnion() === false)
    return false;
  if (p.type.type.types.length !== 2)
    return false;
  let hasUndefined = false;
  let hasNumber = false;
  for (let t of p.type.type.types) {
    if (t.intrinsicName === "undefined")
      hasUndefined = true;
    if (t.intrinsicName === "number")
      hasNumber = true;
  }
  return hasUndefined && hasNumber;
}