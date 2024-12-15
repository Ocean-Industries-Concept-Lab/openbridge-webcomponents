
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi08Tank as Obi08TankElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-tank.js';





export const Obi08Tank = createComponent({
  react: React,
  tagName: 'obi-tank',
  elementClass: Obi08TankElement,
  events: {

  }
});

