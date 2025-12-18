# Story SQS-2: Squad Loader Utility

<!-- Source: Epic SQS - Squad System Enhancement -->
<!-- Context: Simplified utility for resolving and loading squad manifests -->
<!-- Architecture: ADR-SQS-001 approved 2025-12-18 -->

## Status: ✅ Done

## Story

**As a** squad-creator agent (Craft),
**I want** a utility to resolve and load squad manifests from local directories,
**so that** I can validate, manage and interact with squads in the project.

## Scope Change

> **ARQUITETURA REVISADA:** Esta story foi simplificada de um "serviço complexo com múltiplas estratégias de loading" para uma **utility simples** que é usada internamente pelo squad-creator agent.

**Escopo Original (descartado):**
- Squad Loader como serviço standalone
- 4-level resolution chain (Local → npm → Workspace → Registry)
- Hybrid loading strategy (eager/lazy)
- Caching layer com invalidação

**Escopo Atual (simplificado):**
- Utility script em `.aios-core/development/scripts/squad/`
- Resolução Local apenas (`./squads/`)
- Usado pelo squad-creator agent via tasks
- Download de squads públicos via task separada (SQS-4)

## Acceptance Criteria

1. Utility criada em `.aios-core/development/scripts/squad/squad-loader.js`
2. Função `resolve(squadName)` encontra squad em `./squads/{name}/`
3. Função `loadManifest(squadPath)` carrega e parseia `squad.yaml` ou `config.yaml`
4. Função `listLocal()` retorna lista de squads locais no projeto
5. Suporte a `squad.yaml` (preferido) e `config.yaml` (deprecated com warning)
6. Mensagens de erro claras quando squad não encontrado
7. Unit tests com 80%+ statement coverage (Jest `--coverage`)
8. Integração com squad-creator agent tasks

## Performance Requirements

| Método | Target | Condição |
|--------|--------|----------|
| `resolve()` | < 100ms | Single squad lookup |
| `loadManifest()` | < 150ms | Parse YAML file |
| `listLocal()` | < 500ms | Até 20 squads no diretório |

## Non-Functional Requirements

- **Cross-platform:** Funcionar em Windows, macOS e Linux
- **Error Messages:** Mensagens em inglês com sugestões de fix
- **Logging:** Suporte a verbose mode para debugging
- **Dependencies:** Apenas `js-yaml` como dependência externa

## Tasks / Subtasks

### Task 1: Criar Estrutura do Squad Scripts Directory (AC: 1)

**Responsável:** @dev (Dex)
**Responsável Type:** Worker
**Atomic Layer:** Config
**Estimated Duration:** 30min

**Entrada:**
- Nenhuma (task de setup inicial)

**Saída:**
- Diretório `.aios-core/development/scripts/squad/` criado
- Arquivo `index.js` com exports
- Arquivo `README.md` com documentação

**Checklist:**
- [x] 1.1 Criar diretório `.aios-core/development/scripts/squad/`
- [x] 1.2 Criar `index.js` com exports centralizados
- [x] 1.3 Documentar propósito do diretório no `README.md`

**Validation:**
```bash
# Verificar estrutura criada
ls -la .aios-core/development/scripts/squad/
# Deve mostrar: index.js, README.md
```

### Task 2: Implementar Squad Loader Utility (AC: 1, 2, 3, 4, 5)

**Responsável:** @dev (Dex)
**Responsável Type:** Worker
**Atomic Layer:** Script
**Estimated Duration:** 2h

**Entrada:**
- `squadName` (string): Nome do squad em kebab-case
- `squadPath` (string): Path para diretório do squad
- `options` (object): { squadsPath, verbose }

**Saída:**
- `SquadLoader` class exportada
- Métodos: `resolve()`, `loadManifest()`, `listLocal()`
- Constants: `MANIFEST_FILES`, `DEFAULT_SQUADS_PATH`

**Arquivo:** `.aios-core/development/scripts/squad/squad-loader.js`

