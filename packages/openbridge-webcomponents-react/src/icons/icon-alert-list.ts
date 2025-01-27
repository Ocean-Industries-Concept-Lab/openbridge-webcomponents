
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiAlertList as ObiAlertListElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-alert-list.js';
 
 
 

 
 export const ObiAlertList = createComponent({
   react: React,
   tagName: 'obi-alert-list',
   elementClass: ObiAlertListElement,
   events: {
     
   }
  });
 
 