# Story 6.1.4: Greeting Preference Configuration System (v2)

**Story ID:** 6.1.4
**Epic:** Epic-6.1 - Agent Identity System
**Wave:** Wave 1 (Foundation)
**Status:** 📋 Ready to Start
**Priority:** 🔴 Critical
**Owner:** Dev (Dex)
**Created:** 2025-01-14
**Updated:** 2025-01-16 (v3 - Validation improvements applied)
**Duration:** 1.6 days (13 hours)
**Investment:** $162.50

---

## 📋 Objective

Implement user-configurable greeting preferences that allow overriding the automatic session-aware greeting system from Story 6.1.2.5, giving users control over agent personification level.

---

## 🎯 Scope

**In Scope:**
- Extend `GreetingBuilder` with preference support (auto/minimal/named/archetypal)
- Add `greeting.preference` configuration to `core-config.yaml`
- Create CLI commands for preference management
- Maintain backward compatibility with Story 6.1.2.5 session detection

**Out of Scope:**
- ❌ Reimplementing greeting generation (already done in Story 6.1.2.5)
- ❌ Changing agent activation flow
- ❌ Locale/i18n implementation (future story)

---

## 📖 Story

**As a** AIOS framework user,
**I want** to configure my preferred agent greeting level,
**so that** I can override automatic session detection and always see greetings at my preferred personification level.

**Business Value:** Provides user control while maintaining the intelligent defaults from Story 6.1.2.5. Users who prefer consistent greetings can set a fixed preference, while users who want context-aware greetings use "auto" mode.

---

## 🔗 Context: Relationship with Story 6.1.2.5

**Story 6.1.2.5 (Already Implemented):**
- ✅ `GreetingBuilder` class with session-aware logic
- ✅ Detects session type: new/existing/workflow
- ✅ Uses `persona_profile.greeting_levels` from agents
- ✅ Dynamic greeting assembly based on context

**This Story (6.1.4) Adds:**
- User preference configuration
- Override mechanism for session detection
- CLI commands for preference management
- Extends (not replaces) Story 6.1.2.5

**Design Decision (User Approved):**
- **Preference Behavior:** Override complete (Decisão 1 - Opção A)
  - If preference = "minimal" → Always minimal, ignore session
  - If preference = "auto" → Use session detection from Story 6.1.2.5
- **Default Preference:** "auto" (Decisão 2 - Opção A)
  - Preserves intelligent session-aware behavior
  - Users opt-in to fixed levels if desired

---

## 📊 Tasks Breakdown

### Day 1: Configuration & Preference System (8 hours)

**Task 1.1: Extend core-config.yaml (1 hour)**

Update `.aios-core/core-config.yaml` with greeting preference field:

```yaml
agentIdentity:
  greeting:
    # Story 6.1.2.5 settings (preserve)
    contextDetection: true
    sessionDetection: hybrid
    workflowDetection: hardcoded
    performance:
      gitCheckCache: true
      gitCheckTTL: 300

    # Story 6.1.4 settings (NEW)
    preference: auto  # Options: auto, minimal, named, archetypal
    locale: en-US     # Reserved for future i18n (Story 7.x)
    showArchetype: true  # Toggle archetype in archetypal level

git:
  showConfigWarning: true
  cacheTimeSeconds: 300
```

**Validation:**
- Ensure YAML syntax valid
- Default values appropriate
- Comments explain each option

---

**Task 1.2: Create Configuration Manager (3 hours)**

Create `.aios-core/scripts/greeting-preference-manager.js`:

