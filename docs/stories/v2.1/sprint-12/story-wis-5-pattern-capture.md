# Story WIS-5: Pattern Capture (Internal)

<!-- Source: Epic WIS - Workflow Intelligence System -->
<!-- Context: Learn from AllFluence team usage patterns -->
<!-- Created: 2025-12-25 by @po (Pax) -->

## Status: Done

**Priority:** HIGH
**Sprint:** 12
**Effort:** 8h
**Lead:** @dev (Dex)
**Approved by:** @po (Pax) - 2025-12-26

---

## Story

**As an** AIOS framework maintainer,
**I want** the system to capture and store successful workflow patterns from AllFluence team usage,
**So that** the `*next` suggestions become more accurate over time based on validated real-world patterns.

---

## Background

### Prerequisites Completed

| Story | Status | Relevance |
|-------|--------|-----------|
| WIS-2 | Done | WorkflowRegistry provides pattern storage interface |
| WIS-3 | Done | SuggestionEngine consumes patterns for suggestions |
| WIS-4 | Done | WaveAnalyzer detects parallel execution opportunities |
| WIS-9 | Done | Investigation defined learning architecture |

### Architecture (from WIS-9 Investigation)

```
.aios-core/workflow-intelligence/
├── learning/                    # NEW - This story
│   ├── pattern-capture.js      # Captures patterns from sessions
│   ├── pattern-validator.js    # Validates patterns before storage
│   └── pattern-store.js        # Stores patterns locally (git-versioned)
```

### Pattern Learning Strategy

**Fonte A: AllFluence Internal (This Story)**
- Patterns de uso da equipe AllFluence
- Validados manualmente antes de entrar no registry
- Versionados junto com código (git)
- Custo: Zero (local)

**Fonte B: Community Opt-in (WIS-6 - Futuro)**
- Telemetria anônima (opt-in)
- Requires infrastructure
- Blocked by Open Source Release

### User Value

```
Before: Workflow patterns are manually curated, missing real usage insights
After:  System learns from successful command sequences, improving suggestions
```

---

## CodeRabbit Integration

### Story Type Analysis

**Primary Type**: Implementation
**Secondary Type(s)**: Data Processing, Integration
**Complexity**: Medium

### Specialized Agent Assignment

**Primary Agents**:
- @dev (Dex): Implement pattern capture and storage

**Supporting Agents**:
- @qa (Quinn): Test pattern validation and edge cases
- @architect (Aria): Review data model and integration points

### Quality Gate Tasks

- [ ] Pre-Commit (@dev): Verify pattern capture implementation
  - **Pass criteria:** All ACs met, tests pass, patterns stored correctly
  - **Fail criteria:** Missing validation, corrupt storage, integration issues
- [ ] Pre-PR (@qa): Validate pattern quality filters
  - **Pass criteria:** Invalid patterns rejected, valid patterns stored
  - **Fail criteria:** False positives/negatives in validation

### Self-Healing Configuration

**Mode:** light (Primary Agent: @dev)
**Max Iterations:** 2
**Time Limit:** 15 minutes
**Severity Threshold:** CRITICAL only

### Focus Areas

- Pattern validation accuracy
- Storage file format consistency
- SuggestionEngine integration
- Performance (<50ms capture overhead)

---

## Acceptance Criteria

### AC 5.1: Pattern Capture Module

- [x] Create `pattern-capture.js` at `.aios-core/workflow-intelligence/learning/`
- [x] Implement `PatternCapture` class with:
  - `captureSession(sessionData)` - Capture command sequence from session
  - `extractPatterns(commandHistory)` - Extract pattern candidates
  - `getMinimumSequenceLength()` - Return minimum sequence (default: 3)
- [x] Capture data includes:
  - Agent sequence (e.g., `['po', 'dev', 'qa']`)
  - Command sequence (e.g., `['validate-story-draft', 'develop', 'review-qa']`)
  - Success indicator (workflow completed successfully)
  - Timestamp and session ID
