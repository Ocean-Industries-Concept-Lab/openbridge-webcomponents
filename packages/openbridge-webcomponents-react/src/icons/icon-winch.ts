
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiWinch as ObiWinchElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-winch.js';
 
 
 

 
 export const ObiWinch = createComponent({
   react: React,
   tagName: 'obi-winch',
   elementClass: ObiWinchElement,
   events: {
     
   }
  });
 
 