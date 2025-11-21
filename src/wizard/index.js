/**
 * AIOS Interactive Wizard - Main Entry Point
 * 
 * Story 1.2: Interactive Wizard Foundation
 * Provides core wizard functionality with visual feedback and navigation
 * 
 * @module wizard
 */

const inquirer = require('inquirer');
const { buildQuestionSequence } = require('./questions');
const {
  showWelcome,
  showCompletion,
  showCancellation
} = require('./feedback');
const { generateIDEConfigs, showSuccessSummary } = require('./ide-config-generator');

/**
 * Handle Ctrl+C gracefully
 */
let cancellationRequested = false;
let sigintHandlerAdded = false;

function setupCancellationHandler() {
  // Prevent adding multiple listeners (MaxListeners warning fix)
  if (sigintHandlerAdded) {
    return;
  }

  // Increase limit to prevent warning during testing
  process.setMaxListeners(15);
  
  const handleSigint = async () => {
    if (cancellationRequested) {
      // Second Ctrl+C - force exit
      console.log('\nForce exit');
      process.exit(0);
    }

    cancellationRequested = true;
    
    console.log('\n');
    const { confirmCancel } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmCancel',
        message: 'Are you sure you want to cancel installation?',
        default: false
      }
    ]);

    if (confirmCancel) {
      showCancellation();
      process.exit(0);
    } else {
      cancellationRequested = false;
      console.log('Continuing installation...\n');
      // Note: inquirer will resume automatically
    }
  };

  process.on('SIGINT', handleSigint);
  sigintHandlerAdded = true;
}

/**
 * Main wizard execution function
 * 
 * @returns {Promise<Object>} Wizard answers object
 * 
 * @example
 * const { runWizard } = require('./src/wizard');
 * const answers = await runWizard();
 * console.log(answers.projectType); // 'greenfield' or 'brownfield'
 */
async function runWizard() {
  try {
    // Setup graceful cancellation
    setupCancellationHandler();

    // Show welcome message with AIOS branding
    showWelcome();

    // Build question sequence
    const questions = buildQuestionSequence();

    // Performance tracking (AC: < 100ms per question)
    const startTime = Date.now();

    // Run wizard with inquirer
    const answers = await inquirer.prompt(questions);

    // Log performance metrics
    const duration = Date.now() - startTime;
    const avgTimePerQuestion = duration / questions.length;

    if (avgTimePerQuestion > 100) {
      console.warn(`Warning: Average question response time (${avgTimePerQuestion.toFixed(0)}ms) exceeds 100ms target`);
    }

    // Story 1.4: Generate IDE configs if IDEs were selected
    if (answers.selectedIDEs && answers.selectedIDEs.length > 0) {
      const configResult = await generateIDEConfigs(answers.selectedIDEs, answers);

      if (configResult.success) {
        showSuccessSummary(configResult);
      } else {
        console.error('\n⚠️  Some IDE configurations could not be created:');
        if (configResult.errors) {
          configResult.errors.forEach(err => {
            console.error(`  - ${err.ide || 'Unknown'}: ${err.error}`);
          });
        }
      }
    }

    // Show completion
    showCompletion();

    return answers;
  } catch (error) {
    if (error.isTtyError) {
      console.error('Error: Prompt couldn\'t be rendered in the current environment');
    } else {
      console.error('Wizard error:', error.message);
    }
    throw error;
  }
}

/**
 * Answer object schema (for integration documentation)
 * 
 * @typedef {Object} WizardAnswers
 * @property {string} projectType - 'greenfield' or 'brownfield'
 * @property {string} [ide] - Selected IDE (Story 1.4)
 * @property {string[]} [mcps] - Selected MCPs (Story 1.5)
 * @property {Object} [envConfig] - Environment configuration (Story 1.6)
 */

module.exports = {
  runWizard
};

