
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcPoiTarget as ObcPoiTargetElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-target/poi-target.js';
 
 
 

 
 export const ObcPoiTarget = createComponent({
   react: React,
   tagName: 'obc-poi-target',
   elementClass: ObcPoiTargetElement,
   events: {
     
   }
  });
 
 