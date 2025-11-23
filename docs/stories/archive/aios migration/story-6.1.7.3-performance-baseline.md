# Story 6.1.7.3: Performance Baseline Establishment

**Story ID:** STORY-6.1.7.3
**Epic:** Epic-6.1 - Agent Identity System
**Wave:** Wave 1 (Foundation)
**Status:** 📋 Ready to Start
**Priority:** 🟡 Medium
**Owner:** Dev (Dex) + QA (Quinn)
**Created:** 2025-01-17
**Duration:** 2 days
**Investment:** $200
**Parent Story:** Story 6.1.7 - Core Tasks Migration to V2.0

---

## 📖 Story

**As a** AIOS performance engineer,
**I want** to execute all 114 tasks, capture performance metrics, and populate baseline data,
**so that** we enable performance regression testing and can monitor task efficiency over time.

---

## 📋 Objective

Establish a comprehensive performance baseline for all 114 migrated tasks by executing each task **sequentially** (current execution model), capturing execution metrics (duration, token usage, cost), and populating the performance fields in task files.

**Baseline Scope:**
- **Current Baseline (This Story):** Sequential execution performance (pre-Fork/Join)
- **Future Baseline (Post-Story 6.1.12):** Parallel execution performance (Fork/Join workflows)
- **Optimization Baseline (Post-Story 1.10 Enhancement):** Agent Lightning optimized performance

**Purpose:**
- Enable performance regression testing for sequential execution
- Provide baseline comparison for Agent Lightning optimization (Story 1.10 Enhancement)
- Enable performance monitoring over time
- Support future comparison with parallel execution baseline (after Story 6.1.12)

---

## 🤖 CodeRabbit Integration

### Story Type Analysis
- **Primary Type:** Performance (baseline establishment, metrics collection)
- **Secondary Type(s):** DevOps (automation, monitoring setup)
- **Complexity:** Low-Medium (repetitive but automated, large volume)

### Specialized Agent Assignment

**Primary Agents:**
- **@dev (Dex):** Script development, task execution automation
- **@qa (Quinn):** Metrics validation, baseline verification

**Supporting Agents:**
- **@pm (Morgan):** Cost analysis, ROI calculations

### Quality Gate Tasks

- [ ] **Mid-Point Review (@qa):** After 50% tasks baselined (57 tasks)
  - Metrics collection working correctly
  - Data quality validated (no anomalies)
  - Automation script stable
  
- [ ] **Pre-PR (@qa + @dev):** Before marking story complete
  - All 114 tasks baselined
  - Performance data validated
  - Baseline report generated
  - Regression test framework ready

### CodeRabbit Focus Areas

**Primary Focus:**
- **Data Quality:** Ensure metrics are accurate and consistent
  - Duration captured in milliseconds
  - Token usage captured correctly
  - Cost calculated based on actual pricing
  
- **Automation Quality:** Ensure script is robust
  - Handles errors gracefully
  - Retries transient failures
  - Logs execution details

**Secondary Focus:**
- **Completeness:** All tasks baselined
  - No tasks skipped due to errors
  - All metrics fields populated
  - Confidence levels documented

---

## 🎯 Scope

Execute **114 tasks** and capture **3 metrics per task** (342 data points):

### Metrics to Capture (Per Task)

1. **Duration (ms):** Actual execution time
   - Measured from task start to completion
   - Averaged across 3 executions (median value)
   - Format: `2500ms` (milliseconds)

2. **Token Usage:** Total tokens consumed
   - Input tokens + Output tokens
   - Captured from LLM API response
   - Format: `~1500 tokens`

3. **Cost (USD):** Estimated execution cost
   - Calculated: (tokens ÷ 1M) × price_per_1M_tokens
   - Based on Claude Sonnet 4.5 pricing ($3/1M input, $15/1M output)
   - Format: `$0.0045`

### Task Categories (for batching)

**Batch 1: Core Critical (15 tasks)** - Day 1 Morning
- Highest priority, most-used tasks
- Baseline these first for quick value

