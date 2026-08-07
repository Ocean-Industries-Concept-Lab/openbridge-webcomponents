---
name: claude
description: Claude-specific working rules (main-thread implementation, stuck Chromium, missing design inputs, uncommitted plans)
globs:
  - packages/openbridge-webcomponents/src/**
---

## Claude-specific rules

1. **Implementation happens in the main thread, linearly.** Read-only
   investigation and research (codebase exploration, broad searches) may be
   delegated to subagents per AGENTS.md § 8 rule 14, but any work that edits
   files — implementation, refactoring, test updates — must happen
   sequentially in the main conversation so the work can be overseen and
   course corrections are easy. If delegating other work to subagents would
   clearly help, pause and ask first instead of spawning them. (Subagents have
   also gotten stuck here in practice, so prefer fewer of them overall.)

2. **Watch for stuck Chromium processes.** Spawned Chromium/Playwright browsers
   sometimes hang. If a test run stalls, kill the stray Chromium processes and
   retest another way — e.g. the single-component visual-test commands in
   [AGENTS.md § 8 rules 11–13](AGENTS.md#8-behavioral-rules-for-ai-agents)
   (`npx vitest run --project storybook 'component-name'`) instead of the full
   suite.

3. **Pause and report back — do not guess or continue — when design inputs are
   missing:**
   - the Figma plugin/MCP is not authenticated,
   - a referenced Figma design or node is not accessible,
   - the prompt mentions a screenshot or image that is not actually attached.

4. **Never commit plans or specs.** Planning documents, specs, and superpowers
   docs stay uncommitted; the design record belongs in the PR body instead.
