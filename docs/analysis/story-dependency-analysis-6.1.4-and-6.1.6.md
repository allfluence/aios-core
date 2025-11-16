# Story Dependency Analysis: 6.1.4 & 6.1.6

**Analysis Date:** 2025-01-15
**Analyzer:** Quinn (QA)
**Purpose:** Determine if Stories 6.1.4 and 6.1.6 need updates based on completed stories 6.1.2.1-6.1.2.5

---

## Executive Summary

**Story 6.1.4 (Personification Level Configuration):** 🔴 **MAJOR UPDATES REQUIRED**
**Story 6.1.6 (Output Formatter Implementation):** 🟡 **MODERATE UPDATES REQUIRED**

Both stories need significant updates to align with the Contextual Agent Load System (Story 6.1.2.5) which has fundamentally changed the greeting generation approach.

---

## Impact Analysis

### Story 6.1.2.5 Impact

**What Was Implemented:**
- ✅ `GreetingBuilder` class with dynamic greeting assembly
- ✅ `ContextDetector` for session type detection (new/existing/workflow)
- ✅ `GitConfigDetector` with caching
- ✅ `WorkflowNavigator` with next-step suggestions
- ✅ Command visibility metadata system (full/quick/key)
- ✅ Workflow patterns with transitions
- ✅ Session state persistence
- ✅ Performance optimization (150ms hard limit)

**Key Architecture Decision:**
Story 6.1.2.5 implemented a **component-based greeting builder** that:
1. Builds greetings dynamically based on context
2. Uses `persona_profile.greeting_levels` from agent files
3. Filters commands by visibility metadata
4. Integrates project status
5. Suggests workflow next steps

---

## Story 6.1.4: Personification Level Configuration System

### Current Scope (Outdated)

**Original Intent:**
- Implement 3-level personification (Minimal, Named, Archetypal)
- User configuration via `core-config.yaml`
- Generate greetings based on level
- CLI commands: `aios config set agentIdentity.level <1|2|3>`

### 🔴 Critical Issues

#### Issue 1: Greeting Generation Already Implemented

**Problem:** Story 6.1.4 plans to create `generateGreeting()` function in `agent-activator.js`, but Story 6.1.2.5 already implemented this in `GreetingBuilder` class.

**Conflict:**
```
Story 6.1.4 (Planned):
- Update aios-core/scripts/agent-activator.js with generateGreeting()
- Implement Level 1: Icon + Role
- Implement Level 2: Icon + Name + Role
- Implement Level 3: Icon + Name + Archetype

Story 6.1.2.5 (Already Done):
- greeting-builder.js with buildGreeting()
- Uses greeting_levels from persona_profile
- Dynamic assembly based on session type
```

**Impact:** BLOCKING - Duplicate implementation

---

#### Issue 2: Configuration System Overlap

**Problem:** Story 6.1.4 plans configuration system, but Story 6.1.2.5 already added `agentIdentity.greeting` section to `core-config.yaml`.

**Current State (Story 6.1.2.5):**
```yaml
# From story-6.1.2.5-contextual-agent-load-system.md
agentIdentity:
  greeting:
    contextDetection: true
    sessionDetection: hybrid
    workflowDetection: hardcoded
    performance:
      gitCheckCache: true
      gitCheckTTL: 300
```

**Story 6.1.4 Planned:**
```yaml
agentIdentity:
  enabled: bool
  level: 1-3
  locale: en-US/pt-BR
  showArchetype: bool
```

**Impact:** MEDIUM - Merge required, not conflict

---

#### Issue 3: Session-Aware Greetings vs Fixed Levels

**Problem:** Story 6.1.2.5 uses **session-aware** greetings (new/existing/workflow), but Story 6.1.4 uses **fixed levels** (1/2/3).

**Conceptual Difference:**

**Story 6.1.2.5 Approach (Already Implemented):**
- **New Session:** Full greeting (archetypal) + role + all commands
- **Existing Session:** Named greeting + context + quick commands
- **Workflow Session:** Minimal greeting + workflow suggestions + key commands