**Batch 2: Agent-Specific (50 tasks)** - Day 1 Afternoon + Day 2 Morning
- Agent-specific workflows
- Group by agent for efficiency

**Batch 3: Utility & Support (49 tasks)** - Day 2 Afternoon
- Remaining utility tasks
- Lower priority, batch process

---

## 📊 Tasks Breakdown

### Phase 1: Automation & Batch 1 (Day 1, $100)

**Day 1 Morning: Script Development (4 hours)** - **AC1, AC2**

- [ ] **Task 1.1:** Create performance baseline automation script
  - [ ] 1.1.1: Design script architecture
    - Input: Task file path
    - Process: Execute task 3 times, capture metrics
    - Output: Metrics JSON + updated task file
  - [ ] 1.1.2: Implement execution wrapper
    - Activate agent
    - Execute task with test data
    - Capture duration, tokens, cost
  - [ ] 1.1.3: Implement metrics capture
    - Parse LLM API responses for tokens
    - Calculate duration (start to end time)
    - Calculate cost (tokens × pricing)
  - [ ] 1.1.4: Implement task file updater
    - Read task file
    - Update performance section
    - Preserve TODO markers if content incomplete
  - [ ] 1.1.5: Add error handling and retry logic
  - [ ] 1.1.6: Test script with 3 sample tasks
  - [ ] 1.1.7: Document script usage

**Day 1 Afternoon: Batch 1 Execution (4 hours)** - **AC3**

- [ ] **Task 1.2:** Baseline Batch 1 (15 core critical tasks)
  - [ ] 1.2.1: Prepare test data for each task
  - [ ] 1.2.2: Execute baseline script for all 15 tasks
  - [ ] 1.2.3: Validate metrics captured correctly
  - [ ] 1.2.4: Update task files with baseline data
  - [ ] 1.2.5: Document any anomalies or issues

**Mid-Point Checkpoint:** - **AC4**
- [ ] Automation script working correctly
- [ ] 15/114 tasks baselined (13%)
- [ ] Metrics data validated
- [ ] Issues resolved before Batch 2

---

### Phase 2: Batch 2 & 3 Execution (Day 2, $100)

**Day 2 Morning: Batch 2 Execution (4 hours)** - **AC5**

- [ ] **Task 2.1:** Baseline Batch 2 (50 agent-specific tasks)
  - [ ] 2.1.1: Prepare test data for agent-specific tasks
  - [ ] 2.1.2: Execute baseline script (may take 2-3 hours)
  - [ ] 2.1.3: Monitor execution progress
  - [ ] 2.1.4: Validate metrics for completed tasks
  - [ ] 2.1.5: Update task files with baseline data
  - [ ] 2.1.6: Document anomalies

**Day 2 Afternoon: Batch 3 + Report (4 hours)** - **AC6, AC7**

- [ ] **Task 2.2:** Baseline Batch 3 (49 utility tasks)
  - [ ] 2.2.1: Execute baseline script for remaining tasks
  - [ ] 2.2.2: Validate all metrics captured
  - [ ] 2.2.3: Update all task files
  - [ ] 2.2.4: Resolve any final issues
  
- [ ] **Task 2.3:** Generate baseline report
  - [ ] 2.3.1: Aggregate metrics across all 114 tasks
  - [ ] 2.3.2: Calculate statistics (min/max/median/p95)
  - [ ] 2.3.3: Identify outliers and expensive tasks
  - [ ] 2.3.4: Generate cost analysis (total, per category)
  - [ ] 2.3.5: Create performance comparison charts
  - [ ] 2.3.6: Write comprehensive baseline report
  - [ ] 2.3.7: Design comparison framework for future baselines
    - Sequential vs. Parallel execution comparison structure
    - Baseline vs. Agent Lightning optimized comparison structure
    - Performance improvement tracking methodology

