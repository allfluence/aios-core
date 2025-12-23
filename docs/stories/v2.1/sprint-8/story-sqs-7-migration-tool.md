# Story SQS-7: Squad Migration Tool

<!-- Source: Epic SQS - Squad System Enhancement -->
<!-- Context: Tool for migrating legacy squad formats to AIOS 2.1 standard -->
<!-- Architecture: ADR-SQS-001 approved 2025-12-18 -->

## Status: Done

## Story

**As an** AIOS developer with existing squads,
**I want** a migration tool that upgrades my legacy squads to the new format,
**so that** I can benefit from the Squad System improvements without manual conversion.

## Background

With the Squad System Enhancement (Epic SQS), the squad format has evolved:

### Format Changes

| Aspect | Legacy (pre-2.1) | Current (2.1+) |
|--------|------------------|----------------|
| Manifest | `config.yaml` | `squad.yaml` |
| Structure | Flat | Task-first (`tasks/`, `agents/`) |
| Validation | None | JSON Schema + TASK-FORMAT-SPEC |
| Components | Implicit | Explicit in manifest |
| Config | Inline | Inheritance (`extend`/`override`) |

### Migration Scenarios

1. **Basic Migration:** `config.yaml` → `squad.yaml` rename + schema update
2. **Structure Migration:** Flat files → organized directories
3. **Task Format Migration:** Legacy tasks → TASK-FORMAT-SPECIFICATION-V1
4. **Full Migration:** All of the above + validation

## 🤖 CodeRabbit Integration

### Story Type Analysis

**Primary Type**: API/Script
**Secondary Type(s)**: Infrastructure
**Complexity**: Medium

### Specialized Agent Assignment

**Primary Agents**:
- @dev (Dex): Implementation of SquadMigrator class and task
- @qa (Quinn): Unit and integration testing

**Supporting Agents**:
- @devops (Gage): PR review and merge

### Quality Gate Tasks

- [x] Pre-Commit (@dev): Run before marking story complete
- [ ] Pre-PR (@devops): Run before creating pull request

### Self-Healing Configuration

**Expected Self-Healing**:
- Primary Agent: @dev (light mode)
- Max Iterations: 2
- Timeout: 15 minutes
- Severity Filter: CRITICAL only

**Predicted Behavior**:
- CRITICAL issues: auto_fix (2 iterations, 15 min)
- HIGH issues: document_only

### CodeRabbit Focus Areas

**Primary Focus**:
- Error handling in `migrate()` and `executeAction()` methods
- Backup integrity (`createBackup()` must complete before migration)
- File system operations safety (async/await, proper error catching)

**Secondary Focus**:
- Path handling (cross-platform compatibility)
- YAML parsing safety (handle malformed manifests)
- Rollback documentation completeness

---

## Acceptance Criteria

1. `*migrate-squad` task created for squad-creator agent
2. Detects legacy format (config.yaml, flat structure)
3. Creates backup before migration (`.backup/`)
4. Renames `config.yaml` to `squad.yaml`
5. Adds missing required fields (aios.type, aios.minVersion)
6. Reorganizes files into task-first structure
7. Updates task files to include required fields
8. Validates migrated squad
9. Supports `--dry-run` to preview changes
10. Generates migration report

## Tasks / Subtasks

### Task 1: Create SquadMigrator Class (AC: 2-8)

**Responsável:** @dev (Dex)
**Atomic Layer:** Script
**Effort:** 4-5h

**File:** `.aios-core/development/scripts/squad/squad-migrator.js`

