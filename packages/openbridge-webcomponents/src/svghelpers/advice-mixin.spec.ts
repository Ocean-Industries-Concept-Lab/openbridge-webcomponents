import {describe, it, expect} from 'vitest';
import {LitElement} from 'lit';
import {AdviceMixin, type AdviceMixinInterface} from './advice-mixin.js';
import {AdviceBundle} from './advice-bundle.js';
import {AdviceState, AdviceTrigger} from './advice.js';

// Registered on first use rather than at module scope: the wrapper
// generators read every module-level element definition, specs included.
function adviceHost(angularWraparound = false) {
  const tag = angularWraparound
    ? 'test-angular-advice-host'
    : 'test-advice-host';
  if (!customElements.get(tag)) {
    customElements.define(
      tag,
      class extends AdviceMixin(LitElement, {angularWraparound}) {}
    );
  }
  return document.createElement(tag) as LitElement & AdviceMixinInterface;
}

describe('AdviceMixin', () => {
  it('triggers on the value by default and keeps the configured state otherwise', () => {
    const host = adviceHost();
    host.advices = [
      {min: 20, max: 40, category: 'caution', hinted: true},
      {min: 60, max: 80, category: 'optimal'},
    ];
    const [caution, optimal] = host.resolveAdvices(30, undefined);
    expect(caution.state).toBe(AdviceState.triggered);
    expect(optimal.state).toBe(AdviceState.enabled);
  });

  it('follows the trigger mode', () => {
    const host = adviceHost();
    host.advices = [{min: 20, max: 40, category: 'caution'}];
    host.adviceTrigger = AdviceTrigger.setpoint;
    expect(host.resolveAdvices(30, undefined)[0].state).toBe(
      AdviceState.enabled
    );
    expect(host.resolveAdvices(30, 35)[0].state).toBe(AdviceState.triggered);
  });

  it('applies the emphasis rules when switched on', () => {
    const host = adviceHost();
    host.advices = [
      {min: 20, max: 40, category: 'caution'},
      {min: 60, max: 80, category: 'optimal'},
    ];
    host.adviceEmphasis = true;
    expect(host.resolveAdvices(50).map((a) => a.state)).toEqual([
      AdviceState.enabled,
      AdviceState.active,
    ]);
  });

  it('wraps angles when configured', () => {
    const host = adviceHost(true);
    host.advices = [{minAngle: 350, maxAngle: 10, type: 'caution'}];
    expect(host.resolveAdvices(0)[0].state).toBe(AdviceState.triggered);
  });
});

describe('AdviceBundle', () => {
  it('resolves after sync, with the same rules', () => {
    const bundle = new AdviceBundle({angularWraparound: true});
    bundle.sync({
      advices: [{minAngle: 350, maxAngle: 10, type: 'caution'}],
      adviceTrigger: AdviceTrigger.value,
    });
    expect(bundle.resolve(5, undefined)[0].state).toBe(AdviceState.triggered);
    bundle.sync({adviceTrigger: AdviceTrigger.setpoint});
    expect(bundle.resolve(5, undefined)[0].state).toBe(AdviceState.enabled);
  });
});
