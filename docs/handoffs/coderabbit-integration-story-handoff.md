# Handoff: CodeRabbit Integration Investigation & Implementation

> **Created:** 2025-11-28
> **Author:** @architect (Aria)
> **Priority:** HIGH
> **Estimated Effort:** 1-2 days

---

## Context

A comprehensive CodeRabbit documentation suite was created as "source of truth" in `docs/guides/coderabbit/`. During this process, critical questions arose about WHERE and WHEN the CodeRabbit self-healing and workflow integrations should be implemented within the AIOS agent system.

### What Was Completed

1. **Documentation Suite Created:**
   - `docs/guides/coderabbit/README.md` - Index
   - `docs/guides/coderabbit/coderabbit-integration-guide.md` - Main guide
   - `docs/guides/coderabbit/coderabbit-configuration-reference.md` - Config reference
   - `docs/guides/coderabbit/coderabbit-workflows.md` - Workflows
   - `docs/guides/coderabbit/coderabbit-troubleshooting.md` - Troubleshooting

2. **Configuration Created:**
   - `.coderabbit.yaml` - GitHub App configuration (balanced profile)

3. **Old Guides Deprecated:**
   - `CODERABBIT-GUIDE.md` - Added deprecation notice
   - `CODERABBIT-CLI-USAGE-GUIDE.md` - Added deprecation notice

4. **Critical Fix:**
   - Restored `core-config.yaml` from backup to `.aios-core/`

### Current Installation Status

| Component | Status |
|-----------|--------|
| CodeRabbit CLI | Installed in WSL (`~/.local/bin/coderabbit`) |
| Authentication | Configured (`pedro@allfluence.com.br`) |
| GitHub App | Installed on repository |
| `.coderabbit.yaml` | Created (balanced profile) |
| `core-config.yaml` | Restored |

---

## Investigation Required

This story must answer these critical questions:

### 1. Self-Healing Integration Points

**Question:** Where exactly should the self-healing loop be integrated?

**Current Understanding:**
```
@dev *develop → @qa *review → @devops *pre-push → @devops *create-pr
```

**Proposed Approach (Hybrid - needs validation):**
| Agent | Task | Self-Healing | Iterations | Behavior |
|-------|------|--------------|------------|----------|
| @dev | `*develop` | Light | 1-2 | Fix CRITICAL only at story end |
| @qa | `*review` | Full | 3 | Full self-healing loop |
| @devops | `*pre-push` | Check | 0 | Warning only, no auto-fix |

**Tasks:**
- [ ] Review ALL agent definitions in `.aios-core/agents/`
- [ ] Review ALL task definitions in `.aios-core/tasks/`
- [ ] Review ALL workflow definitions in `.aios-core/workflows/`
- [ ] Map every point where CodeRabbit could/should integrate
- [ ] Decide final integration points with rationale

### 2. Severity Handling Configuration

**Question:** How should severity levels affect workflow?

**Proposed:**
```yaml
severity_handling:
  CRITICAL: Block and auto-fix (must resolve)
  HIGH: Warn and ask user (recommend fix)
  MEDIUM: Document as tech debt
  LOW: Ignore (nits)
```

**Tasks:**
- [ ] Validate severity mapping makes sense for AIOS workflows
- [ ] Determine if severity should vary by agent/task
- [ ] Implement severity configuration in agent definitions

### 3. WSL Execution Patterns

**Question:** What are the exact commands for each integration point?

**Known Pattern:**
```bash
wsl bash -c 'cd /mnt/c/Users/AllFluence-User/Workspaces/AIOS/AIOS-V4/aios-fullstack && ~/.local/bin/coderabbit --prompt-only -t uncommitted'
```

**Tasks:**
- [ ] Document exact command for each integration point
- [ ] Test commands work correctly
- [ ] Handle timeout scenarios (reviews can take 7-30 minutes)
- [ ] Define output parsing patterns

### 4. Agent Definition Updates

**Files to Update:**
- `.aios-core/agents/dev.md` - Add self-healing config
- `.aios-core/agents/qa.md` - Add full review workflow
- `.aios-core/agents/devops.md` - Add pre-push check

**Tasks:**
- [ ] Add `coderabbit_integration` section to each agent
- [ ] Define timeouts per agent
- [ ] Configure severity handling per agent

### 5. Task Definition Updates

**Files to Update:**
- `.aios-core/tasks/dev-develop-story.md` - Add light self-healing at end
- `.aios-core/tasks/qa-review-story.md` - Add full self-healing loop
- `.aios-core/tasks/devops-pre-push.md` - Add quality gate check (if exists)

**Tasks:**
- [ ] Add self-healing loop step to dev task
- [ ] Add full self-healing workflow to qa task
- [ ] Create or update devops pre-push task

### 6. core-config.yaml Integration

**Question:** Should CodeRabbit config be centralized in `core-config.yaml`?

**Tasks:**
- [ ] Evaluate if CodeRabbit settings belong in core-config
- [ ] If yes, design the schema
- [ ] Update agent/task references

---

## Deliverables

1. **Investigation Report**
   - Map of all integration points
   - Decision rationale for each point
   - Severity handling strategy

2. **Agent Updates**
   - Updated `dev.md` with self-healing config
   - Updated `qa.md` with review workflow
   - Updated `devops.md` with pre-push check

3. **Task Updates**
   - Updated `dev-develop-story.md`
   - Updated `qa-review-story.md`
   - Created/updated devops pre-push task

4. **Testing**
   - Verify CLI commands work
   - Test self-healing loop (simulated)
   - Document edge cases

---

## Files to Read First

```
# Agent Definitions
.aios-core/agents/dev.md
.aios-core/agents/qa.md
.aios-core/agents/devops.md

# Task Definitions
.aios-core/tasks/dev-develop-story.md
.aios-core/tasks/qa-review-story.md

# Workflow Definitions
.aios-core/workflows/

# Configuration
.aios-core/core-config.yaml
.coderabbit.yaml

# Documentation (Source of Truth)
docs/guides/coderabbit/coderabbit-integration-guide.md
docs/guides/coderabbit/coderabbit-workflows.md
```

---

## Acceptance Criteria

- [ ] All AIOS agent/task/workflow files reviewed for CodeRabbit integration points
- [ ] Decision document created with rationale for each integration point
- [ ] Agent definitions updated with `coderabbit_integration` config
- [ ] Task definitions updated with self-healing steps where appropriate
- [ ] CLI commands tested and working
- [ ] Documentation updated to reflect final implementation

---

## Recommended Approach

1. **Phase 1: Investigation** (30-60 min)
   - Read all agent definitions
   - Read all task definitions
   - Read all workflow definitions
   - Create integration point map

2. **Phase 2: Decision** (15-30 min)
   - Decide self-healing placement
   - Decide severity handling
   - Document rationale

3. **Phase 3: Implementation** (2-4 hours)
   - Update agent definitions
   - Update task definitions
   - Test commands

4. **Phase 4: Validation** (30-60 min)
   - Test self-healing loop manually
   - Verify agent workflows work
   - Update documentation

---

## Notes

- The GitHub App is already installed and functional
- CLI is working in WSL (tested during documentation creation)
- `.coderabbit.yaml` uses "balanced" profile (recommended for initial deployment)
- Consider moving to "assertive" profile for production later

---

**Next Agent:** @dev or @architect
**Next Action:** Create story from this handoff and begin investigation
