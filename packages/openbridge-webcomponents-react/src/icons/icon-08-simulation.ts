
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi08Simulation as Obi08SimulationElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-simulation.js';





export const Obi08Simulation = createComponent({
  react: React,
  tagName: 'obi-simulation',
  elementClass: Obi08SimulationElement,
  events: {

  }
});

