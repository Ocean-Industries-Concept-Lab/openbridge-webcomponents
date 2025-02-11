
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcMainEngine as ObcMainEngineElement} from '@Ocean-Industries-Concept-Lab/openbridge-webcomponents/dist/navigation-instruments/main-engine/main-engine.js';
 
 
 

 
 export const ObcMainEngine = createComponent({
   react: React,
   tagName: 'obc-main-engine',
   elementClass: ObcMainEngineElement,
   events: {
     
   }
  });
 
 