```javascript
/**
 * Squad Loader Utility
 *
 * Responsabilidades:
 * - Resolver path de squads locais
 * - Carregar e parsear manifests (squad.yaml/config.yaml)
 * - Listar squads disponíveis no projeto
 *
 * Usado por: squad-creator agent tasks
 */

const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');

const MANIFEST_FILES = ['squad.yaml', 'config.yaml'];
const DEFAULT_SQUADS_PATH = './squads';

class SquadLoader {
  constructor(options = {}) {
    this.squadsPath = options.squadsPath || DEFAULT_SQUADS_PATH;
    this.verbose = options.verbose || false;
  }

  /**
   * Resolve squad path by name
   * @param {string} squadName - Nome do squad (kebab-case)
   * @returns {Promise<{path: string, manifestPath: string}>}
   */
  async resolve(squadName) {
    const squadPath = path.join(this.squadsPath, squadName);

    // Check if squad directory exists
    const exists = await this.pathExists(squadPath);
    if (!exists) {
      throw new Error(`Squad "${squadName}" not found in ${this.squadsPath}/`);
    }

    // Find manifest file
    const manifestPath = await this.findManifest(squadPath);
    if (!manifestPath) {
      throw new Error(`No manifest found in ${squadPath}/ (expected squad.yaml or config.yaml)`);
    }

    return { path: squadPath, manifestPath };
  }

  /**
   * Load and parse squad manifest
   * @param {string} squadPath - Path to squad directory
   * @returns {Promise<object>} Parsed manifest data
   */
  async loadManifest(squadPath) {
    const manifestPath = await this.findManifest(squadPath);
    if (!manifestPath) {
      throw new Error(`No manifest found in ${squadPath}/`);
    }

    // Deprecation warning for config.yaml
    if (path.basename(manifestPath) === 'config.yaml') {
      console.warn(`⚠️  DEPRECATED: ${manifestPath} uses legacy format. Rename to squad.yaml`);
    }

    const content = await fs.readFile(manifestPath, 'utf-8');
    return yaml.load(content);
  }

  /**
   * List all local squads in project
   * @returns {Promise<Array<{name: string, path: string}>>}
   */
  async listLocal() {
    const exists = await this.pathExists(this.squadsPath);
    if (!exists) {
      return [];
    }

    const entries = await fs.readdir(this.squadsPath, { withFileTypes: true });
    const squads = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const squadPath = path.join(this.squadsPath, entry.name);
        const manifestPath = await this.findManifest(squadPath);
        if (manifestPath) {
          squads.push({
            name: entry.name,
            path: squadPath,
            manifestPath
          });
        }
      }
    }

    return squads;
  }

  // Private helpers
  async findManifest(squadPath) {
    for (const filename of MANIFEST_FILES) {
      const manifestPath = path.join(squadPath, filename);
      if (await this.pathExists(manifestPath)) {
        return manifestPath;
      }
    }
    return null;
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

module.exports = { SquadLoader, MANIFEST_FILES, DEFAULT_SQUADS_PATH };
```

**Checklist:**
- [x] 2.1 Implementar classe `SquadLoader`
- [x] 2.2 Implementar método `resolve(squadName)`
- [x] 2.3 Implementar método `loadManifest(squadPath)`
- [x] 2.4 Implementar método `listLocal()`
- [x] 2.5 Adicionar deprecation warning para `config.yaml`
- [x] 2.6 Documentar API com JSDoc

**Post-conditions:**
- [x] Todos os métodos públicos têm JSDoc
- [x] Exports funcionam via `require('./squad-loader')`
- [x] Nenhum path hardcoded (usar `path.join()`)

---

### Task 3: Implementar Error Handling (AC: 6)

**Responsável:** @dev (Dex)
**Responsável Type:** Worker
**Atomic Layer:** Script
**Estimated Duration:** 1h

**Entrada:**
- Error scenarios identificados