**Final Checkpoint:** - **AC8**
- [ ] All 114 tasks baselined (100%)
- [ ] All metrics validated
- [ ] Baseline report generated
- [ ] Regression test framework ready

---

## ✅ Acceptance Criteria

### Must Have (Blocking)
- [ ] **AC1:** Baseline automation script created and tested
- [ ] **AC2:** Script handles errors and retries gracefully
- [ ] **AC3:** All 15 Batch 1 tasks baselined (duration, tokens, cost)
- [ ] **AC4:** All 50 Batch 2 tasks baselined
- [ ] **AC5:** All 49 Batch 3 tasks baselined
- [ ] **AC6:** All 114 task files updated with baseline metrics
- [ ] **AC7:** Baseline report generated with aggregated statistics
- [ ] **AC8:** Metrics data validated for accuracy

### Should Have (Important)
- [ ] **AC9:** Performance outliers identified and documented
- [ ] **AC10:** Cost analysis complete (total cost, cost per category)
- [ ] **AC11:** Regression test framework created for future comparisons

### Nice to Have (Enhancements)
- [ ] **AC12:** Performance visualization dashboard (Future Enhancement - Out of scope for baseline establishment)
- [ ] **AC13:** Automated alerting for performance regressions (Future Enhancement - Out of scope for baseline establishment)
- [ ] **AC14:** Continuous performance monitoring setup (Future Enhancement - Out of scope for baseline establishment)

**Note:** AC12-AC14 are future enhancements that would be valuable but are not required for establishing the baseline. These can be addressed in a follow-up story after baseline data is collected and analyzed.

---

## 📚 Dev Notes

### Current Execution Model Context

**Current State (Pre-Story 6.1.12):**
- Tasks execute sequentially (one at a time)
- No parallel execution support
- Agent activation is manual (user activates agent, then executes task)
- No workflow execution engine (planned for Story 6.1.12)

**Future State (Post-Story 6.1.12):**
- Workflow execution engine will support parallel execution (Fork/Join)
- Organizer-Worker pattern will enable multi-agent coordination
- Baseline established here will serve as "before" comparison for parallel execution improvements

**Future Optimization (Post-Story 1.10 Enhancement):**
- Agent Lightning will optimize execution using RL
- Baseline established here will enable measurement of 15-25% cost reduction target

**Future Enhancement (Post-Story 6.1.12):**
- After Fork/Join implementation, create parallel execution baseline script
- Measure parallel workflow performance (Fork/Join branches)
- Compare sequential vs. parallel execution performance
- Document 40-60% improvement achieved

### Baseline Automation Script Design

**Script:** `.aios-core/scripts/baseline-task-performance.js`

**Inputs:**
- `taskFilePath`: Path to task file to baseline
- `testDataPath`: Path to test data for task execution
- `iterations`: Number of executions (default: 3)

**Process:**
1. Read task file
2. Extract agent assignment from task file (`responsável:` field)
3. For each iteration (3x):
   - **Activate agent:** Load agent definition from `.aios-core/agents/{agent-id}.md`
     - Parse agent YAML configuration
     - Set agent context and persona
     - Initialize agent tools and dependencies
   - **Execute task:** Invoke task execution via agent command interface
     - Use task identifier from `task:` field (e.g., `qaGate()`)
     - Pass test data as input parameters
     - Monitor execution via agent's command handler
   - Capture start time (`Date.now()`)
   - Capture LLM API response (tokens from response metadata)
   - Capture end time (`Date.now()`)
   - Calculate duration, tokens, cost
4. Calculate median values across iterations
5. Update task file performance section
6. Write updated task file
7. Output metrics JSON

**Agent Activation Mechanism:**
- **Reference:** See Story 6.1.7.1 for agent activation patterns
- **Implementation:** Use agent loader utility (if exists) or parse agent YAML directly
- **Command Execution:** Agent commands follow pattern: `*{command-name} {args}`
- **Task Execution:** Tasks are invoked via agent's command handler system
- **Note:** If agent activation API doesn't exist, implement minimal agent loader that:
  1. Reads agent YAML from `.aios-core/agents/{id}.md`
  2. Extracts agent persona and commands
  3. Initializes agent context
  4. Executes task via command pattern

