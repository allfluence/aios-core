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

/**
 * IDE Configuration Metadata
 *
 * AIOS-FULLSTACK v2.1 supports 8 IDEs:
 * - Claude Code (Anthropic's official CLI)
 * - Cursor (AI-first code editor)
 * - Windsurf (AI-powered development)
 * - Trae (Modern AI code editor)
 * - Roo Code (VS Code extension with modes)
 * - Cline (VS Code AI coding assistant)
 * - Gemini CLI (Google's AI assistant)
 * - GitHub Copilot (GitHub's AI pair programmer)
 */
const IDE_CONFIGS = {
  'claude-code': {
    name: 'Claude Code',
    description: 'Anthropic official CLI - Recommended for AIOS',
    configFile: path.join('.claude', 'CLAUDE.md'),
    template: 'ide-rules/claude-rules.md',
    requiresDirectory: true,
    format: 'text',
    recommended: true
  },
  cursor: {
    name: 'Cursor',
    description: 'AI-first code editor with built-in AI assistant',
    configFile: '.cursorrules',
    template: 'ide-rules/cursor-rules.md',
    requiresDirectory: false,
    format: 'text'
  },
  windsurf: {
    name: 'Windsurf',
    description: 'AI-powered development environment',
    configFile: '.windsurfrules',
    template: 'ide-rules/windsurf-rules.md',
    requiresDirectory: false,
    format: 'text'
  },
  trae: {
    name: 'Trae',
    description: 'Modern AI code editor',
    configFile: path.join('.trae', 'rules.md'),
    template: 'ide-rules/trae-rules.md',
    requiresDirectory: true,
    format: 'text'
  },
  'roo-code': {
    name: 'Roo Code',
    description: 'VS Code extension with mode-based AI assistance',
    configFile: '.roo/rules.md',
    template: 'ide-rules/roo-rules.md',
    requiresDirectory: true,
    format: 'text'
  },
  cline: {
    name: 'Cline',
    description: 'VS Code AI coding assistant',
    configFile: path.join('.cline', 'rules.md'),
    template: 'ide-rules/cline-rules.md',
    requiresDirectory: true,
    format: 'text'
  },
  'gemini-cli': {
    name: 'Gemini CLI',
    description: 'Google AI assistant for development',
    configFile: path.join('.gemini', 'rules.md'),
    template: 'ide-rules/gemini-rules.md',
    requiresDirectory: true,
    format: 'text'
  },
  'github-copilot': {
    name: 'GitHub Copilot',
    description: 'GitHub AI pair programmer',
    configFile: path.join('.github', 'copilot-instructions.md'),
    template: 'ide-rules/copilot-rules.md',
    requiresDirectory: true,
    format: 'text'
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
 * @returns {Array<{name: string, value: string, checked?: boolean}>} Inquirer-compatible choices
 */
function getIDEChoices() {
  const { colors } = require('../utils/aios-colors');

  return getIDEKeys().map(key => {
    const config = IDE_CONFIGS[key];
    const isRecommended = config.recommended === true;

    // Format: "IDE Name - Description" with recommended highlight
    let displayName = config.name;
    if (isRecommended) {
      displayName = colors.highlight(config.name) + colors.success(' (Recommended)');
    }

    return {
      name: `${displayName} ${colors.dim('- ' + config.description)}`,
      value: key,
      checked: isRecommended // Pre-select recommended IDEs
    };
  });
}

module.exports = {
  IDE_CONFIGS,
  getIDEKeys,
  getIDEConfig,
  isValidIDE,
  getIDEChoices
};
