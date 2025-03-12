
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcBrillianceMenu as ObcBrillianceMenuElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/brilliance-menu/brilliance-menu.js';
 import {ObcPalette} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/brilliance-menu/brilliance-menu.js';
 export type {ObcPalette} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/brilliance-menu/brilliance-menu.js';
 

 
 export const ObcBrillianceMenu = createComponent({
   react: React,
   tagName: 'obc-brilliance-menu',
   elementClass: ObcBrillianceMenuElement,
   events: {
     
     onPaletteChanged: 'palette-changed' as EventName<CustomEvent<{value: ObcPalette}>>,
     onBrightnessChanged: 'brightness-changed' as EventName<CustomEvent<{value: number}>>,
   }
  });
 
 