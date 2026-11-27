/**
 * llms.txt generator, the command
 *
 * Writes the agent-facing docs into `llms/` (gitignored), which
 * `postbuild-storybook` copies into `storybook-static` next to the manifest,
 * so the Storybook root serves them. Runs at the end of `npm run analyze`;
 * `--channel next|latest` picks the hosts the links use (`LLMS_CHANNEL`,
 * then `GITHUB_REF_NAME`, when the flag is absent).
 */
import path from 'node:path';
import {resolveChannel} from './llms/channel.js';
import {generate} from './llms/generate.js';

const PACKAGE_ROOT = path.resolve(import.meta.dirname, '..');

const flag = process.argv.indexOf('--channel');

try {
  console.log(
    generate({
      packageRoot: PACKAGE_ROOT,
      repoRoot: path.resolve(PACKAGE_ROOT, '../..'),
      out: path.join(PACKAGE_ROOT, 'llms'),
      channel: resolveChannel(
        flag === -1 ? undefined : process.argv[flag + 1],
        process.env
      ),
      warn: (msg) => console.warn(msg),
    })
  );
} catch (e) {
  console.error((e as Error).message);
  process.exit(1);
}
