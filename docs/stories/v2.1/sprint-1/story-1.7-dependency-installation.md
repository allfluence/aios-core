# STORY: Dependency Installation

**ID:** STORY-1.7  
**Épico:** [EPIC-S1](../../../epics/epic-s1-installer-foundation.md)  
**Sprint:** 1 | **Points:** 3 | **Priority:** 🟠 High  
**Created:** 2025-01-19

---

## 📊 User Story

**Como** desenvolvedor,  
**Quero** que installer instale dependências npm automaticamente,  
**Para** não precisar executar `npm install` manualmente

---

## ✅ Acceptance Criteria

- [ ] Detecta package manager (npm, yarn, pnpm, bun)
- [ ] Executa install automaticamente
- [ ] Mostra progress bar durante install
- [ ] Trata erros de instalação com mensagens claras
- [ ] Oferece retry em caso de falha
- [ ] Funciona offline se node_modules já existe

---

## 🔧 Implementation

```javascript
async function installDependencies() {
  const pm = detectPackageManager(); // npm, yarn, pnpm, bun
  const spinner = ora(`Installing dependencies with ${pm}...`).start();
  
  try {
    await spawn(pm, ['install'], { stdio: 'pipe' });
    spinner.succeed('Dependencies installed!');
  } catch (error) {
    spinner.fail('Installation failed');
    const retry = await confirm('Retry?');
    if (retry) return installDependencies();
  }
}
```

---

## 📋 Tasks (3 pts = ~1 dia)

### Module Development
- [ ] 1.7.1: Detect package manager (1h)
  - Check for lock files (package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lockb)
  - Fallback to npm if no lock file found
  - Support manual override via flag

- [ ] 1.7.2: Execute install with spawn (2h)
  - Spawn package manager process with stdio: 'inherit'
  - Handle different install commands per package manager
  - Capture exit codes and error output

- [ ] 1.7.3: Progress indicator (1h)
  - Show spinner during installation
  - Update spinner with package manager output
  - Display estimated time based on package count

- [ ] 1.7.4: Error handling + retry (2h)
  - Detect common errors (network timeout, permission denied)
  - Offer retry with exponential backoff
  - Suggest solutions for common issues
  - Graceful degradation if offline with existing node_modules

- [ ] 1.7.5: Test with npm/yarn/pnpm (3h)
  - Unit tests for package manager detection
  - Integration tests for each package manager
  - Mock spawn to avoid real installations
  - Test retry logic and error scenarios

### Wizard Integration (Required - Following Gradual Integration Plan)
- [ ] 1.7.6: Integrate dependency installer into wizard (2h)
  - Import `installDependencies()` in `src/wizard/index.js`
  - Call after environment configuration (Story 1.6)
  - Pass package manager preference from wizard
  - Handle progress feedback in wizard UI
  - Show installation summary

- [ ] 1.7.7: Update wizard question flow (1h)
  - Add package manager selection/confirmation question
  - Detect and suggest package manager automatically
  - Allow skip for offline/manual install scenarios

- [ ] 1.7.8: Test wizard integration (1h)
  - E2E test: wizard → env config → dependency install
  - Verify node_modules created
  - Test with different package managers
  - Verify wizard continues after installation

**Total:** 9h (module) + 4h (integration) = 13h

---

## 🔄 Wizard Integration Plan

**CRITICAL:** Following **Opção A: Integração Gradual** strategy.

This story must integrate the dependency installer into the wizard IMMEDIATELY after module creation, not defer to Story 1.8.

### Integration Point

```javascript
// src/wizard/index.js - Integration after Story 1.6 (Environment Configuration)
async function runWizard() {
  showWelcome();
  const answers = await inquirer.prompt(questions);

  // Story 1.4: IDE configs (ALREADY INTEGRATED)
  if (answers.selectedIDEs && answers.selectedIDEs.length > 0) {
    const ideResult = await generateIDEConfigs(answers.selectedIDEs, answers);
  }

  // Story 1.6: Environment Configuration (WILL BE INTEGRATED)
  const envResult = await configureEnvironment({
    projectType: answers.projectType,
    selectedIDEs: answers.selectedIDEs,
    mcpApiKeys: answers.mcpApiKeys
  });

  // Story 1.7: Dependency Installation (INTEGRATE HERE)
  const packageManager = detectPackageManager() || answers.packageManager;
  console.log(`\nInstalling dependencies with ${packageManager}...`);

  const depsResult = await installDependencies({
    packageManager: packageManager,
    projectPath: process.cwd(),
    onProgress: (status) => {
      // Update spinner/progress bar
      console.log(status.message);
    }
  });

  if (!depsResult.success) {
    console.error('Dependency installation failed:', depsResult.errors);
    const retry = await inquirer.prompt([{
      type: 'confirm',
      name: 'retry',
      message: 'Retry dependency installation?',
      default: true
    }]);

    if (retry.retry) {
      // Retry logic...
    }
  }

  // Continue to Story 1.8 (Validation) when implemented...

  showCompletion();
  return { ...answers, installation: { ide: ideResult, env: envResult, deps: depsResult } };
}
```

