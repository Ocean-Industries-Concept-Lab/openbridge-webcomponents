
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi15Contacts as Obi15ContactsElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-contacts.js';





export const Obi15Contacts = createComponent({
  react: React,
  tagName: 'obi-contacts',
  elementClass: Obi15ContactsElement,
  events: {

  }
});