**Story 6.1.4 Approach (Planned):**
- **Level 1:** Always minimal (icon + role)
- **Level 2:** Always named (icon + name + role)
- **Level 3:** Always archetypal (icon + name + archetype)

**Question:** Should personification level OVERRIDE session detection, or should they COMBINE?

Example scenarios:
1. **Override:** User sets Level 1 → Always minimal greeting regardless of session
2. **Combine:** User sets Level 2 → New session uses named, workflow uses minimal

---

### 🔧 Required Changes to Story 6.1.4

#### Change 1: Rename from "Personification Level" to "Greeting Preference"

**New Scope:**
- Allow users to **override** automatic session detection
- Preference options:
  - **Auto (default):** Use GreetingBuilder's session-aware logic
  - **Minimal:** Always use minimal greeting regardless of session
  - **Named:** Always use named greeting regardless of session
  - **Archetypal:** Always use archetypal greeting regardless of session

#### Change 2: Integrate with GreetingBuilder

**Original Task (Outdated):**
```
- Update aios-core/scripts/agent-activator.js with generateGreeting() function
- Implement Level 1/2/3 greeting logic
```

**New Task:**
```
- Update .aios-core/scripts/greeting-builder.js
- Add greetingPreference parameter to buildGreeting()
- If preference = "auto", use session detection (existing logic)
- If preference = "minimal/named/archetypal", force that level
```

**Code Change Example:**
```javascript
// greeting-builder.js (Story 6.1.2.5)
async buildGreeting(agent, context = {}) {
  // NEW: Check user preference
  const preference = this.config?.agentIdentity?.greetingPreference || 'auto';

  if (preference !== 'auto') {
    // Force user preference level
    return this.buildFixedLevelGreeting(agent, preference);
  }

  // Existing session-aware logic
  return this._buildContextualGreeting(agent, context);
}
```

#### Change 3: Update Configuration Schema

**New Schema:**
```yaml
agentIdentity:
  greeting:
    # Story 6.1.2.5 settings (keep)
    contextDetection: true  # Enable/disable session detection
    sessionDetection: hybrid
    workflowDetection: hardcoded

    # Story 6.1.4 settings (add)
    preference: auto  # Options: auto, minimal, named, archetypal
    locale: en-US     # For future i18n
    showArchetype: true  # Toggle archetype display in archetypal level

    # Performance (Story 6.1.2.5)
    performance:
      gitCheckCache: true
      gitCheckTTL: 300
```

#### Change 4: Update CLI Commands

**Original (Outdated):**
```bash
aios config set agentIdentity.level <1|2|3>
```

**New:**
```bash
aios config set agentIdentity.greeting.preference <auto|minimal|named|archetypal>
aios config get agentIdentity.greeting
```

#### Change 5: Remove Duplicate Implementation Tasks

**Remove:**
- ❌ Task: "Implement Level 1: Icon + Role" (already in greeting_levels.minimal)
- ❌ Task: "Implement Level 2: Icon + Name + Role" (already in greeting_levels.named)
- ❌ Task: "Implement Level 3: Icon + Name + Archetype" (already in greeting_levels.archetypal)
- ❌ Task: "Update agent-activator.js with generateGreeting()" (use GreetingBuilder instead)

**Add:**
- ✅ Task: "Add greetingPreference parameter to GreetingBuilder.buildGreeting()"
- ✅ Task: "Implement buildFixedLevelGreeting() for forced preferences"
- ✅ Task: "Update core-config.yaml with preference field"
- ✅ Task: "Add CLI commands for preference management"

---

### 📋 Updated Story 6.1.4 Acceptance Criteria

**Original AC (Outdated):**
- [x] ❌ Configuration system reads/writes core-config.yaml correctly
- [x] ❌ CLI commands work: aios config set/get agentIdentity
- [x] ❌ Greeting logic supports all 3 personification levels
- [x] ❌ User can toggle levels without restarting AIOS
- [x] ❌ Default is Level 2 (Named)

