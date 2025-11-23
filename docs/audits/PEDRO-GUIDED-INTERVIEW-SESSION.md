# Pedro Guided Interview - Sprint Definition Session

**Date:** 2025-01-19  
**Interviewer:** AIOS Investigation Team  
**Interviewee:** Pedro Valério (AIOS Creator)  
**Purpose:** Define EXACT stories for v2.1 sprints & v2.2 backlog  
**Duration:** 20-30 minutes (10 questions)  
**Status:** 🎙️ IN PROGRESS  

---

## 📋 Session Overview

**Goal:** Create single unified document with ALL stories per sprint

**Process:**
1. ✅ Ask 10 guided questions (one at a time)
2. ✅ Record Pedro's decisions
3. ✅ Generate unified sprint plan
4. ✅ River (SM) drafts stories
5. ✅ Pax (PO) validates acceptance criteria

**Expected Output:**
- `SPRINT-PLAN-v2.1-CONSOLIDATED.md` (master document)
- Stories ready for Sprint 1 start

---

## 🎙️ INTERVIEW QUESTIONS

### ❓ DECISÃO 1: Instalador - Qual Abordagem?

**Context:** 
- Instalador quebrado no Windows (confirmado), às vezes Mac/Linux
- BMAD usa manifest + config simplificado + wizard
- Precisamos decidir: fix rápido vs. refactor completo vs. híbrido

**Opções:**

**A) 🚀 Fix Rápido**
- Apenas corrigir `bin/aios-init.js` atual
- Manter estrutura existente
- **Effort:** 1 semana
- **Risco:** BAIXO
- **Benefício:** Users podem instalar IMEDIATAMENTE
- **Sprint:** Sprint 1 (semana 1-2)
- **Stories Impactados:**
  - BMAD-003 (fix installer) → Sprint 1

**B) 🔄 Refactor Completo**
- Reescrever instalador com padrões BMAD
- Implementar manifest + config simplificado JUNTOS
- **Effort:** 2-3 semanas
- **Risco:** MÉDIO
- **Benefício:** Instalador futureproof, mas atrasa desbloquear users
- **Sprint:** Sprint 1 (mais longo, 3-4 semanas)
- **Stories Impactados:**
  - BMAD-001 (manifest) → Sprint 1
  - BMAD-002 (config) → Sprint 1
  - BMAD-003 (installer) → Sprint 1 (reescrito)
  - BMAD-004 (versioning) → Sprint 1

**C) 🎯 Híbrido (RECOMENDADO pelo time)**
- **Sprint 1:** Fix rápido (desbloqueia users JÁ)
- **Sprint 2-3:** Refactor incremental (manifest + config + wizard)
- **Effort:** 1 semana (Sprint 1) + 2 semanas (Sprint 2-3)
- **Risco:** BAIXO
- **Benefício:** Users desbloqueia rápido + melhoria futura garantida
- **Sprint:** Sprint 1 (fix) + Sprint 2-3 (refactor)
- **Stories Impactados:**
  - BMAD-003 (fix installer) → Sprint 1
  - BMAD-001 (manifest) → Sprint 2
  - BMAD-002 (config) → Sprint 2
  - BMAD-004 (versioning) → Sprint 2

---

**❓ PERGUNTA 1:** Qual abordagem você prefere?

**[ ] A - Fix Rápido**  
**[ ] B - Refactor Completo**  
**[✅] C - Híbrido (RECOMENDADO)** ← ESCOLHIDO

**Sua Resposta:** C) Híbrido

**Decisões Adicionais:**
- ✅ Foco em `npx aios-fullstack` (remover npm install -g)
- ✅ MCP System em sprint SEPARADA (não Sprint 1)
- ✅ Sprint 1: MCPs básicos instalação normal (browser, context7, exa, desktop-commander)
- ✅ IDE list atualizado (8 IDEs: Cursor, Windsurf, Zed, Void, Continue, Cline, Replit, OpenCode)
- ✅ AI CLI tools como categoria separada (6 CLIs: Claude Code, Codex, Gemini, Codebuff, Aider, OpenCode)
- ✅ Sistema MCP global: Sprint futura após investigar integração com cada CLI

