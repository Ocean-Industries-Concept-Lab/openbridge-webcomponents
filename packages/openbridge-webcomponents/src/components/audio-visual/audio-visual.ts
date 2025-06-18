import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './audio-visual.css?inline';
import {classMap} from 'lit/directives/class-map.js';

/**
 * @element obc-audio-visual
 * @description Audio-visual component for OpenBridge.
 
 * @property {number} volume - The volume level of the audio-visual component, ranging from 0 to 8.
 * @property {boolean} disabled - Indicates whether the audio-visual is disabled, e.g., muted.
 */
@customElement('obc-audio-visual')
export class ObcAudioVisual extends LitElement {
  @property({type: Number}) volume: number = 0;
  @property({type: Boolean}) disabled: boolean = false;

  override render() {
    const items = [];
    for (let i = 0; i < 8; i++) {
      items.push(
        html`<div class="item ${i < this.volume ? 'active' : ''}"></div>`
      );
    }
    return html`
      <div
        class=${classMap({
          wrapper: true,
          disabled: this.disabled,
        })}
      >
        ${items}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-audio-visual': ObcAudioVisual;
  }
}
