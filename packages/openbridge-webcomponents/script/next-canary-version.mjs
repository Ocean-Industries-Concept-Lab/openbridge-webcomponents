/**
 * Compute the next canary version by:
 * 1. Finding all existing canary-x.y.z git tags
 * 2. Running conventional-recommended-bump to determine the bump type (major/minor/patch)
 * 3. Capping major bumps to minor (to keep versions below 1.0.0)
 * 4. Outputting the next version in format 0.0.0-canary-x.y.z and the tag canary-x.y.z
 *
 * Outputs two GitHub Actions outputs:
 * - VERSION: "0.0.0-canary-x.y.z" (for package.json)
 * - TAG: "canary-x.y.z" (for git tag)
 */

import { execSync } from 'child_process';
import { appendFileSync } from 'fs';
import semver from 'semver';
import conventionalBump from 'conventional-recommended-bump';

const isGitHub = process.env.GITHUB_ENV !== undefined;

function log(message) {
  console.log(`[next-canary-version] ${message}`);
}

function setEnv(key, value) {
  if (isGitHub) {
    appendFileSync(process.env.GITHUB_ENV, `${key}=${value}\n`);
  }
  console.log(`${key}=${value}`);
}

try {
  // Get all canary tags
  const allTags = execSync('git tag --list "canary-*"', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean);

  log(`Found ${allTags.length} existing canary tags`);

  let currentVersion = '0.0.0';
  if (allTags.length > 0) {
    // Extract version strings (strip "canary-" prefix)
    const versions = allTags.map(tag => tag.replace(/^canary-/, ''));

    // Sort by semver
    versions.sort(semver.compare);
    currentVersion = versions[versions.length - 1];
    log(`Latest canary version: ${currentVersion}`);
  } else {
    log('No canary tags found. Starting from 0.0.0');
  }

  // Determine recommended bump from commits
  const bump = await new Promise((resolve, reject) => {
    conventionalBump(
      {
        preset: 'angular',
        ignoreReverted: false,
      },
      (err, recommendation) => {
        if (err) reject(err);
        else resolve(recommendation.releaseType || 'patch');
      }
    );
  });

  log(`Recommended bump: ${bump}`);

  // Cap major bumps to minor (keep below 1.0.0)
  let finalBump = bump;
  if (bump === 'major') {
    log('Capping major bump to minor (version constraint: keep below 1.0.0)');
    finalBump = 'minor';
  }

  // Compute next version
  let nextVersion = semver.inc(currentVersion, finalBump);
  log(`Next version: ${nextVersion}`);

  // Format for npm package version and git tag
  const npmVersion = `0.0.0-canary-${nextVersion}`;
  const gitTag = `canary-${nextVersion}`;

  log(`NPM version: ${npmVersion}`);
  log(`Git tag: ${gitTag}`);

  // Export to GitHub Actions environment, or log for local use
  setEnv('VERSION', npmVersion);
  setEnv('TAG', gitTag);

  process.exit(0);
} catch (err) {
  console.error(`[next-canary-version] Error:`, err.message);
  process.exit(1);
}
