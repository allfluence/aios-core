# Multi-Repository Strategy

> **EN**

---

**Version:** 2.1.0
**Last Updated:** 2026-01-28
**Status:** Official Architecture Document

---

## Table of Contents

- [Overview](#overview)
- [Repository Structure](#repository-structure)
- [Core Repository (aios-core)](#core-repository-aios-core)
- [Squad Repositories](#squad-repositories)
- [MCP Ecosystem Repository](#mcp-ecosystem-repository)
- [Private Repositories](#private-repositories)
- [Sync Mechanism](#sync-mechanism)
- [Package Distribution](#package-distribution)
- [Best Practices](#best-practices)

---

## Overview

AIOS v2.1 adopts a **multi-repository strategy** to enable modular development, community contributions, and clear separation between core framework, extensions (squads), and proprietary components.

### Design Goals

| Goal                      | Description                                           |
| ------------------------- | ----------------------------------------------------- |
| **Modularity**            | Squads can be developed and versioned independently   |
| **Community**             | Open-source squads encourage community contributions  |
| **IP Protection**         | Proprietary components remain in private repositories |
| **Scalability**           | Teams can work on separate repos without conflicts    |
| **Licensing Flexibility** | Different components can have different licenses      |

---

## Repository Structure

```
SynkraAI Organization
├── PUBLIC REPOSITORIES
│   ├── aios-core          # Core framework (Commons Clause)
│   ├── aios-squads        # Community squads (MIT)
│   └── mcp-ecosystem      # MCP configurations (Apache 2.0)
│
└── PRIVATE REPOSITORIES
    ├── mmos               # MMOS proprietary (NDA)
    └── certified-partners # Partner resources (Proprietary)
```

### Visual Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    SYNKRA ORGANIZATION                                   │
│                                                                          │
│   PUBLIC REPOSITORIES                                                    │
│   ═══════════════════                                                    │
│                                                                          │
│   ┌────────────────────┐     ┌────────────────────┐                     │
│   │  SynkraAI/         │     │  SynkraAI/         │                     │
│   │  aios-core         │     │  aios-squads       │                     │
│   │  (Commons Clause)  │◄────│  (MIT)             │                     │
│   │                    │     │                    │                     │
│   │  - Core Framework  │     │  - ETL Squad       │                     │
│   │  - 11 Base Agents  │     │  - Creator Squad   │                     │
│   │  - Quality Gates   │     │  - MMOS Squad      │                     │
│   │  - Discussions Hub │     │  - Community Squads│                     │
│   └────────────────────┘     └────────────────────┘                     │
│            │                                                             │
│            │ optional dependency                                         │
│            ▼                                                             │
│   ┌────────────────────┐                                                │
│   │  SynkraAI/         │                                                │
│   │  mcp-ecosystem     │                                                │
│   │  (Apache 2.0)      │                                                │
│   │                    │                                                │
│   │  - Docker MCP      │                                                │
│   │  - IDE Configs     │                                                │
│   │  - MCP Presets     │                                                │
│   └────────────────────┘                                                │
│                                                                          │
│   PRIVATE REPOSITORIES                                                   │
│   ════════════════════                                                   │
│                                                                          │
│   ┌────────────────────┐     ┌────────────────────┐                     │
│   │  SynkraAI/mmos     │     │  SynkraAI/         │                     │
│   │  (Proprietary+NDA) │     │  certified-partners│                     │
│   │                    │     │  (Proprietary)     │                     │
│   │  - MMOS Minds      │     │  - Premium Squads  │                     │
│   │  - DNA Mental      │     │  - Partner Portal  │                     │
│   └────────────────────┘     └────────────────────┘                     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Core Repository (aios-core)

### Purpose

The core repository contains the foundational AIOS framework that all projects depend on.

### Contents

| Directory                    | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `.aios-core/core/`           | Framework foundations (config, registry, quality gates) |
| `.aios-core/development/`    | Agent definitions, tasks, workflows                     |
| `.aios-core/product/`        | Templates, checklists, PM data                          |
| `.aios-core/infrastructure/` | Scripts, tools, integrations                            |
| `docs/`                      | Framework documentation                                 |

### License

**Commons Clause** - Free for use, commercial hosting/resale requires license.

### npm Package

```bash
npm install @aios/core
```

---

## Squad Repositories

### Overview

Squads are modular extensions that add specialized capabilities to AIOS.

### aios-squads Repository

```
aios-squads/
├── etl/                    # ETL processing squad
│   ├── squad.yaml          # Squad manifest
│   ├── agents/             # Squad-specific agents
│   ├── tasks/              # Squad tasks
│   └── README.md           # Squad documentation
│
├── creator/                # Content creation squad
│   ├── squad.yaml
│   ├── agents/
│   └── tasks/
│
├── mmos/                   # MMOS integration squad
│   ├── squad.yaml
│   ├── agents/
│   └── tasks/
│
└── templates/              # Squad creation templates
    └── squad-template/
```

### Squad Manifest (squad.yaml)

```yaml
name: etl
version: 1.0.0
description: ETL processing squad for data pipelines
license: MIT

peerDependencies:
  '@aios/core': '^2.1.0'

agents:
  - id: data-engineer
    extends: dev

tasks:
  - extract-data
  - transform-data
  - load-data

exports:
  - agents
  - tasks
```

### License

**MIT** - Full open-source freedom for community contributions.

### npm Packages

```bash
npm install @aios/squad-etl
npm install @aios/squad-creator
npm install @aios/squad-mmos
```

---

## MCP Ecosystem Repository

### Purpose

Centralized MCP (Model Context Protocol) configurations for various IDEs and environments.

### Contents

```
mcp-ecosystem/
├── docker/                 # Docker MCP configurations
│   ├── docker-compose.yml
│   └── mcp-servers/
│
├── ide-configs/            # IDE-specific configurations
│   ├── claude-code/
│   ├── cursor/
│   ├── windsurf/
│   └── vscode/
│
└── presets/                # Pre-configured MCP bundles
    ├── minimal/
    ├── development/
    └── enterprise/
```

### License

**Apache 2.0** - Permissive license for maximum adoption.

### npm Package

```bash
npm install @aios/mcp-presets
```

---

## Private Repositories

### SynkraAI/mmos (Proprietary + NDA)

Contains proprietary MMOS (Mental Model Operating System) components:

- MMOS Minds definitions
- DNA Mental algorithms
- Proprietary training data
- Partner-specific customizations

**Access:** Requires NDA and licensing agreement.

### SynkraAI/certified-partners (Proprietary)

Resources for certified AIOS partners:

- Premium squad implementations
- Partner portal access
- Enterprise support tools
- White-label configurations

**Access:** Requires certified partner status.

---

## Sync Mechanism

### Cross-Repository Dependencies

```
┌──────────────┐     depends on      ┌──────────────┐
│  aios-squads │ ──────────────────► │  aios-core   │
└──────────────┘                     └──────────────┘
       │                                    │
       │                                    │
       │ optional                           │ optional
       │                                    │
       ▼                                    ▼
┌──────────────┐                    ┌──────────────┐
│mcp-ecosystem │                    │     mmos     │
└──────────────┘                    └──────────────┘
```

### Version Compatibility

| aios-core | aios-squads | mcp-ecosystem |
| --------- | ----------- | ------------- |
| ^2.1.0    | ^1.0.0      | ^1.0.0        |
| ^3.0.0    | ^2.0.0      | ^1.x.x        |

### Git Submodules (Optional)

For projects that need multiple repositories:

```bash
# Add squads as submodule
git submodule add https://github.com/SynkraAI/aios-squads.git squads

# Add MCP ecosystem as submodule
git submodule add https://github.com/SynkraAI/mcp-ecosystem.git mcp
```

### npm Dependencies (Recommended)

```json
{
  "dependencies": {
    "@aios/core": "^2.1.0",
    "@aios/squad-etl": "^1.0.0",
    "@aios/mcp-presets": "^1.0.0"
  }
}
```

---

## Package Distribution

### npm Package Scoping

| Package               | Registry   | License        | Repository    |
| --------------------- | ---------- | -------------- | ------------- |
| `@aios/core`          | npm public | Commons Clause | aios-core     |
| `@aios/squad-etl`     | npm public | MIT            | aios-squads   |
| `@aios/squad-creator` | npm public | MIT            | aios-squads   |
| `@aios/squad-mmos`    | npm public | MIT            | aios-squads   |
| `@aios/mcp-presets`   | npm public | Apache 2.0     | mcp-ecosystem |

### Publishing Workflow

```bash
# From aios-core
npm publish --access public

# From aios-squads/etl
cd etl && npm publish --access public

# From mcp-ecosystem
npm publish --access public
```

---

## Best Practices

### For Core Contributors

1. **Atomic Changes** - Keep PRs focused on single features or fixes
2. **Backward Compatibility** - Avoid breaking changes in minor versions
3. **Documentation** - Update docs in the same PR as code changes
4. **Cross-Repo Testing** - Test changes against dependent repositories

### For Squad Developers

1. **Manifest First** - Define squad.yaml before implementing
2. **Peer Dependencies** - Specify exact aios-core version requirements
3. **Independent Testing** - Squads should have their own test suites
4. **README Standards** - Include usage examples and requirements

### For Project Consumers

1. **Lock Versions** - Use exact versions in production
2. **Test Updates** - Run full test suite after updating dependencies
3. **Monitor Releases** - Subscribe to release notifications
4. **Report Issues** - File issues in the correct repository

### Repository Maintenance

| Task               | Frequency   | Responsibility |
| ------------------ | ----------- | -------------- |
| Dependency updates | Weekly      | DevOps         |
| Security audits    | Monthly     | DevOps         |
| Version releases   | As needed   | Maintainers    |
| Documentation sync | Per release | Contributors   |

---

## Related Documents

- [High-Level Architecture](./high-level-architecture.md)
- [Module System](./module-system.md)
- [Migration Guide v2.0 to v2.1](../migration/v2.0-to-v2.1.md)
- [Squads Guide](../guides/squads-guide.md)

---

_Last Updated: 2026-01-28 | AIOS Framework Team_
