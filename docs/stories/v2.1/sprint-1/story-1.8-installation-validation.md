# STORY: Installation Validation

**ID:** STORY-1.8  
**Épico:** [EPIC-S1](../../../epics/epic-s1-installer-foundation.md)  
**Sprint:** 1 | **Points:** 5 | **Priority:** 🟠 High  
**Created:** 2025-01-19

---

## 📊 User Story

**Como** desenvolvedor,  
**Quero** validação completa pós-instalação,  
**Para** garantir que tudo foi configurado corretamente

---

## ✅ Acceptance Criteria

- [ ] Valida estrutura de arquivos criados
- [ ] Valida configs (.env, core-config.yaml)
- [ ] Valida MCPs (health check)
- [ ] Valida dependências instaladas
- [ ] Mostra relatório final (✓ success, ⚠️ warnings, ❌ errors)
- [ ] Oferece troubleshooting para erros

---

## 🔧 Implementation

```javascript
async function validateInstallation() {
  const results = {
    files: await validateFiles(),
    configs: await validateConfigs(),
    mcps: await validateMCPs(),
    dependencies: await validateDependencies()
  };
  
  displayReport(results);
  
  if (results.errors.length > 0) {
    await offerTroubleshooting(results.errors);
  }
}
```

---

## 📋 Tasks (5 pts = ~2 dias)

### Phase 1: MCP Integration (Critical - Story 1.5 Gap)
- [ ] 1.8.0: Integrate MCP Installer into Wizard (4h) **[NEW - Critical Gap]**
  - 1.8.0.1: Add MCP selection questions to `src/wizard/questions.js`
    - Checkbox prompt for 4 MCPs (Browser, Context7, Exa, Desktop Commander)
    - Include descriptions for each MCP
    - Default: all selected (can deselect)
  - 1.8.0.2: Import `installProjectMCPs()` in `src/wizard/index.js`
  - 1.8.0.3: Call MCP installer after dependency installation (Story 1.7)
  - 1.8.0.4: Pass wizard context (selectedMCPs, apiKeys, projectPath)
  - 1.8.0.5: Handle MCP installation progress in wizard UI
  - 1.8.0.6: Handle MCP installation errors gracefully
  - 1.8.0.7: Test MCP integration in wizard E2E flow

### Phase 2: Validation Module Development
- [ ] 1.8.1: File structure validator (2h)
  - Validate IDE config files created (Story 1.4)
  - Validate `.env` and `core-config.yaml` created (Story 1.6)
  - Validate `.mcp.json` created (Story 1.5)
  - Validate directory structure (`.aios-core/`, etc.)

- [ ] 1.8.2: Config validator (2h)
  - Validate `.env` format and required variables
  - Validate `core-config.yaml` YAML syntax
  - Validate `.mcp.json` schema compliance
  - Check .gitignore entries

- [ ] 1.8.3: MCP health checks (3h) **[Story 1.5 Deferred Functionality]**
  - Health check for Browser MCP (Puppeteer)
  - Health check for Context7 MCP (SSE connection)
  - Health check for Exa MCP (API test)
  - Health check for Desktop Commander MCP (file access)
  - Timeout handling (30s per MCP)
  - Status tracking: success/warning/failed

- [ ] 1.8.4: Dependency validator (2h)
  - Check node_modules exists
  - Validate critical dependencies installed
  - Check for dependency vulnerabilities (npm audit)
  - Verify package.json integrity

- [ ] 1.8.5: Report generator (2h)
  - Comprehensive installation summary
  - Status for each component (✓/⚠️/❌)
  - Warnings and errors clearly listed
  - Next steps and recommendations

- [ ] 1.8.6: Troubleshooting system (3h)
  - Common issue detection and solutions
  - Actionable error messages
  - Links to documentation
  - Support contact information

- [ ] 1.8.7: Testing (3h)
  - Unit tests for each validator
  - Integration tests for validation flow
  - E2E tests for complete wizard + validation
  - Test failure scenarios and recovery

**Total:** 4h (MCP integration) + 17h (validation) = 21h (~3 dias)

---

## 🔄 Complete Wizard Integration (Final Assembly)

**CRITICAL:** This is the **final integration point** following **Opção A: Integração Gradual**.

By Story 1.8, all modules should be integrated into wizard:
- ✅ Story 1.3: Project Type Detection (already integrated)
- ✅ Story 1.4: IDE Selection (already integrated)
- ⏳ Story 1.5: MCP Installation (**integrate in Story 1.8 Phase 1**)
- ⏳ Story 1.6: Environment Configuration (will be integrated)
- ⏳ Story 1.7: Dependency Installation (will be integrated)
- ⏳ Story 1.8: Validation (integrates and validates all)

### Complete Wizard Flow