**Notas:** Abordagem incremental mais segura. Cada CLI tool tem forma diferente de ativar MCPs.

**Impacto na Decisão:**
- Sprint 1 = BMAD-003 (fix) + IDE/CLI lists + MCPs básicos (1-2 semanas)
- Sprint 2 = BMAD-001, 002, 004 (manifest + config + version)
- Sprint futura = MCP System global (após investigação)

---

### ❓ DECISÃO 2: Sprint 1 Scope - Incluir Manifest + Config?

**Context:** 
- Se você escolheu A ou C na Decisão 1, Sprint 1 tem apenas BMAD-003 (1 semana)
- Temos "espaço" para mais 3-4 dias de work
- Manifest (BMAD-001) = 2-3 dias
- Config (BMAD-002) = 1-2 dias
- Versioning (BMAD-004) = 3-4 dias

**Pergunta:** Incluir outros BMAD items no Sprint 1 MESMO se escolheu Fix Rápido?

**Opções:**

**A) ✅ Sprint 1 Completo (Recomendado)**
- BMAD-003 (fix installer) = 1 semana
- BMAD-001 (manifest) = 2-3 dias
- BMAD-002 (config) = 1-2 dias
- BMAD-004 (versioning) = 3-4 dias
- **Total:** 2 semanas (fit perfeitamente)
- **Benefício:** Foundation completa para todos os próximos sprints

**B) 🔴 Apenas Installer**
- BMAD-003 (fix installer) = 1 semana
- Resto → Sprint 2
- **Total:** 1 semana (sprint curto)
- **Benefício:** Users desbloqueia em 1 semana (mais rápido)

**C) 🟡 Installer + Manifest**
- BMAD-003 (fix installer) = 1 semana
- BMAD-001 (manifest) = 2-3 dias
- **Total:** 1.5 semanas
- **Benefício:** Instalador + automação futura

**D) 🔵 Customizar**
- Você escolhe quais items incluir

---

**❓ PERGUNTA 2:** Qual scope para Sprint 1?

**[ ] A - Sprint 1 Completo (4 items, 2 semanas)**  
**[ ] B - Apenas Installer (1 item, 1 semana)**  
**[ ] C - Installer + Manifest (2 items, 1.5 semanas)**  
**[ ] D - Customizar: _________________________**

**Sua Resposta:** _______________________

**Notas/Dúvidas:** _______________________

**Impacto na Decisão:**
- Sprint 1 duration: 1 semana (B) vs. 1.5 semanas (C) vs. 2 semanas (A)
- Foundation para Sprint 2: fraca (B) vs. média (C) vs. forte (A)

---

### ❓ DECISÃO 3: Module Refactor - Quando Fazer?

**Context:**
- BMAD usa module architecture: `core/`, `bmb/`, `bmm/`, `cis/`
- AIOS hoje é flat: tudo em `.aios-core/`
- BMAD-009 propõe refactor similar para AIOS
- **RISCO:** HIGH (major refactor, breaking changes possíveis)

**Análise:**
- **Benefício:** Melhor organização, escalabilidade, manutenibilidade
- **Custo:** 1 semana de work, risk de quebrar imports
- **Alternativa:** Fazer em v2.2 (major version, expected breaking changes)

**Opções:**

**A) 🚫 Não Fazer Agora (Recomendado)**
- Muito disruptivo para v2.1
- Deixar para v2.2 (Q2 2026)
- **Sprint:** v2.2
- **Risco:** ZERO (não mexe)

