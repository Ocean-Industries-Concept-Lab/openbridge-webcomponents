import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import componentStyle from './donut-chart.css?inline';
import {customElement} from '../../decorator.js';
import {Chart, DoughnutController, ArcElement, Tooltip, Legend} from 'chart.js';
import type {Plugin, ChartOptions} from 'chart.js';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const CANVAS_PADDING = 32;

@customElement('obc-donut-chart')
export class ObcDonutChart extends LitElement {
  @property({attribute: false})
  data: {label: string; value: number}[] = [
    {label: 'Sector A', value: 33},
    {label: 'Sector B', value: 25},
    {label: 'Sector C', value: 12},
    {label: 'Sector D', value: 8},
    {label: 'Sector E', value: 4},
  ];

  @property({attribute: false})
  colors: string[] = [];

  @property({type: Boolean, reflect: true}) half = false;
  @property({type: Number}) size = 220;
  @property({type: Number}) thickness = 28;
  @property({type: Number}) gap = 2;
  @property({type: Boolean}) showPercentLabels = false;
  @property({type: Number}) max = 100;

  @state() private total = 0;
  @query('canvas') private canvasEl!: HTMLCanvasElement;
  private chart?: Chart;

  override willUpdate(changed: PropertyValues) {
    if (changed.has('data')) {
      this.total = (this.data ?? []).reduce(
        (s, d) => s + Number(d.value || 0),
        0
      );
    }
  }

  override updated(changed: PropertyValues) {
    super.updated(changed);

    if (
      changed.has('data') ||
      changed.has('colors') ||
      changed.has('half') ||
      changed.has('thickness') ||
      changed.has('gap') ||
      changed.has('max') ||
      changed.has('showPercentLabels')
    ) {
      this.updateChart();
    }
  }

