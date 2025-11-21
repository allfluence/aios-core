/**
 * Visual Feedback Helpers
 * 
 * Spinners, progress bars, and status indicators using AIOS Color System v2.1
 * 
 * @module wizard/feedback
 */

const ora = require('ora');
const cliProgress = require('cli-progress');
const { colors, status, headings } = require('../utils/aios-colors');

/**
 * Create and start a spinner with AIOS styling
 * 
 * @param {string} text - Spinner text
 * @param {Object} options - Spinner options
 * @returns {Object} Ora spinner instance
 */
function createSpinner(text, options = {}) {
  return ora({
    text,
    color: 'cyan',
    spinner: 'dots',
    ...options
  });
}

/**
 * Show success message with checkmark
 * 
 * @param {string} message - Success message
 */
function showSuccess(message) {
  console.log(status.success(message));
}

/**
 * Show error message with cross mark
 * 
 * @param {string} message - Error message
 */
function showError(message) {
  console.log(status.error(message));
}

/**
 * Show warning message with warning symbol
 * 
 * @param {string} message - Warning message
 */
function showWarning(message) {
  console.log(status.warning(message));
}

/**
 * Show info message
 * 
 * @param {string} message - Info message
 */
function showInfo(message) {
  console.log(status.info(message));
}

/**
 * Show tip message
 * 
 * @param {string} message - Tip message
 */
function showTip(message) {
  console.log(status.tip(message));
}

/**
 * Create progress bar with AIOS styling
 * 
 * @param {number} total - Total steps
 * @param {Object} options - Progress bar options
 * @returns {Object} Progress bar instance
 */
function createProgressBar(total, options = {}) {
  const progressBar = new cliProgress.SingleBar({
    format: colors.primary('Progress |') + colors.tertiary('{bar}') + colors.primary('| {percentage}% | {value}/{total} | {task}'),
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    ...options
  }, cliProgress.Presets.shades_classic);

  progressBar.start(total, 0, { task: 'Initializing...' });
  return progressBar;
}

/**
 * Update progress bar
 * 
 * @param {Object} progressBar - Progress bar instance
 * @param {number} current - Current step
 * @param {string} taskName - Current task name
 */
function updateProgress(progressBar, current, taskName) {
  progressBar.update(current, { task: taskName });
}

/**
 * Complete and hide progress bar
 * 
 * @param {Object} progressBar - Progress bar instance
 */
function completeProgress(progressBar) {
  progressBar.stop();
}

/**
 * Show welcome banner
 */
function showWelcome() {
  console.log(headings.h1('🎉 Welcome to AIOS v2.1 Installer!'));
  console.log(colors.info('Let\'s configure your project in just a few steps...\n'));
}

/**
 * Show completion message
 */
function showCompletion() {
  console.log('\n' + headings.divider());
  console.log(status.celebrate('Installation Complete!'));
  console.log(colors.info('Your AIOS project is ready to use.'));
  console.log(status.tip('Run `npm start` to launch your project'));
  console.log(headings.divider() + '\n');
}

/**
 * Show section header
 * 
 * @param {string} title - Section title
 */
function showSection(title) {
  console.log('\n' + headings.h2(title));
}

/**
 * Show cancellation message
 */
function showCancellation() {
  console.log('\n' + colors.warning('Installation cancelled.'));
  console.log(colors.info('Run `npx aios-fullstack@latest init` to try again.\n'));
}

/**
 * Estimate time remaining for progress
 * 
 * @param {number} current - Current step
 * @param {number} total - Total steps
 * @param {number} startTime - Start timestamp
 * @returns {string} Formatted time estimate
 */
function estimateTimeRemaining(current, total, startTime) {
  if (current === 0) return 'Calculating...';
  
  const elapsed = Date.now() - startTime;
  const avgTimePerStep = elapsed / current;
  const remaining = (total - current) * avgTimePerStep;
  
  const seconds = Math.ceil(remaining / 1000);
  
  if (seconds < 60) {
    return `~${seconds}s remaining`;
  }
  
  const minutes = Math.ceil(seconds / 60);
  return `~${minutes}m remaining`;
}

module.exports = {
  createSpinner,
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showTip,
  createProgressBar,
  updateProgress,
  completeProgress,
  showWelcome,
  showCompletion,
  showSection,
  showCancellation,
  estimateTimeRemaining
};

