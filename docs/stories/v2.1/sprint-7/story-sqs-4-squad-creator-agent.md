# Story SQS-4: Squad Creator Agent + Tasks

<!-- Source: Epic SQS - Squad System Enhancement -->
<!-- Context: Agent + Tasks for creating, validating and managing squads -->
<!-- Architecture: ADR-SQS-001 approved 2025-12-18 -->

## Status: Done

## QA Results

| Check | Status |
|-------|--------|
| All ACs verified | ✅ 10/10 |
| Tests passing | ✅ 127/127 |
| Lint clean | ✅ 0 errors |
| Code review | ✅ Approved |
| **QA Gate** | ✅ **PASS** |

*Reviewed by @qa (Quinn) - 2025-12-18*

## Story

**As an** AIOS developer,
**I want** a dedicated agent with tasks for creating, validating, and managing squads,
**so that** I can easily create new squads that follow AIOS standards and work in synergy with aios-core.

## Architecture Change

> **MUDANÇA ARQUITETURAL CRÍTICA:**
> - **Antes:** CLI npm package (`create-aios-squad`)
> - **Agora:** Agent + Tasks em `.aios-core/development/`

### Justificativa

1. **Task-First:** Segue arquitetura AIOS onde tasks são o ponto de entrada
2. **Integração:** Agent usa scripts do SQS-2 e SQS-3 diretamente
3. **Consistência:** Mesmo padrão do expansion-creator anterior
4. **Flexibilidade:** 3-level distribution (Local, aios-squads, Synkra API)

## Acceptance Criteria

1. Agent definition criado em `.aios-core/development/agents/squad-creator.md`
2. Task `*create-squad` gera estrutura completa de squad
3. ~~Task `*validate-squad` valida squad (integra SQS-3)~~ ✅ **DONE** (implemented in SQS-3)
4. Task `*list-squads` lista squads locais do projeto
5. Task `*download-squad` placeholder criado (implementação Sprint 8 - SQS-5)
6. Task `*publish-squad` placeholder criado (implementação Sprint 8 - SQS-6)
7. Squads gerados seguem task-first architecture
8. Config inheritance funciona (extend/override)
9. Integração com squad-loader (SQS-2) e squad-validator (SQS-3)
10. Agent ativável via `@squad-creator` ou alias `@craft` (via agent `aliases` field)

## Tasks / Subtasks

### Task 1: Criar Agent Definition (AC: 1, 10)

**Responsável:** @dev (Dex)
**Atomic Layer:** Agent

**Arquivo:** `.aios-core/development/agents/squad-creator.md`

> **⚠️ IMPORTANT:** Agent definition MUST follow full AIOS agent format including:
> - `activation-instructions` (STEP 1-5 pattern)
> - `persona_profile` with archetype, communication style
> - `dependencies` section with tasks mapping
> - `commands` with visibility metadata
>
> **Reference:** `.aios-core/development/agents/dev.md` for complete format

