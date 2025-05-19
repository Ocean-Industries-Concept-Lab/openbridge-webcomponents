
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcCard as ObcCardElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/card/card.js';
 
 
 

 
 export const ObcCard = createComponent({
   react: React,
   tagName: 'obc-card',
   elementClass: ObcCardElement,
   events: {
     
   }
  });
 
 