**New AC (Aligned with Story 6.1.2.5):**
- [ ] ✅ Configuration adds `greetingPreference` field to core-config.yaml
- [ ] ✅ CLI commands manage greeting preference (auto/minimal/named/archetypal)
- [ ] ✅ GreetingBuilder respects user preference when set
- [ ] ✅ GreetingBuilder uses session detection when preference = "auto" (default)
- [ ] ✅ User can toggle preference without restarting AIOS
- [ ] ✅ Default is "auto" (session-aware greetings)
- [ ] ✅ Backward compatible: contextDetection=false disables session awareness

---

## Story 6.1.6: Output Formatter Implementation

### Current Scope

**Original Intent:**
- Create `OutputFormatter` class for task execution reports
- Inject agent personality into standardized templates
- Maintain fixed structure (familiaridade + personalização)
- Validate output pattern compliance

### 🟡 Moderate Issues

#### Issue 1: Greeting System Already Uses Personality Injection

**Problem:** Story 6.1.6 plans personality injection system, but Story 6.1.2.5 already implements this for greetings.

**Overlap:**
```
Story 6.1.6 (Planned):
- Load agent persona_profile from agent files
- Select vocabulary words based on archetype
- Generate status messages matching agent tone

Story 6.1.2.5 (Already Done):
- GreetingBuilder loads persona_profile
- Uses greeting_levels, communication.vocabulary
- Generates contextual messages
```

**Impact:** LOW - Different use cases (greetings vs task output), but code reuse opportunity

---

#### Issue 2: Persona Profile Structure Assumed

**Problem:** Story 6.1.6 assumes `archetype-vocabulary.yaml` exists, but Story 6.1.2.5 uses `persona_profile.communication.vocabulary` directly from agent files.

**Story 6.1.6 Reference:**
```javascript
// From story-6.1.6-output-formatter-implementation.md
- Load vocabulary from archetype-vocabulary.yaml
- Select verb from vocabulary
```

**Story 6.1.2.5 Reality:**
```yaml
# From .aios-core/agents/dev.md
persona_profile:
  communication:
    vocabulary:
      - construir
      - implementar
      - desenvolver
```

**Impact:** MEDIUM - Requires clarification on vocabulary source

---

### 🔧 Required Changes to Story 6.1.6

#### Change 1: Reuse GreetingBuilder Patterns

**Recommendation:** Extract shared personality injection logic into a base class.

**Suggested Architecture:**
```
PersonalityInjector (new base class)
├── GreetingBuilder (Story 6.1.2.5) - Uses for greetings
└── OutputFormatter (Story 6.1.6) - Uses for task outputs
```

**Shared Methods:**
- `loadPersonaProfile(agent)`
- `selectVocabulary(archetype, category)`
- `applyTone(message, tone)`

#### Change 2: Clarify Vocabulary Source

**Decision Required:**

**Option A:** Use existing vocabulary in agent files
```yaml
# .aios-core/agents/dev.md
persona_profile:
  communication:
    vocabulary:
      - construir
      - implementar
```

**Option B:** Create centralized vocabulary file
```yaml
# .aios-core/data/archetype-vocabulary.yaml
Builder:
  action_verbs:
    - construir
    - implementar
```

**Recommendation:** Option A (use existing) to avoid duplication

#### Change 3: Update Template Reference

**Original:**
```
- Read .aios-core/data/archetype-vocabulary.yaml
```

**New:**
```
- Read persona_profile.communication.vocabulary from agent file
- Fallback to default verbs if vocabulary missing
```

#### Change 4: Add Performance Alignment

**Story 6.1.6 Performance Target:** <50ms per output generation

**Story 6.1.2.5 Performance Budget:** 150ms total greeting (parallel execution)

**Recommendation:** Add note that OutputFormatter must not exceed 50ms to avoid impacting agent activation total (150ms + 50ms = 200ms acceptable)

