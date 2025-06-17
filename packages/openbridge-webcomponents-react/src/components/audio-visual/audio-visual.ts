
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcAudioVisual as ObcAudioVisualElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/audio-visual/audio-visual.js';
 
 
 

 
 export const ObcAudioVisual = createComponent({
   react: React,
   tagName: 'obc-audio-visual',
   elementClass: ObcAudioVisualElement,
   events: {
     
   }
  });
 
 