# Utility Integration Guide

> **EN** | [PT](../pt/architecture/utility-integration-guide.md) | [ES](../es/architecture/utility-integration-guide.md)

---

**Version:** 1.0.0
**Created:** 2025-10-29  
**Authors:** Sarah (@po), Winston (@architect)  
**Purpose:** Define standard patterns for integrating utility scripts into AIOS framework

---

## What is Utility Integration?

**Definition:** Utility integration is the process of making an orphaned utility script **discoverable, documented, and usable** within the AIOS framework.

A utility is considered **fully integrated** when:
1. ✅ **Registered** in core-config.yaml
2. ✅ **Referenced** by at least one agent or task
3. ✅ **Documented** with purpose and usage
4. ✅ **Tested** to ensure it loads without errors
5. ✅ **Discoverable** through framework mechanisms

---

## Integration Patterns

### Pattern 1: Agent Helper Utility

**When to Use:** Utility provides helper functions that agents use directly

**Integration Steps:**
1. Add utility to target agent's `dependencies.utils` array
2. Document utility purpose in agent file
3. Register in core-config.yaml if not already
4. Test that agent loads successfully with utility

**Example: util-batch-creator**

```yaml
# .aios-core/agents/dev.yaml
id: dev
name: Development Agent
dependencies:
  utils:
    - batch-creator  # Creates batches of related tasks
    - code-quality-improver
```

**Files Modified:**
- `.aios-core/agents/{agent}.yaml` (add to dependencies.utils)
- `.aios-core/core-config.yaml` (register if needed)
- `.aios-core/utils/README.md` (document utility)

---

### Pattern 2: Task Execution Utility

**When to Use:** Utility is called by a task during execution

**Integration Steps:**
1. Identify or create task that uses the utility
2. Add utility reference in task's `execution.utils` section
3. Document how task uses the utility
4. Register in core-config.yaml if not already
5. Test task execution with utility

**Example: util-commit-message-generator**

```yaml
# .aios-core/tasks/generate-commit-message.md
id: generate-commit-message
name: Generate Commit Message
execution:
  utils:
    - commit-message-generator  # Main utility for this task
  steps:
    - Analyze staged changes
    - Generate semantic commit message using util
    - Present message to user for approval
```

**Files Modified:**
- `.aios-core/tasks/{task}.md` (add execution.utils)
- `.aios-core/agents/{agent}.yaml` (add task to executes list)
- `.aios-core/core-config.yaml` (register if needed)
- `.aios-core/utils/README.md` (document utility)

---

### Pattern 3: Framework Infrastructure Utility

**When to Use:** Utility is used by the framework itself, not directly by agents/tasks

**Integration Steps:**
1. Register in core-config.yaml under appropriate category
2. Document in utils/README.md as "framework utility"
3. Add to framework documentation
4. Test that utility loads in framework context

**Example: util-elicitation-engine**

```yaml
# .aios-core/core-config.yaml
utils:
  framework:
    - elicitation-engine  # Used by agent creation workflow
    - aios-validator
```

**Files Modified:**
- `.aios-core/core-config.yaml` (register under framework)
- `.aios-core/utils/README.md` (document as framework utility)
- Framework docs (if applicable)

---

### Pattern 4: Documentation/Analysis Utility

**When to Use:** Utility performs analysis or documentation generation

**Integration Steps:**
1. Add to relevant agent's utils (usually architect, qa, or docs agent)
2. Create or update task that uses utility
3. Document analysis/output format
4. Register in core-config.yaml

**Example: util-documentation-synchronizer**

```yaml
# .aios-core/agents/architect.yaml
dependencies:
  utils:
    - documentation-synchronizer  # Keeps docs in sync with code
    - dependency-analyzer
```

**Files Modified:**
- `.aios-core/agents/{agent}.yaml`
- `.aios-core/tasks/{task}.md` (if creating task)
- `.aios-core/core-config.yaml`
- `.aios-core/utils/README.md`

---

## Integration Workflow

### Standard Process (for all patterns):

```
1. ANALYZE
   ├─ Inspect utility code to understand purpose
   ├─ Identify utility category (helper, executor, analyzer, etc.)
   └─ Determine appropriate integration pattern

2. MAP
   ├─ Identify target agent(s) that should use utility
   ├─ Identify or create task(s) that call utility
   └─ Document mapping decision

3. INTEGRATE
   ├─ Add utility reference to agent/task files
   ├─ Register in core-config.yaml (if not already)
   └─ Document in utils/README.md

4. TEST
   ├─ Load utility to verify no errors
   ├─ Load agent to verify dependency resolves
   ├─ Test task execution if applicable
   └─ Run gap detection to verify fix

5. DOCUMENT
   ├─ Add utility description to README
   ├─ Document usage pattern
   ├─ Note which agents/tasks use it
   └─ Update architecture map
```