---

### 📋 Updated Story 6.1.6 Dependencies

**Original Dependencies:**
- Prerequisites: Story 6.1.2 (Agent File Updates)

**New Dependencies:**
- Prerequisites:
  - Story 6.1.2 (Agent File Updates) ✅
  - Story 6.1.2.5 (Contextual Agent Load System) ✅
- Suggested: Create shared PersonalityInjector base class

---

## Recommendations Summary

### For Story 6.1.4 (Personification Level Configuration)

**Priority:** 🔴 **HIGH - Major Updates Required**

**Required Actions:**
1. ✅ **Rename Story:** "Personification Level Configuration" → "Greeting Preference Configuration"
2. ✅ **Change Scope:** From "3 fixed levels" to "Auto + 3 override preferences"
3. ✅ **Update Architecture:** Integrate with GreetingBuilder instead of creating new generator
4. ✅ **Merge Configuration:** Combine with existing agentIdentity.greeting section
5. ✅ **Update CLI:** Change from level (1-3) to preference (auto/minimal/named/archetypal)
6. ✅ **Remove Duplicate Tasks:** Don't re-implement greeting generation
7. ✅ **Add Integration Tasks:** Extend GreetingBuilder with preference support
8. ✅ **Update AC:** Align acceptance criteria with session-aware approach

**Estimated Impact:**
- Story complexity: REDUCED (reuse vs rebuild)
- Duration: 2 days → 1.5 days (less code to write)
- Risk: REDUCED (builds on proven system)
- Investment: $200 → $150

---

### For Story 6.1.6 (Output Formatter Implementation)

**Priority:** 🟡 **MEDIUM - Moderate Updates Required**

**Required Actions:**
1. ✅ **Add Dependency:** List Story 6.1.2.5 as prerequisite
2. ✅ **Clarify Vocabulary Source:** Use persona_profile.communication.vocabulary (not separate YAML)
3. ✅ **Consider Refactoring:** Extract shared PersonalityInjector base class (optional)
4. ✅ **Update Performance Notes:** Align with Story 6.1.2.5 performance budget
5. ✅ **Add Integration Notes:** Reference GreetingBuilder patterns for consistency

**Estimated Impact:**
- Story complexity: UNCHANGED (different use case)
- Duration: 2 days → 2 days (same)
- Risk: REDUCED (clearer vocabulary source)
- Investment: $200 → $200

---

## Decision Gates Required

### For User

**Gate 1: Story 6.1.4 Approach**
- [ ] **Question:** Should personification preference OVERRIDE or COMBINE with session detection?
  - **Option A (Override):** User sets "minimal" → Always minimal regardless of session
  - **Option B (Combine):** User sets preference as MAX level, session detection chooses lower when appropriate
  - **Recommendation:** Option A (simpler, clearer)

**Gate 2: Story 6.1.4 Default**
- [ ] **Question:** What should be the default greeting preference?
  - **Option A (Auto):** Use session-aware greetings from Story 6.1.2.5
  - **Option B (Named):** Fixed Level 2 as originally planned
  - **Recommendation:** Option A (leverages Story 6.1.2.5 benefits)

**Gate 3: Story 6.1.6 Vocabulary Source**
- [ ] **Question:** Where should vocabulary be stored?
  - **Option A:** Use existing persona_profile.communication.vocabulary in agent files
  - **Option B:** Create centralized archetype-vocabulary.yaml
  - **Recommendation:** Option A (avoid duplication)

**Gate 4: Shared Code Refactoring**
- [ ] **Question:** Should we extract PersonalityInjector base class?
  - **Option A (Yes):** Create shared base class (DRY principle)
  - **Option B (No):** Keep separate implementations (simpler for now)
  - **Recommendation:** Option B for now, consider Option A in future refactoring story

---

## Files Requiring Updates

### Story 6.1.4 Files

**Story File:**
- `docs/stories/aios migration/story-6.1.4.md` - Complete rewrite required

