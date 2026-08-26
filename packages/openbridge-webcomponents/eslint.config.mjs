import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// Custom plugin for handling customElement imports
const customElementPlugin = {
  rules: {
    'prefer-local-decorator': {
      meta: {
        type: 'suggestion',
        docs: {
          description:
            'Ensure customElement is imported from local decorator.js',
          category: 'Best Practices',
          recommended: true,
        },
        fixable: 'code',
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            if (node.source.value === 'lit/decorators.js') {
              const specifiers = node.specifiers;
              const customElementSpec = specifiers.find(
                (spec) =>
                  spec.type === 'ImportSpecifier' &&
                  spec.imported.name === 'customElement'
              );

              if (customElementSpec) {
                const otherSpecs = specifiers.filter(
                  (spec) =>
                    spec.type === 'ImportSpecifier' &&
                    spec.imported.name !== 'customElement'
                );

                context.report({
                  node,
                  message:
                    'customElement should be imported from local src/decorator.js',
                  fix(fixer) {
                    const fixes = [];
                    const sourceFile = context.filename;
                    const relativePathToDecorator = path
                      .relative(
                        path.dirname(sourceFile),
                        path.join(path.dirname(sourceFile), 'decorator.js')
                      )
                      .replace(/\\/g, '/');

                    // Remove the old import
                    fixes.push(fixer.remove(node));

                    // Add the new customElement import
                    fixes.push(
                      fixer.insertTextBefore(
                        node,
                        `import { customElement } from '${relativePathToDecorator}';\n`
                      )
                    );

                    // Add back other imports if any
                    if (otherSpecs.length > 0) {
                      const names = otherSpecs
                        .map((spec) => spec.imported.name)
                        .join(', ');
                      fixes.push(
                        fixer.insertTextBefore(
                          node,
                          `import { ${names} } from 'lit/decorators.js';\n`
                        )
                      );
                    }

                    return fixes;
                  },
                });
              }
            }
          },
        };
      },
    },
  },
};

// Words that should stay lowercase in Title Case (unless they are the first word of a segment)
const TITLE_CASE_LOWERCASE_WORDS = new Set([
  'and',
  'of',
  'or',
  'in',
  'on',
  'at',
  'to',
  'for',
]);

