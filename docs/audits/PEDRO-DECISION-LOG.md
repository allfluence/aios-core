# Pedro Decision Log - Installer V2

**Date:** 2025-01-19  
**Session:** Guided Interview for v2.1 Sprints  

---

## ✅ DECISÃO 1: Installer Approach

**Pergunta:** Qual abordagem para o instalador?

**Opções:**
- A) Fix Rápido (1 semana)
- B) Refactor Completo (2-3 semanas)
- C) Híbrido (fix + refactor incremental)

**Decisão:** ✅ **C) Híbrido**

**Decisões Adicionais:**
1. ✅ **Foco em npx:** Remover dependência de `npm install -g aios-fullstack`
2. ✅ **MCP System em Sprint Separada:** Não implementar sistema global no Sprint 1
3. ✅ **MCPs Básicos Primeiro:** Sprint 1 terá 4 MCPs com instalação normal no projeto:
   - Browser (playwright)
   - Context7
   - Exa
   - Desktop Commander
4. ✅ **IDE List Atualizado:** 8 IDEs disponíveis (Cursor, Windsurf, Zed, Void, Continue, Cline, Replit, OpenCode)
5. ✅ **AI CLI Tools:** Nova categoria separada com 6 CLIs (Claude Code, Codex, Gemini, Codebuff, Aider, OpenCode)
6. ✅ **Sistema MCP Global:** Sprint futura após investigar como cada CLI tool integra com MCPs

**Rationale:**
- Abordagem incremental é mais segura
- Cada CLI tool (Claude Code, Codex, Gemini) tem forma diferente de ativar MCPs
- Precisamos investigar antes de implementar sistema global
- 4 MCPs básicos são suficientes para começar

**Impacto:**
- Sprint 1: BMAD-003 (fix) + IDE/CLI lists + MCPs básicos (1-2 semanas)
- Sprint 2: BMAD-001, 002, 004 (manifest + config + version)
- Sprint futura: Investigar MCP integration + implementar sistema global

---

## ⏸️ DECISÃO 2: Sprint 1 Scope

**Pergunta:** Qual escopo exato para Sprint 1?

**Contexto:**
- Sprint 1 foca em FIX crítico do instalador
- Decisão 1 definiu: MCPs básicos, IDE/CLI lists atualizados
- Precisamos definir se incluímos dependency checking e UX enhancements

**Opções:**

### A) 🎯 Sprint 1 MÍNIMO (1 semana) ← RECOMENDADO

**Escopo:**
- ✅ Fix Windows bugs
- ✅ Fix git ignore rules
- ✅ Add validation
- ✅ Cross-platform testing
- ✅ IDE list atualizado (8 IDEs)
- ✅ AI CLI tools selection (6 CLIs)
- ✅ MCPs básicos (4 tools) - instalação normal no projeto

**Effort:** 1 semana  
**Risco:** BAIXO  
**Benefício:** Users podem instalar IMEDIATAMENTE

**Roadmap Sugerido:**
- Sprint 1 (1 sem): Fix + IDE/CLI + MCPs básicos
- Sprint 2 (2 sem): Manifest + Config + Version + Dependency Checking
- Sprint 3 (2 sem): Investigar MCP integration
- Sprint 4 (1 sem): Sistema MCP global + migração

---

### B) 🔄 Sprint 1 MÉDIO (2 semanas)

**Escopo:**
- ✅ Tudo de A) +
- ✅ CLI dependency checking (gh, supabase, psql, docker)
- ✅ Auto-install missing tools

**Effort:** 2 semanas  
**Risco:** MÉDIO  
**Benefício:** Instalação mais completa, menos problemas depois

**Roadmap Sugerido:**
- Sprint 1 (2 sem): Fix + IDE/CLI + MCPs + Dependency Checking
- Sprint 2 (2 sem): Manifest + Config + Version
- Sprint 3 (2 sem): Investigar MCP integration
- Sprint 4 (1 sem): Sistema MCP global

---

### C) 🚀 Sprint 1 COMPLETO (3 semanas)

**Escopo:**
- ✅ Tudo de B) +
- ✅ Progress bar durante instalação
- ✅ Time estimation
- ✅ Better error messages
- ✅ Rollback on failure (básico)

**Effort:** 3 semanas  
**Risco:** MÉDIO-ALTO  
**Benefício:** Experiência profissional desde o início

**Roadmap Sugerido:**
- Sprint 1 (3 sem): Fix + IDE/CLI + MCPs + Dependency + UX
- Sprint 2 (2 sem): Manifest + Config + Version
- Sprint 3 (2 sem): Investigar MCP integration
- Sprint 4 (1 sem): Sistema MCP global

---

**Decisão:** ✅ **A) Sprint 1 MÍNIMO (1 semana)**

**Escopo Sprint 1:**
- ✅ Fix Windows bugs
- ✅ Fix git ignore rules
- ✅ Add validation
- ✅ Cross-platform testing
- ✅ IDE list atualizado (8 IDEs)
- ✅ AI CLI tools selection (6 CLIs)
- ✅ MCPs básicos (4 tools) - instalação normal no projeto

**Features Adicionais Mapeadas para Sprints Futuros:**
- **Sprint 2:** CLI dependency checking + auto-install (da opção B)
- **Sprint 3:** Progress bar + time estimation + better errors + rollback (da opção C)

**Rationale:**
- Desbloqueia users RAPIDAMENTE (1 semana)
- Baixo risco
- MCPs básicos suficientes para começar
- Features B e C garantidas em sprints posteriores
- Foco no essencial primeiro

**Impacto:**
- Sprint 1 (1 sem): Fix + IDE/CLI + MCPs básicos → Users podem instalar!
- Sprint 2 (2 sem): Manifest + Config + Version + **Dependency Checking**
- Sprint 3 (1-2 sem): **Enhanced UX** (progress bar, time est, rollback)
- Sprint 4 (2 sem): Investigar MCP integration com cada CLI
- Sprint 5 (1 sem): Sistema MCP global + migração

---

---

## ⏸️ DECISÃO 3: Module Architecture

**Pergunta:** Como organizar a arquitetura do AIOS em módulos?

**Contexto:**
- Atualmente tudo está em `.aios-core/` (agents, tasks, templates, scripts)
- BMAD analysis recomenda modularização
- Facilita manutenção e escalabilidade
- Permite loading dinâmico (reduz contexto)

**Análise BMAD:**
- BMAD usa estrutura modular simples: `.bmad/core/`, `.bmad/bmb/`
- Cada módulo é independente
- Agentes carregados sob demanda
- Configuração centralizada

**Proposta de Módulos para AIOS:**

### A) 🎯 Modular por Domínio (RECOMENDADO)

**Estrutura:**
```
.aios-core/
├── modules/
│   ├── core/              # Core system (Orion)
│   │   ├── agents/
│   │   ├── tasks/
│   │   └── workflows/
│   ├── development/       # Dev agents (Dex, Quinn)
│   │   ├── agents/
│   │   ├── tasks/
│   │   └── workflows/
│   ├── product/           # Product agents (Morgan, Pax, River)
│   │   ├── agents/
│   │   ├── tasks/
│   │   └── workflows/
│   ├── architecture/      # Architecture agents (Aria, Dara)
│   │   ├── agents/
│   │   ├── tasks/
│   │   └── workflows/
│   ├── design/            # Design agents (Uma)
│   │   ├── agents/
│   │   ├── tasks/
│   │   └── workflows/
│   ├── operations/        # Ops agents (Gage)
│   │   ├── agents/
│   │   ├── tasks/
│   │   └── workflows/
│   └── research/          # Research agents (Atlas)
│       ├── agents/
│       ├── tasks/
│       └── workflows/
├── shared/                # Shared resources
│   ├── templates/
│   ├── checklists/
│   └── data/
└── system/                # System configs
    ├── llm.yaml
    ├── agents.yaml
    └── workflows.yaml
```

