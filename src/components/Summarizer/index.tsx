// src/components/Summarizer/index.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import Button from '../ui/button';
import TextInput from './TextInput';
import SummaryOutput from './SummaryOutput';
import { useSummary } from '../../services/hooks/useSummary';
import { SummaryLength, SUMMARY_LENGTHS } from '../../utils/constants';

export const TextSummarizer: React.FC = () => {
  const [text, setText] = useState('');
  const [summaryLength, setSummaryLength] = useState<SummaryLength>('medium');
  const { summary, isProcessing, error, generateSummary } = useSummary();

  const handleGenerateSummary = () => {
    generateSummary(text, summaryLength);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Text Summarizer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <TextInput
              value={text}
              onChange={setText}
              disabled={isProcessing}
              maxLength={10000}
            />
            <div className="flex items-center space-x-4">
              <select
                className="p-2 border rounded-lg flex-1"
                value={summaryLength}
                onChange={(e) => setSummaryLength(e.target.value as SummaryLength)}
                disabled={isProcessing}
              >
                {Object.entries(SUMMARY_LENGTHS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <Button
                onClick={handleGenerateSummary}
                disabled={!text.trim() || isProcessing}
              >
                Generate Summary
              </Button>
            </div>
          </div>
          <div>
            <SummaryOutput
              summary={summary}
              isLoading={isProcessing}
              error={error ?? undefined}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};