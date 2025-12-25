/**
 * @module SuggestionEngine
 * @description High-level suggestion engine for the *next task
 * @story WIS-3 - *next Task Implementation
 * @version 1.0.0
 *
 * @example
 * const { SuggestionEngine } = require('./suggestion-engine');
 * const engine = new SuggestionEngine();
 *
 * const context = await engine.buildContext({ storyOverride: 'path/to/story.md' });
 * const result = await engine.suggestNext(context);
 */

'use strict';

const fs = require('fs');
const path = require('path');

// Lazy-loaded dependencies for performance
let wis = null;
let SessionContextLoader = null;

/**
 * Default cache TTL for suggestions (5 minutes)
 * @type {number}
 */
const SUGGESTION_CACHE_TTL = 5 * 60 * 1000;

/**
 * Low confidence threshold for marking suggestions as "uncertain"
 * @type {number}
 */
const LOW_CONFIDENCE_THRESHOLD = 0.50;

/**
 * SuggestionEngine class for generating context-aware command suggestions
 */
class SuggestionEngine {
  /**
   * Create a SuggestionEngine instance
   * @param {Object} options - Configuration options
   * @param {number} options.cacheTTL - Cache time-to-live in milliseconds
   * @param {boolean} options.lazyLoad - Whether to lazy-load dependencies
   */
  constructor(options = {}) {
    this.cacheTTL = options.cacheTTL || SUGGESTION_CACHE_TTL;
    this.lazyLoad = options.lazyLoad !== false;
    this.suggestionCache = null;
    this.cacheTimestamp = null;
    this.cacheKey = null;

    // Load dependencies immediately if not lazy loading
    if (!this.lazyLoad) {
      this._loadDependencies();
    }
  }

  /**
   * Lazy-load WIS and session dependencies
   * @private
   */
  _loadDependencies() {
    if (!wis) {
      try {
        wis = require('../index');
      } catch (error) {
        console.warn('[SuggestionEngine] Failed to load WIS module:', error.message);
        wis = null;
      }
    }

    if (!SessionContextLoader) {
      try {
        SessionContextLoader = require('../../core/session/context-loader');
      } catch (error) {
        console.warn('[SuggestionEngine] Failed to load SessionContextLoader:', error.message);
        SessionContextLoader = null;
      }
    }
  }

  /**
   * Build context from multiple sources
   * @param {Object} options - Context building options
   * @param {string} options.storyOverride - Explicit story path (optional)
   * @param {boolean} options.autoDetect - Whether to auto-detect context (default: true)
   * @param {string} options.agentId - Current agent ID (optional)
   * @returns {Promise<Object>} Built context object
   */
  async buildContext(options = {}) {
    this._loadDependencies();

    const context = {
      agentId: options.agentId || this._detectCurrentAgent(),
      lastCommand: null,
      lastCommands: [],
      storyPath: null,
      branch: null,
      projectState: {}
    };

    // 1. Load session context if available
    if (options.autoDetect !== false && SessionContextLoader) {
      try {
        const loader = new SessionContextLoader();
        const sessionContext = loader.loadContext(context.agentId);

        context.lastCommands = sessionContext.lastCommands || [];
        context.lastCommand = context.lastCommands[context.lastCommands.length - 1] || null;
        context.storyPath = sessionContext.currentStory || null;
        context.workflowActive = sessionContext.workflowActive || null;
      } catch (error) {
        console.warn('[SuggestionEngine] Failed to load session context:', error.message);
      }
    }

    // 2. Story override takes precedence
    if (options.storyOverride) {
      const resolvedPath = this._resolveStoryPath(options.storyOverride);
      if (resolvedPath) {
        context.storyPath = resolvedPath;
      }
    }

    // 3. Detect git branch
    context.branch = this._detectGitBranch();

    // 4. Build project state
    context.projectState = await this._buildProjectState(context);

    return context;
  }