```javascript
/**
 * Squad Migrator
 *
 * Migrates legacy squad formats to AIOS 2.1 standard.
 * Handles manifest, structure, and task format migrations.
 */

const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');
const { SquadValidator } = require('./squad-validator');
const { SquadLoader } = require('./squad-loader');

class SquadMigrator {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
    this.verbose = options.verbose || false;
    this.validator = new SquadValidator();
  }

  /**
   * Analyze squad for migration needs
   * @param {string} squadPath - Path to squad directory
   * @returns {Promise<MigrationAnalysis>}
   */
  async analyze(squadPath) {
    const analysis = {
      needsMigration: false,
      issues: [],
      actions: []
    };

    // Check for legacy manifest
    const hasConfigYaml = await this.pathExists(path.join(squadPath, 'config.yaml'));
    const hasSquadYaml = await this.pathExists(path.join(squadPath, 'squad.yaml'));

    if (hasConfigYaml && !hasSquadYaml) {
      analysis.needsMigration = true;
      analysis.issues.push({
        type: 'LEGACY_MANIFEST',
        message: 'Uses deprecated config.yaml',
        severity: 'warning'
      });
      analysis.actions.push({
        type: 'RENAME_MANIFEST',
        from: 'config.yaml',
        to: 'squad.yaml'
      });
    }

    // Check for flat structure
    const hasTasksDir = await this.pathExists(path.join(squadPath, 'tasks'));
    const hasAgentsDir = await this.pathExists(path.join(squadPath, 'agents'));

    if (!hasTasksDir || !hasAgentsDir) {
      analysis.needsMigration = true;
      analysis.issues.push({
        type: 'FLAT_STRUCTURE',
        message: 'Missing task-first directory structure',
        severity: 'warning'
      });
      analysis.actions.push({
        type: 'CREATE_DIRECTORIES',
        dirs: ['tasks', 'agents', 'config']
      });
    }

    // Check manifest schema compliance
    if (hasSquadYaml || hasConfigYaml) {
      const manifestPath = hasSquadYaml
        ? path.join(squadPath, 'squad.yaml')
        : path.join(squadPath, 'config.yaml');

      const content = await fs.readFile(manifestPath, 'utf-8');
      const manifest = yaml.load(content);

      if (!manifest.aios?.type) {
        analysis.needsMigration = true;
        analysis.issues.push({
          type: 'MISSING_AIOS_TYPE',
          message: 'Missing aios.type field',
          severity: 'error'
        });
        analysis.actions.push({
          type: 'ADD_FIELD',
          path: 'aios.type',
          value: 'squad'
        });
      }

      if (!manifest.aios?.minVersion) {
        analysis.needsMigration = true;
        analysis.issues.push({
          type: 'MISSING_MIN_VERSION',
          message: 'Missing aios.minVersion field',
          severity: 'error'
        });
        analysis.actions.push({
          type: 'ADD_FIELD',
          path: 'aios.minVersion',
          value: '2.1.0'
        });
      }
    }

    return analysis;
  }

  /**
   * Migrate squad to current format
   * @param {string} squadPath - Path to squad directory
   * @returns {Promise<MigrationResult>}
   */
  async migrate(squadPath) {
    const analysis = await this.analyze(squadPath);

    if (!analysis.needsMigration) {
      return {
        success: true,
        message: 'Squad is already up to date',
        actions: []
      };
    }

    // Create backup
    if (!this.dryRun) {
      await this.createBackup(squadPath);
    }

    const executedActions = [];

    for (const action of analysis.actions) {
      if (this.dryRun) {
        executedActions.push({ ...action, status: 'dry-run' });
        continue;
      }

      try {
        await this.executeAction(squadPath, action);
        executedActions.push({ ...action, status: 'success' });
      } catch (error) {
        executedActions.push({ ...action, status: 'failed', error: error.message });
      }
    }

    // Validate after migration
    let validation = null;
    if (!this.dryRun) {
      validation = await this.validator.validate(squadPath);
    }

    return {
      success: !executedActions.some(a => a.status === 'failed'),
      actions: executedActions,
      validation,
      backupPath: this.dryRun ? null : path.join(squadPath, '.backup')
    };
  }

  /**
   * Create backup of squad before migration
   */
  async createBackup(squadPath) {
    const backupPath = path.join(squadPath, '.backup', `pre-migration-${Date.now()}`);
    await fs.mkdir(backupPath, { recursive: true });

    // Copy all files to backup
    const files = await fs.readdir(squadPath);
    for (const file of files) {
      if (file === '.backup') continue;
      const src = path.join(squadPath, file);
      const dest = path.join(backupPath, file);
      await this.copyRecursive(src, dest);
    }

    return backupPath;
  }

  /**
   * Execute migration action
   */
  async executeAction(squadPath, action) {
    switch (action.type) {
      case 'RENAME_MANIFEST':
        await fs.rename(
          path.join(squadPath, action.from),
          path.join(squadPath, action.to)
        );
        break;

      case 'CREATE_DIRECTORIES':
        for (const dir of action.dirs) {
          await fs.mkdir(path.join(squadPath, dir), { recursive: true });
        }
        break;

      case 'ADD_FIELD':
        await this.addManifestField(squadPath, action.path, action.value);
        break;

      case 'MOVE_FILE':
        await fs.rename(
          path.join(squadPath, action.from),
          path.join(squadPath, action.to)
        );
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  /**
   * Add field to manifest YAML
   */
  async addManifestField(squadPath, fieldPath, value) {
    const manifestPath = path.join(squadPath, 'squad.yaml');
    const content = await fs.readFile(manifestPath, 'utf-8');
    const manifest = yaml.load(content);

    // Navigate to nested path and set value
    const parts = fieldPath.split('.');
    let current = manifest;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;

    await fs.writeFile(manifestPath, yaml.dump(manifest), 'utf-8');
  }

  // Helper methods
  async pathExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async copyRecursive(src, dest) {
    const stats = await fs.stat(src);
    if (stats.isDirectory()) {
      await fs.mkdir(dest, { recursive: true });
      const entries = await fs.readdir(src);
      for (const entry of entries) {
        await this.copyRecursive(path.join(src, entry), path.join(dest, entry));
      }
    } else {
      await fs.copyFile(src, dest);
    }
  }
}

module.exports = { SquadMigrator };
```