**New Files (Updated Plan):**
- `.aios-core/scripts/greeting-preference-manager.js` - Preference configuration logic
- `tests/unit/greeting-preference.test.js` - Preference system tests

**Modified Files:**
- `.aios-core/scripts/greeting-builder.js` - Add preference support
- `.aios-core/core-config.yaml` - Add greeting.preference field
- `.aios-core/scripts/cli.js` - Add preference commands

**Removed from Plan:**
- ❌ `agent-activator.js` modifications (not needed)

---

### Story 6.1.6 Files

**Story File:**
- `docs/stories/aios migration/story-6.1.6-output-formatter-implementation.md` - Minor updates

**Sections to Update:**
1. **Dependencies:** Add Story 6.1.2.5
2. **Dev Notes → Dependencies:** Update vocabulary reference
3. **Task 1.1:** Clarify vocabulary loading approach
4. **Performance Notes:** Reference Story 6.1.2.5 performance budget

---

## Timeline Impact

**Original Epic 6.1 Timeline:**
```
Story 6.1.2.x → Story 6.1.4 → Story 6.1.6 → Story 6.1.7
```

**Impact Assessment:**

**Story 6.1.4:**
- **Original Estimate:** 2 days / $200
- **New Estimate:** 1.5 days / $150 (simplified due to reuse)
- **Timeline Impact:** -0.5 days ✅ IMPROVEMENT

**Story 6.1.6:**
- **Original Estimate:** 2 days / $200
- **New Estimate:** 2 days / $200 (unchanged)
- **Timeline Impact:** 0 days ⚪ NO CHANGE

**Epic 6.1 Overall:**
- **Timeline:** IMPROVED by 0.5 days
- **Cost:** REDUCED by $50
- **Risk:** REDUCED (reuse proven components)

---

## Conclusion

### Story 6.1.4: Personification Level Configuration System

**Status:** 🔴 **REQUIRES MAJOR UPDATES**

**Summary:**
Story 6.1.4 was written before Story 6.1.2.5 was implemented. Story 6.1.2.5 fundamentally changed greeting generation from static levels to dynamic session-aware assembly. Story 6.1.4 must be rewritten to:
1. Integrate with GreetingBuilder (not replace it)
2. Change from "levels" to "preferences" (auto + 3 overrides)
3. Merge configuration schemas
4. Remove duplicate implementation tasks

**Impact:** POSITIVE - Simplified implementation, reduced effort, lower risk

---

### Story 6.1.6: Output Formatter Implementation

**Status:** 🟡 **REQUIRES MODERATE UPDATES**

**Summary:**
Story 6.1.6 has minor overlaps with Story 6.1.2.5 but serves a different use case (task outputs vs greetings). Updates needed:
1. Add Story 6.1.2.5 as dependency
2. Clarify vocabulary source (use agent files, not separate YAML)
3. Consider code reuse opportunities
4. Align performance expectations

**Impact:** NEUTRAL - Clarification beneficial, no major rework needed

---

## Next Steps

### Immediate Actions

1. **Update Story 6.1.4:**
   - [ ] User decision on Gates 1-2
   - [ ] Rewrite story file with new scope
   - [ ] Update task breakdown
   - [ ] Revise acceptance criteria
   - [ ] Update file list

2. **Update Story 6.1.6:**
   - [ ] User decision on Gate 3
   - [ ] Minor updates to dependencies section
   - [ ] Clarify vocabulary loading in dev notes
   - [ ] Add performance alignment notes

3. **Create Updated Stories:**
   - [ ] Generate story-6.1.4-v2.md with changes
   - [ ] Generate story-6.1.6-v2.md with changes
   - [ ] Archive original versions with "-v1" suffix

---

**Analysis Complete:** 2025-01-15
**Analyzer:** Quinn (QA)
**Confidence:** HIGH (based on comprehensive review of 5 completed stories)
**Recommendation:** Proceed with updates to both stories before implementation
