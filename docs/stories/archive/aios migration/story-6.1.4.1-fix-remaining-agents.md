# Story 6.1.4.1: Fix Remaining Agent YAML Issues (DRAFT)

**Story ID:** 6.1.4.1  
**Epic:** Epic-6.1 - Agent Identity System  
**Wave:** Wave 1 (Foundation) - Optional  
**Status:** ✅ Approved (Architect Validated)  
**Priority:** 🟡 Low  
**Owner:** Dev (Dex)  
**Created:** 2025-01-18  
**Duration:** 1 hour  
**Investment:** $12.50

---

## 📋 Objective

Fix YAML syntax errors in the 2 remaining agents (ux-design-expert, test-agent) to complete 100% migration to the unified greeting system.

**Context:** Story 6.1.4 achieved 83.3% functional coverage (10/12 agents). This optional story completes the remaining 2 agents that have YAML parsing issues preventing them from using the unified greeting system.

---

## 🎯 Story

**As a** AIOS framework maintainer,  
**I want** all agents to use the unified greeting system without YAML parsing errors,  
**So that** we achieve 100% functional coverage and consistent user experience across all agents.

**Business Value:**
- Completes agent migration to unified greeting system
- Ensures consistent experience across all agents
- Resolves technical debt from Story 6.1.4
- Low effort, high completion value

---

## 🔗 Context

### Current Status

**From Story 6.1.4 Analysis:**
- ✅ 10/12 functional agents successfully migrated (83.3%)
- ⚠️ 2 agents have YAML syntax errors preventing migration:
  1. **ux-design-expert** - Union type syntax (`"value" | "value"`) not supported in YAML
  2. **test-agent** - Possible YAML block closure issues

### Identified Issues

**Issue 1: ux-design-expert.md**
- **Error:** `Unexpected block-scalar-header at node end` at lines 326, 329, 330, 331
- **Root Cause:** TypeScript-style union types (`"AA" | "AAA"`) not valid YAML syntax
- **Lines Affected:**
  - Line 326: `wcag_level: "AA" | "AAA"`
  - Line 329: `current_phase: "research" | "audit" | "tokenize" | "build" | "quality"`
  - Line 330: `workflow_type: "greenfield" | "brownfield" | "complete"`

**Issue 2: test-agent.md**
- **Error:** `No YAML block found in test-agent.md`
- **Root Cause:** Possible YAML block closure or structure issue
- **Investigation Needed:** Verify YAML block format and closure

---

## 📋 Tasks Breakdown

### Task 1: Fix ux-design-expert YAML Syntax (30 minutes)

**Objective:** Replace TypeScript union types with YAML-compatible format

**Implementation:**

1. **Replace union types with comments:**
   ```yaml
   # Before (invalid):
   wcag_level: "AA" | "AAA"
   current_phase: "research" | "audit" | "tokenize" | "build" | "quality"
   workflow_type: "greenfield" | "brownfield" | "complete"
   
   # After (valid):
   wcag_level: "AA" # or "AAA"
   current_phase: "research" # Options: research, audit, tokenize, build, quality
   workflow_type: "greenfield" # Options: greenfield, brownfield, complete
   ```

2. **Alternative approach (if values need validation):**
   ```yaml
   # Use YAML list format:
   wcag_level_options: ["AA", "AAA"]
   wcag_level: "AA" # Default, must be one of wcag_level_options
   ```

3. **Test fix:**
   ```bash
   node .aios-core/scripts/generate-greeting.js ux-design-expert
   ```

**Validation:**
- ✅ YAML parses without errors
- ✅ Agent greeting generates successfully
- ✅ No functionality lost

---

### Task 2: Fix test-agent YAML Structure (15 minutes)

**Objective:** Verify and fix YAML block structure

**Implementation:**

1. **Verify YAML block format:**
   ```bash
   # Check YAML block exists and is properly closed
   grep -A 5 "```ya?ml" .aios-core/agents/test-agent.md
   grep -B 5 "```" .aios-core/agents/test-agent.md | tail -10
   ```

2. **Fix if needed:**
   - Ensure YAML block starts with ````yaml`
   - Ensure YAML block ends with ```` ``
   - Verify proper indentation
   - Check for unclosed strings or arrays

3. **Test fix:**
   ```bash
   node .aios-core/scripts/generate-greeting.js test-agent
   ```

**Validation:**
- ✅ YAML block properly formatted
- ✅ Agent greeting generates successfully
- ✅ Agent activates correctly

---

### Task 3: Integration Testing (15 minutes)

**Objective:** Verify both agents work with unified greeting system

**Test Scenarios:**

1. **Test ux-design-expert:**
   ```bash
   # Test greeting generation
   node .aios-core/scripts/generate-greeting.js ux-design-expert
   
   # Expected: Greeting generated without errors
   # Expected: Contains agent name "Uma"
   # Expected: Contains project status
   # Expected: Contains commands list
   ```

2. **Test test-agent:**
   ```bash
   # Test greeting generation
   node .aios-core/scripts/generate-greeting.js test-agent
   
   # Expected: Greeting generated without errors
   # Expected: Contains agent name "Test Agent"
   # Expected: Simple greeting format
   ```

3. **Test agent activation (manual):**
   - Activate ux-design-expert via `/AIOS/agents/ux-design-expert`
   - Activate test-agent via `/AIOS/agents/test-agent`
   - Verify greetings display correctly

