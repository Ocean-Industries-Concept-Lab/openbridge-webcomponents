import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './progress-indicator-dots.css?inline';
import {property} from 'lit/decorators.js';

@customElement('obc-progress-indicator-dots')
export class ObcProgressIndicatorDots extends LitElement {
  @property({type: Number}) totalSteps = 5;
  @property({type: Number}) currentStep = 1;
  @property({type: Boolean}) fullwidth = false;

  private get validCurrentStep() {
    // Ensure currentStep is within valid range (1-based)
    return Math.max(1, Math.min(this.currentStep, this.totalSteps));
  }

  private get validTotalSteps() {
    // Ensure we have at least 1 step
    return Math.max(1, this.totalSteps);
  }

  private renderDots() {
    const dots = [];
    for (let i = 0; i < this.validTotalSteps; i++) {
      dots.push(html`
        <div
          class=${classMap({
            dot: true,
            'state-active': i === this.validCurrentStep - 1,
            'state-inactive': i !== this.validCurrentStep - 1,
          })}
        ></div>
      `);
    }
    return dots;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          'style-fullwidth': this.fullwidth,
          'style-compact': !this.fullwidth,
        })}
      >
        <div class="content-container">${this.renderDots()}</div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-progress-indicator-dots': ObcProgressIndicatorDots;
  }
}