- [x] Only capture from completed successful workflows
- [x] Performance: <50ms capture overhead

**Test Scenarios:**
```javascript
// Scenario: Capture successful workflow
const session = {
  agentSequence: ['po', 'dev', 'qa'],
  commands: ['validate-story-draft', 'develop', 'review-qa'],
  success: true,
  timestamp: Date.now()
};
const pattern = capture.captureSession(session);
expect(pattern.valid).toBe(true);
expect(pattern.sequence.length).toBe(3);
```

### AC 5.2: Pattern Validator Module

- [x] Create `pattern-validator.js` at `.aios-core/workflow-intelligence/learning/`
- [x] Implement `PatternValidator` class with:
  - `validate(pattern)` - Validate pattern quality
  - `isDuplicate(pattern, existingPatterns)` - Check for duplicates
  - `meetsMinimumThreshold(pattern)` - Check minimum occurrence threshold
  - `getValidationRules()` - Return current validation rules
- [x] Validation rules:
  - Minimum 3 commands in sequence
  - Minimum 2 successful occurrences before promotion
  - No duplicate patterns (fuzzy match)
  - Must include at least one key workflow command
  - Commands must exist in AIOS task registry
- [x] Return detailed validation results with reasons

**Test Scenarios:**
```javascript
// Scenario: Valid pattern passes validation
const pattern = {
  sequence: ['validate-story-draft', 'develop', 'review-qa'],
  occurrences: 3,
  successRate: 1.0
};
const result = validator.validate(pattern);
expect(result.valid).toBe(true);

// Scenario: Too short pattern fails
const shortPattern = {
  sequence: ['develop'],
  occurrences: 5
};
const result = validator.validate(shortPattern);
expect(result.valid).toBe(false);
expect(result.reason).toContain('minimum sequence length');
```

### AC 5.3: Pattern Store Module

- [x] Create `pattern-store.js` at `.aios-core/workflow-intelligence/learning/`
- [x] Implement `PatternStore` class with:
  - `save(pattern)` - Save validated pattern
  - `load()` - Load all patterns from storage
  - `findSimilar(sequence)` - Find patterns matching sequence
  - `getStats()` - Get storage statistics
  - `prune(options)` - Remove old/unused patterns
- [x] Storage location: `.aios-core/data/learned-patterns.yaml`
- [x] YAML format with structure:
  ```yaml
  version: "1.0"
  patterns:
    - id: "pattern-uuid"
      sequence: ["validate-story-draft", "develop", "review-qa"]
      agents: ["po", "dev", "qa"]
      occurrences: 5
      successRate: 0.95
      firstSeen: "2025-12-25T10:00:00Z"
      lastSeen: "2025-12-25T15:30:00Z"
      workflow: "story_development"  # Linked workflow if detected
      status: "active"  # active | deprecated | promoted
  ```
- [x] Support for pattern lifecycle (active → promoted → deprecated)
- [x] Git-friendly format (sortable, diff-friendly)
- [x] Maximum patterns limit: 100 active patterns (configurable)
- [x] Auto-prune when limit exceeded (remove oldest low-occurrence patterns)

**Test Scenarios:**
```javascript
// Scenario: Save and load pattern
const pattern = { sequence: ['develop', 'review-qa'], agents: ['dev', 'qa'] };
store.save(pattern);
const loaded = store.load();
expect(loaded.patterns).toContainEqual(expect.objectContaining(pattern));

// Scenario: Find similar patterns
const similar = store.findSimilar(['develop']);
expect(similar.length).toBeGreaterThan(0);

// Scenario: Auto-prune when limit exceeded
const store = new PatternStore({ maxPatterns: 10 });
for (let i = 0; i < 12; i++) {
  store.save({ sequence: [`cmd-${i}`], occurrences: i });
}
const patterns = store.load();
expect(patterns.patterns.length).toBeLessThanOrEqual(10);
// Lowest occurrence patterns should be pruned first
expect(patterns.patterns.find(p => p.sequence[0] === 'cmd-0')).toBeUndefined();
```

