
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi20SensorGyro as Obi20SensorGyroElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-sensor-gyro.js';





export const Obi20SensorGyro = createComponent({
  react: React,
  tagName: 'obi-sensor-gyro',
  elementClass: Obi20SensorGyroElement,
  events: {

  }
});

