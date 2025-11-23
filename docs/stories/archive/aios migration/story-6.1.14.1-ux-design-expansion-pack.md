# Story 6.1.14.1: UX Design Expansion Pack Extraction (DRAFT)

**Story ID:** 6.1.14.1  
**Epic:** Epic-6.1 - Agent Identity System  
**Wave:** Wave 2 (Enhancement)  
**Status:** ❌ REJECTED (Architecture Conflict - Pending Story 6.1.15)  
**Priority:** 🔴 BLOCKED  
**Owner:** Dev (Dex) + UX Expert (Uma)  
**Created:** 2025-01-18  
**Duration:** TBD (Awaiting Story 6.1.15 validation)  
**Investment:** TBD

**REJECTION REASON:** Depends on Story 6.1.14 which was rejected. Correct architecture must be validated via Story 6.1.15 (Subdirectory Migration) first.

**NEXT STEPS:** After Story 6.1.15 completes successfully, this story will be revised to use subdirectories in existing framework types (data/, tasks/, templates/) instead of new directories.

---

## 📋 Objective

Extract large inline methodologies and workflows from `ux-design-expert.md` agent file into reusable expansion pack dependencies. This reduces agent file size by ~53% and makes UX/Design methodologies reusable across multiple agents.

**Context:** Story 6.1.14 creates the expansion pack framework. This story implements the extraction for the UX Design agent specifically.

---

## 🎯 Story

**As a** AIOS framework maintainer,  
**I want** UX/Design methodologies extracted from the agent file to reusable dependencies,  
**So that** the agent file is smaller, methodologies are reusable, and maintenance is simplified.

**Business Value:**
- Reduces ux-design-expert.md from 469 lines to ~220 lines (53% reduction)
- Makes Atomic Design, Brad Frost, and Sally UX methodologies reusable
- Simplifies agent file maintenance
- Enables other agents to reference UX methodologies
- Improves documentation structure

---

## 🔗 Context

### Current State

**ux-design-expert.md (469 lines):**
- ~250 lines of inline methodologies:
  - Atomic Design methodology (Atoms → Molecules → Organisms)
  - Brad Frost system design principles
  - Sally UX research framework
  - Design token extraction workflows
  - WCAG accessibility patterns

**Problems:**
- ❌ Agent file too large (hard to navigate)
- ❌ Methodologies not reusable (duplication risk)
- ❌ Difficult to version and maintain
- ❌ All loaded at once (performance impact)

### Proposed Solution

**Extract to:**
```
.aios-core/
  methodologies/
    atomic-design.md              # Atomic Design framework
    brad-frost-system-design.md   # Brad Frost principles
    sally-ux-research.md          # Sally UX framework
  workflows/
    design-token-extraction.md    # Token extraction workflow
    wcag-accessibility-audit.md   # WCAG audit workflow
```

**Agent References:**
```yaml
dependencies:
  methodologies:
    - atomic-design.md
    - brad-frost-system-design.md
    - sally-ux-research.md
  workflows:
    - design-token-extraction.md
    - wcag-accessibility-audit.md
```

---

## 📋 Tasks Breakdown

### Phase 1: Extract Methodologies (2 hours)

**Task 1.1: Extract Atomic Design Methodology (45 minutes)**

Create `.aios-core/methodologies/atomic-design.md`:

**Content to Extract:**
- Atomic Design framework explanation
- Atoms → Molecules → Organisms → Templates → Pages hierarchy
- Brad Frost attribution and references
- Implementation examples
- Best practices

**Source:** ux-design-expert.md lines 95-145

**Task 1.2: Extract Brad Frost System Design (45 minutes)**

Create `.aios-core/methodologies/brad-frost-system-design.md`:

**Content to Extract:**
- Metric-driven approach principles
- Visual shock therapy techniques
- Intelligent consolidation patterns
- ROI-focused design decisions
- Zero hardcoded values principle

**Source:** ux-design-expert.md lines 86-94

**Task 1.3: Extract Sally UX Research Framework (30 minutes)**

Create `.aios-core/methodologies/sally-ux-research.md`:

**Content to Extract:**
- User-centric design principles
- Empathetic discovery methods
- Iterative simplicity approach
- Delight in details philosophy
- Collaborative design practices

**Source:** ux-design-expert.md lines 79-85

---

### Phase 2: Extract Workflows (1.5 hours)

**Task 2.1: Extract Design Token Extraction Workflow (45 minutes)**

Create `.aios-core/workflows/design-token-extraction.md`:

