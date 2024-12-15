
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi08Standby as Obi08StandbyElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-standby.js';





export const Obi08Standby = createComponent({
  react: React,
  tagName: 'obi-standby',
  elementClass: Obi08StandbyElement,
  events: {

  }
});

