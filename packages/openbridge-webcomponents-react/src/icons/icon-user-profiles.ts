
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiUserProfiles as ObiUserProfilesElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-user-profiles.js';
 
 
 

 
 export const ObiUserProfiles = createComponent({
   react: React,
   tagName: 'obi-user-profiles',
   elementClass: ObiUserProfilesElement,
   events: {
     
   }
  });
 
 