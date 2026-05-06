import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, query} from 'lit/decorators.js';
import compentStyle from './rot-indicator.css?inline';
import {RateOfTurnController} from '../rate-of-turn/rate-of-turn.controller.js';
import {customElement} from '../../decorator.js';

@customElement('obc-rot-indicator')
export class ObcRotIndicator extends LitElement {
  /**
   * Measured rate of turn in degrees per minute (positive = starboard).
   *
   * Drives the spinner animation via `(rateOfTurnDegreesPerMinute / 360) *
   * rotDotAnimationFactor` rotations per minute. When `undefined` the legacy
   * `rotationsPerMinute` value is used instead.
   */
  @property({type: Number}) rateOfTurnDegreesPerMinute: number | undefined;

  /**
   * Visual amplification applied to the spinning dot animation. Default `18`
   * keeps the legacy visual feel (≈1 rpm at 20°/min). Has no effect when
   * the legacy `rotationsPerMinute` API is used.
   */
  @property({type: Number}) rotDotAnimationFactor: number = 18;

  /**
   * @deprecated Use `rateOfTurnDegreesPerMinute` (and optionally
   * `rotDotAnimationFactor`) instead. Takes effect only when
   * `rateOfTurnDegreesPerMinute` is `undefined`.
   */
  @property({type: Number})
  rotationsPerMinute = 0;

  private get _effectiveRpm(): number {
    if (this.rateOfTurnDegreesPerMinute != null) {
      return (
        (this.rateOfTurnDegreesPerMinute / 360) * this.rotDotAnimationFactor
      );
    }
    return this.rotationsPerMinute;
  }

