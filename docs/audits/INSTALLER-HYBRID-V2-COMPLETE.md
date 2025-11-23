# Installer Hybrid Approach V2 - UPDATED with Research

**Date:** 2025-01-19  
**Decision:** ✅ C) Híbrido (Fix Sprint 1 + Refactor Sprint 2-3)  
**Decided By:** Pedro Valério  
**Strategy:** Focus on `npx aios-fullstack` + Global MCP Config + Updated IDE/CLI Lists  

---

## 🎯 User Flow - UPDATED VERSION

```bash
# User types this ONE command:
npx aios-fullstack@latest install

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

# STEP 4: AI CLI Tools (NEW - Separate from IDEs)
? Which AI CLI assistant(s) do you want? (Optional)
  ◯ Claude Code - Terminal AI by Anthropic (Recommended)
  ◯ Codex CLI - Terminal AI by OpenAI
  ◯ Gemini CLI - Terminal AI by Google
  ◯ Codebuff - Context-aware AI assistant
  ◯ Aider - Git-first coding assistant
  ◯ OpenCode CLI - Open-source alternative
  ◯ None

# STEP 5: MCP Tools Configuration (GLOBAL CONFIG)
🔍 Checking for existing MCP configuration...

# If found:
✓ Found MCP config at C:\Users\AllFluence-User\.aios\1mcp\
✓ MCPs installed: browser, context7, exa, clickup, desktop-commander

? Your MCP tools are up to date! Install additional tools?
  ❯ No, keep current configuration
    Yes, add more tools

# If not found OR user wants to add:
? Select MCP tools to install (ONE-TIME GLOBAL SETUP):
  ◉ All tools (Recommended) - Install complete MCP ecosystem
  ◯ Custom selection:
      ◯ Browser (playwright) - Web automation
      ◯ Context7 - Library documentation  
      ◯ Exa - Web search & research
      ◯ Desktop Commander - File operations & system commands
      ◯ ClickUp - Task management
      ◯ Docker - Container management
      ◯ Portainer - Stack management
      ◯ Magic Patterns - UI component generation
      ◯ Google Workspace - Docs, Sheets, Gmail
      ◯ Supabase - Database operations
      ◯ GitHub - Repository operations
      ◯ n8n - Workflow automation
  ◯ None

# MCP Installation (GLOBAL)
📦 Installing MCPs to global config...
✓ Config directory: C:\Users\AllFluence-User\.aios\1mcp\
✓ 1mcp server installed (npm install -g @1mcp/agent)
✓ MCP browser added (1mcp mcp add browser)
✓ MCP context7 added
✓ MCP exa added
✓ MCP desktop-commander added
✓ MCP clickup added
...

🎉 MCP tools installed GLOBALLY!
ℹ️ These tools will be available in ALL your AIOS projects.
ℹ️ Config location: C:\Users\AllFluence-User\.aios\1mcp\

# STEP 6: System CLI Tools (NEW in Sprint 2)
? Which CLI tools does your system need? (Optional)
  ◯ Complete system (All tools) - Recommended for full development
  ◯ Custom selection:
      ◯ GitHub CLI (gh) - GitHub operations
      ◯ Supabase CLI - Database management
      ◯ Railway CLI - Cloud deployments
      ◯ psql - PostgreSQL client
      ◯ Docker CLI - Container management
      ◯ Node.js & npm - Required (will verify/install)
  ◯ None

# CLI Dependency Check
🔍 Checking installed CLI tools...
✓ Node.js v20.10.0 (Required)
✓ npm v10.2.3 (Required)
✓ GitHub CLI (gh) v2.40.0
✗ Supabase CLI not found
✗ psql not found

? Install missing tools?
  ❯ Yes, install automatically (Recommended)
    No, I'll install manually
    Skip

# If "Yes":
📦 Installing missing tools...
✓ Supabase CLI installed via npm
✓ psql installation instructions displayed (requires admin)

# STEP 7: Expansion Packs (Current feature)
? Select expansion packs to install (optional)
  ◯ expansion-creator - Create your own packs
  ◯ data-engineering - ETL & data pipelines
  ◯ None

ℹ️  Note: Only open-source packs shown. 
ℹ️  UX-design features are built into ux-design-expert agent.
ℹ️  Additional packs available in AIOS Service offering.

# STEP 8: Installation
📦 Installing AIOS Core files...
✓ AIOS Core files installed (11 agents, 68 tasks, 23 templates)

📝 Installing IDE configurations...
✓ Cursor rules installed (.cursor/rules.md)
✓ Windsurf rules installed (.windsurf/rules.md)
✓ Zed rules installed (.zed/aios-rules.md)

📦 Installing AI CLI tools...
✓ Claude Code installed (npm install -g @anthropic-ai/claude-code)
✓ Codex CLI installed (npm install -g @openai/codex)

📦 Installing expansion packs...
✓ Expansion pack installed: expansion-creator

# STEP 9: MCP Integration (PROJECT-LEVEL)
🔗 Linking global MCP config to project...
✓ Symlink created: .aios-core/tools/mcp → C:\Users\AllFluence-User\.aios\1mcp\
✓ Project configured to use global MCPs

ℹ️  To add MCPs later, use: 1mcp mcp add <toolname>
ℹ️  MCPs are shared across ALL your AIOS projects.

# STEP 10: Validation (NEW in Sprint 1)
🔍 Validating installation...
✓ Git repository initialized
✓ package.json created
✓ .gitignore configured
✓ Core files present (11 agents, 68 tasks)
✓ IDE rules present (.cursor/rules.md, .windsurf/rules.md)
✓ Global MCP config linked
✓ Configuration saved

# SUCCESS!
════════════════════════════════════════════════════════════════
✅ AIOS-FullStack installed successfully!

📚 Next Steps:
1. Check your IDE rules file for available commands
2. Try: Ask your AI CLI to create a simple "Hello World" app
3. Or: Use @dev (in IDE) to create a component

🔧 MCP Tools (Global): browser, context7, exa, desktop-commander, clickup
   Add more anytime: 1mcp mcp add <toolname>

📖 Documentation: https://github.com/your-org/aios-fullstack
💬 Support: https://discord.gg/aios-fullstack
════════════════════════════════════════════════════════════════
```