**Benefícios:**
- ✅ Agrupamento lógico por domínio
- ✅ Fácil de entender e navegar
- ✅ Loading dinâmico por módulo
- ✅ Expansão packs como módulos adicionais

**Esforço:** 2-3 dias de refactor  
**Risco:** MÉDIO (requer migração)

---

### B) 🔄 Modular por Tipo

**Estrutura:**
```
.aios-core/
├── agents/
│   ├── core/
│   ├── development/
│   ├── product/
│   └── ...
├── tasks/
│   ├── core/
│   ├── development/
│   ├── product/
│   └── ...
├── workflows/
│   ├── greenfield/
│   ├── brownfield/
│   └── ...
└── templates/
    ├── stories/
    ├── prd/
    └── ...
```

**Benefícios:**
- ✅ Mantém estrutura atual (menos refactor)
- ✅ Subpastas organizam por domínio
- ✅ Mais simples de implementar

**Esforço:** 1 dia de refactor  
**Risco:** BAIXO

---

### C) 📦 Sem Modularização (Keep Current)

**Estrutura:**
```
.aios-core/
├── agents/
├── tasks/
├── workflows/
├── templates/
└── scripts/
```

**Benefícios:**
- ✅ Nenhuma mudança necessária
- ✅ Risco zero

**Desvantagens:**
- ❌ Dificulta manutenção conforme cresce
- ❌ Loading sempre carrega tudo
- ❌ Contexto maior para LLM

**Esforço:** 0 dias  
**Risco:** ZERO (curto prazo), ALTO (longo prazo)

---

**💡 RECOMENDAÇÃO:** **A) Modular por Domínio**

**Por quê?**
1. ✅ AIOS vai crescer (mais agents, tasks, workflows)
2. ✅ Loading dinâmico reduz contexto LLM
3. ✅ Expansion packs se integram naturalmente
4. ✅ Facilita onboarding de novos devs
5. ✅ Manutenção mais fácil a longo prazo

**Quando implementar?**
- **Opção 1:** Sprint 2 (junto com manifest system) ← RECOMENDADO
- **Opção 2:** Sprint 4 (após MCP research)
- **Opção 3:** v2.2 (não v2.1)

---

**❓ PERGUNTA 3A:** Qual estrutura de módulos?

**[✅] A - Modular por Domínio (RECOMENDADO)** ← ESCOLHIDO  
**[ ] B - Modular por Tipo**  
**[ ] C - Sem Modularização (keep current)**

**Sua Resposta:** A) Modular por Domínio

**❓ PERGUNTA 3B:** Quando implementar?

**[✅] Sprint 2 (com manifest)** ← ESCOLHIDO  
**[ ] Sprint 4 (após MCP)**  
**[ ] v2.2 (não v2.1)**

**Sua Resposta:** Sprint 2

**Decisão Baseada Em:** Roundtable Session (Pedro Valério, Brad Frost, Marty Cagan, Paul Graham)

**Consenso Unânime:**
- ✅ **Scalability:** 11 agents → 30+ em 6 meses (flat não escala)
- ✅ **Usability:** Desenvolvedores encontram agentes instantly
- ✅ **Strategic Timing:** Sprint 2 = manifest implementation (uma migração coordenada)
- ✅ **Atomic Design Principles:** Módulos = design system for code
- ✅ **Product Maturity:** AIOS não é mais MVP, hora de investir em structure

**Estrutura Aprovada:**
```
.aios-core/
├── modules/
│   ├── core/           # Orion
│   ├── development/    # Dex, Quinn
│   ├── product/        # Morgan, Pax, River
│   ├── architecture/   # Aria, Dara
│   ├── design/         # Uma
│   ├── operations/     # Gage
│   └── research/       # Atlas
├── shared/             # Templates, checklists, data
└── system/             # Configs (llm.yaml, agents.yaml)
```

**Impacto:**
- Sprint 2 (2 sem): Manifest + Config + Version + **Module Refactor**
- Effort adicional: 2-3 dias (migração + validação)
- Risco: MÉDIO (mitigado por manifest tracking)

**Notas:** Installer também será atualizado para carregar de estrutura modular

---

---

## ⏸️ DECISÃO 4: Quality Gates & CodeRabbit Integration

**Pergunta:** Como configurar Quality Gates e integração com CodeRabbit?

**Contexto:**
- CodeRabbit pode rodar localmente (free IDE extension) + no GitHub (app)
- AIOS tem Quinn (QA agent) que precisa de ferramentas
- Quality gates são críticos para manter qualidade do código
- Precisamos definir quando usar automação vs. revisão humana

**Análise Atual:**
- Investigation descobriu que CodeRabbit tem 2 modos:
  - **IDE Extension (Free):** Análise local durante desenvolvimento
  - **GitHub App:** Análise de PRs, CI/CD integration
- Quinn pode orquestrar CodeRabbit para QA automatizado
- Service Layer audit identificou Quality Gate Manager desconectado

**Opções de Integração:**

### A) 🎯 Integração Completa (RECOMENDADO)

**Setup:**
```
IDE Extension (Local):
- Instalado durante aios install
- Quinn usa para análise local durante dev
- Feedback imediato no código

GitHub App (Repo):
- Configurado no repositório do projeto
- Roda em PRs automaticamente
- Gera reports para Quinn revisar
```

**Benefícios:**
- ✅ Feedback loop completo (local + CI/CD)
- ✅ Quinn orquestra ambos (local analysis + PR review)
- ✅ Desenvolvedores veem issues antes de commit
- ✅ Time vê issues antes de merge

**Quality Gates Propostos:**
```yaml
Pre-Commit (Local):
  - Linter (ESLint/Prettier)
  - TypeScript compilation
  - Unit tests
  - CodeRabbit local analysis

Pre-PR (GitHub Actions):
  - All pre-commit checks
  - Integration tests
  - CodeRabbit PR analysis
  - Coverage threshold

Pre-Merge (Quinn Review):
  - CodeRabbit report review
  - Acceptance criteria validation
  - Manual QA if needed
  - Story DoD checklist
```

**Effort:** 3-4 dias (Sprint 3)  
**Risco:** MÉDIO (configuração complexa mas bem documentada)

---

### B) 🔄 GitHub App Apenas

**Setup:**
```
Apenas GitHub App:
- Configurado no repositório
- Roda em PRs
- Quinn revisa reports
```

**Benefícios:**
- ✅ Mais simples de configurar
- ✅ Centralizado (tudo no GitHub)
- ✅ Não requer instalação local

**Desvantagens:**
- ❌ Feedback apenas no PR (tarde demais)
- ❌ Desenvolvedores não veem issues localmente
- ❌ Mais round trips (commit → PR → fix → commit)

**Effort:** 1-2 dias (Sprint 3)  
**Risco:** BAIXO

---

### C) 📦 Apenas IDE Extension

**Setup:**
```
Apenas IDE Extension:
- Instalado localmente
- Quinn usa para análise
- Sem integração GitHub
```

**Benefícios:**
- ✅ Feedback imediato
- ✅ Free (sem custo)
- ✅ Privacy (tudo local)

**Desvantagens:**
- ❌ Sem enforcement (depende do dev usar)
- ❌ Sem reports centralizados
- ❌ Sem integração CI/CD

**Effort:** 1 dia (Sprint 3)  
**Risco:** BAIXO

---

### D) 🎨 Quinn Manual + Ferramentas

**Setup:**
```
Sem CodeRabbit:
- Quinn usa apenas ferramentas tradicionais
  - ESLint
  - TypeScript
  - Jest (coverage)
  - Manual review
```

