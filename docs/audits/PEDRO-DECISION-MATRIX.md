# PEDRO DECISION MATRIX

**Date:** 2025-01-19  
**Last Update:** 2025-01-19 (Reorganization Complete)  
**Purpose:** Complete list of ALL decisions needed after investigation completion  
**Status:** ⚠️ PARTIAL DECISIONS RECEIVED - Awaiting Full Responses  
**Priority:** CRITICAL - Block Sprint 1 start until complete

---

## ✅ DECISÕES JÁ TOMADAS (2025-01-19)

### ✅ Backlog Consolidation
**Decisão:** APROVADO  
**Action:** Consolidar 100+ stories em 30 stories limpos  
**Status:** ✅ COMPLETE  
**Result:** 60% reduction in effort ($30K savings)

### ✅ New Folder Structure
**Decisão:** APROVADO  
**Action:** Reorganizar em v2.1/, v2.2/, independent/, archive/  
**Status:** ✅ COMPLETE  
**Folders Created:** 
- ✅ docs/stories/v2.1/ (Sprint 1-6)
- ✅ docs/stories/v2.2/ (Q2-Q3 2026)
- ✅ docs/stories/independent/ (Epic 6.2, 6.4, ETL)
- ✅ docs/stories/archive/ (old structure moved)

### ✅ Archive Old Structure
**Decisão:** APROVADO  
**Action:** Mover 78 files de 'aios migration/' para 'archive/'  
**Status:** ✅ COMPLETE  
**Files Archived:** 78 story files

### ⏸️ Sprint 1 Start Date
**Decisão:** NÃO AINDA  
**Action:** Aguardar decisões completas do PEDRO-DECISION-MATRIX  
**Status:** ⏸️ PENDING  
**Next Step:** Responder decisões abaixo antes de popular stories

---

## ⚠️ IMPORTANTE

**ANTES de popular os stories nas novas pastas:**
1. ⏸️ Pedro precisa responder TODAS as decisões abaixo
2. ⏸️ Baseado nas decisões, os stories serão escritos/reescritos
3. ⏸️ ENTÃO popular as pastas v2.1/sprint-*/ com stories corretos
4. ⏸️ ENTÃO definir Sprint 1 start date

**Status Atual:**
- ✅ Estrutura criada
- ✅ Old structure arquivado
- ⏸️ **AGUARDANDO:** Decisões completas abaixo
- ⏸️ **PRÓXIMO:** Popular stories após decisões

---

## 📋 DECISÕES PENDENTES (CRÍTICAS)  

---

## 📋 How to Use This Document

Para cada decisão abaixo:
1. ✅ Marque sua escolha
2. ✏️ Adicione notas se necessário
3. 📅 Defina deadline (se aplicável)

**Formato de Resposta:**
```
Decisão X: [A/B/C/D] - ESCOLHIDO
Notas: [suas observações]
Deadline: [data, se aplicável]
```

---

## 🔴 DECISÕES CRÍTICAS (Block Implementation)

### Decisão 1: Instalador Quebrado - Abordagem

**Context:** BMAD analysis revealed broken installer (BMAD-003)

**Opções:**

**A) 🚀 Fix Rápido (Recomendado para Sprint 1)**
- Corrigir instalador atual (bin/aios-init.js)
- Manter estrutura existente
- Effort: 1 semana
- Risco: BAIXO
- Benefício: Users podem instalar AIOS imediatamente

**B) 🔄 Refactor Completo com BMAD Patterns**
- Reescrever instalador usando wizard do BMAD
- Implementar manifest system (BMAD-001)
- Simplificar config (BMAD-002)
- Effort: 2-3 semanas
- Risco: MÉDIO
- Benefício: Instalador futureproof

**C) 🎯 Híbrido (Fix + Refactor Incremental)**
- Sprint 1: Fix crítico (A)
- Sprint 2-3: Refactor com BMAD patterns (B)
- Effort: 1 semana (Sprint 1) + 2 semanas (Sprint 2-3)
- Risco: BAIXO
- Benefício: Users desbloqueia imediatamente + melhoria futura

