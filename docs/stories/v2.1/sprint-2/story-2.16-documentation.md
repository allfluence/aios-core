# STORY 2.16: Documentation Sprint 2

**ID:** 2.16 | **Épico:** [EPIC-S2](../../../epics/epic-s2-modular-architecture.md)
**Sprint:** 2 | **Points:** 5 | **Priority:** 🟡 Medium | **Created:** 2025-01-19
**Updated:** 2025-11-30
**Status:** ⏸️ Blocked

**Reference:** [ADR-002 Migration Map](../../architecture/decisions/ADR-002-migration-map.md)
**Quality Gate:** [2.16-documentation.yml](../../qa/gates/2.16-documentation.yml)

**Blocked by:** All Sprint 2 stories must be complete before final documentation

---

## 📊 User Story

**Como** developer, **Quero** documentação completa para Sprint 2, **Para** entender e usar a arquitetura modular v2.1

---

## ✅ Acceptance Criteria

### Module Architecture Guide
- [ ] AC16.1: `docs/architecture/module-system.md` created
- [ ] AC16.2: Documents 4-module structure (Core, Development, Product, Infrastructure)
- [ ] AC16.3: Explains module boundaries and responsibilities
- [ ] AC16.4: Includes diagrams for module relationships
- [ ] AC16.5: Documents file organization within each module

### Service Discovery Guide
- [ ] AC16.6: `docs/guides/service-discovery.md` created
- [ ] AC16.7: Documents ServiceRegistry API
- [ ] AC16.8: Includes code examples for registration/discovery
- [ ] AC16.9: Documents CLI commands (`aios discover`, `aios info`)
- [ ] AC16.10: Explains service types (agents, workers, tasks)

### Migration Guide
- [ ] AC16.11: `docs/migration/v2.0-to-v2.1.md` created
- [ ] AC16.12: Step-by-step migration instructions
- [ ] AC16.13: Documents backup and rollback procedures
- [ ] AC16.14: Troubleshooting section for common issues
- [ ] AC16.15: Examples of before/after file structures

### Quality Gate Guide
- [ ] AC16.16: `docs/guides/quality-gates.md` created
- [ ] AC16.17: Documents 3-layer quality gate system
- [ ] AC16.18: Explains configuration via quality-gate-config.yaml
- [ ] AC16.19: Documents CLI commands (`aios qa run`, `aios qa status`)
- [ ] AC16.20: Integration guide for CI/CD pipelines

### MCP Global Configuration Guide
- [ ] AC16.21: `docs/guides/mcp-global-setup.md` created
- [ ] AC16.22: Documents global ~/.aios/mcp/ structure
- [ ] AC16.23: Platform-specific instructions (Windows, macOS, Linux)
- [ ] AC16.24: Documents `aios mcp` commands

### Cross-References
- [ ] AC16.25: All guides link to related stories
- [ ] AC16.26: README.md updated with new documentation structure
- [ ] AC16.27: All internal links validated

---

## 🔧 Scope

### Documentation Deliverables

```
docs/
├── architecture/
│   └── module-system.md            # NEW - Module Architecture Guide
├── guides/
│   ├── service-discovery.md        # NEW - Service Discovery Guide
│   ├── quality-gates.md            # NEW - Quality Gate Guide
│   └── mcp-global-setup.md         # NEW - MCP Global Setup Guide
├── migration/
│   └── v2.0-to-v2.1.md            # NEW - Migration Guide
└── README.md                       # UPDATED - Index to all docs
```

### Module Architecture Guide Structure

```markdown
# Module System Architecture

## Overview
- Why modular architecture?
- Design principles

## Module Structure
### Core Module
- Purpose: Framework foundations
- Contents: registry, quality-gates, manifest, utils

### Development Module
- Purpose: Development artifacts
- Contents: agents, tasks, templates, checklists, scripts

### Product Module
- Purpose: User-facing features
- Contents: cli, api

### Infrastructure Module
- Purpose: System configuration
- Contents: config, hooks, telemetry

## Module Boundaries
- Inter-module communication
- Dependency rules

## Diagrams
- Module relationship diagram
- File flow diagram
```

