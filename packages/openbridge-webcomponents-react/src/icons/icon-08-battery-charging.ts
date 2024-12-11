
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi08BatteryCharging as Obi08BatteryChargingElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-battery-charging.js';





export const Obi08BatteryCharging = createComponent({
  react: React,
  tagName: 'obi-battery-charging',
  elementClass: Obi08BatteryChargingElement,
  events: {

  }
});