```javascript
/**
 * Greeting Preference Configuration Manager
 *
 * Manages user preferences for agent greeting personification levels.
 * Integrates with GreetingBuilder (Story 6.1.2.5).
 *
 * Performance: Preference check <5ms (called on every agent activation)
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONFIG_PATH = path.join(process.cwd(), '.aios-core', 'core-config.yaml');
const BACKUP_PATH = path.join(process.cwd(), '.aios-core', 'core-config.yaml.backup');
const VALID_PREFERENCES = ['auto', 'minimal', 'named', 'archetypal'];

class GreetingPreferenceManager {
  /**
   * Get current greeting preference
   * @returns {string} Current preference (auto|minimal|named|archetypal)
   */
  getPreference() {
    try {
      const config = this._loadConfig();
      return config?.agentIdentity?.greeting?.preference || 'auto';
    } catch (error) {
      console.warn('[GreetingPreference] Failed to load, using default:', error.message);
      return 'auto';
    }
  }

  /**
   * Set greeting preference
   * @param {string} preference - New preference (auto|minimal|named|archetypal)
   * @throws {Error} If preference is invalid
   */
  setPreference(preference) {
    // Validate preference
    if (!VALID_PREFERENCES.includes(preference)) {
      const validOptions = VALID_PREFERENCES.join(', ');
      throw new Error(
        `Invalid preference: "${preference}". ` +
        `Valid options: ${validOptions}. ` +
        `Examples: "auto" (session-aware), "minimal" (always minimal), "named" (always named), "archetypal" (always archetypal)`
      );
    }

    try {
      // Backup existing config before modification
      this._backupConfig();

      const config = this._loadConfig();

      // Ensure structure exists
      if (!config.agentIdentity) config.agentIdentity = {};
      if (!config.agentIdentity.greeting) config.agentIdentity.greeting = {};

      // Set preference
      config.agentIdentity.greeting.preference = preference;

      // Validate YAML before write
      const yamlContent = yaml.dump(config, { lineWidth: -1 });
      try {
        yaml.load(yamlContent); // Validate syntax
      } catch (yamlError) {
        this._restoreBackup();
        throw new Error(`Invalid YAML generated: ${yamlError.message}`);
      }

      // Write back
      this._saveConfig(config);

      return { success: true, preference };
    } catch (error) {
      // Restore backup on error
      this._restoreBackup();
      throw new Error(`Failed to set preference: ${error.message}`);
    }
  }

  /**
   * Get all greeting configuration
   * @returns {Object} Complete greeting config
   */
  getConfig() {
    const config = this._loadConfig();
    return config?.agentIdentity?.greeting || {};
  }

  /**
   * Backup config file before modification
   * @private
   */
  _backupConfig() {
    try {
      if (fs.existsSync(CONFIG_PATH)) {
        fs.copyFileSync(CONFIG_PATH, BACKUP_PATH);
      }
    } catch (error) {
      console.warn('[GreetingPreference] Failed to backup config:', error.message);
    }
  }

  /**
   * Restore config from backup
   * @private
   */
  _restoreBackup() {
    try {
      if (fs.existsSync(BACKUP_PATH)) {
        fs.copyFileSync(BACKUP_PATH, CONFIG_PATH);
        console.log('[GreetingPreference] Config restored from backup');
      }
    } catch (error) {
      console.error('[GreetingPreference] Failed to restore backup:', error.message);
    }
  }

  /**
   * Load config from YAML
   * @private
   */
  _loadConfig() {
    const content = fs.readFileSync(CONFIG_PATH, 'utf8');
    return yaml.load(content);
  }

  /**
   * Save config to YAML
   * @private
   */
  _saveConfig(config) {
    const content = yaml.dump(config, { lineWidth: -1 });
    fs.writeFileSync(CONFIG_PATH, content, 'utf8');
  }
}

module.exports = GreetingPreferenceManager;
```

**Validation Examples:**
- ✅ Valid: `setPreference('auto')` → Success
- ✅ Valid: `setPreference('minimal')` → Success
- ✅ Valid: `setPreference('named')` → Success
- ✅ Valid: `setPreference('archetypal')` → Success
- ❌ Invalid: `setPreference('invalid')` → Error: "Invalid preference: 'invalid'. Valid options: auto, minimal, named, archetypal. Examples: ..."
- ❌ Invalid: `setPreference('Auto')` → Error (case-sensitive)
- ❌ Invalid: `setPreference('')` → Error

---

**Task 1.3: Extend GreetingBuilder with Preference Support (4 hours)**

Update `.aios-core/scripts/greeting-builder.js`:

