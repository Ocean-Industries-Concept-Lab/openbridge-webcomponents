
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi08Cooling as Obi08CoolingElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-cooling.js';





export const Obi08Cooling = createComponent({
  react: React,
  tagName: 'obi-cooling',
  elementClass: Obi08CoolingElement,
  events: {

  }
});

