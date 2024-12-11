
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi01Check as Obi01CheckElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-check.js';





export const Obi01Check = createComponent({
  react: React,
  tagName: 'obi-check',
  elementClass: Obi01CheckElement,
  events: {

  }
});

