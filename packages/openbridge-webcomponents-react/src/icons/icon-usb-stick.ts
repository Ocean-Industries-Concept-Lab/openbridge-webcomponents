
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiUsbStick as ObiUsbStickElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-usb-stick.js';
 
 
 

 
 export const ObiUsbStick = createComponent({
   react: React,
   tagName: 'obi-usb-stick',
   elementClass: ObiUsbStickElement,
   events: {
     
   }
  });
 
 