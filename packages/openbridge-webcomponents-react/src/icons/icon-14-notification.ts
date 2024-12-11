
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi14Notification as Obi14NotificationElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-notification.js';





export const Obi14Notification = createComponent({
  react: React,
  tagName: 'obi-notification',
  elementClass: Obi14NotificationElement,
  events: {

  }
});

