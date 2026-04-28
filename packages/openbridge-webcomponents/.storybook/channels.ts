// TODO(devops): wire up real URLs and runtime channel detection (issue #817).
// These constants are the single source of truth for the Storybook channel
// links shown in the sidebar brand area and on the Introduction page.
//
// Background: the library has two long-lived release branches:
//   - `stable`  → published quarterly to the Stable Storybook
//   - `develop` → published on every merge to the Develop Storybook
//
// The Develop URL below is a placeholder until the second Firebase Hosting
// site is provisioned and a branch-based deploy workflow is in place.

export const STORYBOOK_STABLE_URL = 'https://openbridge-storybook.web.app';
export const STORYBOOK_DEVELOP_URL =
  'https://openbridge-storybook-next.web.app';
