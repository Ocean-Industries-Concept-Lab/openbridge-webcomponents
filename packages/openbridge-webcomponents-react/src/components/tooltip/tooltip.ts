
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcTooltip as ObcTooltipElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/tooltip/tooltip.js';
 
 
 

 
 export const ObcTooltip = createComponent({
   react: React,
   tagName: 'obc-tooltip',
   elementClass: ObcTooltipElement,
   events: {
     
   }
  });
 
 