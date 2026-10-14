import { css } from 'lit';
export const skyplotStyles = css`
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

  .signal-strength-legend {
    display: flex;
    flex-direction: column;
    width: 140px;
    padding: 8px 8px;
    border: 1px solid red;
    border-radius: 8px;
    box-sizing: border-box;

    z-index: 100;
  }

  .signal-strength-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
    white-space: nowrap;
    color: var(--element-active-color);
  }

  .signal-strength-row {
    display: flex;
    align-items: center;
    min-height: 48px;
    gap: 8px;
  }

  .signal-strength-row svg {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
  }

  .signal-strength-row span {
    font-size: 12px;
  }

  .signal-labels {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;

    height: 0px;

    color: var(--element-active-color);
  }

  .signal-strength-label {
    position: relative;
  }

`;