  /**
   * Get suggestions for next commands based on context
   * @param {Object} context - Current session context
   * @returns {Promise<Object>} Suggestion result
   */
  async suggestNext(context) {
    this._loadDependencies();

    // Check cache first
    const cacheKey = this._generateCacheKey(context);
    if (this._isCacheValid(cacheKey)) {
      return this.suggestionCache;
    }

    // Default result for when WIS is not available
    const defaultResult = {
      workflow: null,
      currentState: null,
      confidence: 0,
      suggestions: [],
      isUncertain: true,
      message: 'Unable to determine workflow context'
    };

    if (!wis) {
      return defaultResult;
    }

    try {
      // Get suggestions from WIS
      const suggestions = wis.getSuggestions(context);

      if (!suggestions || suggestions.length === 0) {
        return {
          ...defaultResult,
          message: 'No matching workflow found for current context'
        };
      }

      // Get workflow match info
      const commands = context.lastCommands || (context.lastCommand ? [context.lastCommand] : []);
      const match = wis.matchWorkflow(commands);

      // Calculate overall confidence
      const avgConfidence = suggestions.length > 0
        ? suggestions.reduce((sum, s) => sum + (s.confidence || 0), 0) / suggestions.length
        : 0;

      // Build result
      const result = {
        workflow: match?.name || suggestions[0]?.workflow || null,
        currentState: suggestions[0]?.state || null,
        confidence: Math.round(avgConfidence * 100) / 100,
        suggestions: suggestions.map((s, index) => ({
          command: `*${s.command}`,
          args: this._interpolateArgs(s.args_template, context),
          description: s.description || '',
          confidence: Math.round((s.confidence || 0) * 100) / 100,
          priority: s.priority || index + 1
        })),
        isUncertain: avgConfidence < LOW_CONFIDENCE_THRESHOLD,
        message: null
      };

      // Cache the result
      this._cacheResult(cacheKey, result);

      return result;
    } catch (error) {
      console.error('[SuggestionEngine] Error getting suggestions:', error.message);
      return {
        ...defaultResult,
        message: `Error: ${error.message}`
      };
    }
  }

  /**
   * Detect current active agent from environment or session
   * @returns {string} Agent ID
   * @private
   */
  _detectCurrentAgent() {
    // Check environment variable first
    if (process.env.AIOS_CURRENT_AGENT) {
      return process.env.AIOS_CURRENT_AGENT.replace('@', '');
    }

    // Default to 'dev' if unknown
    return 'dev';
  }

  /**
   * Resolve and validate story path
   * @param {string} storyPath - Story path to resolve
   * @returns {string|null} Resolved path or null if invalid
   * @private
   */
  _resolveStoryPath(storyPath) {
    if (!storyPath) return null;

    // Handle relative paths
    const resolved = path.isAbsolute(storyPath)
      ? storyPath
      : path.resolve(process.cwd(), storyPath);

    // Validate file exists
    try {
      if (fs.existsSync(resolved)) {
        return resolved;
      }
    } catch (error) {
      // File doesn't exist
    }

    console.warn(`[SuggestionEngine] Story path not found: ${storyPath}`);
    return null;
  }

  /**
   * Detect current git branch
   * @returns {string|null} Branch name or null
   * @private
   */
  _detectGitBranch() {
    try {
      const gitHeadPath = path.join(process.cwd(), '.git', 'HEAD');
      if (fs.existsSync(gitHeadPath)) {
        const content = fs.readFileSync(gitHeadPath, 'utf8').trim();
        if (content.startsWith('ref: refs/heads/')) {
          return content.replace('ref: refs/heads/', '');
        }
      }
    } catch (error) {
      // Git not available or not a git repo
    }
    return null;
  }

  /**
   * Build project state object
   * @param {Object} context - Current context
   * @returns {Promise<Object>} Project state
   * @private
   */
  async _buildProjectState(context) {
    const state = {
      activeStory: !!context.storyPath,
      hasUncommittedChanges: false,
      failingTests: false,
      workflowPhase: null
    };

    // Check for uncommitted changes
    try {
      const gitStatusPath = path.join(process.cwd(), '.git', 'index');
      if (fs.existsSync(gitStatusPath)) {
        // Simple check - if there are modified files in git status
        // For production, would use git status command
        state.hasUncommittedChanges = true; // Assume true for now
      }
    } catch (error) {
      // Ignore
    }

    // Infer workflow phase from last command
    if (context.lastCommand) {
      const cmd = context.lastCommand.toLowerCase();
      if (cmd.includes('develop') || cmd.includes('implement')) {
        state.workflowPhase = 'development';
      } else if (cmd.includes('review') || cmd.includes('qa')) {
        state.workflowPhase = 'review';
      } else if (cmd.includes('push') || cmd.includes('pr') || cmd.includes('deploy')) {
        state.workflowPhase = 'deployment';
      } else if (cmd.includes('create') || cmd.includes('story') || cmd.includes('epic')) {
        state.workflowPhase = 'planning';
      }
    }

    return state;
  }