**D) ⏸️ Aguardar Decisão de Mais Investigação**
- Não começar Sprint 1 ainda
- Fazer mais pesquisa e testes
- Effort: TBD
- Risco: ALTO (users continuam bloqueados)

**SUA DECISÃO:**
```
[ ] A - Fix rápido
[ ] B - Refactor completo
[ ] C - Híbrido (RECOMENDADO)
[ ] D - Aguardar

Notas: ________________________________
Deadline: ______________________________
```

---

### Decisão 2: Sprint 1 Scope - O Que Incluir?

**Context:** BMAD-001 a BMAD-004 foram identificados como critical

**Sprint 1 Proposto (2 semanas):**
- ✅ BMAD-003: Fix installer (1 semana)
- ✅ BMAD-001: Create manifest system (2-3 dias)
- ✅ BMAD-002: Simplify core-config.yaml (1-2 dias)
- ✅ BMAD-004: Add version tracking (3-4 dias)

**Opções:**

**A) ✅ Aprovar Sprint 1 Completo (Recomendado)**
- Todos os 4 items
- Effort: 2 semanas
- Benefício: Instalador funcional + fundação para melhorias futuras

**B) 🔴 Apenas BMAD-003 (Fix Installer)**
- Somente instalador
- Effort: 1 semana
- Benefício: Desbloqueia users, mas sem melhorias

**C) 🟡 BMAD-003 + BMAD-001 (Installer + Manifests)**
- Instalador + manifests
- Effort: 1.5 semanas
- Benefício: Instalador + automação futura

**D) 🔵 Customizar (Escolha seus items)**
- Você escolhe quais BMAD items incluir
- Effort: TBD
- Benefício: Flexibilidade

**SUA DECISÃO:**
```
[ ] A - Sprint 1 completo (RECOMENDADO)
[ ] B - Apenas installer
[ ] C - Installer + Manifests
[ ] D - Customizar: _________________________

Notas: ________________________________
Deadline: ______________________________
```

---

### Decisão 3: Module Architecture Refactor - Quando?

**Context:** BMAD-009 proposes major refactor (HIGH RISK)

**Opções:**

**A) 🚫 Não Fazer Agora (Recomendado)**
- Muito disruptivo
- Esperar v2.2+
- Effort: 0 (no Sprint 1)
- Risco: ZERO

**B) 🎯 Sprint 3-4 (Após Fundação)**
- Depois de installer + manifests + config
- Effort: 1 semana
- Risco: MÉDIO

**C) 🔥 Agora (Sprint 2)**
- Logo após installer fix
- Effort: 1 semana
- Risco: ALTO

**D) 📅 Roadmap v2.2 (Q2 2026)**
- Major version change
- Effort: 1 semana (no futuro)
- Risco: BAIXO

**SUA DECISÃO:**
```
[ ] A - Não fazer agora (RECOMENDADO)
[ ] B - Sprint 3-4
[ ] C - Sprint 2
[ ] D - Roadmap v2.2

Notas: ________________________________
Timeline desejado: _____________________
```

---

### Decisão 4: Continuar Investigação (Phases 4-5) ou Começar Implementation?

**Context:** Phases 1-3 complete, Phases 4-5 pending

**Opções:**

**A) ✅ Phases 4-5 FEITAS (Implementadas)**
- Phase 4: Project Structure ✅ COMPLETE
- Phase 5: Final Deliverables - EM PROGRESSO
- Effort: Completo
- Benefício: Roadmap completo antes de implementar

**B) 🚀 Começar Sprint 1 Agora**
- Pular Phase 5 (ou fazer em paralelo)
- Começar BMAD-003 imediatamente
- Effort: 0 (investigação)
- Benefício: Users desbloqueados mais rápido

**C) 🔄 Híbrido (RECOMENDADO)**
- Phase 5 em paralelo com Sprint 1
- 1 pessoa investiga, 1 implementa
- Effort: Paralelo
- Benefício: Roadmap + implementação simultâneos

