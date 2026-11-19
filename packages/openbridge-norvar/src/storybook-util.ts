import {HTMLTemplateResult, html} from 'lit';

/**
 * Centres the story on the canvas and, while the `cross` global is on, draws
 * a cross through the centre. Same markup as the core's decorator, so the
 * snapshots stay comparable with the OpenBridge Storybook.
 */
export function crossDecorator(
  story: () => unknown,
  context: {globals?: {cross?: boolean} | Record<string, unknown>}
): HTMLTemplateResult {
  const cross = (context.globals as {cross?: boolean})?.cross ?? false;
  return html` <style>
      .wrapper {
        width: 100%;
        height: 100vh;
        position: relative;
      }

      .wrapper > * {
        position: absolute;
        top: 50%;
        left: 50%;
      }

      .wrapper.cross::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        left: calc(50% - 0.5px);
        background-color: rgb(0, 0, 0, 0.3);
      }

      .wrapper.cross::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        top: calc(50% - 0.5px);
        background-color: rgb(0, 0, 0, 0.3);
        z-index: -100;
      }
    </style>
    <div class="wrapper ${cross ? 'cross' : ''}">${story()}</div>`;
}
