# Story 6.1.14.2: Data Engineering Expansion Pack Extraction (DRAFT)

**Story ID:** 6.1.14.2  
**Epic:** Epic-6.1 - Agent Identity System  
**Wave:** Wave 2 (Enhancement)  
**Status:** ❌ REJECTED (Architecture Conflict - Pending Story 6.1.15)  
**Priority:** 🔴 BLOCKED  
**Owner:** Dev (Dex) + Data Engineer (Dara)  
**Created:** 2025-01-18  
**Duration:** TBD (Awaiting Story 6.1.15 validation)  
**Investment:** TBD

**REJECTION REASON:** Depends on Story 6.1.14 which was rejected. Correct architecture must be validated via Story 6.1.15 (Subdirectory Migration) first.

**NEXT STEPS:** After Story 6.1.15 completes successfully, this story will be revised to use subdirectories in existing framework types (data/, tasks/, templates/) instead of new directories.

---

## 📋 Objective

Extract large inline database patterns and ETL workflows from `data-engineer.md` agent file into reusable expansion pack dependencies. This reduces agent file size by ~39% and makes data engineering methodologies reusable across multiple agents.

**Context:** Story 6.1.14 creates the expansion pack framework. This story implements the extraction for the Data Engineering agent specifically.

---

## 🎯 Story

**As a** AIOS framework maintainer,  
**I want** data engineering patterns and workflows extracted from the agent file to reusable dependencies,  
**So that** the agent file is smaller, methodologies are reusable, and maintenance is simplified.

**Business Value:**
- Reduces data-engineer.md from 380 lines to ~230 lines (39% reduction)
- Makes database patterns and ETL workflows reusable
- Simplifies agent file maintenance
- Enables other agents to reference data engineering patterns
- Improves documentation structure

---

## 🔗 Context

### Current State

**data-engineer.md (380 lines):**
- ~150 lines of inline patterns and workflows:
  - Database normalization patterns
  - Dimensional modeling (Kimball, Data Vault)
  - ETL pipeline design workflows
  - Data quality validation processes
  - Performance optimization patterns

**Problems:**
- ❌ Agent file too large (hard to navigate)
- ❌ Patterns not reusable (duplication risk)
- ❌ Difficult to version and maintain
- ❌ All loaded at once (performance impact)

### Proposed Solution

**Extract to:**
```
.aios-core/
  patterns/
    database-normalization.md        # Normalization patterns
    dimensional-modeling.md          # Kimball, Data Vault
    data-indexing-strategies.md      # Indexing patterns
  workflows/
    etl-pipeline-design.md           # ETL design workflow
    data-quality-validation.md       # Quality validation workflow
    database-migration.md            # Migration workflow
```

**Agent References:**
```yaml
dependencies:
  patterns:
    - database-normalization.md
    - dimensional-modeling.md
    - data-indexing-strategies.md
  workflows:
    - etl-pipeline-design.md
    - data-quality-validation.md
    - database-migration.md
```

---

## 📋 Tasks Breakdown

### Phase 1: Extract Database Patterns (1.5 hours)

**Task 1.1: Extract Normalization Patterns (30 minutes)**

Create `.aios-core/patterns/database-normalization.md`:

**Content to Extract:**
- Normal forms (1NF, 2NF, 3NF, BCNF)
- Normalization process steps
- Denormalization strategies
- Trade-offs and best practices
- Examples and use cases

**Source:** data-engineer.md (normalization sections)

**Task 1.2: Extract Dimensional Modeling (45 minutes)**

Create `.aios-core/patterns/dimensional-modeling.md`:

**Content to Extract:**
- Kimball methodology
- Data Vault methodology
- Star schema vs Snowflake schema
- Fact and dimension tables
- Slowly Changing Dimensions (SCD)
- Implementation patterns

**Source:** data-engineer.md (dimensional modeling sections)

**Task 1.3: Extract Indexing Strategies (15 minutes)**

Create `.aios-core/patterns/data-indexing-strategies.md`:

**Content to Extract:**
- Index types (B-tree, Hash, GIN, GiST)
- Index selection criteria
- Composite index strategies
- Partial index patterns
- Performance optimization

**Source:** data-engineer.md (indexing sections)

---

### Phase 2: Extract ETL Workflows (1 hour)

**Task 2.1: Extract ETL Pipeline Design (30 minutes)**

Create `.aios-core/workflows/etl-pipeline-design.md`:

**Content to Extract:**
- ETL pipeline architecture
- Extract strategies (full vs incremental)
- Transform patterns (cleansing, enrichment)
- Load strategies (insert, upsert, merge)
- Error handling and recovery
- Monitoring and logging

**Source:** data-engineer.md (ETL sections)

**Task 2.2: Extract Data Quality Validation (30 minutes)**

Create `.aios-core/workflows/data-quality-validation.md`:

**Content to Extract:**
- Data quality dimensions (completeness, accuracy, consistency)
- Validation rules and checks
- Data profiling techniques
- Quality metrics and reporting
- Remediation workflows

**Source:** data-engineer.md (quality sections)

---

### Phase 3: Update Agent File (30 minutes)

**Task 3.1: Remove Inline Content (15 minutes)**

- Remove extracted patterns from data-engineer.md
- Remove extracted workflows from data-engineer.md
- Keep agent persona, commands, and core configuration

**Task 3.2: Add Dependency References (15 minutes)**

Update `dependencies` section:

