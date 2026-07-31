import { css } from 'lit';

export const loggingGraphStyles = css`

    .legend-item {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px; /* TODO(CSS): 16px from Figma but brainstorm not enough height use case */
      min-height: 16px;
    }

    .legend-color {
      display: inline-flex;
      width: 16px;
      height: 16px;
      border-radius: var(
        --infographic-components-legend-item-indicator-border-radius
      );
      margin-right: 8px;
      flex-shrink: 0;
    }

    .legend-text {
        fill: white;
        font-size: 14px;
        dominant-baseline: middle;
    }

    .ob-font-ui-body {
        fontFamily: var(--font-family-main),
        fontSize: 48px,
        fontWeight: var(--global-typography-ui-label-font-weight),
        fontColor: var(--instrument-tick-mark-label-secondary-color),
    }

    .font-scales {
        fontFamily: var(--font-family-main),
        fontSize: 64px,
        fontWeight: var(--global-typography-ui-label-font-weight),
        fontColor: var(--instrument-tick-mark-label-secondary-color),
    }
`;