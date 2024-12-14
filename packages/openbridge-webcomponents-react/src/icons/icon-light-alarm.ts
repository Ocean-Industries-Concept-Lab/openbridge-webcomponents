
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiLightAlarm as ObiLightAlarmElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-light-alarm.js';
 
 
 

 
 export const ObiLightAlarm = createComponent({
   react: React,
   tagName: 'obi-light-alarm',
   elementClass: ObiLightAlarmElement,
   events: {
     
   }
  });
 
 