import {
  html,
  HTMLTemplateResult,
  LitElement,
  nothing,
  PropertyValues,
  unsafeCSS,
} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../../decorator.js';
import componentStyle from './poi-selection-frame.css?inline';

export enum ObcPoiSelectionFrameType {
  Indicator = 'indicator',
  Button = 'button',
  Enhanced = 'enhanced',
}

export enum ObcPoiSelectionFrameState {
  Regular = 'regular',
  Alert = 'alert',
  None = 'none',
  Flat = 'flat',
}

enum ObcPoiSelectionFrameVariant {
  ButtonRegular = 'button-regular',
  ButtonAlert = 'button-alert',
  EnhancedRegular = 'enhanced-regular',
  EnhancedAlert = 'enhanced-alert',
}

function buttonRegularFrameDefault(): HTMLTemplateResult {
  return html`
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_11288_43269)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 5C12 4.44772 11.5523 4 11 4H8C5.79086 4 4 5.79086 4 8V11C4 11.5523 4.44772 12 5 12C5.55228 12 6 11.5523 6 11V8C6 6.89543 6.89543 6 8 6H11C11.5523 6 12 5.55228 12 5ZM37 6C36.4477 6 36 5.55228 36 5C36 4.44772 36.4477 4 37 4H40C42.2091 4 44 5.79086 44 8V11C44 11.5523 43.5523 12 43 12C42.4477 12 42 11.5523 42 11V8C42 6.89543 41.1046 6 40 6H37ZM36 43C36 42.4477 36.4477 42 37 42H40C41.1046 42 42 41.1046 42 40V37C42 36.4477 42.4477 36 43 36C43.5523 36 44 36.4477 44 37V40C44 42.2091 42.2091 44 40 44H37C36.4477 44 36 43.5523 36 43ZM5 36C5.55228 36 6 36.4477 6 37V40C6 41.1046 6.89543 42 8 42H11C11.5523 42 12 42.4477 12 43C12 43.5523 11.5523 44 11 44H8C5.79086 44 4 42.2091 4 40V37C4 36.4477 4.44772 36 5 36Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_11288_43269"
          x="-3"
          y="-2"
          width="54"
          height="54"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_11288_43269"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_11288_43269"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  `;
}

function buttonRegularFrameCompact(): HTMLTemplateResult {
  return html`
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_30578_819)">
        <path
          d="M10 32V34.7998C10 35.9199 9.99979 36.4804 10.2178 36.9082C10.4095 37.2845 10.7155 37.5905 11.0918 37.7822C11.4126 37.9457 11.808 37.9868 12.458 37.9971L13.2002 38H16V39.5H13.2002C12.6651 39.5 12.1733 39.5011 11.7646 39.4678C11.3384 39.4329 10.8717 39.3529 10.4111 39.1182C9.75262 38.7826 9.21738 38.2474 8.88184 37.5889C8.64714 37.1283 8.56705 36.6616 8.53223 36.2354C8.49886 35.8267 8.5 35.3349 8.5 34.7998V32H10ZM39.5 34.7998C39.5 35.3349 39.5011 35.8267 39.4678 36.2354C39.4329 36.6616 39.3529 37.1283 39.1182 37.5889C38.7826 38.2474 38.2474 38.7826 37.5889 39.1182C37.1283 39.3529 36.6616 39.4329 36.2354 39.4678C35.8267 39.5011 35.3349 39.5 34.7998 39.5H32V38H34.7998C35.7798 38 36.3311 37.9995 36.7402 37.8535L36.9082 37.7822C37.2374 37.6145 37.5129 37.3592 37.7051 37.0459L37.7822 36.9082C38.0002 36.4804 38 35.9199 38 34.7998V32H39.5V34.7998ZM34.7998 8.5C35.3349 8.5 35.8267 8.49886 36.2354 8.53223C36.6616 8.56705 37.1283 8.64714 37.5889 8.88184C38.2474 9.21738 38.7826 9.75262 39.1182 10.4111C39.3529 10.8717 39.4329 11.3384 39.4678 11.7646C39.5011 12.1733 39.5 12.6651 39.5 13.2002V16H38V13.2002C38 12.2202 37.9995 11.6689 37.8535 11.2598L37.7822 11.0918C37.6145 10.7626 37.3591 10.4871 37.0459 10.2949L36.9082 10.2178C36.4804 9.99979 35.9199 10 34.7998 10H32V8.5H34.7998ZM16 10H13.2002L12.458 10.0029C11.808 10.0132 11.4126 10.0543 11.0918 10.2178C10.7155 10.4095 10.4095 10.7155 10.2178 11.0918C9.99979 11.5196 10 12.0801 10 13.2002V16H8.5V13.2002C8.5 12.6651 8.49886 12.1733 8.53223 11.7646C8.56705 11.3384 8.64714 10.8717 8.88184 10.4111C9.21738 9.75262 9.75262 9.21738 10.4111 8.88184C10.8717 8.64714 11.3384 8.56705 11.7646 8.53223C12.1733 8.49886 12.6651 8.5 13.2002 8.5H16V10Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_30578_819"
          x="-2"
          y="-1"
          width="52"
          height="52"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_30578_819"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_30578_819"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  `;
}

