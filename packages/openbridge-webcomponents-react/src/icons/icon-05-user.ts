
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi05User as Obi05UserElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-user.js';





export const Obi05User = createComponent({
  react: React,
  tagName: 'obi-user',
  elementClass: Obi05UserElement,
  events: {

  }
});

