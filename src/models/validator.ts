import { ValidationResult, SummaryOptions, SummaryLength } from './types';

export function validateInputText(text: string): ValidationResult {
  const errors: string[] = [];

  if (!text.trim()) {
    errors.push('Input text cannot be empty');
  }

  if (text.length < 50) {
    errors.push('Input text must be at least 50 characters long');
  }

  if (text.length > 10000) {
    errors.push('Input text must not exceed 10,000 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateSummaryOptions(options: SummaryOptions): ValidationResult {
  const errors: string[] = [];

  if (options.maxLength <= options.minLength) {
    errors.push('Maximum length must be greater than minimum length');
  }

  if (options.temperature && (options.temperature < 0 || options.temperature > 1)) {
    errors.push('Temperature must be between 0 and 1');
  }

  if (options.topP && (options.topP < 0 || options.topP > 1)) {
    errors.push('Top P must be between 0 and 1');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateSummaryLength(length: string): length is SummaryLength {
  return ['short', 'medium', 'long'].includes(length);
}

export const summaryConstraints = {
  text: {
    minLength: 50,
    maxLength: 10000,
  },
  options: {
    temperature: {
      min: 0,
      max: 1,
    },
    topP: {
      min: 0,
      max: 1,
    },
  },
} as const;