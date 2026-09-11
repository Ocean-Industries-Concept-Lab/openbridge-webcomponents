import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './integration-app-bar.js';
import '../../components/app-button/app-button.js';
import {ObcAppButton} from '../../components/app-button/app-button.js';
import '../../main.css';

describe('obc-integration-app-bar app sizing', () => {
  async function appBar() {
    const screen = render(html`
      <obc-integration-app-bar>
        <obc-app-button slot="apps" label="Alerts" integration checked>
        </obc-app-button>
        <obc-app-button slot="apps" label="System Overview" integration>
        </obc-app-button>
      </obc-integration-app-bar>
    `);
    const apps = Array.from(
      screen.container.querySelectorAll('obc-app-button')
    ) as ObcAppButton[];
    await Promise.all(apps.map((app) => app.updateComplete));
    await document.fonts.ready;
    return apps;
  }

  const widths = (apps: ObcAppButton[]) =>
    apps.map((app) => app.getBoundingClientRect().width);

  it('keeps the app row sized when selection moves to the widest label', async () => {
    const apps = await appBar();
    const [shortSelected] = widths(apps);

    apps[0].checked = false;
    apps[1].checked = true;
    await Promise.all(apps.map((app) => app.updateComplete));

    const [widestSelected] = widths(apps);
    expect(widestSelected).toBeCloseTo(shortSelected, 1);
  });

  it('gives every app the same width whichever one is selected', async () => {
    const apps = await appBar();
    const [first, second] = widths(apps);

    expect(second).toBeCloseTo(first, 1);
  });
});
