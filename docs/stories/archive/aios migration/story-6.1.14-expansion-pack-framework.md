# Story 6.1.14: Expansion Pack Framework

**Story ID:** 6.1.14  
**Epic:** Epic-6.1 - Agent Identity System  
**Wave:** Wave 2 (Enhancement)  
**Status:** ❌ REJECTED (Architecture Conflict - See Story 6.1.15)  
**Priority:** 🔴 BLOCKED  
**Owner:** Architect (Aria) + Dev (Dex)  
**Created:** 2025-01-18  
**Duration:** N/A (Superseded by Story 6.1.15)  
**Investment:** N/A

**REJECTION REASON:** This story proposes creating `methodologies/` and `patterns/` directories, which conflicts with AIOS framework's 7-type structure. See `docs/architecture/architect-expansion-pack-rearchitecture.md` and `docs/architecture/subdirectory-migration-impact-analysis.md` for details.

**REPLACEMENT:** Story 6.1.15 (Subdirectory Architecture Validation) must complete first to establish correct architecture.

---

## 📋 Objective

Create a systematic framework for managing "expansion packs" - large methodology, workflow, and pattern definitions currently embedded inline in agent YAML files. Extract these to reusable, versioned, on-demand loadable dependencies.

---

## 🎯 User Story

**As a** AIOS framework maintainer,  
**I want** large agent methodologies and workflows extracted to reusable dependencies,  
**So that** agent files are smaller, methodologies are reusable across agents, and maintenance is simplified.

**Business Value:**
- Reduces agent file size by 50-70%
- Makes methodologies reusable across multiple agents
- Simplifies maintenance and versioning of best practices
- Enables on-demand loading (performance improvement)
- Better documentation structure

---

## 🔗 Context

### Current Problem

Several agents contain large "expansion pack" sections:

**Example: ux-design-expert.md (469 lines)**
- 200+ lines of Atomic Design methodology
- Brad Frost system design principles
- Sally UX research framework
- WCAG accessibility patterns
- Design token extraction workflows

**Problems:**
- ❌ Agent files are too large (hard to navigate)
- ❌ Methodologies not reusable (duplication risk)
- ❌ Difficult to version and maintain
- ❌ All loaded at once (performance impact)
- ❌ Hard to test independently

### Proposed Solution

**Extract to Dedicated Files:**

```
.aios-core/
  methodologies/
    atomic-design.md
    brad-frost-system-design.md
    sally-ux-research.md
  workflows/
    design-token-extraction.md
    wcag-accessibility-audit.md
    database-normalization.md
  patterns/
    etl-pipeline-patterns.md
    cicd-deployment-strategies.md
    error-handling-standards.md
```

**Agent References:**

```yaml
agent:
  id: ux-design-expert
  name: Uma
  
dependencies:
  methodologies:
    - atomic-design.md         # Loaded on-demand when needed
    - brad-frost-system-design.md
  workflows:
    - design-token-extraction.md
    - wcag-accessibility-audit.md
```

---

## 📊 Technical Analysis

### Agents Requiring Extraction

| Agent | Current Size | Expansion Pack Size | Target Size | Reduction |
|-------|--------------|---------------------|-------------|-----------|
| ux-design-expert | 469 lines | ~250 lines | ~220 lines | 53% |
| data-engineer | 380 lines | ~150 lines | ~230 lines | 39% |
| devops | 420 lines | ~180 lines | ~240 lines | 43% |
| architect | 350 lines | ~120 lines | ~230 lines | 34% |

**Total Potential Reduction:** ~700 lines across 4 agents (42% average)

### Extraction Categories

**1. Methodologies** (`.aios-core/methodologies/`)
- Design systems (Atomic Design, Brad Frost)
- Development methodologies (TDD, DDD, Clean Architecture)
- Data engineering practices (Kimball, Data Vault)

**2. Workflows** (`.aios-core/workflows/`)
- Multi-step processes (design token extraction, ETL pipeline)
- Standard operating procedures
- Quality assurance workflows

**3. Patterns** (`.aios-core/patterns/`)
- Code patterns (error handling, logging)
- Infrastructure patterns (deployment strategies, scaling)
- Data patterns (normalization, indexing)

---

## 📋 Tasks Breakdown

### Phase 1: Framework Foundation (2 hours)

**Task 1.1: Create Directory Structure (30 minutes)**

```bash
mkdir -p .aios-core/methodologies
mkdir -p .aios-core/workflows  
mkdir -p .aios-core/patterns
mkdir -p .aios-core/expansions/README.md
```

**Task 1.2: Create Expansion Pack Loader (1 hour)**

