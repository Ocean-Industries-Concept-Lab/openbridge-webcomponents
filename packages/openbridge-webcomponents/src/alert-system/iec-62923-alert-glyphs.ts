/**
 * `iec-62923-alert-glyphs` – The IEC 62923 alarm and warning icons, by the
 * states that draw differently.
 *
 * Kept apart from the IEC 62923 standard so that ISA-18.2, which borrows
 * them for its high and medium priorities, brings these icons into a bundle
 * and nothing else of IEC 62923.
 */
import {html} from 'lit';
import '../icons/icon-alarm-unacknowledged-iec.js';
import '../icons/icon-alarm-silenced-iec.js';
import '../icons/icon-alarm-silenced-outlined.js';
import '../icons/icon-alarm-acknowledged-iec.js';
import '../icons/icon-alarm-transferred-iec.js';
import '../icons/icon-alarm-rectified-iec.js';
import '../icons/icon-alarm-rectified-outlined.js';
import '../icons/icon-warning-unacknowledged-iec.js';
import '../icons/icon-warning-unacknowledged-outlined.js';
import '../icons/icon-warning-silenced-iec.js';
import '../icons/icon-warning-silenced-outlined.js';
import '../icons/icon-warning-acknowledged-iec.js';
import '../icons/icon-warning-transferred-iec.js';
import '../icons/icon-warning-rectified-iec.js';
import '../icons/icon-warning-rectified-outlined.js';
import type {AlertGlyph} from './alert-standard.js';

export const IEC_62923_ALARM_GLYPHS = {
  unacknowledged: {
    frame: html`<obi-alarm-unacknowledged-iec
      usecsscolor
    ></obi-alarm-unacknowledged-iec>`,
    flashFrame: html``,
  },
  silenced: {
    frame: html`<obi-alarm-silenced-iec usecsscolor></obi-alarm-silenced-iec>`,
    flashFrame: html`<obi-alarm-silenced-outlined
      usecsscolor
    ></obi-alarm-silenced-outlined>`,
  },
  acknowledged: {
    frame: html`<obi-alarm-acknowledged-iec
      usecsscolor
    ></obi-alarm-acknowledged-iec>`,
  },
  responsibilityTransferred: {
    frame: html`<obi-alarm-transferred-iec
      usecsscolor
    ></obi-alarm-transferred-iec>`,
  },
  rectified: {
    frame: html`<obi-alarm-rectified-iec
      usecsscolor
    ></obi-alarm-rectified-iec>`,
    flashFrame: html`<obi-alarm-rectified-outlined
      usecsscolor
    ></obi-alarm-rectified-outlined>`,
  },
  normal: {
    frame: html`<obi-alarm-rectified-outlined
      usecsscolor
    ></obi-alarm-rectified-outlined>`,
  },
} satisfies Record<string, AlertGlyph>;

export const IEC_62923_WARNING_GLYPHS = {
  unacknowledged: {
    frame: html`<obi-warning-unacknowledged-iec
      usecsscolor
    ></obi-warning-unacknowledged-iec>`,
    flashFrame: html`<obi-warning-unacknowledged-outlined
      usecsscolor
    ></obi-warning-unacknowledged-outlined>`,
  },
  silenced: {
    frame: html`<obi-warning-silenced-iec
      usecsscolor
    ></obi-warning-silenced-iec>`,
    flashFrame: html`<obi-warning-silenced-outlined
      usecsscolor
    ></obi-warning-silenced-outlined>`,
  },
  acknowledged: {
    frame: html`<obi-warning-acknowledged-iec
      usecsscolor
    ></obi-warning-acknowledged-iec>`,
  },
  responsibilityTransferred: {
    frame: html`<obi-warning-transferred-iec
      usecsscolor
    ></obi-warning-transferred-iec>`,
  },
  rectified: {
    frame: html`<obi-warning-rectified-iec
      usecsscolor
    ></obi-warning-rectified-iec>`,
    flashFrame: html`<obi-warning-rectified-outlined
      usecsscolor
    ></obi-warning-rectified-outlined>`,
  },
  normal: {
    frame: html`<obi-warning-rectified-outlined
      usecsscolor
    ></obi-warning-rectified-outlined>`,
  },
} satisfies Record<string, AlertGlyph>;
