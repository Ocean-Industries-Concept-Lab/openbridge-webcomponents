import { LitElement, html, TemplateResult, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { until } from "lit-html/directives/until.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { iconIds } from "../icons";
import componentStyle from "./Icon.css?inline";

@customElement("ob-icon")
export class Icon extends LitElement {
  @property({ type: String }) icon = "01-placeholder";
  @property({ type: Number }) size = 24;

  async iconSvg(icon: string): Promise<TemplateResult> {
    if (!iconIds.includes(icon)) {
      console.warn(`Icon ${icon} not found. Using placeholder instead.`);
      icon = "01-placeholder";
    }

    const svg = await import(`../assets/icons/${icon}.svg?raw`);
    return html`${unsafeSVG(svg.default)}`;
  }

  render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${until(
          this.iconSvg(this.icon).then((res) => html`${res}`),
          html`Loading...`
        )}
      </div>
    `;
  }

  static styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    "ob-icon": Icon;
  }
}
