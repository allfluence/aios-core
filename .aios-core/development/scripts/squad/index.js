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

module.exports = {
  // Squad Loader (SQS-2)
  SquadLoader,
  SquadLoaderError,
  MANIFEST_FILES,
  DEFAULT_SQUADS_PATH,
  ErrorCodes,

  // Squad Validator (SQS-3) - TODO: Implement in Story SQS-3
  // SquadValidator,

  // Squad Generator (SQS-4) - TODO: Implement in Story SQS-4
  // SquadGenerator,
};
