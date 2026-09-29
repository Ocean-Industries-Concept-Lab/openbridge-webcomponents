import path from 'node:path';

/** One canonical agent-instruction document under `docs/agents/`. */
export interface AgentDoc {
  name: string;
  description: string;
  globs: string[];
  body: string;
  sourcePath: string;
}

const SCALAR_KEYS = ['name', 'description'] as const;
const LIST_KEYS = ['globs'] as const;

function unquote(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length > 1) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length > 1)
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

/**
 * Parses the strict frontmatter subset used by `docs/agents/*.md`.
 *
 * Deliberately not a YAML parser: it accepts `key: value` scalars and
 * `  - item` lists for a fixed key set and throws on anything else, so a
 * valid-but-unsupported construct can never be silently mis-emitted.
 */
export function parseAgentDoc(raw: string, sourcePath: string): AgentDoc {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  if (lines[0].trim() !== '---') {
    throw new Error(`${sourcePath}: must start with a "---" frontmatter block`);
  }
  const end = lines.indexOf('---', 1);
  if (end === -1) {
    throw new Error(`${sourcePath}: frontmatter block is never closed`);
  }

  const scalars = new Map<string, string>();
  const lists = new Map<string, string[]>();
  let currentList: string[] | null = null;

  for (let i = 1; i < end; i++) {
    const line = lines[i];
    const lineNo = i + 1;
    if (line.trim() === '') continue;

    if (line.startsWith('  - ') || line.startsWith('- ')) {
      if (!currentList) {
        throw new Error(
          `${sourcePath}: list item with no key on line ${lineNo}`
        );
      }
      currentList.push(unquote(line.slice(line.indexOf('- ') + 2)));
      continue;
    }

    const match = /^([A-Za-z][A-Za-z0-9_]*):(.*)$/.exec(line);
    if (!match) {
      throw new Error(`${sourcePath}: cannot parse line ${lineNo}: ${line}`);
    }
    const [, key, rest] = match;

    if ((SCALAR_KEYS as readonly string[]).includes(key)) {
      scalars.set(key, unquote(rest));
      currentList = null;
    } else if ((LIST_KEYS as readonly string[]).includes(key)) {
      if (rest.trim() !== '') {
        throw new Error(
          `${sourcePath}: "${key}" must be a block list, not an inline value (line ${lineNo})`
        );
      }
      currentList = [];
      lists.set(key, currentList);
    } else {
      throw new Error(
        `${sourcePath}: unsupported key "${key}" on line ${lineNo}`
      );
    }
  }

  for (const key of SCALAR_KEYS) {
    if (!scalars.get(key)) {
      throw new Error(
        `${sourcePath}: "${key}" is required and must be non-empty`
      );
    }
  }
  const globs = lists.get('globs') ?? [];
  if (globs.length === 0) {
    throw new Error(`${sourcePath}: "globs" must list at least one pattern`);
  }

  const name = scalars.get('name')!;
  const expected = path.basename(sourcePath, '.md');
  if (name !== expected) {
    throw new Error(
      `${sourcePath}: name "${name}" does not match filename "${expected}"`
    );
  }

  const body = lines
    .slice(end + 1)
    .join('\n')
    .replace(/^\n+/, '');

  return {
    name,
    description: scalars.get('description')!,
    globs,
    body,
    sourcePath,
  };
}