- [x] 1.1 Criar classe `SquadMigrator`
- [x] 1.2 Implementar `analyze()` para detectar formato legacy
- [x] 1.3 Implementar `migrate()` com execução de ações
- [x] 1.4 Implementar `createBackup()` antes de migrar
- [x] 1.5 Implementar ações: RENAME_MANIFEST, CREATE_DIRECTORIES, ADD_FIELD, MOVE_FILE
- [x] 1.6 Suportar `--dry-run` mode
- [x] 1.7 Integrar validação pós-migração

### Task 2: Create *migrate-squad Task (AC: 1, 9, 10)

**Responsável:** @dev (Dex)
**Atomic Layer:** Task
**Effort:** 1-2h

**File:** `.aios-core/development/tasks/squad-creator-migrate.md`

```markdown
---
task: Migrate Squad
responsavel: "@squad-creator"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - squad_path: Caminho do squad para migrar (obrigatório)
  - dry_run: Flag para simular sem modificar (--dry-run)
  - verbose: Flag para output detalhado (--verbose)
Saida: |
  - migration_result: Resultado da migração
  - backup_path: Caminho do backup criado
  - validation_result: Resultado da validação pós-migração
Checklist:
  - "[ ] Analisar squad para detectar formato"
  - "[ ] Criar backup em .backup/"
  - "[ ] Executar ações de migração"
  - "[ ] Validar squad migrado"
  - "[ ] Gerar relatório de migração"
---

# *migrate-squad

Migra squads de formato legacy para AIOS 2.1 standard.

## Uso

```
@squad-creator

# Analisar sem modificar
*migrate-squad ./squads/meu-squad --dry-run

# Migrar com backup
*migrate-squad ./squads/meu-squad

# Migrar com output detalhado
*migrate-squad ./squads/meu-squad --verbose
```

## Fluxo

1. **Análise:** Detectar formato e issues
2. **Backup:** Criar cópia em `.backup/`
3. **Migração:** Executar ações necessárias
   - Renomear `config.yaml` → `squad.yaml`
   - Criar diretórios (`tasks/`, `agents/`, `config/`)
   - Adicionar campos obrigatórios
   - Reorganizar arquivos
4. **Validação:** Executar squad-validator
5. **Relatório:** Exibir resumo das mudanças

## Output Exemplo

```
Analyzing squad: ./squads/my-legacy-squad/

Issues Found:
  - [WARNING] Uses deprecated config.yaml
  - [WARNING] Missing task-first directory structure
  - [ERROR] Missing aios.type field
  - [ERROR] Missing aios.minVersion field

Planned Actions:
  1. Rename config.yaml → squad.yaml
  2. Create directories: tasks/, agents/, config/
  3. Add field: aios.type = "squad"
  4. Add field: aios.minVersion = "2.1.0"

Proceed with migration? [y/N]

Migration Complete!

Backup: ./squads/my-legacy-squad/.backup/pre-migration-1703318400000/
Actions: 4 executed, 0 failed

Validation:
  Errors: 0
  Warnings: 1 (empty tasks/ directory)

Result: SUCCESS
```

## Rollback

Se a migração falhar, restaure o backup:

```bash
# Listar backups
ls ./squads/my-squad/.backup/

# Restaurar backup
cp -r ./squads/my-squad/.backup/pre-migration-*/. ./squads/my-squad/
```
```

- [x] 2.1 Criar task file com formato TASK-FORMAT-SPECIFICATION-V1
- [x] 2.2 Documentar fluxo de migração
- [x] 2.3 Incluir exemplos de uso
- [x] 2.4 Documentar processo de rollback

### Task 3: Update squad-creator Agent (AC: 1)

**Responsável:** @dev (Dex)
**Atomic Layer:** Agent
**Effort:** 30min

**File:** `.aios-core/development/agents/squad-creator.md`

Add new command to agent definition:

```yaml
commands:
  # ... existing commands ...

  # NEW: Migration command
  - name: migrate-squad
    visibility: [full, quick]
    description: "Migrate legacy squad to AIOS 2.1 format"
    task: squad-creator-migrate.md
```

- [x] 3.1 Add `*migrate-squad` command to agent
- [x] 3.2 Update commands documentation

### Task 4: Unit Tests

**Responsável:** @qa (Quinn)
**Atomic Layer:** Test
**Effort:** 2-3h

**File:** `tests/unit/squad/squad-migrator.test.js`

