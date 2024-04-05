import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcVerticalPipe } from './vertical-pipe';
import './vertical-pipe/vertical-pipe';
import './horizontal-pipe/horizontal-pipe';
import './corner-pipe/corner-pipe';
import { html } from 'lit';

const meta: Meta<typeof ObcVerticalPipe> = {
  title: 'Pipe/Example',
  tags: ['autodocs'],

} satisfies Meta<ObcVerticalPipe>;

export default meta;
type Story = StoryObj<ObcVerticalPipe>;


export const Simple: Story = {
  render: () => {
    return html`
      <style>
        .canvas {
          position: relative;
          width: 400px;
          height: 400px;
        }

        #pipe1 {
          position: absolute;
          top: calc(24px * 1);
          left: calc(24px * 0);
        }

        #corner-1-2 {
          position: absolute;
          top: calc(24px * 0);
          left: calc(24px * 0);
        }

        #pipe2 {
          position: absolute;
          top: calc(24px * 0);
          left: calc(24px * 1);
        }
        #corner-2-3 {
          position: absolute;
          top: calc(24px * 0);
          left: calc(24px * 6);
        }

        #pipe3 {
          position: absolute;
          top: calc(24px * 1);
          left: calc(24px * 6);
        }
      </style>
      <div class="canvas">
        <obc-vertical-pipe length="5" id="pipe1"></obc-vertical-pipe>
        <obc-corner-pipe direction="bottom-right" id="corner-1-2"></obc-corner-pipe>
        <obc-horizontal-pipe length="5" id="pipe2"></obc-horizontal-pipe>
        <obc-corner-pipe direction="bottom-left" id="corner-2-3"></obc-corner-pipe>
        <obc-vertical-pipe length="2" id="pipe3"></obc-vertical-pipe>
        
        
      </div>
      `
  }
}