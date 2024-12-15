
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiBluetooth as ObiBluetoothElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-bluetooth.js';
 
 
 

 
 export const ObiBluetooth = createComponent({
   react: React,
   tagName: 'obi-bluetooth',
   elementClass: ObiBluetoothElement,
   events: {
     
   }
  });
 
 