function capitalizeWord(word) {
  if (word.length === 0) return word;
  // All-uppercase words (acronyms like POI, AR, ROT) are kept as-is
  if (word === word.toUpperCase() && word.length > 1) return word;
  // Capitalize each part of a hyphenated compound (e.g. Action-change → Action-Change)
  if (word.includes('-')) {
    return word
      .split('-')
      .map((part) => capitalizeWord(part))
      .join('-');
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function titleCaseWords(text) {
  const words = text.split(/\s+/);
  const lastIndex = words.length - 1;
  return words
    .map((word, i) => {
      if (word.length === 0) return word;
      // First and last words are always capitalized
      if (i === 0 || i === lastIndex) return capitalizeWord(word);
      // Short conjunctions / prepositions stay lowercase (only unhyphenated)
      if (TITLE_CASE_LOWERCASE_WORDS.has(word.toLowerCase())) {
        return word.toLowerCase();
      }
      // Everything else is capitalized
      return capitalizeWord(word);
    })
    .join(' ');
}

// Separator pattern: em dash, en dash, or spaced hyphen used as phrase dividers
const PHRASE_SEPARATOR = /(\s*[\u2013\u2014]\s*|\s+-\s+)/;

function toTitleCase(segment) {
  // Split into parts outside and inside parentheses; only title-case outside
  return segment.replace(/[^()]+/g, (part, offset) => {
    // Check if this part is inside parentheses by looking at the character before it
    if (offset > 0 && segment[offset - 1] === '(') return part;
    // Split on phrase separators (em/en dash, spaced hyphen) so each phrase
    // gets independent title-casing (first word always capitalized)
    return part
      .split(PHRASE_SEPARATOR)
      .map((chunk) =>
        PHRASE_SEPARATOR.test(chunk) ? chunk : titleCaseWords(chunk)
      )
      .join('');
  });
}

// --- Component lifecycle tags (AGENTS.md § 3) -------------------------------
// The class-level JSDoc tag on an `@customElement` class is the single source
// of truth for a component's lifecycle state; a story's `meta.tags` mirrors it.

const LIFECYCLE_JSDOC_TAGS = ['stable', 'beta', 'experimental', 'deprecated'];

// `@stable` deliberately maps to no story tag, so a sidebar badge always means
// "there is a caveat here" rather than decorating every entry.
const LIFECYCLE_STORY_TAG = {
  beta: 'beta',
  experimental: 'experimental',
  deprecated: 'deprecated',
};

// Story tags this rule owns and will rewrite. `wip` and `alpha` are the retired
// names, listed so the autofix removes them.
const OWNED_STORY_TAGS = new Set([
  'beta',
  'experimental',
  'deprecated',
  'wip',
  'alpha',
]);

const SRC_DIR = path.join(__dirname, 'src');

// A JSDoc block (`/** … */` — never a plain `/* … */`) immediately preceding a
// `@customElement('…')` decorator. The inner group forbids `*/` so an earlier,
// unrelated JSDoc block cannot be stretched across intervening code to reach
// the decorator.
const CUSTOM_ELEMENT_WITH_DOC =
  /\/\*\*((?:(?!\*\/)[\s\S])*)\*\/\s*@customElement\(\s*['"]([^'"]+)['"]\s*\)/g;
// Anchored to the start of a line so a `@customElement(…)` written inside a
// JSDoc code fence (where the line starts with ` * `) is not mistaken for a
// real decorator.
const CUSTOM_ELEMENT_ANY =
  /(?:^|\r?\n)[ \t]*@customElement\(\s*['"]([^'"]+)['"]\s*\)/g;

const lifecycleTagPatterns = new Map(
  LIFECYCLE_JSDOC_TAGS.map((tag) => [
    tag,
    new RegExp(`^[ \\t]*\\*?[ \\t]*@${tag}\\b`, 'm'),
  ])
);

// Every `@customElement` in a source text, with the lifecycle tags declared in
// its class JSDoc. Shared by both rules so they can never disagree.
function extractComponents(source) {
  const components = [];
  const seen = new Set();
  let match;

  CUSTOM_ELEMENT_WITH_DOC.lastIndex = 0;
  while ((match = CUSTOM_ELEMENT_WITH_DOC.exec(source)) !== null) {
    const doc = match[1];
    const decoratorOffset = match[0].lastIndexOf('@customElement');
    components.push({
      tag: match[2],
      tags: LIFECYCLE_JSDOC_TAGS.filter((tag) =>
        lifecycleTagPatterns.get(tag).test(doc)
      ),
      index: match.index + decoratorOffset,
      length: match[0].length - decoratorOffset,
    });
    seen.add(match[2]);
  }

  CUSTOM_ELEMENT_ANY.lastIndex = 0;
  while ((match = CUSTOM_ELEMENT_ANY.exec(source)) !== null) {
    if (seen.has(match[1])) continue;
    seen.add(match[1]);
    const decoratorOffset = match[0].indexOf('@customElement');
    components.push({
      tag: match[1],
      tags: [],
      index: match.index + decoratorOffset,
      length: match[0].length - decoratorOffset,
    });
  }

  return components;
}

function collectComponentSources(dir, out) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Icons are generated and carry no lifecycle tags by design.
      if (entry.name === 'icons' && dir === SRC_DIR) continue;
      collectComponentSources(full, out);
    } else if (
      entry.name.endsWith('.ts') &&
      !entry.name.endsWith('.stories.ts')
    ) {
      out.push(full);
    }
  }
  return out;
}

// ESLint has no cross-file API, so the tag → lifecycle map is built by reading
// the sources directly. The result is cached: rebuilt at most once every two
// seconds so a long-lived editor process still picks up JSDoc edits, while a
// single CLI run over hundreds of story files pays for it only a few times.
const COMPONENT_INDEX_TTL_MS = 2000;
let componentIndex = null;
let componentIndexBuiltAt = 0;
let componentIndexPinned = false;