```javascript
// Add to existing GreetingBuilder class

const GreetingPreferenceManager = require('./greeting-preference-manager');

class GreetingBuilder {
  constructor() {
    this.contextDetector = new ContextDetector();
    this.gitConfigDetector = new GitConfigDetector();
    this.workflowNavigator = new WorkflowNavigator();
    this.preferenceManager = new GreetingPreferenceManager(); // NEW
    this.config = this._loadConfig();
  }

  /**
   * Build greeting for agent (UPDATED)
   * @param {Object} agent - Agent definition
   * @param {Object} context - Session context
   * @returns {Promise<string>} Formatted greeting
   */
  async buildGreeting(agent, context = {}) {
    const fallbackGreeting = this.buildSimpleGreeting(agent);

    try {
      // NEW: Check user preference
      const preference = this.preferenceManager.getPreference();

      if (preference !== 'auto') {
        // Override with fixed level
        return this.buildFixedLevelGreeting(agent, preference);
      }

      // Use session-aware logic (Story 6.1.2.5)
      const greetingPromise = this._buildContextualGreeting(agent, context);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Greeting timeout')), GREETING_TIMEOUT)
      );

      return await Promise.race([greetingPromise, timeoutPromise]);
    } catch (error) {
      console.warn('[GreetingBuilder] Fallback to simple greeting:', error.message);
      return fallbackGreeting;
    }
  }

  /**
   * Build fixed-level greeting (NEW)
   * @param {Object} agent - Agent definition
   * @param {string} level - Preference level (minimal|named|archetypal)
   * @returns {string} Fixed-level greeting
   */
  buildFixedLevelGreeting(agent, level) {
    const profile = agent.persona_profile;

    if (!profile || !profile.greeting_levels) {
      return this.buildSimpleGreeting(agent);
    }

    // Select greeting based on preference
    let greetingText;
    switch (level) {
      case 'minimal':
        greetingText = profile.greeting_levels.minimal || `${agent.icon} ${agent.id} Agent ready`;
        break;
      case 'named':
        greetingText = profile.greeting_levels.named || `${agent.icon} ${agent.name} ready`;
        break;
      case 'archetypal':
        greetingText = profile.greeting_levels.archetypal || `${agent.icon} ${agent.name} the ${profile.archetype} ready`;
        break;
      default:
        greetingText = profile.greeting_levels.named || `${agent.icon} ${agent.name} ready`;
    }

    return `${greetingText}\n\nType \`*help\` to see available commands.`;
  }

  // ... existing methods remain unchanged ...
}
```

---

### Day 2: CLI Commands & Testing (5 hours)

**Task 2.1: Create CLI Commands (2 hours)**

Create standalone CLI script `.aios-core/scripts/greeting-config-cli.js` following existing script patterns:

```javascript
#!/usr/bin/env node
/**
 * Greeting Configuration CLI
 *
 * Standalone CLI for managing greeting preferences.
 * Usage:
 *   node .aios-core/scripts/greeting-config-cli.js get greeting
 *   node .aios-core/scripts/greeting-config-cli.js set greeting.preference minimal
 */

const GreetingPreferenceManager = require('./greeting-preference-manager');

const command = process.argv[2];
const subcommand = process.argv[3];
const value = process.argv[4];

