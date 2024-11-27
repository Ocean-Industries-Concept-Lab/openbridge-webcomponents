
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcPoiGraphicLine as ObcPoiGraphicLineElement} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/poi-graphic-line/poi-graphic-line.js';
 
 
 

 
 export const ObcPoiGraphicLine = createComponent({
   react: React,
   tagName: 'obc-poi-graphic-line',
   elementClass: ObcPoiGraphicLineElement,
   events: {
     
   }
  });
 
 