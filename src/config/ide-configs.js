/**
 * IDE Configuration Metadata
 *
 * Story 1.4: IDE Selection
 * Defines supported IDEs with their config file paths and template information
 *
 * @module config/ide-configs
 */

const path = require('path');

/**
 * IDE Configuration Metadata
 * Maps IDE identifiers to their configuration requirements
 *
 * @typedef {Object} IDEConfig
 * @property {string} name - Display name of the IDE
 * @property {string} description - Brief description for selection prompt
 * @property {string} configFile - Relative path to config file from project root
 * @property {string} template - Path to template file
 * @property {boolean} requiresDirectory - Whether config file needs a directory created
 * @property {string} format - Config file format: 'text', 'json', or 'yaml'
 */

const IDE_CONFIGS = {
  cursor: {
    name: 'Cursor',
    description: 'AI-first code editor with built-in AI assistant',
    configFile: '.cursorrules',
    template: 'templates/ide/cursor.rules',
    requiresDirectory: false,
    format: 'text'
  },
  windsurf: {
    name: 'Windsurf',
    description: 'AI-powered development environment',
    configFile: '.windsurfrules',
    template: 'templates/ide/windsurf.rules',
    requiresDirectory: false,
    format: 'text'
  },
  trae: {
    name: 'Trae',
    description: 'Modern AI code editor',
    configFile: path.join('.trae', 'config.json'),
    template: 'templates/ide/trae-config.json',
    requiresDirectory: true,
    format: 'json'
  },
  zed: {
    name: 'Zed',
    description: 'High-performance multiplayer code editor',
    configFile: path.join('.zed', 'settings.json'),
    template: 'templates/ide/zed-settings.json',
    requiresDirectory: true,
    format: 'json'
  },
  antigravity: {
    name: 'Antigravity',
    description: 'Next-gen AI development tool',
    configFile: '.antigravity.yaml',
    template: 'templates/ide/antigravity.yaml',
    requiresDirectory: false,
    format: 'yaml'
  },
  continue: {
    name: 'Continue.dev',
    description: 'Open-source autopilot for software development',
    configFile: path.join('.continue', 'config.json'),
    template: 'templates/ide/continue-config.json',
    requiresDirectory: true,
    format: 'json'
  }
};

/**
 * Get all IDE keys
 * @returns {string[]} Array of IDE identifiers
 */
function getIDEKeys() {
  return Object.keys(IDE_CONFIGS);
}

/**
 * Get IDE config by key
 * @param {string} ideKey - IDE identifier
 * @returns {IDEConfig|null} IDE config object or null if not found
 */
function getIDEConfig(ideKey) {
  return IDE_CONFIGS[ideKey] || null;
}

/**
 * Validate IDE key exists
 * @param {string} ideKey - IDE identifier to validate
 * @returns {boolean} True if IDE exists
 */
function isValidIDE(ideKey) {
  return ideKey in IDE_CONFIGS;
}

/**
 * Get formatted choices for inquirer prompt
 * @returns {Array<{name: string, value: string}>} Inquirer-compatible choices
 */
function getIDEChoices() {
  return getIDEKeys().map(key => ({
    name: `${IDE_CONFIGS[key].name} - ${IDE_CONFIGS[key].description}`,
    value: key
  }));
}

module.exports = {
  IDE_CONFIGS,
  getIDEKeys,
  getIDEConfig,
  isValidIDE,
  getIDEChoices
};
