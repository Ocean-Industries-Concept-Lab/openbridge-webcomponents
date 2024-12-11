
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi05Server as Obi05ServerElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-server.js';





export const Obi05Server = createComponent({
  react: React,
  tagName: 'obi-server',
  elementClass: Obi05ServerElement,
  events: {

  }
});

