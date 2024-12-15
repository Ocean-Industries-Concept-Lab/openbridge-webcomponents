
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiAlerts as ObiAlertsElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-alerts.js';
 
 
 

 
 export const ObiAlerts = createComponent({
   react: React,
   tagName: 'obi-alerts',
   elementClass: ObiAlertsElement,
   events: {
     
   }
  });
 
 