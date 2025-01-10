// src/components/Summarizer/SummaryOutput.tsx
import React from 'react';
import { SummaryOutputProps } from '../../models/interfaces';
import { Loader2 } from 'lucide-react';

const SummaryOutput: React.FC<SummaryOutputProps> = ({
  summary,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2">Generating summary...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        <h3 className="font-bold">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="text-gray-500 p-4">
        Your summary will appear here...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-bold mb-2">Summary</h3>
        <p>{summary.summarizedText}</p>
      </div>
      
      <div className="text-sm text-gray-500">
        <div className="grid grid-cols-2 gap-4">
          <div>
            Original length: {summary.wordCount.original} words
          </div>
          <div>
            Summary length: {summary.wordCount.summary} words
          </div>
          <div>
            Processing time: {summary.processingTime}ms
          </div>
          <div>
            Compression ratio: {summary.metadata.summaryRatio.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryOutput;