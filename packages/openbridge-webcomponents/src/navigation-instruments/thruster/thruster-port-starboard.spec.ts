import {describe, it, expect} from 'vitest';
import {thrusterColors} from './thruster.js';
import {InstrumentState, Priority} from '../types.js';
import {
  PORT_STARBOARD_DEFAULT_ELEMENTS,
  PortStarboardElement,
} from '../../svghelpers/port-starboard.js';

const idle = {atSetpoint: false, touching: false};

describe('thrusterColors with the PORT/STBD mode', () => {
  it('is unchanged when the mode is off', () => {
    const colors = thrusterColors(
      idle,
      InstrumentState.active,
      Priority.enhanced
    );
    expect(colors.boxColor).toBe('var(--instrument-enhanced-secondary-color)');
    expect(colors.zeroLineColor).toBe(
      'var(--instrument-enhanced-secondary-color)'
    );
    expect(colors.arrowColor).toBe('var(--instrument-regular-secondary-color)');
  });

  it('maps bar, zero line and arrow to the dark token for positive thrust', () => {
    const colors = thrusterColors(
      idle,
      InstrumentState.active,
      Priority.enhanced,
      {
        enabled: true,
        elements: PORT_STARBOARD_DEFAULT_ELEMENTS,
        sign: 1,
      }
    );
    expect(colors.boxColor).toBe('var(--instrument-starboard-primary-color)');
    expect(colors.zeroLineColor).toBe(
      'var(--instrument-starboard-primary-color)'
    );
    expect(colors.arrowColor).toBe('var(--instrument-starboard-primary-color)');
  });

  it('maps to the port token for negative thrust', () => {
    const colors = thrusterColors(
      idle,
      InstrumentState.active,
      Priority.enhanced,
      {
        enabled: true,
        elements: PORT_STARBOARD_DEFAULT_ELEMENTS,
        sign: -1,
      }
    );
    expect(colors.boxColor).toBe('var(--instrument-port-primary-color)');
  });

  it('honours the element opt-out list', () => {
    const colors = thrusterColors(
      idle,
      InstrumentState.active,
      Priority.enhanced,
      {
        enabled: true,
        elements: [PortStarboardElement.bar],
        sign: 1,
      }
    );
    expect(colors.boxColor).toBe('var(--instrument-starboard-primary-color)');
    expect(colors.zeroLineColor).toBe(
      'var(--instrument-enhanced-secondary-color)'
    );
    expect(colors.arrowColor).toBe('var(--instrument-regular-secondary-color)');
  });

  it('keeps the priority color at sign 0', () => {
    const colors = thrusterColors(
      idle,
      InstrumentState.active,
      Priority.enhanced,
      {
        enabled: true,
        elements: PORT_STARBOARD_DEFAULT_ELEMENTS,
        sign: 0,
      }
    );
    expect(colors.boxColor).toBe('var(--instrument-enhanced-secondary-color)');
  });

  it('lets the at-setpoint marker follow the recolored bar', () => {
    const colors = thrusterColors(
      {atSetpoint: true, touching: false},
      InstrumentState.active,
      Priority.enhanced,
      {enabled: true, elements: PORT_STARBOARD_DEFAULT_ELEMENTS, sign: 1}
    );
    expect(colors.setPointColor).toBe(
      'var(--instrument-starboard-primary-color)'
    );
  });

  it('never overrides the loading or off palettes', () => {
    for (const state of [InstrumentState.loading, InstrumentState.off]) {
      const colors = thrusterColors(idle, state, Priority.enhanced, {
        enabled: true,
        elements: PORT_STARBOARD_DEFAULT_ELEMENTS,
        sign: 1,
      });
      expect(colors.boxColor).toBe('transparent');
      expect(colors.zeroLineColor).toBe(
        'var(--instrument-frame-tertiary-color)'
      );
    }
  });
});