function buttonAlertFrame(): HTMLTemplateResult {
  return html`
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_11326_86245)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11 3C11 2.44772 10.5523 2 10 2H7C4.79086 2 3 3.79086 3 6V9C3 9.55228 3.44772 10 4 10C4.55228 10 5 9.55228 5 9V6C5 4.89543 5.89543 4 7 4H10C10.5523 4 11 3.55228 11 3ZM40 4C39.4477 4 39 3.55228 39 3C39 2.44772 39.4477 2 40 2H43C45.2091 2 47 3.79086 47 6V9C47 9.55228 46.5523 10 46 10C45.4477 10 45 9.55228 45 9V6C45 4.89543 44.1046 4 43 4H40ZM39 45C39 44.4477 39.4477 44 40 44H43C44.1046 44 45 43.1046 45 42V39C45 38.4477 45.4477 38 46 38C46.5523 38 47 38.4477 47 39V42C47 44.2091 45.2091 46 43 46H40C39.4477 46 39 45.5523 39 45ZM4 38C4.55228 38 5 38.4477 5 39V42C5 43.1046 5.89543 44 7 44H10C10.5523 44 11 44.4477 11 45C11 45.5523 10.5523 46 10 46H7C4.79086 46 3 44.2091 3 42V39C3 38.4477 3.44772 38 4 38Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_11326_86245"
          x="-2"
          y="-2"
          width="54"
          height="54"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_11326_86245"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_11326_86245"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  `;
}

function enhancedRegularFrame(): HTMLTemplateResult {
  return html`
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_11288_43283)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14 5C14 4.44772 13.5523 4 13 4H8C5.79086 4 4 5.79086 4 8V13C4 13.5523 4.44772 14 5 14C5.55228 14 6 13.5523 6 13V8C6 6.89543 6.89543 6 8 6H13C13.5523 6 14 5.55228 14 5ZM51 6C50.4477 6 50 5.55228 50 5C50 4.44772 50.4477 4 51 4H56C58.2091 4 60 5.79086 60 8V13C60 13.5523 59.5523 14 59 14C58.4477 14 58 13.5523 58 13V8C58 6.89543 57.1046 6 56 6H51ZM50 59C50 58.4477 50.4477 58 51 58H56C57.1046 58 58 57.1046 58 56V51C58 50.4477 58.4477 50 59 50C59.5523 50 60 50.4477 60 51V56C60 58.2091 58.2091 60 56 60H51C50.4477 60 50 59.5523 50 59ZM5 50C5.55228 50 6 50.4477 6 51V56C6 57.1046 6.89543 58 8 58H13C13.5523 58 14 58.4477 14 59C14 59.5523 13.5523 60 13 60H8C5.79086 60 4 58.2091 4 56V51C4 50.4477 4.44772 50 5 50Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_11288_43283"
          x="-3"
          y="-2"
          width="70"
          height="70"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_11288_43283"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_11288_43283"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  `;
}