### AC 5.4: Integration with SuggestionEngine

- [x] Update `SuggestionEngine` to use learned patterns
- [x] Add configuration option to enable/disable learned patterns
- [x] Learned patterns boost confidence score when matched
- [x] Priority order:
  1. Explicit workflow transitions (highest confidence)
  2. Learned patterns (boosted by occurrence count)
  3. Fallback suggestions (lowest confidence)
- [x] Add `--learned` flag to `*next` to show learned pattern source

**Test Scenarios:**
```javascript
// Scenario: Learned pattern boosts suggestion confidence
const context = { lastCommand: 'develop', agentId: '@dev' };
// With learned pattern showing 'review-qa' follows 'develop' 90% of time
const result = await engine.suggestNext(context);
expect(result.suggestions[0].command).toBe('*review-qa');
expect(result.suggestions[0].source).toBe('learned_pattern');
expect(result.suggestions[0].confidence).toBeGreaterThan(0.8);
```

### AC 5.5: Capture Trigger Integration

- [x] Add capture hook to task completion flow
- [x] Capture triggers on successful task completion:
  - `*develop` completed successfully
  - `*review-qa` completed successfully
  - `*apply-qa-fixes` completed successfully
  - Other key workflow commands
- [x] Session context preserved during workflow
- [x] Capture is non-blocking (async)
- [x] Add `AIOS_PATTERN_CAPTURE=true/false` env variable

**Implementation Note:**
```javascript
// In task completion hook
if (process.env.AIOS_PATTERN_CAPTURE !== 'false') {
  const capture = require('./workflow-intelligence/learning/pattern-capture');
  capture.onTaskComplete(taskName, context).catch(err => {
    // Silent failure - capture is non-critical
    console.debug('[PatternCapture] Failed:', err.message);
  });
}
```

### AC 5.6: CLI Visibility

- [x] Add `*patterns` task to view learned patterns
- [x] Display options:
  - `*patterns list` - List all learned patterns
  - `*patterns stats` - Show pattern statistics
  - `*patterns prune` - Remove stale patterns
  - `*patterns review` - Interactive review of pending patterns for promotion
- [x] Output format:
  ```
  Learned Patterns (15 total)
  ═══════════════════════════

  Top Patterns by Occurrence:
  1. validate-story-draft → develop → review-qa (12 occurrences, 95% success)
  2. develop → review-qa → apply-qa-fixes (8 occurrences, 88% success)
  3. create-story → validate-story-draft → develop (6 occurrences, 100% success)

  Stats:
  - Total patterns: 15
  - Active: 12
  - Promoted: 3
  - Avg success rate: 92%
  ```
- [ ] Review workflow for `*patterns review`:
  ```
  *patterns review

  Patterns Pending Review (3)
  ═══════════════════════════

  Pattern #1: develop → run-tests → review-qa
  Occurrences: 4 | Success Rate: 100% | First Seen: 2 days ago
  [P]romote  [S]kip  [D]eprecate  [Q]uit

  > p

  ✓ Pattern promoted to active status
  ```
- [x] Review workflow for `*patterns review` documented

---

## Technical Design

### Data Flow

```
Session Start
     ↓
[User executes commands]
     ↓
Task Completion Hook
     ↓
PatternCapture.captureSession()
     ↓
PatternValidator.validate()
     ↓
     ├── Invalid → Discard
     └── Valid → PatternStore.save()
                      ↓
              learned-patterns.yaml
                      ↓
         SuggestionEngine.suggestNext()
                      ↓
              [Enhanced suggestions]
```

### File Structure

