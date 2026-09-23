import {describe, expect, it} from 'vitest';
import {diffAgainstBaseline, toBaseline} from './check-a11y-baseline.js';

const report = {
  violations: [
    {storyId: 'ui-components-buttons-icon-button--normal', rule: 'button-name'},
    {storyId: 'ui-components-buttons-icon-button--normal', rule: 'button-name'},
    {storyId: 'ui-components-tables-table--default', rule: 'aria-allowed-role'},
    {storyId: 'automation-tank--default', rule: 'label'},
  ],
};

describe('toBaseline', () => {
  it('groups rules by story, sorted and without duplicates', () => {
    expect(toBaseline(report)).toEqual({
      'automation-tank--default': ['label'],
      'ui-components-buttons-icon-button--normal': ['button-name'],
      'ui-components-tables-table--default': ['aria-allowed-role'],
    });
  });
});

describe('diffAgainstBaseline', () => {
  it('reports a story or rule the baseline does not carry as added', () => {
    const baseline = {
      'ui-components-buttons-icon-button--normal': ['button-name'],
      'ui-components-tables-table--default': ['aria-allowed-role'],
    };

    expect(diffAgainstBaseline(report, baseline).added).toEqual([
      'automation-tank--default: label',
    ]);
  });

  it('reports baseline entries that no longer fail as fixed', () => {
    const baseline = {
      'automation-tank--default': ['label', 'select-name'],
      'ui-components-buttons-icon-button--normal': ['button-name'],
      'ui-components-tables-table--default': ['aria-allowed-role'],
      'pages-alert-list-small--default': ['select-name'],
    };

    expect(diffAgainstBaseline(report, baseline).fixed).toEqual([
      'automation-tank--default: select-name',
      'pages-alert-list-small--default: select-name',
    ]);
  });

  it('is quiet when report and baseline agree', () => {
    expect(diffAgainstBaseline(report, toBaseline(report))).toEqual({
      added: [],
      fixed: [],
    });
  });
});
