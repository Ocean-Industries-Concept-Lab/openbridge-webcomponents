
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi14Alerts as Obi14AlertsElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-alerts.js';





export const Obi14Alerts = createComponent({
  react: React,
  tagName: 'obi-alerts',
  elementClass: Obi14AlertsElement,
  events: {

  }
});

