import { SummaryLength } from './types';

export interface SummaryOptions {
    maxLength: number;
    minLength: number;
    doSample: boolean;
    temperature?: number;
    topP?: number;
  }
  
  export interface SummaryResult {
    originalText: string;
    summarizedText: string;
    summaryLength: SummaryLength;
    processingTime: number;
    wordCount: {
      original: number;
      summary: number;
    };
    metadata: SummaryMetadata;
  }
  
  export interface SummaryMetadata {
    timestamp: Date;
    model: string;
    confidenceScore?: number;
    summaryRatio: number;
  }
  
  export interface TextInputProps {
    value: string;
    onChange: (text: string) => void;
    placeholder?: string;
    disabled?: boolean;
    maxLength?: number;
  }
  
  export interface SummaryOutputProps {
    summary: SummaryResult | null;
    isLoading: boolean;
    error?: string;
  }
  
  export interface ControlsProps {
    onGenerateSummary: () => void;
    summaryLength: SummaryLength;
    onLengthChange: (length: SummaryLength) => void;
    disabled?: boolean;
    isProcessing: boolean;
  }
  