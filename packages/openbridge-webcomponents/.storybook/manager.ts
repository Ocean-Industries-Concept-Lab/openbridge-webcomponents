import {addons} from 'storybook/manager-api';
import obTheme from './openbridgeTheme.js';

addons.setConfig({
  theme: obTheme,
  tagBadges: [
    // Add an entry that matches 'frog' and displays a cool badge in the sidebar only
    {
      tags: '6.0',
      badge: {
        text: '6.0 Beta',
        style: {
          backgroundColor: '#0070d6',
          color: '#fff',
        },
        tooltip: 'OpenBridge 6.0 Beta',
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
          backgroundColor: 'rgb(254, 148, 19)',
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
