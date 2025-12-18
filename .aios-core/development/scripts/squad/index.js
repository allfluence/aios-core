/**
 * Squad Scripts Module
 *
 * Central exports for squad-related utilities used by the squad-creator agent.
 *
 * @module squad
 * @see {@link ./squad-loader.js} - Load and resolve squad manifests
 * @see {@link ./squad-validator.js} - Validate squad structure (SQS-3)
 * @see {@link ./squad-generator.js} - Generate new squads (SQS-4)
 */

const {
  SquadLoader,
  SquadLoaderError,
  MANIFEST_FILES,
  DEFAULT_SQUADS_PATH,
  ErrorCodes,
} = require('./squad-loader');

const {
  SquadValidator,
  ValidationErrorCodes,
  TASK_REQUIRED_FIELDS,
} = require('./squad-validator');

const {
  SquadGenerator,
  SquadGeneratorError,
  GeneratorErrorCodes,
  AVAILABLE_TEMPLATES,
  AVAILABLE_LICENSES,
  CONFIG_MODES,
  isValidSquadName,
  getGitUserName,
} = require('./squad-generator');

module.exports = {
  // Squad Loader (SQS-2)
  SquadLoader,
  SquadLoaderError,
  MANIFEST_FILES,
  DEFAULT_SQUADS_PATH,
  ErrorCodes,

  // Squad Validator (SQS-3)
  SquadValidator,
  ValidationErrorCodes,
  TASK_REQUIRED_FIELDS,

  // Squad Generator (SQS-4)
  SquadGenerator,
  SquadGeneratorError,
  GeneratorErrorCodes,
  AVAILABLE_TEMPLATES,
  AVAILABLE_LICENSES,
  CONFIG_MODES,
  isValidSquadName,
  getGitUserName,
};
