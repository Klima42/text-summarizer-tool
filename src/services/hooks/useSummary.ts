// src/hooks/useSummary.ts
import { useState, useCallback } from 'react';
import { generateSummary } from '../../services/nlp/summarizer';
import { preprocessText } from '../../services/nlp/preprocessor';
import {
  SummaryResult,
  SummaryLength,
  UseSummary,
} from '../../models/types';
import { validateInputText } from '../../models/validators';

export function useSummary(): UseSummary {
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummaryCallback = useCallback(
    async (text: string, length: SummaryLength) => {
      setError(null);
      setIsProcessing(true);

      try {
        // Validate input
        const validation = validateInputText(text);
        if (!validation.isValid) {
          throw new Error(validation.errors.join('. '));
        }

        // Preprocess text
        const processedText = preprocessText(text);

        // Generate summary
        const result = await generateSummary(processedText, length);
        setSummary(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setSummary(null);
    setError(null);
    setIsProcessing(false);
  }, []);

  return {
    summary,
    isProcessing,
    error,
    generateSummary: generateSummaryCallback,
    reset,
  };
}