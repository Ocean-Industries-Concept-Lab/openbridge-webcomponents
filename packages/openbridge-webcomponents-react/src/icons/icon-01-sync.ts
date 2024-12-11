
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi01Sync as Obi01SyncElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-sync.js';





export const Obi01Sync = createComponent({
  react: React,
  tagName: 'obi-sync',
  elementClass: Obi01SyncElement,
  events: {

  }
});

