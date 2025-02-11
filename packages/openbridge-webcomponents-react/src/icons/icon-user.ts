
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiUser as ObiUserElement} from '@Ocean-Industries-Concept-Lab/openbridge-webcomponents/dist/icons/icon-user.js';
 
 
 

 
 export const ObiUser = createComponent({
   react: React,
   tagName: 'obi-user',
   elementClass: ObiUserElement,
   events: {
     
   }
  });
 
 