import { LitElement, PropertyValues, html, unsafeCSS } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import compentStyle from "./graph-mini.css?inline";
import uPlot from 'uplot';


/**
 * @element obc-graph-mini
 * @description A mini graph component
 * 
 * @property {Array} data - The data to display in the graph, first array is the x values, second array is the y values
 */
@customElement('obc-graph-mini')
export class ObcGraphMini extends LitElement {

  @property({ type: Array })
  data: [number[], number[]] = [[], []];

  @query('#chart')
  chart!: HTMLDivElement;

  @state()
  private y: number = 24;

  private uplot: uPlot | null = null;

  private getCssColor(name: string) {
    const color = getComputedStyle(this).getPropertyValue(name).trim();
    return color;
  }

  override firstUpdated() {
    const opts = {
      width: 48,
      height: 48,
      scales: { x: { time: false, show: false }, y: { auto: true, show: false } },
      series: [
        {},
        { stroke: this.getCssColor('--element-neutral-color'), width: 2, points: { show: false } },
      ],
      axes: [{show: false}, {ticks: {show: false}, show: false, grid: {show: false}}],
      legend: {show: false},
      cursor: { show: false}
    };
    
    this.uplot = new uPlot(opts, this.data, this.chart);
    requestAnimationFrame(() => this.updateY());
  }

  updatePalette() {
    if (!this.uplot) { return; }
    const stroke = this.getCssColor('--element-neutral-color');
    // @ts-expect-error - stroke is not a property of the Series interface
    this.uplot.setSeries(1, { stroke: stroke, width: 2, points: { show: false } });
  }

  private updateY() {
    if (!this.uplot) { return; }
    const lastY = this.data[1][this.data[1].length - 1];
    // @ts-expect-error - valToPct is not a property of the Scale interface
    const yRatio = this.uplot.scales.y.valToPct(lastY);
    this.y = yRatio * 32 - 3;
  }

  override updated(changedProperties: PropertyValues) {
    if (changedProperties.has('data')) {
      this.updatePalette();
      this.uplot?.setData(this.data);
      requestAnimationFrame(() => this.updateY());
    }
  }
    

  override render() {
    return html`
      <div class="chart-container">
        <div id="chart"><div id="dot" style="bottom: ${this.y}px; "></div></div>
      </div>
      `
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-graph-mini': ObcGraphMini
  }
}
