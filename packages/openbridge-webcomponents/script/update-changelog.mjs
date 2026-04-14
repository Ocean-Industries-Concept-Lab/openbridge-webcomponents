/**
 * Update CHANGELOG.md with entries generated from commits since the last release tag.
 * 
 * Uses conventional-changelog-core to generate the changelog fragment and
 * prepends it to the existing CHANGELOG.md.
 * 
 * Environment variables:
 * - VERSION: The version being released (e.g., "0.0.0-canary-0.1.0")
 * - TAG: The git tag being created (e.g., "canary-0.1.0" or "v0.1.0")
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import conventionalChangelog from 'conventional-changelog-core';

const VERSION = process.env.VERSION;
const TAG = process.env.TAG;

if (!VERSION || !TAG) {
  console.error('[update-changelog] Missing required environment variables: VERSION and TAG');
  process.exit(1);
}

const isCanary = TAG.startsWith('canary-');
const changelogPath = join(process.cwd(), 'CHANGELOG.md');

function log(message) {
  console.log(`[update-changelog] ${message}`);
}

try {
  log(`Generating changelog for version ${VERSION} (tag: ${TAG})`);

  // Get all tags sorted by date to find the previous one
  const allTags = execSync('git tag --sort=-creatordate --sort=-version:refname', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean);

  let previousTag = null;
  if (isCanary) {
    // Find the previous canary tag
    previousTag = allTags.find(t => t.startsWith('canary-') && t !== TAG);
  } else {
    // Find the previous stable tag (starts with 'v')
    previousTag = allTags.find(t => t.startsWith('v') && t !== TAG);
  }

  const range = previousTag ? `${previousTag}..HEAD` : '';
  log(`Generating changelog${range ? ` for commits in ${range}` : ' for all commits'}`);

  // Generate changelog using conventional-changelog-core
  const changelogContent = await new Promise((resolve, reject) => {
    const stream = conventionalChangelog(
      {
        preset: 'angular',
        tagPrefix: isCanary ? 'canary-' : 'v',
      },
      { version: VERSION },
      { from: previousTag || '' }
    );

    let output = '';
    stream.on('data', chunk => {
      output += chunk.toString();
    });
    stream.on('error', reject);
    stream.on('end', () => resolve(output));
  });

  if (!changelogContent || changelogContent.trim() === '') {
    log('No changes detected in commits. Skipping CHANGELOG.md update.');
    process.exit(0);
  }

  // Read existing CHANGELOG.md
  let existingContent = '';
  try {
    existingContent = readFileSync(changelogPath, 'utf8');
  } catch (err) {
    log('CHANGELOG.md not found. Creating new file.');
  }

  // Prepend new changelog entry
  const updatedContent = changelogContent + existingContent;
  writeFileSync(changelogPath, updatedContent, 'utf8');

  log(`Updated CHANGELOG.md with version ${VERSION}`);
  process.exit(0);
} catch (err) {
  console.error(`[update-changelog] Error:`, err.message);
  process.exit(1);
}
