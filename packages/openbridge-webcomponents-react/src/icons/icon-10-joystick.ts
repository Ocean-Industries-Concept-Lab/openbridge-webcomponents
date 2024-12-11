
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi10Joystick as Obi10JoystickElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-joystick.js';





export const Obi10Joystick = createComponent({
  react: React,
  tagName: 'obi-joystick',
  elementClass: Obi10JoystickElement,
  events: {

  }
});

