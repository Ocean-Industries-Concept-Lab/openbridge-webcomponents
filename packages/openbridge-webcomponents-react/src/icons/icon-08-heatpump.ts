
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi08Heatpump as Obi08HeatpumpElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-heatpump.js';





export const Obi08Heatpump = createComponent({
  react: React,
  tagName: 'obi-heatpump',
  elementClass: Obi08HeatpumpElement,
  events: {

  }
});

