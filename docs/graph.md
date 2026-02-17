# OpenBridge Charts and Graphs

The OpenBridge Web Components library includes a set of ready-to-use chart components for common visualization needs. For highly customized plots, you can also use Chart.js directly with OpenBridge styling.

## Built-in Chart Components

All chart components are theme-aware, responsive, and follow the OpenBridge design system out of the box. They are available under the `<obc-*>` tag namespace.

### Line and Area Charts

Built on Chart.js, these components support single/multi-series data, time or category axes, and various styling options.

#### `<obc-line-graph>` — Line chart (no fill)

```html
<obc-line-graph></obc-line-graph>
<script>
  const chart = document.querySelector('obc-line-graph');
  chart.data = [
    {label: 'Jan', value: 10},
    {label: 'Feb', value: 14},
    {label: 'Mar', value: 12}
  ];
  chart.unit = 'kW';
  chart.height = 256;
  chart.showGrid = true;
  chart.showTickMarks = true;
</script>
```

Key properties: `data`, `datasets` (multi-series), `xAxisType` (`'category'` | `'time'`), `lineMode` (`'smooth'` | `'straight'` | `'stepped'`), `showGrid`, `showTickMarks`, `showPoints`, `legend`, `height`, `unit`, `yAxisPosition`, `yAxes` (multi-axis), `enhanced`.

#### `<obc-area-graph>` — Filled area chart

Same API as line graph, plus fill-specific properties:

```html
<obc-area-graph></obc-area-graph>
<script>
  const chart = document.querySelector('obc-area-graph');
  chart.data = [
    {label: 'Jan', value: 10},
    {label: 'Feb', value: 14},
    {label: 'Mar', value: 12}
  ];
  chart.fillMode = 'semitransparent'; // 'semitransparent' | 'solid' | 'threshold'
  chart.stacked = false; // stack multi-series vertically
</script>
```

Fill modes:
- `semitransparent` — 50% alpha fill (default)
- `solid` — opaque fill
- `threshold` — red/blue above/below midpoint (single-series only)

### Circular Charts

#### `<obc-donut-chart>` — Donut chart with center readout

```html
<obc-donut-chart></obc-donut-chart>
<script>
  const chart = document.querySelector('obc-donut-chart');
  chart.data = [
    {label: 'Used', value: 65},
    {label: 'Reserved', value: 20}
  ];
  chart.max = 100; // shows remaining capacity
  chart.half = false; // true for 180° layout
  chart.showOuterLabels = true;
  chart.legend = true;
</script>
```

#### `<obc-pie-chart>` — Pie chart with optional sunburst mode

```html
<obc-pie-chart></obc-pie-chart>
<script>
  const chart = document.querySelector('obc-pie-chart');
  chart.data = [
    {label: 'A', value: 30},
    {label: 'B', value: 50, children: [{label: 'B1', value: 20}, {label: 'B2', value: 30}]},
    {label: 'C', value: 20}
  ];
  chart.sunburst = true; // enable expandable child segments
  chart.legend = true;
</script>
```

#### `<obc-polar-chart>` — Polar area chart

```html
<obc-polar-chart></obc-polar-chart>
<script>
  const chart = document.querySelector('obc-polar-chart');
  chart.data = [
    {label: 'N', value: 12},
    {label: 'E', value: 8},
    {label: 'S', value: 15},
    {label: 'W', value: 6}
  ];
  chart.monochrome = false;
  chart.showSectorLabels = true;
</script>
```

#### `<obc-radial-bar-chart>` — Concentric rings chart

```html
<obc-radial-bar-chart></obc-radial-bar-chart>
<script>
  const chart = document.querySelector('obc-radial-bar-chart');
  chart.data = [75, 50, 90]; // one value per ring
  chart.max = 100;
  chart.circumference = 270; // 360 or 270
  chart.legend = true;
</script>
```

### Common properties (all chart components)

| Property | Type | Default | Description |
|---|---|---|---|
| `enhanced` | `boolean` | `false` | Use enhanced (blue) color palette |
| `colors` | `string[]` | `[]` | Custom colors (falls back to theme defaults) |
| `legend` | `boolean` | `false` | Show a legend below the chart |
| `fixedHeight` | `number` | `320` | Chart height in pixels |