**Outputs:**
- Updated task file with baseline metrics
- Metrics JSON: `{ duration: "2500ms", tokens: "~1500", cost: "$0.0045" }`
- Execution log

### Test Data Requirements

**Minimal Test Data (per task):**
- Story ID (for story-related tasks): "TEST-001"
- Requirements (for create tasks): Simple test requirement
- File path (for file tasks): Test file path
- Database migration (for DB tasks): Simple test migration

**Goal:** Execute task successfully, not test all edge cases
- Use simplest valid inputs
- Focus on performance measurement, not functional testing
- Reuse test data where possible (same story for all story tasks)

**Test Data Examples:**

**Example 1: Story Validation Task**
```json
{
  "storyPath": "docs/stories/test/story-test-001.md",
  "storyId": "TEST-001",
  "epic": "Epic-6.1",
  "validationMode": "interactive"
}
```

**Example 2: Create Task Task**
```json
{
  "taskName": "test-task",
  "taskType": "execute",
  "agent": "dev",
  "description": "Simple test task for baseline measurement",
  "atomicLayer": "Atom"
}
```

**Example 3: Database Migration Task**
```json
{
  "migrationName": "test_migration_001",
  "migrationSQL": "CREATE TABLE test_table (id SERIAL PRIMARY KEY, name TEXT);",
  "database": "test_db",
  "rollbackSQL": "DROP TABLE IF EXISTS test_table;"
}
```

**Example 4: Agent Creation Task**
```json
{
  "agentId": "test-agent",
  "agentName": "Test Agent",
  "role": "Tester",
  "archetype": "Guardian",
  "commands": ["*test", "*validate"]
}
```

**Test Data Reuse Strategy:**
- Use same story ID ("TEST-001") for all story-related tasks
- Use same test file paths for file-related tasks
- Create minimal test database migrations that can be reused
- Reuse agent definitions across agent-related tasks

### Metrics Calculation

**Duration:**
```javascript
const startTime = Date.now();
await executeTask(taskFile, testData);
const endTime = Date.now();
const duration = `${endTime - startTime}ms`;
```

**Tokens:**
```javascript
// From LLM API response
const inputTokens = response.usage.input_tokens;
const outputTokens = response.usage.output_tokens;
const totalTokens = inputTokens + outputTokens;
const tokens = `~${totalTokens}`;
```

**Cost:**
```javascript
// Claude Sonnet 4.5 pricing (example)
const INPUT_PRICE_PER_1M = 3.00;  // $3 per 1M tokens
const OUTPUT_PRICE_PER_1M = 15.00; // $15 per 1M tokens

const inputCost = (inputTokens / 1000000) * INPUT_PRICE_PER_1M;
const outputCost = (outputTokens / 1000000) * OUTPUT_PRICE_PER_1M;
const totalCost = inputCost + outputCost;
const cost = `$${totalCost.toFixed(4)}`;
```

### Performance Section Update

**Before:**
```yaml
**Performance:**
- duration_expected: {TODO: X minutes}
- cost_estimated: {TODO: $X}
- token_usage: {TODO: ~X tokens}
```

**After:**
```yaml
**Performance:**
- duration_expected: 2500ms (baseline: 2023-01-17, median of 3 runs)
- cost_estimated: $0.0045 (based on Claude Sonnet 4.5 pricing)
- token_usage: ~1500 tokens (input: 500, output: 1000)
```

---

## 🧪 Testing

### Validation Strategy

#### 1. Script Testing (Before Batch Execution)
**Goal:** Ensure automation script works correctly

**Approach:**
- Test with 3 different task types (dev, qa, po)
- Validate metrics captured correctly
- Check task file updates work
- Verify error handling

