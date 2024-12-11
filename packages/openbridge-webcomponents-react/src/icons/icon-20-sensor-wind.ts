
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi20SensorWind as Obi20SensorWindElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-sensor-wind.js';





export const Obi20SensorWind = createComponent({
  react: React,
  tagName: 'obi-sensor-wind',
  elementClass: Obi20SensorWindElement,
  events: {

  }
});

