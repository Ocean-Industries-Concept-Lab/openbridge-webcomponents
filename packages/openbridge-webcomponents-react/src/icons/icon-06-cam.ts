
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi06Cam as Obi06CamElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-cam.js';





export const Obi06Cam = createComponent({
  react: React,
  tagName: 'obi-cam',
  elementClass: Obi06CamElement,
  events: {

  }
});

