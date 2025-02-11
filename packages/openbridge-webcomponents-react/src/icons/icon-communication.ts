
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiCommunication as ObiCommunicationElement} from '@Ocean-Industries-Concept-Lab/openbridge-webcomponents/dist/icons/icon-communication.js';
 
 
 

 
 export const ObiCommunication = createComponent({
   react: React,
   tagName: 'obi-communication',
   elementClass: ObiCommunicationElement,
   events: {
     
   }
  });
 
 