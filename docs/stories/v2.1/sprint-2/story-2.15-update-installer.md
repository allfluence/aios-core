# STORY 2.15: Update Installer for Modules

**ID:** 2.15 | **Épico:** [EPIC-S2](../../../epics/epic-s2-modular-architecture.md)
**Sprint:** 2 | **Points:** 3 | **Priority:** 🟠 High | **Created:** 2025-01-19
**Updated:** 2025-11-30
**Status:** ⏸️ Blocked

**Reference:** [ADR-002 Migration Map](../../architecture/decisions/ADR-002-migration-map.md)
**Quality Gate:** [2.15-update-installer.yml](../../qa/gates/2.15-update-installer.yml)

**Blocked by:** Story 2.14 (Migration Script) must be tested first

---

## 📊 User Story

**Como** new user, **Quero** installer criar estrutura modular, **Para** começar com v2.1 architecture desde o início

---

## ✅ Acceptance Criteria

### Module Structure Creation
- [ ] AC15.1: Installer creates `.aios-core/core/` directory
- [ ] AC15.2: Installer creates `.aios-core/development/` directory
- [ ] AC15.3: Installer creates `.aios-core/product/` directory
- [ ] AC15.4: Installer creates `.aios-core/infrastructure/` directory

### File Generation
- [ ] AC15.5: Core module files generated in correct location
- [ ] AC15.6: Development module files generated in correct location
- [ ] AC15.7: Product module files generated in correct location
- [ ] AC15.8: Infrastructure module files generated in correct location

### Manifest Generation
- [ ] AC15.9: Manifest files generated during install
- [ ] AC15.10: agents.csv populated with default agents
- [ ] AC15.11: workers.csv populated with default workers

### Backward Compatibility
- [ ] AC15.12: `--legacy` flag creates v2.0 flat structure
- [ ] AC15.13: Default behavior is v2.1 modular structure

---

## 🔧 Scope

### Updated Installer Output

```bash
$ npx aios-fullstack init my-project

🚀 AIOS-FullStack Installer v2.1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Creating project: my-project

✓ Created project directory
✓ Initialized package.json
✓ Installing dependencies...

Creating modular AIOS structure...
  ✓ .aios-core/core/           (registry, quality-gates, manifest)
  ✓ .aios-core/development/    (agents, tasks, templates, checklists)
  ✓ .aios-core/product/        (cli, api)
  ✓ .aios-core/infrastructure/ (config, hooks, telemetry)

✓ Generated 11 agent definitions
✓ Generated 45 task templates
✓ Generated manifest files
✓ Created CLI structure

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Project created successfully!

cd my-project
aios --help

# Legacy v2.0 structure (if needed)
$ npx aios-fullstack init my-project --legacy
```

### Module Directory Structure

```
my-project/
├── .aios-core/
│   ├── core/
│   │   ├── registry/
│   │   ├── quality-gates/
│   │   ├── manifest/
│   │   └── utils/
│   ├── development/
│   │   ├── agents/
│   │   ├── tasks/
│   │   ├── templates/
│   │   ├── checklists/
│   │   └── scripts/
│   ├── product/
│   │   ├── cli/
│   │   └── api/
│   └── infrastructure/
│       ├── config/
│       ├── hooks/
│       └── telemetry/
├── .aios/
│   └── project-status.yaml
├── docs/
└── package.json
```

---

## 🤖 CodeRabbit Integration

### Story Type Analysis

**Primary Type**: Infrastructure/Installer
**Secondary Type(s)**: File Generation
**Complexity**: Low-Medium (updating existing installer)

### Specialized Agent Assignment

**Primary Agents:**
- @dev: Installer updates

**Supporting Agents:**
- @qa: Fresh install testing

### Quality Gate Tasks

- [ ] Pre-Commit (@dev): Run before marking story complete
- [ ] Pre-PR (@github-devops): Run before creating pull request

### Self-Healing Configuration

**Expected Self-Healing:**
- Primary Agent: @dev (light mode)
- Max Iterations: 2
- Timeout: 10 minutes
- Severity Filter: CRITICAL only

---

## 📋 Tasks

### Installer Updates (4h)
- [ ] 2.15.1: Update directory creation logic (1.5h)
- [ ] 2.15.2: Update file generation paths (1.5h)
- [ ] 2.15.3: Add `--legacy` flag support (1h)

### File Generation (2h)
- [ ] 2.15.4: Update agent file generation paths (0.5h)
- [ ] 2.15.5: Update task file generation paths (0.5h)
- [ ] 2.15.6: Add manifest generation step (1h)

### Testing (2h)
- [ ] 2.15.7: Test fresh install creates correct structure (1h)
- [ ] 2.15.8: Test --legacy flag works (0.5h)
- [ ] 2.15.9: Run smoke tests INS-01 to INS-06 (0.5h)

**Total Estimated:** 8h

---

## 🧪 Smoke Tests (INS-01 to INS-06)

| Test ID | Name | Description | Priority | Pass Criteria |
|---------|------|-------------|----------|---------------|
| INS-01 | Core Created | core/ directory exists | P0 | Dir with files |
| INS-02 | Dev Created | development/ directory exists | P0 | Dir with files |
| INS-03 | Product Created | product/ directory exists | P0 | Dir with files |
| INS-04 | Infra Created | infrastructure/ directory exists | P0 | Dir with files |
| INS-05 | Manifests | Manifest files generated | P1 | CSV files exist |
| INS-06 | Legacy Mode | --legacy creates flat structure | P1 | Old structure |

**Rollback Triggers:**
- INS-01 to INS-04 fails → Structure broken, rollback

---

## 🔗 Dependencies

**Depends on:**
- [Story 2.14](./story-2.14-migration-script.md) - Migration script tested

**Blocks:**
- Story 2.16 (Documentation) - Installation docs

---

## 📋 Rollback Plan

| Condition | Action |
|-----------|--------|
| INS-01-04 fails | Revert installer changes |
| INS-05 fails | Fix manifest generation |

```bash
git revert --no-commit HEAD~N
```

---

## 📁 File List

**Modified:**
- `tools/installer/lib/installer.js` (main changes)
- `tools/installer/lib/file-generator.js`
- `tools/installer/lib/directory-structure.js`
- `tools/installer/templates/` (update paths in templates)

**Created:**
- `tests/integration/installer-v21.test.js`

---

## ✅ Definition of Done

- [ ] Fresh install creates 4-module structure
- [ ] All default files in correct locations
- [ ] Manifest files generated
- [ ] --legacy flag works
- [ ] All P0 smoke tests pass (INS-01 to INS-04)
- [ ] All P1 smoke tests pass (INS-05 to INS-06)
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

### Smoke Tests Results (INS-01 to INS-06)

| Test ID | Name | Result | Notes |
|---------|------|--------|-------|
| INS-01 | Core Created | ⏳ Pending | |
| INS-02 | Dev Created | ⏳ Pending | |
| INS-03 | Product Created | ⏳ Pending | |
| INS-04 | Infra Created | ⏳ Pending | |
| INS-05 | Manifests | ⏳ Pending | |
| INS-06 | Legacy Mode | ⏳ Pending | |

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
