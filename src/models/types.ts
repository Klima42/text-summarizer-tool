export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface SummaryOptions {
  minLength: number;
  maxLength: number;
  doSample: boolean;
  temperature?: number;
  topP?: number;
}

export const LENGTH_CONFIG: Record<SummaryLength, { maxLength: number; minLength: number }> = {
  short: { maxLength: 100, minLength: 50 },
  medium: { maxLength: 200, minLength: 100 },
  long: { maxLength: 300, minLength: 200 },
} as const;

export type SummaryLength = 'short' | 'medium' | 'long';

export type ModelType = 'bart' | 't5' | 'gpt' | 'custom';

export type ProcessingStatus = 'idle' | 'processing' | 'completed' | 'error';

export type SummarizeFunction = (
  text: string,
  options: SummaryOptions
) => Promise<SummaryResult>;

export type PreprocessFunction = (
  text: string,
  options?: {
    removeStopWords?: boolean;
    lowercase?: boolean;
    removePunctuation?: boolean;
  }
) => string;

export interface SummaryResult {
  originalText: string;
  summarizedText: string;
  summaryLength: SummaryLength;
  wordCount: {
    original: number;
    summary: number;
  };
  processingTime: number;
  metadata: {
    timestamp: Date;
    model: string;
    summaryRatio: number;
  };
}

export interface UseSummary {
  summary: SummaryResult | null;
  isProcessing: boolean;
  error: string | undefined;
  generateSummary: (text: string, length: SummaryLength) => Promise<void>;
  reset: () => void;
}

// Custom type guards
export function isSummaryResult(obj: any): obj is SummaryResult {
  return (
    obj &&
    typeof obj.originalText === 'string' &&
    typeof obj.summarizedText === 'string' &&
    typeof obj.summaryLength === 'string' &&
    typeof obj.processingTime === 'number' &&
    typeof obj.wordCount === 'object'
  );
}
