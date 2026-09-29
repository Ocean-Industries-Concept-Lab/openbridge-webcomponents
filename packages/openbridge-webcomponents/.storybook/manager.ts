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

  // Lifecycle badges. These mirror the class-level JSDoc tag on the component
  // (@beta / @experimental / @deprecated) and are maintained by the
  // `openbridge/story-lifecycle-tags` ESLint rule — see AGENTS.md § 3.
  // `@stable` deliberately has no badge, so a badge always means "caveat here".
  tagBadges: [
    {
      tags: 'beta',
      badge: {
        text: 'Beta',
        style: {
          backgroundColor: 'rgb(66, 113, 179)',
          color: '#fff',
        },
        tooltip: 'Feature-complete, but the API may still change.',
      },
      display: {
        sidebar: ['component'],
        toolbar: true,
      },
    },
    {
      tags: 'experimental',
      badge: {
        text: 'Experimental',
        style: {
          backgroundColor: 'rgb(255, 219, 66)',
          color: '#000',
        },
        tooltip: 'Early stage — the API is likely to change.',
      },
      display: {
        sidebar: ['component'],
        toolbar: true,
      },
    },
    {
      tags: 'deprecated',
      badge: {
        text: 'Deprecated',
        style: {
          backgroundColor: 'rgb(227, 0, 25)',
          color: '#fff',
        },
        tooltip: 'Slated for removal. Do not use in new work.',
      },
      display: {
        sidebar: ['component'],
        toolbar: true,
      },
    },
  ],
});
