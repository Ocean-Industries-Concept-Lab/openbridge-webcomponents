
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcBadge as ObcBadgeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/badge/badge.js';
 
 
 

 
 export const ObcBadge = createComponent({
   react: React,
   tagName: 'obc-badge',
   elementClass: ObcBadgeElement,
   events: {
     
   }
  });
 
 