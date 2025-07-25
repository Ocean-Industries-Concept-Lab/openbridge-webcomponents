import React from 'react';
import { Meta, Title, Primary, Controls, Stories, Description, Subtitle } from '@storybook/addon-docs/blocks';
import { ComponentPreview } from './ComponentPreview.js';

export const PreviewTemplate: React.FC = () => {
  return (
    <>
      <Meta />
      <Title />
      <ComponentPreview of="meta" />
      <Subtitle />
      <Description />
      <Primary />
      <Controls />
      <Stories />
    </>
  );
};

export default PreviewTemplate; 