import {addons} from 'storybook/manager-api';
import obTheme from './openbridgeTheme.js';
import {themes} from 'storybook/theming';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  theme: prefersDark ? obTheme : themes.light,
  // theme: obTheme,
  tagBadges: [
    // Add an entry that matches 'frog' and displays a cool badge in the sidebar only
    {
      tags: '5.0',
      badge: {
        text: '5.0',
        style: {
          backgroundColor: 'rgb(255, 219, 55)',
          color: '#000',
        },
        tooltip: 'OpenBridge 5.0',
      },
      display: {
        sidebar: ['component'],
        toolbar: true,
      },
    },
    {
      tags: 'alpha',
      badge: {
        text: '6.0 Alpha',
        style: {
          backgroundColor: 'rgb(255, 219, 55)',
          color: '#000',
        },
        tooltip: 'Alpha components are still under design and may change.',
      },
      display: {
        sidebar: ['component'],
        toolbar: true,
      },
    },
  ],
});
