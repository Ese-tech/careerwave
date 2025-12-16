// backend/types/openai.d.ts
declare module 'openai' {
  export class OpenAI {
    constructor(config: { apiKey: string });
    chat: {
      completions: {
        create(params: {
          model: string;
          messages: { role: string; content: string }[];
          max_tokens?: number;
        }): Promise<{ choices: { message: { content: string } }[] }>;
      };
    };
  }
}
