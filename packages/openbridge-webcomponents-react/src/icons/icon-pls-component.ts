
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiPlsComponent as ObiPlsComponentElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-pls-component.js';
 
 
 

 
 export const ObiPlsComponent = createComponent({
   react: React,
   tagName: 'obi-pls-component',
   elementClass: ObiPlsComponentElement,
   events: {
     
   }
  });
 
 