**B) 🎯 Sprint 3-4 (Após Foundation)**
- Fazer depois de installer + manifest + config estabilizarem
- **Sprint:** Sprint 3 ou 4
- **Risco:** MÉDIO

**C) 🔥 Agora (Sprint 2)**
- Logo após installer fix
- **Sprint:** Sprint 2
- **Risco:** ALTO (pode impactar outros stories)

**D) 📅 v2.2 como Major Version (Recomendado pelo time)**
- Tratar como breaking change
- Major version bump (v2.1 → v2.2)
- **Sprint:** v2.2 (Q2 2026)
- **Risco:** BAIXO (usuários já esperam breaking changes em major versions)

---

**❓ PERGUNTA 3:** Quando fazer Module Refactor?

**[ ] A - Não fazer agora (v2.2)**  
**[ ] B - Sprint 3-4 (após foundation)**  
**[ ] C - Sprint 2 (logo após installer)**  
**[ ] D - v2.2 como major version (RECOMENDADO)**

**Sua Resposta:** _______________________

**Notas/Dúvidas:** _______________________

**Impacto na Decisão:**
- Se A ou D: BMAD-009 vai para v2.2 backlog
- Se B: BMAD-009 → Sprint 3 ou 4
- Se C: BMAD-009 → Sprint 2 (adiciona 1 semana ao Sprint 2)

---

### ❓ DECISÃO 4: Agents - PM/SM Merge ou Separados?

**Context:**
- Audit encontrou que PM tem apenas 5% de uso
- SM tem 15% de uso
- Alguns frameworks combinam ambos em "Product Owner" único
- Outros mantêm separação clara

**Análise do Audit:**
- **Contra Merge:** Roles são diferentes (strategy vs. execution)
- **A Favor Merge:** Reduz complexidade, PM pouco usado
- **Alternativa:** Expansion Pack (PM + SM juntos como opção)

**Opções:**

**A) ✅ Manter Separados (Recomendado pelo audit)**
- Morgan (PM) continua focado em PRD + strategy
- River (SM) continua focado em stories + sprint management
- **Effort:** 0 (nada muda)
- **Benefício:** Mantém separation of concerns

**B) 🔄 Merge em Product Owner Único**
- Criar novo agent "Product Owner" combinando PM + SM
- **Effort:** 1 semana (criar novo agent + migrar tasks)
- **Sprint:** Sprint 3
- **Risco:** Pode confundir users acostumados com separação

**C) 📦 Criar Expansion Pack "Product Management"**
- Manter Morgan + River separados (core)
- Criar pack opcional que combina ambos
- **Effort:** 2 dias (criar pack)
- **Sprint:** Sprint 4-6
- **Benefício:** Users escolhem

---

**❓ PERGUNTA 4:** O que fazer com PM + SM?

**[ ] A - Manter separados (RECOMENDADO)**  
**[ ] B - Merge em Product Owner único**  
**[ ] C - Criar Expansion Pack**

**Sua Resposta:** _______________________

**Notas/Dúvidas:** _______________________

**Impacto na Decisão:**
- Se A: Nenhum story adicional
- Se B: Adiciona story "Merge PM/SM" → Sprint 3
- Se C: Adiciona story "Product Management Pack" → Sprint 4-6

---

### ❓ DECISÃO 5: Dara (Data Engineer) - Expandir ou Manter?

**Context:**
- Audit encontrou Dara com <1% de uso em stories
- MAS: Dara é CRÍTICO em projetos reais (ttcx-workflow-api, aios-api-mvp)
- Função upstream: Define schema antes de todos os outros agents

**Análise:**
- **Baixo uso em stories:** Normal (schema é definido UMA VEZ no início)
- **Alto valor:** Consistência garantida quando presente
- **Problema:** Documentação de "quando usar" é fraca

**Opções:**

**A) ✅ Manter como Está + Melhorar Docs (Recomendado)**
- Dara continua como agent
- Melhorar documentação de casos de uso
- **Effort:** 2 horas (update docs)
- **Sprint:** Sprint 2
- **Benefício:** Low effort, high impact