**Expected Results:**
- Script executes without errors
- Metrics accurate (manual verification)
- Task files updated correctly
- Errors handled gracefully

#### 2. Metrics Validation (Per Batch)
**Goal:** Ensure captured metrics are reasonable

**Approach:**
- Check duration ranges (should be minutes, not hours)
- Check token usage (should be 100-10K range)
- Check costs (should be cents, not dollars per task)
- Identify outliers (>3 std deviations)

**Expected Results:**
- All metrics within reasonable ranges
- Outliers documented and investigated
- No obvious data quality issues

#### 3. Baseline Report Validation
**Goal:** Ensure aggregated data is accurate

**Approach:**
- Verify total task count (114)
- Check statistics calculations (min/max/median)
- Validate cost analysis (sum of individual costs)
- Review outlier identification

**Expected Results:**
- Report data matches raw data
- Statistics calculated correctly
- Cost analysis accurate
- Outliers properly flagged

### Test Coverage Target
- **Script Coverage:** 100% (3 test tasks validated manually)
- **Metrics Coverage:** 100% (all 114 tasks baselined)
- **Validation Coverage:** 15% (spot-check 17 random tasks)

---

## 💰 Investment Breakdown

- Day 1 (Script + Batch 1): 1 day @ $100/day = $100
- Day 2 (Batch 2 + 3 + Report): 1 day @ $100/day = $100
- **Total:** 2 days = $200

---

## 🎯 Success Metrics

- **Baseline Coverage:** 114/114 tasks (100%)
- **Metrics Completeness:** All 342 data points captured (100%)
- **Data Quality:** ≥95% accuracy (spot-check validation)
- **Automation Success:** ≥90% tasks automated (≤10% manual intervention)

---

## ⚠️ Risks & Mitigation

### Risk 1: Tasks fail during baseline execution
- **Likelihood:** Medium (some tasks may have TODO dependencies)
- **Impact:** Low (skip and document, baseline later)
- **Mitigation:** Continue with remaining tasks, note failures for follow-up

### Risk 2: Metrics data quality issues
- **Likelihood:** Low
- **Impact:** Medium (undermines baseline value)
- **Mitigation:** Validation checks, outlier detection, manual spot-checks

### Risk 3: Execution takes longer than 2 days
- **Likelihood:** Low-Medium
- **Impact:** Low (flexible timeline)
- **Mitigation:** Batch processing, parallel execution where possible

---

## 🎨 Deliverables

### 1. Baseline Automation Script
**Location:** `.aios-core/scripts/baseline-task-performance.js`

Reusable script for:
- Executing tasks and capturing metrics
- Updating task files with baseline data
- Generating metrics JSON output
- Error handling and retry logic

### 2. Updated Task Files (114 files)
**Location:** `.aios-core/tasks/*.md`

All tasks with populated performance sections:
- `duration_expected:` actual median duration
- `cost_estimated:` actual calculated cost
- `token_usage:` actual token consumption
- Baseline date and methodology documented

### 3. Performance Baseline Report
**Location:** `.ai/story-6.1.7.3-performance-baseline-report.md`

Comprehensive report including:
- Aggregated metrics (min/max/median/p95)
- Cost analysis (total, per category, per agent)
- Performance outliers (top 10 slowest, most expensive)
- Performance distribution charts
- Recommendations for optimization

### 4. Regression Test Framework
**Location:** `.aios-core/tests/performance-regression-suite.md`

Framework for future performance testing:
- Baseline data reference
- Regression detection thresholds (±10%)
- Automated comparison scripts
- Alerting configuration

---

## 📁 Files Modified

### Files Modified (114 tasks)
- `.aios-core/tasks/*.md` (all 114 task files - performance sections updated)

### Files Created
- `.aios-core/scripts/baseline-task-performance.js` (automation script)
- `.ai/story-6.1.7.3-performance-baseline-report.md` (baseline report)
- `.aios-core/tests/performance-regression-suite.md` (regression framework)
- `.ai/baseline-metrics.json` (raw metrics data)