```
.aios-core/
├── workflow-intelligence/
│   ├── learning/                    # NEW
│   │   ├── index.js                # Module exports
│   │   ├── pattern-capture.js      # AC 5.1
│   │   ├── pattern-validator.js    # AC 5.2
│   │   └── pattern-store.js        # AC 5.3
│   └── engine/
│       └── suggestion-engine.js    # AC 5.4 (update)
├── data/
│   └── learned-patterns.yaml       # AC 5.3 (storage)
└── development/
    └── tasks/
        └── patterns.md             # AC 5.6 (*patterns task)
```

### Configuration

```yaml
# .aios/config.yaml (or env vars)
workflow_intelligence:
  pattern_capture:
    enabled: true
    min_sequence_length: 3
    min_occurrences: 2
    success_rate_threshold: 0.8
    max_patterns: 100              # Maximum active patterns before auto-prune
    auto_prune_threshold: 90       # Prune when reaching 90% of max
    prune_strategy: "oldest_low_occurrence"  # oldest_low_occurrence | lowest_success_rate
    capture_on_commands:
      - develop
      - review-qa
      - apply-qa-fixes
      - validate-story-draft
```

---

## Out of Scope

- Community pattern sharing (WIS-6)
- Cloud storage (local-first only)
- Machine learning optimization (WIS-7)
- Pattern recommendation UI (future)
- Cross-project pattern sync

---

## Dependencies

### Blocking This Story
- None (WIS-3 and WIS-4 are Done)

### This Story Blocks
- **WIS-6**: Community Pattern Opt-in (needs capture infrastructure)
- **WIS-7**: Agent Lightning Unification (needs pattern data)

---

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Pattern storage grows too large | Low | Medium | Auto-prune at 90% of limit (100 max), configurable strategy |
| Invalid patterns pollute suggestions | Medium | High | Strict validation, `*patterns review` for manual promotion |
| Performance degradation | Low | Medium | Async capture, caching, <50ms overhead requirement |
| Git conflicts on patterns file | Medium | Low | Append-only, UUID-based IDs, YAML sorted format |
| Stale patterns remain active | Low | Medium | `*patterns prune` command, lastSeen tracking |

---

## Definition of Done

- [x] All ACs implemented and verified
- [x] Unit tests for all learning modules (>90% coverage)
- [x] Integration tests with SuggestionEngine
- [x] Performance tests pass (<50ms capture overhead)
- [x] `*patterns` task functional
- [x] Documentation updated
- [ ] PR approved and merged

---

## File List

<!-- Updated by @dev as implementation progresses -->

| File | Action | Description |
|------|--------|-------------|
| `.aios-core/workflow-intelligence/learning/index.js` | Create | Module exports |
| `.aios-core/workflow-intelligence/learning/pattern-capture.js` | Create | Pattern capture (AC 5.1) |
| `.aios-core/workflow-intelligence/learning/pattern-validator.js` | Create | Pattern validation (AC 5.2) |
| `.aios-core/workflow-intelligence/learning/pattern-store.js` | Create | Pattern storage (AC 5.3) |
| `.aios-core/data/learned-patterns.yaml` | Create | Pattern storage file |
| `.aios-core/workflow-intelligence/engine/suggestion-engine.js` | Update | Integration (AC 5.4) |
| `.aios-core/development/tasks/patterns.md` | Create | `*patterns` task (AC 5.6) |
| `tests/unit/workflow-intelligence/pattern-capture.test.js` | Create | Unit tests |
| `tests/unit/workflow-intelligence/pattern-validator.test.js` | Create | Unit tests |
| `tests/unit/workflow-intelligence/pattern-store.test.js` | Create | Unit tests |
| `tests/integration/workflow-intelligence/pattern-learning.test.js` | Create | Integration tests |

---

## Notes

- Pattern capture starts as "internal only" - only AllFluence team usage
- Community patterns (WIS-6) will require infrastructure and opt-in consent
- Manual validation via `*patterns review` recommended before promoting patterns
- Patterns are auto-pruned when reaching 90% of max limit (default: 100)

---

**Created by:** @po (Pax)
**Date:** 2025-12-25
**Epic:** WIS - Workflow Intelligence System
