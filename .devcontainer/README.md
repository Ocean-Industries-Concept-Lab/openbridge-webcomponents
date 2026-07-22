# Dev Container — Persistent Home Directory

The dev container mounts a named Docker volume at `/home/vscode`
(`openbridge-webcomponents-home`, see [devcontainer.json](devcontainer.json)).
Everything written to the container user's home directory therefore survives
**Dev Containers: Rebuild Container** — only the workspace bind mount and this
volume persist; the rest of the container is recreated from the image.

This is deliberately **tool-agnostic**: the repository does not install or
prescribe any AI/CLI tooling (see [AGENTS.md](../AGENTS.md) for the
agent-agnostic policy). Each developer installs whatever they personally use,
once, and the volume keeps it.

## What persists vs. what doesn't

| State | Location | Survives rebuild? |
| --- | --- | --- |
| CLI tools installed into `$HOME` (e.g. `claude`, installed via its install script) | `~/.local/bin`, `~/.local/share` | ✅ |
| Agent auth, plugins, sessions, memory (e.g. Claude Code incl. MCP OAuth tokens) | `~/.claude`, `~/.claude.json` | ✅ |
| `gh auth login` token | `~/.config/gh` | ✅ |
| VS Code Server, extensions, chat history | `~/.vscode-server` | ✅ |
| Shell history, npm cache, Playwright browsers | `~/.bash_history`, `~/.npm`, `~/.cache` | ✅ |
| Packages installed with `apt` (e.g. the `gh` binary) | `/usr/…` (outside `$HOME`) | ❌ reinstall after rebuild |
| Anything else outside `$HOME` and `/workspaces` | — | ❌ |

## Rebuilding the container

1. Command Palette (`Ctrl/Cmd+Shift+P`) → **Dev Containers: Rebuild Container**
   (VS Code also prompts automatically when the devcontainer config changes).
2. Wait for `postCreateCommand` (npm install + build + Playwright). Cached
   VS Code Server, extensions and Playwright browsers make this faster than a
   first-time build.
3. Reinstall any apt packages you use (see the example below) — their auth and
   config are already on the volume.

## Feature versions are pinned (lockfile)

[devcontainer-lock.json](devcontainer-lock.json) pins the exact versions of the
Dev Container Features (`node`, `git`) referenced by
[devcontainer.json](devcontainer.json), the same way `package-lock.json` pins
npm dependencies. Without it, `node:1` / `git:1` resolve to the newest upstream
release on every image build, and any new Feature release invalidates the
Docker layer that installs them — turning the next container create into a
multi-minute rebuild (several `apt` rounds plus the node toolchain install).
With the lockfile committed, image builds keep hitting the cached layer until
the pins are deliberately updated:

```bash
npx @devcontainers/cli upgrade --workspace-folder .
```

Commit the updated lockfile afterwards. (Deleting the lockfile and rebuilding
has the same effect, minus the reproducibility.)

## Example: one developer's loadout (Claude Code + GitHub CLI)

An example of setting up personal tooling so that it persists. Substitute your
own tools freely — Copilot needs nothing here (its auth is forwarded from your
local VS Code; the extension is preinstalled via `devcontainer.json`).

**First time (one-off):**

```bash
# Claude Code CLI (installs into ~/.local — persists)
curl -fsSL https://claude.ai/install.sh | bash
claude                      # log in on first run

# Plugins from https://github.com/anthropics/claude-plugins-official
claude plugin install figma@claude-plugins-official
claude plugin install superpowers@claude-plugins-official
# then inside claude: /mcp → authenticate the figma MCP server

# GitHub CLI (apt → binary does NOT persist, auth does)
sudo apt update && sudo apt install gh
gh auth login
```

**After every rebuild:**

```bash
sudo apt update && sudo apt install gh   # binary only — auth is still there
```

Everything else (Claude login, Figma MCP auth, plugins, sessions/memory,
`gh` auth, VS Code extensions such as the Claude Code extension) is already on
the volume — no re-login, no re-install.

Tip: to auto-install your personal extensions into every dev container without
committing them to the repo, add them to the **user-level** VS Code setting
`"dev.containers.defaultExtensions"` on your machine.

## Caveats & escape hatches

- **Factory reset:** rebuilding no longer resets `$HOME`. For a pristine home
  (broken dotfile, corrupt cache), delete the volume while no container is
  using it, then rebuild:

  ```bash
  docker volume rm openbridge-webcomponents-home
  ```

- **`docker system prune --volumes` deletes the saved state** — exclude the
  volume or re-run your one-off setup afterwards.
- The volume is **shared by all clones** of this repo on the same machine.
  Avoid running two dev containers from it at the same time.
- **Credentials & single-user assumption:** the persisted `$HOME` holds *your
  own* auth tokens (Claude/MCP, `gh`, etc.) — exactly as they would live in
  `$HOME` on your laptop. The volume never leaves your machine, so this adds no
  new exposure over a normal local checkout. It does assume a **single-user
  machine**: anyone with access to the same Docker daemon can read the volume.
  Don't use this mechanism on a shared multi-user host — delete the volume or
  exclude credential paths there.
- Home-directory files baked into the base image are copied into the volume
  the first time it is created; later base-image changes to `$HOME` won't
  propagate to existing volumes (factory reset if ever needed).
- Git config and repo-level agent config are unaffected: `.claude/` and
  `CLAUDE.md` stay gitignored, [AGENTS.md](../AGENTS.md) remains the canonical
  agent instruction file.
- **GitHub Codespaces:** this mechanism targets local Dev Containers; volume
  persistence semantics on Codespaces differ and are not guaranteed.
