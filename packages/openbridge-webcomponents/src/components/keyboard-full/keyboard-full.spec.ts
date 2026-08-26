import {describe, it, expect, afterEach} from 'vitest';
import './keyboard-full.js';
import {ObcKeyboardFull} from './keyboard-full.js';

describe('obc-keyboard-full', () => {
  const mounted: ObcKeyboardFull[] = [];

  afterEach(() => {
    while (mounted.length) {
      mounted.pop()!.remove();
    }
  });

  async function createKeyboard(
    props: Partial<Pick<ObcKeyboardFull, 'showNumberRow' | 'value'>> = {}
  ): Promise<ObcKeyboardFull> {
    const el = document.createElement('obc-keyboard-full');
    Object.assign(el, props);
    document.body.appendChild(el);
    mounted.push(el);
    await el.updateComplete;
    return el;
  }

  function keysInRow(el: ObcKeyboardFull, rowClass: string): HTMLElement[] {
    const row = el.shadowRoot!.querySelector(`.${rowClass}`);
    if (!row) throw new Error(`Row .${rowClass} not found`);
    return Array.from(row.querySelectorAll('obc-button'));
  }

  function letterKeys(el: ObcKeyboardFull): HTMLElement[] {
    return ['row-1', 'row-2', 'row-3'].flatMap((row) => keysInRow(el, row));
  }

  async function toggleCaps(el: ObcKeyboardFull): Promise<void> {
    const caps = el.shadowRoot!.querySelector(
      '.caps-button'
    ) as HTMLElement | null;
    if (!caps) throw new Error('CAPS button not found');
    caps.click();
    await el.updateComplete;
  }

  async function pressKey(el: ObcKeyboardFull, key: HTMLElement) {
    key.click();
    await el.updateComplete;
  }

  describe('CAPS', () => {
    it('inserts lowercase while CAPS is off', async () => {
      const el = await createKeyboard();
      await pressKey(el, letterKeys(el)[0]);

      expect(el.value).toBe('q');
    });

    it('inserts uppercase while CAPS is on', async () => {
      const el = await createKeyboard();
      await toggleCaps(el);
      await pressKey(el, letterKeys(el)[0]);

      expect(el.value).toBe('Q');
    });

    // Regression: issue #1113 — CAPS was ignored whenever the number row was
    // shown, so keys rendered uppercase but inserted lowercase.
    it('inserts uppercase while CAPS is on and the number row is shown', async () => {
      const el = await createKeyboard({showNumberRow: true});
      await toggleCaps(el);
      await pressKey(el, letterKeys(el)[0]);

      expect(el.value).toBe('Q');
    });

    it('inserts lowercase while CAPS is off and the number row is shown', async () => {
      const el = await createKeyboard({showNumberRow: true});
      await pressKey(el, letterKeys(el)[0]);

      expect(el.value).toBe('q');
    });

    it.each([
      {showNumberRow: false, caps: false},
      {showNumberRow: false, caps: true},
      {showNumberRow: true, caps: false},
      {showNumberRow: true, caps: true},
    ])(
      'inserts exactly the character each key renders (showNumberRow=$showNumberRow, caps=$caps)',
      async ({showNumberRow, caps}) => {
        const keyCount = letterKeys(
          await createKeyboard({showNumberRow})
        ).length;

        for (let index = 0; index < keyCount; index++) {
          const el = await createKeyboard({showNumberRow});
          if (caps) await toggleCaps(el);
          const key = letterKeys(el)[index];
          const label = key.textContent!.trim();

          await pressKey(el, key);

          expect(el.value).toBe(label);
        }
      }
    );

    it('leaves number-row keys unchanged while CAPS is on', async () => {
      const el = await createKeyboard({showNumberRow: true});
      await toggleCaps(el);
      const key = keysInRow(el, 'row-numbers')[0];

      await pressKey(el, key);

      expect(el.value).toBe('1');
    });
  });

  describe('value-change', () => {
    it('reports the inserted uppercase character', async () => {
      const el = await createKeyboard({showNumberRow: true});
      await toggleCaps(el);
      const values: string[] = [];
      el.addEventListener('value-change', (e) =>
        values.push((e as CustomEvent<{value: string}>).detail.value)
      );

      await pressKey(el, letterKeys(el)[0]);

      expect(values).toEqual(['Q']);
    });
  });
});