  override firstUpdated() {
    this.createChart();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this.chart) {
      this.chart.destroy();
    }
  }

  // Draw simple outer labels around the doughnut segments.
  private createOuterLabelPlugin(): Plugin<'doughnut'> {
    return {
      id: 'outerLabels',
      afterDatasetsDraw: (chart) => {
        const dataset = chart.data.datasets?.[0];
        const labels = chart.data.labels ?? [];
        if (!dataset) return;

        const meta = chart.getDatasetMeta(0);
        if (!meta?.data.length) return;

        const ctx = chart.ctx;
        const hostStyle = getComputedStyle(this);
        const fontFamily =
          hostStyle.getPropertyValue('--font-family-main').trim() ||
          '"Noto Sans", sans-serif';
        const fontColor =
          hostStyle.getPropertyValue('--element-neutral-color').trim() ||
          '#333';

        ctx.save();
        ctx.font = `400 12px ${fontFamily}`;
        ctx.fillStyle = fontColor;
        ctx.textBaseline = 'middle';

        const values = (Array.isArray(dataset.data) ? dataset.data : []) as (
          | number
          | null
          | undefined
        )[];
        const labelOffset = 18;
        const padding = 6;

        const totalValue = this.total;

        meta.data.forEach((element, index) => {
          const arc = element as ArcElement;
          const label = labels[index];

          if (!arc || label === 'Remaining') {
            return;
          }

          const rawValue = Number(values[index] ?? 0);
          if (!Number.isFinite(rawValue) || rawValue <= 0) {
            return;
          }

          const middleAngle = (arc.startAngle + arc.endAngle) / 2;
          const radius = arc.outerRadius + labelOffset;
          const x = arc.x + Math.cos(middleAngle) * radius;
          const y = arc.y + Math.sin(middleAngle) * radius;
          const alignLeft = Math.cos(middleAngle) >= 0;

          ctx.textAlign = alignLeft ? 'left' : 'right';

          const percentageValue =
            this.showPercentLabels && totalValue > 0
              ? `${Math.round((rawValue / totalValue) * 100)}%`
              : undefined;
          const valueText =
            percentageValue !== undefined
              ? percentageValue
              : rawValue.toString();

          if (!valueText) {
            return;
          }

          const textX = alignLeft ? x + padding : x - padding;
          ctx.fillText(valueText, textX, y);
        });

        ctx.restore();
      },
    };
  }

  private createCenterTextPlugin(): Plugin<'doughnut'> {
    return {
      id: 'centerText',
      beforeDraw: (chart) => {
        const {ctx, chartArea} = chart;
        const {width, height, left, top} = chartArea;
        ctx.save();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Draw total value
        // TODO: use the conventional font sizes as seen in other components
        ctx.font = '600 32px var(--font-family-main, "Noto Sans", sans-serif)';
        ctx.fillStyle = 'var(--element-neutral-color, #333)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.total.toString(), centerX, centerY - 8);

        // Draw label
        ctx.font = '400 14px var(--font-family-main, "Noto Sans", sans-serif)';
        ctx.fillStyle = '#aaaaaa';
        ctx.fillText('Total', centerX, centerY + 16);

        ctx.restore();
      },
    };
  }

  private getDefaultColors(): string[] {
    // TODO: add more colors in case of more segments. Decide how to rotate the colors and color stops.
    const style = getComputedStyle(this);

    return [
      style.getPropertyValue('--base-blue-600').trim() || '#5271BD',
      style.getPropertyValue('--base-blue-500').trim() || '#6B84C7',
      style.getPropertyValue('--base-blue-400').trim() || '#8497D1',
      style.getPropertyValue('--base-blue-300').trim() || '#9DAADB',
      style.getPropertyValue('--base-blue-200').trim() || '#B6BDE5',
      style.getPropertyValue('--base-blue-100').trim() || '#CFD0EF',
      style.getPropertyValue('--base-blue-050').trim() || '#E8E3F9',
    ];
  }

  private createChart() {
    if (!this.canvasEl) return;

    const ctx = this.canvasEl.getContext('2d');
    if (!ctx) return;

    const chartColors =
      this.colors.length > 0 ? this.colors : this.getDefaultColors();
    const values = this.data.map((d) => d.value);
    const labels = this.data.map((d) => d.label);

    // Calculate remaining value to show empty space
    const remaining = Math.max(0, this.max - this.total);
    const allValues = [...values, remaining];
    const allLabels = [...labels, 'Remaining'];
    const allColors = [...chartColors.slice(0, values.length), '#dddddd'];

    // Calculate spacing between segments
    const spacingDegrees = this.gap * 2; // Convert gap to degrees

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: allLabels,
        datasets: [
          {
            data: allValues,
            backgroundColor: allColors,
            borderWidth: 0,
            spacing: spacingDegrees,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        rotation: this.half ? -90 : 0, // Half: start from 9 o'clock, Full: start from 12 o'clock
        circumference: this.half ? 180 : 360,
        cutout: `${((this.size - this.thickness * 2) / this.size) * 100}%`,
        layout: {
          padding: CANVAS_PADDING,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            filter: (tooltipItem) => {
              // Don't show tooltip for the "Remaining" segment
              return tooltipItem.label !== 'Remaining';
            },
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed;
                const percentage = ((value / this.max) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
        animation: {
          animateRotate: true,
          animateScale: false,
        },
      },
      plugins: [this.createOuterLabelPlugin(), this.createCenterTextPlugin()],
    });
  }

  private updateChart() {
    if (!this.chart) return;

    const chartColors =
      this.colors.length > 0 ? this.colors : this.getDefaultColors();
    const values = this.data.map((d) => d.value);
    const labels = this.data.map((d) => d.label);

    // Calculate remaining value to show empty space
    const remaining = Math.max(0, this.max - this.total);
    const allValues = [...values, remaining];
    const allLabels = [...labels, 'Remaining'];
    const allColors = [...chartColors.slice(0, values.length), '#dddddd'];

    const spacingDegrees = this.gap * 2;

    this.chart.data.labels = allLabels;
    this.chart.data.datasets[0].data = allValues;
    this.chart.data.datasets[0].backgroundColor = allColors;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.chart.data.datasets[0] as any).spacing = spacingDegrees;

    if (this.chart.options) {
      const options = this.chart.options as ChartOptions<'doughnut'>;
      options.circumference = this.half ? 180 : 360;
      options.rotation = this.half ? -90 : 0;
      options.cutout = `${((this.size - this.thickness * 2) / this.size) * 100}%`;
      options.layout = {
        ...(options.layout ?? {}),
        padding: CANVAS_PADDING,
      };
    }

    this.chart.update();
  }

  override render() {
    return html`
      <div class="wrapper">
        <canvas></canvas>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-donut-chart': ObcDonutChart;
  }
}