**Benefícios:**
- ✅ Zero dependência externa
- ✅ Controle total

**Desvantagens:**
- ❌ Menos automação
- ❌ Quinn precisa fazer mais trabalho manual
- ❌ Sem insights de IA

**Effort:** 0 dias (keep current)  
**Risco:** ZERO (curto prazo), ALTO (longo prazo - escala mal)

---

**💡 RECOMENDAÇÃO:** **A) Integração Completa**

**Por quê?**
1. ✅ Melhor UX para desenvolvedores (feedback local)
2. ✅ Enforcement via PR (nada passa sem review)
3. ✅ Quinn pode orquestrar ambos
4. ✅ Escala bem com time crescendo
5. ✅ IDE extension é free, GitHub app tem free tier

**Quality Gate Strategy:**
```
Layer 1 (Local - Immediate):
- Linter + CodeRabbit extension
- Feedback em segundos
- Dev corrige antes de commit

Layer 2 (PR - Automated):
- Tests + CodeRabbit app
- Feedback em minutos
- Bloqueia merge se falhar

Layer 3 (Quinn - Human):
- Review CodeRabbit reports
- Validate acceptance criteria
- Final approval
```

**Quando implementar?**
- **Sprint 3** (Enhanced UX)
- Por quê? Faz parte de melhorar experiência de qualidade
- Trabalha bem com rollback mechanism (se algo quebrar, rollback)

---

**❓ PERGUNTA 4A:** Qual integração CodeRabbit?

**[✅] A - Integração Completa (local + GitHub) - RECOMENDADO** ← ESCOLHIDO  
**[ ] B - GitHub App apenas**  
**[ ] C - IDE Extension apenas**  
**[ ] D - Quinn manual (sem CodeRabbit)**

**Sua Resposta:** A) Integração Completa

**❓ PERGUNTA 4B:** Quality Gates - Quantos layers?

**[✅] 3 Layers (Local + PR + Human) - RECOMENDADO** ← ESCOLHIDO  
**[ ] 2 Layers (PR + Human)**  
**[ ] 1 Layer (Apenas Human)**

**Sua Resposta:** A) 3 Layers

**Notas/Decisões Adicionais:**

**Investigação Completa Realizada:**
- ✅ Pesquisa Exa sobre CodeRabbit workflows (local + GitHub)
- ✅ Context7 documentation sobre setup e integração
- ✅ GitHub CLI search para best practices de quality gates
- ✅ Análise de AIOS-LIVRO-DE-OURO.md e AIOS-FRAMEWORK-MASTER.md
- ✅ Análise dos 4 tipos de executores (Agente, Worker, Humano, Clone)

**Estrutura dos 3 Layers:**
```yaml
Layer 1 (Local - Immediate):
  - ESLint/Prettier: Worker
  - TypeScript: Worker  
  - Unit tests: Worker
  - CodeRabbit IDE Extension: Agente
  → Feedback em SEGUNDOS
  → 70% dos bugs detectados

Layer 2 (PR - Automated):
  - Integration tests: Worker
  - CodeRabbit GitHub App: Agente
  - Security scan: Worker
  - Performance checks: Worker
  → Feedback em MINUTOS
  → 25% dos bugs detectados

Layer 3 (Human - Final):
  - Code review: Humano
  - Architecture validation: Clone (se aplicável)
  - Final approval: Humano
  → Feedback em HORAS/DIAS
  → 5% edge cases (julgamento crítico)
```

**Setup Flow Definido:**

**Sprint 1: Layer 1 Funciona Imediatamente**
- ✅ ESLint/Prettier/TS/Tests configurados no `aios init`
- ✅ Prompt para instalar CodeRabbit IDE extension (opcional)
- ✅ Funciona SEM repositório GitHub

**Sprint 2+: Layer 2 Requer Setup GitHub**
- ❌ Precisa repositório no GitHub
- ❌ Precisa instalar CodeRabbit GitHub App
- 🔧 Novo comando: `aios setup-github`
  - Cria repo (se não existir)
  - Instala CodeRabbit App
  - Configura `.coderabbit.yaml`
  - Cria GitHub Actions workflow

**Alinhamento com AIOS Framework:**
- ✅ Mapeamento dos 4 executores (Agente, Worker, Humano, Clone)
- ✅ Layer 1 e 2 não dependem de humanos (100% automático)
- ✅ Layer 3 usa julgamento humano + clones para validação metodológica
- ✅ "Estrutura é sagrada, tom é flexível" aplicado em quality gates

**Rationale:**
- **Shift-Left Testing:** 70% dos bugs em Layer 1 (feedback imediato)
- **Fail Fast:** Desenvolvedores corrigem antes de commit
- **Human-in-the-Loop:** Humanos validam "soul" e "intent", não sintaxe
- **Clones para Metodologia:** Ex: Brad Frost valida Atomic Design
- **Alinha com indústria:** 3 layers é sweet spot (não 2, não 4)

**Decisão Baseada Em:**
- 🔬 Relatório completo: `docs/audits/DECISION-4-QUALITY-GATES-INVESTIGATION-REPORT.md`
- 🔬 Pesquisa Exa: CodeRabbit workflows, 3-layer quality gates
- 📚 Context7: CodeRabbit official docs
- 🐙 GitHub CLI: Best practices repositories
- 🧬 AIOS Framework: 4 executores, structure is sacred

**Impacto:**
- Sprint 1 (1 sem): Layer 1 (local) implementado ← Mínimo viável
- Sprint 2 (2 sem): Module refactor + Config + manifest
- Sprint 3 (1-2 sem): Layer 2 (GitHub) + `aios setup-github` command
- Sprint 4+: Layer 3 avançado (clones metodológicos)

---

---

## ✅ DECISÃO 5: Framework Standards Migration (BMAD-018)

**Pergunta:** Migrar `docs/standards/` para `.aios-core/docs/standards/`?

**Contexto:**
- Project Structure Analysis identificou confusão conceitual
- `docs/standards/` contém framework standards (AIOS-FRAMEWORK-MASTER.md, AIOS-LIVRO-DE-OURO.md)
- Deveria estar em `.aios-core/docs/standards/` (framework core)
- `docs/` deveria conter apenas documentação do projeto do usuário

**Problema Atual:**
- ❌ Confunde usuários: "Isso é doc do meu projeto ou do framework?"
- ❌ Versionamento: Framework standards devem evoluir independentemente
- ❌ Separation of Concerns: Framework core !== User project

**Opções:**

### A) ✅ Aprovar Migration (RECOMENDADO)

**Ação:**
- Mover `docs/standards/` → `.aios-core/docs/standards/`
- Atualizar referências em scripts
- Criar README explicando estrutura

**Estrutura Final:**
```
.aios-core/
├── docs/
│   └── standards/      ← Framework standards
│       ├── AIOS-FRAMEWORK-MASTER.md
│       ├── AIOS-LIVRO-DE-OURO.md
│       └── ...

docs/                   ← User project docs apenas
├── prd/
├── architecture/
├── framework/          ← User-specific
└── ...
```

**Benefícios:**
- ✅ Clareza conceitual
- ✅ Alinha com BMAD analysis
- ✅ Facilita onboarding
- ✅ Versionamento independente

**Effort:** 2 horas  
**Risco:** BAIXO (move + update refs)

---

### B) ⏸️ Aguardar Sprint 2
- Adiar para não sobrecarregar Sprint 1
- Effort: 2 horas (depois)

### C) 🔄 Symlink Temporário
- Criar symlink sem mover arquivos
- Effort: 30 minutos
- Risco: Windows symlinks podem não funcionar

### D) 🚫 Não Fazer
- Manter como está
- Confusão continua

