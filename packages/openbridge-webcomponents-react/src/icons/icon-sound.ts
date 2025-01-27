
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiSound as ObiSoundElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-sound.js';
 
 
 

 
 export const ObiSound = createComponent({
   react: React,
   tagName: 'obi-sound',
   elementClass: ObiSoundElement,
   events: {
     
   }
  });
 
 