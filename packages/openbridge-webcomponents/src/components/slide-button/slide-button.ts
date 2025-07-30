import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import componentStyle from './slide-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-chevron-double-right-google.js';
import { customElement } from '../../decorator.js';

export type ObcSlideButtonSlideEvent = CustomEvent<{completed: boolean}>;

/**
 * @summary A slide button component that requires users to slide to complete an action.
 *
 * @fires slide {ObcSlideButtonSlideEvent} - Emitted when the slide action is completed.
 *
 * @slot leading-icon - The icon to display at the start of the button content.
 * @slot label - The label text to display in the button.
 */
@customElement('obc-slide-button')
export class ObcSlideButton extends LitElement {
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean}) hasLeadingIcon = true;
  @property({type: Boolean}) hugContent = false;
  @property({type: Boolean}) autoDisable = false;

  @state() private dragging = false;
  @state() private animatingBack = false;

  private dragStartX = 0;
  private dragCurrentX = 0;
  private dragOffset = 0;
  private trackWidth = 0;
  private buttonWidth = 0;
  private slideThreshold = 0.8; // Fixed internal value

  @query('.slide-button')
  private buttonRef?: HTMLElement;

  @query('.visual-container')
  private visualContainerRef?: HTMLElement;

  private onDragStart = (e: MouseEvent | TouchEvent) => {
    if (this.disabled) return;
    
    this.dragging = true;
    if (e instanceof MouseEvent) {
      this.dragStartX = e.clientX;
    } else {
      this.dragStartX = e.touches[0].clientX;
    }
    this.dragCurrentX = this.dragStartX;
    this.trackWidth = this.visualContainerRef?.offsetWidth || 0;
    this.buttonWidth = this.buttonRef?.offsetWidth || 0;
    
    window.addEventListener('mousemove', this.onDragMove);
    window.addEventListener('touchmove', this.onDragMove, {passive: false});
    window.addEventListener('mouseup', this.onDragEnd);
    window.addEventListener('touchend', this.onDragEnd);
  };

  private onDragMove = (e: MouseEvent | TouchEvent) => {
    if (!this.dragging) return;
    
    let clientX = 0;
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
    } else {
      clientX = e.touches[0].clientX;
      e.preventDefault();
    }
    
    this.dragCurrentX = clientX;
    this.dragOffset = this.dragCurrentX - this.dragStartX;
    this.requestUpdate();
  };

  private onDragEnd = () => {
    if (!this.dragging) return;
    
    this.dragging = false;
    this.animatingBack = true;
    
    const maxOffset = this.trackWidth - this.buttonWidth;
    const dragProgress = Math.max(0, this.dragOffset) / maxOffset;
    
    if (dragProgress >= this.slideThreshold) {
      if (this.autoDisable) {
        this.disabled = true;
      }
      
      this.dispatchEvent(
        new CustomEvent('slide', {detail: {completed: true}})
      );
    }
    
    this.dragOffset = 0;
    this.requestUpdate();
    
    setTimeout(() => {
      this.animatingBack = false;
      this.requestUpdate();
    }, 200);
    
    window.removeEventListener('mousemove', this.onDragMove);
    window.removeEventListener('touchmove', this.onDragMove);
    window.removeEventListener('mouseup', this.onDragEnd);
    window.removeEventListener('touchend', this.onDragEnd);
  };

  private getButtonStyle() {
    if (!this.dragging && !this.animatingBack) return '';

    // Calculate the button's left position within the visual container
    const maxOffset = this.trackWidth - this.buttonWidth;
    let left = Math.max(0, this.dragOffset);
    left = Math.min(left, maxOffset);

    return `left: ${left}px;`;
  }

  override firstUpdated() {
    // Update track and button width on resize
    const resizeObserver = new ResizeObserver(() => {
      this.trackWidth = this.visualContainerRef?.offsetWidth || 0;
      this.buttonWidth = this.buttonRef?.offsetWidth || 0;
    });
    if (this.visualContainerRef) resizeObserver.observe(this.visualContainerRef);
    if (this.buttonRef) resizeObserver.observe(this.buttonRef);
  }

  override render() {
    const containerClasses = {
      'slide-button-container': true,
      'dragging': this.dragging,
      'animating-back': this.animatingBack,
      'disabled': this.disabled,
      'hug-content': this.hugContent
    };

    const visualClasses = {
      'visual-container': true,
    };

    const buttonClasses = {
      'slide-button': true,
      'has-leading-icon': this.hasLeadingIcon
    };

    return html`
      <div class=${classMap(containerClasses)} role="button" aria-disabled=${this.disabled}>
        <div class=${classMap(visualClasses)}>
          <div 
            class=${classMap(buttonClasses)}
            style=${this.getButtonStyle()}
            @mousedown=${this.onDragStart}
            @touchstart=${this.onDragStart}
          >
            <div class="button-content">
              ${this.hasLeadingIcon ? html`
                <div class="leading-icon">
                  <slot name="leading-icon"></slot>
                </div>
              ` : nothing}
              <div class="button-label">
                <slot name="label"></slot>
              </div>
            </div>
          </div>
          <div class="trailing-icon-area">
            <obi-chevron-double-right-google class="trailing-icon"></obi-chevron-double-right-google>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-slide-button': ObcSlideButton;
  }
}