import {afterEach, describe, expect, it} from 'vitest';
import axe from 'axe-core';
import {obcA11yRules} from './a11y-rules.js';

const ruleIds = obcA11yRules.rules!.map((rule) => rule.id);

async function violations(markup: string, setup?: (root: HTMLElement) => void) {
  const root = document.createElement('div');
  root.innerHTML = markup;
  document.body.append(root);
  setup?.(root);
  axe.reset();
  axe.configure(obcA11yRules);
  const result = await axe.run(root, {
    runOnly: {type: 'rule', values: ruleIds},
  });
  return result.violations.map((violation) => violation.id).sort();
}

afterEach(() => {
  document.body.replaceChildren();
});

describe('obc-composite-one-tab-stop', () => {
  it('fails a tab list whose tabs each take a tab stop', async () => {
    expect(
      await violations(`<div role="tablist" aria-label="Views">
        <div role="tab" tabindex="0" aria-controls="p">One</div>
        <div role="tab" tabindex="0">Two</div>
      </div><div id="p" role="tabpanel" aria-label="One">x</div>`)
    ).toEqual(['obc-composite-one-tab-stop']);
  });

  it('counts a button inside a tab, through a shadow root', async () => {
    expect(
      await violations(
        `<div role="tablist" aria-label="Views"><span id="host"></span></div>`,
        (root) => {
          const shadow = root
            .querySelector('#host')!
            .attachShadow({mode: 'open'});
          shadow.innerHTML = `<div role="tab" tabindex="0">One <button>Close</button></div>`;
        }
      )
    ).toEqual(['obc-composite-one-tab-stop']);
  });

  it('passes a roving tab list, and ignores disabled and inert stops', async () => {
    expect(
      await violations(`<div role="tablist" aria-label="Views">
        <div role="tab" tabindex="0">One <button tabindex="-1">Close</button></div>
        <div role="tab" tabindex="-1">Two <button disabled>Close</button></div>
        <div inert><button>Hidden</button></div>
      </div>`)
    ).toEqual([]);
  });
});

describe('obc-composite-name', () => {
  it('fails an unnamed radio group and passes a named one', async () => {
    expect(
      await violations(
        `<div role="radiogroup"><div role="radio" aria-checked="true" tabindex="0">A</div></div>`
      )
    ).toEqual(['obc-composite-name']);
    document.body.replaceChildren();
    expect(
      await violations(
        `<div role="radiogroup" aria-label="Mode"><div role="radio" aria-checked="true" tabindex="0">A</div></div>`
      )
    ).toEqual([]);
  });
});

describe('obc-tabpanel-link', () => {
  it('fails a panel no tab points at, even when it is named', async () => {
    expect(
      await violations(`<div role="tablist" aria-label="Views">
        <div role="tab" tabindex="0">One</div>
      </div><div role="tabpanel" aria-label="One">x</div>`)
    ).toEqual(['obc-tabpanel-link']);
  });

  it('passes a named panel a tab points at, across a shadow root', async () => {
    expect(
      await violations(
        `<div role="tablist" aria-label="Views"><span id="host"></span></div>
         <div role="tabpanel" aria-label="One">x</div>`,
        (root) => {
          const shadow = root
            .querySelector('#host')!
            .attachShadow({mode: 'open'});
          shadow.innerHTML = `<div role="tab" tabindex="0">One</div>`;
          const tab = shadow.querySelector<HTMLElement>('[role="tab"]')!;
          tab.ariaControlsElements = [root.querySelector('[role="tabpanel"]')!];
        }
      )
    ).toEqual([]);
  });
});
