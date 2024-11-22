
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcWatchFlat as ObcWatchFlatElement} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/watch-flat/watch-flat.js';
 
 
 

 
 export const ObcWatchFlat = createComponent({
   react: React,
   tagName: 'obc-watch-flat',
   elementClass: ObcWatchFlatElement,
   events: {
     
   }
  });
 
 