**Saída:**
- Classe `SquadLoaderError` com error codes
- Mensagens de erro claras em inglês
- Sugestões de fix inline

**Error Codes:**
| Code | Descrição | Suggestion |
|------|-----------|------------|
| `SQUAD_NOT_FOUND` | Squad não existe | "Create squad with: @squad-creator *create-squad {name}" |
| `MANIFEST_NOT_FOUND` | Manifest não encontrado | "Create squad.yaml in squad directory" |
| `YAML_PARSE_ERROR` | YAML inválido | "Check YAML syntax - use a YAML linter" |
| `PERMISSION_DENIED` | Sem permissão | "Check file permissions: chmod 644 {path}" |

**Checklist:**
- [x] 3.1 Criar classe `SquadLoaderError` com códigos específicos
- [x] 3.2 Mensagens claras para cada cenário de erro
- [x] 3.3 Sugestões de fix nas mensagens de erro
- [x] 3.4 Erro inclui path do arquivo/diretório problemático

**Post-conditions:**
- [x] Todos os erros incluem `code`, `message`, `suggestion`
- [x] Erros são instâncias de `SquadLoaderError`

---

### Task 4: Unit Tests (AC: 7)

**Responsável:** @qa (Quinn) / @dev (Dex)
**Responsável Type:** Worker
**Atomic Layer:** Test
**Estimated Duration:** 1.5h

**Entrada:**
- Squad Loader implementado (Task 2)
- Error handling implementado (Task 3)

**Saída:**
- Test suite completo
- Coverage report >= 80% statements

**Arquivo:** `tests/development/scripts/squad/squad-loader.test.js`

**Test Cases:**

| Test | Cenário | Expected |
|------|---------|----------|
| 4.1 | `resolve()` encontra squad existente | Retorna `{ path, manifestPath }` |
| 4.2 | `resolve()` squad inexistente | Throws `SQUAD_NOT_FOUND` |
| 4.3 | `loadManifest()` parseia squad.yaml | Retorna objeto parsed |
| 4.4 | `loadManifest()` parseia config.yaml | Retorna objeto + console.warn |
| 4.5 | `listLocal()` retorna squads | Array de squad objects |
| 4.6 | `listLocal()` sem ./squads/ | Array vazio `[]` |
| 4.7 | Performance `resolve()` | < 100ms |
| 4.8 | Performance `listLocal()` | < 500ms (20 squads) |

**Checklist:**
- [x] 4.1 Test: resolve() encontra squad existente
- [x] 4.2 Test: resolve() lança erro para squad inexistente
- [x] 4.3 Test: loadManifest() parseia squad.yaml corretamente
- [x] 4.4 Test: loadManifest() parseia config.yaml com warning
- [x] 4.5 Test: listLocal() retorna squads do diretório
- [x] 4.6 Test: listLocal() retorna array vazio se ./squads/ não existe
- [x] 4.7 Test: Performance metrics dentro do target
- [x] 4.8 Coverage >= 80% statements (achieved: 94.5%)

**Validation Command:**
```bash
npm test -- tests/unit/squad/squad-loader.test.js --coverage
# Statement coverage: 94.5% (target: 80%+)
```

**Post-conditions:**
- [x] Todos os testes passam (32/32)
- [x] Coverage >= 80% (statements) - achieved 94.5%
- [x] Nenhum teste com `.skip` ou `.only`

---

### Task 5: Integração com squad-creator Agent (AC: 8)

**Responsável:** @dev (Dex)
**Responsável Type:** Worker
**Atomic Layer:** Integration
**Estimated Duration:** 30min

**Entrada:**
- Squad Loader implementado (Task 2)
- squad-creator agent existente em `.aios-core/development/agents/`

**Saída:**
- `index.js` atualizado com exports do Squad Loader
- Documentação de uso para tasks do squad-creator
- Task `*validate-squad` usando o loader corretamente

