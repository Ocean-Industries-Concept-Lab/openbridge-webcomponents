
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcVelocityProjectionPlot as ObcVelocityProjectionPlotElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/velocity-projection-plot/velocity-projection-plot.js';
 
 
 

 
 export const ObcVelocityProjectionPlot = createComponent({
   react: React,
   tagName: 'obc-velocity-projection-plot',
   elementClass: ObcVelocityProjectionPlotElement,
   events: {
     
   }
  });
 
 