**B) 🔄 Criar Expansion Pack "Database-First"**
- Dara + Schema Validator + Migration Generator
- **Effort:** 1 semana
- **Sprint:** Sprint 4-6
- **Benefício:** Full database-first workflow

**C) 🎯 Adicionar ao Aria (Architect)**
- Merge Dara functions em Aria
- **Effort:** 3 dias
- **Sprint:** Sprint 3
- **Risco:** Aria fica muito carregado

---

**❓ PERGUNTA 5:** O que fazer com Dara?

**[ ] A - Manter + melhorar docs (RECOMENDADO)**  
**[ ] B - Criar Database-First Expansion Pack**  
**[ ] C - Merge em Aria**

**Sua Resposta:** _______________________

**Notas/Dúvidas:** _______________________

**Impacto na Decisão:**
- Se A: Adiciona micro-story "Improve Dara docs" → Sprint 2
- Se B: Adiciona story "Database-First Pack" → Sprint 4-6
- Se C: Adiciona story "Merge Dara → Aria" → Sprint 3

---

### ❓ DECISÃO 6: Memory Layer - Sprint 2 ou v2.2?

**Context:**
- BMAD-014 (Memory Layer) é HIGH priority
- **Effort:** 3-4 semanas (GRANDE)
- Service Layer Audit marcou como "not connected yet"

**Análise:**
- **Benefício:** Context retention, smarter agents, reduced token usage
- **Custo:** 3-4 semanas de development
- **Alternativa:** Deixar para v2.2 quando module refactor estiver pronto

**Opções:**

**A) 📅 v2.2 (Recomendado)**
- Major feature para major version
- Aguardar module refactor (BMAD-009)
- **Sprint:** v2.2 (Q2 2026)
- **Benefício:** Tempo para fazer direito

**B) 🎯 Sprint 4-6 (Tentar ainda em v2.1)**
- Implementar no final de v2.1
- **Sprint:** Sprint 4-6 (semanas 7-12)
- **Risco:** Pode atrasar outros patterns

**C) 🔥 Sprint 2 (Early)**
- Começar logo após installer
- **Sprint:** Sprint 2
- **Risco:** ALTO (muito early, foundation ainda fraca)

---

**❓ PERGUNTA 6:** Quando implementar Memory Layer?

**[ ] A - v2.2 (Q2 2026) - RECOMENDADO**  
**[ ] B - Sprint 4-6 (tentar em v2.1)**  
**[ ] C - Sprint 2 (early)**

**Sua Resposta:** _______________________

**Notas/Dúvidas:** _______________________

**Impacto na Decisão:**
- Se A: BMAD-014 → v2.2 backlog
- Se B: BMAD-014 → Sprint 4-6 (adiciona 3-4 semanas ao final de v2.1)
- Se C: BMAD-014 → Sprint 2 (Sprint 2 fica 5-6 semanas)

---

### ❓ DECISÃO 7: CodeRabbit - Free ou Paid Integration?

**Context:**
- BMAD-015 propõe CodeRabbit integration
- **Phase 1 (Free):** IDE extension para análise local
- **Phase 2 (Paid):** GitHub App para CI/CD + team reviews

**Análise:**
- Free tier: Good para desenvolvimento local
- Paid tier: Better para teams + automation

**Opções:**

**A) 🎯 Phase 1 Apenas (Free Tier) - Recomendado**
- IDE extension integration
- **Effort:** 1 semana
- **Sprint:** Sprint 3
- **Cost:** $0
- **Benefício:** QA automation local

**B) ✅ Both Phases (Free + Paid)**
- Phase 1: IDE extension (Sprint 3)
- Phase 2: GitHub App (Sprint 4-6)
- **Effort:** 3 semanas total
- **Sprint:** Sprint 3 + Sprint 4-6
- **Cost:** ~$10-15/month per user (GitHub App)
- **Benefício:** Full automation