**Checklist:**
- [x] 5.1 Exportar utility no index do squad scripts
- [x] 5.2 Documentar uso nas tasks do squad-creator
- [x] 5.3 Testar integração com task `*validate-squad`

**Validation:**
```bash
# Verificar export funciona
node -e "const { SquadLoader } = require('./.aios-core/development/scripts/squad'); console.log(SquadLoader ? 'OK' : 'FAIL')"
# Output: OK ✅
```

**Post-conditions:**
- [x] Import funciona via `require('./squad')` ou `require('./squad/squad-loader')`
- [x] Tasks do squad-creator podem instanciar SquadLoader
- [x] Documentação atualizada no README do diretório

---

## Dev Notes

### Diferenças da Arquitetura Original

| Aspecto | Original (descartado) | Atual (simplificado) |
|---------|----------------------|---------------------|
| Localização | `src/core/` | `.aios-core/development/scripts/squad/` |
| Escopo | Serviço global | Utility para tasks |
| Resolution | 4 níveis | Local apenas |
| Caching | File-based cache | Não (desnecessário) |
| Registry | GitHub fallback | Via task separada |

### Por que simplificar?

1. **Task-First:** O agente squad-creator é o ponto de entrada, não um loader genérico
2. **Separation of Concerns:** Download de squads públicos é responsabilidade de outra task (`*download-squad`)
3. **YAGNI:** Resolution chain complexa não necessária para MVP
4. **Manutenção:** Código mais simples = menos bugs

### Arquivos Relacionados

```
.aios-core/development/
├── agents/
│   └── squad-creator.md          # Agente que usa este loader
├── tasks/
│   ├── squad-creator-create.md   # Usa loader para verificar conflitos
│   ├── squad-creator-validate.md # Usa loader para carregar manifest
│   └── squad-creator-download.md # Baixa squads públicos (não usa loader)
└── scripts/
    └── squad/
        ├── index.js              # Exports centralizados
        ├── squad-loader.js       # ESTE ARQUIVO
        ├── squad-validator.js    # SQS-3
        └── squad-generator.js    # SQS-4
```

### Testing Strategy

**Test Framework:** Jest
**Location:** `tests/unit/squad/`
**Coverage:** 94.5% statements (target: 80%+)

```
tests/
└── unit/
    └── squad/
        ├── squad-loader.test.js    # 32 tests
        └── fixtures/
            ├── valid-squad/
            │   └── squad.yaml
            ├── legacy-squad/
            │   └── config.yaml
            ├── invalid-squad/
            │   └── .gitkeep (empty)
            └── malformed-squad/
                └── squad.yaml (invalid YAML)
```

## Dependencies

- **Upstream:** SQS-1 (Architecture) ✅ DONE
- **Downstream:** SQS-3 (Validator), SQS-4 (Creator Agent)

## Risk Assessment

### Implementation Risks
- **Risk:** Path handling diferente entre Windows/Linux
- **Mitigation:** Usar `path.join()` sempre, testar cross-platform
- **Verification:** CI em Windows e Linux

### Rollback Plan
- Módulo é novo, não afeta funcionalidade existente
- Se issues, desabilitar tasks que dependem do loader

## File List

### Created
| File | Description |
|------|-------------|
| `.aios-core/development/scripts/squad/index.js` | Central exports for squad module |
| `.aios-core/development/scripts/squad/squad-loader.js` | SquadLoader class implementation |
| `.aios-core/development/scripts/squad/README.md` | Module documentation |
| `tests/unit/squad/squad-loader.test.js` | Unit tests (32 tests, 94.5% coverage) |
| `tests/unit/squad/fixtures/valid-squad/squad.yaml` | Test fixture |
| `tests/unit/squad/fixtures/legacy-squad/config.yaml` | Test fixture (deprecated format) |
| `tests/unit/squad/fixtures/invalid-squad/.gitkeep` | Test fixture (empty dir) |
| `tests/unit/squad/fixtures/malformed-squad/squad.yaml` | Test fixture (invalid YAML) |

