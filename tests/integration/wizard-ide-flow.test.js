/**
 * Integration tests for Wizard IDE Flow
 *
 * Story 1.4: IDE Selection
 * Tests complete flow from selection to config generation
 */

const fs = require('fs-extra');
const path = require('path');
const { generateIDEConfigs } = require('../../src/wizard/ide-config-generator');
const { getIDEConfig } = require('../../src/config/ide-configs');

describe('Wizard IDE Flow Integration', () => {
  const testDir = path.join(__dirname, '..', '..', '.test-temp-integration');

  beforeEach(async () => {
    await fs.ensureDir(testDir);
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  describe('Full flow: select -> generate -> verify', () => {
    it('should complete flow for single IDE (Cursor)', async () => {
      // Simulate wizard state after IDE selection
      const wizardState = {
        projectType: 'greenfield',
        projectName: 'test-project',
        selectedIDEs: ['cursor']
      };

      // Generate configs
      const result = await generateIDEConfigs(
        wizardState.selectedIDEs,
        wizardState,
        { projectRoot: testDir }
      );

      // Verify result
      expect(result.success).toBe(true);
      expect(result.files).toHaveLength(1);

      // Verify file exists
      const configPath = path.join(testDir, '.cursorrules');
      expect(await fs.pathExists(configPath)).toBe(true);

      // Verify content
      const content = await fs.readFile(configPath, 'utf8');
      expect(content).toContain('test-project');
      expect(content).toContain('greenfield');
      expect(content).toContain('AIOS');
    });

    it('should complete flow for multiple IDEs', async () => {
      const wizardState = {
        projectType: 'brownfield',
        projectName: 'multi-ide-project',
        selectedIDEs: ['cursor', 'windsurf', 'trae']
      };

      const result = await generateIDEConfigs(
        wizardState.selectedIDEs,
        wizardState,
        { projectRoot: testDir }
      );

      expect(result.success).toBe(true);
      expect(result.files).toHaveLength(3);

      // Verify all files exist
      expect(await fs.pathExists(path.join(testDir, '.cursorrules'))).toBe(true);
      expect(await fs.pathExists(path.join(testDir, '.windsurfrules'))).toBe(true);
      expect(await fs.pathExists(path.join(testDir, '.trae', 'config.json'))).toBe(true);
    });

    it('should complete flow for all 6 IDEs', async () => {
      const wizardState = {
        projectType: 'greenfield',
        projectName: 'all-ides-project',
        selectedIDEs: ['cursor', 'windsurf', 'trae', 'zed', 'antigravity', 'continue']
      };

      const result = await generateIDEConfigs(
        wizardState.selectedIDEs,
        wizardState,
        { projectRoot: testDir }
      );

      expect(result.success).toBe(true);
      expect(result.files).toHaveLength(6);

      // Verify all config files
      const expectedFiles = [
        '.cursorrules',
        '.windsurfrules',
        path.join('.trae', 'config.json'),
        path.join('.zed', 'settings.json'),
        '.antigravity.yaml',
        path.join('.continue', 'config.json')
      ];

      for (const file of expectedFiles) {
        const filePath = path.join(testDir, file);
        expect(await fs.pathExists(filePath)).toBe(true);
      }
    });
  });

  describe('Config file quality verification', () => {
    it('should generate valid JSON for Trae', async () => {
      const wizardState = {
        projectType: 'greenfield',
        projectName: 'json-test',
        selectedIDEs: ['trae']
      };

      await generateIDEConfigs(wizardState.selectedIDEs, wizardState, {
        projectRoot: testDir
      });

      const configPath = path.join(testDir, '.trae', 'config.json');
      const content = await fs.readFile(configPath, 'utf8');
      const parsed = JSON.parse(content);

      expect(parsed).toHaveProperty('projectName', 'json-test');
      expect(parsed).toHaveProperty('projectType', 'greenfield');
      expect(parsed).toHaveProperty('framework');
    });

    it('should generate valid JSON for Zed', async () => {
      const wizardState = {
        projectType: 'greenfield',
        projectName: 'zed-test',
        selectedIDEs: ['zed']
      };

      await generateIDEConfigs(wizardState.selectedIDEs, wizardState, {
        projectRoot: testDir
      });

      const configPath = path.join(testDir, '.zed', 'settings.json');
      const content = await fs.readFile(configPath, 'utf8');
      const parsed = JSON.parse(content);

      expect(parsed).toHaveProperty('aios');
      expect(parsed.aios).toHaveProperty('projectName', 'zed-test');
    });

    it('should generate valid JSON for Continue.dev', async () => {
      const wizardState = {
        projectType: 'greenfield',
        projectName: 'continue-test',
        selectedIDEs: ['continue']
      };

      await generateIDEConfigs(wizardState.selectedIDEs, wizardState, {
        projectRoot: testDir
      });

      const configPath = path.join(testDir, '.continue', 'config.json');
      const content = await fs.readFile(configPath, 'utf8');
      const parsed = JSON.parse(content);

      expect(parsed).toHaveProperty('name', 'continue-test');
      expect(parsed).toHaveProperty('aios');
    });

    it('should include AIOS-specific content in Cursor config', async () => {
      const wizardState = {
        projectType: 'greenfield',
        projectName: 'cursor-test',
        selectedIDEs: ['cursor']
      };

      await generateIDEConfigs(wizardState.selectedIDEs, wizardState, {
        projectRoot: testDir
      });

      const configPath = path.join(testDir, '.cursorrules');
      const content = await fs.readFile(configPath, 'utf8');

      // Check for key AIOS concepts
      expect(content).toContain('Agent Commands');
      expect(content).toContain('*help');
      expect(content).toContain('.aios-core');
      expect(content).toContain('Story-Driven Development');
      expect(content).toContain('@dev');
      expect(content).toContain('@qa');
    });

    it('should include AIOS-specific content in Windsurf config', async () => {
      const wizardState = {
        projectType: 'brownfield',
        projectName: 'windsurf-test',
        selectedIDEs: ['windsurf']
      };

      await generateIDEConfigs(wizardState.selectedIDEs, wizardState, {
        projectRoot: testDir
      });

      const configPath = path.join(testDir, '.windsurfrules');
      const content = await fs.readFile(configPath, 'utf8');

      // Check for key AIOS concepts
      expect(content).toContain('Agent Commands');
      expect(content).toContain('docs/stories');
      expect(content).toContain('brownfield');
    });
  });

  describe('Error handling and edge cases', () => {
    it('should handle directory creation for nested configs', async () => {
      const wizardState = {
        projectType: 'greenfield',
        projectName: 'nested-test',
        selectedIDEs: ['trae', 'zed', 'continue']
      };

      const result = await generateIDEConfigs(wizardState.selectedIDEs, wizardState, {
        projectRoot: testDir
      });

      expect(result.success).toBe(true);

      // Verify directories created
      expect(await fs.pathExists(path.join(testDir, '.trae'))).toBe(true);
      expect(await fs.pathExists(path.join(testDir, '.zed'))).toBe(true);
      expect(await fs.pathExists(path.join(testDir, '.continue'))).toBe(true);
    });

    it('should handle mixed IDE formats', async () => {
      const wizardState = {
        projectType: 'greenfield',
        projectName: 'mixed-test',
        selectedIDEs: ['cursor', 'trae', 'antigravity'] // text, json, yaml
      };

      const result = await generateIDEConfigs(wizardState.selectedIDEs, wizardState, {
        projectRoot: testDir
      });

      expect(result.success).toBe(true);
      expect(result.files).toHaveLength(3);

      // Verify text format
      const cursorContent = await fs.readFile(path.join(testDir, '.cursorrules'), 'utf8');
      expect(typeof cursorContent).toBe('string');

      // Verify JSON format
      const traeContent = await fs.readFile(path.join(testDir, '.trae', 'config.json'), 'utf8');
      expect(() => JSON.parse(traeContent)).not.toThrow();

      // Verify YAML format
      const antigravityContent = await fs.readFile(path.join(testDir, '.antigravity.yaml'), 'utf8');
      expect(antigravityContent).toContain('project:');
    });
  });

  describe('Template variable interpolation', () => {
    it('should correctly interpolate all variables', async () => {
      const wizardState = {
        projectType: 'brownfield',
        projectName: 'my-awesome-project',
        selectedIDEs: ['cursor']
      };

      await generateIDEConfigs(wizardState.selectedIDEs, wizardState, {
        projectRoot: testDir
      });

      const configPath = path.join(testDir, '.cursorrules');
      const content = await fs.readFile(configPath, 'utf8');

      expect(content).toContain('my-awesome-project');
      expect(content).toContain('brownfield');
      expect(content).not.toContain('{{projectName}}');
      expect(content).not.toContain('{{projectType}}');
      expect(content).not.toContain('{{timestamp}}');
      expect(content).not.toContain('{{aiosVersion}}');
    });

    it('should handle default values when wizard state is minimal', async () => {
      const wizardState = {}; // No projectName or projectType

      const result = await generateIDEConfigs(['cursor'], wizardState, {
        projectRoot: testDir
      });

      expect(result.success).toBe(true);

      const configPath = path.join(testDir, '.cursorrules');
      const content = await fs.readFile(configPath, 'utf8');

      // Should have defaults
      expect(content).toContain('greenfield'); // default projectType
      expect(content).not.toContain('{{projectType}}');
    });
  });
});
