# Installer Hybrid Approach - Complete Proposal

**Date:** 2025-01-19  
**Decision:** ✅ C) Híbrido (Fix Sprint 1 + Refactor Sprint 2-3)  
**Decided By:** Pedro Valério  
**Strategy:** Focus on `npx aios-fullstack` (remove npm install dependency)  

---

## 📊 Executive Summary

**Pedro's Decision:** Implement Hybrid Approach with focus on `npx` workflow

**Key Changes:**
1. ✅ **Remove NPM install dependency** - Users DON'T need `npm install -g aios-fullstack`
2. ✅ **Focus on npx workflow** - `npx aios-fullstack@latest install` works immediately
3. ✅ **Sprint 1:** Fix critical bugs in current installer (1 week)
4. ✅ **Sprint 2-3:** Refactor with BMAD patterns (manifest + config + wizard)

---

## 🎯 Current State Analysis

### What We Have Today

**Installation Methods:**
```bash
# Method 1: NPM Global Install (PROBLEMÁTICO)
npm install -g aios-fullstack
aios-fullstack install

# Method 2: NPX (FUNCIONA, mas com bugs)
npx aios-fullstack@latest install

# Method 3: NPX with version
npx aios-fullstack@1.2.3 install
```

**Current Installer Features:**
1. ✅ ASCII Art Banner
2. ✅ Installation Mode selection (project vs. framework development)
3. ✅ PM Tool selection (local, ClickUp, GitHub Projects, Jira)
4. ✅ IDE selection (Claude Code, Windsurf, Cursor)
5. ✅ AIOS Core files copy (11 agents, 68 tasks, 23 templates)
6. ✅ IDE rules installation
7. ✅ Expansion Packs selection (opcional)
8. ✅ git + package.json initialization (if needed)

**Current Problems (Identified by Investigation):**
- ❌ Breaks on Windows (confirmed)
- ❌ Sometimes breaks on Mac/Linux
- ❌ git ignore rules not applied properly
- ❌ PM tool config incomplete
- ❌ No version tracking
- ❌ No rollback mechanism
- ❌ No validation after install
- ❌ No manifest system

---

## 🚀 Proposed Solution: Hybrid Approach

### Phase 1: Sprint 1 (Week 1-2) - FIX RÁPIDO

**Goal:** Make `npx aios-fullstack@latest install` work 100% on Windows/Mac/Linux

