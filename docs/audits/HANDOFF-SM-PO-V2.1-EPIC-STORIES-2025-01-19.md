# 🎯 HANDOFF: SM → Criação de Épicos e Stories v2.1

**Data:** 2025-01-19  
**Status:** ✅ Decisões Finalizadas → Pronto para Execução  
**Responsável:** SM (Scrum Master Agent - Sage)  
**Próximo Passo:** PO (Product Owner - Nova) valida stories

---

## 📋 ÍNDICE

1. [Contexto & Objetivo](#contexto--objetivo)
2. [Documentos de Referência Master](#documentos-de-referência-master)
3. [Sprint 1: Foundation (1 semana)](#sprint-1-foundation)
4. [Sprint 2: Architecture (2.5 semanas)](#sprint-2-architecture)
5. [Sprint 3: Quality & Templates (2 semanas)](#sprint-3-quality--templates)
6. [Sprint 4: DevOps Setup (1 semana)](#sprint-4-devops-setup)
7. [Sprint 5: Documentation (1 semana)](#sprint-5-documentation)
8. [Template de Épico](#template-de-épico)
9. [Template de Story](#template-de-story)
10. [Checklist de Validação](#checklist-de-validação)

---

## 🎯 CONTEXTO & OBJETIVO

### O Que Foi Decidido

Pedro Valério completou **11 decisões estratégicas** durante guided interview + 3 roundtables.

**Resultado:** Roadmap completo v2.1 definido em **5 sprints** (7.5 semanas total).

### Sua Missão (SM - Sage)

1. ✅ **Criar 1 Épico por Sprint** (5 épicos totais)
2. ✅ **Fazer Draft de TODAS as Stories** de cada sprint
3. ✅ **Seguir formato oficial** (templates abaixo)
4. ✅ **Referenciar decisões** do Pedro em cada story
5. ✅ **Estimar complexidade** (pontos, tempo, risco)

### Handoff Seguinte

Após você finalizar → **PO (Nova) valida** → Stories prontas para desenvolvimento

---

## 📚 DOCUMENTOS DE REFERÊNCIA MASTER

**IMPORTANTE:** Todos os épicos e stories devem ser baseados NESTES documentos. Leia-os ANTES de começar qualquer sprint.

### 1. Decisões Consolidadas (OBRIGATÓRIO)

📄 **`docs/audits/PEDRO-COMPLETE-DECISIONS-CONSOLIDATED-2025-01-19.md`**
- Todas as 11 decisões tomadas
- Justificativas detalhadas
- Impacto no business model
- Roadmap consolidado

📄 **`docs/audits/PEDRO-DECISION-LOG.md`**
- Log detalhado de cada decisão
- Context de cada roundtable
- Investigações realizadas

### 2. Livros de Ouro (REFERÊNCIA ARQUITETURAL)

📄 **`docs/standards/AIOS-LIVRO-DE-OURO.md`** (v2.0 - base)
- Filosofia AIOS
- Layer 0-4 completos
- Referência para conceitos fundamentais

📄 **`docs/standards/AIOS-LIVRO-DE-OURO-V2.1-SUMMARY.md`** (v2.1 delta)
- Source tree v2.1 COMPLETO
- Todas as mudanças de v2.0 → v2.1
- Arquitetura modular detalhada
- Comparações e métricas

📄 **`docs/standards/AIOS-LIVRO-DE-OURO-V2.2-SUMMARY.md`** (v2.2 futuro)
- Visão de longo prazo
- Memory Layer + Agent Lightning
- Roadmap pós-v2.1

### 3. Investigações Técnicas (FUNDAMENTAÇÃO)

📄 **`docs/audits/INSTALLER-HYBRID-V2-COMPLETE.md`**
- Proposta completa do installer híbrido
- IDEs, CLIs, MCPs detalhados
- User flow completo
- Validações necessárias

📄 **`docs/audits/INSTALLER-ROADMAP-V2.1.md`**
- Roadmap detalhado do installer (5 sprints)
- Features por sprint
- Dependencies entre features

📄 **`docs/audits/DECISION-4-QUALITY-GATES-INVESTIGATION-REPORT.md`**
- Quality Gates 3 layers detalhados
- CodeRabbit integration
- Executor types por layer
- Setup flow completo

📄 **`docs/audits/ROUNDTABLE-TASK-FIRST-CRITICAL-ANALYSIS-2025-01-19.md`**
- Task-First Architecture crítica
- Service Discovery fundamentação
- Unanimidade dos 4 clones

📄 **`docs/audits/ROUNDTABLE-OPEN-SOURCE-STRATEGY-2025-01-19.md`**
- Business model v2.1
- Workers open-source rationale
- Competitive positioning

### 4. Framework Standards (ESPECIFICAÇÕES)

📄 **`docs/standards/AIOS-FRAMEWORK-MASTER.md`**
- Framework completo v2.0
- Estrutura de agents
- Workflows existentes

📄 **`docs/standards/TASK-FORMAT-SPECIFICATION-V1.md`**
- Formato universal de tasks
- Campos obrigatórios
- Exemplos de implementação

📄 **`docs/standards/EXECUTOR-DECISION-TREE.md`**
- 4 tipos de executores
- Quando usar cada um
- Trade-offs (custo, velocidade, qualidade)

📄 **`docs/framework/source-tree.md`**
- Estrutura atual v2.0
- Convenções de arquivos
- Onde colocar novos arquivos

### 5. Backlog Consolidado (CONTEXTO)

📄 **`docs/audits/BACKLOG-RECONCILIATION-ANALYSIS.md`**
- Análise completa do backlog antigo
- Stories consolidadas
- Duplicatas removidas
- Nova organização proposta

📄 **`docs/stories/v2.1/README.md`** (criar se não existir)
- Organização das stories v2.1
- Sprint structure

📄 **`docs/stories/archive/` (pasta completa)**
- 78 stories antigas (referência histórica)
- Patterns identificados
- Evitar duplicação

---

## 🏃 SPRINT 1: FOUNDATION (1 semana)

### Objetivo do Sprint

Criar **fundação sólida** para v2.1:
- Installer híbrido funcional (npx + wizard)
- MCPs funcionando (project-level)
- Estrutura básica pronta

**Decisão Relacionada:** Decisão 1 (Installer Híbrido) + Decisão 2 (Sprint 1 MÍNIMO)

---

### 📄 Arquivos para Analisar (Sprint 1)

#### Decisões & Planning

1. **`docs/audits/PEDRO-DECISION-LOG.md`**
   - Seção: "DECISÃO 1: Installer Approach"
   - Seção: "DECISÃO 2: Sprint 1 Scope"
   - Ler completamente essas 2 decisões

2. **`docs/audits/INSTALLER-HYBRID-V2-COMPLETE.md`**
   - Seção: "Sprint 1: MÍNIMO (Foundation)"
   - Seção: "User Flow Completo"
   - Seção: "Features Essenciais"
   - Seção: "Validações Necessárias"

3. **`docs/audits/INSTALLER-ROADMAP-V2.1.md`**
   - Seção: "Sprint 1 Details"
   - Success criteria
   - Dependencies

#### Arquitetura & Implementação

4. **`docs/standards/AIOS-LIVRO-DE-OURO-V2.1-SUMMARY.md`**
   - Seção: "Installation Revolution"
   - Seção: "Quick Start - v2.1 Installation"
   - Seção: "Source Tree v2.1" (estrutura de arquivos)

5. **`bin/aios-init.js`** (código atual)
   - Entender installer atual (v2.0)
   - Identificar o que precisa mudar

6. **`docs/framework/source-tree.md`**
   - Estrutura atual de arquivos
   - Onde criar novos arquivos do installer

#### Context & Standards

7. **`docs/standards/AIOS-FRAMEWORK-MASTER.md`**
   - Seção: "Installation & Setup"
   - Configuration system

8. **`.aios-core/tools/mcp/` (pasta completa)**
   - Configurações MCP atuais
   - O que já existe vs. o que precisa criar

---

### 🎯 Épico Sprint 1

**Título:** `EPIC-S1: Installer Híbrido Foundation`

**Descrição:**
```markdown
Implementar installer híbrido (npx + wizard) para AIOS v2.1, reduzindo tempo de instalação de 2-4h para 5 minutos.

Scope:
  - npx @allfluence/aios@latest init funcional
  - Wizard interativo para project type
  - Detecção automática de ambiente
  - IDE selection (6 IDEs)
  - MCP installation (4 MCPs project-level)
  - Validação em tempo real
  - 98% success rate

Out of Scope (Sprints Futuros):
  - MCP System global (Sprint 2)
  - CLI Tools installation (Sprint 2)
  - Module refactor (Sprint 2)
  - CodeRabbit integration (Sprint 3)
```

**Goals:**
- ✅ Installer funcional em 5 minutos
- ✅ 98% success rate
- ✅ 4 MCPs configurados (Browser, Context7, Exa, Desktop Commander)
- ✅ 6 IDEs suportadas

**Success Metrics:**
- Time to install: < 5 min
- Success rate: > 95%
- User satisfaction: > 8/10

**Stories:** 8-12 stories (detalhar abaixo)

---

### 📝 Stories Sprint 1 (Draft)

**IMPORTANTE:** Para cada story abaixo, crie um arquivo completo usando o [Template de Story](#template-de-story).

#### Story 1.1: npx Command Setup

**Arquivo:** `docs/stories/v2.1/sprint-1/story-1.1-npx-command-setup.md`

**Referências:**
- `docs/audits/INSTALLER-HYBRID-V2-COMPLETE.md` → Seção "npx Focus"
- `docs/audits/PEDRO-DECISION-LOG.md` → Decisão 1

**Descrição:**
```
Como desenvolvedor,
Quero executar `npx @allfluence/aios@latest init`,
Para instalar AIOS sem npm install global

Acceptance Criteria:
  - npx command funciona sem npm install -g
  - Baixa última versão automaticamente
  - Executa wizard interativo
  - Funciona em Windows, Mac, Linux
```

**Tasks:**
1. Configurar package.json com bin entry
2. Criar CLI entry point
3. Publicar no npm registry
4. Testar npx em 3 OS

**Estimate:** 3 pontos (1 dia)

---

#### Story 1.2: Interactive Wizard Foundation

**Arquivo:** `docs/stories/v2.1/sprint-1/story-1.2-interactive-wizard-foundation.md`

**Referências:**
- `docs/audits/INSTALLER-HYBRID-V2-COMPLETE.md` → Seção "Wizard Flow"
- `docs/standards/AIOS-LIVRO-DE-OURO-V2.1-SUMMARY.md` → "Installation Quick Guide"

**Descrição:**
```
Como desenvolvedor,
Quero wizard interativo com perguntas claras,
Para configurar projeto AIOS facilmente

Acceptance Criteria:
  - Perguntas sequenciais (inquirer.js ou similar)
  - Validação em tempo real
  - Feedback visual (spinners, checkmarks)
  - Possibilidade de voltar/corrigir
  - Progress bar
```

**Tasks:**
1. Escolher biblioteca de prompts (inquirer.js)
2. Implementar question flow
3. Adicionar validações
4. Implementar navigation (back/next)
5. Adicionar visual feedback

**Estimate:** 5 pontos (2 dias)

---

#### Story 1.3: Project Type Detection

**Arquivo:** `docs/stories/v2.1/sprint-1/story-1.3-project-type-detection.md`

**Referências:**
- `docs/audits/INSTALLER-HYBRID-V2-COMPLETE.md` → Seção "Project Type"
- `docs/audits/PEDRO-DECISION-LOG.md` → Decisão 1

**Descrição:**
```
Como desenvolvedor,
Quero que o installer detecte se é projeto greenfield ou brownfield,
Para aplicar configuração apropriada

Acceptance Criteria:
  - Detecta diretório vazio (greenfield)
  - Detecta package.json existente (brownfield)
  - Detecta .git existente (brownfield)
  - Pergunta confirmação ao usuário
  - Ajusta instalação baseado no tipo
```

**Tasks:**
1. Implementar detecção de arquivos
2. Criar lógica de inferência
3. Adicionar prompt de confirmação
4. Documentar diferenças greenfield/brownfield

**Estimate:** 3 pontos (1 dia)

---

#### Story 1.4: IDE Selection (6 IDEs)

**Arquivo:** `docs/stories/v2.1/sprint-1/story-1.4-ide-selection.md`

**Referências:**
- `docs/audits/INSTALLER-HYBRID-V2-COMPLETE.md` → Seção "IDEs Supported"
- `docs/audits/PEDRO-DECISION-LOG.md` → Decisão 1 (investigação de IDEs)

**Descrição:**
```
Como desenvolvedor,
Quero selecionar minha IDE preferida,
Para que AIOS configure arquivos específicos da IDE

Acceptance Criteria:
  - Lista 6 IDEs: Cursor, Windsurf, Trae, Zed, Antigravity, Continue.dev
  - Multi-select (pode escolher várias)
  - Configura arquivos de cada IDE selecionada
  - Cria .cursorrules, .windsurfrules, etc.
```

**Tasks:**
1. Implementar multi-select prompt
2. Criar configs para cada IDE (6 configs)
3. Implementar file generation por IDE
4. Testar em cada IDE

**Estimate:** 8 pontos (3 dias)

**Subtasks (1 por IDE):**
- 1.4.1: Cursor configuration
- 1.4.2: Windsurf configuration
- 1.4.3: Trae configuration
- 1.4.4: Zed configuration
- 1.4.5: Antigravity configuration
- 1.4.6: Continue.dev configuration

---

#### Story 1.5: MCP Installation (4 MCPs Project-Level)

**Arquivo:** `docs/stories/v2.1/sprint-1/story-1.5-mcp-installation-project-level.md`

**Referências:**
- `docs/audits/INSTALLER-HYBRID-V2-COMPLETE.md` → Seção "MCP System - Sprint 1"
- `docs/audits/PEDRO-DECISION-LOG.md` → Decisão 1 (MCP project-level)
- `.aios-core/tools/mcp/` → Configs atuais

**Descrição:**
```
Como desenvolvedor,
Quero instalar 4 MCPs essenciais no meu projeto,
Para ter Browser, Context7, Exa, Desktop Commander funcionando

Acceptance Criteria:
  - Instala 4 MCPs: Browser, Context7, Exa, Desktop Commander
  - Configuração project-level (.aios-core/tools/mcp/)
  - Valida instalação (health check)
  - Mostra status de cada MCP
  
NOTA: Global MCP system será implementado no Sprint 2
```

**Tasks:**
1. Criar instaladores para cada MCP (4 scripts)
2. Implementar health checks
3. Adicionar error handling
4. Documentar troubleshooting

**Estimate:** 5 pontos (2 dias)

**Subtasks:**
- 1.5.1: Browser MCP (Playwright)
- 1.5.2: Context7 MCP
- 1.5.3: Exa MCP
- 1.5.4: Desktop Commander MCP

---

#### Story 1.6: Environment Configuration

**Arquivo:** `docs/stories/v2.1/sprint-1/story-1.6-environment-configuration.md`

**Referências:**
- `docs/audits/INSTALLER-HYBRID-V2-COMPLETE.md` → Seção "Environment Setup"
- `docs/framework/source-tree.md` → Configuration files

**Descrição:**
```
Como desenvolvedor,
Quero que o installer crie .env e core-config.yaml,
Para ter projeto configurado e pronto para usar

Acceptance Criteria:
  - Gera .env com defaults seguros
  - Gera .aios-core/core-config.yaml
  - Solicita API keys necessárias
  - Valida formato de cada config
  - Permite skip de API keys (configurar depois)
```

**Tasks:**
1. Criar .env template
2. Criar core-config.yaml template
3. Implementar prompts para API keys
4. Adicionar validação de formato
5. Implementar skip logic

**Estimate:** 3 pontos (1 dia)

---

#### Story 1.7: Dependency Installation

**Arquivo:** `docs/stories/v2.1/sprint-1/story-1.7-dependency-installation.md`

**Descrição:**
```
Como desenvolvedor,
Quero que o installer instale dependências npm automaticamente,
Para não precisar executar npm install manualmente

Acceptance Criteria:
  - Detecta package manager (npm, yarn, pnpm)
  - Executa install automaticamente
  - Mostra progress bar
  - Trata erros de instalação
  - Oferece retry em caso de falha
```

**Tasks:**
1. Detectar package manager
2. Executar install com spawn
3. Adicionar progress indicator
4. Implementar error handling + retry
5. Testar com npm, yarn, pnpm

**Estimate:** 3 pontos (1 dia)

---

#### Story 1.8: Installation Validation

**Arquivo:** `docs/stories/v2.1/sprint-1/story-1.8-installation-validation.md`

**Referências:**
- `docs/audits/INSTALLER-ROADMAP-V2.1.md` → "Success Criteria Sprint 1"

**Descrição:**
```
Como desenvolvedor,
Quero validação completa pós-instalação,
Para garantir que tudo foi configurado corretamente

Acceptance Criteria:
  - Valida estrutura de arquivos criados
  - Valida configs (.env, core-config.yaml)
  - Valida MCPs (health check)
  - Valida dependências instaladas
  - Mostra relatório final (success/warnings/errors)
  - Oferece troubleshooting para erros
```

**Tasks:**
1. Criar validators para cada componente
2. Implementar health checks
3. Gerar relatório visual
4. Criar troubleshooting guides
5. Testar cenários de falha

**Estimate:** 5 pontos (2 dias)

---

#### Story 1.9: Error Handling & Rollback

**Arquivo:** `docs/stories/v2.1/sprint-1/story-1.9-error-handling-rollback.md`

**Descrição:**
```
Como desenvolvedor,
Quero que o installer faça rollback em caso de erro,
Para não deixar projeto em estado inconsistente

Acceptance Criteria:
  - Detecta falhas críticas
  - Faz backup antes de mudanças
  - Rollback automático em caso de erro
  - Logs detalhados para debug
  - Mensagens de erro claras
```

**Tasks:**
1. Implementar backup system
2. Criar rollback logic
3. Adicionar comprehensive logging
4. Implementar error messages user-friendly
5. Testar recovery scenarios

**Estimate:** 5 pontos (2 dias)

---

#### Story 1.10: Cross-Platform Support

**Arquivo:** `docs/stories/v2.1/sprint-1/story-1.10-cross-platform-support.md`

**Descrição:**
```
Como desenvolvedor,
Quero que o installer funcione em Windows, Mac e Linux,
Para usar AIOS independente do meu OS

Acceptance Criteria:
  - Funciona em Windows 10/11
  - Funciona em macOS (Intel + Apple Silicon)
  - Funciona em Linux (Ubuntu, Debian, Fedora)
  - Path handling correto por OS
  - Shell commands adaptados por OS
```

**Tasks:**
1. Testar em Windows
2. Testar em macOS (ambos chips)
3. Testar em Linux (3 distros)
4. Fix OS-specific issues
5. Documentar OS requirements

**Estimate:** 8 pontos (3 dias)

---

#### Story 1.11: First-Run Experience

**Arquivo:** `docs/stories/v2.1/sprint-1/story-1.11-first-run-experience.md`

**Descrição:**
```
Como desenvolvedor,
Quero mensagem de boas-vindas e próximos passos após instalação,
Para saber o que fazer a seguir

Acceptance Criteria:
  - Welcome message com branding AIOS
  - Lista próximos passos claros
  - Comandos disponíveis (aios --help)
  - Link para documentação
  - Quick start tutorial (opcional)
```

**Tasks:**
1. Criar welcome screen
2. Listar next steps
3. Gerar quick reference card
4. Link para docs
5. Implementar optional tutorial

**Estimate:** 2 pontos (1 dia)

---

#### Story 1.12: Documentation Sprint 1

**Arquivo:** `docs/stories/v2.1/sprint-1/story-1.12-documentation-sprint-1.md`

**Descrição:**
```
Como desenvolvedor,
Quero documentação completa do installer,
Para entender como usar e resolver problemas

Acceptance Criteria:
  - Installation guide completo
  - Troubleshooting guide
  - FAQ (10+ perguntas comuns)
  - Video walkthrough (opcional)
  - Migration guide (v2.0 → v2.1)
```

**Tasks:**
1. Escrever installation guide
2. Criar troubleshooting guide
3. Compilar FAQ
4. (Opcional) Gravar video
5. Escrever migration guide

**Estimate:** 3 pontos (1 dia)

---

### 📊 Sprint 1 Summary

**Total Stories:** 12  
**Total Points:** 53 pontos  
**Estimated Duration:** 1 semana (5 dias úteis)  
**Team Size:** 2-3 developers  
**Velocity Esperada:** 50-60 pontos/semana

---

## 🏃 SPRINT 2: ARCHITECTURE (2.5 semanas)

### Objetivo do Sprint

Implementar **arquitetura modular** + **Service Discovery** + **Quality Gate Manager**:
- Migrar flat structure → modular (4 modules)
- Service Discovery funcional (97+ workers catalogados)
- Quality Gate Manager unificado
- MCP System global
- Framework standards migration

**Decisão Relacionada:** Decisão 3 (Module Architecture) + Decisão 6 (QG Manager) + Decisão 10 (Service Discovery)

---

### 📄 Arquivos para Analisar (Sprint 2)

#### Decisões & Planning

1. **`docs/audits/PEDRO-DECISION-LOG.md`**
   - Decisão 3: Module Architecture
   - Decisão 5: Framework Standards Migration
   - Decisão 6: Quality Gate Manager
   - Decisão 10: Service Discovery Registry

2. **`docs/audits/INSTALLER-ROADMAP-V2.1.md`**
   - Sprint 2 details
   - Module refactor plan

3. **`docs/audits/ROUNDTABLE-TASK-FIRST-CRITICAL-ANALYSIS-2025-01-19.md`**
   - Service Discovery fundamentação
   - Unanimidade dos 4 clones

#### Arquitetura & Implementação

4. **`docs/standards/AIOS-LIVRO-DE-OURO-V2.1-SUMMARY.md`**
   - Seção: "Architecture Revolution"
   - Seção: "Service Discovery System"
   - Source Tree v2.1 COMPLETO (estrutura modular)

5. **`docs/framework/source-tree.md`**
   - Estrutura atual (flat)
   - Comparação com estrutura nova

6. **`.aios-core/` (pasta completa)**
   - Entender estrutura atual
   - Identificar o que mover para cada módulo

#### Context & Standards

7. **`docs/standards/AIOS-FRAMEWORK-MASTER.md`**
   - Framework standards a migrar
   - Service layer architecture

8. **`docs/standards/TASK-FORMAT-SPECIFICATION-V1.md`**
   - Task format para workers
   - Service Discovery compatibility

---

### 🎯 Épico Sprint 2

**Título:** `EPIC-S2: Modular Architecture + Service Discovery`

**Descrição:**
```markdown
Refatorar AIOS para arquitetura modular (4 modules: core/development/product/infrastructure) + implementar Service Discovery para 97+ workers.

Scope:
  - Migrar .aios-core/ flat → modular structure
  - Criar Service Registry (service-registry.json)
  - Implementar Discovery CLI (aios workers search/info/use)
  - Quality Gate Manager unificado
  - MCP System global (symlinks)
  - Framework standards migration (.aios-core/docs/)
  - Manifest System (agents/workers/tasks CSV)

Goals:
  - Estrutura modular 100% funcional
  - 97+ workers catalogados no registry
  - Discovery CLI funcionando
  - 30 segundos para encontrar worker (vs. N/A)
```

**Success Metrics:**
- Module separation: 100%
- Workers cataloged: 97+
- Discovery time: < 30s
- Search accuracy: > 90%

**Stories:** 15-20 stories (detalhar abaixo)

---

### 📝 Stories Sprint 2 (Draft)

#### Story 2.1: Module Structure Design

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.1-module-structure-design.md`

**Referências:**
- `docs/standards/AIOS-LIVRO-DE-OURO-V2.1-SUMMARY.md` → Source Tree v2.1
- `docs/audits/PEDRO-DECISION-LOG.md` → Decisão 3

**Descrição:**
```
Como arquiteto,
Quero definir estrutura modular clara,
Para organizar .aios-core/ em 4 modules

Acceptance Criteria:
  - 4 modules definidos: core, development, product, infrastructure
  - Cada module com responsabilidades claras
  - Migration map (arquivo atual → módulo destino)
  - Zero breaking changes para usuários
```

**Tasks:**
1. Definir boundaries de cada module
2. Criar migration map
3. Identificar dependencies entre modules
4. Documentar architecture decision (ADR)

**Estimate:** 5 pontos (2 dias)

---

#### Story 2.2: Core Module Creation

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.2-core-module-creation.md`

**Descrição:**
```
Como desenvolvedor,
Quero criar .aios-core/core/ module,
Para centralizar config, orchestration, validation, service-discovery, manifest

Acceptance Criteria:
  - Estrutura .aios-core/core/ criada
  - Subfolders: config/, orchestration/, validation/, service-discovery/, manifest/
  - Arquivos existentes movidos corretamente
  - Imports atualizados
```

**Estimate:** 5 pontos (2 dias)

---

#### Story 2.3: Development Module Creation

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.3-development-module-creation.md`

**Descrição:**
```
Como desenvolvedor,
Quero criar .aios-core/development/ module,
Para centralizar agents, workers, tasks, workflows

Acceptance Criteria:
  - Estrutura .aios-core/development/ criada
  - Agents (11) movidos
  - Workers (criar estrutura de categorias)
  - Tasks movidos
  - Workflows movidos
```

**Estimate:** 5 pontos (2 dias)

---

#### Story 2.4: Product Module Creation

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.4-product-module-creation.md`

**Descrição:**
```
Como Product Owner,
Quero criar .aios-core/product/ module,
Para centralizar templates, workflows, checklists, decisions

Acceptance Criteria:
  - Estrutura .aios-core/product/ criada
  - Templates movidos
  - Product workflows movidos
  - Checklists movidos
  - Decision structure criada (pmdr/, adr/, dbdr/)
```

**Estimate:** 3 pontos (1 dia)

---

#### Story 2.5: Infrastructure Module Creation

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.5-infrastructure-module-creation.md`

**Descrição:**
```
Como DevOps,
Quero criar .aios-core/infrastructure/ module,
Para centralizar CLI, MCP, integrations, scripts

Acceptance Criteria:
  - Estrutura .aios-core/infrastructure/ criada
  - CLI movido
  - MCP configs movidos
  - Integrations organizados
  - Scripts movidos
```

**Estimate:** 5 pontos (2 dias)

---

#### Story 2.6: Service Registry Creation

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.6-service-registry-creation.md`

**Referências:**
- `docs/standards/AIOS-LIVRO-DE-OURO-V2.1-SUMMARY.md` → "Service Discovery System"
- `docs/audits/ROUNDTABLE-TASK-FIRST-CRITICAL-ANALYSIS-2025-01-19.md`

**Descrição:**
```
Como desenvolvedor,
Quero service-registry.json catalogando 97+ workers,
Para descobrir workers disponíveis rapidamente

Acceptance Criteria:
  - service-registry.json criado
  - 97+ workers catalogados
  - Cada worker com: id, name, path, category, inputs, outputs, usage_count, rating
  - JSON schema validation
```

**Tasks:**
1. Definir schema do registry
2. Catalogar 97+ workers existentes
3. Categorizar workers (6 categories)
4. Implementar validation
5. Documentar registry format

**Estimate:** 8 pontos (3 dias)

---

#### Story 2.7: Discovery CLI - Search

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.7-discovery-cli-search.md`

**Descrição:**
```
Como desenvolvedor,
Quero executar `aios workers search "json parse"`,
Para encontrar workers relevantes em segundos

Acceptance Criteria:
  - aios workers search <query> funciona
  - Semantic search (não apenas keyword)
  - Ranking por relevância
  - Mostra top 5 results
  - Tempo de busca < 1 segundo
```

**Estimate:** 8 pontos (3 dias)

---

#### Story 2.8: Discovery CLI - Info

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.8-discovery-cli-info.md`

**Descrição:**
```
Como desenvolvedor,
Quero executar `aios workers info <worker-id>`,
Para ver detalhes completos de um worker

Acceptance Criteria:
  - aios workers info <worker-id> funciona
  - Mostra: name, description, path, inputs, outputs, examples
  - Mostra usage stats (projects using, rating)
  - Mostra task compatibility
```

**Estimate:** 3 pontos (1 dia)

---

#### Story 2.9: Discovery CLI - List

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.9-discovery-cli-list.md`

**Descrição:**
```
Como desenvolvedor,
Quero executar `aios workers list`,
Para ver todos workers disponíveis

Acceptance Criteria:
  - aios workers list funciona
  - Filtro por categoria (--category data-transform)
  - Filtro por rating (--min-rating 4.0)
  - Paginação (--page 2)
```

**Estimate:** 5 pontos (2 dias)

---

#### Story 2.10: Quality Gate Manager Unificado

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.10-quality-gate-manager.md`

**Referências:**
- `docs/audits/PEDRO-DECISION-LOG.md` → Decisão 6
- `docs/audits/DECISION-4-QUALITY-GATES-INVESTIGATION-REPORT.md`

**Descrição:**
```
Como QA,
Quero Quality Gate Manager unificado,
Para orquestrar 3 layers de validation

Acceptance Criteria:
  - quality-gate-manager.js criado
  - Orquestra Layer 1 (local), Layer 2 (PR), Layer 3 (human)
  - API unificada: runQualityGates(layer, context)
  - Configurable rules
```

**Estimate:** 8 pontos (3 dias)

---

#### Story 2.11: MCP System Global

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.11-mcp-system-global.md`

**Referências:**
- `docs/audits/INSTALLER-HYBRID-V2-COMPLETE.md` → "MCP System Global"
- `docs/audits/PEDRO-DECISION-LOG.md` → Decisão 1 (Sprint 2 MCP)

**Descrição:**
```
Como desenvolvedor,
Quero configurar MCPs uma vez globalmente,
Para reusar em todos projetos AIOS

Acceptance Criteria:
  - Global config: ~/.aios/mcp/
  - Symlinks de project → global
  - Detecção de MCPs existentes
  - Sugestão de MCPs faltantes
  - Skip se todos atualizados
```

**Estimate:** 8 pontos (3 dias)

---

#### Story 2.12: Framework Standards Migration

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.12-framework-standards-migration.md`

**Referências:**
- `docs/audits/PEDRO-DECISION-LOG.md` → Decisão 5

**Descrição:**
```
Como arquiteto,
Quero migrar docs/standards/ → .aios-core/docs/,
Para framework docs ficarem com framework code

Acceptance Criteria:
  - docs/standards/ movido para .aios-core/docs/
  - Todos links atualizados
  - Backwards compatibility mantida
  - Documentação atualizada
```

**Files to migrate:**
- AIOS-FRAMEWORK-MASTER.md
- AIOS-LIVRO-DE-OURO.md
- AIOS-LIVRO-DE-OURO-V2.1-SUMMARY.md
- AIOS-LIVRO-DE-OURO-V2.2-SUMMARY.md
- EXECUTOR-DECISION-TREE.md
- TASK-FORMAT-SPECIFICATION-V1.md
- OPEN-SOURCE-VS-SERVICE-DIFFERENCES.md

**Estimate:** 3 pontos (1 dia)

---

#### Story 2.13: Manifest System

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.13-manifest-system.md`

**Descrição:**
```
Como arquiteto,
Quero manifest CSVs tracking agents/workers/tasks,
Para validar integridade do sistema

Acceptance Criteria:
  - agents-manifest.csv criado (11 agents)
  - workers-manifest.csv criado (97+ workers)
  - tasks-manifest.csv criado (60+ tasks)
  - manifest-validator.js funcional
```

**Estimate:** 5 pontos (2 dias)

---

#### Story 2.14: Migration Script v2.0 → v2.1

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.14-migration-script.md`

**Descrição:**
```
Como usuário v2.0,
Quero executar `aios migrate v2.0-to-v2.1`,
Para migrar meu projeto automaticamente

Acceptance Criteria:
  - aios migrate command funcional
  - Backup automático
  - Migra estrutura flat → modular
  - Atualiza configs
  - Validação pós-migração
  - Rollback se falhar
```

**Estimate:** 8 pontos (3 dias)

---

#### Story 2.15: Update Installer for Modules

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.15-update-installer-modules.md`

**Descrição:**
```
Como desenvolvedor,
Quero que installer (Sprint 1) crie estrutura modular,
Para novos projetos já usarem v2.1 structure

Acceptance Criteria:
  - Installer cria 4 modules
  - Gera structure correta
  - Valida structure pós-install
```

**Estimate:** 3 pontos (1 dia)

---

#### Story 2.16: Documentation Sprint 2

**Arquivo:** `docs/stories/v2.1/sprint-2/story-2.16-documentation-sprint-2.md`

**Descrição:**
```
Como desenvolvedor,
Quero documentação da arquitetura modular,
Para entender novo layout

Acceptance Criteria:
  - Architecture guide completo
  - Service Discovery guide
  - Migration guide v2.0 → v2.1
  - ADR documentando module decision
```

**Estimate:** 5 pontos (2 dias)

---

### 📊 Sprint 2 Summary

**Total Stories:** 16  
**Total Points:** 91 pontos  
**Estimated Duration:** 2.5 semanas (12.5 dias úteis)  
**Team Size:** 3-4 developers  
**Velocity Esperada:** 70-80 pontos/semana

---

## 🏃 SPRINT 3: QUALITY & TEMPLATES (2 semanas)

### Objetivo do Sprint

Implementar **Quality Gates 3 Layers** + **Template Engine completo** + **CodeRabbit**:
- Layer 1: Local (pre-commit hooks)
- Layer 2: PR automation (CI/CD + CodeRabbit)
- Layer 3: Human review orchestration
- Template engine para todos doc types

**Decisão Relacionada:** Decisão 4 (Quality Gates + CodeRabbit) + Decisão 8 (CodeRabbit timing) + Decisão 9 (Template Engine)

---

### 📄 Arquivos para Analisar (Sprint 3)

#### Decisões & Planning

1. **`docs/audits/PEDRO-DECISION-LOG.md`**
   - Decisão 4: Quality Gates & CodeRabbit
   - Decisão 8: CodeRabbit Integration Timing
   - Decisão 9: Template Engine Rollout

2. **`docs/audits/DECISION-4-QUALITY-GATES-INVESTIGATION-REPORT.md`**
   - 3 layers detalhados
   - CodeRabbit local + GitHub
   - Executor types por layer
   - Setup flow

3. **`docs/audits/INSTALLER-ROADMAP-V2.1.md`**
   - Sprint 3 details

#### Arquitetura & Implementação

4. **`docs/standards/AIOS-LIVRO-DE-OURO-V2.1-SUMMARY.md`**
   - Seção: "Quality Gates - 3 Layers"
   - Seção: "Template Engine"

5. **`docs/standards/EXECUTOR-DECISION-TREE.md`**
   - 4 executor types
   - Mapping executors to quality layers

6. **`.aios-core/scripts/template-engine.js`**
   - Template engine atual
   - O que precisa expandir

#### Context & Standards

7. **`docs/standards/AIOS-FRAMEWORK-MASTER.md`**
   - Quality standards
   - Template system

8. **`.aios-core/product/templates/` (pasta completa)**
   - Templates existentes
   - Identificar gaps

---

### 🎯 Épico Sprint 3

**Título:** `EPIC-S3: Quality Gates 3 Layers + Template Engine`

**Descrição:**
```markdown
Implementar sistema completo de Quality Gates (3 layers) + Template Engine para todos document types + CodeRabbit integration (local).

Scope:
  - Layer 1: Local validation (pre-commit hooks, ESLint, Prettier, TypeScript)
  - Layer 2: PR automation (CodeRabbit AI review, integration tests, coverage)
  - Layer 3: Human review orchestration (strategic review)
  - Template Engine completo (PRD, Epic, Story, ADR, PMDR, DBDR, etc.)
  - CodeRabbit local IDE extension integration

Goals:
  - 80% issues caught automatically (layers 1+2)
  - Template engine covering 100% doc types
  - CodeRabbit functioning locally
  - Human review time reduced 75%
```

**Success Metrics:**
- Auto-catch rate: > 80%
- Template coverage: 100%
- Human review time: -75%
- False positive rate: < 15%

**Stories:** 12-15 stories (detalhar abaixo)

---

### 📝 Stories Sprint 3 (Draft)

#### Story 3.1: Pre-Commit Hooks (Layer 1)

**Arquivo:** `docs/stories/v2.1/sprint-3/story-3.1-pre-commit-hooks-layer-1.md`

**Referências:**
- `docs/audits/DECISION-4-QUALITY-GATES-INVESTIGATION-REPORT.md` → Layer 1

**Descrição:**
```
Como desenvolvedor,
Quero pre-commit hooks automáticos,
Para validar código antes de commit

Acceptance Criteria:
  - Husky instalado e configurado
  - Roda ESLint (< 2s)
  - Roda Prettier (< 1s)
  - Roda TypeScript check (< 2s)
  - Roda unit tests afetados (< 5s)
  - Bloqueia commit se falhar
```

**Estimate:** 5 pontos (2 dias)

---

#### Story 3.2: CodeRabbit Local Extension

**Arquivo:** `docs/stories/v2.1/sprint-3/story-3.2-coderabbit-local-extension.md`

**Referências:**
- `docs/audits/DECISION-4-QUALITY-GATES-INVESTIGATION-REPORT.md` → CodeRabbit Local
- `docs/audits/PEDRO-DECISION-LOG.md` → Decisão 4

**Descrição:**
```
Como desenvolvedor,
Quero CodeRabbit IDE extension funcionando localmente,
Para AI code review em tempo real

Acceptance Criteria:
  - CodeRabbit extension configurada
  - Funciona com IDEs suportadas (Cursor, Windsurf, etc.)
  - Reviews code on save
  - Inline suggestions
  - Free tier functional
```

**Estimate:** 5 pontos (2 dias)

---

#### Story 3.3: PR Automation Setup (Layer 2)

**Arquivo:** `docs/stories/v2.1/sprint-3/story-3.3-pr-automation-layer-2.md`

**Referências:**
- `docs/audits/DECISION-4-QUALITY-GATES-INVESTIGATION-REPORT.md` → Layer 2

**Descrição:**
```
Como QA,
Quero GitHub Actions rodando em cada PR,
Para validation automática

Acceptance Criteria:
  - .github/workflows/quality-gates-pr.yml criado
  - Roda ESLint, Prettier, TypeScript
  - Roda integration tests
  - Roda coverage analysis
  - Bloqueia merge se falhar
```

**Estimate:** 5 pontos (2 dias)

---

#### Story 3.4: Quinn (QA Agent) Layer 2 Integration

**Arquivo:** `docs/stories/v2.1/sprint-3/story-3.4-quinn-layer-2-integration.md`

**Referências:**
- `docs/audits/DECISION-4-QUALITY-GATES-INVESTIGATION-REPORT.md` → Executor: Agente (Quinn)

**Descrição:**
```
Como QA,
Quero Quinn (QA Agent) rodando em PRs,
Para AI-powered test analysis

Acceptance Criteria:
  - Quinn executa em GitHub Actions
  - Analisa test results
  - Identifica missing test cases
  - Sugere edge cases
  - Comments on PR
```

**Estimate:** 8 pontos (3 dias)

---

#### Story 3.5: Human Review Orchestration (Layer 3)

**Arquivo:** `docs/stories/v2.1/sprint-3/story-3.5-human-review-layer-3.md`

**Referências:**
- `docs/audits/DECISION-4-QUALITY-GATES-INVESTIGATION-REPORT.md` → Layer 3

**Descrição:**
```
Como Tech Lead,
Quero human review focado em estratégia,
Para não perder tempo com syntax/patterns

Acceptance Criteria:
  - PR só vai para human após layers 1+2 passarem
  - Human vê apenas architectural/business concerns
  - Template de review com focus areas
  - Metrics de o que layers 1+2 já validaram
```

**Estimate:** 5 pontos (2 dias)

---

#### Story 3.6: Template Engine - Core Refactor

**Arquivo:** `docs/stories/v2.1/sprint-3/story-3.6-template-engine-core-refactor.md`

**Referências:**
- `docs/audits/PEDRO-DECISION-LOG.md` → Decisão 9
- `.aios-core/scripts/template-engine.js`

**Descrição:**
```
Como desenvolvedor,
Quero template engine refatorado,
Para suportar todos doc types

Acceptance Criteria:
  - Template engine modular
  - Suporta variáveis
  - Suporta condicionais
  - Suporta loops
  - Validation de output
```

**Estimate:** 8 pontos (3 dias)

---

#### Story 3.7: Template - PRD v2.0

**Arquivo:** `docs/stories/v2.1/sprint-3/story-3.7-template-prd-v2.md`

**Descrição:**
```
Como PO,
Quero template PRD atualizado,
Para gerar PRDs completos automaticamente

Acceptance Criteria:
  - prd-tmpl.yaml atualizado
  - Cobertura 100% seções PRD
  - Elicitation completa
  - Exemplos incluídos
```

**Estimate:** 3 pontos (1 dia)

---

#### Story 3.8: Template - ADR

**Arquivo:** `docs/stories/v2.1/sprint-3/story-3.8-template-adr.md`

**Descrição:**
```
Como arquiteto,
Quero template ADR,
Para documentar decisões arquiteturais

Acceptance Criteria:
  - adr-tmpl.yaml criado
  - Context, Decision, Consequences
  - Status (proposed, accepted, deprecated)
  - Alternatives considered
```

**Estimate:** 3 pontos (1 dia)

---

#### Story 3.9: Template - PMDR

**Arquivo:** `docs/stories/v2.1/sprint-3/story-3.9-template-pmdr.md`

**Descrição:**
```
Como PM,
Quero template PMDR,
Para documentar decisões de produto

Acceptance Criteria:
  - pmdr-tmpl.yaml criado
  - Problem, Solution, Rationale
  - Impact analysis
  - Metrics to track
```

**Estimate:** 3 pontos (1 dia)

---

#### Story 3.10: Template - DBDR

**Arquivo:** `docs/stories/v2.1/sprint-3/story-3.10-template-dbdr.md`

**Descrição:**
```
Como Data Engineer,
Quero template DBDR,
Para documentar decisões de database

Acceptance Criteria:
  - dbdr-tmpl.yaml criado
  - Schema changes
  - Migration strategy
  - Performance impact
  - Rollback plan
```

**Estimate:** 3 pontos (1 dia)

---

#### Story 3.11: Quality Gates Dashboard

**Arquivo:** `docs/stories/v2.1/sprint-3/story-3.11-quality-gates-dashboard.md`

**Descrição:**
```
Como Tech Lead,
Quero dashboard de quality gates,
Para visualizar métricas de qualidade

Acceptance Criteria:
  - Dashboard web (localhost:3001)
  - Mostra pass rate por layer
  - Mostra false positive rate
  - Trending (melhorando/piorando)
  - Drill-down por project/PR
```

**Estimate:** 8 pontos (3 dias)

---

#### Story 3.12: Documentation Sprint 3

**Arquivo:** `docs/stories/v2.1/sprint-3/story-3.12-documentation-sprint-3.md`

**Descrição:**
```
Como desenvolvedor,
Quero documentação de Quality Gates,
Para entender e customizar gates

Acceptance Criteria:
  - Quality Gates guide
  - Template Engine guide
  - CodeRabbit setup guide
  - Customization guide (add/remove checks)
```

**Estimate:** 5 pontos (2 dias)

---

### 📊 Sprint 3 Summary

**Total Stories:** 12  
**Total Points:** 64 pontos  
**Estimated Duration:** 2 semanas (10 dias úteis)  
**Team Size:** 3 developers  
**Velocity Esperada:** 60-70 pontos/semana

---

## 🏃 SPRINT 4: DEVOPS SETUP (1 semana)

### Objetivo do Sprint

Configurar **DevOps foundations** + **CodeRabbit GitHub App**:
- GitHub CLI integration
- Repository setup automation
- CodeRabbit GitHub App (Layer 2 completo)
- CI/CD pipelines
- Deployment workflows

**Decisão Relacionada:** Decisão 8 (CodeRabbit GitHub App timing)

---

### 📄 Arquivos para Analisar (Sprint 4)

#### Decisões & Planning

1. **`docs/audits/PEDRO-DECISION-LOG.md`**
   - Decisão 8: CodeRabbit Integration Timing

2. **`docs/audits/DECISION-4-QUALITY-GATES-INVESTIGATION-REPORT.md`**
   - CodeRabbit GitHub App
   - Layer 2 completo

3. **`docs/audits/INSTALLER-ROADMAP-V2.1.md`**
   - Sprint 4 details

#### Arquitetura & Implementação

4. **`docs/standards/AIOS-LIVRO-DE-OURO-V2.1-SUMMARY.md`**
   - DevOps setup
   - GitHub integration

5. **`.aios-core/development/agents/felix.md`**
   - Felix (DevOps agent) role
   - Capabilities

---

### 🎯 Épico Sprint 4

**Título:** `EPIC-S4: DevOps Setup + GitHub Integration`

**Descrição:**
```markdown
Implementar DevOps foundations: GitHub CLI integration, repository automation, CodeRabbit GitHub App, CI/CD pipelines.

Scope:
  - aios setup-github command
  - Repository template setup
  - CodeRabbit GitHub App integration
  - CI/CD workflows (tests, deploy)
  - Felix (DevOps agent) integration

Goals:
  - GitHub setup em < 5 minutos
  - CodeRabbit App funcionando em repos
  - CI/CD pipelines prontos
```

**Success Metrics:**
- Setup time: < 5 min
- GitHub App success rate: > 95%
- CI/CD working: 100%

**Stories:** 8-10 stories (detalhar abaixo)

---

### 📝 Stories Sprint 4 (Draft - Resumidas)

#### Story 4.1: GitHub CLI Integration
- **Estimate:** 5 pontos
- GitHub CLI wrapper, authentication, commands

#### Story 4.2: Repository Setup Automation
- **Estimate:** 8 pontos
- `aios setup-github` command, template repo, settings

#### Story 4.3: CodeRabbit GitHub App
- **Estimate:** 8 pontos
- GitHub App installation, webhook setup, PR reviews

#### Story 4.4: CI/CD Workflows
- **Estimate:** 5 pontos
- Test workflow, build workflow, deploy workflow

#### Story 4.5: Felix (DevOps Agent) Integration
- **Estimate:** 5 pontos
- Felix orchestrates DevOps tasks

#### Story 4.6: Deployment Automation
- **Estimate:** 8 pontos
- Vercel, Railway, Netlify integrations

#### Story 4.7: Documentation Sprint 4
- **Estimate:** 3 pontos
- DevOps setup guide, CI/CD guide

---

### 📊 Sprint 4 Summary

**Total Stories:** 7  
**Total Points:** 42 pontos  
**Estimated Duration:** 1 semana (5 dias úteis)  
**Team Size:** 2-3 developers

---

## 🏃 SPRINT 5: DOCUMENTATION (1 semana)

### Objetivo do Sprint

Finalizar **documentação completa** v2.1:
- Migration guides
- User guides
- API reference
- Video tutorials
- FAQ completo

**Decisão Relacionada:** Todas as decisões (documentação final)

---

### 📄 Arquivos para Analisar (Sprint 5)

#### Documentação Existente

1. **`docs/standards/AIOS-LIVRO-DE-OURO-V2.1-SUMMARY.md`**
2. **`docs/standards/AIOS-FRAMEWORK-MASTER.md`**
3. Todos os READMEs criados nos sprints anteriores

---

### 🎯 Épico Sprint 5

**Título:** `EPIC-S5: Complete Documentation v2.1`

**Descrição:**
```markdown
Finalizar documentação completa v2.1: migration guides, user guides, API reference, video tutorials.

Scope:
  - Migration guide v2.0 → v2.1 (completo)
  - Getting Started guide (completo)
  - API Reference (todos commands)
  - Video tutorials (3-5 videos)
  - FAQ (50+ perguntas)

Goals:
  - Documentação 100% completa
  - Zero perguntas sem resposta
  - Video coverage > 80%
```

---

### 📝 Stories Sprint 5 (Draft - Resumidas)

#### Story 5.1: Migration Guide Complete
- **Estimate:** 8 pontos
- Step-by-step migration, troubleshooting, rollback

#### Story 5.2: Getting Started Guide
- **Estimate:** 5 pontos
- First-time user complete guide

#### Story 5.3: API Reference
- **Estimate:** 5 pontos
- All CLI commands documented

#### Story 5.4: Video Tutorials
- **Estimate:** 13 pontos
- Record 5 videos (installation, setup, usage, migration, troubleshooting)

#### Story 5.5: FAQ Compilation
- **Estimate:** 5 pontos
- 50+ Q&A from all sprints

#### Story 5.6: Final Review & Polish
- **Estimate:** 3 pontos
- Review all docs, fix issues, polish

---

### 📊 Sprint 5 Summary

**Total Stories:** 6  
**Total Points:** 39 pontos  
**Estimated Duration:** 1 semana (5 dias úteis)  
**Team Size:** 2 developers + 1 technical writer

---

## 📋 TEMPLATE DE ÉPICO

Use este template para criar cada épico:

```markdown
# ÉPICO: [Nome do Épico]

**ID:** EPIC-SX  
**Sprint:** Sprint X  
**Status:** 📋 Backlog / 🏗️ In Progress / ✅ Done  
**Owner:** [Role - Agent Name]  
**Created:** YYYY-MM-DD  
**Updated:** YYYY-MM-DD

---

## 📊 Overview

### Objetivo
[Descrição clara do que este épico entrega]

### Justificativa
[Por que este épico é necessário? Qual decisão do Pedro justifica?]

### Scope
**In Scope:**
- Item 1
- Item 2

**Out of Scope:**
- Item 1 (vai para Sprint Y)
- Item 2 (não será implementado)

---

## 🎯 Goals & Metrics

### Success Criteria
- [ ] Critério 1 (mensurável)
- [ ] Critério 2 (mensurável)

### Metrics
- Métrica 1: valor alvo
- Métrica 2: valor alvo

---

## 📚 Referências

### Decisões do Pedro
- [Decisão X](../audits/PEDRO-DECISION-LOG.md#decisão-x)
- [Decisão Y](../audits/PEDRO-DECISION-LOG.md#decisão-y)

### Documentação Técnica
- [Doc 1](path/to/doc.md)
- [Doc 2](path/to/doc.md)

---

## 📝 Stories

### Stories Criadas (X total)

1. [Story X.1 - Nome](./sprint-x/story-x.1-nome.md) - 5 pts
2. [Story X.2 - Nome](./sprint-x/story-x.2-nome.md) - 8 pts
...

**Total Points:** XX pontos

---

## 🔗 Dependencies

### Depende De
- [EPIC-SY] - Descrição da dependência

### Bloqueia
- [EPIC-SZ] - Descrição

---

## 📅 Timeline

**Start Date:** YYYY-MM-DD  
**Target Date:** YYYY-MM-DD  
**Actual End Date:** YYYY-MM-DD (quando concluído)

---

## 🚨 Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Risk 1 | High | Low | Mitigation strategy |

---

## ✅ Acceptance Checklist

- [ ] Todas stories completadas
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Code review completado
- [ ] PO sign-off

---

## 📝 Notes

[Notas adicionais, learnings, etc.]
```

---

## 📋 TEMPLATE DE STORY

Use este template para criar cada story:

```markdown
# STORY: [Nome da Story]

**ID:** STORY-X.Y  
**Épico:** [EPIC-SX - Nome do Épico](../epic-sx.md)  
**Sprint:** Sprint X  
**Status:** 📋 Backlog / 🏗️ In Progress / 👀 Review / ✅ Done  
**Assignee:** [Developer Name]  
**Points:** X pontos  
**Priority:** 🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low  
**Created:** YYYY-MM-DD  
**Updated:** YYYY-MM-DD

---

## 📊 User Story

**Como** [role],  
**Quero** [feature/capability],  
**Para** [benefit/value]

---

## 📚 Context & Justificativa

### Por Que Esta Story?
[Explicação do problema que resolve ou valor que entrega]

### Decisão do Pedro
Esta story implementa:
- [Decisão X](../../audits/PEDRO-DECISION-LOG.md#decisão-x) - [Descrição breve]

### Referências Técnicas
- [Doc 1](path/to/doc.md) → Seção relevante
- [Doc 2](path/to/doc.md) → Seção relevante

---

## ✅ Acceptance Criteria

### Critérios Funcionais
- [ ] **GIVEN** [contexto]  
      **WHEN** [ação]  
      **THEN** [resultado esperado]

- [ ] **GIVEN** [contexto]  
      **WHEN** [ação]  
      **THEN** [resultado esperado]

### Critérios Não-Funcionais
- [ ] Performance: [métrica específica]
- [ ] Segurança: [requisito específico]
- [ ] Usabilidade: [requisito específico]

---

## 🔧 Implementation Details

### Technical Approach
[Descrição técnica de COMO implementar]

### Files to Change/Create
```
path/to/file1.js    # Criar novo
path/to/file2.js    # Modificar existente
path/to/file3.md    # Documentação
```

### Architecture Decisions
- Decisão 1: Rationale
- Decisão 2: Rationale

---

## 📋 Tasks Breakdown

### Development Tasks
- [ ] Task 1: [Descrição] (X horas)
- [ ] Task 2: [Descrição] (X horas)
- [ ] Task 3: [Descrição] (X horas)

### Testing Tasks
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

### Documentation Tasks
- [ ] Code comments
- [ ] API docs
- [ ] User docs

**Total Estimated:** X horas

---

## 🔗 Dependencies

### Depende De
- [STORY-X.Y] - Descrição

### Bloqueia
- [STORY-X.Z] - Descrição

---

## 🧪 Testing Strategy

### Unit Tests
```javascript
// Exemplo de test case
describe('Feature X', () => {
  it('should do Y when Z', () => {
    // Test implementation
  });
});
```

### Integration Tests
[Descrição dos integration tests necessários]

### Manual Testing
1. Step 1
2. Step 2
3. Expected result

---

## 📝 Definition of Done

- [ ] Code written & follows standards
- [ ] Unit tests written & passing
- [ ] Integration tests written & passing
- [ ] Code reviewed & approved
- [ ] Documentation updated
- [ ] Acceptance criteria validated
- [ ] No linting errors
- [ ] No known bugs
- [ ] PO sign-off

---

## 🚨 Risks & Assumptions

### Risks
- **Risk 1:** [Descrição] - Mitigation: [estratégia]

### Assumptions
- Assumption 1
- Assumption 2

---

## 📝 Notes & Learnings

[Espaço para notas durante implementação, learnings, etc.]

---

## 🔄 Story History

| Date | Event | By |
|------|-------|-----|
| YYYY-MM-DD | Story created | SM (Sage) |
| YYYY-MM-DD | Started development | Dev Name |
| YYYY-MM-DD | Completed | Dev Name |
```

---

## ✅ CHECKLIST DE VALIDAÇÃO

Use este checklist para validar cada épico/story antes de passar para o PO:

### ✅ Checklist Épico

- [ ] **Título claro** e descritivo
- [ ] **Objetivo** bem definido
- [ ] **Justificativa** referencia decisão do Pedro
- [ ] **Scope** claro (in/out)
- [ ] **Success criteria** mensuráveis
- [ ] **Stories** todas listadas e linkadas
- [ ] **Dependencies** identificadas
- [ ] **Risks** avaliados com mitigation
- [ ] **Total points** calculado
- [ ] **Timeline** estimado
- [ ] Épico file salvo em: `docs/epics/epic-sX-nome.md`

---

### ✅ Checklist Story

- [ ] **User story** formato correto (Como/Quero/Para)
- [ ] **Context** explica o "por quê"
- [ ] **Decisão do Pedro** referenciada com link
- [ ] **Referências técnicas** listadas (docs para analisar)
- [ ] **Acceptance criteria** em formato Given/When/Then
- [ ] **Implementation details** suficientemente detalhado
- [ ] **Files to change** listados
- [ ] **Tasks breakdown** completo com estimativas
- [ ] **Dependencies** identificadas
- [ ] **Testing strategy** definida
- [ ] **Definition of Done** completa
- [ ] **Risks** avaliados
- [ ] **Points** estimados (Fibonacci: 1,2,3,5,8,13)
- [ ] Story file salvo em: `docs/stories/v2.1/sprint-x/story-x.y-nome.md`

---

### ✅ Checklist Geral (Antes de Passar para PO)

- [ ] **Todos os 5 épicos** criados (EPIC-S1 a EPIC-S5)
- [ ] **Todas as stories** drafted (estimativa: 55-65 stories total)
- [ ] **Total points** por sprint calculado
- [ ] **Velocity check:** Points/sprint razoável para team size
- [ ] **Dependencies** entre stories/épicos mapeadas
- [ ] **Risks** críticos identificados e documentados
- [ ] **Formatting** consistente em todos files
- [ ] **Links** todos funcionando
- [ ] **Referências** a decisões do Pedro corretas
- [ ] README criado em `docs/epics/README.md`
- [ ] README criado em `docs/stories/v2.1/README.md`

---

## 🎯 PRÓXIMOS PASSOS (APÓS FINALIZAR)

### 1. Entrega para PO (Nova)

Após finalizar todos épicos + stories:

```markdown
# HANDOFF: SM → PO

**De:** SM (Sage)  
**Para:** PO (Nova)  
**Data:** [Data]

## O Que Foi Entregue

✅ 5 Épicos criados (EPIC-S1 a EPIC-S5)  
✅ XX Stories drafted (estimativa: 55-65 stories)  
✅ XXX pontos totais estimados  
✅ 7.5 semanas timeline estimado  

## Arquivos Criados

### Épicos
- docs/epics/epic-s1-installer-foundation.md
- docs/epics/epic-s2-modular-architecture.md
- docs/epics/epic-s3-quality-templates.md
- docs/epics/epic-s4-devops-setup.md
- docs/epics/epic-s5-documentation.md

### Stories
- docs/stories/v2.1/sprint-1/ (12 stories)
- docs/stories/v2.1/sprint-2/ (16 stories)
- docs/stories/v2.1/sprint-3/ (12 stories)
- docs/stories/v2.1/sprint-4/ (7 stories)
- docs/stories/v2.1/sprint-5/ (6 stories)

## Próximo Passo: PO Review

Nova, sua missão:

1. ✅ **Revisar cada épico** - Objetivos claros?
2. ✅ **Revisar stories** - Acceptance criteria completos?
3. ✅ **Validar prioridades** - Ordem faz sentido?
4. ✅ **Validar scope** - In/out correto?
5. ✅ **Aprovar ou solicitar ajustes**

## Critérios de Aprovação

Para aprovar roadmap v2.1:

- [ ] Todos épicos aligned com decisões do Pedro
- [ ] Stories com acceptance criteria claros
- [ ] Estimativas razoáveis
- [ ] Dependencies mapeadas
- [ ] Risks identificados
- [ ] 100% das decisões do Pedro implementadas

Se aprovado → **Sprint 1 pode começar!** 🚀
```

---

### 2. Quando PO Aprovar

Após aprovação do PO:

```bash
# Criar epic tracker
$ aios create-epic-tracker

# Iniciar Sprint 1
$ aios start-sprint 1

# Atribuir stories para devs
$ aios assign story-1.1 @dex
$ aios assign story-1.2 @dex
...

# Daily tracking
$ aios standup
```

---

## 🎊 BOA SORTE, SAGE!

Você tem tudo que precisa para criar um roadmap épico para v2.1! 

**Lembre-se:**
- 📚 **Leia TODOS os documentos de referência** antes de começar
- 🎯 **Referencie sempre as decisões do Pedro**
- ✅ **Use os templates fornecidos**
- 🔍 **Valide com checklists**
- 💬 **Dúvidas? Consulte os roundtables e investigações**

**Quando finalizar, passe para Nova (PO) validar!** 🚀

---

**Criado por:** Claude + Pedro Valério  
**Data:** 2025-01-19  
**Versão:** 1.0  
**Status:** ✅ Ready for Execution