**Success Criteria:**
- ✅ Both agents generate greetings without errors
- ✅ Greetings display correctly in IDE
- ✅ No YAML parsing errors in logs
- ✅ 12/12 functional agents updated (100%)

---

## ✅ Acceptance Criteria

### Must Have

- [ ] ux-design-expert YAML syntax fixed (union types replaced)
- [ ] test-agent YAML structure verified and fixed
- [ ] Both agents generate greetings without errors
- [ ] Both agents activate successfully via IDE commands
- [ ] 100% functional agent coverage achieved (12/12)
- [ ] No functionality lost in fixes
- [ ] Integration tests pass

### Should Have

- [ ] YAML validation added to prevent future union type issues
- [ ] Documentation updated with YAML syntax guidelines
- [ ] Test coverage for YAML parsing edge cases

### Nice to Have

- [ ] Automated YAML validation in CI/CD
- [ ] YAML linter configuration

---

## 🤖 CodeRabbit Integration

### Story Type Analysis

**Primary Type:** Infrastructure/Maintenance  
**Secondary Type(s):** Code Quality, Technical Debt  
**Complexity:** Low

### Specialized Agent Assignment

**Primary Agents:**
- @dev: YAML syntax fixes, code quality

**Supporting Agents:**
- @qa: Validation testing, coverage verification

### Quality Gate Tasks

- [ ] **Pre-Commit (@dev):** Run before marking story complete
  - Focus: YAML syntax correctness, no functionality loss
  - Validate: Both agents parse correctly
  - Check: Greeting generation works for both agents

- [ ] **Pre-PR (@dev):** Run before creating pull request
  - Focus: Integration safety, backward compatibility
  - Validate: No breaking changes to agent definitions
  - Check: All 12 agents still activate correctly

### CodeRabbit Focus Areas

**Primary Focus:**
- **YAML Syntax:** Correct YAML formatting, no parsing errors
- **Backward Compatibility:** No breaking changes to agent functionality
- **Error Handling:** Graceful handling of YAML parsing errors

**Specific Patterns to Validate:**

1. **YAML Union Type Pattern:**
   ```yaml
   # ❌ Invalid (TypeScript-style):
   wcag_level: "AA" | "AAA"
   
   # ✅ Valid (YAML-compatible):
   wcag_level: "AA" # or "AAA"
   ```

2. **YAML Block Closure Pattern:**
   ```yaml
   # ✅ Valid YAML block:
   ```yaml
   key: value
   ```
   ```

---

## 📁 Files Modified

### Files to Modify

- `.aios-core/agents/ux-design-expert.md`
  - Fix union type syntax (lines 326, 329, 330, 331)
  - Replace with YAML-compatible format

- `.aios-core/agents/test-agent.md`
  - Verify YAML block structure
  - Fix if closure/formatting issues found

### Files Referenced (No Changes)

- `.aios-core/scripts/generate-greeting.js` (testing)
- `.aios-core/scripts/agent-config-loader.js` (YAML parsing)

---

## 💰 Investment Breakdown

- **Task 1: Fix ux-design-expert:** 30 minutes @ $12.50/hr = $6.25
- **Task 2: Fix test-agent:** 15 minutes @ $12.50/hr = $3.13
- **Task 3: Integration Testing:** 15 minutes @ $12.50/hr = $3.13

**Total:** 1 hour = $12.50

---

## 🎯 Success Metrics

- **Coverage:** 100% functional agent coverage (12/12)
- **Quality:** Zero YAML parsing errors
- **Performance:** Greeting generation <150ms for both agents
- **Compatibility:** No breaking changes

---

## ⚠️ Risks & Mitigation

### Risk 1: Fix breaks agent functionality
- **Likelihood:** Low
- **Impact:** Medium
- **Mitigation:** 
  - Test thoroughly before committing
  - Keep backups of original files
  - Verify all agent features still work

### Risk 2: YAML fix loses type information
- **Likelihood:** Low
- **Impact:** Low
- **Mitigation:**
  - Use comments to document valid values
  - Consider YAML list format for validation

---

## 📝 Implementation Notes

### YAML Syntax Guidelines

**Invalid Patterns (TypeScript-style):**
```yaml
# ❌ Don't use:
value: "option1" | "option2"
type: number | string
status: "active" | "inactive" | "pending"
```

**Valid Patterns (YAML-compatible):**
```yaml
# ✅ Use comments:
value: "option1" # Options: option1, option2

# ✅ Use lists for validation:
valid_options: ["option1", "option2"]
value: "option1" # Must be one of valid_options

# ✅ Use string with documentation:
value: "option1" # Valid values: option1, option2
```

---

## 🔗 Related Documents

- **Epic:** [Epic-6.1](../epics/epic-6.1.md)
- **Prerequisite:** Story 6.1.4 - Unified Greeting System Integration ✅
- **Analysis:** `docs/stories/aios migration/story-6.1.4-agent-coverage-analysis.md`

---

## 📝 Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-01-18 | 1.0 | Initial draft story creation | Pax (po) |

---

**Status:** 📋 Draft (Pending Architect Validation)  
**Next Steps:** Architect review against source-tree.md structure  
**Estimated Start:** After Story 6.1.4 completion (optional)

---

**Created By:** Pax (PO Agent)  
**Date:** 2025-01-18  
**Validation Required:** Architect review for structure compliance