function enhancedAlertFrame(): HTMLTemplateResult {
  return html`
    <svg
      width="66"
      height="66"
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_11288_43290)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14 3C14 2.44772 13.5523 2 13 2H7C4.79086 2 3 3.79086 3 6V12C3 12.5523 3.44772 13 4 13C4.55228 13 5 12.5523 5 12V6C5 4.89543 5.89543 4 7 4H13C13.5523 4 14 3.55228 14 3ZM53 4C52.4477 4 52 3.55228 52 3C52 2.44772 52.4477 2 53 2H59C61.2091 2 63 3.79086 63 6V12C63 12.5523 62.5523 13 62 13C61.4477 13 61 12.5523 61 12V6C61 4.89543 60.1046 4 59 4H53ZM52 61C52 60.4477 52.4477 60 53 60H59C60.1046 60 61 59.1046 61 58V52C61 51.4477 61.4477 51 62 51C62.5523 51 63 51.4477 63 52V58C63 60.2091 61.2091 62 59 62H53C52.4477 62 52 61.5523 52 61ZM4 51C4.55228 51 5 51.4477 5 52V58C5 59.1046 5.89543 60 7 60H13C13.5523 60 14 60.4477 14 61C14 61.5523 13.5523 62 13 62H7C4.79086 62 3 60.2091 3 58V52C3 51.4477 3.44772 51 4 51Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_11288_43290"
          x="-2"
          y="-2"
          width="70"
          height="70"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_11288_43290"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_11288_43290"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  `;
}

/**
 * `<obc-poi-selection-frame>` renders a non-interactive selection frame around POI targets.
 *
 * ## Overview
 *
 * Use this component to draw the cornered frame (focus ring/highlight frame/bounding
 * box) around POI targets in AR layouts. It supports standard and enhanced sizes,
 * alert styling, and custom sizing mode for variable target bounds.
 * Keywords: selection frame, focus ring, highlight frame, bounding box.
 *
 * ## Features/Variants
 *
 * Visual variants are resolved from `type` + `state`:
 * - `type="indicator"`: 48x48 frame footprint that resolves to regular button-style corners.
 * - `type="button"`: Button-sized frame (regular or alert).
 * - `type="enhanced"`: Larger frame variant (regular or alert).
 * - `state="regular"`: Standard selection frame appearance.
 * - `state="alert"`: Alert-colored frame appearance.
 * - `state="none"`: Hides the frame entirely.
 * - `state="flat"`: Available enum value; currently follows regular frame visuals.
 *
 * Configuration flags and enum props:
 * - `type` (`ObcPoiSelectionFrameType`, default: `indicator`): Selects base frame size/variant family.
 * - `state` (`ObcPoiSelectionFrameState`, default: `regular`): Selects visual state (`regular`, `alert`, `none`, `flat`).
 * - `customMode` (`boolean`, default: `false`): Enables custom-size frame rendering logic.
 * - `boxWidth` (`number | null`, default: `null`): Width offset in px for custom mode; `null` behaves like `0`, base size remains 32px before variant scaling.
 * - `boxHeight` (`number | null`, default: `null`): Height offset in px for custom mode; `null` behaves like `0`, base size remains 32px before variant scaling.
 *
 * ## Usage Guidelines
 *
 * - Use `<obc-poi-selection-frame>` for non-interactive target emphasis around POI buttons.
 * - Prefer this component over `obc-poi-object` when you need an outer frame instead of changing the POI body state.
 * - Prefer this component over `obc-poi-pointer` when highlighting a target area, not a pointer endpoint.
 * - Enable `customMode` only when the frame must match dynamic bounding sizes.
 *
 * ## Slots/Content
 *
 * None.
 *
 * ## Events
 *
 * None (no custom events emitted).
 *
 * ## Best Practices
 *
 * - Keep `state` synchronized with alert semantics so frame color matches alert context.
 * - Use `state="none"` instead of conditional DOM removal when stable layout anchoring is needed.
 * - Provide non-negative `boxWidth`/`boxHeight` values in px for predictable custom sizing.
 *
 * ## Example
 *
 * ```html
 * <obc-poi-selection-frame
 *   type="button"
 *   state="regular"
 * ></obc-poi-selection-frame>
 * ```
 *
 * @slot
 * @fires
 */