---

## 🎨 Updated Features Breakdown

### IDEs Supported (STEP 3)

**Tier 1 (Full Integration):**

1. **Cursor** - AI-native code editor, most popular
   - Based on VS Code
   - Native AI features
   - Rules file: `.cursor/rules.md`

2. **Windsurf** - Agentic coding with Cascade
   - Codeium's IDE
   - Agent-first approach
   - Rules file: `.windsurf/rules.md`

3. **Zed** - Fast, lightweight, collaborative
   - Rust-based performance
   - Collaborative editing
   - Rules file: `.zed/aios-rules.md`

**Tier 2 (Community Support):**

4. **Void** - Open-source AI code editor
   - Open-source alternative
   - Extensible
   - Rules file: `.void/aios.md`

5. **Continue.dev** - Open-source Copilot alternative
   - VS Code extension
   - Multiple LLM support
   - Rules file: `.continue/config.json`

6. **Cline** - VS Code extension for code assistant
   - Terminal-style in VS Code
   - Chat interface
   - Rules file: `.vscode/cline.json`

7. **Replit** - Browser-based IDE with AI
   - Cloud-hosted
   - Instant deployment
   - Rules file: `.replit` config

8. **OpenCode** - Fully open-source alternative
   - Open-source
   - Self-hosted
   - Rules file: `.opencode/aios.yaml`

---

### AI CLI Tools (STEP 4 - NEW SECTION)

**Terminal-based AI Coding Assistants:**

1. **Claude Code** (Anthropic) - RECOMMENDED
   - Terminal-native
   - Best for reasoning
   - Install: `npm install -g @anthropic-ai/claude-code`
   - Usage: `claude`

