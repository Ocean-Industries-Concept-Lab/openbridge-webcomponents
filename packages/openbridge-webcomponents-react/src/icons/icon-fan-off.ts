
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiFanOff as ObiFanOffElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-fan-off.js';
 
 
 

 
 export const ObiFanOff = createComponent({
   react: React,
   tagName: 'obi-fan-off',
   elementClass: ObiFanOffElement,
   events: {
     
   }
  });
 
 