import {describe, expect, it} from 'vitest';
import {page} from '@vitest/browser/context';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './app-button.js';
import {ObcAppButton} from './app-button.js';
import '../../main.css';

describe('obc-app-button intrinsic width', () => {
  async function buttons(template: ReturnType<typeof html>) {
    const screen = render(template);
    const found = Array.from(
      screen.container.querySelectorAll('obc-app-button')
    ) as ObcAppButton[];
    await Promise.all(found.map((button) => button.updateComplete));
    await document.fonts.ready;
    return found;
  }

  const width = (button: ObcAppButton) => button.getBoundingClientRect().width;

  it('is the same checked and unchecked', async () => {
    const [plain, checked] = await buttons(html`
      <obc-app-button label="System Overview"></obc-app-button>
      <obc-app-button label="System Overview" checked></obc-app-button>
    `);

    expect(width(checked)).toBeCloseTo(width(plain), 1);
  });

  it('is the same checked and unchecked in the integration variant', async () => {
    const [plain, checked] = await buttons(html`
      <obc-app-button label="System Overview" integration></obc-app-button>
      <obc-app-button
        label="System Overview"
        integration
        checked
      ></obc-app-button>
    `);

    expect(width(checked)).toBeCloseTo(width(plain), 1);
  });

  it('names the button from the label once, not twice', async () => {
    const screen = render(
      html`<obc-app-button label="System Overview"></obc-app-button>`
    );
    const button = screen.container.querySelector(
      'obc-app-button'
    ) as ObcAppButton;
    await button.updateComplete;
    await document.fonts.ready;

    expect(
      page
        .getByRole('button', {name: 'System Overview', exact: true})
        .elements()
    ).toHaveLength(1);
  });

  it('does not change when a button is checked after first render', async () => {
    const [button] = await buttons(
      html`<obc-app-button label="System Overview"></obc-app-button>`
    );
    const before = width(button);

    button.checked = true;
    await button.updateComplete;

    expect(width(button)).toBeCloseTo(before, 1);
  });
});
