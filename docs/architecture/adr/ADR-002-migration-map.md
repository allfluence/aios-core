# ADR-002: Migration Map - AIOS v2.0 to v2.1

> **EN**

---

**Story:** ARCH-002
**Date:** 2025-12-09
**Status:** Accepted
**Author:** @architect

---

## Context

AIOS v2.1 introduces significant architectural changes including modular architecture (4 modules), multi-repository strategy, 3-layer quality gates, and the transition from "Expansion Packs" to "Squads". A clear migration map is essential to guide users through the upgrade process.

---

## Decision

Define a comprehensive migration map documenting all breaking changes, deprecated features, and step-by-step migration instructions from v2.0 to v2.1.

---

## Migration Map

### Directory Structure Changes

| v2.0 Path                     | v2.1 Path             | Action                |
| ----------------------------- | --------------------- | --------------------- |
| `expansion-packs/`            | `squads/`             | Rename directory      |
| `expansion-packs/*/pack.yaml` | `squads/*/squad.yaml` | Rename manifest files |
| `.aios/`                      | `.aios-core/`         | Reorganized structure |

### Package Scope Changes

| v2.0 Package         | v2.1 Package          | Action              |
| -------------------- | --------------------- | ------------------- |
| `@synkra/aios-core`  | `@aios/core`          | Update package.json |
| `@expansion/etl`     | `@aios/squad-etl`     | Update imports      |
| `@expansion/creator` | `@aios/squad-creator` | Update imports      |

### Configuration Changes

| v2.0 Setting     | v2.1 Setting       | Notes                                    |
| ---------------- | ------------------ | ---------------------------------------- |
| `version: '2.0'` | `version: '2.1'`   | Update in .aios-installation-config.yaml |
| N/A              | `quality_gates:`   | New section required                     |
| N/A              | `squad_discovery:` | New section required                     |

### Terminology Changes

| v2.0 Term      | v2.1 Term      |
| -------------- | -------------- |
| Expansion Pack | Squad          |
| pack.yaml      | squad.yaml     |
| @expansion/\*  | @aios/squad-\* |

---

## New Features in v2.1

### 1. Modular Architecture (4 Modules)

```
.aios-core/
├── core/              # Foundation (no dependencies)
├── development/       # Agents, tasks, workflows
├── product/           # Templates, checklists
└── infrastructure/    # Scripts, tools, integrations
```

### 2. Quality Gates (3 Layers)

| Layer   | Executor           | Tool                | Coverage          |
| ------- | ------------------ | ------------------- | ----------------- |
| Layer 1 | Worker             | Husky + lint-staged | 30%               |
| Layer 2 | Agent + CodeRabbit | GitHub Actions      | +50% (80% total)  |
| Layer 3 | Human              | CODEOWNERS          | +20% (100% total) |

### 3. Story Template v2.0

New required sections:

- Cross-Story Decisions
- CodeRabbit Integration
- Dev Agent Record

### 4. Service Discovery

```bash
aios workers search "pattern"
aios workers use worker-name --task my-task
```

---

## Migration Steps

### Phase 1: Dependencies (30 min)

```bash
# Step 1.1: Remove old packages
npm uninstall @synkra/aios-core
npm uninstall @expansion/etl @expansion/creator

# Step 1.2: Install new packages
npm install @aios/core@^2.1.0
npm install @aios/squad-etl @aios/squad-creator  # if needed
```

### Phase 2: Directory Restructure (15 min)

```bash
# Step 2.1: Rename expansion-packs to squads
if [ -d "expansion-packs" ]; then
  mv expansion-packs squads
fi

# Step 2.2: Rename pack.yaml to squad.yaml
find squads -name "pack.yaml" -exec sh -c \
  'mv "$1" "$(dirname "$1")/squad.yaml"' _ {} \;
```

### Phase 3: Configuration Update (15 min)

Add to `.aios-installation-config.yaml`:

```yaml
version: '2.1'

quality_gates:
  layer1_enabled: true
  layer2_enabled: true
  layer3_enabled: true

squad_discovery:
  local: true
  remote: false
```

### Phase 4: Quality Gates Setup (30 min)

```bash
# Step 4.1: Install pre-commit tools
npm install -D husky lint-staged

# Step 4.2: Initialize Husky
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"

# Step 4.3: Configure lint-staged in package.json
# Add "lint-staged" configuration
```

### Phase 5: Story Template Update (Variable)

For each story in `docs/stories/`:

1. Add Cross-Story Decisions section after metadata
2. Add CodeRabbit Integration section
3. Ensure QA Results section exists

### Phase 6: Reference Updates (15 min)

```bash
# Find and update old references
grep -r "expansion-pack" --include="*.md" --include="*.yaml"

# Automated replacement
find . -type f \( -name "*.md" -o -name "*.yaml" \) \
  -exec sed -i '' 's/expansion-pack/squad/g' {} +
```

### Phase 7: Validation (15 min)

```bash
# Run validation
npx @aios/core validate

# Run tests
npm test

# Check for deprecated references
grep -r "@synkra/aios-core" --include="*.json"
grep -r "expansion-pack" --include="*.md"
```

---

## Deprecation Schedule

| Deprecated Feature  | Replacement         | Removal Version |
| ------------------- | ------------------- | --------------- |
| `expansion-packs/`  | `squads/`           | v3.0.0          |
| `pack.yaml`         | `squad.yaml`        | v3.0.0          |
| `@expansion/*`      | `@aios/squad-*`     | v3.0.0          |
| Single-layer QG     | 3-layer QG          | v3.0.0          |
| Story Template v1.0 | Story Template v2.0 | v3.0.0          |

---

## Rollback Procedure

If migration fails:

```bash
# Step 1: Restore package.json from git
git checkout HEAD -- package.json package-lock.json

# Step 2: Reinstall dependencies
npm install

# Step 3: Restore directory structure
if [ -d "squads" ]; then
  mv squads expansion-packs
fi

# Step 4: Restore configuration
git checkout HEAD -- .aios-installation-config.yaml
```

---

## Consequences

### Positive

- Clear upgrade path for existing users
- Modular architecture enables selective adoption
- Better separation of concerns
- Community contribution path via squads

### Negative

- Breaking changes require migration effort
- Documentation needs updating
- Existing CI/CD pipelines need adjustment

### Neutral

- Learning curve for new terminology
- Multiple packages to manage

---

## Related Documents

- [Migration Guide v2.0 to v2.1](../../migration/v2.0-to-v2.1.md)
- [Multi-Repo Strategy](../multi-repo-strategy.md)
- [High-Level Architecture](../high-level-architecture.md)

---

_Migration map defined as part of AIOS v2.1 architecture planning._