**D) ⏸️ Aguardar Phase 5 Completar**
- Terminar investigação completa primeiro
- Depois começar Sprint 1
- Effort: +2-3 dias
- Benefício: Planejamento 100% completo

**SUA DECISÃO:**
```
[ ] A - Phases 4-5 completas (já feito)
[ ] B - Sprint 1 agora
[ ] C - Híbrido (RECOMENDADO)
[ ] D - Aguardar Phase 5

Notas: ________________________________
Preferência de execução: _______________
```

---

## 🟡 DECISÕES IMPORTANTES (Não Bloqueantes)

### Decisão 5: Framework Standards Migration (BMAD-018)

**Context:** `docs/standards/` deve mover para `.aios-core/docs/standards/`

**Opções:**

**A) ✅ Aprovar Migration (Recomendado)**
- Implementar BMAD-018 no Sprint 1
- Effort: 2 horas
- Risco: BAIXO
- Benefício: Elimina confusão framework vs. project

**B) ⏸️ Aguardar Sprint 2**
- Não é crítico para installer
- Fazer depois
- Effort: 2 horas (depois)

**C) 🔄 Fazer Parcial (Symlink Apenas)**
- Criar symlink sem mover arquivos
- Effort: 30 minutos
- Risco: BAIXO

**D) 🚫 Não Fazer**
- Manter estrutura atual
- Effort: 0
- Risco: Confusão continua

**SUA DECISÃO:**
```
[ ] A - Aprovar migration (RECOMENDADO)
[ ] B - Aguardar Sprint 2
[ ] C - Symlink apenas
[ ] D - Não fazer

Notas: ________________________________
```

---

### Decisão 6: Quality Gate Manager Unificado (BMAD-013)

**Context:** Quality validation fragmentada em 15+ scripts

**Opções:**

**A) 🎯 Sprint 2 (Após Installer)**
- Implementar após fundação estar estável
- Effort: 1 semana
- Priority: CRITICAL

**B) 🔥 Sprint 1 (Paralelo)**
- Fazer junto com installer
- Effort: 1 semana
- Priority: CRITICAL
- Risco: Sobrecarga

**C) 📅 Sprint 3+**
- Menos urgente
- Effort: 1 semana
- Priority: HIGH

**D) 🚫 Não Priorizar Agora**
- Manter fragmentado
- Effort: 0
- Risco: Inconsistência continua

**SUA DECISÃO:**
```
[ ] A - Sprint 2 (RECOMENDADO)
[ ] B - Sprint 1
[ ] C - Sprint 3+
[ ] D - Não priorizar

Notas: ________________________________
```

---

### Decisão 7: Memory Layer Implementation (BMAD-014)

**Context:** Não implementado, crítico para v2.2+

**Opções:**

**A) 📅 Roadmap v2.2 (Q2 2026) - RECOMENDADO**
- Major feature
- Effort: 3-4 semanas
- Priority: HIGH (mas não para v2.1)

**B) 🔥 Sprint 4-5 (Q1 2026)**
- Logo após fundação
- Effort: 3-4 semanas
- Priority: CRITICAL

**C) 🚫 Não Fazer**
- Manter sem memory layer
- Effort: 0
- Risco: Agents não aprendem

**SUA DECISÃO:**
```
[ ] A - Roadmap v2.2 (RECOMENDADO)
[ ] B - Sprint 4-5
[ ] C - Não fazer

Notas: ________________________________
Timeline desejado: _____________________
```

---

### Decisão 8: CodeRabbit Integration (BMAD-015)

**Context:** Mencionado mas não integrado

**Opções:**

**A) 🎯 Phase 1 Apenas (Sprint 3)**
- Guiar users para instalar IDE extension
- Effort: 1 semana
- Priority: HIGH
- Benefício: Code review local grátis

**B) 🔥 Phase 1 + 2 (Sprint 3-4)**
- IDE extension + GitHub App
- Effort: 3 semanas
- Priority: HIGH
- Benefício: Code review completo

**C) 📅 Roadmap v2.2**
- Não prioritário para v2.1
- Effort: 3 semanas (futuro)
- Priority: MEDIUM

