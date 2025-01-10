// src/services/nlp/preprocessor.ts
import { PreprocessFunction } from '../../models/types';

interface PreprocessOptions {
  removeStopWords?: boolean;
  lowercase?: boolean;
  removePunctuation?: boolean;
  removeExtraSpaces?: boolean;
  removeNumbers?: boolean;
  removeUrls?: boolean;
  removeEmails?: boolean;
}

const DEFAULT_STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for',
  'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on',
  'that', 'the', 'to', 'was', 'were', 'will', 'with'
]);

export const preprocessText: PreprocessFunction = (
  text: string,
  options: PreprocessOptions = {}
) => {
  const {
    removeStopWords = true,
    lowercase = true,
    removePunctuation = true,
    removeExtraSpaces = true,
    removeNumbers = false,
    removeUrls = true,
    removeEmails = true,
  } = options;

  let processedText = text;

  // Convert to lowercase if specified
  if (lowercase) {
    processedText = processedText.toLowerCase();
  }

  // Remove URLs if specified
  if (removeUrls) {
    processedText = processedText.replace(
      /https?:\/\/[^\s]+/g,
      ''
    );
  }

  // Remove emails if specified
  if (removeEmails) {
    processedText = processedText.replace(
      /[\w\.-]+@[\w\.-]+\.\w+/g,
      ''
    );
  }

  // Remove numbers if specified
  if (removeNumbers) {
    processedText = processedText.replace(/\d+/g, '');
  }

  // Remove punctuation if specified
  if (removePunctuation) {
    processedText = processedText.replace(
      /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
      ''
    );
  }

  // Remove extra spaces if specified
  if (removeExtraSpaces) {
    processedText = processedText
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Remove stop words if specified
  if (removeStopWords) {
    processedText = processedText
      .split(' ')
      .filter(word => !DEFAULT_STOP_WORDS.has(word.toLowerCase()))
      .join(' ');
  }

  return processedText;
};

export const countWords = (text: string): number => {
  return text.trim().split(/\s+/).length;
};

export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = countWords(text);
  return Math.ceil(words / wordsPerMinute);
};

export const truncateText = (
  text: string,
  maxLength: number,
  endWith: string = '...'
): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - endWith.length) + endWith;
};