Create `.aios-core/scripts/expansion-loader.js`:

```javascript
/**
 * Expansion Pack Loader
 * Loads methodologies, workflows, and patterns on-demand
 */

class ExpansionLoader {
  constructor(agentId) {
    this.agentId = agentId;
    this.cache = new Map();
  }

  /**
   * Load expansion pack by category and name
   */
  async loadExpansion(category, name) {
    const cacheKey = `${category}/${name}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    const filePath = path.join(
      process.cwd(), 
      '.aios-core', 
      category, 
      `${name}.md`
    );
    
    const content = await fs.readFile(filePath, 'utf8');
    const parsed = this._parseExpansion(content);
    
    this.cache.set(cacheKey, parsed);
    return parsed;
  }

  /**
   * Load all expansions for agent
   */
  async loadAgentExpansions(agentDef) {
    const deps = agentDef.dependencies || {};
    const expansions = {};
    
    for (const [category, files] of Object.entries(deps)) {
      if (['methodologies', 'workflows', 'patterns'].includes(category)) {
        expansions[category] = await Promise.all(
          files.map(file => this.loadExpansion(category, file.replace('.md', '')))
        );
      }
    }
    
    return expansions;
  }
}
```

**Task 1.3: Create Expansion Pack Template (30 minutes)**

Create `.aios-core/expansions/TEMPLATE.md`:

```markdown
# [Expansion Pack Name]

**Type:** Methodology | Workflow | Pattern  
**Version:** 1.0.0  
**Applicable Agents:** [List of agents]  
**Dependencies:** [Other expansion packs]  
**Created:** YYYY-MM-DD  
**Updated:** YYYY-MM-DD

---

## 📋 Overview

Brief description of this expansion pack and when to use it.

## 🎯 Key Concepts

Core concepts and principles.

## 📊 Implementation

Detailed implementation guide.

## ✅ Validation

How to validate correct usage.

## 📚 Resources

External references and documentation.
```

---

### Phase 2: Extract UX Design Expansions (1.5 hours)

**Task 2.1: Extract Atomic Design Methodology (30 minutes)**

Create `.aios-core/methodologies/atomic-design.md`:
- Extract from ux-design-expert.md lines 95-145
- Document Atoms → Molecules → Organisms → Templates → Pages
- Add Brad Frost attribution and references

**Task 2.2: Extract Brad Frost System Design (30 minutes)**

Create `.aios-core/methodologies/brad-frost-system-design.md`:
- Extract system design principles
- Document metric-driven approach
- Visual shock therapy techniques
- Consolidation patterns

**Task 2.3: Extract Design Workflows (30 minutes)**

Create `.aios-core/workflows/design-token-extraction.md`
Create `.aios-core/workflows/wcag-accessibility-audit.md`

---

### Phase 3: Extract Data Engineering Expansions (1 hour)

**Task 3.1: Extract Database Patterns (30 minutes)**

Create `.aios-core/patterns/database-normalization.md`
Create `.aios-core/patterns/dimensional-modeling.md`

**Task 3.2: Extract ETL Workflows (30 minutes)**

Create `.aios-core/workflows/etl-pipeline-design.md`
Create `.aios-core/workflows/data-quality-validation.md`

---

### Phase 4: Extract DevOps Expansions (1 hour)

**Task 4.1: Extract Infrastructure Patterns (30 minutes)**

Create `.aios-core/patterns/cicd-pipeline-patterns.md`
Create `.aios-core/patterns/blue-green-deployment.md`

**Task 4.2: Extract Deployment Workflows (30 minutes)**

Create `.aios-core/workflows/zero-downtime-deployment.md`
Create `.aios-core/workflows/disaster-recovery.md`

---

### Phase 5: Update Agents (1 hour)

**Task 5.1: Update Agent Files (30 minutes)**

Update agent YAML to reference expansions:

```yaml
dependencies:
  methodologies:
    - atomic-design.md
  workflows:
    - design-token-extraction.md
