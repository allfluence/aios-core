/**
 * Wizard Questions Definitions
 * 
 * Modular question system for AIOS installation wizard
 * Questions from Stories 1.3-1.6 will be added here
 * 
 * @module wizard/questions
 */

const { colors } = require('../utils/aios-colors');
const { createInquirerValidator, validateProjectType } = require('./validators');

/**
 * Get project type question (Story 1.3)
 * This is a placeholder - full implementation in Story 1.3
 * 
 * @returns {Object} Inquirer question object
 */
function getProjectTypeQuestion() {
  return {
    type: 'list',
    name: 'projectType',
    message: colors.primary('What type of project are you setting up?'),
    choices: [
      {
        name: colors.highlight('Greenfield') + colors.dim(' (new project from scratch)'),
        value: 'greenfield'
      },
      {
        name: 'Brownfield' + colors.dim(' (existing project integration)'),
        value: 'brownfield'
      }
    ],
    default: 0,
    validate: createInquirerValidator(validateProjectType)
  };
}

/**
 * Get IDE selection questions (Story 1.4)
 *
 * @returns {Object[]} Array of inquirer question objects
 */
function getIDEQuestions() {
  const { getIDESelectionQuestion } = require('./ide-selector');
  return [getIDESelectionQuestion()];
}

/**
 * Get MCP selection questions (Story 1.5)
 * This is a placeholder - full implementation in Story 1.5
 * 
 * @returns {Object[]} Array of inquirer question objects
 */
function getMCPQuestions() {
  // Placeholder - Story 1.5 will implement MCP selection
  return [];
}

/**
 * Get environment configuration questions (Story 1.6)
 * This is a placeholder - full implementation in Story 1.6
 * 
 * @returns {Object[]} Array of inquirer question objects
 */
function getEnvironmentQuestions() {
  // Placeholder - Story 1.6 will implement environment config
  return [];
}

/**
 * Build complete question sequence
 * Allows conditional questions based on previous answers
 *
 * @param {Object} context - Context with previous answers
 * @returns {Object[]} Array of questions
 */
function buildQuestionSequence(_context = {}) {
  const questions = [];

  // Story 1.2: Foundation (project type only)
  questions.push(getProjectTypeQuestion());

  // Story 1.4: IDE Selection
  questions.push(...getIDEQuestions());

  // Story 1.5-1.6: Additional questions (added in future stories)
  // Future: Conditional questions based on projectType
  // if (context.projectType === 'greenfield') { ... }

  return questions;
}

/**
 * Get question by ID
 * Useful for testing individual questions
 * 
 * @param {string} questionId - Question identifier
 * @returns {Object|null} Question object or null if not found
 */
function getQuestionById(questionId) {
  const questionMap = {
    'projectType': getProjectTypeQuestion(),
    // Future questions will be added here
  };

  return questionMap[questionId] || null;
}

module.exports = {
  getProjectTypeQuestion,
  getIDEQuestions,
  getMCPQuestions,
  getEnvironmentQuestions,
  buildQuestionSequence,
  getQuestionById
};

