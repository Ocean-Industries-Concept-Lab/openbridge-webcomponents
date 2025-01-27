
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiMonitoring as ObiMonitoringElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-monitoring.js';
 
 
 

 
 export const ObiMonitoring = createComponent({
   react: React,
   tagName: 'obi-monitoring',
   elementClass: ObiMonitoringElement,
   events: {
     
   }
  });
 
 