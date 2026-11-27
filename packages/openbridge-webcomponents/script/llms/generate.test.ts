import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {resolveChannel} from './channel.js';
import {generate} from './generate.js';

let root: string;
beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'llms-gen-'));
});
afterEach(() => {
  fs.rmSync(root, {recursive: true, force: true});
});
const write = (rel: string, text: string) => {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), {recursive: true});
  fs.writeFileSync(file, text);
};

/** A package root with a manifest, one guide and one stories file, and nothing optional: no README, no docs/agents. */
function minimalPackage() {
  write(
    'pkg/custom-elements.json',
    JSON.stringify({
      modules: [
        {
          path: 'src/components/a/a.ts',
          declarations: [
            {
              kind: 'class',
              name: 'ObcA',
              tagName: 'obc-a',
              description: '`<obc-a>` – An A.',
              lifecycle: 'stable',
            },
          ],
        },
      ],
    })
  );
  write(
    'pkg/package.json',
    JSON.stringify({name: '@x/y', version: '1.0.0', description: 'Y.'})
  );
  write(
    'pkg/docs/A.mdx',
    `import {Meta} from '@storybook/addon-docs/blocks';\n\n<Meta title="Introduction/A" />\n\n# A page`
  );
  write(
    'pkg/src/components/a/a.stories.ts',
    "export default {title: 'UI/A', component: 'obc-a'};\nexport const Default = {};\nexport const Named = {name: 'Dense (compact)'};"
  );
  fs.mkdirSync(path.join(root, 'repo'));
}

describe('generate', () => {
  it('writes every output from a minimal package and warns about the missing optional inputs', () => {
    minimalPackage();
    const warn = vi.fn();
    const out = path.join(root, 'pkg/llms');
    const report = generate({
      packageRoot: path.join(root, 'pkg'),
      repoRoot: path.join(root, 'repo'),
      out,
      channel: resolveChannel('next', {}),
      warn,
    });
    expect(fs.readdirSync(out).sort()).toEqual([
      'components',
      'docs',
      'llms-full.txt',
      'llms.txt',
    ]);
    expect(fs.readFileSync(path.join(out, 'llms.txt'), 'utf8')).toContain(
      'components/obc-a.md'
    );
    expect(fs.existsSync(path.join(out, 'components/obc-a.md'))).toBe(true);
    expect(fs.existsSync(path.join(out, 'docs/introduction-a.md'))).toBe(true);
    expect(
      fs
        .readFileSync(path.join(out, 'llms-full.txt'), 'utf8')
        .startsWith('# A page')
    ).toBe(true);
    expect(report).toContain('1 components');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('README.md'));
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('docs/agents'));
  });

  it('links a guide from a component page when a raw partial names the tag', () => {
    minimalPackage();
    write(
      'pkg/docs/B.mdx',
      `import list from './b/list.md?raw';\n\n<Meta title="Introduction/B" />\n\n<Markdown>{list}</Markdown>`
    );
    write('pkg/docs/b/list.md', '| `obc-a` |\n|---|');
    generate({
      packageRoot: path.join(root, 'pkg'),
      repoRoot: path.join(root, 'repo'),
      out: path.join(root, 'pkg/llms'),
      channel: resolveChannel('next', {}),
      warn: () => {},
    });
    const page = fs.readFileSync(
      path.join(root, 'pkg/llms/components/obc-a.md'),
      'utf8'
    );
    expect(page).toContain(
      '- [B](https://openbridge-next-storybook.web.app/docs/introduction-b.md)'
    );
  });

  it('links a story by the id Storybook derives from its export name', () => {
    minimalPackage();
    generate({
      packageRoot: path.join(root, 'pkg'),
      repoRoot: path.join(root, 'repo'),
      out: path.join(root, 'pkg/llms'),
      channel: resolveChannel('next', {}),
      warn: () => {},
    });
    const page = fs.readFileSync(
      path.join(root, 'pkg/llms/components/obc-a.md'),
      'utf8'
    );
    expect(page).toContain(
      '- [Dense (compact)](https://openbridge-next-storybook.web.app/?path=/story/ui-a--named)'
    );
  });

  it('fails on a missing manifest', () => {
    fs.mkdirSync(path.join(root, 'pkg'));
    expect(() =>
      generate({
        packageRoot: path.join(root, 'pkg'),
        repoRoot: root,
        out: path.join(root, 'out'),
        channel: resolveChannel('next', {}),
        warn: () => {},
      })
    ).toThrow(/npm run analyze/);
  });
});