2. **Codex CLI** (OpenAI)
   - Fast code generation
   - Patch-based editing
   - Install: `npm install -g @openai/codex`
   - Usage: `codex`

3. **Gemini CLI** (Google)
   - Large context window
   - Multi-modal support
   - Install: `npm install -g gemini-cli`
   - Usage: `gemini`

4. **Codebuff**
   - Context-aware assistant
   - Knowledge files
   - Install: `npm install -g codebuff`
   - Usage: `codebuff`

5. **Aider**
   - Git-first approach
   - Works with local models
   - Install: `pip install aider-install && aider-install`
   - Usage: `aider`

6. **OpenCode CLI**
   - Open-source
   - Provider-agnostic
   - Install: `npm install -g @sst/opencode`
   - Usage: `opencode`

**Key Difference from IDEs:**
- CLIs run in terminal (not GUI)
- Can be used WITH any IDE
- Great for automation scripts
- Often more powerful for multi-file operations

---

### MCP Tools (STEP 5 - GLOBAL CONFIG)

**CRITICAL CHANGE: ONE-TIME GLOBAL SETUP**

**Installation Location:**
- **Windows:** `C:\Users\<username>\.aios\1mcp\`
- **Mac/Linux:** `~/.aios/1mcp/`

**How It Works:**
1. First AIOS project: Install MCPs globally
2. Subsequent projects: Detect existing config, skip installation
3. Add new MCPs anytime: `1mcp mcp add <toolname>`
4. Projects link to global config via symlink

**Available MCPs:**

1. **Browser** (playwright)
   - Web automation, screenshots, form filling
   - Command: `1mcp mcp add browser`

2. **Context7**
   - Library documentation, API reference
   - Command: `1mcp mcp add context7`

3. **Exa**
   - Web search, research, content discovery
   - Command: `1mcp mcp add exa`

4. **Desktop Commander**
   - File operations, process management, system commands
   - Command: `1mcp mcp add desktop-commander`

5. **ClickUp**
   - Task management, workspace operations
   - Command: `1mcp mcp add clickup`

6. **Docker**
   - Container management, image operations
   - Command: `1mcp mcp add docker`

7. **Portainer**
   - Stack management, service monitoring
   - Command: `1mcp mcp add portainer`

8. **Magic Patterns**
   - UI component generation, design patterns
   - Command: `1mcp mcp add magic-patterns`

9. **Google Workspace**
   - Docs, Sheets, Slides, Gmail integration
   - Command: `1mcp mcp add google-workspace`

10. **Supabase**
    - Database migrations, edge functions, auth config
    - Command: `1mcp mcp add supabase`

11. **GitHub**
    - Repository operations, PRs, issues
    - Command: `1mcp mcp add github`

12. **n8n**
    - Workflow automation, API integrations
    - Command: `1mcp mcp add n8n`

**"All tools" Option:**
- Installs all 12 MCPs at once
- Recommended for complete setup
- Takes ~2-3 minutes

**Story Reference:**
- Epic 6.2 stories (6.2.1 - 6.2.4) detail 1MCP system
- 85% token reduction proven (280K → 40K tokens)
- Documentation extraction from `.claude/CLAUDE.md`

---

### System CLI Tools (STEP 6 - UPDATED)

**Complete System (Recommended):**
- All tools installed for full development capability

**Custom Selection:**

1. **GitHub CLI (gh)** - EXISTING
   - Repository operations, PR management, issues
   - Install: `winget install GitHub.cli` (Windows)
   - Verify: `gh --version`

2. **Supabase CLI** - EXISTING
   - Database migrations, edge functions, auth config
   - Install: `npm install -g supabase`
   - Verify: `supabase --version`

3. **Railway CLI** - EXISTING
   - Deployments, service management, env vars
   - Install: `npm install -g railway`
   - Verify: `railway --version`

4. **psql** - NEW (CRITICAL for DB work)
   - PostgreSQL client (required for Supabase local dev)
   - Install: Via PostgreSQL installer
   - Verify: `psql --version`

5. **Docker CLI** - NEW (CRITICAL)
   - Container management (required for many workflows)
   - Install: Docker Desktop
   - Verify: `docker --version`

6. **Node.js & npm** - REQUIRED (AUTO-CHECK)
   - Always verified
   - Auto-installed if missing (via nvm or installer)
   - Minimum version: Node 18.x

**Dependency Detection:**
- Installer checks which tools are already installed
- Only suggests installing missing ones
- Provides manual install instructions if auto-install fails

---

### Expansion Packs (STEP 7 - UPDATED)

**Open-Source Packs (Available):**

1. **expansion-creator**
   - Create custom expansion packs
   - Template for new packs
   - Documentation generator

2. **data-engineering**
   - ETL workflows
   - Data pipelines
   - Schema validation

**Not in Open-Source:**
- **UX-design pack** → Features internalized in `ux-design-expert` agent
- **DevOps pack** → Not included (service offering only)
- **Other packs** → See `docs/standards/OPEN-SOURCE-VS-SERVICE-DIFFERENCES.md`

**Reference:** 
- `docs/standards/OPEN-SOURCE-VS-SERVICE-DIFFERENCES.md` explains what's in open-source vs. service
- `docs/standards/AIOS-FRAMEWORK-MASTER.md` explains overall structure

---

## 📊 Stories Required for Implementation

### Sprint 1 (Fix Installer)

**BMAD-003: Fix broken installer**
- Fix Windows bugs
- Fix git ignore rules
- Add validation
- Cross-platform testing
- **NEW:** Add global MCP detection logic
- **NEW:** Add CLI dependency checking

### Sprint 2 (Foundation + MCP System)

**BMAD-001: Create manifest system**
- As originally planned

**BMAD-002: Simplify core-config.yaml**
- As originally planned

**BMAD-004: Add version tracking**
- As originally planned

**NEW: Epic 6.2 Integration (1MCP System)**
- **Story 6.2.1:** Extract 1MCP documentation
- **Story 6.2.2:** Create MCP installation guide
- **Story 6.2.3:** Test global MCP config
- **Story 6.2.4:** Update existing documentation

**Effort:** 2 weeks + 1 week (Epic 6.2) = 3 weeks total

### Sprint 3 (Enhanced Features)

**BMAD-010: Enhanced installer wizard**
- Add progress bar
- Add time estimation
- **NEW:** Add global MCP detection UI
- **NEW:** Add CLI dependency checker UI

**BMAD-011: Rollback mechanism**
- As originally planned

---

## 🎯 Technical Implementation Notes

### Global MCP Config Detection (NEW)

**Logic:**
```javascript
// Check for global MCP config
const globalMcpPath = path.join(os.homedir(), '.aios', '1mcp');
const hasMcpConfig = fs.existsSync(path.join(globalMcpPath, 'config.json'));

