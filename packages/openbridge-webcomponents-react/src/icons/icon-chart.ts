
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiChart as ObiChartElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-chart.js';
 
 
 

 
 export const ObiChart = createComponent({
   react: React,
   tagName: 'obi-chart',
   elementClass: ObiChartElement,
   events: {
     
   }
  });
 
 