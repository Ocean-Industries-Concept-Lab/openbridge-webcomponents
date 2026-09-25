import type {AST, Rule} from 'eslint';

/** A field's inline doc that can move into the class JSDoc, and as what. */
export interface HoistableFieldDoc {
  ok: true;
  text: string[];
  availableWhen: string | null;
}

/** A field's inline doc that stays where it is; `keep` spares it the report. */
export interface InlineFieldDoc {
  ok: false;
  reason: string;
  keep?: boolean;
}

export type FieldDocClassification = HoistableFieldDoc | InlineFieldDoc;

export function isJsDoc(
  comment: AST.Token | {type: string; value: string}
): boolean;
export function jsDocLines(comment: {value: string}): string[];
export function classifyFieldDoc(
  lines: string[],
  initializerText?: string,
  initializerIsLiteral?: boolean
): FieldDocClassification;
export function tagLinesFor(name: string, doc: HoistableFieldDoc): string[];
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