### Migration Guide Structure

```markdown
# Migration Guide: v2.0 → v2.1

## Prerequisites
- Backup requirements
- Version checks

## Step-by-Step Migration

### Step 1: Prepare
$ aios migrate --dry-run

### Step 2: Backup
Automatic backup created

### Step 3: Execute
$ aios migrate --from=2.0 --to=2.1

### Step 4: Verify
$ aios migrate --validate

## Troubleshooting
- Common errors
- Solutions

## Rollback
$ aios migrate --rollback
```

### Quality Gate Guide Structure

```markdown
# Quality Gate System

## Overview
3-layer quality assurance

## Layer 1: Pre-commit
- Lint checks
- Unit tests
- Type checking

## Layer 2: PR Automation
- CodeRabbit integration
- Quinn automated review

## Layer 3: Human Review
- Strategic review checklist
- Sign-off process

## Configuration
quality-gate-config.yaml

## CLI Commands
$ aios qa run
$ aios qa run --layer=1
$ aios qa status
```

---

## 🤖 CodeRabbit Integration

### Story Type Analysis

**Primary Type**: Documentation
**Secondary Type(s)**: Technical Writing
**Complexity**: Low-Medium (documentation only, no code)

### Specialized Agent Assignment

**Primary Agents:**
- @dev: Documentation writing and structure

**Supporting Agents:**
- @qa: Documentation review and link validation

### Quality Gate Tasks

- [ ] Pre-Commit (@dev): Run before marking story complete
- [ ] Pre-PR (@github-devops): Run before creating pull request

### Self-Healing Configuration

**Expected Self-Healing:**
- Primary Agent: @dev (light mode)
- Max Iterations: 1
- Timeout: 5 minutes
- Severity Filter: CRITICAL only

### CodeRabbit Focus Areas

**Primary Focus:**
- Documentation completeness
- Link validation
- Markdown formatting

**Secondary Focus:**
- Code example correctness
- Consistent terminology
- Cross-reference accuracy

---

## 📋 Tasks

### Module Architecture Guide (3h)
- [ ] 2.16.1: Write module overview section (1h)
- [ ] 2.16.2: Document each module's purpose and contents (1.5h)
- [ ] 2.16.3: Create module relationship diagrams (0.5h)

### Service Discovery Guide (3h)
- [ ] 2.16.4: Document ServiceRegistry API (1h)
- [ ] 2.16.5: Write code examples (1h)
- [ ] 2.16.6: Document CLI commands (1h)

### Migration Guide (4h)
- [ ] 2.16.7: Write step-by-step instructions (1.5h)
- [ ] 2.16.8: Document backup/rollback procedures (1h)
- [ ] 2.16.9: Create troubleshooting section (1h)
- [ ] 2.16.10: Add before/after examples (0.5h)

### Quality Gate Guide (3h)
- [ ] 2.16.11: Document 3-layer system (1h)
- [ ] 2.16.12: Write configuration guide (1h)
- [ ] 2.16.13: Document CLI commands (1h)

### MCP Global Setup Guide (2h)
- [ ] 2.16.14: Document global structure (0.5h)
- [ ] 2.16.15: Write platform-specific instructions (1h)
- [ ] 2.16.16: Document aios mcp commands (0.5h)

### Validation Phase (2h)
- [ ] 2.16.17: Validate all internal links (1h)
- [ ] 2.16.18: Run smoke tests DOC-01 to DOC-10 (1h)

**Total Estimated:** 17h

---

## 🧪 Smoke Tests (DOC-01 to DOC-10)

