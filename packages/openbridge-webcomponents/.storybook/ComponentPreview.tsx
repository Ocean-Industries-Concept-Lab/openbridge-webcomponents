import { useOf, DocsContext, Story } from '@storybook/addon-docs/blocks';
import React, { useContext } from 'react';
 
/**
 * A block that displays the story name or title from the of prop
 * - if a story reference is passed, it renders the story name
 * - if a meta reference is passed, it renders the stories' title
 * - if nothing is passed, it defaults to the primary story
 */
export const ComponentPreview = (props: { of?: string }) => {
    const { of } = props;
    if ('of' in props && of === undefined) {
      throw new Error('Unexpected `of={undefined}`, did you mistype a CSF file reference?');
    }
  
    const { csfFile } = useOf(of || 'meta', ['meta']);
    const context = useContext(DocsContext);
  
    const primaryStory = context.componentStoriesFromCSFFile(csfFile)[0];
  
    return primaryStory ? (
        <div style={{ padding: '24px', backgroundColor: 'var(--container-section-color)', width: '100%', borderRadius: '2px'}}>
            <Story of={primaryStory.moduleExport} />
        </div>
    ) : null;
};