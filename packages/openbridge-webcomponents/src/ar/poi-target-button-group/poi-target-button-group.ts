import {LitElement, PropertyValues, html, nothing, unsafeCSS} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import compentStyle from './poi-target-button-group.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ObcPoiTarget} from '../poi-target/poi-target';

export type ExpandEvent = CustomEvent<{expand: boolean}>;

/**
 * @fires {ExpandEvent} expand - Fired when the button is clicked.
 */
@customElement('obc-poi-target-button-group')
export class ObcPoiTargetButtonGroup extends LitElement {
  @property({type: Boolean}) expand = false;
  @property({type: String}) positionVertical = '0px';
  @state() positionLeft = '0px';
  @state() positionRight = '0px';

  @queryAssignedElements({flatten: true})
  _children!: Array<HTMLElement>;

  private boundUpdatePosition: () => void;

  constructor() {
    super();
    // Bind the method once in the constructor
    this.boundUpdatePosition = this.updatePosition.bind(this);
  }

  override firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.updatePosition();
    this.setExpandedChildren(this.expand, true);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('slotchange', this.boundUpdatePosition);
    window.addEventListener('resize', this.boundUpdatePosition);
  }

  override disconnectedCallback() {
    this.removeEventListener('slotchange', this.boundUpdatePosition);
    window.removeEventListener('resize', this.boundUpdatePosition);
    super.disconnectedCallback();
  }

  override render() {
    return html`
      ${this.expand ? nothing : html`<slot></slot>`}
      <button
        @click=${this.onClick}
        class=${classMap({
          wrapper: true,
          expand: this.expand,
        })}
        style="left: ${this.positionLeft}; top: ${this
          .positionVertical}; right: ${this.positionRight};"
      >
        ${this.expand
          ? html`<slot></slot>`
          : html`<div class="visible-wrapper"></div>`}
      </button>
    `;
  }

  // Get bounding box of the slotted elements
  updatePosition() {
    let left = Number.MAX_VALUE;
    let right = -Number.MAX_VALUE;

    this._children.forEach((element) => {
      const boundingBox = element.getBoundingClientRect();
      left = Math.min(left, boundingBox.left);
      right = Math.max(right, boundingBox.right);
    });

    if (left !== Number.MAX_VALUE && right !== -Number.MAX_VALUE) {
      const rootDim = this.getBoundingClientRect();
      // Update position properties based on bounding box
      this.positionLeft = `${left - rootDim.left - 24}px`;
      this.positionRight = `${rootDim.right - right - 24}px`;
    }
  }

  onClick() {
    this.expand = !this.expand;
    this.dispatchEvent(
      new CustomEvent('expand', {detail: {expand: this.expand}})
    );
    this.setExpandedChildren(this.expand);
  }

  wasFrontElement: ObcPoiTarget | null = null;

  setExpandedChildren(expand: boolean, firstRun = false) {
    if (expand || firstRun) {
      this._children.forEach((child) => {
        if (child instanceof ObcPoiTarget && !child.overlap) {
          this.wasFrontElement = child as ObcPoiTarget;
        }
      });
    }

    this._children.forEach((child) => {
      child.style.position = expand ? 'inherit' : 'absolute';
      if (this.expand) {
        child.style.width = '48px';
        child.style.minWidth = '48px';
        child.style.height = '48px';
      } else {
        child.style.width = 'unset';
        child.style.minWidth = 'unset';
        child.style.height = 'unset';
      }
      if (child instanceof ObcPoiTarget) {
        (child as ObcPoiTarget).overlap = !expand;
        if (expand) {
          (child as ObcPoiTarget).style.transform = 'translate(50%, 100%)';
        } else {
          (child as ObcPoiTarget).style.transform = '';
        }
      }

      if (!expand && child === this.wasFrontElement) {
        (child as ObcPoiTarget).overlap = false;
      }
    });
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-target-button-group': ObcPoiTargetButtonGroup;
  }
}