```markdown
---
agent:
  name: Craft
  id: squad-creator
  title: Squad Creator
  icon: "🏗️"
  aliases: ["craft"]  # Enables @craft activation
  whenToUse: Use to create, validate, publish and manage squads

persona:
  role: Squad Architect & Builder
  style: Systematic, task-first, follows AIOS standards
  focus: Create well-structured squads that work in synergy with aios-core

persona_profile:
  archetype: Builder
  communication:
    tone: systematic
    emoji_frequency: low
    vocabulary:
      - "squad structure"
      - "task-first"
      - "validation"
      - "manifest"

activation-instructions:
  - "STEP 1: Read THIS ENTIRE FILE"
  - "STEP 2: Adopt the persona defined in 'agent' and 'persona' sections"
  - "STEP 3: Build greeting using greeting-builder.js"
  - "STEP 4: Display greeting with available commands"
  - "STEP 5: HALT and await user input"

commands:
  - name: create-squad
    description: Create new squad following task-first architecture
    task: squad-creator-create.md
  - name: validate-squad
    description: Validate squad against JSON Schema and AIOS standards
    task: squad-creator-validate.md
  - name: list-squads
    description: List all local squads in the project
    task: squad-creator-list.md
  - name: download-squad
    description: Download public squad from aios-squads repository
    task: squad-creator-download.md
    sprint: 8
  - name: publish-squad
    description: Publish squad to aios-squads repository (creates PR)
    task: squad-creator-publish.md
    sprint: 8
  - name: sync-squad-synkra
    description: Sync squad to Synkra API marketplace
    task: squad-creator-sync-synkra.md
    sprint: 8

dependencies:
  scripts:
    - squad/squad-loader.js      # SQS-2
    - squad/squad-validator.js   # SQS-3
    - squad/squad-generator.js   # This story
  schemas:
    - squad-schema.json          # SQS-3
---

# Squad Creator Agent (Craft)

Craft é o agente responsável por criar, validar e gerenciar squads no AIOS.

## Ativação

@squad-creator
@craft

## Comandos Disponíveis

| Comando | Descrição | Sprint |
|---------|-----------|--------|
| *create-squad | Cria novo squad | 7 |
| *validate-squad | Valida squad existente | 7 |
| *list-squads | Lista squads locais | 7 |
| *download-squad | Baixa squad público | 8 |
| *publish-squad | Publica squad | 8 |
| *sync-squad-synkra | Sync para Synkra API | 8 |

## Princípios

1. **Task-First:** Squads seguem arquitetura task-first
2. **Sinergia:** Squads trabalham em conjunto com aios-core
3. **Validação:** Sempre validar antes de publicar
4. **Documentação:** Squads devem ser auto-documentados

## Workflow Típico

@squad-creator

*create-squad meu-dominio-squad
# → Gera estrutura em ./squads/meu-dominio-squad/

*validate-squad meu-dominio-squad
# → Valida contra schema e standards

*publish-squad meu-dominio-squad
# → Cria PR para aios-squads (se quiser tornar público)
```

- [x] 1.1 Criar arquivo `.aios-core/development/agents/squad-creator.md`
- [x] 1.2 Definir agent metadata (name, id, icon)
- [x] 1.3 Definir persona e style
- [x] 1.4 Mapear commands para tasks
- [x] 1.5 Documentar dependencies (scripts, schemas)
- [x] 1.6 Adicionar exemplos de uso

### Task 2: Criar Task *create-squad (AC: 2, 7, 8)

**Responsável:** @dev (Dex)
**Atomic Layer:** Task

**Arquivo:** `.aios-core/development/tasks/squad-creator-create.md`

