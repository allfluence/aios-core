# Story 6.1.13: Organizer-Worker Pattern Implementation

**Story ID:** STORY-6.1.13
**Epic:** Epic-6.1 - Agent Identity System
**Wave:** Wave 1 (Foundation)
**Status:** 📋 Ready to Start
**Priority:** 🔴 Critical
**Owner:** Dev (Dex) + Architect (Aria) + AIOS-Master (Orion)
**Created:** 2025-01-17
**Duration:** 2-3 weeks
**Investment:** $1,300-$2,100
**Story Points:** 13-21 SP
**Dependencies:** Story 6.1.12 (Fork/Join Workflow Operations) - REQUIRED

---

## 📖 Story

**As a** AIOS orchestrator,
**I want** to coordinate multiple agents using the Organizer-Worker pattern,
**so that** we can distribute work intelligently across agents and enable dynamic multi-agent coordination without manual intervention.

---

## 📋 Objective

Implement the Organizer-Worker pattern to enable intelligent work distribution and coordination across multiple agents. This extends the Fork/Join capabilities with an organizer agent that can distribute work, coordinate workers, and merge results using configurable strategies.

---

## 🤖 CodeRabbit Integration

### Story Type Analysis
- **Primary Type:** Architecture (multi-agent coordination, work distribution)
- **Secondary Type(s):** Performance (load balancing, efficient resource utilization)
- **Complexity:** High (coordination logic, agent role extension, state management)

### Specialized Agent Assignment

**Primary Agents:**
- **@dev (Dex):** Organizer coordinator implementation, agent role extension
- **@architect (Aria):** Coordination pattern design, architecture validation
- **@aios-master (Orion):** Organizer agent role implementation

**Supporting Agents:**
- **@qa (Quinn):** Multi-agent coordination testing, load balancing validation
- **@po (Pax):** Workflow syntax validation, documentation review

### Quality Gate Tasks

- [ ] **Pre-Commit (@dev):** After organizer-coordinator.js core implementation
  - Basic coordination works (round_robin strategy)
  - Agent role extension implemented
  - Unit tests for coordinator pass
  
- [ ] **Mid-Point Review (@architect + @qa):** After workflow integration
  - Organizer-Worker workflows execute correctly
  - Work distribution works (round_robin)
  - Integration tests pass
  
- [ ] **Pre-PR (@dev + @qa):** Before marking story complete
  - All distribution strategies implemented (round_robin, load_balanced, skill_based)
  - Multi-agent coordination robust (handles failures gracefully)
  - Performance benchmarks meet targets
  - Documentation complete

### CodeRabbit Focus Areas

**Primary Focus:**
- **Agent Role Extension:** Proper organizer/worker role distinction
  - Agent definitions support `role: organizer` or `role: worker`
  - Backward compatibility (existing agents default to worker)
  - Role validation works correctly
  