### Integration Checklist

**Before Integration:**
- [ ] Module `dependency-installer.js` created
- [ ] Unit tests passing
- [ ] Integration tests passing with mock spawn
- [ ] Story 1.6 integration completed (env config in wizard)

**During Integration:**
- [ ] Import module in `src/wizard/index.js`
- [ ] Add dependency install step after env configuration
- [ ] Detect package manager automatically
- [ ] Add progress feedback to wizard
- [ ] Handle installation errors gracefully
- [ ] Update wizard tests to include dependency step

**After Integration:**
- [ ] Run full wizard E2E test
- [ ] Verify wizard state flows: Type → IDE → Env → Deps → (future: Validation)
- [ ] Test with npm, yarn, pnpm
- [ ] Verify node_modules created successfully
- [ ] Update Story 1.8 to validate dependencies

### Why Integrate Now (Not Story 1.8)?

**Advantages:**
1. ✅ Story 1.8 can validate installed dependencies (not install them)
2. ✅ Dependency installation is a natural wizard step (user expects it)
3. ✅ `.env` from Story 1.6 is available for dependency installation
4. ✅ Follows same pattern as Stories 1.4 and 1.6 (integrate immediately)
5. ✅ Reduces integration risk by testing each step independently

**Dependency on Story 1.6:**
- `.env` must exist before dependency installation (some packages may need env vars)
- Environment configuration provides context for dependency selection
- Wizard flow is sequential: config first, then install

---

## 📦 Package Manager Detection Logic

```javascript
function detectPackageManager() {
  // Check for lock files
  if (fs.existsSync('bun.lockb')) return 'bun';
  if (fs.existsSync('pnpm-lock.yaml')) return 'pnpm';
  if (fs.existsSync('yarn.lock')) return 'yarn';
  if (fs.existsSync('package-lock.json')) return 'npm';

  // Fallback to npm
  return 'npm';
}
```

### Installation Commands by Package Manager

| Package Manager | Install Command | Notes |
|-----------------|-----------------|-------|
| **npm** | `npm install` | Default, most compatible |
| **yarn** | `yarn install` | Fast, deterministic |
| **pnpm** | `pnpm install` | Disk space efficient |
| **bun** | `bun install` | Fastest, newer |

---

## 🔒 Security & Best Practices

### Package Manager Security
- [ ] Verify package integrity (npm/yarn/pnpm support lock files)
- [ ] Check for known vulnerabilities (npm audit, yarn audit)
- [ ] Warn if using outdated package manager version
- [ ] Respect .npmrc / .yarnrc for registry configuration

### Error Handling
- [ ] Network timeout handling with retry
- [ ] Permission errors with clear solutions (sudo, permissions fix)
- [ ] Disk space checks before installation
- [ ] Graceful degradation if offline with existing node_modules

### Performance
- [ ] Use native package manager (don't spawn npm inside yarn project)
- [ ] Respect CI environment variables (CI=true for faster installs)
- [ ] Support --frozen-lockfile for production environments
- [ ] Progress feedback prevents perceived hanging

---

## 🔗 Dependencies

**Depende de:**
- **[1.6] Environment Config** - `.env` must exist before dependency installation (critical)
- **[1.2] Wizard Foundation** - Provides wizard infrastructure for integration

**Bloqueia:**
- **[1.8] Installation Validation** - Validation needs dependencies installed to check

**Integração:**
- Wizard flow: 1.3 (Type) → 1.4 (IDE) → 1.6 (Env) → **1.7 (Deps)** → 1.8 (Validation)
- Story 1.8 validates dependencies are installed correctly
- Story 1.9 (Error Handling) includes dependency installation rollback

---

## 🧪 Testing Strategy

### Unit Tests
- [ ] Package manager detection from lock files
- [ ] Install command construction per package manager
- [ ] Error parsing and categorization
- [ ] Retry logic with exponential backoff

### Integration Tests (Mocked)
- [ ] Mock spawn for each package manager
- [ ] Simulate successful installation
- [ ] Simulate network errors and retry
- [ ] Simulate permission errors
- [ ] Test offline mode with existing node_modules

### E2E Tests (Real)
- [ ] Full wizard run with npm install
- [ ] Full wizard run with yarn install
- [ ] Full wizard run with pnpm install
- [ ] Verify node_modules structure
- [ ] Verify dependencies from package.json are installed

---

**Criado por:** River 🌊
**Updated:** 2025-11-22 (Quinn - QA review, added gradual integration plan)

