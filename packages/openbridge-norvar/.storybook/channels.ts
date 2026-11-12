// Release channels of this Storybook and of the OpenBridge Storybook it links
// to. The Firebase sites follow the core's naming: develop deploys to the
// `-next` site, stable to the plain one.

export const NORVAR_STORYBOOK_STABLE_URL =
  'https://openbridge-norvar-storybook.web.app';
export const NORVAR_STORYBOOK_DEVELOP_URL =
  'https://openbridge-next-norvar-storybook.web.app';
export const OPENBRIDGE_STORYBOOK_STABLE_URL =
  'https://openbridge-storybook.web.app';
export const OPENBRIDGE_STORYBOOK_DEVELOP_URL =
  'https://openbridge-next-storybook.web.app';

/**
 * The channel this build belongs to: the `VITE_STORYBOOK_BRANCH` the CI build
 * sets, else the hostname, else `develop` for a local run.
 */
export const getBranch = (): 'stable' | 'develop' => {
  const envBranch =
    (typeof process !== 'undefined' && process.env?.VITE_STORYBOOK_BRANCH) ||
    (typeof window !== 'undefined' &&
      (window as unknown as {VITE_STORYBOOK_BRANCH?: string})
        .VITE_STORYBOOK_BRANCH);

  if (envBranch === 'stable' || envBranch === 'develop') {
    return envBranch;
  }

  if (typeof window !== 'undefined' && window.location.hostname) {
    const host = window.location.hostname;
    if (host.includes('-next')) return 'develop';
    if (host.includes('openbridge-norvar-storybook.web.app')) return 'stable';
  }

  return 'develop';
};

export const isStable = getBranch() === 'stable';
export const OPENBRIDGE_STORYBOOK_URL = isStable
  ? OPENBRIDGE_STORYBOOK_STABLE_URL
  : OPENBRIDGE_STORYBOOK_DEVELOP_URL;