```markdown
---
task: Create Squad
responsável: @squad-creator
responsável_type: agent
atomic_layer: task
Entrada: |
  - name: Nome do squad (kebab-case, obrigatório)
  - description: Descrição (opcional, elicitação)
  - author: Autor (opcional, default: git config user.name)
  - license: Licença (opcional, default: MIT)
  - template: Template base (basic | etl | agent-only)
  - config_mode: extend | override | none
Saída: |
  - squad_path: Caminho do squad criado
  - manifest: Conteúdo do squad.yaml gerado
  - next_steps: Instruções para próximos passos
Checklist:
  - [ ] Validar nome (kebab-case, não existe)
  - [ ] Coletar informações via elicitação
  - [ ] Gerar estrutura de diretórios
  - [ ] Gerar squad.yaml
  - [ ] Gerar arquivos de config (coding-standards, etc.)
  - [ ] Gerar exemplo de agent
  - [ ] Gerar exemplo de task
  - [ ] Executar validação inicial
  - [ ] Exibir próximos passos
---

# *create-squad

Cria um novo squad seguindo a arquitetura task-first do AIOS.

## Uso

@squad-creator

*create-squad
# → Modo interativo, elicita todas as informações

*create-squad meu-squad
# → Usa defaults para o resto

*create-squad meu-squad --template etl --author "Meu Nome"
# → Especifica opções diretamente

## Elicitação Interativa

? Squad name: meu-dominio-squad
? Description: Squad para automação de processos X
? Author: [git config user.name]
? License: (MIT)
  > MIT
    Apache-2.0
    ISC
    UNLICENSED
? Template:
  > basic (estrutura mínima)
    etl (processamento de dados)
    agent-only (apenas agentes)
? Include example agent? (Y/n)
? Include example task? (Y/n)
? Config inheritance:
  > extend (adiciona às regras do core)
    override (substitui regras do core)
    none (sem herança)
? Minimum AIOS version: (2.1.0)

## Estrutura Gerada

./squads/meu-dominio-squad/
├── squad.yaml                    # Manifest
├── README.md                     # Documentação
├── config/
│   ├── coding-standards.md      # Extends/override core
│   ├── tech-stack.md            # Tecnologias do squad
│   └── source-tree.md           # Estrutura documentada
├── agents/
│   └── example-agent.md         # Agente de exemplo
├── tasks/
│   └── example-agent-task.md    # Task de exemplo
├── checklists/
│   └── .gitkeep
├── workflows/
│   └── .gitkeep
├── templates/
│   └── .gitkeep
├── tools/
│   └── .gitkeep
├── scripts/
│   └── .gitkeep
└── data/
    └── .gitkeep

## squad.yaml Gerado

name: meu-dominio-squad
version: 1.0.0
description: Squad para automação de processos X
author: Meu Nome
license: MIT
slashPrefix: meu-dominio

aios:
  minVersion: "2.1.0"
  type: squad

components:
  tasks:
    - example-agent-task.md
  agents:
    - example-agent.md
  workflows: []
  checklists: []
  templates: []
  tools: []
  scripts: []

config:
  extends: extend
  coding-standards: config/coding-standards.md
  tech-stack: config/tech-stack.md
  source-tree: config/source-tree.md

dependencies:
  node: []
  python: []
  squads: []

tags:
  - custom
  - automation

## Output de Sucesso

✅ Squad created successfully!

📁 Location: ./squads/meu-dominio-squad/

📋 Next steps:
   1. cd squads/meu-dominio-squad
   2. Customize squad.yaml with your details
   3. Create your agents in agents/
   4. Create tasks in tasks/ (task-first!)
   5. Validate: @squad-creator *validate-squad meu-dominio-squad

📚 Documentation:
   - Squad Guide: docs/guides/squads-guide.md
   - Task Format: .aios-core/docs/standards/TASK-FORMAT-SPECIFICATION-V1.md

🚀 When ready to share:
   - Local only: Keep in ./squads/ (private)
   - Public: @squad-creator *publish-squad meu-dominio-squad
   - API: @squad-creator *sync-squad-synkra meu-dominio-squad
```

- [x] 2.1 Criar task file com formato TASK-FORMAT-SPECIFICATION-V1
- [x] 2.2 Implementar elicitação interativa
- [x] 2.3 Implementar validação de nome (kebab-case, único)
- [x] 2.4 Implementar geração de estrutura de diretórios
- [x] 2.5 Implementar geração de squad.yaml
- [x] 2.6 Implementar templates (basic, etl, agent-only)
- [x] 2.7 Implementar config inheritance
- [x] 2.8 Executar validação inicial após criação
- [x] 2.9 Exibir próximos passos

### Task 3: Criar Squad Generator Script (AC: 2, 7)

**Responsável:** @dev (Dex)
**Atomic Layer:** Script

**Arquivo:** `.aios-core/development/scripts/squad/squad-generator.js`

```javascript
/**
 * Squad Generator
 *
 * Gera estrutura de squad seguindo task-first architecture.
 * Usado pela task *create-squad do squad-creator agent.
 */

const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');

const DEFAULT_SQUADS_PATH = './squads';

// Templates de arquivos
const TEMPLATES = {
  'squad.yaml': (config) => `
name: ${config.name}
version: 1.0.0
description: ${config.description || 'Custom squad'}
author: ${config.author || 'Unknown'}
license: ${config.license || 'MIT'}
slashPrefix: ${config.name.replace(/-squad$/, '')}

aios:
  minVersion: "${config.aiosMinVersion || '2.1.0'}"
  type: squad

