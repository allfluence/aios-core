# Agent Selection Guide

> **EN** | [PT](../pt/guides/agent-selection-guide.md) | [ES](../es/guides/agent-selection-guide.md)

---

## Quick Reference for Choosing the Right Agent

**Last Updated:** 2025-01-15 (Story 6.1.2.3)

---

## Quick Decision Tree

```
Need research/analysis? → @analyst
   ↓
Need PRD/epic? → @pm
   ↓
Need architecture? → @architect
   ↓
Need database? → @data-engineer
   ↓
Need stories? → @sm
   ↓
Need implementation? → @dev
   ↓
Need testing? → @qa
   ↓
Need deployment? → @github-devops
```

---

## Agent Quick Reference

| Agent | Icon | Use For | NOT For |
|-------|------|---------|---------|
| **@analyst** (Atlas) | 🔍 | Market research, competitive analysis, brainstorming | PRD creation, architecture, stories |
| **@pm** (Morgan) | 📋 | PRD, epics, product strategy, roadmap | Research, architecture, detailed stories |
| **@architect** (Aria) | 🏛️ | System architecture, API design, tech stack | Research, PRD, database schema |
| **@data-engineer** (Dara) | 📊 | Database schema, RLS, migrations, query optimization | App architecture, DB tech selection |
| **@sm** (River) | 🌊 | User stories, sprint planning, backlog grooming | PRD, epics, research, implementation |
| **@dev** (Dex) | 💻 | Story implementation, coding, testing | Story creation, deployment |
| **@qa** (Quinn) | 🧪 | Code review, testing, quality assurance | Implementation |
| **@po** (Pax) | 🎯 | Backlog management, acceptance criteria, prioritization | Epic creation, architecture |
| **@ux-design-expert** (Nova) | 🎨 | UI/UX design, wireframes, design systems | Implementation |
| **@github-devops** (Gage) | ⚙️ | Git ops, PR creation, deployment, CI/CD | Local Git, implementation |
| **@aios-master** (Orion) | 👑 | Framework development, multi-agent orchestration | Routine tasks (use specialized agents) |

---

## Common Scenarios

### "I want to build a new feature"

```
1. @analyst *research - Market research
2. @pm *create-prd - Product requirements
3. @architect *create-architecture - Technical design
4. @data-engineer *create-schema - Database design
5. @sm *create-next-story - User stories
6. @dev *develop - Implementation
7. @qa *review - Quality check
8. @github-devops *create-pr - Deployment
```

### "I need to understand existing system"

```
1. @analyst *document-project - Brownfield documentation
2. @pm *create-prd (brownfield) - Document as PRD
3. @architect *create-architecture (brownfield) - Technical architecture
```

### "I want to optimize database"

```
1. @data-engineer *security-audit - Check RLS and schema
2. @data-engineer *analyze-performance hotpaths - Find bottlenecks
3. @data-engineer *create-migration-plan - Plan optimizations
4. @data-engineer *apply-migration - Apply changes
```

---

## Delegation Patterns (Story 6.1.2.3)

### Epic/Story Creation

- **PM creates epic** → **SM creates stories**
  ```
  @pm *create-epic         # Epic structure
  @sm *create-next-story   # Detailed stories
  ```

### Database Work

- **Architect selects DB** → **Data-engineer designs schema**
  ```
  @architect *create-architecture  # DB technology selection
  @data-engineer *create-schema    # Schema design
  ```

### Research → Product

- **Analyst researches** → **PM creates PRD**
  ```
  @analyst *research               # Market analysis
  @pm *create-prd                  # Product document
  ```

---

## Full Documentation

For detailed boundaries and "NOT for" guidance, see:
- `docs/analysis/agent-responsibility-matrix.md` *(coming soon)* - Complete boundary definitions
- `docs/guides/command-migration-guide.md` *(coming soon)* - Command changes and migrations

---

**Version:** 1.0 | **Story:** 6.1.2.3
