# STORY: Module Structure Design

**ID:** 2.1 | **Épico:** [EPIC-S2](../../../epics/epic-s2-modular-architecture.md)  
**Sprint:** 2 | **Points:** 5 | **Priority:** 🔴 Critical | **Created:** 2025-01-19

## 📊 User Story
**Como** arquiteto, **Quero** definir estrutura modular clara, **Para** organizar .aios-core/ em 4 modules

## ✅ Acceptance Criteria
- [ ] 4 modules definidos: core, development, product, infrastructure
- [ ] Cada module com responsabilidades claras (documented in ADR)
- [ ] Migration map completo (file → destination module)
- [ ] Zero breaking changes para usuários
- [ ] Architecture Decision Record (ADR) documentado

## 🔧 Implementation
```
.aios-core/
├── core/           # Framework essentials (config, orchestration, validation)
├── development/    # Dev features (agents, workers, tasks, workflows)
├── product/        # PM features (templates, checklists, decisions)
└── infrastructure/ # System (CLI, MCP, integrations, scripts)
```

## 📋 Tasks (5 pts = 2 dias)
- [ ] 2.1.1: Define module boundaries (4h)
- [ ] 2.1.2: Create migration map (3h)
- [ ] 2.1.3: Identify inter-module dependencies (3h)
- [ ] 2.1.4: Write ADR (2h)
- [ ] 2.1.5: Review by Aria + Pedro clone (2h)

**Total:** 14h

## 🔗 Dependencies
**Depende:** [1.1-1.12] Sprint 1 complete | **Bloqueia:** [2.2-2.5] Module creation

**Criado por:** River 🌊

