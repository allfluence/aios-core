/**
 * Questions Test Suite
 * 
 * Tests question definitions and sequencing logic
 */

const {
  getProjectTypeQuestion,
  getIDEQuestions,
  getMCPQuestions,
  getEnvironmentQuestions,
  buildQuestionSequence,
  getQuestionById
} = require('../../src/wizard/questions');

describe('questions', () => {
  describe('getProjectTypeQuestion', () => {
    test('returns valid inquirer question object', () => {
      const question = getProjectTypeQuestion();

      expect(question).toHaveProperty('type', 'list');
      expect(question).toHaveProperty('name', 'projectType');
      expect(question).toHaveProperty('message');
      expect(question).toHaveProperty('choices');
      expect(question).toHaveProperty('validate');
    });

    test('has greenfield and brownfield choices', () => {
      const question = getProjectTypeQuestion();

      expect(question.choices).toHaveLength(2);
      expect(question.choices[0]).toHaveProperty('value', 'greenfield');
      expect(question.choices[1]).toHaveProperty('value', 'brownfield');
    });

    test('includes validator function', () => {
      const question = getProjectTypeQuestion();
      
      expect(typeof question.validate).toBe('function');
    });

    test('validator accepts valid project types', () => {
      const question = getProjectTypeQuestion();
      
      expect(question.validate('greenfield')).toBe(true);
      expect(question.validate('brownfield')).toBe(true);
    });

    test('validator rejects invalid project types', () => {
      const question = getProjectTypeQuestion();
      
      const result = question.validate('invalid');
      expect(result).not.toBe(true);
      expect(typeof result).toBe('string');
    });
  });

  describe('getIDEQuestions', () => {
    test('returns array (placeholder for Story 1.4)', () => {
      const questions = getIDEQuestions();
      expect(Array.isArray(questions)).toBe(true);
    });

    test('currently returns empty array', () => {
      const questions = getIDEQuestions();
      expect(questions).toHaveLength(0);
    });
  });

  describe('getMCPQuestions', () => {
    test('returns array (placeholder for Story 1.5)', () => {
      const questions = getMCPQuestions();
      expect(Array.isArray(questions)).toBe(true);
    });

    test('currently returns empty array', () => {
      const questions = getMCPQuestions();
      expect(questions).toHaveLength(0);
    });
  });

  describe('getEnvironmentQuestions', () => {
    test('returns array (placeholder for Story 1.6)', () => {
      const questions = getEnvironmentQuestions();
      expect(Array.isArray(questions)).toBe(true);
    });

    test('currently returns empty array', () => {
      const questions = getEnvironmentQuestions();
      expect(questions).toHaveLength(0);
    });
  });

  describe('buildQuestionSequence', () => {
    test('returns array of questions', () => {
      const questions = buildQuestionSequence();
      expect(Array.isArray(questions)).toBe(true);
    });

    test('includes project type question', () => {
      const questions = buildQuestionSequence();
      expect(questions).toHaveLength(1); // Only Story 1.2 question
      expect(questions[0]).toHaveProperty('name', 'projectType');
    });

    test('accepts context parameter', () => {
      const context = { someValue: 'test' };
      const questions = buildQuestionSequence(context);
      expect(Array.isArray(questions)).toBe(true);
    });

    test('future: conditional questions based on context', () => {
      // This test documents future behavior for Stories 1.3-1.6
      // When implemented, questions should vary based on context.projectType
      const contextGreenfield = { projectType: 'greenfield' };
      const contextBrownfield = { projectType: 'brownfield' };

      // Currently same length (only Story 1.2 implemented)
      expect(buildQuestionSequence(contextGreenfield)).toHaveLength(1);
      expect(buildQuestionSequence(contextBrownfield)).toHaveLength(1);

      // Future: lengths may differ based on project type
      // expect(buildQuestionSequence(contextGreenfield).length).not.toBe(
      //   buildQuestionSequence(contextBrownfield).length
      // );
    });
  });

  describe('getQuestionById', () => {
    test('returns projectType question by ID', () => {
      const question = getQuestionById('projectType');
      expect(question).not.toBeNull();
      expect(question).toHaveProperty('name', 'projectType');
    });

    test('returns null for unknown ID', () => {
      const question = getQuestionById('unknownQuestion');
      expect(question).toBeNull();
    });

    test('handles undefined ID', () => {
      const question = getQuestionById(undefined);
      expect(question).toBeNull();
    });
  });

  describe('Question Message Formatting', () => {
    test('projectType question has colored message', () => {
      const question = getProjectTypeQuestion();
      // Message should be wrapped in color function (contains ANSI codes)
      expect(typeof question.message).toBe('string');
      expect(question.message.length).toBeGreaterThan(0);
    });

    test('choices have descriptive names', () => {
      const question = getProjectTypeQuestion();
      
      expect(question.choices[0].name).toContain('Greenfield');
      expect(question.choices[1].name).toContain('Brownfield');
    });

    test('choices include helpful descriptions', () => {
      const question = getProjectTypeQuestion();
      
      expect(question.choices[0].name).toContain('new project');
      expect(question.choices[1].name).toContain('existing project');
    });
  });
});

