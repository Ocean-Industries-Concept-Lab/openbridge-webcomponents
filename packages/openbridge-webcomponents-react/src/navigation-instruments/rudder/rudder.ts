
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcRudder as ObcRudderElement} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/rudder/rudder.js';
 
 
 

 
 export const ObcRudder = createComponent({
   react: React,
   tagName: 'obc-rudder',
   elementClass: ObcRudderElement,
   events: {
     
   }
  });
 
 