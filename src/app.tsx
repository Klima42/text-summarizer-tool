// src/App.tsx
import React, { useState } from 'react';
import { generateSummary } from './services/nlp/summarizer';

function App() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [summaryLength, setSummaryLength] = useState('medium');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSummary('');

    try {
      console.log('Starting summarization...');
      const result = await generateSummary(text, summaryLength);
      setSummary(result);
      console.log('Summarization complete');
    } catch (err: any) {
      console.error('App error:', err);
      setError(err.message || 'Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">
          Text Summarizer
        </h1>

        {/* Debug info - remove in production */}
        <div className="mb-4 p-2 bg-yellow-100 rounded text-sm">
          API Token: {import.meta.env.VITE_HUGGING_FACE_TOKEN ? 'Present' : 'Missing'}
        </div>

        <div className="bg-white rounded p-6 shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Enter your text (min. 50 characters)
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-64 p-2 border rounded"
                placeholder="Paste your text here..."
                minLength={50}
                required
              />
              <div className="text-sm text-gray-500 mt-1">
                Characters: {text.length}
              </div>
            </div>

            <div className="flex gap-4">
              <select 
                className="border rounded p-2"
                value={summaryLength}
                onChange={(e) => setSummaryLength(e.target.value)}
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>

              <button
                type="submit"
                disabled={!text.trim() || loading || text.length < 50}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Summarize'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded">
              {error}
            </div>
          )}

          {loading && (
            <div className="mt-4 p-4 bg-blue-50 text-blue-600 rounded">
              Generating summary...
            </div>
          )}

          {summary && !error && (
            <div className="mt-8 p-4 bg-gray-50 rounded">
              <h2 className="text-lg font-bold mb-2">Summary</h2>
              <p>{summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App