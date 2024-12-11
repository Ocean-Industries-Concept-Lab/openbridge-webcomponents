
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi19Weather as Obi19WeatherElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-weather.js';





export const Obi19Weather = createComponent({
  react: React,
  tagName: 'obi-weather',
  elementClass: Obi19WeatherElement,
  events: {

  }
});