**D) 🚫 Não Fazer**
- Code review manual apenas
- Effort: 0

**SUA DECISÃO:**
```
[ ] A - Phase 1 apenas (RECOMENDADO)
[ ] B - Phase 1 + 2
[ ] C - Roadmap v2.2
[ ] D - Não fazer

Notas: ________________________________
```

---

### Decisão 9: Template Engine Rollout (BMAD-016)

**Context:** Template engine existe mas uso inconsistente

**Opções:**

**A) 🎯 Sprint 3 (Recomendado)**
- Após fundação estável
- Effort: 1 semana
- Priority: MEDIUM
- Benefício: Consistência

**B) 🔥 Sprint 2**
- Logo após installer
- Effort: 1 semana
- Priority: MEDIUM

**C) 📅 Sprint 4+**
- Menos prioritário
- Effort: 1 semana

**D) 🚫 Manter Como Está**
- Sem rollout sistemático
- Effort: 0
- Risco: Inconsistência

**SUA DECISÃO:**
```
[ ] A - Sprint 3 (RECOMENDADO)
[ ] B - Sprint 2
[ ] C - Sprint 4+
[ ] D - Manter como está

Notas: ________________________________
```

---

### Decisão 10: Service Discovery Registry (BMAD-017)

**Context:** 97 scripts sem discoverability

**Opções:**

**A) 🎯 Sprint 2 (Rápido)**
- Effort: 2 dias
- Priority: LOW
- Benefício: Developers sabem o que existe

**B) 📅 Sprint 3+**
- Menos urgente
- Effort: 2 dias

**C) 🚫 Não Fazer**
- Developers descobrem por exploração
- Effort: 0

**SUA DECISÃO:**
```
[ ] A - Sprint 2
[ ] B - Sprint 3+
[ ] C - Não fazer

Notas: ________________________________
```

---

### Decisão 11: Project Structure Consolidation (BMAD-019)

**Context:** 26 folders → 20 folders

**Opções:**

**A) 🎯 Sprint 2 (Após Standards Migration)**
- Effort: 1 semana
- Priority: MEDIUM
- Benefício: 23% menos folders, navegação melhor

**B) 📅 Sprint 3-4**
- Menos prioritário
- Effort: 1 semana

**C) 🚫 Manter 26 Folders**
- Estrutura atual
- Effort: 0

**SUA DECISÃO:**
```
[ ] A - Sprint 2
[ ] B - Sprint 3-4
[ ] C - Manter atual

Notas: ________________________________
```

---

### Decisão 12: Orion Orchestrator Mode (BMAD-006)

**Context:** Hybrid orchestration (menu + direct access)

**Opções:**

**A) 🎯 Sprint 2 (Após Installer)**
- Effort: 1 semana
- Priority: HIGH
- Benefício: 20% token reduction

**B) 📅 Sprint 3**
- Effort: 1 semana

**C) 🚫 Não Fazer**
- Manter apenas acesso direto
- Effort: 0
- Risco: Perde 20% eficiência

**SUA DECISÃO:**
```
[ ] A - Sprint 2 (RECOMENDADO)
[ ] B - Sprint 3
[ ] C - Não fazer

Notas: ________________________________
```

---

## 🟢 DECISÕES OPCIONAIS (Low Priority)

### Decisão 13: Dynamic Agent Loading (BMAD-007)

**Context:** Load agents on-demand (reduce context)

**Opções:**

**A) 📅 Sprint 3-4**
- Effort: 3-4 dias
- Priority: HIGH
- Benefício: Reduce context size

**B) 📅 Roadmap v2.2**
- Major optimization
- Effort: 3-4 dias

**C) 🚫 Não Fazer**
- Load all agents sempre
- Effort: 0

**SUA DECISÃO:**
```
[ ] A - Sprint 3-4
[ ] B - Roadmap v2.2
[ ] C - Não fazer

Notas: ________________________________
```

---

### Decisão 14: Workflow Execution Engine (BMAD-008)

**Context:** Centralized workflow orchestration

**Opções:**

