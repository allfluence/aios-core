# Installer Roadmap v2.1 - Complete Feature Plan

**Date:** 2025-01-19  
**Based On:** Pedro Decisions 1 & 2  
**Approach:** Híbrido (Fix Sprint 1 + Refactor Incremental)  

---

## 🎯 Executive Summary

**Sprint 1 (MÍNIMO):** Desbloqueia users em 1 semana  
**Sprints 2-5:** Features adicionais + Sistema MCP global  
**Total Timeline:** 6-8 semanas para versão completa  

---

## 📅 Sprint 1: Critical Fix (1 semana)

**Goal:** Desbloquear users - instalador funcionando 100% em todas as plataformas

**Stories:**
- **BMAD-003:** Fix broken installer (reescrito)

**Features:**
1. ✅ **Fix Windows bugs**
   - Path handling (backslash vs. forward slash)
   - Git ignore rules application
   - Symlink creation issues
   - PowerShell compatibility

2. ✅ **Fix git ignore rules**
   - Proper .gitignore entries based on installation mode
   - Framework files handling (project vs. framework dev)

3. ✅ **Add validation**
   - Post-install validation checks
   - Verify core files present
   - Verify config created
   - Verify IDE rules installed

4. ✅ **Cross-platform testing**
   - Windows 10/11
   - macOS (Intel + M1/M2)
   - Linux (Ubuntu, Debian)

5. ✅ **IDE list updated (8 IDEs)**
   - Cursor
   - Windsurf
   - Zed
   - Void
   - Continue.dev
   - Cline
   - Replit
   - OpenCode

6. ✅ **AI CLI tools selection (6 CLIs)**
   - Claude Code (Anthropic) - Recommended
   - Codex CLI (OpenAI)
   - Gemini CLI (Google)
   - Codebuff
   - Aider
   - OpenCode CLI

7. ✅ **MCPs básicos (4 tools)**
   - Browser (playwright)
   - Context7
   - Exa
   - Desktop Commander
   - Installation: Normal (per-project, not global yet)

**Deliverables:**
- ✅ Fixed `bin/aios-init.js`
- ✅ Installation success rate: 95%+
- ✅ Tested on all 3 platforms
- ✅ Users can install AIOS immediately

**Success Criteria:**
- User runs `npx aios-fullstack@latest install` and completes successfully
- All core files present (11 agents, 68 tasks, 23 templates)
- IDE rules created for selected IDEs
- AI CLI tools installed globally
- 4 MCPs configured in project
- Installation validated automatically

---

## 📅 Sprint 2: Foundation + Module Architecture + Dependency Checking (2 semanas)

**Goal:** Create foundation for future updates + modularize architecture + ensure all dependencies installed

**Stories:**
- **BMAD-001:** Create manifest system
- **BMAD-002:** Simplify core-config.yaml
- **BMAD-004:** Add version tracking
- **NEW: MODULE-REFACTOR-001:** Modular Architecture Implementation
- **NEW: DEPENDENCY-001:** CLI dependency checking + auto-install

**Features:**

### BMAD-001: Manifest System
1. ✅ Create `.aios-core/_cfg/manifest.yaml`
   - Installation metadata
   - Version tracking
   - Component inventory

2. ✅ Generate component manifests (CSV)
   - `agent-manifest.csv` (11 agents)
   - `task-manifest.csv` (68 tasks)
   - `workflow-manifest.csv` (6+ workflows)
   - `template-manifest.csv` (23 templates)
   - `script-manifest.csv` (50+ scripts)

### BMAD-002: Simplified Config
1. ✅ Reduce `core-config.yaml` from 100+ lines to 12-15 lines
   ```yaml
   version: 1.2.3
   aios_folder: .aios-core
   user_name: Pedro Valério
   communication_language: pt-BR
   output_folder: output
   project_type: fullstack
   tech_stack: [Next.js, Supabase, Tailwind]
   ```

2. ✅ Move advanced settings to `.aios-core/system/`
   - `llm.yaml` (model configs)
   - `agents.yaml` (agent settings)
   - `workflows.yaml` (workflow configs)
   - `advanced.yaml` (expert settings)

### BMAD-004: Version Tracking
1. ✅ Implement `aios version`
2. ✅ Implement `aios check-updates`
3. ✅ Implement `aios update`
4. ✅ Implement `aios doctor`

