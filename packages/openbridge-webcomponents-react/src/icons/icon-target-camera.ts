
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiTargetCamera as ObiTargetCameraElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-target-camera.js';
 
 
 

 
 export const ObiTargetCamera = createComponent({
   react: React,
   tagName: 'obi-target-camera',
   elementClass: ObiTargetCameraElement,
   events: {
     
   }
  });
 
 