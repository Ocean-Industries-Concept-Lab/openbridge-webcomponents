
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiCommandAvailable as ObiCommandAvailableElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-command-available.js';
 
 
 

 
 export const ObiCommandAvailable = createComponent({
   react: React,
   tagName: 'obi-command-available',
   elementClass: ObiCommandAvailableElement,
   events: {
     
   }
  });
 
 