
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi14Alarm as Obi14AlarmElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-alarm.js';





export const Obi14Alarm = createComponent({
  react: React,
  tagName: 'obi-alarm',
  elementClass: Obi14AlarmElement,
  events: {

  }
});