```yaml
dependencies:
  patterns:
    - database-normalization.md
    - dimensional-modeling.md
    - data-indexing-strategies.md
  workflows:
    - etl-pipeline-design.md
    - data-quality-validation.md
    - database-migration.md
  tasks:
    # Existing tasks...
  templates:
    # Existing templates...
```

---

### Phase 4: Testing & Validation (30 minutes)

**Task 4.1: Verify Agent Activation (15 minutes)**

- Activate data-engineer agent
- Verify greeting generates correctly
- Verify agent persona intact
- Verify commands available

**Task 4.2: Test Expansion Pack Loading (15 minutes)**

- Test pattern loading on-demand
- Test workflow loading on-demand
- Verify performance impact minimal
- Test error handling

---

## ✅ Acceptance Criteria

### Must Have

- [ ] Database normalization patterns extracted to `.aios-core/patterns/database-normalization.md`
- [ ] Dimensional modeling extracted to `.aios-core/patterns/dimensional-modeling.md`
- [ ] Data indexing strategies extracted to `.aios-core/patterns/data-indexing-strategies.md`
- [ ] ETL pipeline design workflow extracted to `.aios-core/workflows/etl-pipeline-design.md`
- [ ] Data quality validation workflow extracted to `.aios-core/workflows/data-quality-validation.md`
- [ ] data-engineer.md updated with dependency references
- [ ] Agent file size reduced by 35%+ (from 380 to <247 lines)
- [ ] Agent activates successfully
- [ ] All patterns accessible via dependencies
- [ ] No functionality lost

### Should Have

- [ ] Expansion pack loader tested with new files
- [ ] Documentation complete for each pattern
- [ ] Cross-references between patterns documented

### Nice to Have

- [ ] Pattern versioning system
- [ ] Usage examples in each pattern file
- [ ] Visual diagrams for dimensional modeling

---

## 🤖 CodeRabbit Integration

### Story Type Analysis

**Primary Type:** Refactoring/Architecture  
**Secondary Type(s):** Documentation, Code Organization  
**Complexity:** Medium

### Specialized Agent Assignment

**Primary Agents:**
- @dev: Code extraction, file structure
- @data-engineer: Content validation, pattern accuracy

**Supporting Agents:**
- @architect: Structure validation, pattern compliance
- @qa: Testing, completeness verification

### Quality Gate Tasks

- [ ] **Pre-Commit (@dev):** Run before marking story complete
  - Focus: File structure compliance, no content loss
  - Validate: All patterns extracted correctly
  - Check: Agent file size reduction achieved

- [ ] **Pre-PR (@dev):** Run before creating pull request
  - Focus: Integration safety, dependency loading
  - Validate: Expansion pack loader works with new files
  - Check: Agent functionality intact

### CodeRabbit Focus Areas

**Primary Focus:**
- **File Structure:** Compliance with source-tree.md structure
- **Content Integrity:** No information lost in extraction
- **Dependency Management:** Proper references and loading

---

## 📁 Files Created

### New Files

- `.aios-core/patterns/database-normalization.md`
- `.aios-core/patterns/dimensional-modeling.md`
- `.aios-core/patterns/data-indexing-strategies.md`
- `.aios-core/workflows/etl-pipeline-design.md`
- `.aios-core/workflows/data-quality-validation.md`

### Files Modified

- `.aios-core/agents/data-engineer.md` (reduced by ~150 lines)

---

## 💰 Investment Breakdown

- **Phase 1: Extract Patterns:** 1.5 hours @ $12.50/hr = $18.75
- **Phase 2: Extract Workflows:** 1 hour @ $12.50/hr = $12.50
- **Phase 3: Update Agent File:** 0.5 hours @ $12.50/hr = $6.25

**Total:** 3 hours = $37.50

---

## 🎯 Success Metrics

- **File Size Reduction:** 35%+ (380 → <247 lines)
- **Reusability:** Patterns accessible to other agents
- **Maintainability:** Single file update affects all referencing agents
- **Performance:** No degradation in agent activation time

---

## ⚠️ Risks & Mitigation

### Risk 1: Content loss during extraction
- **Likelihood:** Low
- **Impact:** High
- **Mitigation:** 
  - Careful line-by-line extraction
  - Verify all content moved
  - Test agent functionality thoroughly

### Risk 2: Broken references
- **Likelihood:** Medium
- **Impact:** Medium
- **Mitigation:**
  - Verify dependency paths correct
  - Test expansion pack loading
  - Keep backups of original file

---

## 📝 Implementation Notes

### Extraction Guidelines

1. **Preserve Technical Accuracy:**
   - Maintain database theory correctness
   - Preserve SQL examples
   - Keep performance considerations

2. **Maintain Structure:**
   - Keep hierarchical organization
   - Preserve code examples
   - Maintain formatting

3. **Add Documentation:**
   - Add overview sections
   - Include usage examples
   - Document dependencies

---

## 🔗 Related Documents

- **Epic:** [Epic-6.1](../epics/epic-6.1.md)
- **Prerequisite:** Story 6.1.14 - Expansion Pack Framework
- **Analysis:** `docs/stories/aios migration/story-6.1.4-agent-coverage-analysis.md`
- **Source Tree:** `docs/architecture/source-tree.md`

---

## 📝 Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-01-18 | 1.0 | Initial draft story creation | Pax (po) |

---

**Status:** 📋 Draft (Pending Architect Validation)  
**Next Steps:** Architect review against source-tree.md structure  
**Estimated Start:** After Story 6.1.14 completion

---

**Created By:** Pax (PO Agent)  
**Date:** 2025-01-18  
**Validation Required:** Architect review for structure compliance

