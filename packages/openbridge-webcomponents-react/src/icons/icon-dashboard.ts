
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiDashboard as ObiDashboardElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-dashboard.js';
 
 
 

 
 export const ObiDashboard = createComponent({
   react: React,
   tagName: 'obi-dashboard',
   elementClass: ObiDashboardElement,
   events: {
     
   }
  });
 
 