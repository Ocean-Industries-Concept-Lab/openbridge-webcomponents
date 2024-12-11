
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi19Temperature as Obi19TemperatureElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-temperature.js';





export const Obi19Temperature = createComponent({
  react: React,
  tagName: 'obi-temperature',
  elementClass: Obi19TemperatureElement,
  events: {

  }
});

