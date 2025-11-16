/**
 * Unit Tests for GreetingBuilder
 *
 * Test Coverage:
 * - New session greeting
 * - Existing session greeting
 * - Workflow session greeting
 * - Git configured vs unconfigured
 * - Command visibility filtering
 * - Project status integration
 * - Timeout protection
 * - Parallel operations
 * - Fallback strategy
 * - Backwards compatibility
 */

const GreetingBuilder = require('../../.aios-core/scripts/greeting-builder');
const ContextDetector = require('../../.aios-core/scripts/context-detector');
const GitConfigDetector = require('../../.aios-core/scripts/git-config-detector');

// Mock dependencies
jest.mock('../../.aios-core/scripts/context-detector');
jest.mock('../../.aios-core/scripts/git-config-detector');
jest.mock('../../.aios-core/scripts/project-status-loader', () => ({
  loadProjectStatus: jest.fn(),
  formatStatusDisplay: jest.fn()
}));

const { loadProjectStatus, formatStatusDisplay } = require('../../.aios-core/scripts/project-status-loader');

describe('GreetingBuilder', () => {
  let builder;
  let mockAgent;

  beforeEach(() => {
    builder = new GreetingBuilder();
    jest.clearAllMocks();

    // Setup default mock agent
    mockAgent = {
      name: 'TestAgent',
      icon: '🤖',
      persona_profile: {
        greeting_levels: {
          minimal: '🤖 TestAgent ready',
          named: '🤖 TestAgent (Tester) ready',
          archetypal: '🤖 TestAgent the Tester ready'
        }
      },
      persona: {
        role: 'Test automation expert'
      },
      commands: [
        { name: 'help', visibility: ['full', 'quick', 'key'], description: 'Show help' },
        { name: 'test', visibility: ['full', 'quick'], description: 'Run tests' },
        { name: 'build', visibility: ['full'], description: 'Build project' },
        { name: 'deploy', visibility: ['key'], description: 'Deploy to production' }
      ]
    };

    // Setup default mocks
    ContextDetector.prototype.detectSessionType = jest.fn().mockReturnValue('new');
    GitConfigDetector.prototype.get = jest.fn().mockReturnValue({
      configured: true,
      type: 'github',
      branch: 'main'
    });
    loadProjectStatus.mockResolvedValue({
      branch: 'main',
      modifiedFiles: ['file1.js', 'file2.js'],
      modifiedFilesTotalCount: 2,
      recentCommits: ['feat: add feature', 'fix: bug fix'],
      currentStory: 'STORY-123',
      isGitRepo: true
    });
    formatStatusDisplay.mockReturnValue('Project Status Display');
  });

  describe('Session Type Greetings', () => {
    test('should build new session greeting with full details', async () => {
      ContextDetector.prototype.detectSessionType.mockReturnValue('new');

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).toContain('TestAgent (Tester) ready');
      expect(greeting).toContain('Test automation expert'); // Role description
      expect(greeting).toContain('Project Status'); // Project status
      expect(greeting).toContain('Available Commands'); // Full commands
    });

    test('should build existing session greeting without role', async () => {
      ContextDetector.prototype.detectSessionType.mockReturnValue('existing');

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).toContain('TestAgent (Tester) ready');
      expect(greeting).not.toContain('Test automation expert'); // No role
      expect(greeting).toContain('Quick Commands'); // Quick commands
    });

    test('should build workflow session greeting with minimal presentation', async () => {
      ContextDetector.prototype.detectSessionType.mockReturnValue('workflow');

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).toContain('TestAgent ready'); // Minimal presentation
      expect(greeting).not.toContain('Test automation expert'); // No role
      expect(greeting).toContain('Key Commands'); // Key commands only
    });
  });

  describe('Git Configuration', () => {
    test('should show project status when git configured', async () => {
      GitConfigDetector.prototype.get.mockReturnValue({
        configured: true,
        type: 'github',
        branch: 'main'
      });

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).toContain('Project Status');
      expect(loadProjectStatus).toHaveBeenCalled();
    });

    test('should hide project status when git not configured', async () => {
      GitConfigDetector.prototype.get.mockReturnValue({
        configured: false,
        type: null,
        branch: null
      });
      loadProjectStatus.mockResolvedValue(null);

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).not.toContain('Project Status');
    });

    test('should show git warning at END when not configured', async () => {
      GitConfigDetector.prototype.get.mockReturnValue({
        configured: false,
        type: null,
        branch: null
      });

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).toContain('Git Configuration Needed');
      // Git warning should be at the end
      const sections = greeting.split('\n\n');
      const lastSection = sections[sections.length - 1];
      expect(lastSection).toContain('Git Configuration Needed');
    });

    test('should not show git warning when configured', async () => {
      GitConfigDetector.prototype.get.mockReturnValue({
        configured: true,
        type: 'github',
        branch: 'main'
      });

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).not.toContain('Git Configuration Needed');
    });
  });

  describe('Command Visibility', () => {
    test('should show full commands for new session', async () => {
      ContextDetector.prototype.detectSessionType.mockReturnValue('new');

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).toContain('help');
      expect(greeting).toContain('test');
      expect(greeting).toContain('build');
      expect(greeting).toContain('Available Commands');
    });

    test('should show quick commands for existing session', async () => {
      ContextDetector.prototype.detectSessionType.mockReturnValue('existing');

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).toContain('help');
      expect(greeting).toContain('test');
      expect(greeting).not.toContain('build'); // Full-only command
      expect(greeting).toContain('Quick Commands');
    });

    test('should show key commands for workflow session', async () => {
      ContextDetector.prototype.detectSessionType.mockReturnValue('workflow');

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).toContain('help');
      expect(greeting).toContain('deploy');
      expect(greeting).not.toContain('test'); // Not a key command
      expect(greeting).toContain('Key Commands');
    });

    test('should handle agent without visibility metadata (backwards compatible)', async () => {
      mockAgent.commands = [
        { name: 'help' },
        { name: 'test' },
        { name: 'build' }
      ];

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).toContain('help');
      expect(greeting).toContain('test');
      expect(greeting).toContain('build');
    });

    test('should limit to 12 commands maximum', async () => {
      mockAgent.commands = Array(20).fill(null).map((_, i) => ({
        name: `command-${i}`,
        visibility: ['full', 'quick', 'key']
      }));

      const greeting = await builder.buildGreeting(mockAgent, {});

      const commandMatches = greeting.match(/\*command-/g);
      expect(commandMatches?.length).toBeLessThanOrEqual(12);
    });
  });

  describe('Current Context', () => {
    test('should show workflow context when in workflow session', async () => {
      ContextDetector.prototype.detectSessionType.mockReturnValue('workflow');

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).toContain('Context:');
      expect(greeting).toContain('STORY-123');
    });

    test('should show last command in existing session', async () => {
      ContextDetector.prototype.detectSessionType.mockReturnValue('existing');

      const greeting = await builder.buildGreeting(mockAgent, {
        lastCommand: 'validate-story-draft'
      });

      expect(greeting).toContain('Last Action:');
      expect(greeting).toContain('validate-story-draft');
    });
  });

  describe('Project Status Formatting', () => {
    test('should use full format for new/existing sessions', async () => {
      ContextDetector.prototype.detectSessionType.mockReturnValue('new');

      await builder.buildGreeting(mockAgent, {});

      expect(formatStatusDisplay).toHaveBeenCalled();
    });

    test('should use condensed format for workflow session', async () => {
      ContextDetector.prototype.detectSessionType.mockReturnValue('workflow');
      loadProjectStatus.mockResolvedValue({
        branch: 'main',
        modifiedFilesTotalCount: 5,
        currentStory: 'STORY-123',
        isGitRepo: true
      });

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).toContain('🌿 main');
      expect(greeting).toContain('📝 5 modified');
      expect(greeting).toContain('📖 STORY-123');
    });
  });

  describe('Performance and Fallback', () => {
    test('should complete within timeout (150ms)', async () => {
      const startTime = Date.now();
      await builder.buildGreeting(mockAgent, {});
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(150);
    });

    test('should fallback to simple greeting on timeout', async () => {
      // Mock slow operation
      loadProjectStatus.mockImplementation(() =>
        new Promise(resolve => setTimeout(resolve, 200))
      );

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).toContain('TestAgent (Tester) ready');
      expect(greeting).toContain('Type `*help`');
    });

    test('should fallback on context detection error', async () => {
      ContextDetector.prototype.detectSessionType.mockImplementation(() => {
        throw new Error('Detection failed');
      });

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).toContain('TestAgent (Tester) ready');
      expect(greeting).toContain('Type `*help`');
    });

    test('should fallback on git config error', async () => {
      GitConfigDetector.prototype.get.mockImplementation(() => {
        throw new Error('Git check failed');
      });

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).toBeTruthy();
      // Should still produce a greeting
    });

    test('should handle project status load failure gracefully', async () => {
      loadProjectStatus.mockRejectedValue(new Error('Load failed'));

      const greeting = await builder.buildGreeting(mockAgent, {});

      expect(greeting).toBeTruthy();
      // Should still produce a greeting without status
    });
  });

  describe('Simple Greeting (Fallback)', () => {
    test('should build simple greeting', () => {
      const simple = builder.buildSimpleGreeting(mockAgent);

      expect(simple).toContain('TestAgent (Tester) ready');
      expect(simple).toContain('Type `*help`');
    });

    test('should handle agent without persona profile', () => {
      const basicAgent = {
        name: 'BasicAgent',
        icon: '⚡'
      };

      const simple = builder.buildSimpleGreeting(basicAgent);

      expect(simple).toContain('⚡ BasicAgent ready');
      expect(simple).toContain('Type `*help`');
    });
  });

  describe('Component Methods', () => {
    test('buildPresentation should return correct greeting level', () => {
      expect(builder.buildPresentation(mockAgent, 'new')).toContain('TestAgent (Tester)');
      expect(builder.buildPresentation(mockAgent, 'workflow')).toBe('🤖 TestAgent ready');
    });

    test('buildRoleDescription should return role', () => {
      const role = builder.buildRoleDescription(mockAgent);
      expect(role).toContain('Test automation expert');
    });

    test('buildCommands should format commands list', () => {
      const commands = [
        { name: 'help', description: 'Show help' },
        { name: 'test', description: 'Run tests' }
      ];

      const formatted = builder.buildCommands(commands, 'new');
      expect(formatted).toContain('*help');
      expect(formatted).toContain('Show help');
      expect(formatted).toContain('Available Commands');
    });

    test('buildGitWarning should return warning message', () => {
      const warning = builder.buildGitWarning();
      expect(warning).toContain('Git Configuration Needed');
      expect(warning).toContain('git init');
    });
  });
});
