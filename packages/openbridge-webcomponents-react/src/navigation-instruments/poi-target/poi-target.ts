
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcPoiTarget as ObcPoiTargetElement} from '@Ocean-Industries-Concept-Lab/openbridge-webcomponents/dist/navigation-instruments/poi-target/poi-target.js';
 
 
 

 
 export const ObcPoiTarget = createComponent({
   react: React,
   tagName: 'obc-poi-target',
   elementClass: ObcPoiTargetElement,
   events: {
     
   }
  });
 
 