**Content to Extract:**
- Token extraction process steps
- Tool recommendations
- Validation criteria
- Integration patterns

**Source:** ux-design-expert.md (workflow sections)

**Task 2.2: Extract WCAG Accessibility Audit Workflow (45 minutes)**

Create `.aios-core/workflows/wcag-accessibility-audit.md`:

**Content to Extract:**
- WCAG 2.1 AA compliance checklist
- Audit process steps
- Testing methodologies
- Remediation patterns

**Source:** ux-design-expert.md (accessibility sections)

---

### Phase 3: Update Agent File (30 minutes)

**Task 3.1: Remove Inline Content (15 minutes)**

- Remove extracted methodologies from ux-design-expert.md
- Remove extracted workflows from ux-design-expert.md
- Keep agent persona, commands, and core configuration

**Task 3.2: Add Dependency References (15 minutes)**

Update `dependencies` section:

```yaml
dependencies:
  methodologies:
    - atomic-design.md
    - brad-frost-system-design.md
    - sally-ux-research.md
  workflows:
    - design-token-extraction.md
    - wcag-accessibility-audit.md
  tasks:
    # Existing tasks...
  templates:
    # Existing templates...
```

---

### Phase 4: Testing & Validation (30 minutes)

**Task 4.1: Verify Agent Activation (15 minutes)**

- Activate ux-design-expert agent
- Verify greeting generates correctly
- Verify agent persona intact
- Verify commands available

**Task 4.2: Test Expansion Pack Loading (15 minutes)**

- Test methodology loading on-demand
- Test workflow loading on-demand
- Verify performance impact minimal
- Test error handling

---

## ✅ Acceptance Criteria

### Must Have

- [ ] Atomic Design methodology extracted to `.aios-core/methodologies/atomic-design.md`
- [ ] Brad Frost system design extracted to `.aios-core/methodologies/brad-frost-system-design.md`
- [ ] Sally UX research extracted to `.aios-core/methodologies/sally-ux-research.md`
- [ ] Design token extraction workflow extracted to `.aios-core/workflows/design-token-extraction.md`
- [ ] WCAG accessibility audit workflow extracted to `.aios-core/workflows/wcag-accessibility-audit.md`
- [ ] ux-design-expert.md updated with dependency references
- [ ] Agent file size reduced by 50%+ (from 469 to <235 lines)
- [ ] Agent activates successfully
- [ ] All methodologies accessible via dependencies
- [ ] No functionality lost

### Should Have

- [ ] Expansion pack loader tested with new files
- [ ] Documentation complete for each methodology
- [ ] Cross-references between methodologies documented

### Nice to Have

- [ ] Methodology versioning system
- [ ] Usage examples in each methodology file
- [ ] Visual diagrams for Atomic Design

---

## 🤖 CodeRabbit Integration

### Story Type Analysis

**Primary Type:** Refactoring/Architecture  
**Secondary Type(s):** Documentation, Code Organization  
**Complexity:** Medium

### Specialized Agent Assignment

**Primary Agents:**
- @dev: Code extraction, file structure
- @ux-design-expert: Content validation, methodology accuracy

**Supporting Agents:**
- @architect: Structure validation, pattern compliance
- @qa: Testing, completeness verification

### Quality Gate Tasks

- [ ] **Pre-Commit (@dev):** Run before marking story complete
  - Focus: File structure compliance, no content loss
  - Validate: All methodologies extracted correctly
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

- `.aios-core/methodologies/atomic-design.md`
- `.aios-core/methodologies/brad-frost-system-design.md`
- `.aios-core/methodologies/sally-ux-research.md`
- `.aios-core/workflows/design-token-extraction.md`
- `.aios-core/workflows/wcag-accessibility-audit.md`

### Files Modified

- `.aios-core/agents/ux-design-expert.md` (reduced by ~250 lines)

---

## 💰 Investment Breakdown

- **Phase 1: Extract Methodologies:** 2 hours @ $12.50/hr = $25.00
- **Phase 2: Extract Workflows:** 1.5 hours @ $12.50/hr = $18.75
- **Phase 3: Update Agent File:** 0.5 hours @ $12.50/hr = $6.25

**Total:** 4 hours = $50.00

---

## 🎯 Success Metrics

- **File Size Reduction:** 50%+ (469 → <235 lines)
- **Reusability:** Methodologies accessible to other agents
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

1. **Preserve Attribution:**
   - Include original author credits
   - Maintain references and citations
   - Preserve methodology origins

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

