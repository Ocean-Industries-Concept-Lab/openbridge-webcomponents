import {describe, it, expect} from 'vitest';
import {LitElement} from 'lit';
import {AdviceMixin} from './advice-mixin.js';
import {AdviceBundle} from './advice-bundle.js';
import {AdviceState, AdviceTrigger} from './advice.js';

class AdviceHost extends AdviceMixin(LitElement) {}
customElements.define('test-advice-host', AdviceHost);

class AngularAdviceHost extends AdviceMixin(LitElement, {
  angularWraparound: true,
}) {}
customElements.define('test-angular-advice-host', AngularAdviceHost);

describe('AdviceMixin', () => {
  it('triggers on the value by default and keeps the configured state otherwise', () => {
    const host = new AdviceHost();
    host.advices = [
      {min: 20, max: 40, category: 'caution', hinted: true},
      {min: 60, max: 80, category: 'optimal'},
    ];
    const [caution, optimal] = host.resolveAdvices(30, undefined);
    expect(caution.state).toBe(AdviceState.triggered);
    expect(optimal.state).toBe(AdviceState.enabled);
  });

  it('follows the trigger mode', () => {
    const host = new AdviceHost();
    host.advices = [{min: 20, max: 40, category: 'caution'}];
    host.adviceTrigger = AdviceTrigger.setpoint;
    expect(host.resolveAdvices(30, undefined)[0].state).toBe(
      AdviceState.enabled
    );
    expect(host.resolveAdvices(30, 35)[0].state).toBe(AdviceState.triggered);
  });

  it('applies the emphasis rules when switched on', () => {
    const host = new AdviceHost();
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
    const host = new AngularAdviceHost();
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
