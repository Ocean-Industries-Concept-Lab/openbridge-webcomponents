// script/inject-docs.test.ts
import {describe, expect, it} from 'vitest';
import {docsFromManifest, injectDts, injectSvelte} from './inject-docs.js';

const docs = docsFromManifest({
  modules: [{path: 'src/a.ts', declarations: [{kind: 'class', name: 'ObcA', members: [
    {kind: 'field', name: 'minValue', description: 'Minimum scale value (manual mode)'},
    {kind: 'field', name: 'mainTickmarks', description: 'Values for main tickmarks.\nEmpty array means defaults.'},
    {kind: 'field', name: 'hidden', description: 'x', privacy: 'private'},
    {kind: 'method', name: 'render', description: 'no'},
  ]}]}],
});

describe('injectDts', () => {
  it('adds JSDoc above undocumented fields of the declared class, once', () => {
    const src = 'export declare class ObcA extends LitElement {\n    minValue: number;\n    /** kept */\n    maxValue: number;\n    mainTickmarks?: number[] | undefined;\n    render(): unknown;\n}\n';
    const once = injectDts(src, docs);
    expect(once).toBe('export declare class ObcA extends LitElement {\n    /** Minimum scale value (manual mode) */\n    minValue: number;\n    /** kept */\n    maxValue: number;\n    /**\n     * Values for main tickmarks.\n     * Empty array means defaults.\n     */\n    mainTickmarks?: number[] | undefined;\n    render(): unknown;\n}\n');
    expect(injectDts(once, docs)).toBe(once);
  });
});

describe('injectSvelte', () => {
  it('adds JSDoc above undocumented Props members', () => {
    const src = 'export interface Props {\n     class?: string;\n     minValue?: number;\n      /** kept */\nmaxValue?: number\n}';
    expect(injectSvelte(src, 'ObcA', docs)).toBe('export interface Props {\n     class?: string;\n     /** Minimum scale value (manual mode) */\n     minValue?: number;\n      /** kept */\nmaxValue?: number\n}');
  });
});
