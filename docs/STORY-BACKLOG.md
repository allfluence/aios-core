# Story Backlog

Centralized tracking for follow-up tasks, technical debt, and optimization opportunities identified during story reviews, development, and QA processes.

## Statistics

- **Total Items**: 12
- **Active Items**: 10 (2 promoted to stories)
- **Promoted to Stories**: 2
- **Completed Items**: 0
- **Last Updated**: 2025-11-16

## Backlog Items by Priority

### 🔴 HIGH Priority

#### [story-6.1.2.6-T1] Add unit tests for decision-log-generator
- **Source**: Legacy Backlog Migration
- **Priority**: 🔴 HIGH
- **Effort**: 2 hours
- **Status**: ✅ PROMOTED TO STORY
- **Story Created**: [story-6.1.2.6.1](aios migration/story-6.1.2.6.1-add-unit-tests-decision-log-generator.md)
- **Assignee**: Backend Developer
- **Sprint**: Sprint 2
- **Tags**: `testing`, `decision-logging`
- **Description**: Create comprehensive unit tests for the decision-log-generator utility to ensure reliability and catch regressions early. This utility is used in yolo mode development for autonomous decision tracking.
- **Success Criteria**:
  - [ ] Test decision log initialization
  - [ ] Test decision recording with all metadata
  - [ ] Test file modifications tracking
  - [ ] Test metrics collection
  - [ ] Test log file generation and formatting
- **Acceptance**: All tests pass with >80% code coverage for decision-log-generator module

---

#### [story-6.1.2.6-F1] Complete decision log automation infrastructure
- **Source**: Story 6.1.2.6 Scan (AC2 Partial)
- **Priority**: 🔴 HIGH
- **Effort**: 4 hours
- **Status**: ✅ PROMOTED TO STORY
- **Story Created**: [story-6.1.2.6.2](aios migration/story-6.1.2.6.2-complete-decision-log-automation.md)
- **Assignee**: Backend Developer
- **Sprint**: Sprint 2
- **Tags**: `automation`, `decision-logging`, `infrastructure`
- **Description**: Complete the decision log automation feature. Infrastructure is ready but generator implementation was deferred. This enables automatic tracking of architectural decisions and technical choices made during development.
- **Success Criteria**:
  - [ ] Implement decision log generator
  - [ ] Integrate with yolo mode development workflow
  - [ ] Test decision capture across multiple development scenarios
  - [ ] Document usage in developer guide
  - [ ] Validate log format adheres to ADR standards
- **Acceptance**: Decision logs are automatically generated during development with complete metadata

---

---

### 🟡 MEDIUM Priority

#### [story-6.1.2.5-F1] Update remaining 9 agents with command visibility metadata
- **Source**: Story 6.1.2.5 Scan (Future Improvements)
- **Priority**: 🟡 MEDIUM
- **Effort**: 6 hours
- **Status**: 📋 TODO
- **Assignee**: Framework Developer
- **Sprint**: Sprint 2
- **Tags**: `agent-config`, `command-visibility`, `phase-2`
- **Description**: Phase 2 rollout of command visibility metadata to remaining 9 agents. 2 agents were updated in Story 6.1.2.5, but 9 more need the visibility metadata to support contextual command display.
- **Success Criteria**:
  - [ ] Audit all agent files to identify missing visibility metadata
  - [ ] Add visibility: [full, quick, key] to each command
  - [ ] Test contextual greeting with updated agents
  - [ ] Validate command filtering works correctly
  - [ ] Update agent config documentation
- **Acceptance**: All 11 agents have complete command visibility metadata and contextual greetings work

---