if (hasMcpConfig) {
  // Read existing config
  const config = require(path.join(globalMcpPath, 'config.json'));
  const installedMcps = config.servers || [];
  
  console.log(`✓ Found MCP config with ${installedMcps.length} tools`);
  
  // Ask if user wants to add more
  const { addMore } = await inquirer.prompt({
    type: 'confirm',
    name: 'addMore',
    message: 'Your MCP tools are up to date! Install additional tools?',
    default: false
  });
  
  if (!addMore) {
    // Skip MCP installation, just link to project
    createSymlink(globalMcpPath, path.join(projectRoot, '.aios-core/tools/mcp'));
    return;
  }
}

// If no config or user wants more, show MCP selection
```

**Symlink Creation:**
```javascript
// Link global MCP to project
const globalMcpPath = path.join(os.homedir(), '.aios', '1mcp');
const projectMcpPath = path.join(projectRoot, '.aios-core/tools/mcp');

// Create symlink (cross-platform)
if (process.platform === 'win32') {
  // Windows: Use junction
  execSync(`mklink /J "${projectMcpPath}" "${globalMcpPath}"`);
} else {
  // Mac/Linux: Use symlink
  fs.symlinkSync(globalMcpPath, projectMcpPath, 'dir');
}
```

---

### CLI Dependency Checking (NEW)

**Logic:**
```javascript
const requiredClis = ['node', 'npm']; // Always required
const optionalClis = ['gh', 'supabase', 'railway', 'psql', 'docker'];

