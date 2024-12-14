
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiEthernetSwitch as ObiEthernetSwitchElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-ethernet-switch.js';
 
 
 

 
 export const ObiEthernetSwitch = createComponent({
   react: React,
   tagName: 'obi-ethernet-switch',
   elementClass: ObiEthernetSwitchElement,
   events: {
     
   }
  });
 
 