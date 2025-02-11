
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcInstrumentField as ObcInstrumentFieldElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/instrument-field/instrument-field.js';
 
 
 

 
 export const ObcInstrumentField = createComponent({
   react: React,
   tagName: 'obc-instrument-field',
   elementClass: ObcInstrumentFieldElement,
   events: {
     
   }
  });
 
 