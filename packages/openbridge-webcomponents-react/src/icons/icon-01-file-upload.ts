
import * as React from 'react';
import { createComponent } from '@lit/react';

import { Obi01FileUpload as Obi01FileUploadElement } from '@oicl/openbridge-webcomponents/dist/icons/icon-file-upload.js';





export const Obi01FileUpload = createComponent({
  react: React,
  tagName: 'obi-file-upload',
  elementClass: Obi01FileUploadElement,
  events: {

  }
});