  /**
   * Interpolate argument templates with context values
   * @param {string} argsTemplate - Template string with ${var} placeholders
   * @param {Object} context - Context for interpolation
   * @returns {string} Interpolated arguments
   * @private
   */
  _interpolateArgs(argsTemplate, context) {
    if (!argsTemplate) return '';

    return argsTemplate
      .replace(/\$\{story_path\}/g, context.storyPath || '')
      .replace(/\$\{epic_path\}/g, context.epicPath || '')
      .replace(/\$\{doc_path\}/g, context.docPath || '')
      .replace(/\$\{file_path\}/g, context.filePath || '')
      .replace(/\$\{feature_name\}/g, context.featureName || '')
      .replace(/\$\{topic\}/g, context.topic || '')
      .replace(/\$\{branch\}/g, context.branch || '')
      .trim();
  }

  /**
   * Generate cache key from context
   * @param {Object} context - Context object
   * @returns {string} Cache key
   * @private
   */
  _generateCacheKey(context) {
    const keyParts = [
      context.agentId || '',
      context.lastCommand || '',
      (context.lastCommands || []).slice(-3).join(','),
      context.storyPath || '',
      context.branch || ''
    ];
    return keyParts.join('|');
  }

  /**
   * Check if cache is valid for given key
   * @param {string} key - Cache key
   * @returns {boolean} True if cache is valid
   * @private
   */
  _isCacheValid(key) {
    if (!this.suggestionCache || !this.cacheTimestamp || !this.cacheKey) {
      return false;
    }
    if (this.cacheKey !== key) {
      return false;
    }
    return (Date.now() - this.cacheTimestamp) < this.cacheTTL;
  }

  /**
   * Cache suggestion result
   * @param {string} key - Cache key
   * @param {Object} result - Result to cache
   * @private
   */
  _cacheResult(key, result) {
    this.suggestionCache = result;
    this.cacheTimestamp = Date.now();
    this.cacheKey = key;
  }

  /**
   * Invalidate the cache
   */
  invalidateCache() {
    this.suggestionCache = null;
    this.cacheTimestamp = null;
    this.cacheKey = null;
  }

  /**
   * Get fallback suggestions when WIS is unavailable
   * @param {Object} context - Context object
   * @returns {Object} Fallback suggestions
   */
  getFallbackSuggestions(context) {
    const agent = context.agentId || 'dev';

    // Agent-specific fallback suggestions
    const fallbacks = {
      dev: [
        { command: '*help', args: '', description: 'Show available commands', confidence: 0.30, priority: 1 },
        { command: '*run-tests', args: '', description: 'Run test suite', confidence: 0.25, priority: 2 },
        { command: '*develop', args: '', description: 'Start development mode', confidence: 0.20, priority: 3 }
      ],
      po: [
        { command: '*help', args: '', description: 'Show available commands', confidence: 0.30, priority: 1 },
        { command: '*backlog-review', args: '', description: 'Review backlog', confidence: 0.25, priority: 2 },
        { command: '*create-story', args: '', description: 'Create new story', confidence: 0.20, priority: 3 }
      ],
      qa: [
        { command: '*help', args: '', description: 'Show available commands', confidence: 0.30, priority: 1 },
        { command: '*run-tests', args: '', description: 'Run test suite', confidence: 0.25, priority: 2 },
        { command: '*review-qa', args: '', description: 'Start QA review', confidence: 0.20, priority: 3 }
      ],
      sm: [
        { command: '*help', args: '', description: 'Show available commands', confidence: 0.30, priority: 1 },
        { command: '*create-next-story', args: '', description: 'Create next story', confidence: 0.25, priority: 2 },
        { command: '*validate-story-draft', args: '', description: 'Validate story', confidence: 0.20, priority: 3 }
      ],
      default: [
        { command: '*help', args: '', description: 'Show available commands', confidence: 0.30, priority: 1 },
        { command: '*status', args: '', description: 'Show project status', confidence: 0.20, priority: 2 }
      ]
    };

    return {
      workflow: null,
      currentState: null,
      confidence: 0.25,
      suggestions: fallbacks[agent] || fallbacks.default,
      isUncertain: true,
      message: 'Using fallback suggestions - context unclear'
    };
  }
}

/**
 * Create a new SuggestionEngine instance
 * @param {Object} options - Configuration options
 * @returns {SuggestionEngine} New engine instance
 */
function createSuggestionEngine(options = {}) {
  return new SuggestionEngine(options);
}

module.exports = {
  SuggestionEngine,
  createSuggestionEngine,
  SUGGESTION_CACHE_TTL,
  LOW_CONFIDENCE_THRESHOLD
};
