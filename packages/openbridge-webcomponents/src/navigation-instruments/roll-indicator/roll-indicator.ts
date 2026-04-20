import {LitElement, css, html, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';

export enum RollIndicatorType {
  enhanced = 'enhanced',
  regular = 'regular',
}

const VIEW_SIZE = 36;
const CX = VIEW_SIZE / 2;
const CY = VIEW_SIZE / 2;

const DESIGN_SIZE = 37;
const STROKE_WIDTH = 1;

const OFFSET = STROKE_WIDTH / 2;
const SCALE = (VIEW_SIZE - STROKE_WIDTH) / DESIGN_SIZE;

export const ROLL_INDICATOR_MAX_ROLL_DEG = 30;

const MAX_ROLL = ROLL_INDICATOR_MAX_ROLL_DEG;
const TRACK_END_ANGLE_DEG = 52.2;
const SECTOR_RAY_PX = VIEW_SIZE * 2;
const SECTOR_BASE_ANGLE_DEG = 90;

const OUTER_ARC_D =
  'M2.91154 27.5C1.33171 24.7637 0.5 21.6597 0.5 18.5C0.5 15.3403 1.33171 12.2363 2.91154 9.5C4.49137 6.76365 6.76365 4.49137 9.5 2.91154C12.2363 1.33171 15.3403 0.5 18.5 0.5C21.6597 0.5 24.7637 1.33171 27.5 2.91154C30.2363 4.49137 32.5086 6.76365 34.0885 9.5C35.6683 12.2363 36.5 15.3403 36.5 18.5C36.5 21.6597 35.6683 24.7637 34.0885 27.5';

const TRACK_D =
  'M1.08579 1.08579C1.86683 0.304738 3.13317 0.304738 3.91421 1.08579C5.21423 2.38581 6.75758 3.41704 8.45614 4.1206C10.1547 4.82417 11.9752 5.18629 13.8137 5.18629C15.6522 5.18629 17.4727 4.82417 19.1713 4.1206C20.8698 3.41704 22.4132 2.38581 23.7132 1.08579C24.4943 0.304738 25.7606 0.304738 26.5416 1.08579C27.3227 1.86684 27.3227 3.13316 26.5416 3.91421C24.8702 5.58567 22.8859 6.91154 20.702 7.81612C18.5182 8.72071 16.1775 9.18629 13.8137 9.18629C11.4499 9.18629 9.10927 8.72071 6.92541 7.81612C4.74155 6.91154 2.75724 5.58567 1.08579 3.91421C0.304738 3.13316 0.304738 1.86684 1.08579 1.08579Z';

const TRACK_TX = 18.5 - 13.8137;
const TRACK_TY = 27.8993 - 1.08579;

const VESSEL_SIZE = 11;
const VESSEL_PATH_D =
  'M2.12207 0.612305L9.84948 2.68286L8.29656 8.47841C8.01068 9.54534 6.914 10.1785 5.84707 9.89263L1.98337 8.85735C0.916437 8.57147 0.283272 7.47479 0.569156 6.40786L2.12207 0.612305Z';
const VESSEL_X = 18.5 - VESSEL_SIZE / 2;
const VESSEL_Y = 18.5 - VESSEL_SIZE / 2;
const VESSEL_CALIBRATION_ANGLE = -16;
const VESSEL_CENTER_OFFSET_X = 0.434;
const VESSEL_CENTER_OFFSET_Y = 0.105;

const POINTER_W = 1;
const POINTER_H = 17.5;
const POINTER_RX = 0.5;
const POINTER_X = 18.5 - POINTER_W / 2;
const POINTER_Y = 18.5;

let nextSectorClipId = 0;
let nextTrackMaskId = 0;
let nextTrackClipId = 0;

/**
 * `<obc-roll-indicator>` – A compact roll indicator that visualizes a roll angle in a 48×48 layout with a 36×36 SVG graphic.
 *
 * This component visualizes a single instantaneous roll value using a compact graphic layout (arc, track, pointer, vessel).
 *
 * ## Features
 *
 * - **Roll:** Bank angle in degrees; pointer and sector follow **`roll`** clamped within ±**`ROLL_INDICATOR_MAX_ROLL_DEG`**°.
 * - **Variants:** `enhanced` and `regular` change the accent color.
 *
 * ## Usage Guidelines
 *
 * Use when you need a small roll cue next to other compact indicators.
 */
@customElement('obc-roll-indicator')
export class ObcRollIndicator extends LitElement {
  @property({type: String}) type: RollIndicatorType =
    RollIndicatorType.enhanced;

  @property({type: Number}) roll = 0;

  private readonly sectorClipId = `obc-roll-indicator-sector-clip-${nextSectorClipId++}`;
  private readonly trackMaskId = `obc-roll-indicator-track-mask-${nextTrackMaskId++}`;
  private readonly trackClipId = `obc-roll-indicator-track-clip-${nextTrackClipId++}`;

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
      width: 36px;
      height: 36px;
      flex-shrink: 0;
    }
  `;

  private clampRoll(value: number): number {
    if (!Number.isFinite(value)) {
      return 0;
    }

    return Math.max(-MAX_ROLL, Math.min(MAX_ROLL, value));
  }

  private get clampedRoll(): number {
    return this.clampRoll(this.roll);
  }

  private get mappedTrackAngle(): number {
    return (this.clampedRoll / MAX_ROLL) * TRACK_END_ANGLE_DEG;
  }

  private get displayAngle(): number {
    return this.mappedTrackAngle;
  }

  private get sectorPathD(): string {
    const baseRadians = (SECTOR_BASE_ANGLE_DEG * Math.PI) / 180;
    const edgeRadians =
      ((SECTOR_BASE_ANGLE_DEG + this.mappedTrackAngle) * Math.PI) / 180;

    const baseX = CX + Math.cos(baseRadians) * SECTOR_RAY_PX;
    const baseY = CY + Math.sin(baseRadians) * SECTOR_RAY_PX;
    const edgeX = CX + Math.cos(edgeRadians) * SECTOR_RAY_PX;
    const edgeY = CY + Math.sin(edgeRadians) * SECTOR_RAY_PX;

    return `M${CX} ${CY}L${baseX} ${baseY}L${edgeX} ${edgeY}Z`;
  }

  private barColor(type: RollIndicatorType): string {
    return type === RollIndicatorType.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private renderOuterArc() {
    const stroke = 'var(--instrument-frame-tertiary-color)';
    return svg`
      <g transform="translate(${OFFSET} ${OFFSET}) scale(${SCALE})">
        <path
          d="${OUTER_ARC_D}"
          fill="none"
          stroke="${stroke}"
          stroke-width="${STROKE_WIDTH}"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
      </g>
    `;
  }

  private renderDefs() {
    return svg`
      <defs>
        <mask
          id="${this.trackMaskId}"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="${VIEW_SIZE}"
          height="${VIEW_SIZE}"
          style="mask-type: alpha"
        >
          <rect width="${VIEW_SIZE}" height="${VIEW_SIZE}" fill="black" />
          <g
            transform="translate(${OFFSET} ${OFFSET}) scale(${SCALE}) translate(${TRACK_TX} ${TRACK_TY})"
          >
            <path d="${TRACK_D}" fill="white" />
          </g>
        </mask>
        <clipPath id="${this.trackClipId}" clipPathUnits="userSpaceOnUse">
          <path
            transform="translate(${OFFSET} ${OFFSET}) scale(${SCALE}) translate(${TRACK_TX} ${TRACK_TY})"
            fill-rule="evenodd"
            d="${TRACK_D}"
          />
        </clipPath>
        <clipPath id="${this.sectorClipId}" clipPathUnits="userSpaceOnUse">
          <path d="${this.sectorPathD}" />
        </clipPath>
      </defs>
    `;
  }

  private renderVerticalReference() {
    return svg`
      <g transform="translate(${OFFSET} ${OFFSET}) scale(${SCALE})">
        <path
          d="M18.5 36.5L18.5 0.5"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-width="${STROKE_WIDTH}"
          stroke-linecap="butt"
          vector-effect="non-scaling-stroke"
        />
      </g>
    `;
  }

  private renderBottomTrackFill() {
    return svg`
      <g
        transform="translate(${OFFSET} ${OFFSET}) scale(${SCALE}) translate(${TRACK_TX} ${TRACK_TY})"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="${TRACK_D}"
          fill="var(--instrument-frame-primary-color)"
        />
      </g>
    `;
  }

  private renderBottomTrackBorder() {
    return svg`
      <g
        transform="translate(${OFFSET} ${OFFSET}) scale(${SCALE}) translate(${TRACK_TX} ${TRACK_TY})"
      >
        <path
          d="${TRACK_D}"
          fill="none"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-width="${STROKE_WIDTH}"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </g>
    `;
  }

  private renderHighlightedTrackBorder(sectorClipId: string, color: string) {
    return svg`
      <g clip-path="url(#${sectorClipId})">
        <g
          transform="translate(${OFFSET} ${OFFSET}) scale(${SCALE}) translate(${TRACK_TX} ${TRACK_TY})"
        >
          <path
            d="${TRACK_D}"
            fill="none"
            stroke="${color}"
            stroke-width="${STROKE_WIDTH}"
            stroke-linecap="round"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          />
        </g>
      </g>
    `;
  }

  private renderSector(color: string) {
    return svg`
      <g clip-path="url(#${this.trackClipId})">
        <g mask="url(#${this.trackMaskId})">
          <path d="${this.sectorPathD}" fill="${color}" />
        </g>
      </g>
    `;
  }

  private renderPointer(color: string) {
    return svg`
      <g transform="translate(${OFFSET} ${OFFSET}) scale(${SCALE})">
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
        transform="translate(${OFFSET} ${OFFSET}) scale(${SCALE}) translate(${VESSEL_X} ${VESSEL_Y}) translate(${VESSEL_CENTER_OFFSET_X} ${VESSEL_CENTER_OFFSET_Y})"
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

  private renderVesselGroup(type: RollIndicatorType) {
    const color = this.barColor(type);
    return svg`
      <g>
        <g transform="rotate(${this.displayAngle} ${CX} ${CY})">
          ${this.renderPointer(color)}
        </g>
        <g transform="rotate(${this.displayAngle + VESSEL_CALIBRATION_ANGLE} ${CX} ${CY})">
          ${this.renderVessel()}
        </g>
      </g>
    `;
  }

  override render() {
    const color = this.barColor(this.type);
    return html`
      <svg
        viewBox="0 0 ${VIEW_SIZE} ${VIEW_SIZE}"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${this.renderDefs()} ${this.renderOuterArc()}
        ${this.renderVerticalReference()} ${this.renderBottomTrackFill()}
        ${this.renderSector(color)} ${this.renderBottomTrackBorder()}
        ${this.renderHighlightedTrackBorder(this.sectorClipId, color)}
        ${this.renderVesselGroup(this.type)}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-roll-indicator': ObcRollIndicator;
  }
}
