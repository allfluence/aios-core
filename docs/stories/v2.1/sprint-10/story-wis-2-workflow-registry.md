# Story WIS-2: Workflow Registry Enhancement

<!-- Source: Epic WIS - Workflow Intelligence System -->
<!-- Context: Enhance workflow patterns with transitions and confidence scoring -->
<!-- Created: 2025-12-23 by @sm (River) -->

## Status: Done ✅

**Priority:** 🟡 MEDIUM
**Sprint:** 10
**Effort:** 8-10h (Actual: 3h)
**Lead:** @dev (Dex)
**Approved by:** @po (Pax) - 2025-12-24
**Blocked By:** WIS-1 (Complete ✅)
**Completed:** 2025-12-24

---

## Story

**As an** AIOS framework developer,
**I want** all 10 workflows to have complete transition definitions with confidence scoring,
**So that** the `*next` task can suggest accurate next steps for any workflow state.

---

## Background

WIS-1 investigation revealed:
- Only `story_development` workflow has transitions defined
- 9 other workflows lack transition definitions
- WorkflowNavigator prototype exists but lacks confidence scoring
- 75% of infrastructure already exists

This story enhances `workflow-patterns.yaml` with complete transitions and implements the confidence scoring algorithm.

### Prerequisites (from WIS-1)

| Component | Status | Location |
|-----------|--------|----------|
| workflow-patterns.yaml | EXISTS | `.aios-core/data/workflow-patterns.yaml` |
| WorkflowNavigator | EXISTS | `.aios-core/development/scripts/workflow-navigator.js` |
| ContextDetector | EXISTS | `.aios-core/core/session/context-detector.js` |
| ADR-WIS-001 | Complete | `docs/architecture/adr/adr-wis-architecture.md` |

---

## 🤖 CodeRabbit Integration

### Story Type Analysis

**Primary Type**: Implementation
**Secondary Type(s)**: Data Enhancement, Algorithm Implementation
**Complexity**: Low-Medium

### Specialized Agent Assignment

**Primary Agents**:
- @dev (Dex): Implement confidence scorer and enhance workflow patterns

**Supporting Agents**:
- @architect (Aria): Verify implementation matches ADR-WIS-001
- @qa (Quinn): Validate transitions coverage and scoring accuracy

### Quality Gate Tasks

- [x] Pre-Commit (@dev): Verify confidence scoring implementation
  - **Pass criteria:** Algorithm matches ADR spec, all tests pass, scoring factors documented
  - **Fail criteria:** Missing scoring factors, incorrect weights, no tests
- [x] Pre-PR (@architect): Confirm ADR compliance
  - **Pass criteria:** Directory structure matches, interfaces aligned, pattern followed
  - **Fail criteria:** Deviation from ADR without documented reason

### Self-Healing Configuration

**Mode:** light (Primary Agent: @dev)
**Max Iterations:** 2
**Time Limit:** 15 minutes
**Severity Threshold:** CRITICAL only

| Severity | Auto-Fix | Behavior |
|----------|----------|----------|
| CRITICAL | Yes | Block merge, auto-fix if possible |
| HIGH | No | Report only |
| MEDIUM | No | Report only |
| LOW | No | Ignore |

### Focus Areas

- Confidence scoring algorithm accuracy
- Workflow transition completeness
- YAML schema validation
- Cache implementation correctness

---

## Acceptance Criteria

### AC 2.1: Enhanced Workflow Transitions

- [x] All 10 workflows have transition definitions
- [x] Each transition includes:
  - `trigger`: Command or condition that triggers the transition
  - `confidence`: Base confidence score (0.0-1.0)
  - `next_steps`: Array of suggested commands with descriptions
- [x] Transitions cover primary happy path for each workflow
- [x] At least 2-3 states per workflow

**Workflows to Enhance:**