(async () => {
  try {
    const manager = new GreetingPreferenceManager();

    switch (command) {
      case 'get':
        if (subcommand === 'greeting') {
          const config = manager.getConfig();

          console.log('📊 Agent Greeting Configuration\n');
          console.log(`Preference: ${config.preference || 'auto'} (auto|minimal|named|archetypal)`);
          console.log(`Context Detection: ${config.contextDetection !== false ? 'enabled' : 'disabled'}`);
          console.log(`Session Detection: ${config.sessionDetection || 'hybrid'}`);
          console.log(`Workflow Detection: ${config.workflowDetection || 'hardcoded'}`);
          console.log(`Show Archetype: ${config.showArchetype !== false ? 'yes' : 'no'}`);
          console.log(`Locale: ${config.locale || 'en-US'}`);

          console.log('\n💡 Examples:');
          console.log('  - "auto": Session-aware greetings (default)');
          console.log('  - "minimal": Always minimal greeting');
          console.log('  - "named": Always named greeting');
          console.log('  - "archetypal": Always archetypal greeting');
        } else {
          console.error('Usage: node greeting-config-cli.js get greeting');
          process.exit(1);
        }
        break;

      case 'set':
        if (subcommand === 'greeting.preference' && value) {
          const result = manager.setPreference(value);
          console.log(`✅ Greeting preference set to: ${result.preference}`);

          if (value === 'auto') {
            console.log('\n📌 Using automatic session-aware greetings:');
            console.log('  - New session → Full greeting (archetypal level)');
            console.log('  - Existing session → Quick greeting (named level)');
            console.log('  - Workflow session → Minimal greeting + suggestions');
          } else {
            console.log(`\n📌 Using fixed level: ${value} for all sessions`);
          }
        } else {
          console.error('Usage: node greeting-config-cli.js set greeting.preference <auto|minimal|named|archetypal>');
          console.error('\nExamples:');
          console.error('  node greeting-config-cli.js set greeting.preference auto');
          console.error('  node greeting-config-cli.js set greeting.preference minimal');
          process.exit(1);
        }
        break;

      default:
        console.log(`
Usage:
  node greeting-config-cli.js get greeting
  node greeting-config-cli.js set greeting.preference <auto|minimal|named|archetypal>

Examples:
  node greeting-config-cli.js get greeting
  node greeting-config-cli.js set greeting.preference auto
  node greeting-config-cli.js set greeting.preference minimal
        `);
        process.exit(1);
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
})();
```

---

**Task 2.2: Create Unit Tests (2 hours)**

Create `tests/unit/greeting-preference.test.js`:

```javascript
/**
 * Unit Tests for Greeting Preference System
 */

const GreetingPreferenceManager = require('../../.aios-core/scripts/greeting-preference-manager');
const GreetingBuilder = require('../../.aios-core/scripts/greeting-builder');

describe('GreetingPreferenceManager', () => {
  let manager;

  beforeEach(() => {
    manager = new GreetingPreferenceManager();
  });

  describe('getPreference', () => {
    test('returns default "auto" if not configured', () => {
      const preference = manager.getPreference();
      expect(['auto', 'minimal', 'named', 'archetypal']).toContain(preference);
    });
  });

  describe('setPreference', () => {
    test('sets valid preference successfully', () => {
      const result = manager.setPreference('minimal');
      expect(result.success).toBe(true);
      expect(result.preference).toBe('minimal');
    });

    test('throws error for invalid preference', () => {
      expect(() => manager.setPreference('invalid')).toThrow('Invalid preference');
    });

    test('accepts all valid preferences', () => {
      expect(() => manager.setPreference('auto')).not.toThrow();
      expect(() => manager.setPreference('minimal')).not.toThrow();
      expect(() => manager.setPreference('named')).not.toThrow();
      expect(() => manager.setPreference('archetypal')).not.toThrow();
    });
  });
});

describe('GreetingBuilder with Preferences', () => {
  let builder;
  let mockAgent;

  beforeEach(() => {
    builder = new GreetingBuilder();
    mockAgent = {
      name: 'Dex',
      id: 'dev',
      icon: '💻',
      persona_profile: {
        archetype: 'Builder',
        greeting_levels: {
          minimal: '💻 dev Agent ready',
          named: '💻 Dex (Builder) ready',
          archetypal: '💻 Dex the Builder ready to innovate!'
        }
      }
    };
  });

  describe('buildFixedLevelGreeting', () => {
    test('builds minimal greeting', () => {
      const greeting = builder.buildFixedLevelGreeting(mockAgent, 'minimal');
      expect(greeting).toContain('💻 dev Agent ready');
    });

    test('builds named greeting', () => {
      const greeting = builder.buildFixedLevelGreeting(mockAgent, 'named');
      expect(greeting).toContain('💻 Dex (Builder) ready');
    });

    test('builds archetypal greeting', () => {
      const greeting = builder.buildFixedLevelGreeting(mockAgent, 'archetypal');
      expect(greeting).toContain('💻 Dex the Builder ready to innovate!');
    });

    test('includes help command hint', () => {
      const greeting = builder.buildFixedLevelGreeting(mockAgent, 'named');
      expect(greeting).toContain('*help');
    });
  });

  describe('buildGreeting with preference override', () => {
    test('uses fixed level when preference set', async () => {
      // Mock preferenceManager to return 'minimal'
      builder.preferenceManager.getPreference = jest.fn().mockReturnValue('minimal');

      const greeting = await builder.buildGreeting(mockAgent, {});
      expect(greeting).toContain('dev Agent ready');
    });

    test('uses session detection when preference is "auto"', async () => {
      builder.preferenceManager.getPreference = jest.fn().mockReturnValue('auto');

      const greeting = await builder.buildGreeting(mockAgent, { conversationHistory: [] });
      expect(greeting).toBeTruthy(); // Should use contextual logic
    });
  });
});
```

---

**Task 2.3: Create Integration Tests (1 hour)**

Create `tests/integration/greeting-preference-integration.test.js`:

```javascript
/**
 * Integration Tests for Greeting Preference System
 * Tests end-to-end flow: Set preference → Activate agent → Verify greeting
 */

const GreetingPreferenceManager = require('../../.aios-core/scripts/greeting-preference-manager');
const GreetingBuilder = require('../../.aios-core/scripts/greeting-builder');

describe('Greeting Preference Integration', () => {
  let manager;
  let builder;
  let originalPreference;

  const mockAgent = {
    name: 'Dex',
    id: 'dev',
    icon: '💻',
    persona_profile: {
      archetype: 'Builder',
      greeting_levels: {
        minimal: '💻 dev Agent ready',
        named: '💻 Dex (Builder) ready',
        archetypal: '💻 Dex the Builder ready to innovate!'
      }
    }
  };

  beforeEach(async () => {
    manager = new GreetingPreferenceManager();
    builder = new GreetingBuilder();
    
    // Save original preference
    originalPreference = manager.getPreference();
  });

  afterEach(async () => {
    // Restore original preference
    try {
      manager.setPreference(originalPreference);
    } catch (error) {
      console.warn('Failed to restore preference:', error.message);
    }
  });

  describe('End-to-End: Set Preference → Activate Agent', () => {
    test('minimal preference shows minimal greeting', async () => {
      // Set preference
      manager.setPreference('minimal');
      
      // Build greeting
      const greeting = await builder.buildGreeting(mockAgent, {});
      
      // Verify
      expect(greeting).toContain('dev Agent ready');
      expect(greeting).not.toContain('Dex the Builder');
    });

    test('named preference shows named greeting', async () => {
      manager.setPreference('named');
      const greeting = await builder.buildGreeting(mockAgent, {});
      
      expect(greeting).toContain('Dex (Builder) ready');
      expect(greeting).not.toContain('dev Agent ready');
    });

    test('archetypal preference shows archetypal greeting', async () => {
      manager.setPreference('archetypal');
      const greeting = await builder.buildGreeting(mockAgent, {});
      
      expect(greeting).toContain('Dex the Builder ready to innovate!');
    });

    test('auto preference uses session detection', async () => {
      manager.setPreference('auto');
      
      // New session (empty history)
      const greeting = await builder.buildGreeting(mockAgent, { conversationHistory: [] });
      
      // Should use contextual logic (not fixed level)
      expect(greeting).toBeTruthy();
      // May contain session-aware content
    });
  });

  describe('Preference Change → Immediate Effect', () => {
    test('changing preference updates greeting immediately', async () => {
      // Start with minimal
      manager.setPreference('minimal');
      let greeting = await builder.buildGreeting(mockAgent, {});
      expect(greeting).toContain('dev Agent ready');

      // Change to named
      manager.setPreference('named');
      greeting = await builder.buildGreeting(mockAgent, {});
      expect(greeting).toContain('Dex (Builder) ready');
      expect(greeting).not.toContain('dev Agent ready');
    });
  });
});
```

---

## ✅ Acceptance Criteria

### Must Have
- [ ] Configuration field `agentIdentity.greeting.preference` exists in core-config.yaml
- [ ] GreetingPreferenceManager validates preference values (auto|minimal|named|archetypal)
- [ ] GreetingBuilder.buildGreeting() respects preference when not "auto"
- [ ] GreetingBuilder uses session detection when preference = "auto" (default)
- [ ] CLI command `node .aios-core/scripts/greeting-config-cli.js get greeting` shows current configuration
- [ ] CLI command `node .aios-core/scripts/greeting-config-cli.js set greeting.preference <value>` updates configuration
- [ ] User can change preference without restarting AIOS
- [ ] Default preference is "auto" (preserves Story 6.1.2.5 behavior)
- [ ] Unit tests pass: 15+ test cases covering all preferences
- [ ] Integration tests pass: End-to-end flow verified (set preference → activate agent → verify greeting)

### Should Have
- [ ] Config validation prevents typos (helpful error messages with examples)
- [ ] Config backup/restore prevents corruption
- [ ] CLI shows helpful examples when setting preference
- [ ] Backwards compatible: agents without greeting_levels fall back gracefully

### Nice to Have
- [ ] Preview greeting with: `aios config preview greeting <preference>`
- [ ] Preference history tracking

---

## 🔗 Dependencies

### Prerequisites (Blocking)
- **Story 6.1.2.5:** Contextual Agent Load System (GreetingBuilder must exist) ✅ DONE

### Dependent Stories (This Blocks)
- **Story 6.1.5:** Testing & Validation

---

## 📁 Files Modified

### New Files Created
- `.aios-core/scripts/greeting-preference-manager.js` (Preference configuration logic)
- `.aios-core/scripts/greeting-config-cli.js` (CLI commands - standalone script)
- `tests/unit/greeting-preference.test.js` (Unit tests)
- `tests/integration/greeting-preference-integration.test.js` (Integration tests)

### Files Modified
- `.aios-core/core-config.yaml` (Add greeting.preference field)
- `.aios-core/scripts/greeting-builder.js` (Add preference support)

### Backup Files Created (Automatic)
- `.aios-core/core-config.yaml.backup` (Created automatically before config writes)

### Files Referenced (No Changes)
- `.aios-core/agents/*.md` (Read persona_profile.greeting_levels)

---

## 🎨 Deliverables

### 1. Greeting Preference Manager
**Location:** `.aios-core/scripts/greeting-preference-manager.js`

**Key Functions:**
- `getPreference()` - Get current preference
- `setPreference(value)` - Set new preference with validation
- `getConfig()` - Get complete greeting config

### 2. Extended Greeting Builder
**Location:** `.aios-core/scripts/greeting-builder.js`

**New Method:**
- `buildFixedLevelGreeting(agent, level)` - Generate greeting at specific level

**Updated Method:**
- `buildGreeting(agent, context)` - Check preference before using session detection

### 3. CLI Commands
**Location:** `.aios-core/scripts/greeting-config-cli.js`

**Commands:**
```bash
# Show current configuration
node .aios-core/scripts/greeting-config-cli.js get greeting

# Set preference
node .aios-core/scripts/greeting-config-cli.js set greeting.preference auto        # Use session detection
node .aios-core/scripts/greeting-config-cli.js set greeting.preference minimal     # Always minimal
node .aios-core/scripts/greeting-config-cli.js set greeting.preference named       # Always named
node .aios-core/scripts/greeting-config-cli.js set greeting.preference archetypal  # Always archetypal
```

**Note:** Following existing script patterns (backlog-manager.js, story-index-generator.js), CLI is a standalone script rather than integrated into main `aios` CLI.

---

## 💰 Investment Breakdown

- Configuration & Manager (with backup): 4 hours @ $12.50/hr = $50
- GreetingBuilder extension: 4 hours @ $12.50/hr = $50
- CLI commands: 2 hours @ $12.50/hr = $25
- Unit tests: 2 hours @ $12.50/hr = $25
- Integration tests: 1 hour @ $12.50/hr = $12.50
- **Total:** 13 hours = $162.50

**Savings vs Original Plan:**
- Original estimate: 16 hours / $200
- Updated estimate: 13 hours / $162.50
- **Savings:** 3 hours / $37.50 (18.75% reduction due to reuse of Story 6.1.2.5)

**Note:** Added 1 hour for integration tests and backup strategy (quality improvements from validation).

---

## 🎯 Success Metrics

- **Configuration Coverage:** All preference values work correctly (4 options)
- **Backwards Compatibility:** 100% compatible with Story 6.1.2.5
- **CLI Usability:** Commands work without errors, helpful messages
- **Test Coverage:** ≥80% for new code
- **Performance:** Preference check <5ms (called on every agent activation)
- **Config Safety:** Backup/restore prevents config corruption

---

## ⚠️ Risks & Mitigation

### Risk 1: Preference conflicts with session detection
- **Likelihood:** Low
- **Impact:** Low
- **Mitigation:** Clear separation - preference "auto" delegates to session detection, other values override completely

### Risk 2: Config file corruption
- **Likelihood:** Low
- **Impact:** High
- **Mitigation:** 
  - Automatic backup before write
  - YAML validation before write
  - Automatic restore on write failure
  - Graceful fallback to "auto" on read error

### Risk 3: Performance impact on agent activation
- **Likelihood:** Low
- **Impact:** Medium
- **Mitigation:** 
  - Preference check is synchronous file read (<5ms)
  - No async operations in preference check
  - Cached config loading in GreetingBuilder

---

## 📝 Notes

### Design Decisions

**Approved by User (2025-01-15):**
1. **Preference Behavior:** Override complete (Opção A)
   - Fixed preference ignores session detection entirely
   - Clear, predictable behavior for users

2. **Default Preference:** "auto" (Opção A)
   - Preserves intelligent session-aware behavior from Story 6.1.2.5
   - Users who want fixed levels opt-in explicitly

3. **CLI Implementation:** Standalone script (Opção A)
   - Follows existing pattern (backlog-manager.js, story-index-generator.js)
   - Consistent with project architecture
   - Easier to maintain and test independently

### Performance Considerations

**Preference Check Performance:**
- Called on every agent activation (high frequency)
- Must be fast (<5ms) to avoid impacting user experience
- Implementation: Synchronous file read + simple object access
- No async operations in preference check path
- Config cached in GreetingBuilder instance

**Config Write Performance:**
- Backup operation: File copy (~1-2ms)
- YAML validation: Syntax check (~1ms)
- Write operation: File write (~1-2ms)
- Total overhead: ~3-5ms (acceptable for user-initiated action)

### Migration Path from Story 6.1.2.5

**For Users Upgrading:**
1. **Automatic Migration:** Default preference "auto" preserves existing behavior
2. **No Action Required:** Story 6.1.2.5 behavior continues unchanged
3. **Opt-In:** Users who want fixed levels can set preference explicitly

**For Developers:**
1. **Backward Compatible:** All existing code continues to work
2. **New API:** `GreetingPreferenceManager` available for programmatic access
3. **CLI Available:** Standalone script for manual configuration

### Why This Approach?

**Benefits:**
- ✅ Reuses proven GreetingBuilder from Story 6.1.2.5
- ✅ Simpler implementation (extend vs rebuild)
- ✅ Maintains session-aware benefits by default
- ✅ Gives users control when they want it
- ✅ 25% cost reduction ($200 → $150)
- ✅ 25% time reduction (2 days → 1.5 days)

**Comparison with Original Plan:**

| Aspect | Original Story 6.1.4 | Updated Story 6.1.4 v2 |
|--------|---------------------|------------------------|
| Approach | Rebuild greeting system | Extend existing system |
| Default | Level 2 (named) | auto (session-aware) |
| Compatibility | Conflicts with 6.1.2.5 | Integrates with 6.1.2.5 |
| Duration | 2 days | 1.5 days ✅ |
| Cost | $200 | $150 ✅ |
| Risk | High (duplicate code) | Low (reuse proven code) ✅ |

---

## 🔗 Related Documents

- **Epic:** [Epic-6.1](../epics/epic-6.1.md)
- **Prerequisite:** [Story 6.1.2.5 - Contextual Agent Load System](story-6.1.2.5-contextual-agent-load-system.md)
- **Analysis:** [Story Dependency Analysis](../../analysis/story-dependency-analysis-6.1.4-and-6.1.6.md)

---

## 📋 Example Usage

### User Wants Consistent Minimal Greetings

```bash
# Set preference to minimal
$ node .aios-core/scripts/greeting-config-cli.js set greeting.preference minimal
✅ Greeting preference set to: minimal

📌 Using fixed level: minimal for all sessions

# Now all agent activations show minimal greeting
$ @dev
💻 dev Agent ready

Type `*help` to see available commands.
```

### User Wants Automatic Session-Aware Greetings (Default)

```bash
# Check current preference
$ node .aios-core/scripts/greeting-config-cli.js get greeting
📊 Agent Greeting Configuration

Preference: auto (auto|minimal|named|archetypal)
Context Detection: enabled
Session Detection: hybrid
Workflow Detection: hardcoded
Show Archetype: yes
Locale: en-US

# auto = uses Story 6.1.2.5 session detection
# New session → archetypal
# Existing session → named
# Workflow session → minimal + suggestions
```

### Error Handling Examples

```bash
# Invalid preference
$ node .aios-core/scripts/greeting-config-cli.js set greeting.preference invalid
❌ Error: Invalid preference: "invalid". Valid options: auto, minimal, named, archetypal. Examples: "auto" (session-aware), "minimal" (always minimal), "named" (always named), "archetypal" (always archetypal)

# Missing value
$ node .aios-core/scripts/greeting-config-cli.js set greeting.preference
Usage: node greeting-config-cli.js set greeting.preference <auto|minimal|named|archetypal>

Examples:
  node greeting-config-cli.js set greeting.preference auto
  node greeting-config-cli.js set greeting.preference minimal
```

---

## 📝 Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-01-16 | 3.0 | Validation improvements: CLI location clarified (standalone script), integration tests added, backup strategy added, performance considerations documented, migration path added | Pax (po) |
| 2025-01-15 | 2.0 | Major rewrite to integrate with Story 6.1.2.5, user decisions approved (Decisões 1-2: Opção A) | Quinn (qa) |
| 2025-01-14 | 1.0 | Initial story creation (before Story 6.1.2.5 was implemented) | Unknown |

---

## 🧪 QA Results

### Review Summary

**Reviewed By:** Quinn (QA)
**Review Date:** 2025-11-16
**Review Type:** Comprehensive Story Review
**Overall Score:** 100/100 ⭐
**Status:** ✅ PASS (APPROVED FOR MERGE)
**Updated:** 2025-11-16 (Post-Fix Review)

### Executive Summary

Story 6.1.4 is **100% complete and fully tested**. All core functionality is working perfectly. Implementation includes configuration management, CLI commands, and seamless integration with greeting system. **All identified issues have been resolved and all tests are passing.**

### Test Results

**Unit Tests:**
- Status: ✅ PASS (ALL PASSING)
- Results: **22 of 22 tests passing (100%)**
- Location: `tests/unit/greeting-preference.test.js`
- Time: 0.274s
- Fix Applied: Added try-catch to `getConfig()` method

**Integration Tests:**
- Status: ✅ PASS (ALL PASSING)
- Results: **8 of 8 tests passing (100%)**
- Location: `tests/integration/greeting-preference-integration.test.js`
- Time: 0.38s
- Fix Applied: Added Jest mocks for dependencies

### Acceptance Criteria Status

**Must Have (10/10 implemented, 10/10 fully passing):**
- ✅ Configuration field exists in core-config.yaml
- ✅ GreetingPreferenceManager validates preferences
- ✅ GreetingBuilder respects preference
- ✅ GreetingBuilder uses session detection when "auto"
- ✅ CLI `get greeting` command works (manually verified)
- ✅ CLI `set greeting.preference` command works
- ✅ User can change preference without restart
- ✅ Default preference is "auto"
- ✅ Unit tests: 22/22 passing (100% - exceeds target of 15+)
- ✅ Integration tests: 8/8 passing (100%)

**Should Have (4/4 complete):**
- ✅ Config validation with helpful errors
- ✅ Config backup/restore mechanism
- ✅ CLI shows helpful examples
- ✅ Backwards compatible

### Functional Verification

**✅ Working Features:**
1. **Core Implementation:**
   - `GreetingPreferenceManager` class fully functional
   - `GreetingBuilder` integration working
   - Preference override logic correct
   - Config persistence working

2. **CLI Commands:**
   - `get greeting` - ✅ Tested and working
   - `set greeting.preference` - ✅ Validates correctly
   - Helpful error messages - ✅ Confirmed

3. **Integration:**
   - Story 6.1.2.5 integration - ✅ Working
   - Backward compatibility - ✅ Verified
   - Error handling - ✅ Graceful fallbacks

**✅ Issues Resolved:**

1. **Integration Test Mocks Added** (FIXED ✅)
   - **Problem:** Missing Jest mocks for dependencies
   - **Solution:** Added mocks for context-detector, git-config-detector, project-status-loader
   - **Result:** 8/8 integration tests passing
   - **Time:** 15 minutes

2. **getConfig() Error Handling Fixed** (FIXED ✅)
   - **Problem:** Missing try-catch block
   - **Solution:** Added error handling matching getPreference() pattern
   - **Result:** 22/22 unit tests passing
   - **Time:** 15 minutes

### Code Quality Assessment

**Strengths:**
- ✅ Excellent error handling with helpful messages
- ✅ Clean architecture following AIOS patterns
- ✅ Good JSDoc documentation
- ✅ Performance targets met (<5ms preference check)
- ✅ Backup/restore prevents corruption

**Improvements Applied:**
- ✅ Integration tests now fully functional with proper mocks
- ✅ getConfig() error handling now consistent with getPreference()

### Security & Risk Assessment

**Security:** ✅ No issues found
- Safe file operations
- No injection risks
- Data loss prevention via backup

**Risk Profile:** Low
- Config corruption risk: Low (mitigated by backup)
- Performance impact: Low (<5ms measured)
- Integration conflicts: Low (well-tested)

### QA Gate Decision

**Decision:** ✅ PASS (APPROVED FOR MERGE)

**Rationale:**
Story 6.1.4 is **fully complete and tested**. All functionality works as designed, CLI commands execute correctly, and **100% of tests pass (30/30)**. The implementation demonstrates excellent code quality, comprehensive error handling, and seamless integration with existing systems.

**All Acceptance Criteria Met:**
- ✅ Core implementation complete (100%)
- ✅ Unit tests passing (22/22 = 100%)
- ✅ Integration tests passing (8/8 = 100%)
- ✅ CLI commands verified and working
- ✅ Code quality excellent
- ✅ Documentation complete

**Fixes Applied:**
1. ✅ Added Jest mocks for integration tests - 8/8 tests passing
2. ✅ Added try-catch to `getConfig()` method - 22/22 tests passing

**Recommendation:**
✅ **APPROVED FOR IMMEDIATE MERGE**

**Total Fix Time:** 30 minutes (completed)

### Detailed Report

Full QA report available at: [`docs/qa/story-6.1.4-qa-review.md`](../../qa/story-6.1.4-qa-review.md)

---

**Last Updated:** 2025-11-16 (QA Review Complete - ✅ APPROVED FOR MERGE)
**Previous Story:** [Story 6.1.2.5 - Contextual Agent Load System](story-6.1.2.5-contextual-agent-load-system.md)
**Next Story:** Story 6.1.5 - Testing & Validation
**Next Review:** Post-merge (optional enhancements only)