components:
  tasks: ${config.includeTask ? '\n    - example-agent-task.md' : '[]'}
  agents: ${config.includeAgent ? '\n    - example-agent.md' : '[]'}
  workflows: []
  checklists: []
  templates: []
  tools: []
  scripts: []

config:
  extends: ${config.configMode || 'extend'}
  coding-standards: config/coding-standards.md
  tech-stack: config/tech-stack.md
  source-tree: config/source-tree.md

dependencies:
  node: []
  python: []
  squads: []

tags:
  - custom
`.trim(),

  'README.md': (config) => `
# ${config.name}

${config.description || 'Custom AIOS squad.'}

## Installation

This squad is installed locally in your project:

./squads/${config.name}/

## Usage

Activate agents from this squad and use their commands.

## Components

### Agents
- example-agent.md - Example agent (customize or remove)

### Tasks
- example-agent-task.md - Example task (customize or remove)

## License

${config.license || 'MIT'}
`.trim()
};

class SquadGenerator {
  constructor(options = {}) {
    this.squadsPath = options.squadsPath || DEFAULT_SQUADS_PATH;
  }

  async generate(config) {
    const squadPath = path.join(this.squadsPath, config.name);

    // Check if already exists
    if (await this.pathExists(squadPath)) {
      throw new Error(`Squad "${config.name}" already exists at ${squadPath}`);
    }

    // Create directories
    const dirs = ['', 'config', 'agents', 'tasks', 'workflows',
                  'checklists', 'templates', 'tools', 'scripts', 'data'];

    for (const dir of dirs) {
      await fs.mkdir(path.join(squadPath, dir), { recursive: true });
    }

    // Generate files from templates
    const files = [];
    for (const [filename, template] of Object.entries(TEMPLATES)) {
      const content = template(config);
      const filePath = path.join(squadPath, filename);
      await fs.writeFile(filePath, content, 'utf-8');
      files.push(filePath);
    }

    return { path: squadPath, files };
  }

  async pathExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { SquadGenerator, TEMPLATES };
```

- [x] 3.1 Criar classe `SquadGenerator`
- [x] 3.2 Implementar templates para cada arquivo
- [x] 3.3 Implementar `generate(config)` method
- [x] 3.4 Implementar criação de diretórios
- [x] 3.5 Implementar geração de arquivos a partir de templates
- [x] 3.6 Adicionar .gitkeep em diretórios vazios
- [x] 3.7 Documentar API com JSDoc

### Task 4: Criar Task *list-squads (AC: 4)

**Responsável:** @dev (Dex)
**Atomic Layer:** Task

**Arquivo:** `.aios-core/development/tasks/squad-creator-list.md`

```markdown
---
task: List Squads
responsável: @squad-creator
responsável_type: agent
atomic_layer: task
Entrada: |
  - path: Caminho alternativo (opcional, default: ./squads)
  - format: Formato de output (table | json | yaml)
Saída: |
  - squads: Lista de squads encontrados
  - count: Número total de squads
Checklist:
  - [ ] Usar squad-loader.listLocal()
  - [ ] Formatar output conforme format
  - [ ] Exibir informações básicas de cada squad
---

# *list-squads

Lista todos os squads locais do projeto.

## Uso

@squad-creator
*list-squads
*list-squads --format json

## Output Exemplo

Local Squads (./squads/)

┌─────────────────────┬─────────┬─────────────────────────────┐
│ Name                │ Version │ Description                 │
├─────────────────────┼─────────┼─────────────────────────────┤
│ meu-dominio-squad   │ 1.0.0   │ Squad para automação de X   │
│ outro-squad         │ 2.1.0   │ Outro squad customizado     │
└─────────────────────┴─────────┴─────────────────────────────┘

Total: 2 squads
```

- [x] 4.1 Criar task file
- [x] 4.2 Integrar com squad-loader.listLocal()
- [x] 4.3 Implementar formatação table/json/yaml
- [x] 4.4 Exibir informações relevantes de cada squad

### Task 5: Criar Placeholder Tasks para Sprint 8 (AC: 5, 6)

**Responsável:** @dev (Dex)
**Atomic Layer:** Task

