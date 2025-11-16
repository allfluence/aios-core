# AIOS Framework Documentation

**Status:** Official Framework Standards
**Created:** 2025-01-16 (Story 6.1.2.6)
**Migration Target:** Q2 2026 → `aios/aios-core` repository

---

## 📋 Overview

This directory contains **official AIOS framework documentation** that defines standards, patterns, and structures applicable across all AIOS projects (greenfield and brownfield).

**Purpose**: Separate framework-level documentation from project-specific implementation details.

---

## 📚 Documentation Inventory

| Document | Purpose | Audience |
|----------|---------|----------|
| [**coding-standards.md**](coding-standards.md) | JavaScript/TypeScript standards, naming conventions, code quality rules | All developers |
| [**tech-stack.md**](tech-stack.md) | Technology choices, frameworks, libraries, and tooling standards | Architects, developers |
| [**source-tree.md**](source-tree.md) | Directory structure, file organization, and project layout patterns | All team members |

---

## 🔄 Migration Notice

**⚠️ IMPORTANT**: These documents will migrate to the `aios/aios-core` repository in **Q2 2026** as part of the repository restructuring initiative (Decision 005).

### Migration Timeline

- **Phase 1 (Q1 2026 - Story 6.1.2.6):** ✅ Framework docs separated into `docs/framework/`
- **Phase 2 (Q2 2026):** Framework docs migrate to `aios/aios-core` repository
- **Phase 3 (Q3 2026):** Old `docs/architecture/` copies removed from brownfield project

### Backward Compatibility

For backward compatibility, framework docs remain accessible at **both** locations until Q3 2026:
- **New location** (preferred): `docs/framework/{doc-name}.md`
- **Old location** (deprecated): `docs/architecture/{doc-name}.md`

**References**: Update internal links to use `docs/framework/` to prepare for migration.

---

## 🏗️ Framework vs. Project Documentation

### Framework Documentation (`docs/framework/`)
- **Scope**: Portable across all AIOS projects
- **Examples**: Coding standards, tech stack, source tree structure
- **Lifecycle**: Lives in `aios/aios-core` repository (post-migration)
- **Changes**: Require framework-level approval

### Project Documentation (`docs/architecture/project-decisions/`)
- **Scope**: Specific to brownfield implementation
- **Examples**: Decision analysis, architectural reviews, integration decisions
- **Lifecycle**: Lives in project repository permanently
- **Changes**: Project team decides

---

## 📖 Usage Guidelines

### For Developers
1. **Read framework docs during onboarding** - Understand AIOS standards
2. **Reference during development** - Ensure compliance with framework patterns
3. **Propose changes via PRs** - Framework standards evolve with community input

### For Architects
1. **Maintain framework docs** - Keep standards current and practical
2. **Review PRs for compliance** - Ensure code follows documented standards
3. **Plan migration** - Prepare for Q2 2026 repository split

### For AIOS Framework Maintainers
1. **Version control** - Track changes to framework standards
2. **Migration readiness** - Ensure docs are ready for repository separation
3. **Cross-project consistency** - Apply standards uniformly

---

## 🔗 Related Documents

- **Architecture Decisions**: [`docs/decisions/decision-005-repository-restructuring-FINAL.md`](../decisions/decision-005-repository-restructuring-FINAL.md)
- **Migration Story**: [`docs/stories/aios migration/story-6.1.2.6-framework-config-system.md`](../stories/aios migration/story-6.1.2.6-framework-config-system.md)
- **Project-Specific Docs**: [`docs/architecture/project-decisions/`](../architecture/project-decisions/)

---

**Last Updated**: 2025-01-16
**Maintainer**: AIOS Framework Team
**Questions?** See [Epic 6.1 - Agent Identity System](../epics/epic-6.1-agent-identity-system.md)
