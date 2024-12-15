
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiCoffee as ObiCoffeeElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-coffee.js';
 
 
 

 
 export const ObiCoffee = createComponent({
   react: React,
   tagName: 'obi-coffee',
   elementClass: ObiCoffeeElement,
   events: {
     
   }
  });
 
 