---

**Decisão:** ✅ **A) Aprovar Migration**

**Quando Implementar?**

**Opção 1: Sprint 1 (junto com installer fix)**
- ✅ Resolve problema imediatamente
- ✅ Users começam com estrutura correta
- ⚠️ Adiciona 2 horas ao Sprint 1

**Opção 2: Sprint 2 (junto com module refactor) ← RECOMENDADO**
- ✅ Sprint 1 mais focado (apenas installer)
- ✅ Sprint 2 já terá migração de arquivos (módulos)
- ✅ Faz tudo de uma vez (menos context switching)
- ✅ Manifest system validará a migração

**❓ PERGUNTA 5B:** Quando implementar a migration?

**[ ] Sprint 1 (junto com installer fix)**  
**[✅] Sprint 2 (junto com module refactor) ← RECOMENDADO** ← ESCOLHIDO  
**[ ] Sprint 3+**

**Sua Resposta:** Sprint 2 (junto com module refactor)

**Rationale:**
- ✅ **Sprint 1 focado no crítico:** Instalador quebrado é prioridade #1
- ✅ **Migração coordenada:** Sprint 2 já vai reorganizar `.aios-core/` (módulos)
- ✅ **Manifest validation:** Sistema de manifest estará implementado
- ✅ **Uma big change > duas small changes:** Menos context switching
- ✅ **Estrutura final consistente:** Tudo migrado de uma vez

**Impacto:**
- Sprint 1 (1 sem): Fix installer → **Users desbloqueados!**
- Sprint 2 (2 sem): Module refactor + Config + Manifest + **Standards Migration** → **Estrutura final!**

**Arquivos que serão migrados:**
```
docs/standards/AIOS-FRAMEWORK-MASTER.md     → .aios-core/docs/standards/
docs/standards/AIOS-LIVRO-DE-OURO.md        → .aios-core/docs/standards/
docs/standards/EXECUTOR-DECISION-TREE.md    → .aios-core/docs/standards/
docs/standards/OPEN-SOURCE-VS-SERVICE-DIFFERENCES.md → .aios-core/docs/standards/
```

**Scripts/Refs a atualizar:**
- `.aios-core/scripts/agent-config-loader.js`
- `.aios-core/scripts/greeting-builder.js`
- Todos os agents que referenciam standards
- Installer paths
- README references

---

## ✅ DECISÃO 6: Quality Gate Manager Unificado (BMAD-013)

**Pergunta:** Quando implementar Quality Gate Manager unificado?

**Contexto:**
- Service Layer Audit identificou 15+ scripts fragmentados fazendo validação
- Quality Gate Manager existe mas NÃO está conectado aos agents
- Quinn (QA) não tem ferramentas unificadas para orquestrar validações
- Decisão 4 aprovou 3 layers de quality gates (depende deste manager)

**Problema Atual:**
- ❌ Validações fragmentadas (ESLint, Prettier, TS, Jest, etc. todos manuais)
- ❌ Sem orquestração centralizada
- ❌ Quinn orquestra manualmente
- ❌ Inconsistência entre projetos

**Opções:**

### A) 🎯 Sprint 2 (Após Installer) ← RECOMENDADO

**Ação:**
- Implementar Quality Gate Manager unificado
- Conectar aos agents (especialmente Quinn)
- Integrar com CodeRabbit (preparação)
- Criar workflow de validação

**Benefícios:**
- ✅ Fundação estável (installer já funcionando)
- ✅ Alinha com Decisão 4 (quality gates)
- ✅ Module refactor já feito (estrutura modular)
- ✅ Manifest system validará conexões

**Effort:** 1 semana (parte do Sprint 2)  
**Risco:** MÉDIO (Sprint 2 denso mas factível)

---

### B) 🔥 Sprint 1 (Paralelo)
- Fazer junto com installer
- Effort: 2 semanas total
- Risco: ALTO (sobrecarga)

### C) 📅 Sprint 3+
- Após UX enhancements
- Effort: 1 semana
- Desvantagem: Decisão 4 (CodeRabbit) fica bloqueada

### D) 🚫 Não Priorizar
- Manter fragmentado
- Risco: Decisão 4 não implementável

---

**Decisão:** ✅ **A) Sprint 2 (Após Installer)**

**Rationale:**
- ✅ **Sprint 1 focado:** Instalador é crítico, não sobrecarregar
- ✅ **Dependência satisfeita:** Module refactor + Manifest prontos facilitam
- ✅ **Desbloqueia Decisão 4:** CodeRabbit pode ser implementado em Sprint 3
- ✅ **Timeline realista:** Quality gates funcionando em 3-4 semanas
- ✅ **Risco gerenciável:** Sprint 2 fica denso (2 sem) mas factível

**Análise de Dependências:**
```yaml
Decisão 4 (Quality Gates + CodeRabbit):
  Layer 1 (Local): Depende de Quality Gate Manager ✅
  Layer 2 (PR): Depende de Quality Gate Manager ✅
  Layer 3 (Human): Independente
  
Timeline:
  Sprint 1 (1 sem): Installer fix
  Sprint 2 (2 sem): Module + Manifest + Config + Standards + Quality Gate Manager
  Sprint 3 (1-2 sem): CodeRabbit integration (Layer 1 + 2) ✅
```

**Impacto no Sprint 2:**
```yaml
Sprint 2 - Escopo Completo (2 semanas):
  1. Module refactor (domínio-based) - 2-3 dias
  2. Manifest system implementation - 2 dias
  3. Config system improvements - 1 dia
  4. Standards migration - 2 horas
  5. Quality Gate Manager - 1 semana
  → Total: ~2 semanas (denso mas factível)
```

**O Que Será Implementado:**
1. **Quality Gate Manager Core:**
   - Orquestrador centralizado de validações
   - API unificada para agents
   - Workflow engine para 3 layers

2. **Integração com Quinn:**
   - Tasks para orquestrar validações
   - Conexão com Quality Gate Manager
   - Reports unificados

3. **Preparação CodeRabbit:**
   - Hooks para Layer 1 (local)
   - Hooks para Layer 2 (PR)
   - Configuration templates

4. **Scripts Unificados:**
   - Consolidar 15+ scripts em workflows
   - Eliminar chamadas manuais
   - Validação consistente

---

## ✅ DECISÃO 7: Memory Layer Implementation (BMAD-014)

**Pergunta:** Quando implementar Memory Layer para agents aprenderem e manterem contexto?

**Contexto:**
- Service Layer Audit identificou Memory Layer não implementado
- Agents não aprendem com interações passadas
- Sem contexto histórico entre sessões
- Cada execução começa do zero