  protected override updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    if (
      (_changedProperties.has('rotationsPerMinute') ||
        _changedProperties.has('rateOfTurnDegreesPerMinute') ||
        _changedProperties.has('rotDotAnimationFactor')) &&
      this.rateOfTurnController
    ) {
      this.rateOfTurnController.rotationsPerMinute = this._effectiveRpm;
    }
  }

  @query('#rot')
  private rot!: HTMLElement;

  private rateOfTurnController?: RateOfTurnController;

  override firstUpdated() {
    this.rateOfTurnController = new RateOfTurnController(
      this,
      this.rot,
      this._effectiveRpm
    );
  }

  override render() {
    return html`
      <svg
        width="48"
        height="48"
        viewBox="6 6 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M30 48C39.9411 48 48 39.9411 48 30C48 20.0589 39.9411 12 30 12C20.0589 12 12 20.0589 12 30C12 39.9411 20.0589 48 30 48ZM30 40C35.5228 40 40 35.5228 40 30C40 24.4772 35.5228 20 30 20C24.4772 20 20 24.4772 20 30C20 35.5228 24.4772 40 30 40Z"
          fill="var(--instrument-frame-primary-color)"
        />
        <path
          d="M47.5 30C47.5 39.665 39.665 47.5 30 47.5V48.5C40.2173 48.5 48.5 40.2173 48.5 30H47.5ZM30 12.5C39.665 12.5 47.5 20.335 47.5 30H48.5C48.5 19.7827 40.2173 11.5 30 11.5V12.5ZM12.5 30C12.5 20.335 20.335 12.5 30 12.5V11.5C19.7827 11.5 11.5 19.7827 11.5 30H12.5ZM30 47.5C20.335 47.5 12.5 39.665 12.5 30H11.5C11.5 40.2173 19.7827 48.5 30 48.5V47.5ZM39.5 30C39.5 35.2467 35.2467 39.5 30 39.5V40.5C35.799 40.5 40.5 35.799 40.5 30H39.5ZM30 20.5C35.2467 20.5 39.5 24.7533 39.5 30H40.5C40.5 24.201 35.799 19.5 30 19.5V20.5ZM20.5 30C20.5 24.7533 24.7533 20.5 30 20.5V19.5C24.201 19.5 19.5 24.201 19.5 30H20.5ZM30 39.5C24.7533 39.5 20.5 35.2467 20.5 30H19.5C19.5 35.799 24.201 40.5 30 40.5V39.5Z"
          fill="var(--instrument-frame-tertiary-color)"
        />
        <g id="rot" transform-origin="30 30">
          <path
            d="M44.0124 28.0626C42.9506 28.3671 41.843 27.7531 41.5386 26.6914C41.2341 25.6296 41.848 24.522 42.9098 24.2176C43.9716 23.9131 45.0792 24.527 45.3836 25.5888C45.6881 26.6506 45.0742 27.7581 44.0124 28.0626Z"
            fill="var(--instrument-enhanced-secondary-color)"
          />
          <path
            d="M36.1739 42.7234C35.5562 41.8076 35.7979 40.5646 36.7136 39.9469C37.6293 39.3292 38.8724 39.5709 39.4901 40.4866C40.1077 41.4023 39.8661 42.6454 38.9504 43.2631C38.0346 43.8807 36.7916 43.6391 36.1739 42.7234Z"
            fill="var(--instrument-enhanced-secondary-color)"
          />
          <path
            d="M19.8087 39.7983C20.4887 38.9279 21.7456 38.7736 22.616 39.4536C23.4865 40.1337 23.6408 41.3906 22.9607 42.261C22.2807 43.1314 21.0238 43.2857 20.1534 42.6057C19.283 41.9256 19.1287 40.6687 19.8087 39.7983Z"
            fill="var(--instrument-enhanced-secondary-color)"
          />
          <path
            d="M17.5328 23.3307C18.5707 23.7084 19.1059 24.8561 18.7281 25.8941C18.3503 26.932 17.2027 27.4672 16.1647 27.0894C15.1267 26.7116 14.5916 25.564 14.9694 24.526C15.3471 23.488 16.4948 22.9529 17.5328 23.3307Z"
            fill="var(--instrument-enhanced-secondary-color)"
          />
          <path
            d="M32.4918 16.0769C32.4533 17.1808 31.5272 18.0444 30.4233 18.0059C29.3194 17.9673 28.4557 17.0412 28.4943 15.9373C28.5328 14.8334 29.459 13.9698 30.5629 14.0083C31.6668 14.0469 32.5304 14.973 32.4918 16.0769Z"
            fill="var(--instrument-enhanced-secondary-color)"
          />
          <path
            d="M44.0124 28.0626C42.9506 28.3671 41.843 27.7531 41.5386 26.6914C41.2341 25.6296 41.848 24.522 42.9098 24.2176C43.9716 23.9131 45.0792 24.527 45.3836 25.5888C45.6881 26.6506 45.0742 27.7581 44.0124 28.0626Z"
            stroke="var(--instrument-enhanced-secondary-color)"
          />
          <path
            d="M36.1739 42.7234C35.5562 41.8076 35.7979 40.5646 36.7136 39.9469C37.6293 39.3292 38.8724 39.5709 39.4901 40.4866C40.1077 41.4023 39.8661 42.6454 38.9504 43.2631C38.0346 43.8807 36.7916 43.6391 36.1739 42.7234Z"
            stroke="var(--instrument-enhanced-secondary-color)"
          />
          <path
            d="M19.8087 39.7983C20.4887 38.9279 21.7456 38.7736 22.616 39.4536C23.4865 40.1337 23.6408 41.3906 22.9607 42.261C22.2807 43.1314 21.0238 43.2857 20.1534 42.6057C19.283 41.9256 19.1287 40.6687 19.8087 39.7983Z"
            stroke="var(--instrument-enhanced-secondary-color)"
          />
          <path
            d="M17.5328 23.3307C18.5707 23.7084 19.1059 24.8561 18.7281 25.8941C18.3503 26.932 17.2027 27.4672 16.1647 27.0894C15.1267 26.7116 14.5916 25.564 14.9694 24.526C15.3471 23.488 16.4948 22.9529 17.5328 23.3307Z"
            stroke="var(--instrument-enhanced-secondary-color)"
          />
          <path
            d="M32.4918 16.0769C32.4533 17.1808 31.5272 18.0444 30.4233 18.0059C29.3194 17.9673 28.4557 17.0412 28.4943 15.9373C28.5328 14.8334 29.459 13.9698 30.5629 14.0083C31.6668 14.0469 32.5304 14.973 32.4918 16.0769Z"
            stroke="var(--instrument-enhanced-secondary-color)"
          />
        </g>
      </svg>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rot-indicator': ObcRotIndicator;
  }
}
