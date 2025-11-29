/**
 * AIOS Core Module - Entry Point
 *
 * Provides centralized exports for all core framework functionality.
 * This module contains the essential runtime components that all other
 * modules depend on.
 *
 * @module @aios-fullstack/core
 * @version 2.0.0
 * @created Story 2.2 - Core Module Creation
 */

// Config subsystem
const { ConfigCache, globalConfigCache } = require('./config/config-cache');
const configLoader = require('./config/config-loader');

// Session management
const ContextDetector = require('./session/context-detector');
const SessionContextLoader = require('./session/context-loader');

// Elicitation system
const ElicitationEngine = require('./elicitation/elicitation-engine');
const ElicitationSessionManager = require('./elicitation/session-manager');
const agentElicitationSteps = require('./elicitation/agent-elicitation');
const taskElicitationSteps = require('./elicitation/task-elicitation');
const workflowElicitationSteps = require('./elicitation/workflow-elicitation');

// Utilities
const PersonalizedOutputFormatter = require('./utils/output-formatter');
const YAMLValidator = require('./utils/yaml-validator');
const { validateYAML } = require('./utils/yaml-validator');

/**
 * Core module exports
 */
module.exports = {
  // Config
  ConfigCache,
  globalConfigCache,
  configLoader,
  loadAgentConfig: configLoader.loadAgentConfig,
  loadConfigSections: configLoader.loadConfigSections,
  loadMinimalConfig: configLoader.loadMinimalConfig,
  loadFullConfig: configLoader.loadFullConfig,
  preloadConfig: configLoader.preloadConfig,
  clearConfigCache: configLoader.clearCache,
  getConfigPerformanceMetrics: configLoader.getPerformanceMetrics,

  // Session
  ContextDetector,
  SessionContextLoader,

  // Elicitation
  ElicitationEngine,
  ElicitationSessionManager,
  agentElicitationSteps,
  taskElicitationSteps,
  workflowElicitationSteps,

  // Utilities
  PersonalizedOutputFormatter,
  YAMLValidator,
  validateYAML,

  // Version info
  version: '2.0.0',
  moduleName: 'core'
};