| Workflow | States to Add |
|----------|---------------|
| epic_creation | epic_drafted, stories_created, validated |
| backlog_management | reviewed, prioritized, scheduled |
| architecture_review | analyzed, documented, approved |
| git_workflow | staged, committed, pushed |
| database_workflow | designed, migrated, validated |
| code_quality_workflow | assessed, refactored, tested |
| documentation_workflow | drafted, reviewed, published |
| ux_workflow | designed, implemented, validated |
| research_workflow | researched, analyzed, documented |

### AC 2.2: Confidence Scoring Implementation

- [x] Create `confidence-scorer.js` in `.aios-core/workflow-intelligence/engine/`
- [x] Implement weighted scoring algorithm:
  - Command match: 40%
  - Agent match: 25%
  - History depth: 20%
  - Project state: 15%
- [x] Expose `score(suggestion, context)` method
- [x] Return normalized score (0.0-1.0)

**Algorithm:**
```javascript
score(suggestion, context) {
  const commandMatch = this.matchCommand(suggestion.trigger, context.lastCommand);
  const agentMatch = this.matchAgent(suggestion.agentSequence, context.agentId);
  const historyDepth = this.matchHistory(suggestion.keyCommands, context.lastCommands);
  const projectState = this.matchProjectState(suggestion, context.projectState);

  return (
    commandMatch * 0.40 +
    agentMatch * 0.25 +
    historyDepth * 0.20 +
    projectState * 0.15
  );
}
```

### AC 2.3: Workflow Registry Module

- [x] Create `.aios-core/workflow-intelligence/` directory structure
- [x] Implement `workflow-registry.js` with:
  - `loadWorkflows()`: Load and cache patterns (5-minute TTL)
  - `matchWorkflow(commands)`: Find workflow matching command history
  - `getTransitions(workflowName, state)`: Get available transitions
- [x] Ensure backward compatibility with existing WorkflowNavigator

### AC 2.4: Testing

- [x] Unit tests for ConfidenceScorer
- [x] Unit tests for WorkflowRegistry
- [x] Integration test: context → workflow match → scored suggestions
- [x] All existing tests pass

---

## Testing

**Test Location:** `.aios-core/workflow-intelligence/__tests__/`
**Framework:** Jest

### Test Scenarios

| Scenario | Input | Expected Output | Priority |
|----------|-------|-----------------|----------|
| Confidence scoring - exact command match | `{ trigger: "create-epic", lastCommand: "create-epic" }` | Score ≥ 0.90 | HIGH |
| Confidence scoring - partial match | `{ trigger: "create-epic", lastCommand: "create-story" }` | Score 0.40-0.60 | HIGH |
| Confidence scoring - no match | `{ trigger: "create-epic", lastCommand: "push" }` | Score ≤ 0.20 | MEDIUM |
| Workflow registry - load patterns | Call `loadWorkflows()` | Returns 10 workflows | HIGH |
| Workflow registry - caching | Call `loadWorkflows()` twice | Second call uses cache | MEDIUM |
| Workflow registry - match workflow | `{ commands: ["create-epic", "create-story"] }` | Returns `epic_creation` | HIGH |
| Transition lookup | `getTransitions("epic_creation", "epic_drafted")` | Returns next_steps array | HIGH |
| Invalid workflow | `getTransitions("invalid", "state")` | Returns empty array | LOW |

### Test Files

| File | Purpose |
|------|---------|
| `confidence-scorer.test.js` | Unit tests for scoring algorithm |
| `workflow-registry.test.js` | Unit tests for registry loading and matching |
| `integration.test.js` | End-to-end context → suggestions flow |

### Coverage Target

- **Minimum:** 80%
- **Target:** 90%

---

## Technical Design

### Directory Structure (from ADR-WIS-001)

```
.aios-core/
├── workflow-intelligence/           # NEW
│   ├── registry/
│   │   └── workflow-registry.js     # Enhanced registry loader
│   ├── engine/
│   │   └── confidence-scorer.js     # NEW - Confidence scoring
│   └── index.js                     # WIS public API
│
├── data/
│   └── workflow-patterns.yaml       # ENHANCED with transitions
```

### Enhanced Schema Example

