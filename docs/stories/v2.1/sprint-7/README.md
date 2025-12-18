# Sprint 7: Squad System Enhancement (Epic SQS)

**Sprint Duration:** Post Sprint 6 (OSR completion)
**Sprint Goal:** Implementar sistema completo de Squads seguindo Task-First Architecture

---

## Sprint Overview

O Sprint 7 implementa o **Epic SQS - Squad System Enhancement**, criando um ecossistema completo de extensibilidade baseado em **Agent + Tasks** (não CLI separado):

1. **Squad Loader Utility** - Utility simplificada para resolução de squads locais
2. **Squad Validator + Schema** - Validação robusta seguindo TASK-FORMAT-SPECIFICATION-V1
3. **Squad Creator Agent** - Agente dedicado com tasks para criar, validar e gerenciar squads

### Mudança Arquitetural

> **IMPORTANTE:** A arquitetura foi revisada de CLI npm package para Agent + Tasks.

| Aspecto | Antes | Agora |
|---------|-------|-------|
| Criação de squads | `npx create-aios-squad` | `@squad-creator *create-squad` |
| Validação | CLI command | `@squad-creator *validate-squad` |
| Localização | aios-squads repo | `.aios-core/development/` |

---

## Architecture Decisions

> **ADR-SQS-001** aprovado em 2025-12-18 por @architect (Aria)

| Decision | Choice |
|----------|--------|
| Q1: Manifest Format | Support both, standardize on `squad.yaml` |
| Q2: Loading Strategy | Simplified (local only, no complex caching) |
| Q3: Synkra Integration | New `squadSyncService.js` (Sprint 8) |
| Q4: Squad Creation | Agent + Tasks em `.aios-core/development/` |
| Q5: Distribution Model | 3-level: Local → aios-squads → Synkra API |

---

## Stories

### Completed (Pre-Sprint)

| Story | Title | Effort | Status |
|-------|-------|--------|--------|
| SQS-0 | aios-squads Repo Cleanup | 2h | ✅ DONE |
| SQS-1 | Architecture Validation | 4h | ✅ DONE |

### Sprint 7 Stories

| Story | Title | Points | Priority | Status |
|-------|-------|--------|----------|--------|
| [SQS-2](story-sqs-2-squad-loader.md) | Squad Loader Utility | 5 | 🔴 Critical | 📋 Ready |
| [SQS-3](story-sqs-3-schema-validator.md) | Squad Validator + Schema | 8 | 🟠 High | 📋 Ready |
| [SQS-4](story-sqs-4-squad-creator-agent.md) | Squad Creator Agent + Tasks | 13 | 🔴 Critical | 📋 Ready |

**Total Points:** 26 (+ 6h pre-sprint completed)

---

## Dependencies

```
SQS-0 (DONE) ──► SQS-1 (DONE)
                      │
                      ├──────► SQS-2 (Squad Loader Utility)
                      │              │
                      │              └──► SQS-3 (Validator)
                      │                        │
                      │                        └──► SQS-4 (Creator Agent)
                      │                                   │
                      │                                   ├──► SQS-5 (Synkra - Sprint 8)
                      │                                   ├──► SQS-6 (Download/Publish - Sprint 8)
                      │                                   └──► SQS-7 (Migration - Sprint 8)
                      │
                      └──────► Documentation (SQS-8 - Sprint 8)
```

---

## Deliverables

### Sprint 7 Deliverables

```
.aios-core/
├── schemas/
│   └── squad-schema.json              # SQS-3: JSON Schema
├── development/
│   ├── agents/
│   │   └── squad-creator.md           # SQS-4: Agent definition
│   ├── tasks/
│   │   ├── squad-creator-create.md    # SQS-4: *create-squad
│   │   ├── squad-creator-validate.md  # SQS-3: *validate-squad
│   │   └── squad-creator-list.md      # SQS-4: *list-squads
│   └── scripts/
│       └── squad/
│           ├── index.js               # Exports
│           ├── squad-loader.js        # SQS-2: Loader utility
│           ├── squad-validator.js     # SQS-3: Validator utility
│           └── squad-generator.js     # SQS-4: Generator utility
└── tests/
    └── development/scripts/squad/
        ├── squad-loader.test.js
        ├── squad-validator.test.js
        └── squad-generator.test.js
```

### Sprint 8 Deliverables (Planned)

- `*download-squad` task
- `*publish-squad` task
- `*sync-squad-synkra` task
- `squadSyncService.js` for Synkra API
- Migration tool (expansion-packs → squads)

---

## Repositories

| Repo | URL | Purpose |
|------|-----|---------|
| **aios-core** | github.com/SynkraAI/aios-core | Core framework + Squad Creator Agent |
| **aios-squads** | github.com/SynkraAI/aios-squads | Public squad packages repository |

---

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Architecture decisions change during implementation | Medium | ADR-SQS-001 locked |
| Integration complexity with existing squads | Medium | Test with etl-squad and creator-squad |
| Task-first validation too strict | Low | Use warnings instead of errors |
| Config inheritance complexity | Medium | Start with simple extend/override modes |

---

## Definition of Done (Sprint)

- [ ] Squad Loader utility functional (local resolution)
- [ ] JSON Schema validates all existing squads (etl-squad, creator-squad)
- [ ] Squad Creator agent can create valid squads via `*create-squad`
- [ ] Squads follow task-first architecture
- [ ] Config inheritance works (extend/override)
- [ ] 80%+ test coverage on new modules
- [ ] Documentation updated (squads-guide.md)
- [ ] All stories merged to main

---

## How to Test

### After Sprint 7 Completion

```bash
# Activate squad creator agent
@squad-creator

# Create a new squad
*create-squad meu-teste-squad

# Validate the created squad
*validate-squad meu-teste-squad

# List all local squads
*list-squads
```

Expected output:

```
Local Squads (./squads/)

┌─────────────────────┬─────────┬─────────────────────────────┐
│ Name                │ Version │ Description                 │
├─────────────────────┼─────────┼─────────────────────────────┤
│ meu-teste-squad     │ 1.0.0   │ Custom squad                │
└─────────────────────┴─────────┴─────────────────────────────┘

Total: 1 squad
```

---

## Related Resources

- **Epic Definition:** [epic-sqs-squad-system.md](../../epics/current/epic-sqs-squad-system.md)
- **Squads Guide:** [docs/guides/squads-guide.md](../../../guides/squads-guide.md)
- **Task Format Spec:** [.aios-core/docs/standards/TASK-FORMAT-SPECIFICATION-V1.md](../../../../.aios-core/docs/standards/TASK-FORMAT-SPECIFICATION-V1.md)
- **aios-squads Repo:** [github.com/SynkraAI/aios-squads](https://github.com/SynkraAI/aios-squads)

---

*Sprint 7 Planning - Created by @po (Pax) - 2025-12-18*
*Updated with Task-First Architecture - 2025-12-18*
