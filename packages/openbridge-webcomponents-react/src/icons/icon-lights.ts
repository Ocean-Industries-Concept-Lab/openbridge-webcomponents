
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiLights as ObiLightsElement} from '@Ocean-Industries-Concept-Lab/openbridge-webcomponents/dist/icons/icon-lights.js';
 
 
 

 
 export const ObiLights = createComponent({
   react: React,
   tagName: 'obi-lights',
   elementClass: ObiLightsElement,
   events: {
     
   }
  });
 
 