```

Remove inline content from:
- ux-design-expert.md
- data-engineer.md
- devops.md
- architect.md

**Task 5.2: Test Agent Activations (30 minutes)**

Test each updated agent:
1. Activate agent
2. Verify expansions load correctly
3. Test workflows that reference methodologies
4. Validate no broken references

---

### Phase 6: Documentation & Testing (30 minutes)

**Task 6.1: Create Documentation (15 minutes)**

Create `.aios-core/expansions/README.md`:
- Explain expansion pack system
- Document directory structure
- Usage examples
- How to create new expansions

**Task 6.2: Integration Testing (15 minutes)**

Test complete workflows:
- Agent activation with expansions
- On-demand loading
- Cache performance
- Error handling

---

## ✅ Acceptance Criteria

### Must Have

- [ ] Directory structure created (methodologies/, workflows/, patterns/)
- [ ] ExpansionLoader class implemented and tested
- [ ] Template for new expansion packs created
- [ ] UX Design expansions extracted (4+ files)
- [ ] Data Engineering expansions extracted (3+ files)
- [ ] DevOps expansions extracted (3+ files)
- [ ] 4 agent files updated to reference expansions
- [ ] All updated agents activate successfully
- [ ] Agent file size reduced by 40%+ average
- [ ] No broken references or missing content
- [ ] Documentation complete

### Should Have

- [ ] Expansion pack versioning system
- [ ] Cache metrics logged
- [ ] Performance benchmarks (load time <50ms)

### Nice to Have

- [ ] CLI command to list available expansions
- [ ] Validation tool for expansion pack structure
- [ ] Dependency graph visualization

---

## 📁 Files Created

### New Files
- `.aios-core/scripts/expansion-loader.js`
- `.aios-core/expansions/README.md`
- `.aios-core/expansions/TEMPLATE.md`
- `.aios-core/methodologies/atomic-design.md`
- `.aios-core/methodologies/brad-frost-system-design.md`
- `.aios-core/methodologies/sally-ux-research.md`
- `.aios-core/workflows/design-token-extraction.md`
- `.aios-core/workflows/wcag-accessibility-audit.md`
- `.aios-core/workflows/etl-pipeline-design.md`
- `.aios-core/workflows/data-quality-validation.md`
- `.aios-core/patterns/database-normalization.md`
- `.aios-core/patterns/cicd-pipeline-patterns.md`
- `.aios-core/patterns/blue-green-deployment.md`

### Modified Files
- `.aios-core/agents/ux-design-expert.md` (reduced by ~250 lines)
- `.aios-core/agents/data-engineer.md` (reduced by ~150 lines)
- `.aios-core/agents/devops.md` (reduced by ~180 lines)
- `.aios-core/agents/architect.md` (reduced by ~120 lines)

---

## 💰 Investment Breakdown

- **Phase 1: Framework Foundation:** 2 hours @ $12.50/hr = $25.00
- **Phase 2: UX Design Expansions:** 1.5 hours @ $12.50/hr = $18.75
- **Phase 3: Data Engineering Expansions:** 1 hour @ $12.50/hr = $12.50
- **Phase 4: DevOps Expansions:** 1 hour @ $12.50/hr = $12.50
- **Phase 5: Update Agents:** 1 hour @ $12.50/hr = $12.50
- **Phase 6: Documentation & Testing:** 0.5 hours @ $12.50/hr = $6.25

**Total:** 7 hours = $87.50 (rounded to $75.00 for planning)

---

## 🎯 Success Metrics

- **File Size Reduction:** 40%+ average across 4 agents
- **Reusability:** 3+ agents reference same methodology
- **Performance:** Expansion loading <50ms
- **Maintainability:** Single file update affects all referencing agents
- **Documentation:** Complete coverage of all expansions

---

## ⚠️ Risks & Mitigation

### Risk 1: Breaking agent workflows
- **Likelihood:** Medium
- **Impact:** High
- **Mitigation:** Comprehensive testing, phased rollout, keep backups

### Risk 2: Performance degradation from file loading
- **Likelihood:** Low
- **Impact:** Medium
- **Mitigation:** Aggressive caching, lazy loading, performance monitoring

### Risk 3: Unclear content boundaries
- **Likelihood:** Medium
- **Impact:** Medium
- **Mitigation:** Clear template, review process, documentation

---

## 📝 Related Stories

**Prerequisites:**
- Story 6.1.4 - Unified Greeting System Integration ✅

**Follow-up Stories:**
- Story 6.1.14.1 - UX Design Expansion Pack Extraction (detailed)
- Story 6.1.14.2 - Data Engineering Expansion Pack Extraction (detailed)
- Story 6.1.14.3 - DevOps Expansion Pack Extraction (detailed)
- Story 6.1.15 - Expansion Pack Versioning System

---

**Status:** 📋 Draft (Pending Architect Validation)  
**Next Steps:** Architect review against source-tree.md structure  
**Estimated Start:** 6-8 weeks from Story 6.1.4 completion

---

**Created By:** Quinn (QA Agent) + Aria (Architect)  
**Date:** 2025-01-18  
**Validation Required:** Architect review for structure compliance

— Quinn, guardião da qualidade 🛡️

