
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiRecordEvent as ObiRecordEventElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-record-event.js';
 
 
 

 
 export const ObiRecordEvent = createComponent({
   react: React,
   tagName: 'obi-record-event',
   elementClass: ObiRecordEventElement,
   events: {
     
   }
  });
 
 