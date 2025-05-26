interface OpenAIMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }
  
  interface OpenAIResponse {
    choices: {
      message: {
        content: string;
      };
    }[];
  }
  
  export class OpenAIService {
    private apiKey: string;
    private baseURL = 'https://api.openai.com/v1/chat/completions';
  
    constructor(apiKey: string) {
      this.apiKey = apiKey;
    }
  
    async generateSuggestion(
      field: string,
      existingText?: string
    ): Promise<string> {
      const messages: OpenAIMessage[] = [
        {
          role: 'system',
          content: `You are an assistant helping people write descriptions for a government social support application. Be empathetic, professional, and help them articulate their situation clearly and respectfully. Keep responses concise but detailed enough to be helpful.`,
        },
      ];
  
      let userPrompt = '';
      switch (field) {
        case 'currentFinancialSituation':
          userPrompt = existingText
            ? `Help me improve this description of my current financial situation: "${existingText}"`
            : 'Help me describe my current financial situation for a social support application. I need to explain my financial hardships clearly and professionally.';
          break;
        case 'employmentCircumstances':
          userPrompt = existingText
            ? `Help me improve this description of my employment circumstances: "${existingText}"`
            : 'Help me describe my employment circumstances for a social support application. I need to explain my current job situation and any challenges I face.';
          break;
        case 'reasonForApplying':
          userPrompt = existingText
            ? `Help me improve this explanation of why I am applying for support: "${existingText}"`
            : 'Help me explain why I am applying for government social support. I need to clearly state my need for assistance and how it would help my situation.';
          break;
        default:
          throw new Error('Invalid field specified');
      }
  
      messages.push({
        role: 'user',
        content: userPrompt,
      });
  
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
          max_tokens: 200,
          temperature: 0.7,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }
  
      const data: OpenAIResponse = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from OpenAI');
      }
  
      return data.choices[0].message.content.trim();
    }
  }
  
  let openAIService: OpenAIService | null = null;
  
  export const getOpenAIService = (apiKey?: string): OpenAIService => {
    if (!openAIService && apiKey) {
      openAIService = new OpenAIService(apiKey);
    }
    if (!openAIService) {
      throw new Error('OpenAI service not initialized. Please provide an API key.');
    }
    return openAIService;
  };
  
  export const setOpenAIApiKey = (apiKey: string) => {
    openAIService = new OpenAIService(apiKey);
  };
  