import {addons} from '@storybook/manager-api';
import obTheme from './openbridgeTheme';

addons.setConfig({
  theme: obTheme,
  tagBadges: [
    // Add an entry that matches 'frog' and displays a cool badge in the sidebar only
    {
      tags: '6.0',
      badge: {
        text: '6.0 Beta',
        bgColor: '#0070d6',
        fgColor: '#fff',
        tooltip: 'OpenBridge 6.0 Beta',
      },
      display: {
        sidebar: ['component'],
        toolbar: true,
      },
    },
  ],
});
