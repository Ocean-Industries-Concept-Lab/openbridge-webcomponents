import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './speed-arrows.css?inline';
import '../readout/readout.js';
import {ReadoutDirection, ReadoutSize} from '../readout/readout.js';
import {Priority} from '../types.js';
import {customElement} from '../../decorator.js';
import {CHEVRON_PATHS, renderChevronBand} from './speed-arrows-art.js';

export enum Direction {
  forward = 'forward',
  backward = 'backward',
  left = 'left',
  right = 'right',
}

export enum ActiveColor {
  Direction = 'Direction',
  Regular = 'Regular',
  Enhanced = 'Enhanced',
}

/**
 * @beta
 */
@customElement('obc-speed-arrows')
export class ObcSpeedArrows extends LitElement {
  /** @availableWhen readout==true */
  @property({type: Number})
  speedKnots = 0;

  @property({type: Boolean})
  readout = false;

  /** @availableWhen readout==true */
  @property({type: Number})
  maxDigits = 2;

  /** @availableWhen readout==true */
  @property({type: Number})
  fractionDigits = 0;
  @property({type: Number})
  nActiveArrows = 0;

  @property({type: String})
  direction = Direction.forward;

  @property({type: String})
  activeColor = ActiveColor.Regular;

  @property({type: Boolean})
  tintedArrows = false;

  getColors(): {
    activeFill: string;
    activeStroke: string;
    inactiveFill: string;
    inactiveStroke: string;
  } {
    let activeFill, activeStroke, inactiveFill, inactiveStroke;
    if (this.activeColor === ActiveColor.Direction) {
      if (
        this.direction === Direction.forward ||
        this.direction === Direction.right
      ) {
        activeFill = 'var(--instrument-starboard-primary-color)';
      } else {
        activeFill = 'var(--instrument-port-primary-color)';
      }
      activeStroke = 'var(--border-outline-color)';
      inactiveFill = 'var(--instrument-frame-secondary-color)';
      inactiveStroke = 'var(--border-outline-color)';
    } else if (this.activeColor === ActiveColor.Regular) {
      activeFill = 'var(--element-neutral-color)';
      activeStroke = activeFill;
      inactiveFill = 'var(--border-outline-color)';
      inactiveStroke = inactiveFill;
    } else if (this.activeColor === ActiveColor.Enhanced) {
      activeFill = 'var(--instrument-enhanced-secondary-color)';
      activeStroke = 'var(--border-outline-color)';
      inactiveFill = 'var(--instrument-frame-secondary-color)';
      inactiveStroke = 'var(--border-outline-color)';
    } else {
      throw new Error('Invalid active color');
    }
    return {activeFill, activeStroke, inactiveFill, inactiveStroke};
  }

  getFillColor(
    active: boolean,
    colors: {
      activeFill: string;
      activeStroke: string;
      inactiveFill: string;
      inactiveStroke: string;
    }
  ): string {
    if (active) {
      return colors.activeFill;
    } else {
      return colors.inactiveFill;
    }
  }

  getStrokeColor(
    active: boolean,
    colors: {
      activeFill: string;
      activeStroke: string;
      inactiveFill: string;
      inactiveStroke: string;
    }
  ): string {
    if (active) {
      return colors.activeStroke;
    } else {
      return colors.inactiveStroke;
    }
  }

  getRotation(): number {
    if (this.direction === Direction.forward) {
      return 0;
    } else if (this.direction === Direction.backward) {
      return 180;
    } else if (this.direction === Direction.left) {
      return 270;
    } else if (this.direction === Direction.right) {
      return 90;
    } else {
      return 0;
    }
  }

  override render() {
    const colors = this.getColors();

    return html`
      <div class="wrapper">
        ${this.readout
          ? html`<obc-readout
              class="readout"
              .value=${this.speedKnots}
              unit="KN"
              label="Speed"
              .size=${ReadoutSize.large}
              .direction=${ReadoutDirection.vertical}
              .fractionDigits=${this.fractionDigits}
              .maxDigits=${this.maxDigits}
              .priority=${this.activeColor === ActiveColor.Regular
                ? Priority.regular
                : Priority.enhanced}
            ></obc-readout>`
          : nothing}
        <div class="arrow-container">
          <svg
            width="96"
            height="96"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="rotate(${this.getRotation()}, 48, 48)">
              ${this.tintedArrows || this.nActiveArrows > 0
                ? renderChevronBand(
                    CHEVRON_PATHS[0],
                    this.getFillColor(this.nActiveArrows > 0, colors),
                    this.getStrokeColor(this.nActiveArrows > 0, colors)
                  )
                : nothing}
              ${this.tintedArrows || this.nActiveArrows > 1
                ? renderChevronBand(
                    CHEVRON_PATHS[1],
                    this.getFillColor(this.nActiveArrows > 1, colors),
                    this.getStrokeColor(this.nActiveArrows > 1, colors)
                  )
                : nothing}
              ${this.tintedArrows || this.nActiveArrows > 2
                ? renderChevronBand(
                    CHEVRON_PATHS[2],
                    this.getFillColor(this.nActiveArrows > 2, colors),
                    this.getStrokeColor(this.nActiveArrows > 2, colors)
                  )
                : nothing}
            </g>
          </svg>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-speed-arrows': ObcSpeedArrows;
  }
}