```yaml
# workflow-patterns.yaml
workflows:
  epic_creation:
    description: "Epic lifecycle from concept to story breakdown"
    agent_sequence: [po, sm, architect]
    key_commands:
      - create-epic
      - create-story
    trigger_threshold: 1

    transitions:
      epic_drafted:
        trigger: "create-epic completed"
        confidence: 0.90
        next_steps:
          - command: analyze-epic
            args_template: "${epic_path}"
            description: "Analyze epic for completeness"
            priority: 1
          - command: create-story
            args_template: "${epic_path}"
            description: "Create first story from epic"
            priority: 2

      stories_created:
        trigger: "create-story completed"
        confidence: 0.85
        next_steps:
          - command: validate-story-draft
            args_template: "${story_path}"
            description: "Validate story structure"
            priority: 1
```

---

## Dependencies

### Blocked By
- **WIS-1:** Investigation & Design (Complete ✅)

### Blocks
- **WIS-3:** `*next` Task Universal (needs registry and scoring)
- **WIS-4:** Wave Analysis Engine (needs registry)

---

## Success Criteria

1. All 10 workflows have at least 2-3 transition states
2. Confidence scorer returns scores matching test cases
3. WorkflowRegistry loads patterns with caching
4. Existing greeting-builder functionality unaffected
5. All tests pass

---

## File List

| File | Status | Description |
|------|--------|-------------|
| `docs/stories/v2.1/sprint-10/story-wis-2-workflow-registry.md` | ✅ Complete | This story |
| `.aios-core/data/workflow-patterns.yaml` | ✅ Modified | Added transitions to all 10 workflows |
| `.aios-core/workflow-intelligence/registry/workflow-registry.js` | ✅ Created | Registry loader with caching |
| `.aios-core/workflow-intelligence/engine/confidence-scorer.js` | ✅ Created | Weighted scoring algorithm |
| `.aios-core/workflow-intelligence/index.js` | ✅ Created | Public API |
| `.aios-core/workflow-intelligence/__tests__/confidence-scorer.test.js` | ✅ Created | 40 unit tests |
| `.aios-core/workflow-intelligence/__tests__/workflow-registry.test.js` | ✅ Created | 42 unit tests |
| `.aios-core/workflow-intelligence/__tests__/integration.test.js` | ✅ Created | 55 integration tests |
| `jest.config.js` | ✅ Modified | Added .aios-core test pattern |

---

## QA Results

**Reviewed by:** @qa (Quinn)
**Date:** 2025-12-24
**Decision:** ✅ PASS

### Requirements Traceability

| AC | Status | Verification |
|----|--------|--------------|
| 2.1 | ✅ | All 10 workflows have transitions with trigger/confidence/next_steps |
| 2.2 | ✅ | Weighted scoring (40/25/20/15) implemented, normalized 0.0-1.0 |
| 2.3 | ✅ | Registry with 5-min TTL cache, matchWorkflow, getTransitions |
| 2.4 | ✅ | 137 tests passing (40 scorer + 42 registry + 55 integration) |

### Test Summary

| Metric | Value |
|--------|-------|
| Test Suites | 3 passed |
| Tests | 137 passed |
| Coverage | 95.66% |
| Execution | 0.629s |

### Code Quality

- **Architecture**: Clean separation (registry/, engine/, index.js)
- **Documentation**: Comprehensive JSDoc on all exports
- **Error Handling**: Null checks on all public methods
- **Extensibility**: Factory functions and custom weights support

### Recommendation

Ready for commit and merge. Implementation fully satisfies all acceptance criteria.

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-23 | @sm (River) | Initial draft from MVP scope |
| 1.1 | 2025-12-24 | @po (Pax) | PO Validation: APPROVED - Adjusted effort 6h→8-10h, added Testing section with 8 scenarios, expanded File List with test files |
| 1.2 | 2025-12-24 | @dev (Dex) | Implementation complete: All 10 workflows have transitions, confidence-scorer.js, workflow-registry.js, index.js, 137 tests passing (95.66% coverage) |
| 1.3 | 2025-12-24 | @qa (Quinn) | QA Review: PASSED - All ACs verified, 137 tests passing, code quality excellent |
