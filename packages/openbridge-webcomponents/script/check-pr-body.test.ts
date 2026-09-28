import {describe, expect, it} from 'vitest';
import {
  addedA11yStories,
  baselineId,
  checkPrBody,
  filesAddingOptOuts,
  missingHeadings,
  templateHeadings,
  untickedDocsBoxes,
} from './check-pr-body';

const template =
  '## Summary\n\n## Why\n\n## Alternatives considered (and why not)\n\n## Verification\n\n## Docs\n\n- [ ] docs/agents updated\n';

const body = (extra = '') =>
  `## Summary\nx\n\n## Why\ny\n\n## Alternatives considered (and why not)\nNone\n\n## Verification\n${extra}\n\n## Docs\n\n- [x] docs/agents updated\n`;

describe('templateHeadings / missingHeadings', () => {
  it('reads the headings without their parenthetical', () => {
    expect(templateHeadings(template)).toEqual([
      'summary',
      'why',
      'alternatives considered',
      'verification',
      'docs',
    ]);
  });

  it('names the sections a body leaves out', () => {
    expect(
      missingHeadings('## Summary\n## Docs\n', templateHeadings(template))
    ).toEqual(['why', 'alternatives considered', 'verification']);
  });
});

describe('untickedDocsBoxes', () => {
  it('reads only the Docs section', () => {
    expect(
      untickedDocsBoxes(
        '## Docs\n- [x] one\n- [ ] two\n\n## Follow-ups\n- [ ] not docs\n'
      )
    ).toEqual(['two']);
  });
});

describe('baselineId', () => {
  it('names Storybook baselines by component and story, demo ones by route', () => {
    expect(
      baselineId(
        'packages/openbridge-webcomponents/__vis__/linux/__baselines__/components/tab-row/tab-row.stories.ts/with-panels-auto.png'
      )
    ).toBe('tab-row/with-panels');
    expect(
      baselineId(
        'packages/vue-demo/e2e/visual/__screenshots__/linux/overlay-alert-menu.png'
      )
    ).toBe('vue-demo/overlay-alert-menu');
    expect(baselineId('packages/openbridge-webcomponents/src/x.ts')).toBe(null);
  });
});

describe('addedA11yStories', () => {
  it('lists stories that gained a rule, not those that lost one', () => {
    expect(
      addedA11yStories(
        {a: ['x'], b: ['x', 'y']},
        {a: ['x', 'z'], b: ['x'], c: ['x']}
      )
    ).toEqual(['a', 'c']);
  });
});

describe('filesAddingOptOuts', () => {
  it('lists stories files whose added lines carry an opt-out tag', () => {
    const diff = [
      '+++ b/src/a/a.stories.ts',
      "+  tags: ['skip-test'],",
      '+++ b/src/b/b.stories.ts',
      "-  tags: ['skip-test'],",
      '+++ b/src/c/c.ts',
      "+  tags: ['skip-test'],",
    ].join('\n');
    expect(filesAddingOptOuts(diff)).toEqual(['a.stories.ts']);
  });
});

describe('checkPrBody', () => {
  const facts = {
    template,
    changedFiles: [
      'packages/vue-demo/e2e/visual/__screenshots__/linux/icons.png',
    ],
    a11yBase: {},
    a11yHead: {'ui-table--sorted': ['grid-rule']},
    storiesDiff: '',
  };

  it('passes a body that carries the template and names what moved', () => {
    expect(
      checkPrBody({
        ...facts,
        body: body(
          'vue-demo/icons moved with develop; ui-table--sorted stays.'
        ),
      })
    ).toEqual([]);
  });

  it('reports each gap', () => {
    const problems = checkPrBody({
      ...facts,
      body: '## Summary\n\n## Docs\n- [ ] docs/agents updated\n',
      changedFiles: [...facts.changedFiles, 'packages/x/CHANGELOG.md'],
    });
    expect(problems.map((p) => p.split(':')[0])).toEqual([
      'Missing template sections',
      'Unticked Docs boxes',
      'Baselines this PR adds, moves or removes, not named in the body',
      'Stories added to __a11y__/baseline.json, not named in the body',
      'CHANGELOG.md is written by the release (docs/agents/generated-code.md); drop the edit.',
    ]);
  });
});
