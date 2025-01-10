// src/config/index.ts
import { SummaryLength } from '../models/types';

export const config = {
  api: {
    huggingface: {
      baseUrl: 'https://api-inference.huggingface.co/models',
      model: 'facebook/bart-large-cnn',
      token: import.meta.env.VITE_HUGGING_FACE_TOKEN,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_HUGGING_FACE_TOKEN}`,
      },
    },
  },
  summary: {
    lengths: {
      short: {
        max: 130,
        min: 30,
        label: 'Short (~1-2 paragraphs)',
      },
      medium: {
        max: 250,
        min: 100,
        label: 'Medium (~3-4 paragraphs)',
      },
      long: {
        max: 400,
        min: 200,
        label: 'Detailed (~5-6 paragraphs)',
      },
    } as Record<SummaryLength, { max: number; min: number; label: string }>,
    defaultLength: 'medium' as const,
    options: {
      temperature: 0.7,
      topP: 0.9,
      repetitionPenalty: 1.2,
    },
  },
  validation: {
    text: {
      minLength: 50,
      maxLength: 10000,
    },
    timeout: 30000, // 30 seconds
    retries: 3,
  },
  ui: {
    animations: {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    theme: {
      light: {
        primary: '#0f172a',
        secondary: '#64748b',
        background: '#ffffff',
        surface: '#f8fafc',
      },
      dark: {
        primary: '#e2e8f0',
        secondary: '#94a3b8',
        background: '#0f172a',
        surface: '#1e293b',
      },
    },
    responsiveBreakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  features: {
    darkMode: true,
    autoSave: true,
    wordCount: true,
    readingTime: true,
  },
} as const;

// Type for the entire config object
export type Config = typeof config;

// Helper function to get summary length configuration
export const getSummaryLengthConfig = (length: SummaryLength) => {
  return config.summary.lengths[length];
};

// Helper function to get API configuration
export const getApiConfig = () => {
  return config.api.huggingface;
};

export default config;