@customElement('obc-poi-selection-frame')
export class ObcPoiSelectionFrame extends LitElement {
  private static readonly MIN_CUSTOM_SIZE_PX = 32;
  private static readonly MIN_TOUCH_TARGET_SIZE_PX = 48;
  private static readonly CORNER_SHADOW_BLEED_PX = 6;

  @property({type: String, reflect: true})
  type: ObcPoiSelectionFrameType = ObcPoiSelectionFrameType.Indicator;

  @property({type: String, reflect: true})
  state: ObcPoiSelectionFrameState = ObcPoiSelectionFrameState.Regular;

  @property({type: Boolean, reflect: true, attribute: 'custom-mode'})
  customMode = false;

  @property({type: Number, attribute: 'box-width'})
  boxWidth: number | null = null;

  @property({type: Number, attribute: 'box-height'})
  boxHeight: number | null = null;

  private get resolvedVariant(): ObcPoiSelectionFrameVariant {
    if (this.type === ObcPoiSelectionFrameType.Indicator) {
      return ObcPoiSelectionFrameVariant.ButtonRegular;
    }

    if (this.type === ObcPoiSelectionFrameType.Enhanced) {
      return this.state === ObcPoiSelectionFrameState.Alert
        ? ObcPoiSelectionFrameVariant.EnhancedAlert
        : ObcPoiSelectionFrameVariant.EnhancedRegular;
    }

    return this.state === ObcPoiSelectionFrameState.Alert
      ? ObcPoiSelectionFrameVariant.ButtonAlert
      : ObcPoiSelectionFrameVariant.ButtonRegular;
  }

  private get resolvedVariantSourceSizePx(): number {
    switch (this.resolvedVariant) {
      case ObcPoiSelectionFrameVariant.ButtonAlert:
        return 50;
      case ObcPoiSelectionFrameVariant.EnhancedRegular:
        return 64;
      case ObcPoiSelectionFrameVariant.EnhancedAlert:
        return 66;
      case ObcPoiSelectionFrameVariant.ButtonRegular:
      default:
        return 48;
    }
  }

  private get resolvedVariantCornerVisualPx(): number {
    switch (this.resolvedVariant) {
      case ObcPoiSelectionFrameVariant.ButtonAlert:
        return 11;
      case ObcPoiSelectionFrameVariant.EnhancedRegular:
      case ObcPoiSelectionFrameVariant.EnhancedAlert:
        return 14;
      case ObcPoiSelectionFrameVariant.ButtonRegular:
      default:
        return 12;
    }
  }

  private get resolvedVariantCornerCropPx(): number {
    return (
      this.resolvedVariantCornerVisualPx +
      ObcPoiSelectionFrame.CORNER_SHADOW_BLEED_PX
    );
  }

  private renderVariantFrame(useCompactRegular = false): HTMLTemplateResult {
    switch (this.resolvedVariant) {
      case ObcPoiSelectionFrameVariant.ButtonAlert:
        return buttonAlertFrame();
      case ObcPoiSelectionFrameVariant.EnhancedRegular:
        return enhancedRegularFrame();
      case ObcPoiSelectionFrameVariant.EnhancedAlert:
        return enhancedAlertFrame();
      case ObcPoiSelectionFrameVariant.ButtonRegular:
      default:
        return useCompactRegular
          ? buttonRegularFrameCompact()
          : buttonRegularFrameDefault();
    }
  }

