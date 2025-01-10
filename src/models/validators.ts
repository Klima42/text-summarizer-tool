import { ValidationResult } from './types';

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