### Modified
| File | Description |
|------|-------------|
| `docs/stories/v2.1/sprint-7/story-sqs-2-squad-loader.md` | This story file |

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-12-18 | 0.1 | Story criada | @po (Pax) |
| 2025-12-18 | 0.2 | Simplificada para utility | @po (Pax) |
| 2025-12-18 | 0.3 | Tasks formatadas com TASK-FORMAT-SPECIFICATION-V1 | @po (Pax) |
| 2025-12-18 | 1.0 | Implementation complete - all tasks done | @dev (Dex) |
| 2025-12-18 | 1.1 | QA approved, pushed to main, status → Done | @po (Pax) |

---

## QA Results

### Gate Decision: ✅ PASS

**Reviewer:** @qa (Quinn)
**Date:** 2025-12-18
**Model:** Claude Opus 4.5

---

### Acceptance Criteria Verification

| AC | Description | Status |
|----|-------------|--------|
| 1 | Utility criada em `.aios-core/development/scripts/squad/squad-loader.js` | ✅ PASS |
| 2 | `resolve(squadName)` encontra squad em `./squads/{name}/` | ✅ PASS |
| 3 | `loadManifest(squadPath)` carrega e parseia `squad.yaml` ou `config.yaml` | ✅ PASS |
| 4 | `listLocal()` retorna lista de squads locais | ✅ PASS |
| 5 | Suporte a `squad.yaml` (preferido) e `config.yaml` (deprecated com warning) | ✅ PASS |
| 6 | Mensagens de erro claras quando squad não encontrado | ✅ PASS |
| 7 | Unit tests com 80%+ statement coverage | ✅ PASS (94.5%) |
| 8 | Integração com squad-creator agent tasks | ✅ PASS |

---

### Test Results

```
Test Suites: 1 passed, 1 total
Tests:       32 passed, 32 total
Snapshots:   0 total
Time:        0.537s
```

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Statement Coverage | ≥ 80% | 94.5% | ✅ |
| Branch Coverage | - | 78.04% | ✅ |
| Function Coverage | - | 100% | ✅ |
| Line Coverage | - | 94.5% | ✅ |

**Uncovered Lines:** 253, 258, 292-295 (permission error handlers - difficult to test without OS-level mocking)

---

### NFR Verification

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Cross-platform | ✅ PASS | Uses `path.join()` throughout, tested with cross-platform test |
| Error Messages | ✅ PASS | English messages with actionable suggestions |
| Logging | ✅ PASS | Verbose mode implemented and tested |
| Dependencies | ✅ PASS | Only `js-yaml` as external dependency (verified in package.json) |

---

### Performance Verification

| Method | Target | Actual | Status |
|--------|--------|--------|--------|
| `resolve()` | < 100ms | ~6ms | ✅ PASS |
| `loadManifest()` | < 150ms | ~3ms | ✅ PASS |
| `listLocal()` | < 500ms | ~1ms | ✅ PASS |

---

### Code Quality

| Check | Status |
|-------|--------|
| ESLint | ✅ No errors |
| JSDoc Documentation | ✅ Complete |
| Error Handling | ✅ Custom `SquadLoaderError` class with codes |
| Exports | ✅ Central `index.js` with all exports |

---

### Observations

**Strengths:**
1. Clean, well-documented code with comprehensive JSDoc
2. Excellent error handling with actionable suggestions
3. Factory pattern for errors improves consistency
4. Performance exceeds targets by significant margin
5. Test coverage exceeds requirements

**Minor Notes (not blocking):**
1. Branch coverage at 78% due to permission error handlers being difficult to test
2. Implementation is more complete than story spec (includes `SquadLoaderError` class not in original spec code example)

---

### Recommendation

**APPROVED FOR MERGE** - All acceptance criteria met, tests passing, coverage exceeds targets, follows coding standards.

---

**Story Points:** 5
**Sprint:** 7
**Priority:** Critical (bloqueador para SQS-3 e SQS-4)
