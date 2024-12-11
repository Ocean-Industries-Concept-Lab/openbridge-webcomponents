
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi20USB as Obi20USBElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-usb.js';





export const Obi20USB = createComponent({
  react: React,
  tagName: 'obi-usb',
  elementClass: Obi20USBElement,
  events: {

  }
});