function getComponentIndex() {
  if (componentIndexPinned) return componentIndex;

  const now = Date.now();
  if (componentIndex && now - componentIndexBuiltAt < COMPONENT_INDEX_TTL_MS) {
    return componentIndex;
  }

  const index = new Map();
  let files;
  try {
    files = collectComponentSources(SRC_DIR, []);
  } catch {
    files = [];
  }

  for (const file of files) {
    let source;
    try {
      source = fs.readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    if (!source.includes('@customElement')) continue;
    for (const component of extractComponents(source)) {
      index.set(component.tag, {file, tags: component.tags});
    }
  }

  componentIndex = index;
  componentIndexBuiltAt = now;
  return index;
}

function unwrapTypeExpression(node) {
  let current = node;
  while (
    current &&
    (current.type === 'TSSatisfiesExpression' ||
      current.type === 'TSAsExpression')
  ) {
    current = current.expression;
  }
  return current;
}

function findObjectProperty(objectExpression, name) {
  return objectExpression.properties.find(
    (property) =>
      property.type === 'Property' &&
      !property.computed &&
      property.key.type === 'Identifier' &&
      property.key.name === name
  );
}

function quoteList(names) {
  return names.map((name) => `'${name}'`).join(', ');
}

// Custom plugin for local OpenBridge lint rules. Exported so
// eslint.comments.config.mjs can register the same rule objects.
export const openbridgePlugin = {
  rules: {
    'storybook-title-case': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Enforce Title Case on Storybook meta `title` (with `/`-separated segments) and story `name` fields',
        },
        fixable: 'code',
      },
      create(context) {
        function checkTitleCase(node, value, isSegmented) {
          if (isSegmented) {
            const segments = value.split('/');
            const problems = [];

            for (const [i, segment] of segments.entries()) {
              const trimmed = segment.trim();
              if (trimmed.length === 0) {
                problems.push({index: i, segment, issue: 'empty segment'});
                continue;
              }
              if (/(?<=[a-zA-Z])-(?=[a-zA-Z])/.test(trimmed)) {
                problems.push({
                  index: i,
                  segment: trimmed,
                  issue: 'use spaces instead of dashes',
                });
                continue;
              }
              const expected = toTitleCase(trimmed);
              if (trimmed !== expected) {
                problems.push({
                  index: i,
                  segment: trimmed,
                  expected,
                  issue: `should be "${expected}"`,
                });
              }
            }

            if (problems.length === 0) return;

            const fixedTitle = segments
              .map((s) => {
                const trimmed = s.trim();
                const spacedOut = trimmed.replace(
                  /(?<=[a-zA-Z])-(?=[a-zA-Z])/g,
                  ' '
                );
                return toTitleCase(spacedOut);
              })
              .join('/');

            context.report({
              node,
              message: `Storybook title segments must use Title Case with spaces (not dashes). ${problems.map((p) => `Segment "${p.segment}": ${p.issue}`).join('; ')}.`,
              fix(fixer) {
                return fixer.replaceText(node, `'${fixedTitle}'`);
              },
            });
          } else {
            const expected = toTitleCase(value);
            if (value === expected) return;

            context.report({
              node,
              message: `Storybook story name must use Title Case. Expected "${expected}".`,
              fix(fixer) {
                return fixer.replaceText(node, `'${expected}'`);
              },
            });
          }
        }

        return {
          Property(node) {
            if (node.key.type !== 'Identifier') return;
            if (
              node.value.type !== 'Literal' ||
              typeof node.value.value !== 'string'
            )
              return;

            const propName = node.key.name;

            if (propName === 'title') {
              const value = node.value.value;
              if (!value.includes('/')) return;
              checkTitleCase(node.value, value, true);
            } else if (propName === 'name') {
              // Only match story-level `name` (Property → ObjectExpression → VariableDeclarator)
              // to avoid false positives on argTypes/args/controls nested `name` fields
              const parent = node.parent;
              if (
                !parent ||
                parent.type !== 'ObjectExpression' ||
                !parent.parent ||
                parent.parent.type !== 'VariableDeclarator'
              )
                return;
              checkTitleCase(node.value, node.value.value, false);
            }
          },
        };
      },
    },
    'component-lifecycle-tag': {
      meta: {
        type: 'suggestion',
        docs: {
          description:
            'Require exactly one lifecycle tag (@stable, @beta, @experimental, @deprecated) in the class JSDoc of every @customElement',
        },
        schema: [],
      },
      create(context) {
        const sourceCode = context.sourceCode ?? context.getSourceCode();

        return {
          'Program:exit'() {
            const text = sourceCode.getText();
            if (!text.includes('@customElement')) return;

            for (const component of extractComponents(text)) {
              if (component.tags.length === 1) continue;

              context.report({
                loc: {
                  start: sourceCode.getLocFromIndex(component.index),
                  end: sourceCode.getLocFromIndex(
                    component.index + component.length
                  ),
                },
                message:
                  component.tags.length === 0
                    ? `<${component.tag}> has no lifecycle tag in its class JSDoc. Add exactly one of @stable, @beta, @experimental or @deprecated (see AGENTS.md § 3).`
                    : `<${component.tag}> declares more than one lifecycle tag (${component.tags
                        .map((tag) => `@${tag}`)
                        .join(', ')}). Exactly one is allowed.`,
              });
            }
          },
        };
      },
    },
    'story-lifecycle-tags': {
      meta: {
        type: 'problem',
        docs: {
          description:
            "Keep a story's meta.tags lifecycle entry in sync with the class JSDoc lifecycle tag of its meta.component",
        },
        fixable: 'code',
        schema: [],
      },
      create(context) {
        const sourceCode = context.sourceCode ?? context.getSourceCode();

        return {
          VariableDeclarator(node) {
            if (node.id.type !== 'Identifier' || node.id.name !== 'meta')
              return;

            const meta = unwrapTypeExpression(node.init);
            if (!meta || meta.type !== 'ObjectExpression') return;

            const componentProperty = findObjectProperty(meta, 'component');
            if (
              !componentProperty ||
              componentProperty.value.type !== 'Literal' ||
              typeof componentProperty.value.value !== 'string'
            )
              return;

            const componentTag = componentProperty.value.value;
            const component = getComponentIndex().get(componentTag);

            // A component with no tag, or more than one, is reported against
            // its own source file by `component-lifecycle-tag`; there is no
            // single correct story tag to fix towards here.
            if (!component || component.tags.length !== 1) return;

            const lifecycle = component.tags[0];
            const expected = LIFECYCLE_STORY_TAG[lifecycle];
            const desired = expected ? [expected] : [];
            const tagsProperty = findObjectProperty(meta, 'tags');

            if (!tagsProperty) {
              if (!expected) return;

              context.report({
                node: componentProperty.value,
                message: `<${componentTag}> is @${lifecycle}, so meta.tags must contain '${expected}', but meta has no tags.`,
                fix(fixer) {
                  const titleProperty = findObjectProperty(meta, 'title');
                  if (titleProperty) {
                    const next = sourceCode.getTokenAfter(titleProperty);
                    return next && next.value === ','
                      ? fixer.insertTextAfter(
                          next,
                          `\n  tags: ['${expected}'],`
                        )
                      : fixer.insertTextAfter(
                          titleProperty,
                          `,\n  tags: ['${expected}']`
                        );
                  }
                  const first = meta.properties[0];
                  return first
                    ? fixer.insertTextBefore(
                        first,
                        `tags: ['${expected}'],\n  `
                      )
                    : null;
                },
              });
              return;
            }

            if (tagsProperty.value.type !== 'ArrayExpression') return;

            const elements = tagsProperty.value.elements.filter(Boolean);
            const owned = elements.filter(
              (element) =>
                element.type === 'Literal' &&
                typeof element.value === 'string' &&
                OWNED_STORY_TAGS.has(element.value)
            );
            const found = owned.map((element) => element.value);

            if (
              found.length === desired.length &&
              found.every((name, i) => name === desired[i])
            )
              return;

            const kept = elements.filter((element) => !owned.includes(element));
            const nextElements = [
              ...kept.map((element) => sourceCode.getText(element)),
              ...desired.map((name) => `'${name}'`),
            ];

            context.report({
              node: tagsProperty.value,
              message: expected
                ? `<${componentTag}> is @${lifecycle}, so meta.tags must carry ${quoteList(desired)}, but it carries ${found.length ? quoteList(found) : 'no lifecycle tag'}.`
                : `<${componentTag}> is @${lifecycle}, so meta.tags must carry no lifecycle tag, but it carries ${quoteList(found)}.`,
              fix(fixer) {
                if (nextElements.length > 0) {
                  return fixer.replaceText(
                    tagsProperty.value,
                    `[${nextElements.join(', ')}]`
                  );
                }
                const previous = sourceCode.getTokenBefore(tagsProperty);
                const next = sourceCode.getTokenAfter(tagsProperty);
                const start = previous
                  ? previous.range[1]
                  : tagsProperty.range[0];
                const end =
                  next && next.value === ','
                    ? next.range[1]
                    : tagsProperty.range[1];
                return fixer.removeRange([start, end]);
              },
            });
          },
        };
      },
    },
    'prefer-boolean-property-default-false': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Prefer boolean property default values of false or set Attribute: false on the property decorator',
        },
      },
      create(context) {
        return {
          PropertyDefinition(node) {
            if (node.type !== 'PropertyDefinition') return;
            if (node.value === undefined || node.value === null) return;
            if (node.value.type !== 'Literal') return;
            if (node.value.value !== true) return;
            // Only apply to @property()-decorated fields (plain class fields are exempt)
            const propertyDecorator = node.decorators?.find(
              (d) =>
                d.expression?.type === 'CallExpression' &&
                d.expression.callee?.type === 'Identifier' &&
                d.expression.callee.name === 'property'
            );
            if (!propertyDecorator) return;
            // Check if the property decorator has attribute: false — that's the
            // accepted escape hatch for true-default booleans (see docs/agents/coding-standards.md).
            const property =
              propertyDecorator.expression?.arguments[0]?.properties?.find(
                (p) =>
                  p.type === 'Property' &&
                  !p.computed &&
                  p.key.type === 'Identifier' &&
                  p.key.name === 'attribute'
              );
            if (property?.value?.value === false) {
              return;
            }
            let message =
              'Prefer boolean property default values of false or set attribute: false on the property decorator';
            context.report({
              node,
              message,
            });
          },
        };
      },
    },
    'prefer-enum-over-string-literal-union': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Disallow string-literal unions on class fields (prefer enums instead)',
        },
        schema: [],
      },
      create(context) {
        function isStringLiteralUnion(typeNode) {
          if (!typeNode || typeNode.type !== 'TSUnionType') return false;
          if (typeNode.types.length < 2) return false;

          return typeNode.types.every(
            (t) =>
              t.type === 'TSLiteralType' &&
              t.literal &&
              t.literal.type === 'Literal' &&
              typeof t.literal.value === 'string'
          );
        }

        function isStringLiteralInitializer(valueNode) {
          return (
            valueNode &&
            valueNode.type === 'Literal' &&
            typeof valueNode.value === 'string'
          );
        }

        return {
          // Type aliases: `export type Foo = 'a' | 'b'`
          TSTypeAliasDeclaration(node) {
            if (!isStringLiteralUnion(node.typeAnnotation)) return;

            context.report({
              node,
              message: 'Avoid string-literal union types; use an enum instead.',
            });
          },

          // Class fields: `foo: 'a' | 'b' = 'a'`
          PropertyDefinition(node) {
            // Limit scope to Lit properties declared as `@property({type: String})`
            const hasLitStringPropertyDecorator = (node.decorators ?? []).some(
              (decorator) => {
                const expr = decorator.expression;
                if (!expr || expr.type !== 'CallExpression') return false;
                if (!expr.callee || expr.callee.type !== 'Identifier')
                  return false;
                if (expr.callee.name !== 'property') return false;

                const arg0 = expr.arguments?.[0];
                if (!arg0 || arg0.type !== 'ObjectExpression') return false;

                const typeProp = arg0.properties.find((p) => {
                  if (!p || p.type !== 'Property') return false;
                  if (p.key.type !== 'Identifier') return false;
                  if (p.key.name !== 'type') return false;
                  return (
                    p.value &&
                    p.value.type === 'Identifier' &&
                    p.value.name === 'String'
                  );
                });

                return Boolean(typeProp);
              }
            );
            if (!hasLitStringPropertyDecorator) return;

            const typeAnn = node.typeAnnotation?.typeAnnotation;
            if (!isStringLiteralUnion(typeAnn)) return;
            if (!isStringLiteralInitializer(node.value)) return;

            context.report({
              node,
              message:
                'Avoid string-literal unions in `@property({type: String})` fields; use an enum type instead.',
            });
          },
        };
      },
    },
    'prefer-array-property-type-and-item-interface': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Require @property array fields to declare {type: Array} and avoid inline item object types',
        },
        schema: [],
      },
      create(context) {
        function getPropertyDecorator(node) {
          return (node.decorators ?? []).find((decorator) => {
            const expr = decorator.expression;
            return (
              expr &&
              expr.type === 'CallExpression' &&
              expr.callee &&
              expr.callee.type === 'Identifier' &&
              expr.callee.name === 'property'
            );
          });
        }

        function getArrayElementType(typeNode) {
          if (!typeNode) return null;
          if (typeNode.type === 'TSArrayType') {
            return typeNode.elementType;
          }
          if (
            typeNode.type === 'TSTypeReference' &&
            typeNode.typeName &&
            typeNode.typeName.type === 'Identifier' &&
            typeNode.typeName.name === 'Array'
          ) {
            return typeNode.typeArguments?.params?.[0] ?? null;
          }
          return null;
        }

        function hasTypeArrayOption(propertyDecorator) {
          const options = propertyDecorator.expression.arguments?.[0];
          if (!options || options.type !== 'ObjectExpression') return false;
          return options.properties.some((prop) => {
            if (!prop || prop.type !== 'Property') return false;
            if (prop.key.type !== 'Identifier' || prop.key.name !== 'type')
              return false;
            return (
              prop.value &&
              prop.value.type === 'Identifier' &&
              prop.value.name === 'Array'
            );
          });
        }

        function containsInlineObjectType(typeNode) {
          if (!typeNode) return false;
          if (typeNode.type === 'TSTypeLiteral') return true;
          if (typeNode.type === 'TSUnionType') {
            return typeNode.types.some((t) => containsInlineObjectType(t));
          }
          if (typeNode.type === 'TSIntersectionType') {
            return typeNode.types.some((t) => containsInlineObjectType(t));
          }
          return false;
        }

        return {
          PropertyDefinition(node) {
            const propertyDecorator = getPropertyDecorator(node);
            if (!propertyDecorator) return;

            const typeAnnotation = node.typeAnnotation?.typeAnnotation;
            const arrayElementType = getArrayElementType(typeAnnotation);
            if (!arrayElementType) return;

            if (!hasTypeArrayOption(propertyDecorator)) {
              context.report({
                node: propertyDecorator,
                message:
                  'Array properties decorated with @property must include {type: Array}.',
              });
            }

            if (containsInlineObjectType(arrayElementType)) {
              context.report({
                node: arrayElementType,
                message:
                  'Array item type must be a named interface/type (avoid inline object types like Array<{...}>).',
              });
            }
          },
        };
      },
    },
  },
};

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended'
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'custom-element': customElementPlugin,
      openbridge: openbridgePlugin,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },

    rules: {
      'no-prototype-builtins': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'custom-element/prefer-local-decorator': 'error',
      'openbridge/prefer-enum-over-string-literal-union': 'error',
      'openbridge/prefer-boolean-property-default-false': 'error',
      'openbridge/prefer-array-property-type-and-item-interface': 'error',
      'openbridge/component-lifecycle-tag': 'warn',
      'openbridge/storybook-title-case': 'off',
      'openbridge/story-lifecycle-tags': 'off',
      // Disabled because eslint-plugin-file-extension-in-import-ts is not yet
      // compatible with ESLint v10 (it still uses deprecated context methods).
      'file-extension-in-import-ts/file-extension-in-import-ts': 'off',
    },
  },
  {
    files: ['**/rollup.config.js', '**/web-test-runner.config.js'],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: [
      '**/*_test.ts',
      '**/custom_typings/*.ts',
      'packages/labs/ssr/src/test/integration/tests/**',
      'packages/labs/ssr/src/lib/util/parse5-utils.ts',
    ],

    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    // Generated locale files use string-literal unions from lit-localize
    files: ['**/generated/locales/*.ts'],

    rules: {
      'openbridge/prefer-enum-over-string-literal-union': 'off',
    },
  },
  {
    // Icon components carry no lifecycle tags by design.
    files: ['src/icons/**/*.ts', 'src/manual-icon/**/*.ts'],

    rules: {
      'openbridge/component-lifecycle-tag': 'off',
    },
  },
  {
    files: ['**/*.stories.ts'],

    rules: {
      'openbridge/storybook-title-case': 'error',
      'openbridge/story-lifecycle-tags': 'error',
      'openbridge/component-lifecycle-tag': 'off',
    },
  },
];

// ESLint reads only the default export. These named exports exist for
// script/eslint-rules.test.ts, which unit-tests the lifecycle-tag rules.
export const __testables = {
  openbridgePlugin,
  extractComponents,
  pinComponentIndex(entries) {
    componentIndex = new Map(
      Object.entries(entries).map(([tag, tags]) => [tag, {file: tag, tags}])
    );
    componentIndexPinned = true;
  },
};
