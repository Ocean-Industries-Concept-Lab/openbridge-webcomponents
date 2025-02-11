
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiVolume as ObiVolumeElement} from '@Ocean-Industries-Concept-Lab/openbridge-webcomponents/dist/icons/icon-volume.js';
 
 
 

 
 export const ObiVolume = createComponent({
   react: React,
   tagName: 'obi-volume',
   elementClass: ObiVolumeElement,
   events: {
     
   }
  });
 
 