**Roundtable Investigation Realizada:**
- ✅ Investigação profunda por Pedro Valério, Brad Frost, Marty Cagan, Paul Graham
- ✅ Análise de Supermemory ([github.com/supermemoryai/supermemory](https://github.com/supermemoryai/supermemory)) - 13.6k stars
- ✅ Análise de Agent Lightning (Microsoft Research) - RL optimization
- ✅ Análise de RecallM paper - Temporal understanding + belief updating
- ✅ GitHub CLI + Exa + Context7 research
- 📄 Relatório completo: `docs/audits/ROUNDTABLE-MEMORY-LAYER-INVESTIGATION-2025-01-19.md`

**O Que é Memory Layer?**
- **Short-term memory:** Contexto da sessão atual
- **Long-term memory:** Histórico persistido entre sessões
- **Learning:** Agents melhoram com feedback (v2.2)

**Roundtable Findings:**

**Pedro Valério:**
> "Se não está registrado, não aconteceu. Memory layer deve ter rastreabilidade total, sync com ClickUp, zero ambiguidade."

**Brad Frost:**
> "Memory é Design System. v2.1 = ship the button, v2.2 = build the system."

**Marty Cagan:**
> "Memory é table stakes para v2.2, mas não blocker para v2.1. Value risk baixo (users querem), scope risk real (não adicionar 4 sem sem tirar algo)."

**Paul Graham:**
> "Memory sem learning é diary. Memory COM learning é intelligence. v2.1 simple cabe em Sprint 3-4, v2.2 sophisticated em Q2."

**Opções Analisadas:**

### A) 📅 Roadmap v2.2 (Q2 2026) ← ORIGINAL

**Quando:** Q2 2026 (abril-junho)

**Escopo:**
- Major feature (3-4 semanas)
- Memory + Learning juntos
- RL optimization desde o início

**Benefícios:**
- ✅ v2.1 mais focado (entrega fundação sólida)
- ✅ Tempo para design (memory é complexo)
- ✅ Learn from v2.1 usage (insights para implementar melhor)
- ✅ Menos risco (não adiciona complexidade a v2.1)

**Effort:** 3-4 semanas (em v2.2)  
**Risco:** BAIXO (não afeta v2.1)

---

### B) 🔥 Sprint 4-5 (Q1 2026)

**Quando:** Sprints 4-5 de v2.1

**Escopo:**
- Implementar logo após fundação
- Incluir em v2.1 como feature marquee
- Memory + Learning juntos

**Benefícios:**
- ✅ v2.1 mais completo (memory desde lançamento)
- ✅ Diferencial competitivo
- ✅ Users felizes (agents mais inteligentes)

**Desvantagens:**
- ❌ v2.1 atrasado (adiciona 3-4 semanas)
- ❌ Risco maior (feature complexa em fundação nova)
- ❌ Escopo creep (v2.1 muito denso)

**Effort:** 3-4 semanas (dentro de v2.1)  
**Risco:** MÉDIO-ALTO

---

### C) ✨ Híbrido (RECOMENDADO pelo Roundtable)

**Proposta:**
- **v2.1 (Sprint 3-4):** Simple memory apenas (2-3 sem)
  - PostgreSQL + pgvector
  - Semantic search
  - Context injection
  - NO learning layer yet
- **v2.2 (Q2 2026):** Sophisticated memory + RL (3-4 sem)
  - Agent Lightning-style optimization
  - Feedback loops
  - Reward signals
  - Continuous learning

**Benefícios:**
- ✅ v2.1 não explode (simple memory cabe em 2-3 sem)
- ✅ Users get value faster (basic memory > no memory)
- ✅ Foundation for v2.2 (valida arquitetura)
- ✅ Competitive positioning (ChatGPT/Claude tem memory)

**Effort:** 2-3 sem (v2.1) + 3-4 sem (v2.2)  
**Risco:** BAIXO-MÉDIO

---

### D) 🚫 Não Fazer

**Benefícios:**
- ✅ Menos complexidade

**Desvantagens:**
- ❌ Agents "burros" (não aprendem)
- ❌ UX repetitiva
- ❌ Menos competitivo

---

**Decisão:** ✅ **A) Roadmap v2.2 (Q2 2026)**

**Rationale:**
- ✅ **v2.1 já está denso:** Installer, Modules, Quality Gates, CodeRabbit
- ✅ **Memory é complexo:** Precisa de design cuidadoso (vector DB, storage, RL)
- ✅ **Learn from v2.1:** Usage real dá insights para implementar memory melhor
- ✅ **Risco gerenciável:** Fundação estável antes de adicionar memory
- ✅ **AIOS funciona sem memory:** Não é bloqueante para MVP
- ✅ **Filosofia "Ship early, ship often":** v2.1 entrega valor rápido (8-10 sem)
- ✅ **"Don't boil the ocean":** Memory merece versão dedicada
- ✅ **"Stable foundation first":** Fundação sólida antes de features avançadas

**Trade-off Aceitável:**
- ⚠️ v2.1 não tem memory (agents não aprendem inicialmente)
- ✅ Mas v2.1 entrega 2-4 semanas mais rápido
- ✅ E v2.2 tem memory bem implementado (não apressado)

**Impacto no Roadmap:**
```yaml
v2.1 (Q1 2026 - 8-10 semanas):
  Sprint 1: Installer fix
  Sprint 2: Modules + Manifest + Quality Gate Manager
  Sprint 3: CodeRabbit + Enhanced UX
  Sprint 4-5: Stabilization + polish
  → NO memory layer

v2.2 (Q2 2026 - 6-8 semanas):
  Sprint 1-2: Memory Layer design + implementation
    - PostgreSQL + pgvector storage
    - Semantic search retrieval
    - Context injection
    - ClickUp sync
  Sprint 3-4: RL Learning Layer (Agent Lightning-inspired)
    - Feedback collection
    - Reward signals
    - Model optimization
    - Learning analytics
  Sprint 5-6: Integration + testing + rollout
  → Memory Layer COMPLETO (storage + learning)
```

**Investigação Roundtable:**
- 📄 Relatório completo: `docs/audits/ROUNDTABLE-MEMORY-LAYER-INVESTIGATION-2025-01-19.md`
- ✅ Consenso unânime dos 4 clones
- ✅ Análise de Supermemory, Agent Lightning, RecallM
- ✅ Architecture specs para v2.1 e v2.2
- ✅ Database schema, API interface, cost-benefit
- ✅ Competitive analysis, references

**Nota Especial:**
Roundtable recomendou "Opção C - Híbrido" (simple memory em v2.1), mas Pedro escolheu manter decisão original (v2.2 completo) para manter v2.1 focado e evitar scope creep. Decisão alinhada com filosofia "stable foundation first".

---

## ✅ DECISÃO 8: CodeRabbit Integration - Timing (BMAD-015)

**Pergunta:** Quando implementar CodeRabbit integration (IDE Extension + GitHub App)?

**Contexto:**
- Decisão 4 aprovou: Integração Completa (local + GitHub) + 3 Layers
- Decisão 6 aprovou: Quality Gate Manager em Sprint 2
- CodeRabbit tem 2 modos: IDE Extension (local, free) + GitHub App (CI/CD, repo)

**Opções:**

### A) 🎯 Phase 1 Apenas (Sprint 3) ← RECOMENDADO

**Escopo:**
- ✅ Guiar users para instalar CodeRabbit IDE extension
- ✅ Integração com Layer 1 (local quality gates)
- ✅ Documentação de setup
- ❌ **NÃO** implementar GitHub App ainda (deixar para depois)

**Benefícios:**
- ✅ Layer 1 funciona rapidamente (1 semana)
- ✅ Code review local grátis
- ✅ Não depende de repo GitHub
- ✅ Quick win - Value imediato

**Effort:** 1 semana  
**Risco:** BAIXO  
**Sprint:** Sprint 3

---

### B) 🔥 Phase 1 + 2 (Sprint 3-4)
- IDE + GitHub App juntos
- Effort: 3 semanas
- Risco: MÉDIO

### C) 📅 Roadmap v2.2
- Deixar para v2.2
- Effort: 3 semanas (futuro)

### D) 🚫 Não Fazer
- Code review manual apenas

---

**Decisão:** ✅ **A) Phase 1 Apenas (Sprint 3)**

**Rationale:**
- ✅ **Quick win:** Layer 1 local review funciona em 1 semana
- ✅ **Não depende de GitHub:** Todos users podem usar imediatamente
- ✅ **Sprint 3 focado:** 1 semana vs. 3 semanas
- ✅ **Incremental delivery:** Ship early, ship often

**Phase 2 (GitHub App) - Timing Definido:**
Pedro identificou corretamente que CodeRabbit GitHub App deve ser implementado junto com **Repository Setup** do DevOps agent (Gage).

