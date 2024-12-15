
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiPiezoelectricCrystal as ObiPiezoelectricCrystalElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-piezoelectric-crystal.js';
 
 
 

 
 export const ObiPiezoelectricCrystal = createComponent({
   react: React,
   tagName: 'obi-piezoelectric-crystal',
   elementClass: ObiPiezoelectricCrystalElement,
   events: {
     
   }
  });
 
 