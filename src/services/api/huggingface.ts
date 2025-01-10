// src/services/api/huggingface.ts
import { HfInference } from '@huggingface/inference';
import config from '../../config';

// Initialize the Hugging Face client
const hf = new HfInference(import.meta.env.VITE_HUGGING_FACE_TOKEN);

interface SummarizationOptions {
  maxLength?: number;
  minLength?: number;
  doSample?: boolean;
  temperature?: number;
}

export async function summarizeText(text: string, options: SummarizationOptions = {}) {
  try {
    const response = await hf.summarization({
      model: 'facebook/bart-large-cnn',  // You can change this to other models
      inputs: text,
      parameters: {
        max_length: options.maxLength || 130,
        min_length: options.minLength || 30,
        temperature: options.temperature || 0.7,
      }
    });

    return response.summary_text;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to generate summary');
  }
}

// Example usage with other models
export async function summarizeWithPegasus(text: string) {
  return hf.summarization({
    model: 'google/pegasus-xsum',
    inputs: text,
    parameters: {}
  });
}

export async function summarizeWithT5(text: string) {
  return hf.summarization({
    model: 't5-base',
    inputs: text,
    parameters: {}
  });
}