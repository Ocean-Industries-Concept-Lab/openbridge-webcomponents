
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiLightDeck as ObiLightDeckElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-light-deck.js';
 
 
 

 
 export const ObiLightDeck = createComponent({
   react: React,
   tagName: 'obi-light-deck',
   elementClass: ObiLightDeckElement,
   events: {
     
   }
  });
 
 