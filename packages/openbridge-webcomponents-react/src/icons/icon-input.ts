
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiInput as ObiInputElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-input.js';
 
 
 

 
 export const ObiInput = createComponent({
   react: React,
   tagName: 'obi-input',
   elementClass: ObiInputElement,
   events: {
     
   }
  });
 
 