# CI/CD Architecture

> **EN** | [PT](../pt/architecture/ci-cd.md) | [ES](../es/architecture/ci-cd.md)

---

> Story 6.1: GitHub Actions Cost Optimization

## Overview

AIOS-Core uses GitHub Actions for continuous integration and deployment. This document describes the optimized workflow architecture implemented in Story 6.1.

## Workflow Hierarchy

```text
┌─────────────────────────────────────────────────────────────────┐
│                        TRIGGER EVENTS                           │
├─────────────────────────────────────────────────────────────────┤
│  Pull Request → ci.yml (required) + pr-automation.yml (metrics) │
│  Push to main → ci.yml + semantic-release.yml + test.yml        │
│                 + cross-platform (conditional in ci.yml)        │
│  Tag v*       → release.yml → npm-publish.yml                   │
└─────────────────────────────────────────────────────────────────┘
```

**Note:** PRs only run ci.yml and pr-automation.yml (~12 jobs). Extended testing (test.yml) runs only on push to main.

## Active Workflows

| Workflow                  | Purpose                                         | Trigger           | Critical |
| ------------------------- | ----------------------------------------------- | ----------------- | -------- |
| `ci.yml`                  | Main CI validation (lint, typecheck, test)      | PR, push to main  | Yes      |
| `pr-automation.yml`       | Coverage report & metrics                       | PR only           | No       |
| `semantic-release.yml`    | Automated versioning & changelog                | Push to main      | Yes      |
| `test.yml`                | Extended testing (security, build, integration) | Push to main only | No       |
| `macos-testing.yml`       | macOS-specific testing (Intel + ARM)            | Path-filtered     | No       |
| `release.yml`             | GitHub Release creation                         | Tag v\*           | Yes      |
| `npm-publish.yml`         | NPM package publishing                          | Release published | Yes      |
| `pr-labeling.yml`         | Auto-labeling PRs                               | PR opened/sync    | No       |
| `quarterly-gap-audit.yml` | Scheduled audit                                 | Cron              | No       |
| `welcome.yml`             | First-time contributor welcome                  | PR                | No       |

## Optimization Strategies

### 1. Concurrency Control

All workflows use concurrency groups to prevent duplicate runs:

```yaml
concurrency:
  group: <workflow>-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true  # For CI workflows
  # OR
  cancel-in-progress: false  # For release/publish workflows
```

### 2. Path Filters

Workflows skip unnecessary runs for docs-only changes:

```yaml
paths-ignore:
  - 'docs/**'
  - '*.md'
  - '.aios/**'
  - 'squads/**'
  - 'LICENSE'
  - '.gitignore'
```

### 3. Conditional Cross-Platform Testing

Cross-platform matrix (3 OS x 3 Node versions = 7 jobs after exclusions) only runs on main push:

```yaml
cross-platform:
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  strategy:
    matrix:
      os: [ubuntu-latest, windows-latest, macos-latest]
      node: ['18', '20', '22']
      exclude:
        - os: macos-latest
          node: '18' # isolated-vm SIGSEGV
        - os: macos-latest
          node: '20' # isolated-vm SIGSEGV
```

### 4. Consolidated Validation

Single source of truth for validation:

- **ci.yml** handles all validation (lint, typecheck, test)
- **semantic-release.yml** relies on branch protection (no duplicate CI)
- **pr-automation.yml** focuses only on metrics/coverage

## Billable Minutes Reduction

| Before        | After        | Savings |
| ------------- | ------------ | ------- |
| ~340 min/week | ~85 min/week | ~75%    |

### Breakdown:

- Concurrency: 40% reduction (cancels stale runs)
- Path filters: 30% reduction (skips docs-only PRs)
- Consolidated cross-platform: 25% reduction (7 vs 16 jobs)
- Removed redundant workflows: 5% reduction

## Branch Strategy

All workflows target `main` branch only:

- No `master` or `develop` branches
- Feature branches → PR to main
- Releases via semantic-release on main

## Required Status Checks

For branch protection on `main`:

1. `CI / ESLint`
2. `CI / TypeScript Type Checking`
3. `CI / Jest Tests`
4. `CI / Validation Summary`

## Troubleshooting

### Workflow not running?

1. Check if paths are in `paths-ignore`
2. Verify branch matches trigger
3. Check concurrency group (may be cancelled)

### Release not publishing?

1. Verify `NPM_TOKEN` secret is set
2. Check semantic-release config
3. Verify conventional commits format

### macOS tests failing?

- Node 18/20 on macOS have isolated-vm SIGSEGV issues
- Only Node 22 runs on macOS (by design)

## Related Documentation

- [GitHub Actions Billing](https://docs.github.com/en/billing/managing-billing-for-github-actions)
- [Semantic Release](https://semantic-release.gitbook.io/)
