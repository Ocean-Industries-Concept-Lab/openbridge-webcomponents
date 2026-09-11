import {describe, expect, it} from 'vitest';
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

  it('keeps the reserved copy of the label out of the accessible box', async () => {
    const [button] = await buttons(
      html`<obc-app-button label="System Overview"></obc-app-button>`
    );
    const label = button.shadowRoot!.querySelector('.label')!;

    expect(getComputedStyle(label, '::after').visibility).toBe('hidden');
    expect(label.textContent).toBe('System Overview');
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
