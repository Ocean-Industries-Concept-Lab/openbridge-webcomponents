
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiContacts as ObiContactsElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-contacts.js';
 
 
 

 
 export const ObiContacts = createComponent({
   react: React,
   tagName: 'obi-contacts',
   elementClass: ObiContactsElement,
   events: {
     
   }
  });
 
 