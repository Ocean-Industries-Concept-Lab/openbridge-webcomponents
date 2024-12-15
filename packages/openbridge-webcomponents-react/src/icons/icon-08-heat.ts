
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi08Heat as Obi08HeatElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-heat.js';





export const Obi08Heat = createComponent({
  react: React,
  tagName: 'obi-heat',
  elementClass: Obi08HeatElement,
  events: {

  }
});

