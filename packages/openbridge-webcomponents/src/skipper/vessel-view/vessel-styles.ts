import {css} from 'lit';
export const vesselStyles = css`
  .container {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    // border: 1px solid green;
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
    position: relative;
    // left: -5%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .side-view-container {
    // padding-right: 10%;
    // border: 1px solid blue;
    // width: 100%;
    // position: relative;
  }

  .side-view {
    //background-color: yellow;
    position: relative;
    left: -30px;
  }

  .side-view svg {
    display: block;
  }

  .sensor-heights {
    position: absolute;
    top: 32px;
    right: -76px;
  }

  .keel-arrow-lines {
    position: absolute;
    top: 32px;
    right: -6px;
  }

  .keel-line-horizontal {
    position: absolute;
    left: 0;
    top: 173.35px;
    width: 100%;
    z-index: -1;
  }

  .draft-line-horizontal {
    position: absolute;
    left: 0;
    top: 162px;
    width: 100%;
    z-index: -1;
  }

  .vertical-ccrp-line {
    position: absolute;
    top: 16px;
  }

  .sensor-positioning-side-view {
    position: absolute;
  }

  .mast-line {
    position: absolute;
    top: 50px;
    z-index: -1;
    //background-color: red;
  }

  .top-down-view {
    position: relative;
    left: -30px;
    // left: -5%;
    //background-color: yellow;
  }

  .top-down-only > div {
    position: relative;
    left: 0px;
  }

  .top-down-view svg {
    display: block;
  }

  .total-vessel-width {
    position: absolute;
    top: 0px;
    left: -17px;
  }

  .horizontal-ccrp-line {
    position: absolute;
    top: 21px;
  }

  .port-starboard-side {
    position: absolute;
    top: 0px;
    right: -30px;
    z-index: -1;
  }

  .sensor-positioning-top-down-view {
    position: absolute;
    //background-color: violet;
    //top: 0px;
  }
`;