**Proposta de Implementação Integrada:**

```yaml
Sprint Futuro: Repository Setup + CodeRabbit GitHub App
  
  Objective: Automatizar criação e configuração de repositório GitHub
  
  Features:
    1. `aios setup-github` command:
       - Detecta se `.git` existe
       - Cria repo no GitHub (via GitHub CLI)
       - Configura branch protection rules
       - Configura GitHub Actions workflows
       - **Instala CodeRabbit GitHub App**
       - Cria `.coderabbit.yaml` config
       - Faz push inicial
    
    2. DevOps Agent (Gage) Integration:
       - Gage orquestra todo o setup
       - Verifica pré-requisitos (GitHub CLI, tokens)
       - Configura CI/CD pipelines
       - **Integra CodeRabbit no workflow**
       - Valida setup completo
    
    3. Quality Gate Manager Integration:
       - Layer 2 (PR) ativa automaticamente
       - CodeRabbit GitHub App roda em PRs
       - Resultados sincronizados com Quality Gate Manager
       - Quinn (QA) orquestra review process
```

**Timeline Proposto:**

```yaml
Sprint 3 (1 sem): 
  - CodeRabbit IDE Extension (Phase 1) ✅
  - Layer 1 local quality gates funcionando

Sprint 4-5 (2-3 sem):
  - Enhanced UX (progress bar, rollback, etc.)
  - Stabilization
  
v2.2 Sprint 1 (2 sem):
  - Repository Setup automation
  - `aios setup-github` command
  - DevOps agent (Gage) orchestration
  - **CodeRabbit GitHub App integration (Phase 2)** ✅
  - CI/CD pipeline templates
  - Layer 2 (PR) quality gates funcionando

v2.2 Sprint 2-4:
  - Memory Layer implementation
  - Other v2.2 features
```

**Justificativa da Integração:**

1. **Coesão Funcional:**
   - Repository setup E CodeRabbit GitHub App são ambos "GitHub operations"
   - Faz sentido fazer tudo de uma vez (atomic operation)
   - User experience melhor: um comando configura tudo

2. **DevOps Agent (Gage) Responsabilidade:**
   - Gage já será responsável por repo setup
   - Adicionar CodeRabbit é extensão natural
   - Evita fragmentar responsabilidades

3. **Dependências Técnicas:**
   - CodeRabbit GitHub App requer:
     - ✅ Repositório existente
     - ✅ GitHub App permissions
     - ✅ CI/CD workflows configurados
   - Tudo isso é feito no repository setup

4. **User Journey:**
   ```
   User Story:
   1. User instala AIOS (Sprint 1)
   2. User desenvolve localmente com CodeRabbit IDE (Sprint 3)
   3. User decide criar repo GitHub (v2.2)
   4. User roda `aios setup-github`
      → Gage configura repo
      → Gage instala CodeRabbit App
      → Gage configura CI/CD
      → Layer 2 quality gates ativados automaticamente
   5. User abre PR, CodeRabbit GitHub App revisa automaticamente
   ```

**Impacto:**
- Sprint 3: Layer 1 (local) funcionando ✅
- v2.2: Layer 2 (PR) funcionando ✅
- Integração natural com DevOps agent workflow
- User experience coesa e automática

**Stories a Criar:**
1. ✅ Sprint 3: "Implement CodeRabbit IDE Extension Integration"
2. ✅ v2.2 Sprint 1: "Implement Repository Setup with CodeRabbit GitHub App"
   - Inclui: repo creation, GitHub CLI, CodeRabbit App, CI/CD, Gage orchestration

**Decisão Estratégica:**
CodeRabbit GitHub App (Phase 2) será implementado em **v2.2 Sprint 1**, integrado com Repository Setup automation, orquestrado pelo DevOps agent (Gage).

---

## ✅ DECISÃO 9: Template Engine Rollout (BMAD-016)

**Pergunta:** Quando fazer rollout sistemático do Template Engine?

**Contexto:**
- Service Layer Audit identificou Template Engine existe mas uso inconsistente
- Alguns agents usam templates, outros não
- Sem padronização de outputs
- Sem validação de templates

**Problema:**
- ❌ Outputs inconsistentes entre agents
- ❌ Difícil validar e comparar outputs
- ❌ Sem garantia de completude (seções obrigatórias)
- ❌ Contradiz filosofia "Se não está padronizado, não é sistemático"

**Opções:**

### A) 🎯 Sprint 3 (Após Fundação Estável) ← RECOMENDADO

**Escopo:**
- Rollout sistemático após installer + modules + quality gates
- Conectar todos 11 agents aos templates
- Validação automática de outputs
- Schema validation (JSON Schema)

**Benefícios:**
- ✅ Fundação estável (modules, quality gates prontos)
- ✅ Timing ideal (agents refatorados)
- ✅ Tema "Consistency" (CodeRabbit + Templates)

**Effort:** 1 semana  
**Risco:** BAIXO  
**Sprint:** Sprint 3 ou 4

---

### B) 🔥 Sprint 2
- Logo após installer
- Risco: Sprint 2 já muito denso

### C) 📅 Sprint 4+
- Menos prioritário
- Risco: Inconsistência continua

### D) 🚫 Manter Como Está
- Sem rollout sistemático
- Risco: Contradiz filosofia

---

**Decisão:** ✅ **A) Sprint 3 - Split Strategy (Mais Conservador)**

**Estratégia de Execução:** **Opção 3 - Split (Mais Conservador)**

```yaml
Sprint 3 (1 semana):
  - CodeRabbit IDE Extension ✅
  - Focus: Quality gates local funcionando

Sprint 4 (1 semana):
  - Template Engine Rollout ✅
  - Focus: Consistency e padronização

Sprint 5 (1-2 semanas):
  - Enhanced UX (progress bar, time estimation, rollback)
  - Stabilization
  - Polish final
```

**Rationale:**
- ✅ **Conservador e seguro:** Uma feature major por sprint
- ✅ **Sprint 3 focado:** Só CodeRabbit (quality gates local)
- ✅ **Sprint 4 focado:** Só Template Engine (consistency)
- ✅ **Menos risco:** Nenhum sprint sobrecarregado
- ✅ **Melhor quality:** Tempo adequado para cada feature
- ✅ **Easier to test:** Mudanças incrementais

**O Que Será Feito (Sprint 4):**

1. **Template Library Expansion:**
   - Expandir `.aios-core/templates/`
   - Adicionar JSON Schema validation para todos templates
   - Criar templates completos:
     - `stories.yaml` (com todos campos obrigatórios)
     - `prd.yaml` (seções padronizadas)
     - `architecture-doc.yaml` (estrutura consistente)
     - `checklist.yaml` (completude garantida)
     - `decision-record.yaml` (ADRs, PMDRs, DBDRs)

2. **Agent Integration:**
   - Conectar todos 11 agents ao Template Engine
   - Agents SEMPRE usam templates para outputs
   - Validação automática antes de salvar arquivo

3. **Validation Layer:**
   - JSON Schema validation enforcement
   - Required fields checking
   - Format consistency validation
   - Error messages claros

4. **Documentation:**
   - Template usage guide
   - How to create new templates
   - Best practices documentation

**Impacto no Roadmap v2.1:**

```yaml
v2.1 Final Timeline:

Sprint 1 (1 sem): 
  - Installer fix ✅
  
Sprint 2 (2 sem):
  - Module refactor (domínio-based) ✅
  - Manifest system ✅
  - Config system improvements ✅
  - Standards migration ✅
  - Quality Gate Manager ✅
  
Sprint 3 (1 sem):
  - CodeRabbit IDE Extension ✅
  - Layer 1 local quality gates
  
Sprint 4 (1 sem):
  - Template Engine Rollout ✅
  - Output consistency & validation
  
Sprint 5 (1-2 sem):
  - Enhanced UX (progress bar, time est, rollback) ✅
  - Stabilization & polish
  - Final testing
  - Documentation updates

Total: 6-7 semanas (Sprint 1-5)
```