- [x] 4.1 Test: analyze() detects legacy manifest
- [x] 4.2 Test: analyze() detects flat structure
- [x] 4.3 Test: analyze() detects missing fields
- [x] 4.4 Test: migrate() creates backup
- [x] 4.5 Test: migrate() renames manifest
- [x] 4.6 Test: migrate() creates directories
- [x] 4.7 Test: migrate() adds missing fields
- [x] 4.8 Test: migrate() validates after migration
- [x] 4.9 Test: --dry-run doesn't modify files
- [x] 4.10 Coverage >= 80%

### Task 5: Integration Tests

**Responsável:** @qa (Quinn)
**Atomic Layer:** Integration Test
**Effort:** 1h

- [x] 5.1 Test: Full migration of legacy squad
- [x] 5.2 Test: Migration of already-compliant squad (no-op)
- [x] 5.3 Test: Rollback from backup works

### Task 6: Update index.js Exports

**Responsável:** @dev (Dex)
**Atomic Layer:** Config
**Effort:** 15min

**File:** `.aios-core/development/scripts/squad/index.js`

- [x] 6.1 Add SquadMigrator export
- [x] 6.2 Update README.md

## Dev Notes

### Migration Actions

| Action | Description | Reversible |
|--------|-------------|------------|
| `RENAME_MANIFEST` | config.yaml → squad.yaml | Yes (backup) |
| `CREATE_DIRECTORIES` | Create tasks/, agents/, config/ | Yes (rmdir) |
| `ADD_FIELD` | Add missing YAML fields | Yes (remove field) |
| `MOVE_FILE` | Reorganize files into dirs | Yes (backup) |
| `UPDATE_TASK` | Add required task fields | Yes (backup) |

### Integration with Existing Components

| Component | Usage |
|-----------|-------|
| `SquadLoader` | Load manifest for analysis |
| `SquadValidator` | Validate after migration |
| `SquadGenerator` | Reference for correct structure |

### Backup Strategy

```
./squads/my-squad/
├── .backup/
│   ├── pre-migration-1703318400000/  # Full backup
│   │   ├── config.yaml
│   │   ├── tasks/
│   │   └── ...
│   └── pre-migration-1703404800000/  # Another backup
└── squad.yaml  # Current (migrated)
```

### Testing

**Test Location:** `tests/unit/squad/squad-migrator.test.js`
**Integration Tests:** `tests/integration/squad/squad-migration.test.js`
**Framework:** Jest
**Coverage Target:** >= 80%

**Testing Patterns:**
- Use temp directories for file system tests (`fs.mkdtemp`)
- Mock fs operations where appropriate for unit tests
- Test both success and failure paths for all actions
- Cleanup temp files in `afterEach` hooks
- Test cross-platform path handling

**Key Test Scenarios:**
1. Legacy manifest detection (`config.yaml` present)
2. Already-compliant squad (no-op migration)
3. Backup creation and integrity
4. Dry-run mode (no file modifications)
5. Rollback from backup

### Module Format

**Format:** CommonJS (`require`/`module.exports`)
**Rationale:** Consistent with existing squad/ modules (squad-loader.js, squad-validator.js)

---

## Dependencies

- **Upstream:** SQS-2, SQS-3 (Loader, Validator) - ✅ Done

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Data loss during migration | Low | High | Always create backup first |
| Incomplete migration | Medium | Medium | Validate after migration |
| Edge case formats | Low | Medium | Analyze before migrate |

## Effort Estimate

| Task | Estimate |
|------|----------|
| Task 1: SquadMigrator class | 4-5h |
| Task 2: *migrate-squad task | 1-2h |
| Task 3: Update agent | 30min |
| Task 4: Unit Tests | 2-3h |
| Task 5: Integration Tests | 1h |
| Task 6: Export Updates | 15min |
| **Total** | **9-12h** |

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-12-23 | 2.0 | Implementation complete - all tasks done, tests passing | @dev (Dex) |
| 2025-12-23 | 1.1 | Added CodeRabbit Integration, Testing section, updated story points | @po (Pax) |
| 2025-12-23 | 1.0 | Story created from Epic SQS | @po (Pax) |

---

**Story Points:** 8
**Sprint:** 8
**Priority:** Medium
**Epic:** [SQS - Squad System Enhancement](../../../epics/current/epic-sqs-squad-system.md)

---

## File List

Files to be created/modified in this story:

| File | Action | Task |
|------|--------|------|
| `.aios-core/development/scripts/squad/squad-migrator.js` | CREATE | Task 1 |
| `.aios-core/development/tasks/squad-creator-migrate.md` | CREATE | Task 2 |
| `.aios-core/development/agents/squad-creator.md` | MODIFY | Task 3 |
| `.aios-core/development/scripts/squad/index.js` | MODIFY | Task 6 |
| `tests/unit/squad/squad-migrator.test.js` | CREATE | Task 4 |
| `tests/integration/squad/squad-migration.test.js` | CREATE | Task 5 |

**Total: 6 files (4 created, 2 modified)**
