
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcBadge as ObcBadgeElement} from '@oicl/openbridge-webcomponents/dist/components/badge/badge.js';
 
 
 

 
 export const ObcBadge = createComponent({
   react: React,
   tagName: 'obc-badge',
   elementClass: ObcBadgeElement,
   events: {
     
   }
  });
 
 