
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi03Diagnostic as Obi03DiagnosticElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-diagnostic.js';





export const Obi03Diagnostic = createComponent({
  react: React,
  tagName: 'obi-diagnostic',
  elementClass: Obi03DiagnosticElement,
  events: {

  }
});