- **Coordination Logic:** Robust work distribution and result collection
  - Work distributed correctly (no duplicates, no missed items)
  - Results collected and merged properly
  - Failure handling (worker failures don't crash organizer)

**Secondary Focus:**
- **Performance:** Efficient resource utilization
  - Load balancing works (even distribution)
  - Skill-based distribution optimizes agent assignments
  - Coordination overhead minimal (<5% of total execution time)

---

## 🎯 Scope

### Core Deliverables

1. **Organizer Coordinator** (`.aios-core/core/organizer-coordinator.js`)
   - Work distribution (round_robin, load_balanced, skill_based)
   - Worker coordination and result collection
   - Integration with workflow-execution-engine.js
   - Error handling and recovery

2. **Agent Role Extension** (`.aios-core/agents/*.md`)
   - Add `role` field to agent definitions
   - Support `role: organizer` for aios-master
   - Support `role: worker` for all other agents (default)
   - Backward compatibility (existing agents work unchanged)

3. **Agent Config Loader Extension** (`.aios-core/scripts/agent-config-loader.js`)
   - Parse `role` field from agent definitions
   - Validate organizer capabilities
   - Support worker assignment to organizer

4. **Workflow Format Extension** (`.aios-core/workflows/*.yaml`)
   - Organizer syntax: `organizer: {agent-id}`
   - Workers syntax: `workers: [agent-id1, agent-id2, ...]`
   - Organizer actions: `organizer_action: distribute_work`, `collect_results`
   - Distribution strategies: `round_robin`, `load_balanced`, `skill_based`

5. **Workflow Execution Engine Integration**
   - Integrate organizer-coordinator with workflow-execution-engine
   - Support Organizer-Worker workflows using Fork/Join internally
   - Handle organizer actions (distribute, collect, merge)

6. **Documentation Updates**
   - `docs/framework/workflow-execution-guide.md` (add Organizer-Worker section)
   - `docs/framework/source-tree.md` (update with organizer-coordinator.js)
   - `docs/aios-nomenclature-specification.md` (update with Organizer-Worker pattern)

7. **Example Workflow** (`.aios-core/workflows/organizer-coordinated-workflow.yaml`)
   - Demonstrates Organizer-Worker usage
   - Shows all distribution strategies
   - Includes error handling examples

---

## 📊 Tasks Breakdown

### Phase 1: Agent Role Extension (Week 1, Days 1-3)

**Day 1: Agent Definition Extension**
- [ ] **Task 1.1:** Extend agent definitions with role field
  - [ ] 1.1.1: Add `role` field to agent template
  - [ ] 1.1.2: Update aios-master.md with `role: organizer`
  - [ ] 1.1.3: Update all other agents with `role: worker` (default)
  - [ ] 1.1.4: Add `capabilities` field for organizer agents
  - [ ] 1.1.5: Add `workers` field for organizer agents
  - [ ] 1.1.6: Validate backward compatibility (existing agents work)

**Day 2: Agent Config Loader Extension**
- [ ] **Task 1.2:** Extend agent-config-loader.js
  - [ ] 1.2.1: Parse `role` field from agent definitions
  - [ ] 1.2.2: Validate organizer capabilities
  - [ ] 1.2.3: Support worker assignment to organizer
  - [ ] 1.2.4: Default to `role: worker` if not specified (backward compatibility)
  - [ ] 1.2.5: Unit tests for role parsing

**Day 3: Role Validation**
- [ ] **Task 1.3:** Create role validator
  - [ ] 1.3.1: Validate organizer has required capabilities
  - [ ] 1.3.2: Validate workers exist and are valid agents
  - [ ] 1.3.3: Check for circular dependencies
  - [ ] 1.3.4: Unit tests for validation

### Phase 2: Organizer Coordinator Core (Week 1-2, Days 4-7)

**Day 4-5: Basic Coordination**
- [ ] **Task 2.1:** Create organizer-coordinator.js base class
  - [ ] 2.1.1: Implement `coordinateWorkers()` method
  - [ ] 2.1.2: Implement `distributeWork()` with round_robin strategy
  - [ ] 2.1.3: Implement `collectResults()` method
  - [ ] 2.1.4: Implement `mergeWorkerResults()` method
  - [ ] 2.1.5: Unit tests for basic coordination

**Day 6-7: Workflow Integration**
- [ ] **Task 2.2:** Integrate with workflow-execution-engine
  - [ ] 2.2.1: Parse organizer and workers from workflow YAML
  - [ ] 2.2.2: Execute organizer actions (distribute_work, collect_results)
  - [ ] 2.2.3: Use Fork/Join internally for worker task execution
  - [ ] 2.2.4: Handle organizer workflow state
  - [ ] 2.2.5: Integration tests with workflow execution

### Phase 3: Advanced Distribution Strategies (Week 2, Days 8-10)

**Day 8: Load Balanced Strategy**
- [ ] **Task 3.1:** Implement load_balanced distribution
  - [ ] 3.1.1: Track worker load (active tasks per worker)
  - [ ] 3.1.2: Distribute work to least loaded worker
  - [ ] 3.1.3: Update load tracking as tasks complete
  - [ ] 3.1.4: Unit tests for load balancing

**Day 9: Skill Based Strategy**
- [ ] **Task 3.2:** Implement skill_based distribution
  - [ ] 3.2.1: Define agent skills (from agent capabilities)
  - [ ] 3.2.2: Match work items to agent skills
  - [ ] 3.2.3: Distribute work to best-matched agent
  - [ ] 3.2.4: Fallback to round_robin if no skill match
  - [ ] 3.2.5: Unit tests for skill-based distribution

**Day 10: Error Handling and Recovery**
- [ ] **Task 3.3:** Enhanced error handling
  - [ ] 3.3.1: Handle worker failures gracefully
  - [ ] 3.3.2: Retry failed work items (configurable)
  - [ ] 3.3.3: Partial results collection (if some workers fail)
  - [ ] 3.3.4: Error reporting (which worker failed, why)
  - [ ] 3.3.5: Unit tests for error scenarios

### Phase 4: Workflow Format and Documentation (Week 3, Days 11-13)

**Day 11: Workflow Format Extension**
- [ ] **Task 4.1:** Extend workflow YAML for Organizer-Worker
  - [ ] 4.1.1: Add `organizer` field to workflow
  - [ ] 4.1.2: Add `workers` field to workflow
  - [ ] 4.1.3: Add `organizer_action` syntax
  - [ ] 4.1.4: Add `worker_tasks` syntax
  - [ ] 4.1.5: Update YAML validator for Organizer-Worker syntax

**Day 12: Example Workflow and Testing**
- [ ] **Task 4.2:** Create example workflow
  - [ ] 4.2.1: Create `organizer-coordinated-workflow.yaml`
  - [ ] 4.2.2: Demonstrate all distribution strategies
  - [ ] 4.2.3: Include error handling examples
  - [ ] 4.2.4: End-to-end integration test

**Day 13: Documentation**
- [ ] **Task 4.3:** Create documentation
  - [ ] 4.3.1: Update `docs/framework/workflow-execution-guide.md`
  - [ ] 4.3.2: Update `docs/framework/source-tree.md`
  - [ ] 4.3.3: Update `docs/aios-nomenclature-specification.md`
  - [ ] 4.3.4: Create Organizer-Worker pattern guide

---

## ✅ Acceptance Criteria

- [ ] **AC1:** Agent role extension works (organizer/worker distinction)
- [ ] **AC2:** Organizer coordinator distributes work correctly (all strategies)
- [ ] **AC3:** Worker results collected and merged properly
- [ ] **AC4:** Organizer-Worker workflows execute using Fork/Join internally
- [ ] **AC5:** All distribution strategies implemented (round_robin, load_balanced, skill_based)
- [ ] **AC6:** Error handling robust (worker failures handled gracefully)
- [ ] **AC7:** Backward compatibility maintained (existing workflows work unchanged)
- [ ] **AC8:** YAML validator validates Organizer-Worker syntax
- [ ] **AC9:** Example workflow demonstrates all features
- [ ] **AC10:** Documentation complete and reviewed

---

## 📝 Dev Notes

### Architecture Reference

**Source:** `.ai/aios-architect-asyncthink-impact-analysis.md` (Architect Analysis)

**Key Architectural Decisions:**
1. **Dependency:** Story 6.1.13 REQUIRES Story 6.1.12 (Fork/Join is prerequisite)
2. **Role Extension:** Agents default to `role: worker` (backward compatible)
3. **Coordination:** Organizer uses Fork/Join internally for worker execution
4. **Distribution:** Start with round_robin, add advanced strategies incrementally

### Implementation Details

**Organizer Coordinator Structure:**
```javascript
class OrganizerCoordinator {
  // Coordinate workers
  async coordinateWorkers(organizerAgent, workers, task) { ... }
  
  // Distribute work
  async distributeWork(organizerAgent, workers, workItems, strategy) { ... }
  
  // Collect results
  async collectResults(workerResults) { ... }
  
  // Merge results
  async mergeWorkerResults(results) { ... }
}
```

**Workflow Format Extension:**
```yaml
workflow:
  id: organizer-coordinated-workflow
  version: 2.0
  
  organizer: aios-master
  workers: [dev, qa, architect]
  
  sequence:
    - organizer_action: distribute_work
      strategy: round_robin  # or load_balanced, skill_based
      work_items: ${story_list}
    
    - worker_tasks:
        - agent: dev
          task: develop-story
        - agent: qa
          task: prepare-tests
        - agent: architect
          task: review-architecture
    
    - organizer_action: collect_results
      merge_strategy: all_complete
```

### Dependencies

**Required:**
- Story 6.1.12 (Fork/Join Workflow Operations) - REQUIRED PREREQUISITE
- Story 6.1.11 (AIOS-Master Meta-Agent Tasks) - Provides organizer agent foundation

**Blocks:**
- Story 1.10 Enhancement (Agent Lightning Integration) - Can use Organizer-Worker for optimization

### Testing Standards

**Test File Location:** `tests/integration/organizer-coordinator.test.js`

**Test Coverage Requirements:**
- Unit tests: 80%+ coverage for organizer-coordinator.js
- Integration tests: All distribution strategies tested
- E2E tests: Example workflow end-to-end

**Testing Frameworks:**
- Jest for unit tests
- Custom integration test framework for multi-agent coordination

---

## 📊 Performance Targets

**Baseline:** Sequential agent execution (from Story 6.1.7.3)

**Targets:**
- **Coordination Overhead:** <5% of total execution time
- **Load Balancing:** Even distribution (±10% variance)
- **Skill Matching:** 80%+ work items matched to optimal agent

**Measurement:**
- Execute example workflow 10 times (sequential vs Organizer-Worker)
- Compare coordination overhead
- Document performance improvement

---

## 🔄 Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-01-17 | 1.0 | Story created based on Architect analysis | Pax (PO) |

---

## 📎 Related Documents

- `.ai/aios-architect-asyncthink-impact-analysis.md` - Architect analysis and recommendations
- `.ai/aios-asyncthink-strategic-deep-analysis.md` - PO strategic analysis
- `docs/aios-nomenclature-specification.md` - Workflow vs Task Workflow definitions
- `docs/framework/source-tree.md` - Framework structure (needs update)

---

**Status:** 📋 Ready to Start  
**Next Action:** Wait for Story 6.1.12 completion, then assign to Dev (Dex) and Architect (Aria)