---

## 📝 Notes

**Baseline Methodology:**
- Each task executed 3 times
- Median values used (more robust than mean)
- Test data kept minimal (focus on performance, not functionality)
- Baseline date documented for future reference

**Performance Categories (for analysis):**
- **Fast:** <30 seconds
- **Medium:** 30 seconds - 5 minutes
- **Slow:** 5-30 minutes
- **Very Slow:** >30 minutes

**Cost Categories (for analysis):**
- **Cheap:** <$0.01
- **Moderate:** $0.01 - $0.10
- **Expensive:** $0.10 - $1.00
- **Very Expensive:** >$1.00

---

## 👨‍💻 Dev Agent Record

*This section will be populated by the Dev agent (Dex) during implementation.*

### Agent Model Used
- **Model:** [To be filled during execution]
- **Version:** [To be filled during execution]

### Debug Log References
- [To be filled during execution]

### Completion Notes
- [Script development notes]
- [Baseline execution challenges]
- [Outliers discovered and investigated]

### File List
**Files Modified:**
- 114 task files in `.aios-core/tasks/*.md`

**Files Created:**
- `.aios-core/scripts/baseline-task-performance.js`
- `.ai/story-6.1.7.3-performance-baseline-report.md`
- `.aios-core/tests/performance-regression-suite.md`
- `.ai/baseline-metrics.json`

---

## ✅ QA Results

*This section will be populated by the QA agent (Quinn) after story completion.*

### QA Review Date
- **Reviewed by:** [QA Agent Name]
- **Review Date:** [Date]
- **Review Type:** Performance Baseline Validation

### Test Results Summary
- **Baseline Coverage:** [X/114 tasks baselined]
- **Metrics Quality:** [Pass/Fail with validation results]
- **Outliers Found:** [Count and details]
- **Cost Analysis:** [Total cost, per-task average]

### Issues Found
- [List of data quality issues]
- [List of execution failures]
- [List of anomalies discovered]

### Recommendations
- [Recommendations for performance optimization]
- [Suggestions for expensive tasks]

### Final Verdict
- **Status:** [PASS / CONCERNS / FAIL]
- **Baseline Valid:** [Yes / No / Partial]

---

## 📝 Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-01-17 | 1.2 | Validation updates: Clarified baseline scope (sequential only), added execution model context, added dependency on Story 1.10 Enhancement, added future baseline planning | Pax (PO) |
| 2025-11-17 | 1.1 | Story improvements: Clarified AC12-AC14 as future enhancements, added agent activation mechanism details, added test data examples (4 examples with reuse strategy) | Pax (PO) |
| 2025-01-17 | 1.0 | Initial story draft from Story 6.1.7 QA review | Pax (PO) |

---

## 🔗 Related Documents

- **Parent Story:** [Story 6.1.7 - Core Tasks Migration to V2.0](story-6.1.7-core-tasks-migration.md)
- **Related Story:** [Story 6.1.7.1 - Task Content Completion](story-6.1.7.1-task-content-completion.md)
- **Related Story:** [Story 6.1.7.2 - Task Execution Validation](story-6.1.7.2-task-execution-validation.md)
- **Dependent Story:** [Story 1.10 Enhancement - Agent Lightning Integration](../epic-1/story-1.10-enhancement-agent-lightning-integration.md) - **REQUIRES THIS BASELINE**
- **Future Baseline Story:** After Story 6.1.12 (Fork/Join), establish parallel execution baseline
- **Epic:** [Epic 6.1 - Agent Identity System](../epics/epic-6.1-agent-identity-system.md)

---

**Last Updated:** 2025-01-17 (v1.2 - Validation updates: Baseline scope clarification, execution model context, dependency updates)
**Previous Story:** [Story 6.1.7.2 - Task Execution Validation](story-6.1.7.2-task-execution-validation.md)
**Next Story:** [Story 6.1.8 - Templates Migration](story-6.1.8-templates-migration.md)