---

## Utility Categorization

Utilities should be categorized for easier integration:

### Category 1: Code Quality
**Purpose:** Analyze, improve, validate code  
**Pattern:** Agent Helper (dev, qa agents)  
**Examples:** aios-validator, code-quality-improver, coverage-analyzer

### Category 2: Git/Workflow
**Purpose:** Git operations, workflow automation  
**Pattern:** Task Execution (dev, github-devops agents)  
**Examples:** commit-message-generator, branch-manager, conflict-resolver

### Category 3: Component Management
**Purpose:** Generate, manage, search components  
**Pattern:** Agent Helper + Task Execution  
**Examples:** component-generator, component-search, deprecation-manager

### Category 4: Documentation
**Purpose:** Generate, sync, analyze documentation  
**Pattern:** Documentation Utility (architect, docs agents)  
**Examples:** documentation-synchronizer, dependency-impact-analyzer

### Category 5: Batch/Helpers
**Purpose:** Batch operations, framework helpers  
**Pattern:** Varies (Agent Helper or Framework)  
**Examples:** batch-creator, clickup-helpers, elicitation-engine

---

## Testing Requirements

### For Each Integrated Utility:

**1. Load Test**
```javascript
// Verify utility loads without errors
const utility = require('.aios-core/utils/{utility-name}');
// Should not throw
```

**2. Reference Validation**
```bash
# Verify agent/task references are valid
node outputs/architecture-map/schemas/validate-tool-references.js
```

**3. Gap Detection**
```bash
# Verify gap is resolved
node outputs/architecture-map/schemas/detect-gaps.js
# Should show 0 gaps for integrated utility
```

**4. Integration Test** (if applicable)
```javascript
// Verify agent loads with utility dependency
const agent = loadAgent('agent-name');
// Should include utility in resolved dependencies
```

---

## Documentation Requirements

### utils/README.md Entry Template:

```markdown
### util-{name}

**Purpose:** Brief description of what utility does

**Used By:**
- agent-{name} (for {purpose})
- task-{name} (during {phase})

**Integration Pattern:** {pattern-name}

**Location:** `.aios-core/utils/{name}.js`

**Example Usage:**
\`\`\`javascript
const util = require('./utils/{name}');
// Example code
\`\`\`
```

---

## core-config.yaml Registration

### Add utility to appropriate section:

```yaml
utils:
  # Agent helper utilities
  helpers:
    - batch-creator
    - code-quality-improver
    
  # Task execution utilities
  executors:
    - commit-message-generator
    - component-generator
    
  # Framework infrastructure utilities
  framework:
    - elicitation-engine
    - aios-validator
    
  # Analysis/documentation utilities
  analyzers:
    - documentation-synchronizer
    - dependency-analyzer
```

---

## Success Criteria

A utility is successfully integrated when:

✅ **Discoverable:**
- Listed in core-config.yaml
- Documented in utils/README.md
- Referenced by agent/task

✅ **Functional:**
- Loads without errors
- Agent/task can use it
- Tests pass

✅ **Validated:**
- Gap detection shows 0 gaps
- Reference validation passes
- Integration tests pass

✅ **Documented:**
- Purpose clearly stated
- Usage examples provided
- Integration pattern identified

---

## Common Pitfalls

❌ **Don't:** Add utility to agent without understanding its purpose  
✅ **Do:** Inspect code first, understand functionality

❌ **Don't:** Create new task if existing task can use utility  
✅ **Do:** Extend existing tasks when appropriate

❌ **Don't:** Register without documenting  
✅ **Do:** Always add README entry

❌ **Don't:** Skip testing  
✅ **Do:** Verify utility loads and resolves

---

## Quick Reference

| Pattern | Target | Files Modified | Test |
|---------|--------|----------------|------|
| Agent Helper | Agent YAML | agent.yaml, core-config, README | Load agent |
| Task Execution | Task MD + Agent | task.md, agent.yaml, core-config, README | Run task |
| Framework | Framework | core-config, README, docs | Load utility |
| Documentation | Architect/Docs | agent.yaml, core-config, README | Gap detection |

---

**Guide Version:** 1.0.0  
**Last Updated:** 2025-10-29  
**Maintainer:** Winston (@architect)

