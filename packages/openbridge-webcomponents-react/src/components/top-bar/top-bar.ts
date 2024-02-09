
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcTopBar as ObcTopBarElement} from '@tibnor/openbridge-webcomponents/dist/components/top-bar/top-bar.js';
 
 
 

 
 export const ObcTopBar = createComponent({
   react: React,
   tagName: 'obc-top-bar',
   elementClass: ObcTopBarElement,
   events: {
     
     onMenuButtonClicked: 'menu-button-clicked' as EventName<CustomEvent<unknown>>,
     onDimmingButtonClicked: 'dimming-button-clicked' as EventName<CustomEvent<unknown>>,
     onAppsButtonClicked: 'apps-button-clicked' as EventName<CustomEvent<unknown>>,
     onLeftMoreButtonClicked: 'left-more-button-clicked' as EventName<CustomEvent<unknown>>,
   }
  });
 
 