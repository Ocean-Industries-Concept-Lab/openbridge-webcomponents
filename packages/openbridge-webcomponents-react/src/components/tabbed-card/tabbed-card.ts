
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcTabbedCard as ObcTabbedCardElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/tabbed-card/tabbed-card.js';
 import {ObcTabbedCardChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/tabbed-card/tabbed-card.js';
 export type {ObcTabbedCardChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/tabbed-card/tabbed-card.js';
 

 
 export const ObcTabbedCard = createComponent({
   react: React,
   tagName: 'obc-tabbed-card',
   elementClass: ObcTabbedCardElement,
   events: {
     
     onTabChange: 'tab-change' as EventName<ObcTabbedCardChangeEvent>,
   }
  });
 
 