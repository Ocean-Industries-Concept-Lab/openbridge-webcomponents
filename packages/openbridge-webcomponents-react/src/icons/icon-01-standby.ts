
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi01Standby as Obi01StandbyElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-standby.js';





export const Obi01Standby = createComponent({
  react: React,
  tagName: 'obi-standby',
  elementClass: Obi01StandbyElement,
  events: {

  }
});