**C) 📅 Phase 1 Now, Phase 2 Later (v2.2)**
- Phase 1: Sprint 3
- Phase 2: v2.2 (when teams scale)
- **Effort:** 1 semana (Sprint 3) + 2 semanas (v2.2)
- **Benefício:** Gradual adoption

---

**❓ PERGUNTA 7:** CodeRabbit integration scope?

**[ ] A - Phase 1 apenas (Free, Sprint 3)**  
**[ ] B - Both phases (Free Sprint 3 + Paid Sprint 4-6)**  
**[ ] C - Phase 1 now, Phase 2 later (v2.2)**

**Sua Resposta:** _______________________

**Notas/Dúvidas:** _______________________

**Impacto na Decisão:**
- Se A: BMAD-015 → Sprint 3 (1 story, 1 semana)
- Se B: BMAD-015 → Sprint 3 + Sprint 4-6 (2 stories, 3 semanas total)
- Se C: BMAD-015-Phase1 → Sprint 3, BMAD-015-Phase2 → v2.2

---

### ❓ DECISÃO 8: Quality Gates - Unified Manager ou Keep Separate?

**Context:**
- Service Layer Audit encontrou 15+ quality gate scripts espalhados
- BMAD-013 propõe criar `quality-gate-manager.js` unificado

**Análise:**
- **Benefício Unified:** Single entry point, easier maintenance
- **Custo:** 1 semana de refactor
- **Alternativa:** Manter separados mas documentar melhor

**Opções:**

**A) ✅ Unified Manager (Recomendado)**
- Criar `quality-gate-manager.js`
- Consolidar 15+ scripts
- **Effort:** 1 semana
- **Sprint:** Sprint 2
- **Benefício:** Manutenção mais fácil

**B) 🔄 Keep Separate + Improve Docs**
- Manter scripts separados
- Documentar melhor quando usar cada um
- **Effort:** 1 dia
- **Sprint:** Sprint 2
- **Benefício:** Less disruption

**C) 📅 Defer to v2.2**
- Não mexer agora
- Tratar como refactor em v2.2
- **Sprint:** v2.2
- **Risco:** Scripts continuam espalhados

---

**❓ PERGUNTA 8:** Abordagem para Quality Gates?

**[ ] A - Unified Manager (RECOMENDADO)**  
**[ ] B - Keep separate + docs**  
**[ ] C - Defer to v2.2**

**Sua Resposta:** _______________________

**Notas/Dúvidas:** _______________________

**Impacto na Decisão:**
- Se A: BMAD-013 → Sprint 2 (1 semana de effort)
- Se B: Micro-story "QA docs" → Sprint 2 (1 dia)
- Se C: BMAD-013 → v2.2 backlog

---

### ❓ DECISÃO 9: Documentation Structure - Move Standards Now ou Later?

**Context:**
- Project Structure Analysis recomendou:
  - Mover `docs/standards/` → `.aios-core/docs/`
  - Consolidar 26 folders → 20 folders
- **CRITICAL:** BMAD-018 (move standards) = 2 horas apenas

**Análise:**
- **Benefício:** Clareza sobre framework vs. project docs
- **Custo:** 2 horas (TRIVIAL)
- **Risk:** Quebrar links (mas facilmente fixável)

**Opções:**

**A) ✅ Move Now (Sprint 2) - RECOMENDADO**
- BMAD-018 → Sprint 2
- **Effort:** 2 horas
- **Benefício:** Clean structure desde o início

**B) 🔄 Sprint 3 (After Foundation)**
- Aguardar Sprint 1+2 complete
- **Sprint:** Sprint 3
- **Benefício:** Less rush

**C) 📅 v2.2 (Major Version)**
- Tratar como breaking change
- **Sprint:** v2.2
- **Risco:** Confusion continues

