# STORIES 3.6-3.12: Template Engine + Sprint 3 Final

**Épico:** [EPIC-S3](../../../epics/epic-s3-quality-templates.md) | **Sprint:** 3 | **Created:** 2025-01-19

---

## STORY 3.6: Template Engine Core Refactor

**Points:** 8 | **Priority:** 🔴 Critical

### User Story
**Como** PM/PO/developer, **Quero** Template Engine refatorado, **Para** gerar todos doc types consistentemente

### Scope

**Current:** `.aios-core/scripts/template-engine.js` (parcialmente implementado)  
**Target:** `.aios-core/product/templates/engine/` (modular, extensível)

```javascript
// Template Engine V2
class TemplateEngine {
  async generate(templateType, context) {
    const template = await this.loadTemplate(templateType);
    const variables = await this.elicitVariables(template, context);
    const rendered = await this.render(template, variables);
    return await this.validate(rendered, template.schema);
  }
  
  supportedTypes = ['prd', 'adr', 'pmdr', 'dbdr', 'story', 'epic', 'task'];
}
```

### Tasks (8 pts = 3 dias)
- [ ] 3.6.1: Design new engine architecture (4h)
- [ ] 3.6.2: Implement template loader (3h)
- [ ] 3.6.3: Implement variable elicitation (inquirer) (4h)
- [ ] 3.6.4: Implement renderer (Handlebars/Mustache) (4h)
- [ ] 3.6.5: Implement validation (JSON Schema) (3h)
- [ ] 3.6.6: Migrate existing templates (5h)
- [ ] 3.6.7: Test with all doc types (5h)

**Total:** 28h

---

## STORY 3.7: Template PRD v2.0

**Points:** 3 | **Priority:** 🟠 High

### User Story
**Como** PO (Nova), **Quero** template PRD v2.0, **Para** gerar PRDs completos e consistentes

### Scope

`.aios-core/product/templates/prd-v2.0.hbs`:

```handlebars
# Product Requirements Document - {{projectName}}

## Overview
**Product:** {{productName}}
**Version:** {{version}}
**Author:** {{author}}
**Date:** {{date}}

## Problem Statement
{{problemStatement}}

## Goals & Objectives
{{#each goals}}
- {{this}}
{{/each}}

## User Stories
{{#each userStories}}
### {{this.title}}
**As** {{this.actor}}
**I want** {{this.action}}
**So that** {{this.benefit}}
{{/each}}

[... complete PRD structure ...]
```

### Tasks (3 pts = 1 dia)
- [ ] 3.7.1: Design PRD v2.0 structure (2h)
- [ ] 3.7.2: Create Handlebars template (3h)
- [ ] 3.7.3: Define variable schema (2h)
- [ ] 3.7.4: Test generation (2h)

**Total:** 9h

---

## STORY 3.8: Template ADR

**Points:** 3 | **Priority:** 🟠 High

### User Story
**Como** Architect (Aria), **Quero** template ADR, **Para** documentar decisões arquiteturais

### Scope

Architecture Decision Record template:
```handlebars
# ADR {{number}}: {{title}}

**Status:** {{status}}
**Date:** {{date}}
**Deciders:** {{deciders}}

## Context
{{context}}

## Decision
{{decision}}

## Consequences
### Positive
{{#each positiveConsequences}}
- {{this}}
{{/each}}

### Negative
{{#each negativeConsequences}}
- {{this}}
{{/each}}

## Alternatives Considered
{{#each alternatives}}
### {{this.name}}
{{this.description}}
**Pros:** {{this.pros}}
**Cons:** {{this.cons}}
{{/each}}
```

### Tasks (3 pts = 1 dia)
- [ ] 3.8.1: Design ADR structure (2h)
- [ ] 3.8.2: Create template (2h)
- [ ] 3.8.3: Test with real decisions (3h)

**Total:** 7h

---

## STORY 3.9: Template PMDR

**Points:** 3 | **Priority:** 🟡 Medium

### User Story
**Como** PM (Luna), **Quero** template PMDR, **Para** documentar decisões de produto

