
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiRunning as ObiRunningElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-running.js';
 
 
 

 
 export const ObiRunning = createComponent({
   react: React,
   tagName: 'obi-running',
   elementClass: ObiRunningElement,
   events: {
     
   }
  });
 
 