| Test ID | Name | Description | Priority | Pass Criteria |
|---------|------|-------------|----------|---------------|
| DOC-01 | Module Guide Exists | module-system.md created | P0 | File exists |
| DOC-02 | Discovery Guide Exists | service-discovery.md created | P0 | File exists |
| DOC-03 | Migration Guide Exists | v2.0-to-v2.1.md created | P0 | File exists |
| DOC-04 | QG Guide Exists | quality-gates.md created | P0 | File exists |
| DOC-05 | MCP Guide Exists | mcp-global-setup.md created | P0 | File exists |
| DOC-06 | Links Valid | No broken internal links | P1 | Link checker passes |
| DOC-07 | Code Examples | Code examples are correct | P1 | Examples run |
| DOC-08 | README Updated | README.md links to new docs | P1 | Links present |
| DOC-09 | Diagrams Present | Architecture diagrams included | P2 | Images render |
| DOC-10 | Spelling/Grammar | No obvious errors | P2 | Spell check passes |

**Rollback Triggers:**
- DOC-01 to DOC-05 fails → Documentation incomplete, fix
- DOC-06 fails → Fix broken links before merge

---

## 🔗 Dependencies

**Depends on:**
- All Sprint 2 stories (2.2-2.15) - Need completed features to document
- [Story 2.10](./story-2.10-quality-gate-manager.md) - Quality Gate Manager
- [Story 2.11](./story-2.11-mcp-system-global.md) - MCP Global System
- [Story 2.14](./story-2.14-migration-script.md) - Migration Script

**Blocks:**
- None (final story in Sprint 2)

---

## 📋 Rollback Plan

| Condition | Action |
|-----------|--------|
| DOC-01-05 fails | Create missing documentation |
| DOC-06 fails | Fix broken links |
| Content errors | Update documentation |

```bash
# Rollback command
git revert --no-commit HEAD~N
```

---

## 📁 File List

**Created:**
- `docs/architecture/module-system.md`
- `docs/guides/service-discovery.md`
- `docs/guides/quality-gates.md`
- `docs/guides/mcp-global-setup.md`
- `docs/migration/v2.0-to-v2.1.md`

**Modified:**
- `docs/README.md` (add links to new guides)
- `README.md` (update documentation section)

---

## ✅ Definition of Done

- [ ] Module Architecture Guide complete and accurate
- [ ] Service Discovery Guide complete with examples
- [ ] Migration Guide complete with troubleshooting
- [ ] Quality Gate Guide complete with configuration
- [ ] MCP Global Setup Guide complete for all platforms
- [ ] All internal links validated
- [ ] README.md updated
- [ ] All P0 smoke tests pass (DOC-01 to DOC-05)
- [ ] All P1 smoke tests pass (DOC-06 to DOC-08)
- [ ] All P2 smoke tests pass (DOC-09 to DOC-10)
- [ ] Story checkboxes updated to [x]
- [ ] QA Review passed
- [ ] PR created and approved

---

## 🤖 Dev Agent Record

### Agent Model Used
_To be filled by @dev agent_

### Debug Log References
_To be filled after implementation_

### Completion Notes
_To be filled after implementation_

---

## ✅ QA Results

### Smoke Tests Results (DOC-01 to DOC-10)

| Test ID | Name | Result | Notes |
|---------|------|--------|-------|
| DOC-01 | Module Guide Exists | ⏳ Pending | |
| DOC-02 | Discovery Guide Exists | ⏳ Pending | |
| DOC-03 | Migration Guide Exists | ⏳ Pending | |
| DOC-04 | QG Guide Exists | ⏳ Pending | |
| DOC-05 | MCP Guide Exists | ⏳ Pending | |
| DOC-06 | Links Valid | ⏳ Pending | |
| DOC-07 | Code Examples | ⏳ Pending | |
| DOC-08 | README Updated | ⏳ Pending | |
| DOC-09 | Diagrams Present | ⏳ Pending | |
| DOC-10 | Spelling/Grammar | ⏳ Pending | |

### Gate Decision
_To be filled by @qa agent_

---

## 📝 Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-01-19 | 0.1 | Story created (bundled in 2.10-2.16) | River |
| 2025-11-30 | 1.0 | Sharded to individual file, full enrichment | Pax |

---

**Criado por:** River 🌊
**Refinado por:** Pax 🎯 (PO) - 2025-11-30
