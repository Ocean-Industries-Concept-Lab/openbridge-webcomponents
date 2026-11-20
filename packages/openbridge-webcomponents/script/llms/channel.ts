/**
 * Release channel of the generated docs
 *
 * `next` is the develop line, `latest` the stable one; every absolute URL in
 * the output follows it, so a stable deploy links the stable Storybook, the
 * `latest` npm tag and the `stable` git ref.
 */
export interface Channel {
  name: 'next' | 'latest';
  site: string;
  npmTag: 'next' | 'latest';
  gitRef: 'develop' | 'stable';
}

export const REPO = 'Ocean-Industries-Concept-Lab/openbridge-webcomponents';
export const CORE_PACKAGE = '@oicl/openbridge-webcomponents';
export const WRAPPER_PACKAGES = [
  '@oicl/openbridge-webcomponents-react',
  '@oicl/openbridge-webcomponents-vue',
  '@oicl/openbridge-webcomponents-ng',
  '@oicl/openbridge-webcomponents-svelte',
] as const;

const CHANNELS: Record<Channel['name'], Channel> = {
  next: {
    name: 'next',
    site: 'https://openbridge-next-storybook.web.app',
    npmTag: 'next',
    gitRef: 'develop',
  },
  latest: {
    name: 'latest',
    site: 'https://openbridge-storybook.web.app',
    npmTag: 'latest',
    gitRef: 'stable',
  },
};

export function resolveChannel(
  flag: string | undefined,
  env: NodeJS.ProcessEnv
): Channel {
  const name =
    flag ??
    env.LLMS_CHANNEL ??
    (env.GITHUB_REF_NAME === 'stable' ? 'latest' : 'next');
  if (name !== 'next' && name !== 'latest') {
    throw new Error(`llms.txt: channel must be next or latest, got ${name}`);
  }
  return CHANNELS[name];
}

export function rawUrl(ch: Channel, repoPath: string): string {
  return `https://raw.githubusercontent.com/${REPO}/${ch.gitRef}/${repoPath}`;
}

export function unpkgUrl(ch: Channel, pkg: string, file: string): string {
  return `https://unpkg.com/${pkg}@${ch.npmTag}/${file}`;
}

export function siteUrl(ch: Channel, sitePath: string): string {
  return `${ch.site}${sitePath}`;
}
