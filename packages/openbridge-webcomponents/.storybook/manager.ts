import {addons} from 'storybook/manager-api';
import {openbridgeDark, openbridgeLight} from './openbridgeTheme.js';

// Detect system color scheme preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  // Use OpenBridge themed variants for both light and dark mode
  theme: prefersDark ? openbridgeDark : openbridgeLight,

  // Put controls panel on the right side
  panelPosition: 'right',
  selectedPanel: 'addon-controls',
  initialActive: 'canvas',

  // Sidebar configuration
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },

  // Tag badges for version indicators
  tagBadges: [
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
