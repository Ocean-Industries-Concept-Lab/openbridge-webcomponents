
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi03Monitoring as Obi03MonitoringElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-monitoring.js';





export const Obi03Monitoring = createComponent({
  react: React,
  tagName: 'obi-monitoring',
  elementClass: Obi03MonitoringElement,
  events: {

  }
});