> **📋 SCOPE NOTE:** These are **placeholder files only** with basic structure.
> Full implementation will be done in Sprint 8:
> - `*download-squad` → Story SQS-5 (SquadSyncService)
> - `*publish-squad` → Story SQS-6 (Registry Integration)
> - `*sync-squad-synkra` → Story SQS-5 (Synkra API)

**Placeholder Format:**
```markdown
---
task: [Task Name]
responsável: @squad-creator
status: placeholder
sprint: 8
---

# *[command-name]

> ⚠️ **PLACEHOLDER** - Implementation scheduled for Sprint 8

## Planned Functionality
[Brief description]

## Related Story
- SQS-X: [Story Name]
```

- [x] 5.1 Criar `squad-creator-download.md` (placeholder com referência a SQS-5)
- [x] 5.2 Criar `squad-creator-publish.md` (placeholder com referência a SQS-6)
- [x] 5.3 Criar `squad-creator-sync-synkra.md` (placeholder com referência a SQS-5)

### Task 6: Unit Tests (AC: 9)

**Responsável:** @qa (Quinn) / @dev (Dex)
**Atomic Layer:** Test

**Arquivo:** `tests/unit/squad/squad-generator.test.js`

> **📁 Path Convention:** Tests follow `tests/unit/{module}/` pattern, consistent with existing `squad-validator.test.js`

- [x] 6.1 Test: generate() cria estrutura completa
- [x] 6.2 Test: generate() falha se squad já existe
- [x] 6.3 Test: templates geram conteúdo válido
- [x] 6.4 Test: config inheritance é respeitado
- [x] 6.5 Test: arquivos opcionais são gerados corretamente
- [x] 6.6 Test: squad.yaml gerado passa validação (integração com SQS-3)
- [x] 6.7 Test: .gitkeep criados em diretórios vazios
- [x] 6.8 Coverage >= 80%

### Task 7: Integration Test (AC: 9)

**Responsável:** @qa (Quinn)
**Atomic Layer:** Integration Test

- [x] 7.1 Testar fluxo completo: create → validate
- [x] 7.2 Testar todos os templates (basic, etl, agent-only)
- [x] 7.3 Testar config inheritance modes
- [x] 7.4 Verificar que squad gerado funciona com aios-core

## Dev Notes

### Arquitetura Agent + Tasks

```
.aios-core/development/
├── agents/
│   └── squad-creator.md           # Agent definition
├── tasks/
│   ├── squad-creator-create.md    # *create-squad
│   ├── squad-creator-validate.md  # *validate-squad (SQS-3)
│   ├── squad-creator-list.md      # *list-squads
│   ├── squad-creator-download.md  # *download-squad (Sprint 8)
│   ├── squad-creator-publish.md   # *publish-squad (Sprint 8)
│   └── squad-creator-sync-synkra.md # *sync-squad-synkra (Sprint 8)
└── scripts/
    └── squad/
        ├── index.js               # Exports centralizados
        ├── squad-loader.js        # SQS-2
        ├── squad-validator.js     # SQS-3
        └── squad-generator.js     # THIS STORY
```

### Modelo de Distribuição (3 níveis)

```
┌────────────────────────────────────────────────────────┐
│                 SQUAD DISTRIBUTION                      │
├────────────────────────────────────────────────────────┤
│ 1. LOCAL (Privado)                                     │
│    └─ ./squads/meu-squad/                              │
│    └─ *create-squad → gera aqui                        │
│                                                        │
│ 2. AIOS-SQUADS (Público)                               │
│    └─ github.com/SynkraAI/aios-squads                  │
│    └─ *publish-squad → cria PR                         │
│    └─ *download-squad → baixa para ./squads/           │
│                                                        │
│ 3. SYNKRA API (Marketplace)                            │
│    └─ api.synkra.dev/squads                            │
│    └─ *sync-squad-synkra → publica na API              │
└────────────────────────────────────────────────────────┘
```

### Templates Disponíveis

| Template | Descrição | Componentes |
|----------|-----------|-------------|
| `basic` | Estrutura mínima | 1 agent, 1 task |
| `etl` | Processamento de dados | 2 agents, 3 tasks, scripts |
| `agent-only` | Apenas agentes | 2 agents, sem tasks |

