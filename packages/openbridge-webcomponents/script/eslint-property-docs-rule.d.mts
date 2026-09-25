import type {AST, Rule} from 'eslint';

/** Whether a field's inline doc can move into the class JSDoc, and as what. */
export interface FieldDocClassification {
  ok: boolean;
  reason?: string;
  keep?: boolean;
  text?: string;
  availableWhen?: string | null;
}

export function isJsDoc(
  comment: AST.Token | {type: string; value: string}
): boolean;
export function jsDocLines(comment: {value: string}): string[];
export function classifyFieldDoc(
  lines: string[],
  initializerText?: string,
  initializerIsLiteral?: boolean
): FieldDocClassification;
export function tagLinesFor(
  name: string,
  doc: FieldDocClassification
): string[];
export function insertionPoint(lines: string[]): {
  insertAt: number;
  needsBlank: boolean;
};
export function buildHoistFix(
  classComment: {value: string; range: [number, number]},
  headerLines: string[],
  hoistable: unknown[]
): (fixer: Rule.RuleFixer) => Rule.Fix | Rule.Fix[];
export const propertyDocsRule: Rule.RuleModule;
