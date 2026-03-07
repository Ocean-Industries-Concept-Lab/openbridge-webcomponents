# OpenBridge Charts and Graphs

The OpenBridge Web Components library includes a set of ready-to-use chart components for common visualization needs. For highly customized plots, you can also use Chart.js directly with OpenBridge styling. See the Storybook for interactive examples of built-in chart types such as the [Line Graph](https://openbridge-jip-storybook.web.app/?path=/docs/bars-and-graphs-line-graph--docs) and [Donut Chart](https://openbridge-jip-storybook.web.app/?path=/docs/bars-and-graphs-donut-chart--docs).

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
const blueStroke = getCssVariableValue("--base-blue-400", ctx);
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
              '0': negativeStroke, // Blue for values between 0 and 50
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
