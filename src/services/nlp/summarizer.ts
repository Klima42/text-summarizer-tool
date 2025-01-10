// src/services/summarizer.ts
import { HfInference } from '@huggingface/inference';

function preprocessText(text: string): string {
  // Nettoyer le texte plus agressivement
  const cleanedText = text
    // Supprimer les en-têtes et les puces
    .replace(/^#+\s*(.*)/gm, '$1')
    .replace(/^-\s+/gm, '')
    .replace(/^\s*-\s+/gm, '')
    // Supprimer les sections numérotées
    .replace(/^\d+\.\s+/gm, '')
    // Nettoyer la mise en forme
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('. ')
    // Nettoyer la ponctuation multiple
    .replace(/\.+/g, '.')
    .replace(/\s+/g, ' ')
    .trim();

  // Garantir que le texte ne dépasse pas une certaine longueur
  const maxInputLength = 1024;
  return cleanedText.length > maxInputLength 
    ? cleanedText.slice(0, maxInputLength) + '...'
    : cleanedText;
}

export async function generateSummary(text: string, length: string) {
  try {
    const hf = new HfInference(import.meta.env.VITE_HUGGING_FACE_TOKEN);
    
    const cleanedText = preprocessText(text);

    // Configurer les longueurs en fonction du choix
    const lengthConfig = {
      short: { max_length: 75, min_length: 30 },
      medium: { max_length: 150, min_length: 50 },
      long: { max_length: 250, min_length: 100 }
    }[length] || { max_length: 150, min_length: 50 };

    // Utiliser BART-large-xsum qui est spécialisé dans les résumés concis
    const response = await hf.summarization({
      model: 'facebook/bart-large-xsum',
      inputs: cleanedText,
      parameters: {
        ...lengthConfig,
        num_beams: 4,
        length_penalty: 2.0,
        no_repeat_ngram_size: 3,
        early_stopping: true
      }
    });

    // Post-traitement du résumé
    let summary = response.summary_text
      .replace(/\s+/g, ' ')
      .replace(/\s+\./g, '.')
      .replace(/\s+,/g, ',')
      .trim();

    // S'assurer que le résumé n'est pas trop similaire au texte d'origine
    if (summary === cleanedText) {
      throw new Error('Generated summary is identical to input');
    }

    return summary;

  } catch (error: any) {
    console.error('Summarization error:', error);

    // Essayer une approche de repli si la première échoue
    try {
      const hf = new HfInference(import.meta.env.VITE_HUGGING_FACE_TOKEN);
      const response = await hf.summarization({
        model: 'facebook/bart-large-cnn',
        inputs: preprocessText(text).slice(0, 500),
        parameters: {
          max_length: 100,
          min_length: 30,
          do_sample: true,
          temperature: 0.7
        }
      });
      return response.summary_text;
    } catch {
      return "Failed to generate summary. The text might be too complex or too long. Try with a shorter section.";
    }
  }
}