  private renderCustomFrame(): HTMLTemplateResult {
    const sourceSizePx = this.resolvedVariantSourceSizePx;
    const customWidthPx = this.resolvedCustomVisualWidthPx;
    const customHeightPx = this.resolvedCustomVisualHeightPx;
    const cornerCropPx = this.resolvedVariantCornerCropPx;
    const cornerOffsetPx = sourceSizePx - cornerCropPx;
    const shadowBleedPx = ObcPoiSelectionFrame.CORNER_SHADOW_BLEED_PX;

    if (customWidthPx <= sourceSizePx && customHeightPx <= sourceSizePx) {
      return html`
        <span
          class="custom-frame custom-frame--native"
          part="custom-frame"
          style=${`
            width: ${customWidthPx}px;
            height: ${customHeightPx}px;
            --obc-poi-selection-frame-source-size: ${sourceSizePx}px;
          `}
        >
          ${this.renderVariantFrame(true)}
        </span>
      `;
    }

    return html`
      <span
        class="custom-frame"
        part="custom-frame"
        style=${`
          width: ${customWidthPx}px;
          height: ${customHeightPx}px;
          --obc-poi-selection-frame-source-size: ${sourceSizePx}px;
          --obc-poi-selection-frame-corner-crop: ${cornerCropPx}px;
          --obc-poi-selection-frame-corner-offset: ${cornerOffsetPx}px;
          --obc-poi-selection-frame-shadow-bleed: ${shadowBleedPx}px;
        `}
      >
        <span class="custom-corner tl">${this.renderVariantFrame(true)}</span>
        <span class="custom-corner tr">${this.renderVariantFrame(true)}</span>
        <span class="custom-corner bl">${this.renderVariantFrame(true)}</span>
        <span class="custom-corner br">${this.renderVariantFrame(true)}</span>
      </span>
    `;
  }

  private renderFrame(): HTMLTemplateResult | typeof nothing {
    if (this.state === ObcPoiSelectionFrameState.None) {
      return nothing;
    }

    if (this.customMode) {
      return this.renderCustomFrame();
    }

    return this.renderVariantFrame(false);
  }

  private get resolvedCustomBoxWidthPx(): number {
    const width = Number(this.boxWidth);
    const offsetWidth = Number.isFinite(width) && width >= 0 ? width : 0;

    return ObcPoiSelectionFrame.MIN_CUSTOM_SIZE_PX + offsetWidth;
  }

  private get resolvedCustomBoxHeightPx(): number {
    const height = Number(this.boxHeight);
    const offsetHeight = Number.isFinite(height) && height >= 0 ? height : 0;

    return ObcPoiSelectionFrame.MIN_CUSTOM_SIZE_PX + offsetHeight;
  }

  private get resolvedCustomVisualWidthPx(): number {
    return (
      this.resolvedVariantSourceSizePx +
      (this.resolvedCustomBoxWidthPx - ObcPoiSelectionFrame.MIN_CUSTOM_SIZE_PX)
    );
  }

  private get resolvedCustomVisualHeightPx(): number {
    return (
      this.resolvedVariantSourceSizePx +
      (this.resolvedCustomBoxHeightPx - ObcPoiSelectionFrame.MIN_CUSTOM_SIZE_PX)
    );
  }

  protected override updated(_changedProperties: PropertyValues): void {
    if (this.customMode && this.state !== ObcPoiSelectionFrameState.None) {
      const touchTargetWidthPx = Math.max(
        this.resolvedCustomVisualWidthPx,
        ObcPoiSelectionFrame.MIN_TOUCH_TARGET_SIZE_PX
      );
      const touchTargetHeightPx = Math.max(
        this.resolvedCustomVisualHeightPx,
        ObcPoiSelectionFrame.MIN_TOUCH_TARGET_SIZE_PX
      );

      this.style.width = `${touchTargetWidthPx}px`;
      this.style.height = `${touchTargetHeightPx}px`;
      this.style.minWidth = `${ObcPoiSelectionFrame.MIN_TOUCH_TARGET_SIZE_PX}px`;
      this.style.minHeight = `${ObcPoiSelectionFrame.MIN_TOUCH_TARGET_SIZE_PX}px`;
      return;
    }

    this.style.removeProperty('width');
    this.style.removeProperty('height');
    this.style.removeProperty('min-width');
    this.style.removeProperty('min-height');
  }

  override render() {
    return html`<span class="frame" part="frame" aria-hidden="true"
      >${this.renderFrame()}</span
    >`;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-selection-frame': ObcPoiSelectionFrame;
  }
}