#### [story-6.1.2.6-F2] Complete story index and backlog formalization
- **Source**: Story 6.1.2.6 Scan (AC3 Partial)
- **Priority**: 🟡 MEDIUM
- **Effort**: 3 hours
- **Status**: 📋 TODO
- **Assignee**: Product Owner
- **Sprint**: Sprint 2
- **Tags**: `documentation`, `backlog`, `story-index`
- **Description**: Complete the story index and backlog formalization feature that was partially implemented in Story 6.1.2.6. Infrastructure exists but full implementation was deferred.
- **Success Criteria**:
  - [ ] Verify story index script works across all epics
  - [ ] Test backlog manager with all item types (F, T, O)
  - [ ] Add completion percentage calculation per epic
  - [ ] Update documentation with usage examples
  - [ ] Integration test with ClickUp sync
- **Acceptance**: Story index and backlog tools are production-ready and documented

---

### 🟢 LOW Priority

#### [story-6.1.2.5-O1] Add custom command visibility categories
- **Source**: Story 6.1.2.5 Scan (Nice to Have)
- **Priority**: 🟢 LOW
- **Effort**: 4 hours
- **Status**: 💡 IDEA
- **Assignee**: Framework Developer
- **Sprint**: Unscheduled
- **Tags**: `enhancement`, `command-visibility`, `customization`
- **Description**: Extend command visibility system beyond [full, quick, key] to support custom categories. This would allow teams to define their own command groupings based on workflow or expertise level.
- **Success Criteria**:
  - [ ] Design custom category schema
  - [ ] Update command visibility parser
  - [ ] Add category configuration to core-config.yaml
  - [ ] Test with custom categories
  - [ ] Update documentation
- **Acceptance**: Teams can define and use custom command visibility categories

---

#### [story-6.1.2.5-O2] Add user-specific workflow pattern overrides
- **Source**: Story 6.1.2.5 Scan (Nice to Have)
- **Priority**: 🟢 LOW
- **Effort**: 5 hours
- **Status**: 💡 IDEA
- **Assignee**: Framework Developer
- **Sprint**: Unscheduled
- **Tags**: `enhancement`, `workflow`, `customization`
- **Description**: Allow users to override default workflow patterns with their own custom patterns. This enables personalized workflow suggestions based on individual preferences.
- **Success Criteria**:
  - [ ] Design user-specific pattern override system
  - [ ] Create user config file format (.aios/user-workflows.yaml)
  - [ ] Implement pattern merge logic (user patterns override defaults)
  - [ ] Add validation for custom patterns
  - [ ] Test pattern priority system
- **Acceptance**: Users can define custom workflow patterns that override defaults

---

#### [story-6.1.2.5-O3] Implement dynamic workflow learning
- **Source**: Story 6.1.2.5 Scan (Nice to Have + Future Improvements)
- **Priority**: 🟢 LOW
- **Effort**: 12 hours
- **Status**: 💡 IDEA
- **Assignee**: ML Engineer / Framework Developer
- **Sprint**: Unscheduled
- **Tags**: `enhancement`, `ml`, `workflow`, `learning`
- **Description**: Context detection that learns from user behavior over time. System observes command patterns and suggests optimizations based on historical usage.
- **Success Criteria**:
  - [ ] Design learning algorithm (simple pattern matching or ML-based)
  - [ ] Implement usage tracking system
  - [ ] Create pattern detection engine
  - [ ] Build suggestion refinement logic
  - [ ] Privacy considerations for usage data
  - [ ] User opt-in/opt-out mechanism
- **Acceptance**: System suggests workflow improvements based on observed command patterns

---

#### [story-6.1.2.6-O1] Add visual dashboard for performance metrics
- **Source**: Story 6.1.2.6 Scan (Nice to Have)
- **Priority**: 🟢 LOW
- **Effort**: 8 hours
- **Status**: 💡 IDEA
- **Assignee**: Frontend Developer
- **Sprint**: Unscheduled
- **Tags**: `enhancement`, `performance`, `visualization`, `dashboard`
- **Description**: Create visual dashboard to display agent load times, cache hit rates, and other performance metrics tracked by performance-tracker.js.
- **Success Criteria**:
  - [ ] Design dashboard UI (web-based or terminal-based)
  - [ ] Integrate with performance-tracker.js metrics
  - [ ] Add real-time metric updates
  - [ ] Include historical trend graphs
  - [ ] Export metrics to CSV/JSON
