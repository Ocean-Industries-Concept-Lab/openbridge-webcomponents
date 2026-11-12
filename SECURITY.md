# Security Policy

## Reporting a vulnerability

Report it in private. The repository is public, so do not open an issue, a
pull request or a discussion for it, and do not describe it in a commit
message.

Use **[Report a vulnerability](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/security/advisories/new)**
on the repository's Security tab. Say which component and version is
affected, what an attacker has to control, and how to reproduce it.

## Supported versions

Fixes are released on the two current lines at the same time:

| Branch    | npm dist-tag | Security fixes |
| --------- | ------------ | -------------- |
| `stable`  | `latest`     | yes            |
| `develop` | `next`       | yes            |

The advisory for a vulnerability lists the older versions it affects and says
whether any of them gets a release of its own.

## What happens after a report

The maintainers confirm the report in a private advisory, prepare the fix in
the advisory's private fork, release it, and then publish the advisory with
the affected and the patched versions. The reporter is credited in the
advisory unless they ask not to be.

Published advisories are listed under
[Security advisories](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/security/advisories).
They reach projects that use the packages through `npm audit` and Dependabot.