**Trade-offs Aceitáveis:**
- ⚠️ Template Engine 1 semana depois (Sprint 4 vs Sprint 3)
- ✅ Mas cada sprint fica focado e gerenciável
- ✅ Menos risco de bugs e problemas
- ✅ Melhor quality assurance

**Benefícios da Estratégia Split:**
1. ✅ **Risk Management:** One major change per sprint
2. ✅ **Quality Focus:** Adequate time for testing each feature
3. ✅ **Team Bandwidth:** No sprint overload
4. ✅ **Incremental Value:** Users get features steadily
5. ✅ **Easier Rollback:** If issues arise, easier to isolate

---

---

## ✅ DECISÃO ESTRATÉGICA: Open-Source Workers (CRITICAL)

**Pergunta:** Abrir Workers + Agents + Humanos no open-source, mantendo apenas Clones + Expansion Packs proprietários?

**Contexto:**
- Roundtable estratégico realizado com Pedro Valério, Brad Frost, Marty Cagan, Paul Graham
- Análise profunda de business model, competitive positioning, network effects
- Comparação com LangChain, CrewAI, AutoGen
- Investigação de moats reais vs. moats falsos

**Roundtable Investigation:**
- 📄 Relatório completo: `docs/audits/ROUNDTABLE-OPEN-SOURCE-STRATEGY-2025-01-19.md`
- ✅ Consenso unânime dos 4 clones: ABRIR WORKERS

**Modelo Atual vs. Proposto:**

```yaml
ANTES:
  Open Source:
    ✅ Agents (11 agents)
    ❌ Workers (proprietary)
    ⚠️ Humanos (concept only)
    ❌ Clones (proprietary)

DEPOIS (APROVADO):
  Open Source:
    ✅ Agents (11 agents)
    ✅ Workers (scripts determinísticos) ← ABERTO!
    ✅ Humanos (workflow orchestration) ← ABERTO!
    ❌ Clones (DNA Mental™) ← PERMANECE FECHADO
    ❌ Expansion Packs ← PERMANECE FECHADO
```

**Decisão:** ✅ **APROVADO - Abrir Workers no Open-Source v2.1**

**Rationale (Consenso do Roundtable):**

**Pedro Valério:**
> "Workers são commodity (qualquer dev cria script). Clones são singularidade (DNA Mental™ leva anos). Abrir Workers maximiza adoção enquanto protege moat real."

**Brad Frost:**
> "Material Design abriu components, cobra por customization. AIOS deve fazer o mesmo: open building blocks, paid expertise."

**Marty Cagan:**
> "All four risks manageable. Workers open não cannibaliza revenue porque value está em Clones + Packs + Team Features. Classic freemium model."

**Paul Graham:**
> "Workers fechados são false moat. True moat é Clones (anos para replicar). Network effects: open → mais users → mais contributors → melhor framework."

**Business Model (Updated):**

```yaml
Revenue Streams (Novo Modelo):

1. Clones (DNA Mental™):
   - Value: ALTÍSSIMO (anos de mapeamento cognitivo)
   - Pricing: $99-499/month per clone
   - Moat: ALTO (metodologia proprietária)

2. Expansion Packs:
   - Value: ALTO (industry expertise)
   - Pricing: $199-999/month per pack
   - Moat: MÉDIO-ALTO (domínio profundo)

3. Team Features:
   - Shared memory, analytics, collaboration
   - Pricing: $49-199/month
   - Moat: MÉDIO (collaboration features)

4. Infrastructure & Support:
   - Cloud, scale, SLAs
   - Pricing: $99-499/month
   - Moat: MÉDIO (operational excellence)

Estimated ARR Year 1: $2.4M - $9.6M
(100k open users → 1k-2k paid, ARPU $200-400)
```

**Competitive Positioning:**

| Feature | LangChain | CrewAI | AutoGen | **AIOS (Novo)** |
|---------|-----------|---------|---------|-----------------|
| Agents | ✅ Open | ✅ Open | ✅ Open | ✅ Open |
| Workers | ✅ Open | ✅ Open | ✅ Open | ✅ **Open** |
| Orchestration | ✅ Open | ✅ Open | ✅ Open | ✅ **Open** |
| **Clones (DNA Mental™)** | ❌ None | ❌ None | ❌ None | ✅ **Proprietary** ⭐ |
| Expansion Packs | ⚠️ Paid | ⚠️ Paid | ⚠️ Paid | ✅ **Proprietary** ⭐ |

**Diferencial:** AIOS = Único com framework open completo + Clones cognitivos únicos

**Implementation Plan (v2.1):**

1. ✅ **Update Documentation:**
   - `OPEN-SOURCE-VS-SERVICE-DIFFERENCES.md` - Reflect Workers open
   - `AIOS-LIVRO-DE-OURO.md` - Update executor references
   - `README.md` - New positioning: "Complete open + unique Clones"

2. ✅ **Move Workers to Core:**
   - Create `.aios-core/workers/` directory
   - Move all Worker scripts from service to core
   - Update imports and paths

3. ✅ **Polish Documentation:**
   - `EXECUTOR-DECISION-TREE.md` - More examples, flowchart
   - Worker contribution guide
   - Clear open vs service distinctions

4. ✅ **Marketing Update:**
   - Website: "Complete open-source + unique Clones"
   - GitHub: Differentiation table
   - Positioning: "Only framework with cognitive clones"

**Impacto no Roadmap:**
- v2.1: Workers open, documentation updated
- v2.2: Clones launch, Memory Layer, conversion focus
- v2.3: Expansion Packs, Team Features, enterprise

**Success Metrics (6 months post-v2.1):**
- GitHub Stars: 10k+
- npm Downloads: 50k+/month
- Community Contributors: 100+
- Worker Library: 200+ scripts
- Service Conversion: 3-5% (industry standard)

**Decisão Aprovada:** Workers + Agents + Humanos OPEN em v2.1, Clones + Expansion Packs PROPRIETARY

---

---

## ✅ DECISÃO 10: Service Discovery Registry (FINAL DECISION!)

**Pergunta:** Quando implementar Service Discovery Registry para Workers & Tasks?

**Contexto Crítico:**
- ✅ Workers agora são open-source (Decisão Estratégica aprovada)
- ✅ Task-First Architecture confirmada como filosofia correta (Roundtable)
- ⚠️ 97 Workers em `.aios-core/scripts/` sem registry
- 🔥 Community contributions começam em v2.1 → PRECISA de structure

**Roundtable Task-First Analysis:**
- 📄 Relatório completo: `docs/audits/ROUNDTABLE-TASK-FIRST-CRITICAL-ANALYSIS-2025-01-19.md`
- ✅ **Consenso unânime dos 4 clones: SPRINT 2 CRÍTICO**

**Análises Individuais:**

**🧠 Pedro Valério (Systems Architect):**
> "Service Discovery não é feature. É obrigação. Task-First sem registry é como ClickUp sem database. Aprovar Sprint 2, estender se necessário."

**Key Points:**
- Task-First Architecture requer discoverability
- Workers sem registry = metodologia quebrada
- Community contributions impossíveis sem structure
- **Veredito: SPRINT 2, estender para 2.5 semanas se necessário**

**🎨 Brad Frost (Atomic Design):**
> "Registry é Pattern Library para tasks. Component sem catalog não escala. Task sem registry também não."

