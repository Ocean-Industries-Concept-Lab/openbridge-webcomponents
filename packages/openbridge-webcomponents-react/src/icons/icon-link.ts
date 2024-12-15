
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiLink as ObiLinkElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-link.js';
 
 
 

 
 export const ObiLink = createComponent({
   react: React,
   tagName: 'obi-link',
   elementClass: ObiLinkElement,
   events: {
     
   }
  });
 
 