**A) 📅 Sprint 4-5**
- Effort: 1 semana
- Priority: HIGH
- Benefício: Orquestração centralizada

**B) 📅 Roadmap v2.2**
- Major feature
- Effort: 1 semana

**C) 🚫 Não Fazer**
- Manual workflow orchestration
- Effort: 0

**SUA DECISÃO:**
```
[ ] A - Sprint 4-5
[ ] B - Roadmap v2.2
[ ] C - Não fazer

Notas: ________________________________
```

---

### Decisão 15: 7 Additional Orchestration Patterns (BMAD-012)

**Context:** Expand from 3/10 patterns to 10/10

**Opções:**

**A) 📅 Sprint 4-6 (Incremental)**
- 2-3 patterns por sprint
- Effort: 2-3 semanas total
- Priority: MEDIUM

**B) 📅 Roadmap v2.2**
- All 7 patterns at once
- Effort: 2-3 semanas

**C) 🚫 Manter 3 Patterns Atuais**
- Suficiente para maioria dos casos
- Effort: 0

**SUA DECISÃO:**
```
[ ] A - Sprint 4-6 incremental
[ ] B - Roadmap v2.2
[ ] C - Manter 3 patterns

Notas: ________________________________
```

---

### Decisão 16: Rollback Mechanism (BMAD-011)

**Context:** Undo installer/updates

**Opções:**

**A) 🎯 Sprint 2 (Quick Win)**
- Effort: 2 dias
- Priority: LOW
- Benefício: Safety net

**B) 📅 Sprint 3+**
- Effort: 2 dias

**C) 🚫 Não Fazer**
- Manual rollback
- Effort: 0

**SUA DECISÃO:**
```
[ ] A - Sprint 2
[ ] B - Sprint 3+
[ ] C - Não fazer

Notas: ________________________________
```

---

### Decisão 17: Enhanced Installer Wizard (BMAD-010)

**Context:** Better UX for installation

**Opções:**

**A) 📅 Sprint 2 (Após Fix)**
- Effort: 1-2 dias
- Priority: MEDIUM
- Benefício: Better UX

**B) 📅 Sprint 3+**
- Effort: 1-2 dias

**C) 🚫 Manter Atual**
- Installer simples
- Effort: 0

**SUA DECISÃO:**
```
[ ] A - Sprint 2
[ ] B - Sprint 3+
[ ] C - Manter atual

Notas: ________________________________
```

---

### Decisão 18: Customize Pattern (BMAD-005)

**Context:** User changes survive updates (BMAD pattern)

**Opções:**

**A) 📅 Sprint 2-3**
- Effort: 2-3 dias
- Priority: HIGH
- Benefício: User customization safe

**B) 📅 Roadmap v2.2**
- Major feature
- Effort: 2-3 dias

**C) 🚫 Não Fazer**
- Users manually merge
- Effort: 0
- Risco: Lost customizations

**SUA DECISÃO:**
```
[ ] A - Sprint 2-3 (RECOMENDADO)
[ ] B - Roadmap v2.2
[ ] C - Não fazer

Notas: ________________________________
```

---

### Decisão 19: Decision Records Formalization (BMAD-020)

**Context:** Create pmdr/, adr/, dbdr/ subdirectories

**Opções:**

**A) 🎯 Sprint 2 (Quick Win)**
- Effort: 1 dia
- Priority: LOW
- Benefício: Better decision tracking

**B) 📅 Sprint 3+**
- Effort: 1 dia

**C) 🚫 Manter Atual**
- Flat decision/ folder
- Effort: 0

**SUA DECISÃO:**
```
[ ] A - Sprint 2
[ ] B - Sprint 3+
[ ] C - Manter atual

Notas: ________________________________
```

---

### Decisão 20: Docs Migration Script (BMAD-021)

**Context:** Automated migration for safety

**Opções:**

**A) 🎯 Sprint 2 (Antes de BMAD-019)**
- Effort: 2 dias
- Priority: MEDIUM
- Benefício: Safe migration

**B) 📅 Sprint 3**
- Effort: 2 dias

