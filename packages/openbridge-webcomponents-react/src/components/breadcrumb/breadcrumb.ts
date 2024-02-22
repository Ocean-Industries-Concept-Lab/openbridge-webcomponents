
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcBreadcrumb as ObcBreadcrumbElement} from '@oicl/openbridge-webcomponents/dist/components/breadcrumb/breadcrumb.js';
 
 
 

 
 export const ObcBreadcrumb = createComponent({
   react: React,
   tagName: 'obc-breadcrumb',
   elementClass: ObcBreadcrumbElement,
   events: {
     
   }
  });
 
 