**Scope:**
- ✅ Fix Windows-specific bugs
- ✅ Fix git ignore rules application
- ✅ Fix PM tool config completion
- ✅ Add basic validation after install
- ✅ Test on all 3 platforms
- ✅ Keep current feature set (don't remove anything)

**Deliverables:**
- ✅ `bin/aios-init.js` fixed (current installer)
- ✅ Cross-platform tested
- ✅ Installation success rate: <50% → 95%
- ✅ Users can install AIOS immediately

**Effort:** 1 semana  
**Story:** BMAD-003 (Fix installer)

---

### Phase 2: Sprint 2-3 (Week 3-6) - REFACTOR INCREMENTAL

**Goal:** Add BMAD-inspired patterns for future-proofing

**Sprint 2 (Week 3-4):**
- ✅ **BMAD-001:** Create manifest system
- ✅ **BMAD-002:** Simplify core-config.yaml
- ✅ **BMAD-004:** Add version tracking

**Sprint 3 (Week 5-6):**
- ✅ **BMAD-010:** Enhanced installer wizard
- ✅ **BMAD-011:** Rollback mechanism

**Deliverables:**
- ✅ Manifest system (CSV files for all components)
- ✅ Simplified config (100+ lines → 12-15 lines)
- ✅ Version tracking (`aios version`, `aios check-updates`)
- ✅ Better wizard UX
- ✅ Safe rollback if installation fails

**Effort:** 2 semanas  
**Stories:** BMAD-001, 002, 004, 010, 011

---

## 📋 User Flow Proposal (Hybrid Model)

### Flow A: New User (First Time)

```bash
# User types this ONE command:
npx aios-fullstack@latest install

# AIOS Installer starts:
# ════════════════════════════════════════════════════════════════
#   █████╗ ██╗ ██████╗ ███████╗      ███████╗██╗   ██╗██╗     ██╗     
#  ██╔══██╗██║██╔═══██╗██╔════╝      ██╔════╝██║   ██║██║     ██║     
#  ███████║██║██║   ██║███████╗█████╗█████╗  ██║   ██║██║     ██║     
#  ██╔══██║██║██║   ██║╚════██║╚════╝██╔══╝  ██║   ██║██║     ██║     
#  ██║  ██║██║╚██████╔╝███████║      ██║     ╚██████╔╝███████╗███████╗
#  ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚══════╝      ╚═╝      ╚═════╝ ╚══════╝╚══════╝
# ════════════════════════════════════════════════════════════════
# 🚀 Universal AI Agent Framework for Any Domain
# ✨ Installer v1.2.3
# ════════════════════════════════════════════════════════════════

# STEP 1: Installation Mode
? How are you using AIOS-FullStack?
  ❯ Using AIOS in a project (Framework files added to .gitignore)
    Developing AIOS framework itself (Framework files are source code)

# STEP 2: PM Tool
? Do you use a project management tool?
  ❯ None (local YAML files only) - Recommended
    ClickUp - Requires API token
    GitHub Projects - Uses gh auth
    Jira - Requires API token

# STEP 3: IDE Selection (Multi-select with <space>)
? Which IDE(s) will you use? (Press <space> to select, <enter> to proceed)
  ◯ Cursor - AI-native code editor (most popular)
  ◯ Windsurf - Agentic coding with Cascade
  ◯ Zed - Fast, lightweight, collaborative
  ◯ Void - Open-source AI code editor
  ◯ Continue.dev - Open-source Copilot alternative
  ◯ Cline - VS Code extension for code assistant
  ◯ Replit - Browser-based IDE with AI
  ◯ OpenCode - Fully open-source alternative
  ◯ Skip IDE setup

# STEP 4: MCP Tools (NEW in Sprint 2)
? Which MCP tools do you want? (Optional, press <enter> to skip)
  ◯ Browser (playwright) - For web automation
  ◯ ClickUp - For task management
  ◯ Context7 - For library docs
  ◯ Exa - For web search
  ◯ Desktop Commander - For file operations
  ◯ None

# STEP 5: CLI Tools (NEW in Sprint 2)
? Which CLI tools do you need? (Optional)
  ◯ GitHub CLI (gh) - For GitHub operations
  ◯ Supabase CLI - For database
  ◯ Railway CLI - For deployments
  ◯ None

# STEP 6: Expansion Packs (Current feature)
? Select expansion packs to install (optional)
  ◯ expansion-creator - Create your own packs
  ◯ data-engineering - ETL & data pipelines
  ◯ ux-design - Atomic Design workflow
  ◯ devops - Full DevOps automation

# STEP 7: Installation
📦 Installing AIOS Core files...
✓ AIOS Core files installed (11 agents, 68 tasks, 23 templates)
📝 Installing IDE configurations...
✓ Claude Code base rules installed
✓ Claude Code CORE agents installed (11 agents)
✓ Claude Code CORE tasks installed (68 tasks)
📦 Installing expansion packs...
✓ Expansion pack installed: expansion-creator

# STEP 8: Validation (NEW in Sprint 1)
🔍 Validating installation...
✓ Git repository initialized
✓ package.json created
✓ .gitignore configured
✓ Core files present (11 agents, 68 tasks)
✓ IDE rules present (.claude/CLAUDE.md)
✓ Configuration saved

# SUCCESS!
════════════════════════════════════════════════════════════════
✅ AIOS-FullStack installed successfully!

📚 Next Steps:
1. Check .claude/CLAUDE.md for available commands
2. Try: @dev create a simple "Hello World" app
3. Or: @sm create a story for user authentication

📖 Documentation: https://github.com/your-org/aios-fullstack
💬 Support: https://discord.gg/aios-fullstack
════════════════════════════════════════════════════════════════
```

---

### Flow B: Existing User (Update)

```bash
# User types:
npx aios-fullstack@latest install

# AIOS Detects existing installation:
════════════════════════════════════════════════════════════════
⚠️  AIOS-FullStack is already installed (v1.2.1)

? What would you like to do?
  ❯ Update to v1.2.3 (latest)
    Reinstall current version (v1.2.1)
    Rollback to previous version
    Repair installation
    Uninstall

# If "Update" selected:
📦 Updating AIOS-FullStack...
✓ Backing up current installation
✓ Downloading v1.2.3
✓ Installing new version
✓ Migrating configuration
✓ Validating installation
✅ Updated successfully! (v1.2.1 → v1.2.3)

# If issues:
❌ Update failed. Rolling back to v1.2.1...
✓ Rollback complete. Your installation is safe.
```

---

### Flow C: Power User (Non-Interactive)

```bash
# Automated installation with flags:
npx aios-fullstack@latest install \
  --mode project \
  --pm local \
  --ide claude \
  --mcp browser,clickup \
  --cli github \
  --packs expansion-creator \
  --quiet

# Output:
✓ AIOS-FullStack installed successfully (1.2s)
```

---

## 🎨 Features by Sprint

### Sprint 1 Features (KEEP + FIX)

**Installation Modes:**
- ✅ Project development (framework in .gitignore)
- ✅ Framework development (framework is source)

**PM Tools:**
- ✅ None (local YAML)
- ✅ ClickUp
- ✅ GitHub Projects
- ✅ Jira

**IDEs:**
- ✅ Claude Code (v1.0) - Recommended
- ✅ Windsurf (v1.0)
- ✅ Cursor (v0.43)

**Core Components:**
- ✅ 11 Agents (Dex, Quinn, Pax, Morgan, River, Aria, Atlas, Gage, Uma, Dara, Orion)
- ✅ 68 Tasks
- ✅ 23 Templates
- ✅ 6 Workflows

**Expansion Packs:**
- ✅ expansion-creator
- ✅ (outros packs conforme disponíveis)

**Prerequisites Handling:**
- ✅ Git initialization (if not present)
- ✅ package.json creation (if not present)
- ✅ .gitignore configuration

**NEW in Sprint 1:**
- ✅ Cross-platform fixes (Windows/Mac/Linux)
- ✅ Git ignore rules fixed
- ✅ PM tool config completion
- ✅ Basic validation after install
- ✅ Better error messages

---

### Sprint 2 Features (NEW)

**Manifest System (BMAD-001):**
- ✅ `.aios-core/_cfg/manifest.yaml` - Installation metadata
- ✅ `.aios-core/_cfg/agent-manifest.csv` - 11 agents tracked
- ✅ `.aios-core/_cfg/task-manifest.csv` - 68 tasks tracked
- ✅ `.aios-core/_cfg/workflow-manifest.csv` - 6+ workflows tracked
- ✅ `.aios-core/_cfg/template-manifest.csv` - 23 templates tracked
- ✅ `.aios-core/_cfg/script-manifest.csv` - 50+ scripts tracked

**Simplified Config (BMAD-002):**
```yaml
# core-config.yaml (BEFORE: 100+ lines)
version: 1.2.3
aios_folder: .aios-core
user_name: Pedro Valério
communication_language: pt-BR
output_folder: output
project_type: fullstack
tech_stack: [Next.js, Supabase, Tailwind]

# Advanced settings moved to .aios-core/system/
# - llm.yaml (model configs)
# - agents.yaml (agent settings)
# - workflows.yaml (workflow configs)
# - advanced.yaml (expert settings)
```

**Version Tracking (BMAD-004):**
```bash
aios version          # Show current version
aios check-updates    # Check for new versions
aios update           # Update to latest
aios doctor           # Validate installation
```

---

### Sprint 3 Features (NEW)

**MCP Tools Selection (NEW):**
- ✅ Browser (playwright)
- ✅ ClickUp
- ✅ Context7
- ✅ Exa
- ✅ Desktop Commander
- ✅ Docker
- ✅ Portainer
- ✅ Magic Patterns

**CLI Tools Selection (NEW):**
- ✅ GitHub CLI (gh)
- ✅ Supabase CLI
- ✅ Railway CLI

**Enhanced Wizard (BMAD-010):**
- ✅ Progress bar durante installation
- ✅ Estimated time remaining
- ✅ Rollback on failure
- ✅ Better visual feedback

**Rollback Mechanism (BMAD-011):**
- ✅ Automatic backup before update
- ✅ `aios rollback` command
- ✅ Safe recovery if installation fails

---

## 🔧 Tools, IDEs & Modules - Complete List

### IDEs Supported

**Tier 1 (Full Support):**
1. **Claude Code** (v1.0)
   - Rules file: `.claude/CLAUDE.md`
   - Agents: `.claude/commands/AIOS/agents/` (11 agents)
   - Tasks: `.claude/commands/AIOS/tasks/` (68 tasks)
   - Expansion packs: `.claude/commands/<pack-name>/`

2. **Cursor** (v0.43)
   - Rules file: `.cursor/rules.md`
   - Agents: Converted from `.md` to `.mdc`

3. **Windsurf** (v1.0)
   - Rules file: `.windsurf/rules.md`

**Future Support (v2.2):**
- VS Code with Continue
- JetBrains IDEs with AI Assistant

---

### MCP Tools (Model Context Protocol)

**Available for Selection:**

1. **browser** (playwright)
   - Web automation
   - Screenshot capture
   - Form filling
   - Navigation

2. **clickup**
   - Task management
   - Workspace operations
   - Team collaboration

3. **context7**
   - Library documentation
   - API reference
   - Code examples

4. **exa**
   - Web search
   - Research
   - Content discovery

5. **desktop-commander**
   - File operations
   - Process management
   - System commands

6. **docker-mcp**
   - Container management
   - Image operations
   - Network config

7. **portainer**
   - Stack management
   - Service monitoring
   - Volume operations

8. **magic-patterns**
   - UI component generation
   - Design patterns

9. **google-workspace** (future)
   - Docs, Sheets, Slides
   - Gmail integration

10. **n8n** (future)
    - Workflow automation
    - API integrations

---

### CLI Tools

**Available for Selection:**

1. **GitHub CLI (gh)**
   - Repository operations
   - PR management
   - Issue tracking
   - Actions

2. **Supabase CLI**
   - Database migrations
   - Edge functions
   - Auth config
   - Storage

3. **Railway CLI**
   - Deployments
   - Service management
   - Environment vars

---

### Expansion Packs

**Core Packs:**

1. **expansion-creator**
   - Create custom expansion packs
   - Template for new packs
   - Documentation generator

2. **data-engineering** (future)
   - ETL workflows
   - Data pipelines
   - Schema validation

3. **ux-design** (future)
   - Atomic Design workflow
   - Component library
   - Design system

4. **devops** (future)
   - Full DevOps automation
   - CI/CD templates
   - Infrastructure as Code

---

### PM Tools

**Available for Selection:**

1. **local** (YAML files)
   - No external dependencies
   - Git-versioned
   - Offline-first

2. **ClickUp**
   - Full API integration
   - Workspace sync
   - Task automation

3. **GitHub Projects**
   - Native GitHub integration
   - Uses `gh` CLI
   - Project boards

4. **Jira**
   - Enterprise integration
   - Issue tracking
   - Sprint management

---

## 🎯 Decision Impact Matrix

### Based on User Choices

**Installation Mode:**
- **Project Development** → Framework files in `.gitignore`
- **Framework Development** → Framework files are source (NOT in `.gitignore`)

**PM Tool:**
- **local** → YAML files in `docs/stories/`, `docs/epics/`
- **ClickUp** → API token required, workspace sync enabled
- **GitHub** → `gh auth` required, uses GitHub Projects API
- **Jira** → API token + instance URL required

**IDE Selection:**
- **Claude Code** → Full agent + task installation in `.claude/`
- **Cursor** → Rules + converted agents in `.cursor/`
- **Windsurf** → Rules only in `.windsurf/`
- **None** → Skip IDE setup

**MCP Tools:**
- **Each tool** → Config file copied to `.aios-core/tools/mcp/<tool>.yaml`
- **browser** → Playwright installed as dependency
- **desktop-commander** → Full file ops enabled
- **None** → Skip MCP setup

**CLI Tools:**
- **GitHub CLI** → Installation instructions displayed
- **Supabase CLI** → Installation instructions displayed
- **Railway CLI** → Installation instructions displayed
- **None** → Skip CLI setup

**Expansion Packs:**
- **Each pack** → Installed in `expansion-packs/<pack-name>/`
- **Claude Code** → Pack agents/tasks copied to `.claude/commands/<pack-name>/`
- **Cursor** → Pack agents converted to `.mdc` in `.cursor/rules/<pack-name>/`

---

## 📊 Effort & Timeline

### Sprint 1: Fix Installer (Week 1-2)

**BMAD-003: Fix broken installer**
- **Effort:** 1 semana
- **Owner:** Dex (Dev)
- **Tasks:**
  1. Fix Windows-specific bugs (2 days)
  2. Fix git ignore application (1 day)
  3. Fix PM tool config (1 day)
  4. Add validation after install (1 day)
  5. Cross-platform testing (2 days)

**Success Criteria:**
- ✅ Installation success rate >95%
- ✅ Works on Windows/Mac/Linux
- ✅ Git ignore rules applied correctly
- ✅ PM tool config complete
- ✅ Validation passes

---

### Sprint 2: Manifest + Config (Week 3-4)

**BMAD-001: Create manifest system**
- **Effort:** 2-3 dias
- **Owner:** Dex + Aria
- **Tasks:**
  1. Create manifest.yaml structure (4h)
  2. Generate agent-manifest.csv (4h)
  3. Generate task-manifest.csv (4h)
  4. Generate workflow-manifest.csv (2h)
  5. Generate template-manifest.csv (2h)
  6. Generate script-manifest.csv (4h)

**BMAD-002: Simplify core-config.yaml**
- **Effort:** 1-2 dias
- **Owner:** Dex
- **Tasks:**
  1. Create simplified config (4h)
  2. Move advanced settings to .aios-core/system/ (4h)
  3. Create migration script (8h)
  4. Test with existing projects (4h)

**BMAD-004: Add version tracking**
- **Effort:** 3-4 dias
- **Owner:** Dex
- **Tasks:**
  1. Implement `aios version` (4h)
  2. Implement `aios check-updates` (8h)
  3. Implement `aios update` (12h)
  4. Implement `aios doctor` (8h)

---

### Sprint 3: Enhanced Wizard (Week 5-6)

**BMAD-010: Enhanced installer wizard**
- **Effort:** 1-2 dias
- **Owner:** Dex + Uma (UX)
- **Tasks:**
  1. Add progress bar (4h)
  2. Add time estimation (4h)
  3. Improve visual feedback (8h)
  4. Add MCP tools selection (4h)
  5. Add CLI tools selection (4h)

**BMAD-011: Rollback mechanism**
- **Effort:** 2 dias
- **Owner:** Dex
- **Tasks:**
  1. Implement backup before update (8h)
  2. Implement `aios rollback` (8h)
  3. Test rollback scenarios (8h)

---

## ✅ Recommendations

### For Sprint 1 (IMMEDIATE)

1. ✅ **Focus on npx workflow** - Don't require `npm install -g`
2. ✅ **Fix Windows bugs** - Highest priority (most users)
3. ✅ **Add validation** - Catch issues early
4. ✅ **Keep current features** - Don't remove anything users rely on

### For Sprint 2-3 (FOUNDATION)

1. ✅ **Manifest system** - Single source of truth for all components
2. ✅ **Simplified config** - 80% less complexity
3. ✅ **Version tracking** - Enable updates and rollbacks
4. ✅ **Enhanced wizard** - Better UX

### For Future (v2.2)

1. ⏸️ **Module refactor** - Wait for v2.2 (breaking change)
2. ⏸️ **More MCP tools** - Add as they become available
3. ⏸️ **More expansion packs** - Community-driven
4. ⏸️ **More IDE support** - VS Code, JetBrains

---

## 📝 Next Steps

### Immediate (Today)

1. ✅ Record Pedro's decision (DONE)
2. ✅ Continue interview (9 more questions)
3. ✅ Create consolidated sprint plan

### Sprint 1 Prep (This Week)

1. ⏸️ River (SM) drafts BMAD-003 story
2. ⏸️ Pax (PO) validates acceptance criteria
3. ⏸️ Dex (Dev) reviews current installer code
4. ⏸️ Aria (Architect) designs validation system

### Sprint 2-3 Prep (Next Week)

1. ⏸️ Aria designs manifest system
2. ⏸️ Aria designs simplified config structure
3. ⏸️ Dex prototypes version tracking commands

---

**Document Status:** ✅ COMPLETE  
**Decision Recorded:** ✅ C) Híbrido  
**NPX Focus:** ✅ Confirmed  
**Next:** Continue interview (Question 2 of 10)  


