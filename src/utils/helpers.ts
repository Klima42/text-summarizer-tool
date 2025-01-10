// src/utils/helpers.ts
import { SummaryLength, LENGTH_CONFIG } from '../models/types';

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function getSummaryConfig(length: SummaryLength) {
  return LENGTH_CONFIG[length];
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

// src/utils/constants.ts
export const SUMMARY_LENGTHS = {
  short: 'Short (~1-2 paragraphs)',
  medium: 'Medium (~3-4 paragraphs)',
  long: 'Detailed (~5-6 paragraphs)',
} as const;

export const ERROR_MESSAGES = {
  EMPTY_INPUT: 'Please enter some text to summarize',
  TOO_SHORT: 'Text is too short for summarization',
  TOO_LONG: 'Text exceeds maximum length',
  API_ERROR: 'Failed to generate summary. Please try again.',
  INVALID_LENGTH: 'Invalid summary length selected',
} as const;