### Tasks (3 pts = 1 dia)
- [ ] 3.9.1: Design PMDR structure (similar to ADR) (2h)
- [ ] 3.9.2: Create template (2h)
- [ ] 3.9.3: Test (2h)

**Total:** 6h

---

## STORY 3.10: Template DBDR

**Points:** 3 | **Priority:** 🟡 Medium

### User Story
**Como** Data Engineer (Dara), **Quero** template DBDR, **Para** documentar decisões de database

### Tasks (3 pts = 1 dia)
- [ ] 3.10.1: Design DBDR structure (2h)
- [ ] 3.10.2: Create template (2h)
- [ ] 3.10.3: Test (2h)

**Total:** 6h

---

## STORY 3.11: Quality Gates Dashboard

**Points:** 8 | **Priority:** 🟠 High

### User Story
**Como** tech lead, **Quero** dashboard visual dos Quality Gates, **Para** monitorar métricas em tempo real

### Scope

Web dashboard showing:
- **Layer 1 metrics:** Pre-commit pass rate, avg time
- **Layer 2 metrics:** PR pass rate, **🆕 CodeRabbit findings breakdown**, Quinn findings
- **Layer 3 metrics:** Human review time, approval rate
- **Trends:** Auto-catch rate over time
- **🆕 CodeRabbit Integration Status:** Local IDE + GitHub App health

```javascript
// Dashboard data structure
{
  layer1: {
    passRate: 0.95,
    avgTime: '3.2s',
    totalRuns: 1240
  },
  layer2: {
    passRate: 0.82,
    avgTime: '2.1min',
    autoCatchRate: 0.78,
    coderabbit: {  // 🆕 CodeRabbit metrics
      localActive: true,
      githubAppActive: true,
      findingsCount: 234,
      topIssues: ['complexity', 'security', 'performance']
    },
    quinn: {
      findingsCount: 156,
      topIssues: ['logic', 'tests', 'criteria']
    }
  },
  layer3: {
    avgReviewTime: '28min', // vs. 2-4h target
    approvalRate: 0.91
  }
}
```

### Tasks (8 pts = 3 dias)
- [ ] 3.11.1: Design dashboard UI (4h)
- [ ] 3.11.2: Implement data collection (5h)
- [ ] 3.11.3: Create visualization (charts) (5h)
- [ ] 3.11.4: Real-time updates (4h)
- [ ] 3.11.5: Deploy (3h)
- [ ] 3.11.6: Test with real data (3h)

**Total:** 24h

---

## STORY 3.12: Documentation Sprint 3

**Points:** 5 | **Priority:** 🟡 Medium

### Deliverables

1. **Quality Gates Guide** (`docs/guides/quality-gates-3-layers.md`)
2. **Template Engine Guide** (`docs/guides/template-engine-v2.md`)
3. **CodeRabbit Setup Guide** (`docs/guides/coderabbit-setup.md`)
4. **Dashboard User Guide** (`docs/guides/quality-dashboard.md`)

### Tasks (5 pts = 2 dias)
- [ ] 3.12.1: Quality Gates guide (4h)
- [ ] 3.12.2: Template Engine guide (3h)
- [ ] 3.12.3: CodeRabbit setup (3h)
- [ ] 3.12.4: Dashboard guide (2h)
- [ ] 3.12.5: Update main docs (2h)

**Total:** 14h

---

## 🔗 Dependencies

**3.6 depends on:** [2.4] Product Module  
**3.7-3.10 depend on:** [3.6] Template Engine  
**3.11 depends on:** [3.1-3.5] All Quality Gates  
**3.12 depends on:** All Sprint 3 stories  

---

## ✅ Sprint 3 Complete Success Criteria

- [ ] All 12 stories completed
- [ ] 80% auto-catch rate achieved and measured
- [ ] Template engine generating 100% doc types
- [ ] CodeRabbit working in 6 IDEs
- [ ] Dashboard live and showing real metrics
- [ ] Documentation 100% complete

---

**Criado por:** River 🌊

