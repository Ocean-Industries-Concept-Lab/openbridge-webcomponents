/**
 * `npm run comments:rewrite -- <path>` runs the `/comment-pass` skill on a
 * folder or file through the Claude Code CLI, with only the read/edit tools
 * allowed. A positional argument instead of npm's `--path=` config
 * forwarding, which npm warns may not survive a future major version.
 */
import {spawnSync} from 'node:child_process';
import path from 'node:path';

const target = process.argv[2];
if (!target) {
  console.error('usage: npm run comments:rewrite -- <path>');
  process.exit(2);
}

const rel = path.relative(process.cwd(), path.resolve(target)) || '.';
const result = spawnSync(
  'claude',
  ['-p', `/comment-pass ${rel}`, '--allowedTools', 'Read,Edit,Grep,Glob'],
  {stdio: 'inherit'}
);
if (result.error) {
  console.error(
    `comments:rewrite: cannot run \`claude\` — ${result.error.message}`
  );
  process.exit(1);
}
process.exit(result.status ?? 1);