```javascript
// src/wizard/index.js - Complete integration after Story 1.8
async function runWizard() {
  try {
    // Setup
    setupCancellationHandler();
    showWelcome();

    // Phase 1: Information Gathering
    const questions = buildQuestionSequence(); // includes MCP selection!
    const answers = await inquirer.prompt(questions);

    const installation = {
      success: true,
      components: {},
      errors: []
    };

    // Phase 2: Installation Steps (Gradual Integration)

    // Story 1.4: IDE Configuration (ALREADY INTEGRATED)
    if (answers.selectedIDEs && answers.selectedIDEs.length > 0) {
      installation.components.ide = await generateIDEConfigs(
        answers.selectedIDEs,
        answers
      );
    }

    // Story 1.6: Environment Configuration (WILL BE INTEGRATED)
    installation.components.env = await configureEnvironment({
      projectType: answers.projectType,
      selectedIDEs: answers.selectedIDEs,
      mcpApiKeys: answers.mcpApiKeys,
      onProgress: (status) => console.log(status.message)
    });

    // Story 1.5: MCP Installation (INTEGRATE IN STORY 1.8)
    if (answers.selectedMCPs && answers.selectedMCPs.length > 0) {
      installation.components.mcps = await installProjectMCPs({
        selectedMCPs: answers.selectedMCPs,
        projectPath: process.cwd(),
        apiKeys: answers.mcpApiKeys || {},
        onProgress: (status) => {
          console.log(`[MCP] ${status.message}`);
        }
      });

      if (!installation.components.mcps.success) {
        installation.errors.push(...installation.components.mcps.errors);
      }
    }

    // Story 1.7: Dependency Installation (WILL BE INTEGRATED)
    const packageManager = detectPackageManager() || 'npm';
    installation.components.deps = await installDependencies({
      packageManager,
      projectPath: process.cwd(),
      onProgress: (status) => console.log(status.message)
    });

    // Phase 3: Validation (Story 1.8)
    console.log('\n🔍 Validating installation...\n');

    const validation = await validateInstallation({
      files: {
        ideConfigs: installation.components.ide?.files || [],
        env: installation.components.env?.envFile,
        coreConfig: installation.components.env?.coreConfig,
        mcpConfig: installation.components.mcps?.configPath
      },
      configs: {
        env: installation.components.env,
        mcps: installation.components.mcps?.installedMCPs,
        coreConfig: installation.components.env?.coreConfig
      },
      dependencies: installation.components.deps,
      mcps: installation.components.mcps?.installedMCPs
    });

    // Phase 4: Report
    displayValidationReport(validation);

    if (validation.errors.length > 0) {
      await offerTroubleshooting(validation.errors);
    }

    // Phase 5: Completion
    showCompletion();

    return {
      answers,
      installation,
      validation,
      success: validation.overallStatus === 'success'
    };

  } catch (error) {
    console.error('Installation failed:', error.message);
    throw error;
  }
}
```

### MCP Integration Details (Story 1.5 Gap Fix)

**Add MCP Selection Question:**

```javascript
// src/wizard/questions.js
function getMCPQuestions() {
  return [
    {
      type: 'checkbox',
      name: 'selectedMCPs',
      message: 'Select MCPs to install (project-level):',
      choices: [
        {
          name: 'Browser (Puppeteer) - Web automation and testing',
          value: 'browser',
          checked: true
        },
        {
          name: 'Context7 - Library documentation search',
          value: 'context7',
          checked: true
        },
        {
          name: 'Exa - Advanced web search',
          value: 'exa',
          checked: true
        },
        {
          name: 'Desktop Commander - File system access',
          value: 'desktop-commander',
          checked: true
        }
      ],
      validate: (input) => {
        if (input.length === 0) {
          return 'Please select at least one MCP (or skip this step if not needed)';
        }
        return true;
      }
    },
    // Conditional: If Exa selected, prompt for API key
    {
      type: 'password',
      name: 'mcpApiKeys.EXA_API_KEY',
      message: 'Exa API Key (optional, can configure later):',
      when: (answers) => answers.selectedMCPs?.includes('exa')
    }
  ];
}
```

### Integration Checklist (Story 1.8)

**MCP Integration (Phase 1):**
- [ ] Add MCP selection questions to wizard
- [ ] Import `installProjectMCPs` from `bin/modules/mcp-installer.js`
- [ ] Call MCP installer during wizard execution
- [ ] Handle MCP installation progress and errors
- [ ] Test MCP integration E2E

**Validation Module (Phase 2):**
- [ ] Create validation module with all validators
- [ ] Implement MCP health checks (deferred from Story 1.5)
- [ ] Generate comprehensive validation report
- [ ] Test validation with successful and failed installations

**Complete Flow (Phase 3):**
- [ ] Run full E2E test: npx init → wizard → install → validate
- [ ] Verify all components installed correctly
- [ ] Test error scenarios and recovery
- [ ] Validate cross-platform compatibility

---

## 🎯 Story 1.8 Goals

