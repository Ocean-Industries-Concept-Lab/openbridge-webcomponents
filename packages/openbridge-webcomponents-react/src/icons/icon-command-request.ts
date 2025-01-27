
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiCommandRequest as ObiCommandRequestElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-command-request.js';
 
 
 

 
 export const ObiCommandRequest = createComponent({
   react: React,
   tagName: 'obi-command-request',
   elementClass: ObiCommandRequestElement,
   events: {
     
   }
  });
 
 