See the [Storybook](https://openbridge-jip-storybook.web.app/?path=/docs/bars-and-graphs-line-graph--docs) for interactive examples of all chart types.

---

## Custom Chart.js Plots

For plots that need to be tailored for a specific application, you can use Chart.js directly with OpenBridge theming. Below is an example of a custom chart using Chart.js, demonstrated in the [vue demo app](https://openbridge-jip-demo.web.app/graph) ([source code](../packages/vue-demo/src/views/GraphDemo.vue)).

First define a html node to use for the plot:

```html
<canvas id="plot"></canvas>
```

Get this in html

```javascript
const ctx = document.getElementById("myChart");
```

We can then get the colors used in the graph.

```javascript
function getCssVariableValue(variable, ctx) {
  const value = getComputedStyle(ctx).getPropertyValue(variable).trim();
  if (!value) {
    throw new Error(`Could not find css variable ${variable}`);
  }
  return value;
}

const redStroke = getCssVariableValue("--base-red-400", ctx);
const greenStroke = getCssVariableValue("--base-green-400", ctx);
const elementNeutralColor = getCssVariableValue("--element-neutral-color", ctx);
const instrumentFrameTertiary = getCssVariableValue(
  "--instrument-frame-tertiary-color",
  ctx
);
const instrumentTickMarkTertiary = getCssVariableValue(
  "--instrument-tick-mark-tertiary-color",
  ctx
);
const instrumentEnhancedSecondary = getCssVariableValue(
  "--instrument-enhanced-secondary-color"
);
```

Add opacity to the fill colors

```javascript
function addOpacityToRgb(color: string, opacity: number): string {
  const [r, g, b] = color
    .slice(4, -1)
    .split(',')
    .map((c) => parseInt(c.trim()))
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
const opacity = 0.3
const positiveFill = addOpacityToRgb(positiveStroke, opacity)
const negativeFill = addOpacityToRgb(negativeStroke, opacity)

```

Set default font values:

```javascript
ChartJS.defaults.font.size = parseInt(
  getCssVariableValue("--global-typography-label-font-size").split("px")[0]
);
// Use 'Open Sans' as the fallback font
ChartJS.defaults.font.family =
  getCssVariableValue("--font-family-main") + ", 'Open Sans', sans-serif";
ChartJS.defaults.font.weight = parseInt(
  getCssVariableValue("--global-typography-label-font-weight")
);
```

## Data series

Then we can make the data series:

```javascript
const power = [
      // Draw the power line
      {
        label: 'Power',
        data: [{x: 0,y: 51},{x: 5,y: 70},{x: 10,y: 30},{x: 15,y: 63},{x: 20,y: 63}],
        showLine: true, // Show the line between the points
        borderWidth: 2, // Line width
        pointRadius: 0, // Hide the points
        pointHoverRadius: 0, // Hide the points on hover
        stepped: true, // Use a stepped line
        // Make a fill between the target values and the data
        fill: {
          above: positiveFill,
          below: negativeFill,
          target: {
            value: target
          }
        },
        // Make the line color change based on the y value
        gradient: {
          borderColor: {
            axis: 'y',
            colors: {
              '0': negativeStroke, // Green for values between 0 and 50
              [target]: negativeStroke,
              [target + 0.0001]: positiveStroke, // Red for values between 50.0001 and 100
              '100': positiveStroke
            }
          }
        }
      }
```

### Advice line

In this case we need advice lines, note that `Number.NaN` makes the line invisible:

```javascript
const adviceLines = {
  data: [
    { x: 5, y: 5 },
    { x: 10, y: 5 },
    { x: 10, y: Number.NaN },
    { x: 15, y: Number.NaN },
    { x: 15, y: 5 },
    { x: 20, y: 5 },
  ],
  showLine: true,
  borderColor: instrumentEnhancedSecondary,
  borderWidth: 8,
  borderCapStyle: "round", // Make the line ends round
  pointRadius: 0,
  stepped: true,
};
```

## Chartjs options

In the options we set:

```javascript
const options = {
  responsive: true, // Enable responsiveness (redraw on window resize)
  animation: false, // Disable animations
  plugins: {
    legend: {
      display: false, // Disable the legend for this case
    },
    annotation: {
      annotations: {
        // Make a horizontal line at y = target denoting the target value
        line1: {
          type: "line",
          yMin: target,
          yMax: target,
          borderColor: instrumentTickMarkTertiary,
          borderWidth: 1,
          borderDash: [5, 5],
        },
      },
    },
  },
  scales: {
    y: {
      min: 0, // Min y value
      max: 100, // Max y value
      ticks: {
        stepSize: 50, // Step size for the y axis
        color: elementNeutralColor, // Font color for the y axis
      },
      border: {
        display: false, // Disable the border of the y axis
      },
      grid: {
        color: instrumentFrameTertiary,
      },
      position: "right", // Position the y axis on the right side
      beginAtZero: true, // Start the y axis at 0
    },
    // Similarly for the x axis
    x: {
      ticks: {
        stepSize: 5,
        color: elementNeutralColor,
      },
      border: {
        color: instrumentFrameTertiary,
      },
      grid: {
        display: false, // Disable horizontal grid lines
      },
      type: "linear",
    },
  },
};
```

We can then create the plot

```javascript
const config = {
  type: "scatter",
  data: [power, adviceLines],
  options: options,
};
chart = new Chart(ctx, config);
```

With vue-chartjs this becomes:

```html
<Scatter :options="options" :data="data" />
```

Or react-chartjs-2:

```html
<Scatter options="{options}" data="{data}" />
```

## Palette switch

We need to ensure that the plot is redrawn on palette switch.
The detection of palette switch can be done in many ways.
In Vue, a Pinia store can be used to store the palette state, then a watcher can be used to detect switch of the palette variable.
For React, the context API can be used to store the palette state and the `useEffect` hook for redrawing the chart.

To redraw the chart use the `update` function.

```javascript
chart.data = [power, adviceLines];
chart.options = config.options;
chart.update();
```

When using vue-chartjs or react-chartjs-2 it is sufficient to update the dataseries and options object for the graph to be redrawn.