// Check which CLIs are installed
const installedClis = {};
for (const cli of [...requiredClis, ...optionalClis]) {
  try {
    execSync(`${cli} --version`, { stdio: 'ignore' });
    installedClis[cli] = true;
  } catch {
    installedClis[cli] = false;
  }
}

// Show results
console.log('🔍 Checking installed CLI tools...');
for (const [cli, installed] of Object.entries(installedClis)) {
  if (requiredClis.includes(cli) && !installed) {
    console.log(`✗ ${cli} not found (REQUIRED)`);
  } else if (installed) {
    console.log(`✓ ${cli} installed`);
  } else {
    console.log(`○ ${cli} not found (optional)`);
  }
}

// Offer to install missing required tools
const missingRequired = requiredClis.filter(cli => !installedClis[cli]);
if (missingRequired.length > 0) {
  console.error('❌ Missing required tools:', missingRequired.join(', '));
  process.exit(1);
}

// Offer to install missing optional tools
const missingOptional = optionalClis.filter(cli => !installedClis[cli]);
if (missingOptional.length > 0) {
  const { installMissing } = await inquirer.prompt({
    type: 'confirm',
    name: 'installMissing',
    message: `Install missing tools? (${missingOptional.join(', ')})`,
    default: true
  });
  
  if (installMissing) {
    // Auto-install via npm or provide instructions
    for (const cli of missingOptional) {
      installCli(cli); // Function to handle each CLI
    }
  }
}
```

---

## ✅ Updated Acceptance Criteria

### Sprint 1 (BMAD-003)

- [x] ✅ Fix Windows bugs
- [x] ✅ Fix git ignore rules
- [x] ✅ Add validation
- [x] ✅ Cross-platform testing
- [ ] ⏸️ **NEW:** Global MCP detection logic
- [ ] ⏸️ **NEW:** CLI dependency checking
- [ ] ⏸️ **NEW:** Updated IDE list (8 IDEs)
- [ ] ⏸️ **NEW:** AI CLI tools selection (separate step)

### Sprint 2 (BMAD-001, 002, 004 + Epic 6.2)

- [ ] ⏸️ BMAD-001: Manifest system
- [ ] ⏸️ BMAD-002: Simplified config
- [ ] ⏸️ BMAD-004: Version tracking
- [ ] ⏸️ **NEW:** Epic 6.2 integration (1MCP documentation + testing)
- [ ] ⏸️ **NEW:** Global MCP config system
- [ ] ⏸️ **NEW:** Project-level symlink to global MCPs

### Sprint 3 (BMAD-010, 011)

- [ ] ⏸️ BMAD-010: Enhanced wizard
- [ ] ⏸️ BMAD-011: Rollback mechanism
- [ ] ⏸️ **NEW:** Global MCP detection UI
- [ ] ⏸️ **NEW:** CLI dependency checker UI

---

## 📄 Next Steps

1. ✅ Continue interview (Decisão 2 de 10)
2. ⏸️ Create stories for NEW features (global MCP, CLI checking, updated IDE list)
3. ⏸️ River (SM) drafts updated stories
4. ⏸️ Pax (PO) validates acceptance criteria

---

**Document Status:** ✅ UPDATED with Research  
**Changes:** 8 IDEs, 6 AI CLIs, Global MCP config, CLI dependency checking, Expansion packs clarification  
**Next:** Continue interview (Decisão 2)  


