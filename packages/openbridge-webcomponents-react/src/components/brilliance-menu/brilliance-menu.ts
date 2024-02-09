
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcBrillianceMenu as ObcBrillianceMenuElement} from '@tibnor/openbridge-webcomponents/dist/components/brilliance-menu/brilliance-menu.js';
 
 
 

 
 export const ObcBrillianceMenu = createComponent({
   react: React,
   tagName: 'obc-brilliance-menu',
   elementClass: ObcBrillianceMenuElement,
   events: {
     
     onPaletteChanged: 'palette-changed' as EventName<CustomEvent<unknown>>,
     onBrightnessChanged: 'brightness-changed' as EventName<CustomEvent<unknown>>,
   }
  });
 
 