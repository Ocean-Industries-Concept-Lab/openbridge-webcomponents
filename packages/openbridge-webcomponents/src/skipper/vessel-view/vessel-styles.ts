import {css} from 'lit';
export const vesselStyles = css`
  .container {
    height: 100%;
    width: 100%;
  }

  .container > svg {
    height: 100%;
    width: 100%;
  }

  .satellite-label {
    fill: var(--element-active-inverted-color);
    font-size: 16px;
    font-family: sans-serif;
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
  }

  .ring {
    fill: var(--instrument-enhanced-secondary-color);
  }

  .ring-dark {
    fill-opacity: 0.75;
  }

  .ring-mid {
    fill-opacity: 0.55;
  }

  .ring-light {
    fill-opacity: 0.35;
  }

  .circle-dashed {
    fill: none;
    stroke: var(--instrument-frame-primary-color);
    stroke-width: 1.2;
    stroke-dasharray: 6 6;
  }

  .circle-solid {
    fill: none;
    stroke: var(--element-active-color);
    stroke-width: 2;
  }

  .axis {
    stroke: var(--instrument-frame-primary-color);
    stroke-width: 1.4;
  }

  .label {
    fill: var(--element-active-color);
    font-size: 14px;
    font-family: sans-serif;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .both-views {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .side-view,
  .top-down-view {
    width: 100%;
    flex: 0 0 auto;
  }

  .side-view {
    height: 290px;
  }

  .side-view div {
    transform: translateY(-40px);
  }

  .top-down-view {
    height: 220px;
  }

  .top-down-view div {
    transform: translateY(-115px);
  }
`;
