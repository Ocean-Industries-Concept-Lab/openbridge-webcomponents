
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiSpeaker as ObiSpeakerElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-speaker.js';
 
 
 

 
 export const ObiSpeaker = createComponent({
   react: React,
   tagName: 'obi-speaker',
   elementClass: ObiSpeakerElement,
   events: {
     
   }
  });
 
 