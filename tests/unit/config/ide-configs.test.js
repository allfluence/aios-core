/**
 * Unit tests for IDE Configs Metadata
 *
 * Story 1.4: IDE Selection
 * Tests IDE configuration metadata structure
 */

const {
  IDE_CONFIGS,
  getIDEKeys,
  getIDEConfig,
  isValidIDE,
  getIDEChoices
} = require('../../../src/config/ide-configs');

describe('IDE Configs', () => {
  describe('IDE_CONFIGS', () => {
    it('should have 6 IDE configurations', () => {
      const keys = Object.keys(IDE_CONFIGS);
      expect(keys).toHaveLength(6);
    });

    it('should include all expected IDEs', () => {
      const expectedIDEs = ['cursor', 'windsurf', 'trae', 'zed', 'antigravity', 'continue'];

      expectedIDEs.forEach(ide => {
        expect(IDE_CONFIGS).toHaveProperty(ide);
      });
    });

    it('should have valid structure for each IDE', () => {
      Object.entries(IDE_CONFIGS).forEach(([key, config]) => {
        expect(config).toHaveProperty('name');
        expect(config).toHaveProperty('description');
        expect(config).toHaveProperty('configFile');
        expect(config).toHaveProperty('template');
        expect(config).toHaveProperty('requiresDirectory');
        expect(config).toHaveProperty('format');

        expect(typeof config.name).toBe('string');
        expect(typeof config.description).toBe('string');
        expect(typeof config.configFile).toBe('string');
        expect(typeof config.template).toBe('string');
        expect(typeof config.requiresDirectory).toBe('boolean');
        expect(['text', 'json', 'yaml']).toContain(config.format);
      });
    });

    it('should have correct directory requirements', () => {
      // IDEs that require directories
      expect(IDE_CONFIGS.trae.requiresDirectory).toBe(true);
      expect(IDE_CONFIGS.zed.requiresDirectory).toBe(true);
      expect(IDE_CONFIGS.continue.requiresDirectory).toBe(true);

      // IDEs that do not require directories
      expect(IDE_CONFIGS.cursor.requiresDirectory).toBe(false);
      expect(IDE_CONFIGS.windsurf.requiresDirectory).toBe(false);
      expect(IDE_CONFIGS.antigravity.requiresDirectory).toBe(false);
    });

    it('should have correct file formats', () => {
      expect(IDE_CONFIGS.cursor.format).toBe('text');
      expect(IDE_CONFIGS.windsurf.format).toBe('text');
      expect(IDE_CONFIGS.trae.format).toBe('json');
      expect(IDE_CONFIGS.zed.format).toBe('json');
      expect(IDE_CONFIGS.continue.format).toBe('json');
      expect(IDE_CONFIGS.antigravity.format).toBe('yaml');
    });

    it('should have correct config file paths', () => {
      expect(IDE_CONFIGS.cursor.configFile).toBe('.cursorrules');
      expect(IDE_CONFIGS.windsurf.configFile).toBe('.windsurfrules');
      expect(IDE_CONFIGS.trae.configFile).toContain('.trae');
      expect(IDE_CONFIGS.zed.configFile).toContain('.zed');
      expect(IDE_CONFIGS.continue.configFile).toContain('.continue');
      expect(IDE_CONFIGS.antigravity.configFile).toBe('.antigravity.yaml');
    });

    it('should have template paths', () => {
      Object.values(IDE_CONFIGS).forEach(config => {
        expect(config.template).toMatch(/^templates\/ide\//);
      });
    });
  });

  describe('getIDEKeys', () => {
    it('should return array of IDE keys', () => {
      const keys = getIDEKeys();

      expect(Array.isArray(keys)).toBe(true);
      expect(keys).toHaveLength(6);
    });

    it('should return all IDE keys', () => {
      const keys = getIDEKeys();
      const expectedKeys = ['cursor', 'windsurf', 'trae', 'zed', 'antigravity', 'continue'];

      expectedKeys.forEach(key => {
        expect(keys).toContain(key);
      });
    });
  });

  describe('getIDEConfig', () => {
    it('should return config for valid IDE', () => {
      const config = getIDEConfig('cursor');

      expect(config).toBeDefined();
      expect(config.name).toBe('Cursor');
    });

    it('should return null for invalid IDE', () => {
      const config = getIDEConfig('invalid-ide');

      expect(config).toBeNull();
    });

    it('should return correct config for all IDEs', () => {
      const ides = ['cursor', 'windsurf', 'trae', 'zed', 'antigravity', 'continue'];

      ides.forEach(ide => {
        const config = getIDEConfig(ide);
        expect(config).toBeDefined();
        expect(config).toBe(IDE_CONFIGS[ide]);
      });
    });
  });

  describe('isValidIDE', () => {
    it('should return true for valid IDE', () => {
      expect(isValidIDE('cursor')).toBe(true);
      expect(isValidIDE('windsurf')).toBe(true);
      expect(isValidIDE('trae')).toBe(true);
    });

    it('should return false for invalid IDE', () => {
      expect(isValidIDE('invalid-ide')).toBe(false);
      expect(isValidIDE('')).toBe(false);
      expect(isValidIDE(null)).toBe(false);
      expect(isValidIDE(undefined)).toBe(false);
    });

    it('should return true for all valid IDE keys', () => {
      const keys = getIDEKeys();

      keys.forEach(key => {
        expect(isValidIDE(key)).toBe(true);
      });
    });
  });

  describe('getIDEChoices', () => {
    it('should return array of choices', () => {
      const choices = getIDEChoices();

      expect(Array.isArray(choices)).toBe(true);
      expect(choices).toHaveLength(6);
    });

    it('should have valid choice structure', () => {
      const choices = getIDEChoices();

      choices.forEach(choice => {
        expect(choice).toHaveProperty('name');
        expect(choice).toHaveProperty('value');
        expect(typeof choice.name).toBe('string');
        expect(typeof choice.value).toBe('string');
      });
    });

    it('should include IDE name and description in choice name', () => {
      const choices = getIDEChoices();

      choices.forEach(choice => {
        const ideKey = choice.value;
        const config = getIDEConfig(ideKey);

        expect(choice.name).toContain(config.name);
        expect(choice.name).toContain(config.description);
      });
    });

    it('should use IDE key as choice value', () => {
      const choices = getIDEChoices();
      const keys = getIDEKeys();

      const choiceValues = choices.map(c => c.value);

      keys.forEach(key => {
        expect(choiceValues).toContain(key);
      });
    });
  });
});