### Integração com core-config

O squad gerado se integra com o projeto via:

```yaml
# core-config.yaml
squads:
  templateLocation: templates/squad
  autoLoad: true
  localPath: ./squads
  active:
    - meu-dominio-squad    # ← Squad criado aparece aqui
```

## Scope Summary

| ✅ In Scope (Sprint 7) | ❌ Out of Scope (Sprint 8) |
|------------------------|---------------------------|
| Agent definition (`squad-creator.md`) | `*download-squad` full implementation |
| `*create-squad` task + script | `*publish-squad` full implementation |
| `*list-squads` task | `*sync-squad-synkra` full implementation |
| Unit tests (squad-generator) | Synkra API integration |
| Integration with SQS-2/SQS-3 | Registry integration |
| Sprint 8 placeholder files | npm package publishing |

> **Note:** `*validate-squad` already implemented in SQS-3

## Dependencies

- **Upstream:** SQS-2 (Loader), SQS-3 (Validator) - both ✅ DONE
- **Downstream:** Sprint 8 stories (SQS-5: SquadSyncService, SQS-6: Registry)

## Risk Assessment

### Implementation Risks
- **Risk:** Elicitação complexa pode confundir usuário
- **Mitigation:** Defaults sensatos, --yes para skip
- **Verification:** Testar UX com usuários reais

### Rollback Plan
- Agent é novo, não afeta funcionalidade existente
- Se issues, desabilitar comandos individuais

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-12-18 | 0.1 | Story criada como CLI | @po (Pax) |
| 2025-12-18 | 1.0 | **MAJOR:** Reescrita como Agent + Tasks | @po (Pax) |
| 2025-12-18 | 1.1 | **Validation fixes:** AC3 marked done, test path fixed, agent format clarified, Sprint 8 scope documented | @po (Pax) |
| 2025-12-18 | 2.0 | **IMPLEMENTATION COMPLETE:** All 7 tasks implemented, 127 tests passing | @dev (Dex) |
| 2025-12-18 | 2.1 | **QA APPROVED:** All 10 ACs verified, 127 tests pass, lint clean | @qa (Quinn) |

---

**Story Points:** 13
**Sprint:** 7
**Priority:** Critical (entrega principal do sprint)
**Validated:** 2025-12-18 by @po (Pax) - APPROVED FOR DEVELOPMENT
**Implemented:** 2025-12-18 by @dev (Dex) - 127 tests passing, ready for QA

---

## File List

Files created/modified in this story:

| File | Action | Task | Status |
|------|--------|------|--------|
| `.aios-core/development/agents/squad-creator.md` | CREATE | Task 1 | ✅ |
| `.aios-core/development/tasks/squad-creator-create.md` | CREATE | Task 2 | ✅ |
| `.aios-core/development/scripts/squad/squad-generator.js` | CREATE | Task 3 | ✅ |
| `.aios-core/development/scripts/squad/index.js` | MODIFY | Task 3 | ✅ |
| `.aios-core/development/tasks/squad-creator-list.md` | CREATE | Task 4 | ✅ |
| `.aios-core/development/tasks/squad-creator-download.md` | CREATE | Task 5 | ✅ |
| `.aios-core/development/tasks/squad-creator-publish.md` | CREATE | Task 5 | ✅ |
| `.aios-core/development/tasks/squad-creator-sync-synkra.md` | CREATE | Task 5 | ✅ |
| `tests/unit/squad/squad-generator.test.js` | CREATE | Task 6 | ✅ |
| `tests/unit/squad/squad-generator-integration.test.js` | CREATE | Task 7 | ✅ |

**Total: 10 files (9 created, 1 modified)**

**Existing files (no changes needed):**
- `.aios-core/development/tasks/squad-creator-validate.md` ✅ (SQS-3)
- `.aios-core/development/scripts/squad/squad-validator.js` ✅ (SQS-3)
- `.aios-core/development/scripts/squad/squad-loader.js` ✅ (SQS-2)
