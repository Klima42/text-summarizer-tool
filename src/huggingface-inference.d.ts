declare module '@huggingface/inference' {
  export class HfInference {
    constructor(token: string);
    summarization(options: { model: string; inputs: string; parameters: any }): Promise<any>;
    // Add other methods and types as needed
  }
} 