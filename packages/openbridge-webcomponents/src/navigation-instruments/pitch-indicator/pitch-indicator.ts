import {LitElement, css, html, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';

export enum PitchIndicatorType {
  enhanced = 'enhanced',
  regular = 'regular',
}

const VIEW_SIZE = 48;
const CX = VIEW_SIZE / 2;
const CY = VIEW_SIZE / 2;
const FRAME_OFFSET = 5.5;
const FRAME_RADIUS = 17.5;
const TRACK_END_ANGLE_DEG = 52.2;
const SECTOR_RAY = VIEW_SIZE * 2;

const POINTER_CENTER = 18.5;
const POINTER_BASE_ANGLE_DEG = -90;
const VESSEL_CALIBRATION_ANGLE = 76;

const DESIGN_SIZE = 37;
const STROKE_WIDTH = 1;
const INNER_VIEW_SIZE = 36;
const INNER_OFFSET = (VIEW_SIZE - INNER_VIEW_SIZE) / 2;
const OFFSET = STROKE_WIDTH / 2;
const SCALE = (INNER_VIEW_SIZE - STROKE_WIDTH) / DESIGN_SIZE;

const POINTER_W = 1;
const POINTER_H = 19;
const POINTER_RX = 0.5;
const POINTER_X = POINTER_CENTER - POINTER_W / 2;
const POINTER_Y = POINTER_CENTER;

const VESSEL_W = 19;
const VESSEL_H = 11;
const VESSEL_X = POINTER_CENTER - VESSEL_W / 2;
const VESSEL_Y = POINTER_CENTER - VESSEL_H / 2;
const VESSEL_CENTER_OFFSET_X = 0.7;
const VESSEL_CENTER_OFFSET_Y = 0.2;

const VESSEL_PATH_D =
  'M2.16504 0.612305L17.6199 4.75341L17.1022 6.68526C16.5304 8.81913 14.3371 10.0855 12.2032 9.51369L0.612125 6.40786L2.16504 0.612305Z';
let nextTrackMaskId = 0;
let nextContentMaskId = 0;
let nextSectorClipId = 0;

const FRAME_D =
  'M27.5 34.0885C24.7637 35.6683 21.6597 36.5 18.5 36.5C15.3403 36.5 12.2363 35.6683 9.5 34.0885C6.76365 32.5086 4.49137 30.2363 2.91154 27.5C1.33171 24.7637 0.5 21.6597 0.5 18.5C0.5 15.3403 1.33171 12.2363 2.91154 9.5C4.49137 6.76365 6.76365 4.49137 9.5 2.91154C12.2363 1.33171 15.3403 0.5 18.5 0.5C21.6597 0.5 24.7637 1.33171 27.5 2.91154';

const TRACK_D =
  'M33.9002 36.7287C33.1192 35.9476 33.1192 34.6813 33.9002 33.9002C35.2003 32.6002 36.2315 31.0569 36.9351 29.3583C37.6386 27.6598 38.0007 25.8393 38.0007 24.0007C38.0007 22.1622 37.6386 20.3417 36.9351 18.6432C36.2315 16.9446 35.2003 15.4013 33.9002 14.1012C33.1192 13.3202 33.1192 12.0539 33.9002 11.2728C34.6813 10.4918 35.9476 10.4918 36.7287 11.2728C38.4001 12.9443 39.726 14.9286 40.6306 17.1124C41.5352 19.2963 42.0007 21.637 42.0007 24.0007C42.0007 26.3645 41.5352 28.7052 40.6306 30.889C39.726 33.0729 38.4001 35.0572 36.7287 36.7287C35.9476 37.5097 34.6813 37.5097 33.9002 36.7287Z';

/**
 * `<obc-pitch-indicator>` – Compact pitch indicator with a horizontal reference line, side track, and vessel pointer.
 *
 * Presents a normalized value as a rotating vessel group and a filled sector inside the side track. The component footprint is **48×48** px, with the inner graphic sized to **36×36**.
 *
 * ## Features
 *
 * - **Variants:** `enhanced` and `regular` share the same geometry and behavior, with the dynamic elements switching between enhanced and regular secondary colors.
 * - **Normalized value:** `value` in `[-1, 1]` maps directly to the track angle.
 * - **Tokens:** Frame uses instrument frame tokens; the live sector and pointer use regular or enhanced secondary tokens by variant.
 *
 * ## Usage Guidelines
 *
 * Use for compact layouts where you need a small pitch cue next to other compact indicators.
 */
@customElement('obc-pitch-indicator')
export class ObcPitchIndicator extends LitElement {
  @property({type: String}) type: PitchIndicatorType =
    PitchIndicatorType.enhanced;

  @property({type: Number}) value = 0;

  private readonly trackMaskId = `obc-pitch-indicator-track-mask-${nextTrackMaskId++}`;
  private readonly contentMaskId = `obc-pitch-indicator-content-mask-${nextContentMaskId++}`;
  private readonly sectorClipId = `obc-pitch-indicator-sector-clip-${nextSectorClipId++}`;

  static override styles = css`
    :host {
      display: flex;
      box-sizing: border-box;
      width: var(--global-size-spacing-touch-target-min);
      height: var(--global-size-spacing-touch-target-min);
      align-items: center;
      justify-content: center;
      aspect-ratio: 1;
    }

    svg {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      flex-shrink: 0;
    }
  `;

  private clampNormalized(value: number): number {
    if (!Number.isFinite(value)) {
      return 0;
    }
    return Math.max(-1, Math.min(1, value));
  }

  private get clampedValue(): number {
    return this.clampNormalized(this.value);
  }

  private get mappedTrackAngle(): number {
    return this.clampedValue * TRACK_END_ANGLE_DEG;
  }

  private get displayAngle(): number {
    return this.mappedTrackAngle + POINTER_BASE_ANGLE_DEG;
  }

  private get sectorPathD(): string {
    const radians = (this.mappedTrackAngle * Math.PI) / 180;
    const edgeX = CX + Math.cos(radians) * SECTOR_RAY;
    const edgeY = CY + Math.sin(radians) * SECTOR_RAY;

    return `M${CX} ${CY}L${VIEW_SIZE} ${CY}L${edgeX} ${edgeY}Z`;
  }

  private renderDefs(
    trackMaskId: string,
    contentMaskId: string,
    sectorClipId: string
  ) {
    return svg`
      <defs>
        <mask
          id="${trackMaskId}"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="${VIEW_SIZE}"
          height="${VIEW_SIZE}"
          style="mask-type: alpha"
        >
          <path
            d="${TRACK_D}"
            fill="white"
          />
        </mask>
        <mask
          id="${contentMaskId}"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="${VIEW_SIZE}"
          height="${VIEW_SIZE}"
          style="mask-type: alpha"
        >
          <rect width="${VIEW_SIZE}" height="${VIEW_SIZE}" fill="black" />
          <circle
            cx="${CX}"
            cy="${CY}"
            r="${FRAME_RADIUS}"
            fill="white"
          />
          <path
            d="${TRACK_D}"
            fill="white"
          />
        </mask>
        <clipPath id="${sectorClipId}" clipPathUnits="userSpaceOnUse">
          <path d="${this.sectorPathD}" />
        </clipPath>
      </defs>
    `;
  }

  private renderCenterLine() {
    return svg`
      <path
        d="M${VIEW_SIZE - FRAME_OFFSET - 0.5} ${CY}L${FRAME_OFFSET + 0.5} ${CY}"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="${STROKE_WIDTH}"
        stroke-linecap="square"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  private renderFrame() {
    return svg`
      <g transform="translate(${FRAME_OFFSET} ${FRAME_OFFSET})">
        <path
          d="${FRAME_D}"
          fill="none"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-width="${STROKE_WIDTH}"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
      </g>
    `;
  }

  private renderTrackFill() {
    return svg`
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="${TRACK_D}"
        fill="var(--instrument-frame-primary-color)"
      />
    `;
  }

  private renderTrackBorder() {
    return svg`
      <path
        d="${TRACK_D}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="${STROKE_WIDTH}"
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  private renderSector(maskId: string, color: string) {
    return svg`
      <g mask="url(#${maskId})">
        <path
          d="${this.sectorPathD}"
          fill="${color}"
        />
      </g>
    `;
  }

  private renderHighlightedTrackBorder(sectorClipId: string, color: string) {
    return svg`
      <g clip-path="url(#${sectorClipId})">
        <path
          d="${TRACK_D}"
          fill="none"
          stroke="${color}"
          stroke-width="${STROKE_WIDTH}"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
      </g>
    `;
  }

  private renderPointer(color: string) {
    return svg`
      <g
        transform="translate(${INNER_OFFSET} ${INNER_OFFSET}) translate(${OFFSET} ${OFFSET}) scale(${SCALE})"
      >
        <rect
          x="${POINTER_X}"
          y="${POINTER_Y}"
          width="${POINTER_W}"
          height="${POINTER_H}"
          rx="${POINTER_RX}"
          fill="${color}"
          stroke="${color}"
          stroke-width="${STROKE_WIDTH}"
          vector-effect="non-scaling-stroke"
        />
      </g>
    `;
  }

  private renderVessel() {
    return svg`
      <g
        transform="translate(${INNER_OFFSET} ${INNER_OFFSET}) translate(${OFFSET} ${OFFSET}) scale(${SCALE}) translate(${VESSEL_X} ${VESSEL_Y}) translate(${VESSEL_CENTER_OFFSET_X} ${VESSEL_CENTER_OFFSET_Y})"
      >
        <path
          d="${VESSEL_PATH_D}"
          fill="var(--instrument-frame-primary-color)"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-width="${STROKE_WIDTH}"
          vector-effect="non-scaling-stroke"
        />
      </g>
    `;
  }

  private renderVesselGroup(type: PitchIndicatorType, contentMaskId: string) {
    const pointerColor = this.barColor(type);

    return svg`
      <g mask="url(#${contentMaskId})">
        <g transform="rotate(${this.displayAngle} ${CX} ${CY})">
          ${this.renderPointer(pointerColor)}
        </g>
        <g
          transform="rotate(${this.displayAngle + VESSEL_CALIBRATION_ANGLE} ${CX} ${CY})"
        >
          ${this.renderVessel()}
        </g>
      </g>
    `;
  }

  private barColor(type: PitchIndicatorType): string {
    return type === PitchIndicatorType.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private renderIndicator(type: PitchIndicatorType) {
    const trackMaskId = this.trackMaskId;
    const contentMaskId = this.contentMaskId;
    const sectorClipId = this.sectorClipId;
    const color = this.barColor(type);

    return html`
      <svg
        viewBox="0 0 ${VIEW_SIZE} ${VIEW_SIZE}"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${this.renderDefs(trackMaskId, contentMaskId, sectorClipId)}
        ${this.renderCenterLine()} ${this.renderFrame()}
        ${this.renderTrackFill()} ${this.renderSector(trackMaskId, color)}
        ${this.renderTrackBorder()}
        ${this.renderHighlightedTrackBorder(sectorClipId, color)}
        ${this.renderVesselGroup(type, contentMaskId)}
      </svg>
    `;
  }

  override render() {
    return this.renderIndicator(
      this.type === PitchIndicatorType.regular
        ? PitchIndicatorType.regular
        : PitchIndicatorType.enhanced
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pitch-indicator': ObcPitchIndicator;
  }
}
