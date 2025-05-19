import { LitElement, html, nothing, svg, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./speed-arrows.css?inline";
import '../instrument-field/instrument-field';
import { InstrumentFieldSize } from '../instrument-field/instrument-field';

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

@customElement('obc-speed-arrows')
export class ObcSpeedArrows extends LitElement {

  @property({ type: Number })
  speedKnots = 0

  @property({ type: Boolean })
  readout = false

  @property({ type: Number })
  maxDigits = 2

  @property({ type: Number })
  fractionDigits = 0
  @property({ type: Number })
  nActiveArrows = 0

  @property({ type: String })
  direction = Direction.forward

  @property({ type: String })
  activeColor = ActiveColor.Regular

  @property({ type: Boolean })
  tintedArrows = false

  getColors(): {activeFill: string, activeStroke: string, inactiveFill: string, inactiveStroke: string} {
    let activeFill, activeStroke, inactiveFill, inactiveStroke;
    if (this.activeColor === ActiveColor.Direction) {
      if (this.direction === Direction.forward || this.direction === Direction.right) {
        activeFill = 'var(--instrument-starboard-primary-color)'
      } else {
        activeFill = 'var(--instrument-port-primary-color)'
      }
      activeStroke = 'var(--border-outline-color)'
      inactiveFill = 'var(--instrument-frame-secondary-color)'
      inactiveStroke = 'var(--border-outline-color)'
    } else if (this.activeColor === ActiveColor.Regular) {
      activeFill = 'var(--element-neutral-color)'
      activeStroke = activeFill
      inactiveFill = 'var(--border-outline-color)'
      inactiveStroke = inactiveFill
    } else if (this.activeColor === ActiveColor.Enhanced) {
      activeFill = 'var(--instrument-enhanced-secondary-color)'
      activeStroke = 'var(--border-outline-color)'
      inactiveFill = 'var(--instrument-frame-secondary-color)'
      inactiveStroke = 'var(--border-outline-color)'
    } else {
      throw new Error('Invalid active color')
    }
    return {activeFill, activeStroke, inactiveFill, inactiveStroke}
     
  }

  getFillColor(active: boolean, colors: {activeFill: string, activeStroke: string, inactiveFill: string, inactiveStroke: string}): string {
    if (active) {
      return colors.activeFill
    } else {
      return colors.inactiveFill
    }
  }

  getStrokeColor(active: boolean, colors: {activeFill: string, activeStroke: string, inactiveFill: string, inactiveStroke: string}): string {
    if (active) {
      return colors.activeStroke
    } else {
      return colors.inactiveStroke
    }
  }

  getRotation(): number {
    if (this.direction === Direction.forward) {
      return 0
    } else if (this.direction === Direction.backward) {
      return 180
    } else if (this.direction === Direction.left) {
      return 270
    } else if (this.direction === Direction.right) {
      return 90
    } else {
      return 0
    }
  }

  override render() {
    const colors = this.getColors()
  
    return html`
      <div class="wrapper">
        ${this.readout ? html`
          <obc-instrument-field 
            class="readout" 
            value=${this.speedKnots} 
            unit="KN" 
            tag="Speed" 
            size=${InstrumentFieldSize.enhanced} 
            fractionDigits=${this.fractionDigits} 
            maxDigits=${this.maxDigits} 
            .neutralColor=${this.activeColor === ActiveColor.Regular} />` : nothing}
        <div class="arrow-container">
        <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
<g transform="rotate(${this.getRotation()}, 48, 48)">

${(this.tintedArrows || this.nActiveArrows > 0) ? svg`
<path d="M48.0004 56L76.0004 72L76.0004 88L48.0004 72L20 88L20.0004 72L48.0004 56Z" fill=${this.getFillColor(this.nActiveArrows > 0, colors)}/>
<path d="M48.0004 56L76.0004 72L76.0004 88L48.0004 72L20 88L20.0004 72L48.0004 56Z" vector-effect="non-scaling-stroke" stroke=${this.getStrokeColor(this.nActiveArrows > 0, colors)} stroke-linecap="square"/>` : nothing }

${(this.tintedArrows || this.nActiveArrows > 1) ? svg`
<path d="M76.0004 48L48.0004 32L20.0004 48L20 64L48.0004 48L76.0004 64L76.0004 48Z" fill=${this.getFillColor(this.nActiveArrows > 1, colors)}/>
<path d="M76.0004 48L48.0004 32L20.0004 48L20 64L48.0004 48L76.0004 64L76.0004 48Z" vector-effect="non-scaling-stroke" stroke=${this.getStrokeColor(this.nActiveArrows > 1, colors)} stroke-linecap="square"/>` : nothing }

${(this.tintedArrows || this.nActiveArrows > 2) ? svg`
<path d="M76.0004 24L48.0004 8L20.0004 24L20 40L48.0004 24L76.0004 40L76.0004 24Z" fill=${this.getFillColor(this.nActiveArrows > 2, colors)}/>
<path d="M76.0004 24L48.0004 8L20.0004 24L20 40L48.0004 24L76.0004 40L76.0004 24Z" vector-effect="non-scaling-stroke" stroke=${this.getStrokeColor(this.nActiveArrows > 2, colors)} stroke-linecap="square"/>` : nothing }

</g>
</svg>


        </div>
      </div>
      `
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-speed-arrows': ObcSpeedArrows
  }
}
