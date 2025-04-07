
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcAlertMenu as ObcAlertMenuElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu/alert-menu.js';
 import {ObcAckAllVisibleClickEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu/alert-menu.js';
 export type {ObcAckAllVisibleClickEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu/alert-menu.js';
 

 
 export const ObcAlertMenu = createComponent({
   react: React,
   tagName: 'obc-alert-menu',
   elementClass: ObcAlertMenuElement,
   events: {
     
     onAckAllVisibleClick: 'ack-all-visible-click' as EventName<ObcAckAllVisibleClickEvent>,
     onAlertListClick: 'alert-list-click' as EventName<CustomEvent>,
     onSilenceClick: 'silence-click' as EventName<CustomEvent>,
     onGoToAlertListClick: 'go-to-alert-list-click' as EventName<CustomEvent>,
   }
  });
 
 