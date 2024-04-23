
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcAzimuthThrusterLabeled as ObcAzimuthThrusterLabeledElement} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/azimuth-thruster-labeled/azimuth-thruster-labeled.js';
 
 
 

 
 export const ObcAzimuthThrusterLabeled = createComponent({
   react: React,
   tagName: 'obc-azimuth-thruster-labeled',
   elementClass: ObcAzimuthThrusterLabeledElement,
   events: {
     
   }
  });
 
 