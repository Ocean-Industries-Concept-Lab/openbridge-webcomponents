import fs from 'node:fs';
import path from 'node:path';
import {sanitize} from 'storybook/internal/csf';
import {parseAgentDoc} from '../agent-docs/frontmatter.js';

/** A Storybook docs page: an MDX file under `docs/`, or a module-level stories file. */
export interface Guide {
  title: string;
  file: string;
  slug: string;
  optional: boolean;
  source: string;
}

export interface AgentDocSummary {
  name: string;
  description: string;
  repoPath: string;
}

export interface PackageMeta {
  name: string;
  version: string;
  description: string;
}

const META_TITLE = /<Meta\s+title="([^"]+)"/;
// Release history and the project page are for people who already use the
// library; an agent reads them only when it has context to spare.
const OPTIONAL_TITLE = /Migration Guide|Changelog|Join the project/;

export function mdxGuides(
  docsDir: string,
  warn: (msg: string) => void
): Guide[] {
  const guides: Guide[] = [];
  for (const name of fs.readdirSync(docsDir).sort()) {
    if (!name.endsWith('.mdx')) continue;
    const file = path.join(docsDir, name);
    const source = fs.readFileSync(file, 'utf8');
    const title = META_TITLE.exec(source)?.[1];
    if (!title) {
      warn(`llms.txt: ${name} has no <Meta title>; skipped`);
      continue;
    }
    guides.push({
      title,
      file,
      slug: sanitize(title),
      optional: OPTIONAL_TITLE.test(title),
      source,
    });
  }
  return guides;
}

export function agentDocs(
  agentsDir: string,
  warn: (msg: string) => void
): AgentDocSummary[] {
  if (!fs.existsSync(agentsDir)) {
    warn(`llms.txt: ${agentsDir} is missing; the agent docs are left out`);
    return [];
  }
  return fs
    .readdirSync(agentsDir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const repoPath = path.posix.join('docs/agents', f);
      const doc = parseAgentDoc(
        fs.readFileSync(path.join(agentsDir, f), 'utf8'),
        repoPath
      );
      return {name: doc.name, description: doc.description, repoPath};
    });
}

export function packageMeta(file: string): PackageMeta {
  const pkg = JSON.parse(fs.readFileSync(file, 'utf8')) as Partial<PackageMeta>;
  if (!pkg.description) {
    throw new Error('package.json has no description; llms.txt needs one');
  }
  return {
    name: pkg.name ?? '',
    version: pkg.version ?? '',
    description: pkg.description,
  };
}