**C) 🚫 Manual Migration**
- No script
- Effort: 0
- Risco: Broken links

**SUA DECISÃO:**
```
[ ] A - Sprint 2 (RECOMENDADO)
[ ] B - Sprint 3
[ ] C - Manual migration

Notas: ________________________________
```

---

## 📊 RESUMO DE DECISÕES

### Sprint 1 (Semanas 1-2)
**Obrigatórias (já decididas):**
- BMAD-003: Fix installer ✅

**Aguardando Decisão:**
- [ ] Decisão 1: Abordagem do installer (A/B/C/D)
- [ ] Decisão 2: Sprint 1 scope completo? (BMAD-001, 002, 004)
- [ ] Decisão 4: Continuar investigação ou começar Sprint 1?

### Sprint 2 (Semanas 3-4)
**Aguardando Decisão:**
- [ ] Decisão 5: BMAD-018 (standards migration)
- [ ] Decisão 6: BMAD-013 (Quality Gate Manager)
- [ ] Decisão 10: BMAD-017 (Service Discovery)
- [ ] Decisão 11: BMAD-019 (Folder consolidation)
- [ ] Decisão 12: BMAD-006 (Orion Orchestrator)

### Sprint 3-4 (Semanas 5-8)
**Aguardando Decisão:**
- [ ] Decisão 8: BMAD-015 (CodeRabbit Phase 1)
- [ ] Decisão 9: BMAD-016 (Template Engine rollout)
- [ ] Decisão 13: BMAD-007 (Dynamic agent loading)
- [ ] Decisão 14: BMAD-008 (Workflow engine)

### Roadmap v2.2 (Q2 2026)
**Aguardando Decisão:**
- [ ] Decisão 3: BMAD-009 (Module refactor)
- [ ] Decisão 7: BMAD-014 (Memory Layer)
- [ ] Decisão 15: BMAD-012 (7 orchestration patterns)

---

## 🎯 AÇÃO IMEDIATA REQUERIDA

**Para desbloquear Sprint 1, você DEVE decidir:**

1. **Decisão 1:** Abordagem do installer (A/B/C recomendado: Híbrido)
2. **Decisão 2:** Sprint 1 scope (A recomendado: Completo)
3. **Decisão 4:** Continuar investigação ou começar? (C recomendado: Híbrido)

**Tempo estimado para decidir:** 15-30 minutos

---

## 📝 Template de Resposta

**Copie e preencha:**

```
=== DECISÕES CRÍTICAS (Bloquei Sprint 1) ===

Decisão 1 (Installer): C - Híbrido
Notas: Fix agora, refactor depois
Deadline: Começar Sprint 1 em 22/01/2025

Decisão 2 (Sprint 1 Scope): A - Completo
Notas: Todos os 4 items BMAD-001 a 004
Deadline: 2 semanas (até 05/02/2025)

Decisão 4 (Investigação): A - Phases 4-5 já feitas
Notas: Começar Sprint 1 imediatamente
Deadline: N/A

=== DECISÕES IMPORTANTES (Não Bloqueantes) ===

Decisão 5 (Standards Migration): A - Aprovar
Decisão 6 (Quality Gate): A - Sprint 2
Decisão 7 (Memory Layer): A - Roadmap v2.2
Decisão 8 (CodeRabbit): A - Phase 1 Sprint 3
Decisão 9 (Template Engine): A - Sprint 3
Decisão 10 (Service Discovery): B - Sprint 3+
Decisão 11 (Folder Consolidation): A - Sprint 2
Decisão 12 (Orion Orchestrator): A - Sprint 2

=== DECISÕES OPCIONAIS (Posso Decidir Depois) ===

[Deixar em branco ou preencher se quiser]

=== NOTAS GERAIS ===

[Suas observações gerais sobre o plano]
```

---

**Aguardando suas decisões para prosseguir!** 🚀

--- 

**Documento criado:** 2025-01-19  
**Por:** AIOS Roundtable Investigation Team  
**Próximo passo:** Pedro decide → Sprint 1 começa