**Primary Goals:**
1. ✅ **Integrate MCP installer** (Story 1.5) into wizard - close integration gap
2. ✅ **Validate all installed components** - files, configs, MCPs, dependencies
3. ✅ **Implement MCP health checks** - deferred functionality from Story 1.5
4. ✅ **Provide comprehensive report** - success/warnings/errors clearly shown

**Success Criteria:**
- [ ] MCP installer fully integrated into wizard
- [ ] All 4 MCPs installable via wizard
- [ ] Health checks working for all MCPs
- [ ] Validation report shows status of all components
- [ ] 95%+ installation success rate in testing

---

## 🔗 Dependencies

**Depende de:**
- **[1.4] IDE Selection** - Validate IDE configs created
- **[1.5] MCP Installation** - **INTEGRATE in this story** + validate MCPs
- **[1.6] Environment Config** - Validate .env and core-config.yaml
- **[1.7] Dependency Installation** - Validate node_modules and dependencies

**Bloqueia:**
- **[1.9] Error Handling & Rollback** - Needs validation errors to handle
- **[1.11] First-Run Experience** - Show next steps after validation passes

**Integration:**
- This is the **FINAL INTEGRATION POINT** for all installer components
- Wizard flow completion: 1.3 → 1.4 → 1.6 → 1.7 → **1.5 + 1.8** → 1.9 → 1.11
- Story 1.5 (MCP) integration happens HERE (not separate story)

---

## 🔧 Validation Implementation

### File Structure Validator

```javascript
async function validateFiles(installation) {
  const checks = [];

  // IDE configs (Story 1.4)
  if (installation.files.ideConfigs) {
    installation.files.ideConfigs.forEach(file => {
      checks.push({
        component: 'IDE Config',
        file: file,
        status: fs.existsSync(file) ? 'success' : 'failed',
        message: fs.existsSync(file) ? 'File created' : 'File missing'
      });
    });
  }

  // Environment files (Story 1.6)
  checks.push({
    component: 'Environment',
    file: '.env',
    status: fs.existsSync('.env') ? 'success' : 'failed',
    message: fs.existsSync('.env') ? 'Created' : 'Missing'
  });

  checks.push({
    component: 'Core Config',
    file: '.aios-core/core-config.yaml',
    status: fs.existsSync('.aios-core/core-config.yaml') ? 'success' : 'failed'
  });

  // MCP config (Story 1.5)
  checks.push({
    component: 'MCP Config',
    file: '.mcp.json',
    status: fs.existsSync('.mcp.json') ? 'success' : 'failed'
  });

  return checks;
}
```

### MCP Health Check Implementation (Story 1.5 Deferred)

```javascript
async function validateMCPs(installedMCPs) {
  const healthChecks = [];

  for (const [mcpId, mcpStatus] of Object.entries(installedMCPs)) {
    if (mcpStatus.status !== 'success') {
      healthChecks.push({
        mcp: mcpId,
        status: 'skipped',
        message: 'Skipped - installation failed'
      });
      continue;
    }

    try {
      const health = await runHealthCheck(mcpId);
      healthChecks.push({
        mcp: mcpId,
        status: health.success ? 'success' : 'warning',
        message: health.message,
        responseTime: health.duration
      });
    } catch (error) {
      healthChecks.push({
        mcp: mcpId,
        status: 'failed',
        message: `Health check failed: ${error.message}`
      });
    }
  }

  return healthChecks;
}
```

---

## 📊 Validation Report Format

```
🔍 Installation Validation Report
=====================================

✅ IDE Configuration
  ✓ Cursor config created (.cursor/settings.json)
  ✓ Windsurf config created (.windsurf/settings.json)

✅ Environment Configuration
  ✓ .env file created
  ✓ core-config.yaml created
  ✓ .gitignore updated

✅ MCP Installation (4/4 installed, 3/4 healthy)
  ✓ browser - Installed and healthy (response: 250ms)
  ✓ context7 - Installed and healthy (response: 180ms)
  ⚠️ exa - Installed but health check timeout (check API key)
  ✓ desktop-commander - Installed and healthy (response: 90ms)

✅ Dependencies
  ✓ node_modules created
  ✓ 247 packages installed
  ⚠️ 3 vulnerabilities found (run 'npm audit fix')

=====================================
Overall Status: ✅ SUCCESS (2 warnings)

⚠️ Warnings:
  - Exa MCP health check timeout - verify API key in .env
  - 3 dependency vulnerabilities - run 'npm audit fix'

Next Steps:
  1. Configure API keys in .env (if skipped)
  2. Run 'npm audit fix' to resolve vulnerabilities
  3. Run 'aios --help' to see available commands
  4. Start coding! 🚀
```

---

**Criado por:** River 🌊
**Updated:** 2025-11-22 (Quinn - QA review, added MCP integration plan, comprehensive validation)