---

**❓ PERGUNTA 9:** Quando mover standards/?

**[ ] A - Sprint 2 (2 horas, RECOMENDADO)**  
**[ ] B - Sprint 3 (after foundation)**  
**[ ] C - v2.2 (major version)**

**Sua Resposta:** _______________________

**Notas/Dúvidas:** _______________________

**Impacto na Decisão:**
- Se A: BMAD-018 → Sprint 2 (trivial effort)
- Se B: BMAD-018 → Sprint 3
- Se C: BMAD-018 → v2.2 backlog

---

### ❓ DECISÃO 10: Orchestration Patterns - Quais Priorizar?

**Context:**
- BMAD-012 propõe 7 novos patterns
- Story 6.1.15 audit identificou 10 patterns total
- **Patterns Já Implementados:** Sequential, Fork/Join (Story 6.1.12), Organizer-Worker (Story 6.1.13)
- **Patterns Faltando:** 7 patterns (Consensus, Layered, Producer-Reviewer, Supervisor-Worker, Group Chat, Hierarchical, Magnetic)

**Análise:**
- Todos são úteis, mas alguns mais que outros
- Implementação incremental recomendada

**Prioridade Sugerida pelo Audit:**
1. **Consensus Mode** (HIGH) - Critical decisions, reduce hallucinations
2. **Producer-Reviewer Loop** (HIGH) - Quality assurance workflows
3. **Supervisor-Worker** (MEDIUM) - já implementado como Organizer-Worker
4. **Group Chat/Mesh** (MEDIUM) - Brainstorming, async collaboration
5. **Hierarchical Teams** (LOW) - Large teams (100+ agents)
6. **Layered Orchestration** (LOW) - Complex multi-layer systems
7. **Magnetic/Dynamic** (LOW) - Self-organizing agents

**Opções:**

**A) ✅ Top 4 Patterns (Sprint 4-6) - RECOMENDADO**
- Consensus Mode
- Producer-Reviewer Loop
- Group Chat/Mesh
- Layered Orchestration
- **Effort:** 2 semanas
- **Sprint:** Sprint 4-6

**B) 🎯 All 7 Patterns (Sprint 4-6)**
- Implementar todos
- **Effort:** 3 semanas
- **Sprint:** Sprint 4-6
- **Risco:** Sprint 4-6 fica muito longo

**C) 🔄 Top 2 Now, Rest v2.2**
- Sprint 4-6: Consensus + Producer-Reviewer
- v2.2: Outros 5 patterns
- **Effort:** 1 semana (Sprint 4-6) + 2 semanas (v2.2)
- **Benefício:** Foco nos mais críticos

---

**❓ PERGUNTA 10:** Quais patterns priorizar?

**[ ] A - Top 4 patterns (RECOMENDADO)**  
**[ ] B - All 7 patterns**  
**[ ] C - Top 2 now, rest v2.2**

**Sua Resposta:** _______________________

**Notas/Dúvidas:** _______________________

**Patterns você quer garantir:** _______________________

**Impacto na Decisão:**
- Se A: BMAD-012 → Sprint 4-6 (4 patterns, 2 semanas)
- Se B: BMAD-012 → Sprint 4-6 (7 patterns, 3 semanas)
- Se C: BMAD-012 (2 patterns) → Sprint 4-6, resto → v2.2

---

## 📊 SESSION SUMMARY (To Be Filled After Interview)

**Status:** ⏸️ Awaiting Pedro's Responses

**When Complete:**
- ✅ Consolidate all decisions
- ✅ Generate `SPRINT-PLAN-v2.1-CONSOLIDATED.md`
- ✅ Call River (SM) to draft stories
- ✅ Call Pax (PO) to validate

---

**Session Started:** 2025-01-19  
**Interviewer:** AIOS Investigation Team  
**Next Step:** Pedro responds to 10 questions above  


