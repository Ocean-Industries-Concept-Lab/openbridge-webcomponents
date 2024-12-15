
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiPlaceholder as ObiPlaceholderElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-placeholder.js';
 
 
 

 
 export const ObiPlaceholder = createComponent({
   react: React,
   tagName: 'obi-placeholder',
   elementClass: ObiPlaceholderElement,
   events: {
     
   }
  });
 
 