### MODULE-REFACTOR-001: Modular Architecture (NEW from Decisão 3)
1. ✅ **Create module structure**
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
   └── system/             # Configs
   ```

2. ✅ **Migrate agents to modules**
   - Orion → modules/core/agents/
   - Dex, Quinn → modules/development/agents/
   - Morgan, Pax, River → modules/product/agents/
   - Aria, Dara → modules/architecture/agents/
   - Uma → modules/design/agents/
   - Gage → modules/operations/agents/
   - Atlas → modules/research/agents/

3. ✅ **Migrate tasks to modules**
   - Development tasks → modules/development/tasks/
   - Product tasks → modules/product/tasks/
   - Architecture tasks → modules/architecture/tasks/
   - etc.

4. ✅ **Migrate workflows to modules**
   - Greenfield workflows → modules/core/workflows/
   - Brownfield workflows → modules/core/workflows/
   - Domain-specific workflows → respective modules

5. ✅ **Update shared resources**
   - Templates → shared/templates/
   - Checklists → shared/checklists/
   - Data → shared/data/

6. ✅ **Update system configs**
   - llm.yaml → system/llm.yaml
   - agents.yaml → system/agents.yaml
   - workflows.yaml → system/workflows.yaml

7. ✅ **Update imports and references**
   - Fix all path references in scripts
   - Update agent-config-loader.js
   - Update task-runner.js
   - Update workflow-orchestrator.js

8. ✅ **Update installer**
   - Installer copia estrutura modular
   - Manifest rastreia módulos
   - Validação de estrutura modular

9. ✅ **Regression testing**
   - All agents load correctly
   - All tasks execute correctly
   - All workflows orchestrate correctly
   - IDE integrations work

10. ✅ **Documentation updates**
    - Update source-tree.md
    - Update FRAMEWORK-MASTER.md
    - Update LIVRO-DE-OURO.md
    - Create migration guide

### DEPENDENCY-001: CLI Dependency Checking (NEW from Opção B)
1. ✅ **Detect installed CLIs**
   - Node.js & npm (required - auto-check)
   - GitHub CLI (gh)
   - Supabase CLI
   - Railway CLI
   - psql (PostgreSQL client)
   - Docker CLI

2. ✅ **Show status to user**
   ```
   🔍 Checking installed CLI tools...
   ✓ Node.js v20.10.0 (Required)
   ✓ npm v10.2.3 (Required)
   ✓ GitHub CLI (gh) v2.40.0
   ✗ Supabase CLI not found
   ✗ psql not found
   ✗ Docker CLI not found
   ```

3. ✅ **Auto-install missing tools**
   - npm-based tools: Auto-install via npm
   - System tools: Provide installation instructions
   - Optional: Download installers automatically

4. ✅ **Verify after install**
   - Run `<cli> --version` for each tool
   - Confirm successful installation

**Deliverables:**
- ✅ Manifest system operational
- ✅ Simplified config (80% less complexity)
- ✅ Version tracking commands working
- ✅ **Modular architecture implemented**
- ✅ CLI dependency checking + auto-install

**Success Criteria:**
- All components tracked in manifests
- Config file easy to understand and edit
- `aios version` shows current version
- `aios check-updates` detects new versions
- `aios doctor` validates installation
- **All agents/tasks migrated to modular structure**
- **Installer loads from modular architecture**
- **Documentation updated with new structure**
- Missing CLI tools detected and installed automatically

---

## 📅 Sprint 3: Enhanced UX (1-2 semanas)

**Goal:** Professional installation experience with progress feedback

**Stories:**
- **BMAD-010:** Enhanced installer wizard
- **BMAD-011:** Rollback mechanism
- **NEW: UX-001:** Progress bar + time estimation (from Opção C)

**Features:**

### BMAD-010: Enhanced Wizard
1. ✅ **Better visual feedback**
   - Cleaner prompts
   - Better spacing
   - Color coding (success/error/info)

2. ✅ **Global MCP detection UI**
   - Show existing MCP config if found
   - Clear indication of what's already installed
   - Option to add more or skip

3. ✅ **CLI dependency checker UI**
   - Visual status for each tool
   - Clear install/skip options
   - Progress for each installation

### BMAD-011: Rollback Mechanism
1. ✅ **Automatic backup before changes**
   - Backup existing `.aios-core/` if present
   - Backup `core-config.yaml`
   - Backup IDE rules

2. ✅ **`aios rollback` command**
   - Restore previous version
   - List available backups
   - Confirm before rollback

3. ✅ **Safe recovery on failure**
   - Auto-rollback if installation fails
   - Preserve user data
   - Clear error messages

### UX-001: Progress + Time Estimation (NEW from Opção C)
1. ✅ **Progress bar**
   ```
   📦 Installing AIOS Core...
   [████████████████░░░░] 80% (Step 8/10)
   Current: Installing expansion packs...
   ```

2. ✅ **Time estimation**
   ```
   ⏱️ Estimated time remaining: 1 minute 30 seconds
   ```

3. ✅ **Better error messages**
   - Clear explanation of what went wrong
   - Suggested fixes
   - Link to troubleshooting docs

4. ✅ **Rollback on failure (básico)**
   - Auto-rollback if critical step fails
   - Preserve state before failure
   - Allow retry

**Deliverables:**
- ✅ Enhanced wizard with better UX
- ✅ Rollback mechanism working
- ✅ Progress bar during installation
- ✅ Time estimation displayed
- ✅ Better error handling

**Success Criteria:**
- Installation shows clear progress
- User knows how long it will take
- Errors are clear and actionable
- Failed installations rollback automatically
- `aios rollback` command works

---

## 📅 Sprint 4: MCP Integration Investigation (2 semanas)

**Goal:** Research how each CLI tool integrates with MCPs

**Stories:**
- **NEW: MCP-RESEARCH-001:** Investigate Claude Code MCP integration
- **NEW: MCP-RESEARCH-002:** Investigate Codex CLI MCP integration
- **NEW: MCP-RESEARCH-003:** Investigate Gemini CLI MCP integration
- **NEW: MCP-RESEARCH-004:** Investigate other CLIs (Codebuff, Aider, OpenCode)
- **NEW: MCP-RESEARCH-005:** Design unified MCP config system

**Research Tasks:**

### 1. Claude Code MCP Integration
- How does Claude Code detect MCPs?
- Config file location: `~/.claude.json`
- MCP server startup process
- Authentication/token management
- Limitations and known issues

### 2. Codex CLI MCP Integration
- How does Codex CLI detect MCPs?
- Config file location: TBD
- MCP server startup process
- Authentication/token management
- Limitations and known issues

### 3. Gemini CLI MCP Integration
- How does Gemini CLI detect MCPs?
- Config file location: TBD
- MCP server startup process
- Authentication/token management
- Limitations and known issues

### 4. Other CLIs
- Codebuff MCP support
- Aider MCP support
- OpenCode MCP support
- Identify common patterns

### 5. Design Unified System
- **Global config location:**
  - Windows: `C:\Users\<username>\.aios\1mcp\`
  - Mac/Linux: `~/.aios/1mcp/`

- **Config format:**
  ```json
  {
    "servers": [
      {
        "name": "browser",
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-playwright"],
        "env": {}
      },
      {
        "name": "context7",
        "command": "npx",
        "args": ["-y", "@context7/mcp-server"],
        "env": {
          "CONTEXT7_API_KEY": "..."
        }
      }
    ]
  }
  ```

- **Project integration:**
  - Symlink from project to global config
  - CLI-specific config generation
  - Validation and testing

**Deliverables:**
- ✅ Research report for each CLI tool
- ✅ Design doc for unified MCP system
- ✅ Proof of concept implementation
- ✅ Test results with each CLI

**Success Criteria:**
- Understand how each CLI integrates with MCPs
- Identify common patterns
- Design system that works with all CLIs
- Validated with proof of concept

---

## 📅 Sprint 5: MCP System Global Implementation (1 semana)

**Goal:** Implement global MCP system + migrate existing projects

**Stories:**
- **NEW: MCP-SYSTEM-001:** Implement global MCP config
- **NEW: MCP-SYSTEM-002:** Update installer with global MCP detection
- **NEW: MCP-SYSTEM-003:** Create migration script for existing projects
- **NEW: Epic 6.2 Integration:** Extract 1MCP documentation

**Features:**

### 1. Global MCP Config
- ✅ Create `.aios/1mcp/` directory in user home
- ✅ Install 1mcp server globally (`npm install -g @1mcp/agent`)
- ✅ Generate config.json with all MCPs
- ✅ Create presets (dev, research, docker, full)

### 2. Installer Updates
- ✅ **Detect existing global config**
  ```
  🔍 Checking for existing MCP configuration...
  ✓ Found MCP config at C:\Users\Pedro\.aios\1mcp\
  ✓ MCPs installed: browser, context7, exa, desktop-commander
  
  ? Your MCP tools are up to date! Install additional tools?
    ❯ No, keep current configuration
      Yes, add more tools
  ```

- ✅ **First-time installation**
  ```
  ? Select MCP tools to install (ONE-TIME GLOBAL SETUP):
    ◉ All tools (Recommended)
    ◯ Custom selection: (12 tools)
  ```

- ✅ **Project linking**
  - Create symlink: `.aios-core/tools/mcp → ~/.aios/1mcp/`
  - Generate CLI-specific configs
  - Validate integration

### 3. Migration Script
- ✅ Detect old MCP installations (per-project)
- ✅ Move to global config
- ✅ Create symlinks for all projects
- ✅ Validate after migration
- ✅ Rollback if issues

### 4. Epic 6.2 Integration
- ✅ Extract 1MCP documentation from `.claude/CLAUDE.md`
- ✅ Create public docs: `docs/architecture/mcp-optimization-1mcp.md`
- ✅ Document 85% token reduction (280K → 40K)
- ✅ Update all relevant documentation

**Deliverables:**
- ✅ Global MCP system operational
- ✅ Installer updated with global MCP detection
- ✅ Migration script working
- ✅ Epic 6.2 documentation complete

**Success Criteria:**
- MCPs installed once, used everywhere
- Installer detects existing config
- New projects link to global config
- Old projects migrated successfully
- Token reduction proven (85%)
- Documentation complete

---

## 📊 Complete Timeline

| Sprint | Duration | Effort | Stories | Status |
|--------|----------|--------|---------|--------|
| **Sprint 1** | 1 semana | Low | 1 story (BMAD-003) | ⏸️ Ready |
| **Sprint 2** | 2 semanas | High | 5 stories (BMAD-001, 002, 004, MODULE-001, DEPENDENCY-001) | ⏸️ Pending |
| **Sprint 3** | 1-2 semanas | Medium | 3 stories (BMAD-010, 011, UX-001) | ⏸️ Pending |
| **Sprint 4** | 2 semanas | High | 5 stories (MCP-RESEARCH-*) | ⏸️ Pending |
| **Sprint 5** | 1 semana | Medium | 4 stories (MCP-SYSTEM-*, Epic 6.2) | ⏸️ Pending |
| **TOTAL** | 6-8 semanas | - | 17 stories | - |

---

## 🎯 Feature Checklist

### Sprint 1 (Week 1)
- [x] Fix Windows bugs
- [x] Fix git ignore rules
- [x] Add validation
- [x] Cross-platform testing
- [x] 8 IDEs support
- [x] 6 AI CLI tools
- [x] 4 MCPs básicos (per-project)

### Sprint 2 (Weeks 2-3)
- [ ] Manifest system
- [ ] Simplified config
- [ ] Version tracking
- [ ] **Modular architecture migration**
- [ ] **Update installer for modules**
- [ ] CLI dependency checking
- [ ] Auto-install missing tools

### Sprint 3 (Weeks 4-5)
- [ ] Enhanced wizard UX
- [ ] Rollback mechanism
- [ ] Progress bar
- [ ] Time estimation
- [ ] Better error messages

### Sprint 4 (Weeks 5-6)
- [ ] Claude Code MCP research
- [ ] Codex CLI MCP research
- [ ] Gemini CLI MCP research
- [ ] Other CLIs MCP research
- [ ] Unified system design

### Sprint 5 (Week 7)
- [ ] Global MCP config implementation
- [ ] Installer MCP detection
- [ ] Migration script
- [ ] Epic 6.2 documentation

---

## 📝 Notes

**Por que essa ordem?**
1. ✅ Sprint 1: Desbloqueia users IMEDIATAMENTE
2. ✅ Sprint 2: Cria foundation para updates futuros
3. ✅ Sprint 3: Melhora experiência profissional
4. ✅ Sprint 4: Pesquisa necessária antes de implementar
5. ✅ Sprint 5: Implementa sistema MCP global completo

**Benefícios da abordagem:**
- Users não ficam bloqueados
- Cada sprint entrega valor
- Risco distribuído
- Aprendizado incremental
- Qualidade mantida

**Flexibilidade:**
- Sprints 2-3 podem ser invertidos se necessário
- Sprint 4 pode ser paralelo a Sprint 2-3
- Sprint 5 depende de Sprint 4 (research)

---

**Document Status:** ✅ COMPLETE  
**Based On:** Pedro Decisions 1 & 2  
**Next Steps:** Continue interview (8 more decisions)  


