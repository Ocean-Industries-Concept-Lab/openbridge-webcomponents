import fs from 'fs';
import path from 'path';

import {question, select, multiselect} from '@topcli/prompts';

const name = await question(
  'Component name (without obc prefix, and UpperCamelCase) ?',
  {
    validators: [
      {
        validate: (value) => /^[A-Z][a-zA-Z0-9]+$/.test(value),
        message: 'Component name must be UpperCamelCase',
      },
      {
        message: 'Component name is required',
        validate: (value) => !!value,
      },
    ],
  }
);
const componentType = await select('Type of component', {
  choices: [
    'ui (input, label, tables)',
    'instrument (compass, azimuth)',
    'indicator (bearing, speed, rot)',
    'page',
    'ar',
    'automation',
    'integration system',
    'building-block',
    'bars-graphs (line, area, donut, pie)',
  ],
});
const files = await multiselect('Create files', {
  choices: ['css', 'storybook'],
  preSelectedChoices: ['css', 'storybook'],
});

// Convert name to kebab-case
const componentName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

let parentDir: string;
if (componentType === 'ui (input, label, tables)') {
  parentDir = 'components';
} else if (componentType === 'indicator (bearing, speed, rot)') {
  parentDir = 'navigation-instruments';
} else if (componentType === 'instrument (compass, azimuth)') {
  parentDir = 'navigation-instruments';
} else if (componentType === 'ar') {
  parentDir = 'ar';
} else if (componentType === 'automation') {
  parentDir = 'automation';
} else if (componentType === 'page') {
  parentDir = 'pages';
} else if (componentType === 'building-block') {
  parentDir = 'building-blocks';
} else if (componentType === 'integration system') {
  parentDir = 'integration-systems';
} else if (componentType === 'bars-graphs (line, area, donut, pie)') {
  parentDir = 'bars-graphs';
} else {
  throw new Error('Invalid component type');
}
const dir = path.join('src', parentDir, componentName);
// Create directory
fs.mkdirSync(dir, {recursive: true});

// Create files
// Create lit file
const hasCss = files.includes('css');
const litFile = path.join(dir, `${componentName}.ts`);
const content = `import {LitElement, html${hasCss ? `, unsafeCSS` : ``}} from 'lit';
import {customElement} from '../../decorator.js';
${hasCss ? `import componentStyle from './${componentName}.css?inline';` : ''}

@customElement('obc-${componentName}')
export class Obc${name} extends LitElement {

  override render() {
    return html\`
      <div class="wrapper">
      </div>
    \`;
  }

${hasCss ? `  static override styles = unsafeCSS(componentStyle);` : ''}
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-${componentName}': Obc${name};
  }
}
`;
fs.writeFileSync(litFile, content);

// Create css file
if (files.includes('css')) {
  const cssFile = path.join(dir, `${componentName}.css`);
  const content = ``;
  fs.writeFileSync(cssFile, content);
}

// Create storybook file
if (files.includes('storybook')) {
  let storybookGroup = '';
  if (componentType === 'ar') {
    storybookGroup = 'AR';
  } else if (componentType === 'automation') {
    storybookGroup = 'Automation';
  } else if (componentType === 'building-block') {
    storybookGroup = 'Building Blocks';
  } else if (componentType === 'page') {
    storybookGroup = 'Pages';
  } else if (componentType === 'integration system') {
    storybookGroup = 'Integration Systems';
  } else if (componentType === 'indicator (bearing, speed, rot)') {
    storybookGroup = 'Indicators';
  } else if (componentType === 'instrument (compass, azimuth)') {
    storybookGroup = 'Instruments';
  } else if (componentType === 'bars-graphs (line, area, donut, pie)') {
    storybookGroup = 'Bars and Graphs';
  } else {
    storybookGroup = await question('Storybook group ');
  }
  const storybookTitle = await question('Storybook title ');
  const storybookFile = path.join(dir, `${componentName}.stories.ts`);
  const content = `import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {Obc${name}} from './${componentName}.js';
import './${componentName}.js';

const meta: Meta<typeof Obc${name}> = {
  title: '${storybookGroup}/${storybookTitle}',
  tags: ['autodocs', '6.0'],
  component: 'obc-${componentName}',
  args: {
  },
} satisfies Meta<Obc${name}>;

export default meta;
type Story = StoryObj<Obc${name}>;

export const Primary: Story = {
  args: {
  },
};`;
  fs.writeFileSync(storybookFile, content);
}
