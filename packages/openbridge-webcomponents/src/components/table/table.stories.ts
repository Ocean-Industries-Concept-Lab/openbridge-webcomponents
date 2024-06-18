import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcTable} from './table';
import './table';
import '../../icons/icon-14-alarm-unack';
import '../../icons/icon-16-lock';
import '../button/button';
import {html} from 'lit';

const meta: Meta<typeof ObcTable> = {
  title: 'Tables/Table',
  tags: ['autodocs'],
  component: 'obc-table',
  args: {},
  argTypes: {},
} satisfies Meta<ObcTable>;

export default meta;
type Story = StoryObj<ObcTable>;

export const Primary: Story = {
  render: () =>
    html` <style>
        .alert-status {
          display: flex;
          height: 32px;
          align-items: center;
        }

        .alert-icon {
          margin-right: 32px;
          height: 32px;
          width: 32px;
        }

        .lock-icon {
          display: block;
          height: 24px;
        }

        .wrapper {
          height: 200px;
          overflow-y: scroll;
        }
      </style>
      <div class="wrapper">
        <obc-table>
          <obc-table-header>
            <obc-table-row>
              <obc-table-head-cell>Status</obc-table-head-cell>
              <obc-table-head-cell>Source</obc-table-head-cell>
              <obc-table-head-cell>Cat</obc-table-head-cell>
              <obc-table-head-cell>Cause</obc-table-head-cell>
              <obc-table-head-cell>Details</obc-table-head-cell>
              <obc-table-head-cell>Tag id</obc-table-head-cell>
              <obc-table-head-cell>Updated (UTC)</obc-table-head-cell>
              <obc-table-head-cell>CTRL</obc-table-head-cell>
              <obc-table-head-cell>Acknowledge</obc-table-head-cell>
            </obc-table-row>
          </obc-table-header>
          <obc-table-body>
            <obc-table-row>
              <obc-table-cell>
                <div class="alert-status">
                  <obi-14-alarm-unack
                    usecsscolor
                    class="alert-icon"
                  ></obi-14-alarm-unack>
                  <span>Unacked</span>
                </div>
              </obc-table-cell>
              <obc-table-cell>Source id</obc-table-cell>
              <obc-table-cell>A</obc-table-cell>
              <obc-table-cell>message</obc-table-cell>
              <obc-table-cell>Message</obc-table-cell>
              <obc-table-cell>#000000</obc-table-cell>
              <obc-table-cell>12:00:00 12. feb</obc-table-cell>
              <obc-table-cell>
                <obi-16-lock class="lock-icon"></obi-16-lock>
              </obc-table-cell>
              <obc-table-cell>
                <obc-button fullwidth>ACK</obc-button>
              </obc-table-cell>
            </obc-table-row>
            <obc-table-row>
              <obc-table-cell>
                <div class="alert-status">
                  <obi-14-alarm-unack
                    usecsscolor
                    class="alert-icon"
                  ></obi-14-alarm-unack>
                  <span>Unacked</span>
                </div>
              </obc-table-cell>
              <obc-table-cell>Source id</obc-table-cell>
              <obc-table-cell>A</obc-table-cell>
              <obc-table-cell>message</obc-table-cell>
              <obc-table-cell>Message</obc-table-cell>
              <obc-table-cell>#000000</obc-table-cell>
              <obc-table-cell>12:00:00 12. feb</obc-table-cell>
              <obc-table-cell>
                <obi-16-lock class="lock-icon"></obi-16-lock>
              </obc-table-cell>
              <obc-table-cell>
                <obc-button fullwidth>ACK</obc-button>
              </obc-table-cell>
            </obc-table-row>
            <obc-table-row>
              <obc-table-cell>
                <div class="alert-status">
                  <obi-14-alarm-unack
                    usecsscolor
                    class="alert-icon"
                  ></obi-14-alarm-unack>
                  <span>Unacked</span>
                </div>
              </obc-table-cell>
              <obc-table-cell>Source id</obc-table-cell>
              <obc-table-cell>A</obc-table-cell>
              <obc-table-cell>message</obc-table-cell>
              <obc-table-cell>Message</obc-table-cell>
              <obc-table-cell>#000000</obc-table-cell>
              <obc-table-cell>12:00:00 12. feb</obc-table-cell>
              <obc-table-cell>
                <obi-16-lock class="lock-icon"></obi-16-lock>
              </obc-table-cell>
              <obc-table-cell>
                <obc-button fullwidth>ACK</obc-button>
              </obc-table-cell>
            </obc-table-row>
            <obc-table-row>
              <obc-table-cell>
                <div class="alert-status">
                  <obi-14-alarm-unack
                    usecsscolor
                    class="alert-icon"
                  ></obi-14-alarm-unack>
                  <span>Unacked</span>
                </div>
              </obc-table-cell>
              <obc-table-cell>Source id</obc-table-cell>
              <obc-table-cell>A</obc-table-cell>
              <obc-table-cell>message</obc-table-cell>
              <obc-table-cell>Message</obc-table-cell>
              <obc-table-cell>#000000</obc-table-cell>
              <obc-table-cell>12:00:00 12. feb</obc-table-cell>
              <obc-table-cell>
                <obi-16-lock class="lock-icon"></obi-16-lock>
              </obc-table-cell>
              <obc-table-cell>
                <obc-button fullwidth>ACK</obc-button>
              </obc-table-cell>
            </obc-table-row>
            <obc-table-row>
              <obc-table-cell>
                <div class="alert-status">
                  <obi-14-alarm-unack
                    usecsscolor
                    class="alert-icon"
                  ></obi-14-alarm-unack>
                  <span>Unacked</span>
                </div>
              </obc-table-cell>
              <obc-table-cell>Source id</obc-table-cell>
              <obc-table-cell>A</obc-table-cell>
              <obc-table-cell>message</obc-table-cell>
              <obc-table-cell>Message</obc-table-cell>
              <obc-table-cell>#000000</obc-table-cell>
              <obc-table-cell>12:00:00 12. feb</obc-table-cell>
              <obc-table-cell>
                <obi-16-lock class="lock-icon"></obi-16-lock>
              </obc-table-cell>
              <obc-table-cell>
                <obc-button fullwidth>ACK</obc-button>
              </obc-table-cell>
            </obc-table-row>
            <obc-table-row>
              <obc-table-cell>
                <div class="alert-status">
                  <obi-14-alarm-unack
                    usecsscolor
                    class="alert-icon"
                  ></obi-14-alarm-unack>
                  <span>Unacked</span>
                </div>
              </obc-table-cell>
              <obc-table-cell>Source id</obc-table-cell>
              <obc-table-cell>A</obc-table-cell>
              <obc-table-cell>message</obc-table-cell>
              <obc-table-cell>Message</obc-table-cell>
              <obc-table-cell>#000000</obc-table-cell>
              <obc-table-cell>12:00:00 12. feb</obc-table-cell>
              <obc-table-cell>
                <obi-16-lock class="lock-icon"></obi-16-lock>
              </obc-table-cell>
              <obc-table-cell>
                <obc-button fullwidth>ACK</obc-button>
              </obc-table-cell>
            </obc-table-row>
            <obc-table-row>
              <obc-table-cell>
                <div class="alert-status">
                  <obi-14-alarm-unack
                    usecsscolor
                    class="alert-icon"
                  ></obi-14-alarm-unack>
                  <span>Unacked</span>
                </div>
              </obc-table-cell>
              <obc-table-cell>Source id</obc-table-cell>
              <obc-table-cell>A</obc-table-cell>
              <obc-table-cell>message</obc-table-cell>
              <obc-table-cell>Message</obc-table-cell>
              <obc-table-cell>#000000</obc-table-cell>
              <obc-table-cell>12:00:00 12. feb</obc-table-cell>
              <obc-table-cell>
                <obi-16-lock class="lock-icon"></obi-16-lock>
              </obc-table-cell>
              <obc-table-cell>
                <obc-button fullwidth>ACK</obc-button>
              </obc-table-cell>
            </obc-table-row>
            <obc-table-row>
              <obc-table-cell>
                <div class="alert-status">
                  <obi-14-alarm-unack
                    usecsscolor
                    class="alert-icon"
                  ></obi-14-alarm-unack>
                  <span>Unacked</span>
                </div>
              </obc-table-cell>
              <obc-table-cell>Source id</obc-table-cell>
              <obc-table-cell>A</obc-table-cell>
              <obc-table-cell>message</obc-table-cell>
              <obc-table-cell>Message</obc-table-cell>
              <obc-table-cell>#000000</obc-table-cell>
              <obc-table-cell>12:00:00 12. feb</obc-table-cell>
              <obc-table-cell>
                <obi-16-lock class="lock-icon"></obi-16-lock>
              </obc-table-cell>
              <obc-table-cell>
                <obc-button fullwidth>ACK</obc-button>
              </obc-table-cell>
            </obc-table-row>
            <obc-table-row>
              <obc-table-cell>
                <div class="alert-status">
                  <obi-14-alarm-unack
                    usecsscolor
                    class="alert-icon"
                  ></obi-14-alarm-unack>
                  <span>Unacked</span>
                </div>
              </obc-table-cell>
              <obc-table-cell>Source id</obc-table-cell>
              <obc-table-cell>A</obc-table-cell>
              <obc-table-cell>message</obc-table-cell>
              <obc-table-cell>Message</obc-table-cell>
              <obc-table-cell>#000000</obc-table-cell>
              <obc-table-cell>12:00:00 12. feb</obc-table-cell>
              <obc-table-cell>
                <obi-16-lock class="lock-icon"></obi-16-lock>
              </obc-table-cell>
              <obc-table-cell>
                <obc-button fullwidth>ACK</obc-button>
              </obc-table-cell>
            </obc-table-row>
            <obc-table-row>
              <obc-table-cell>
                <div class="alert-status">
                  <obi-14-alarm-unack
                    usecsscolor
                    class="alert-icon"
                  ></obi-14-alarm-unack>
                  <span>Unacked</span>
                </div>
              </obc-table-cell>
              <obc-table-cell>Source id</obc-table-cell>
              <obc-table-cell>A</obc-table-cell>
              <obc-table-cell>message</obc-table-cell>
              <obc-table-cell>Message</obc-table-cell>
              <obc-table-cell>#000000</obc-table-cell>
              <obc-table-cell>12:00:00 12. feb</obc-table-cell>
              <obc-table-cell>
                <obi-16-lock class="lock-icon"></obi-16-lock>
              </obc-table-cell>
              <obc-table-cell>
                <obc-button fullwidth>ACK</obc-button>
              </obc-table-cell>
            </obc-table-row>
          </obc-table-body>
        </obc-table>
      </div>`,
};
