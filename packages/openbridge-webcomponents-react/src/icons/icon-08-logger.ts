
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi08Logger as Obi08LoggerElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-logger.js';





export const Obi08Logger = createComponent({
  react: React,
  tagName: 'obi-logger',
  elementClass: Obi08LoggerElement,
  events: {

  }
});