**Key Points:**
- Service Discovery = Pattern Library para tasks
- Atomic Design requer composability → requer discoverability
- Workers são "atoms" que precisam de catalog
- **Veredito: SPRINT 2, foundational infrastructure**

**📊 Marty Cagan (Product Discovery):**
> "Discovery de tasks = discovery de products. Sem registry, teams não sabem o que existe. Duplicação massiva. Tech debt imediato. Sprint 2 crítico."

**Key Points:**
- Discovery requer visibility de what exists
- Sem registry = teams duplicam esforço
- Community growth depende de discoverability
- **Veredito: SPRINT 2, previne tech debt**

**💡 Paul Graham (First Principles):**
> "Bottom-up design requires discoverability. Lisp funciona porque você sabe o que existe. Tasks precisam do mesmo. Aprovar."

**Key Points:**
- Bottom-up design (Task-First) requer registry
- Metaprogrammability requer introspection
- Code is data → data needs catalog
- **Veredito: SPRINT 2, philosophically necessary**

**Opções Apresentadas:**

**A) 🎯 Sprint 2 (2-3 dias) - CRÍTICO**
- Timing: Sprint 2 (junto com Module refactor + Standards migration)
- Effort: 2-3 dias
- Priority: HIGH (elevated from MEDIUM due to Workers open-source)
- Risco: BAIXO
- Benefícios:
  - Infrastructure pronta ANTES de community contributions
  - Quality baseline desde dia 1
  - Integra naturalmente com module refactor
  - Foundation para Pattern Library (Sprint 3)

**B) 📅 Sprint 3+ (menos urgente) - ARRISCADO**
- Timing: Sprint 3 ou posterior
- Risco: MÉDIO (community contributions sem structure)
- Problemas:
  - Workers duplicados
  - Qualidade inconsistente
  - Documentação fragmentada
  - Technical debt

**C) 🚫 Não fazer - INVIÁVEL**
- Risco: CRÍTICO
- Impacto: Metodologia Task-First quebrada
- Workers open-source sem registry = caos garantido

**Decisão:** ✅ **A) Sprint 2 (2-3 dias) - APROVADO**

**Rationale Final:**

1. **Task-First Architecture Requer Registry:**
   - Metodologia Pedro Valério confirmada como correta
   - Registry não é "nice to have", é foundational
   - Sem registry, Task-First quebra

2. **Workers Open-Source Tornam URGENTE:**
   - Community contributions começam v2.1
   - Registry ANTES de contributions = quality control
   - Evita duplicação e inconsistência

3. **Timing Perfeito:**
   - Sprint 2 = Module refactor + Standards migration
   - Registry fit naturalmente nessa reorganização
   - Foundation antes de v2.2 features

4. **Unanimidade do Roundtable:**
   - 4/4 clones aprovaram Sprint 2
   - Consenso filosófico + pragmático
   - Todos identificaram como crítico

**Execução Aprovada:**

```yaml
Sprint 2 (2.5 semanas - EXTENDED):
  Week 1:
    - Module refactor (domínio-based) ✅
    - Manifest system ✅
    
  Week 2:
    - Quality Gate Manager ✅
    - Standards migration ✅
    
  Week 2.5 (+ 2-3 dias): ← EXTENSÃO APROVADA
    - Service Discovery Registry ← NOVO
    - Task-First migration start ← NOVO
    - Hybrid-Ops integration plan ← NOVO
```

**Escopo Service Discovery Registry v2.1:**

```yaml
Deliverables:

1. Core Registry:
   - service-registry.json (master catalog)
   - JSON Schema validation
   - Task metadata for each Worker
   - Executor type classification (Agente|Worker|Humano|Clone)
   - Atomic layer categorization

2. Task Compatibility Layer:
   - Map Workers to Task specs (TASK-FORMAT-SPECIFICATION-V1.md)
   - Validate input/output schemas
   - Check compliance with task format
   - Version tracking

3. Discovery CLI:
   - `aios tasks list` - List all executable tasks
   - `aios tasks search <query>` - Semantic search
   - `aios tasks info <task-id>` - Full task spec
   - `aios workers list` - List all Workers
   - `aios workers find-for-task <task-id>` - Find suitable Worker
   - `aios workers validate <worker-id>` - Validate Worker compliance

4. Contribution Guide:
   - Task template generator
   - Worker template generator
   - Validation checklist
   - PR template with task metadata
   - Documentation standards

5. Documentation:
   - Service Discovery guide
   - Task-First Architecture guide
   - Contribution workflow
   - Examples and best practices
```

**Impacto no Roadmap:**

```yaml
Sprint 2 Updated (2.5 weeks):
  Stories:
    - NEW: SERVICE-DISCOVERY-001: Core Registry System
    - NEW: SERVICE-DISCOVERY-002: Task Compatibility Layer
    - NEW: SERVICE-DISCOVERY-003: Discovery CLI
    - NEW: SERVICE-DISCOVERY-004: Contribution Guide
    - NEW: TASK-FIRST-001: Migrate .aios-core/tasks/ to new format
    - NEW: TASK-FIRST-002: Add responsavel_type to all tasks
    - NEW: HYBRID-OPS-001: Integration plan with Core
  
  Success Criteria:
    - ✅ 97 Workers cataloged in service-registry.json
    - ✅ CLI commands functional
    - ✅ Contribution guide published
    - ✅ All existing tasks migrated to TASK-FORMAT-SPECIFICATION-V1.md
    - ✅ Documentation complete

Sprint 3 Additions (based on Registry):
  - Pattern Library for tasks
  - Error handling patterns catalog
  - Task sizing heuristics guide
  - Composition patterns examples

v2.2 Enhancements:
  - Risk assessment field (Marty's 4 risks)
  - Outcome metric field (measure results)
  - Validation + Dashboard
```

**Próximos Passos:**
1. ✅ SM drafta stories para Sprint 2 extended
2. ✅ PO valida stories
3. ✅ DevOps configura Sprint 2 (2.5 weeks)
4. ✅ Kick-off Sprint 2

---

## 🎊 TODAS AS DECISÕES CONCLUÍDAS!

**Status:** ✅ **10/10 DECISÕES TOMADAS + DECISÃO ESTRATÉGICA**

**Resumo Completo:**

| # | Decisão | Aprovado | Timing |
|---|---------|----------|--------|
| 1 | Installer Approach | ✅ Híbrido (npx + wizard) | Sprint 1 |
| 2 | Sprint 1 Scope | ✅ MÍNIMO (1 semana) | Sprint 1 |
| 3 | Module Architecture | ✅ Modular por Domínio | Sprint 2 |
| 4 | CodeRabbit Integration | ✅ Completa (local + GitHub) | Sprint 1 local / Sprint 2+ GitHub |
| 5 | Framework Standards Migration | ✅ Aprovar Migration | Sprint 2 |
| 6 | Quality Gate Manager | ✅ Sprint 2 | Sprint 2 |
| 7 | Memory Layer | ✅ Roadmap v2.2 (Q2 2026) | v2.2 |
| 8 | CodeRabbit Timing | ✅ Phase 1 (Sprint 3) | Sprint 3 |
| 9 | Template Engine Rollout | ✅ Sprint 3 (Split conservador) | Sprint 3 |
| 10 | Service Discovery Registry | ✅ Sprint 2 (2-3 dias) | Sprint 2 |
| ⭐ | **Workers Open-Source** | ✅ ABRIR em v2.1 | v2.1 launch |

**Total de Sprints Planejados:** 5 sprints (v2.1) + Roadmap v2.2

---

## 📊 Summary

**Decisões Tomadas:** ✅ **10/10 + Decisão Estratégica (Workers Open)**  
**Status:** 🎉 **ENTREVISTA COMPLETA!**  
**Próximo Passo:** Consolidar deliverables e preparar para SM/PO  


