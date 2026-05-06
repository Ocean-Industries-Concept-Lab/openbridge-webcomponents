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

/**
 * Detects the current Storybook branch/channel.
 * Priorities:
 * 1. VITE_STORYBOOK_BRANCH env var (set during CI build)
 * 2. Hostname detection (for deployed instances)
 * 3. Default to 'develop' (for local dev)
 */
export const getBranch = (): 'stable' | 'develop' => {
  const envBranch = import.meta.env.VITE_STORYBOOK_BRANCH;
  if (envBranch === 'stable' || envBranch === 'develop') {
    return envBranch as 'stable' | 'develop';
  }

  if (typeof window !== 'undefined' && window.location.hostname) {
    const host = window.location.hostname;
    if (host.includes('-next')) return 'develop';
    if (host.includes('openbridge-storybook.web.app')) return 'stable';
  }

  return 'develop';
};

export const STORYBOOK_BRANCH = getBranch();
export const isStable = STORYBOOK_BRANCH === 'stable';
export const isDevelop = STORYBOOK_BRANCH === 'develop';
