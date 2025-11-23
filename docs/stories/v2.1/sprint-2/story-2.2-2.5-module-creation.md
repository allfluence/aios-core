# STORIES 2.2-2.5: Module Creation (4 Modules)

**Épico:** [EPIC-S2](../../../epics/epic-s2-modular-architecture.md) | **Sprint:** 2 | **Created:** 2025-01-19

---

## 📊 Overview

Estas 4 stories implementam a criação física dos 4 modules, migrando arquivos de flat structure para modular structure.

---

## STORY 2.2: Core Module Creation

**Points:** 5 | **Priority:** 🔴 Critical

### User Story
**Como** arquiteto, **Quero** criar module `core/`, **Para** centralizar framework essentials

### Scope
```
.aios-core/core/
├── config/
│   ├── agent-config-loader.js
│   ├── core-config.yaml (template)
│   └── validation-schemas.js
├── orchestration/
│   ├── workflow-engine.js
│   ├── task-runner.js
│   └── executor-router.js
└── quality-gates/
    ├── quality-gate-manager.js
    ├── gate-definitions.yaml
    └── validators/
```

### Tasks
- [ ] Create directory structure (1h)
- [ ] Migrate config files (2h)
- [ ] Migrate orchestration files (2h)
- [ ] Migrate quality gates (2h)
- [ ] Update imports (2h)
- [ ] Test (3h)

**Total:** 12h

---

## STORY 2.3: Development Module Creation

**Points:** 5 | **Priority:** 🔴 Critical

### User Story
**Como** developer, **Quero** module `development/`, **Para** acessar agents, workers, tasks

### Scope
```
.aios-core/development/
├── agents/           # 11 agents
├── workers/          # 97+ workers catalogados
├── tasks/            # Task definitions
└── workflows/        # Workflow definitions
```

### Tasks
- [ ] Create directory structure (1h)
- [ ] Migrate 11 agents (2h)
- [ ] Catalog 97+ workers (5h)
- [ ] Migrate tasks (2h)
- [ ] Migrate workflows (2h)
- [ ] Test (3h)

**Total:** 15h

---

## STORY 2.4: Product Module Creation

**Points:** 3 | **Priority:** 🟠 High

### User Story
**Como** PM/PO, **Quero** module `product/`, **Para** acessar templates e checklists

### Scope
```
.aios-core/product/
├── templates/        # PRD, ADR, PMDR, DBDR
├── checklists/       # Validation checklists
└── decisions/        # Decision frameworks
```

### Tasks
- [ ] Create directory structure (1h)
- [ ] Migrate templates (2h)
- [ ] Migrate checklists (2h)
- [ ] Migrate decision frameworks (1h)
- [ ] Test (2h)

**Total:** 8h

---

## STORY 2.5: Infrastructure Module Creation

**Points:** 5 | **Priority:** 🟠 High

### User Story
**Como** developer, **Quero** module `infrastructure/`, **Para** CLI, MCPs, integrations

### Scope
```
.aios-core/infrastructure/
├── cli/              # CLI commands
├── mcp/              # MCP configurations
├── integrations/     # External integrations (ClickUp, GitHub)
└── scripts/          # Utility scripts
```

### Tasks
- [ ] Create directory structure (1h)
- [ ] Migrate CLI commands (3h)
- [ ] Migrate MCP configs (2h)
- [ ] Migrate integrations (2h)
- [ ] Migrate scripts (2h)
- [ ] Test (3h)

**Total:** 13h

---

## 🔗 Dependencies

**All 4 stories depend on:** [2.1] Module Structure Design  
**All 4 stories block:** [2.6] Service Registry, [2.14] Migration Script

---

## ✅ Shared Acceptance Criteria

- [ ] Zero breaking changes
- [ ] All imports updated
- [ ] Tests passing 100%
- [ ] Documentation updated
- [ ] Backward compatibility maintained

---

**Criado por:** River 🌊

