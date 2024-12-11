
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi14Message as Obi14MessageElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-message.js';





export const Obi14Message = createComponent({
  react: React,
  tagName: 'obi-message',
  elementClass: Obi14MessageElement,
  events: {

  }
});

