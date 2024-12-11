
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi13Winch as Obi13WinchElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-winch.js';





export const Obi13Winch = createComponent({
  react: React,
  tagName: 'obi-winch',
  elementClass: Obi13WinchElement,
  events: {

  }
});

