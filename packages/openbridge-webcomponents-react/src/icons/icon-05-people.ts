
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi05People as Obi05PeopleElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-people.js';





export const Obi05People = createComponent({
  react: React,
  tagName: 'obi-people',
  elementClass: Obi05PeopleElement,
  events: {

  }
});