- **Acceptance**: Performance metrics are visually accessible via dashboard

---

#### [story-6.1.2.6-O2] Add hot reload for config changes
- **Source**: Story 6.1.2.6 Scan (Nice to Have)
- **Priority**: 🟢 LOW
- **Effort**: 6 hours
- **Status**: 💡 IDEA
- **Assignee**: Framework Developer
- **Sprint**: Unscheduled
- **Tags**: `enhancement`, `dx`, `config`, `hot-reload`
- **Description**: Enable hot reload for core-config.yaml changes without restarting Claude Code. This improves developer experience during framework configuration.
- **Success Criteria**:
  - [ ] Implement file watcher for core-config.yaml
  - [ ] Add config reload mechanism
  - [ ] Invalidate affected caches on reload
  - [ ] Add reload confirmation message
  - [ ] Handle reload errors gracefully
- **Acceptance**: Config changes take effect without restarting Claude Code

---

#### [story-6.1.4-O1] Add greeting preview command
- **Source**: Story 6.1.4 Scan (Nice to Have)
- **Priority**: 🟢 LOW
- **Effort**: 2 hours
- **Status**: 💡 IDEA
- **Assignee**: Framework Developer
- **Sprint**: Unscheduled
- **Tags**: `enhancement`, `dx`, `greeting`, `preview`
- **Description**: Add CLI command to preview agent greetings with different preference settings before applying them.
- **Success Criteria**:
  - [ ] Implement `aios config preview greeting <preference>` command
  - [ ] Show greeting for all preference levels
  - [ ] Display comparison view
  - [ ] Add agent selection option
- **Acceptance**: Users can preview greetings before changing preference

---

#### [story-6.1.4-O2] Add preference history tracking
- **Source**: Story 6.1.4 Scan (Nice to Have)
- **Priority**: 🟢 LOW
- **Effort**: 3 hours
- **Status**: 💡 IDEA
- **Assignee**: Framework Developer
- **Sprint**: Unscheduled
- **Tags**: `enhancement`, `analytics`, `preferences`
- **Description**: Track user preference changes over time to understand usage patterns and provide rollback capability.
- **Success Criteria**:
  - [ ] Create preference history log
  - [ ] Track changes with timestamps
  - [ ] Add `aios config history` command
  - [ ] Implement rollback to previous preference
  - [ ] Add analytics on preference trends
- **Acceptance**: Preference change history is tracked and accessible

---

## Item Status Legend

- 📋 **TODO**: Not started
- 🚧 **IN PROGRESS**: Currently being worked on
- ⏸️ **BLOCKED**: Waiting on dependency
- ✅ **DONE**: Completed and verified
- 💡 **IDEA**: Proposed but not yet approved
- ❌ **CANCELLED**: Decided not to implement

## How to Add Items

Use the following commands from respective agents:

**QA Agent (@qa)**:
```bash
*backlog-add {story-id} {type} {priority} {title}
# Example: *backlog-add STORY-013 F HIGH "Install Jest+ESM transformer"
```

**Dev Agent (@dev)**:
```bash
*backlog-debt {title}
# Automatically adds technical debt with priority prompt
```

**PO Agent (@po)**:
```bash
*backlog-review              # Generate sprint planning review
*backlog-summary             # Quick status summary
*backlog-prioritize {item}   # Re-prioritize item
*backlog-schedule {item}     # Assign to sprint
```

## Item Types

- **F** = Follow-up (from QA reviews, incomplete work)
- **O** = Optimization (performance, refactoring opportunities)
- **T** = Technical Debt (shortcuts taken, missing tests, etc.)

---

*Backlog initialized: 2025-11-16*
*Story Backlog Management - Story 6.1.2.6*
