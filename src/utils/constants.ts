// src/utils/constants.ts
export const SUMMARY_LENGTHS = {
    short: 'Short (~1-2 paragraphs)',
    medium: 'Medium (~3-4 paragraphs)',
    long: 'Detailed (~5-6 paragraphs)',
  } as const;
  
  export type SummaryLength = keyof typeof SUMMARY_LENGTHS;
  
  export const ERROR_MESSAGES = {
    EMPTY_INPUT: 'Please enter some text to summarize',
    TOO_SHORT: 'Text is too short for summarization (minimum 50 characters)',
    TOO_LONG: 'Text exceeds maximum length (10,000 characters)',
    API_ERROR: 'Failed to generate summary. Please try again.',
    INVALID_LENGTH: 'Invalid summary length selected',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
  } as const;
  
  export const SUMMARY_CONFIG = {
    short: {
      maxLength: 130,
      minLength: 30,
      compressionRatio: 0.25,
    },
    medium: {
      maxLength: 250,
      minLength: 100,
      compressionRatio: 0.5,
    },
    long: {
      maxLength: 400,
      minLength: 200,
      compressionRatio: 0.75,
    },
  } as const;
  
  export const API_CONFIG = {
    baseUrl: 'https://api-inference.huggingface.co/models',
    model: 'facebook/bart-large-cnn',
    timeout: 30000, // 30 seconds
    retries: 3,
  } as const;
  
  export const VALIDATION_RULES = {
    text: {
      minLength: 50,
      maxLength: 10000,
    },
    processing: {
      timeout: 60000, // 1 minute
    },
  } as const;
  
  export const UI_CONSTANTS = {
    inputPlaceholder: 'Enter or paste your text here...',
    loadingText: 'Generating summary...',
    errorTitle: 'Error',
    defaultSummaryText: 'Your summary will appear here...',
    wordCount: {
      wordsPerMinute: 200, // for reading time calculation
    },
  } as const;