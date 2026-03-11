# Implementation guidelines

The project is divided into three main parts:

1. [openbridge-webcomponents](packages/openbridge-webcomponents/README.md) — the core Lit web component library

   This package contains the implementation of the web components.
   The components are implemented through the use of the [LitElement](https://lit-element.polymer-project.org/) library.

   For each component, there is a corresponding folder in the `packages/openbridge-webcomponents/src/components` directory.
   The components are implemented in the `*.ts` files and the corresponding `*.css` files, with a `*.stories.ts` file for the storybook.

2. [openbridge-webcomponents-vue](packages/openbridge-webcomponents-vue/README.md) / [openbridge-webcomponents-react](packages/openbridge-webcomponents-react/README.md) — auto-generated framework wrappers

   Vue, React, Angular, and Svelte wrappers are auto-generated from the web components:

   ```bash
   npm run build:wrappers
   ```

   ⚠️ **Warning:** Do not edit the generated wrapper packages directly.

3. [vue-demo](packages/vue-demo/README.md) / [react-demo](packages/react-demo/README.md) — demo applications

## 📚 Storybook stories

Each component's `*.stories.ts` file should:

- Use `tags: ['autodocs', '6.0']` for documented OpenBridge 6.0 components
- Use `tags: ['alpha']` for components still in development
- Use `tags: ['!snapshot']` to exclude a story from visual snapshot testing
- Export a `Default` story and additional stories for key states and variants

## 🧪 Testing

Visual snapshot tests are run via [Vitest](https://vitest.dev/) + [storybook-addon-vis](https://github.com/nickelspy/storybook-addon-vis) + Playwright:

```bash
# Run all snapshot tests
npm run test-storybook

# Update snapshots interactively (press 'u' in Vitest terminal)
# Or replace baselines wholesale:
npm run update-snapshots
```

Snapshot baselines are stored in `__vis__/linux/__baselines__/` (and `__vis__/darwin/__baselines__/` for macOS).

## 🎨 PostCSS

The css files are post-processed by [PostCSS](https://postcss.org/).
There is one global css file for the palettes, `variables.css`, which contains the color palettes for the components.
All other css code should be kept in the `*.css` files in the component folders.

The css files uses multiple mixins.

### Mixin: @mixin style style=flat visibleWrapperClass=.visible-wrapper

The `style` mixin is used to style the component. It takes two arguments:

- `style`: The style of the component. It can be `normal`, `flat`, `raised`, `amplified`, `indent`, or `selected`.
- `visibleWrapperClass`: [Optional argument] The class of the visible wrapper. Place the mixin in a container for the touch area, and place an element with the chosen class inside the container.

#### Example for a large button with the `flat` style:

```css
.large-button {
  @mixin style style=flat;
}
```

```html
<div class="large-button"></div>
```

#### Example for a small button with the `raised` style and a larger touch area:

```css
.small-button {
  width: 48px;
  height: 48px;
  @mixin style style=raised visibleWrapperClass=.visible-wrapper;
}
.visible-wrapper {
  width: 10px;
  height: 10px;
}
```

```html
<div class="small-button">
  <div class="visible-wrapper"></div>
</div>
```

This will create a touch area of 48x48 pixels, and a visible area of 10x10 pixels with the raised style.

### Text style mixins

There are multiple mixins for styling text:

- `@mixin font-body-active`
- `@mixin font-body`
- `@mixin font-button`
- `@mixin font-label-active`
- `@mixin font-label`
- `@mixin font-overline`

## 🎴 Icons

The icons are exported to webcomponents in the `packages/openbridge-webcomponents/src/icons` directory.
They are exported from figma by running: `npm run download:icons`.

## 📄 Create a new component

To create a new component, use the `new:component` script:

```bash
npm run new:component
```

This will create the needed files, using the default template.

## 👶 Naming Conventions

### Boolean properties

Boolean properties and parameters must use **positive** (affirmative) names so that the default value is `false`:

- `showLabels` instead of ~~`hideLabels`~~
- `autoAtSetpoint` instead of ~~`disableAutoAtSetpoint`~~
- `hasBar` instead of ~~`hideBar`~~

This avoids double-negation confusion (e.g. `if (!disableFoo)`) and aligns with the Lit/HTML convention where an absent boolean attribute means `false`.

Booleans that default to `true` must use `attribute: false` to remove the HTML attribute and only allow the JavaScript property:

```ts
@property({type: Boolean, attribute: false}) autoAtSetpoint = true;
```

Framework wrappers (React, Vue, etc.) always set values via properties, so removing the attribute has no effect on wrapper consumers.

See [AGENTS.md § 2](AGENTS.md#2-coding-standards) for the full rule and examples.

## 🧭 SVG based components

Instrument components are based on SVG.
Typically they are implemented by copying the SVG code from Figma and pasting it into the component file.
Note that these modifications should be done:

- Change the colors of the svg with css variables such as `fill: var(--element-active-color);`
- Make stroke non-scaling by adding `vector-effect="non-scaling-stroke"` to the svg tag.

The component file is also more readable if the SVG is splitted up into smaler elements with its own javascript variables.
Then later compiled together.
