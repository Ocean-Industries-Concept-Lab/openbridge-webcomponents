
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiApplications as ObiApplicationsElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-applications.js';
 
 
 

 
 export const ObiApplications = createComponent({
   react: React,
   tagName: 'obi-applications',
   elementClass: ObiApplicationsElement,
   events: {
     
   }
  });
 
 