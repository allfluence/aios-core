/**
 * Main Wizard Test Suite
 * 
 * Tests wizard flow, welcome/completion messages, and cancellation handling
 */

const { runWizard } = require('../../src/wizard/index');
const inquirer = require('inquirer');

// Mock dependencies
jest.mock('inquirer');
jest.mock('../../src/wizard/feedback');

const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

beforeEach(() => {
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
  jest.clearAllMocks();
});

afterEach(() => {
  console.log = originalLog;
  console.warn = originalWarn;
  console.error = originalError;
});

describe('wizard/index', () => {
  describe('runWizard', () => {
    test('shows welcome message', async () => {
      inquirer.prompt = jest.fn().mockResolvedValue({ projectType: 'greenfield' });
      const { showWelcome } = require('../../src/wizard/feedback');

      await runWizard();

      expect(showWelcome).toHaveBeenCalled();
    });

    test('prompts user with questions', async () => {
      inquirer.prompt = jest.fn().mockResolvedValue({ projectType: 'greenfield' });

      await runWizard();

      expect(inquirer.prompt).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'projectType'
          })
        ])
      );
    });

    test('shows completion message on success', async () => {
      inquirer.prompt = jest.fn().mockResolvedValue({ projectType: 'greenfield' });
      const { showCompletion } = require('../../src/wizard/feedback');

      await runWizard();

      expect(showCompletion).toHaveBeenCalled();
    });

    test('returns answers object', async () => {
      const mockAnswers = { projectType: 'greenfield' };
      inquirer.prompt = jest.fn().mockResolvedValue(mockAnswers);

      const result = await runWizard();

      expect(result).toEqual(mockAnswers);
    });

    test('handles inquirer errors', async () => {
      const error = new Error('Test error');
      inquirer.prompt = jest.fn().mockRejectedValue(error);

      await expect(runWizard()).rejects.toThrow('Test error');
    });

    test('handles TTY errors', async () => {
      const error = new Error('TTY error');
      error.isTtyError = true;
      inquirer.prompt = jest.fn().mockRejectedValue(error);

      await expect(runWizard()).rejects.toThrow();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('couldn\'t be rendered')
      );
    });
  });

  describe('Performance Monitoring (AC: < 100ms per question)', () => {
    test('tracks question response time', async () => {
      inquirer.prompt = jest.fn().mockResolvedValue({ projectType: 'greenfield' });

      const startTime = Date.now();
      await runWizard();
      const duration = Date.now() - startTime;

      // Wizard should complete quickly (< 1 second for 1 question)
      expect(duration).toBeLessThan(1000);
    });

    test('warns if average response time exceeds 100ms', async () => {
      // Mock slow prompt (> 100ms)
      inquirer.prompt = jest.fn().mockImplementation(() => {
        return new Promise(resolve => {
          setTimeout(() => resolve({ projectType: 'greenfield' }), 150);
        });
      });

      await runWizard();

      // Should log warning about slow performance
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('exceeds 100ms target')
      );
    });

    test('does not warn if response time is acceptable', async () => {
      // Mock fast prompt (< 100ms)
      inquirer.prompt = jest.fn().mockImplementation(() => {
        return new Promise(resolve => {
          setTimeout(() => resolve({ projectType: 'greenfield' }), 50);
        });
      });

      await runWizard();

      // Should NOT log warning
      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe('Answer Object Schema', () => {
    test('returns object with projectType', async () => {
      inquirer.prompt = jest.fn().mockResolvedValue({ projectType: 'greenfield' });

      const answers = await runWizard();

      expect(answers).toHaveProperty('projectType');
      expect(['greenfield', 'brownfield']).toContain(answers.projectType);
    });

    test('future: will include IDE selection (Story 1.4)', async () => {
      // Placeholder test for future Story 1.4
      inquirer.prompt = jest.fn().mockResolvedValue({
        projectType: 'greenfield',
        // Future: ide: 'vscode'
      });

      const answers = await runWizard();

      // Currently only projectType
      expect(Object.keys(answers)).toHaveLength(1);

      // Future: Will have more keys
      // expect(answers).toHaveProperty('ide');
    });

    test('future: will include MCP selections (Story 1.5)', async () => {
      // Placeholder test for future Story 1.5
      inquirer.prompt = jest.fn().mockResolvedValue({
        projectType: 'greenfield',
        // Future: mcps: ['clickup', 'supabase']
      });

      const answers = await runWizard();

      // Currently only projectType
      expect(Object.keys(answers)).toHaveLength(1);

      // Future: Will have more keys
      // expect(answers).toHaveProperty('mcps');
    });
  });

  describe('Integration Contract (Story 1.1)', () => {
    test('exports runWizard function', () => {
      const wizard = require('../../src/wizard/index');
      expect(typeof wizard.runWizard).toBe('function');
    });

    test('runWizard is async function', () => {
      const wizard = require('../../src/wizard/index');
      const result = wizard.runWizard();
      expect(result).toBeInstanceOf(Promise);
      
      // Clean up promise
      result.catch(() => {});
    });

    test('matches integration contract signature', async () => {
      // Contract: exports.runWizard = async function() { ... }
      const wizard = require('../../src/wizard/index');
      
      inquirer.prompt = jest.fn().mockResolvedValue({ projectType: 'greenfield' });

      const result = await wizard.runWizard();

      // Should return answer object
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('projectType');
    });
  });
});

