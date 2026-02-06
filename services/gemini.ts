import { GoogleGenerativeAI } from '@google/generative-ai';

// Replace with your actual API key or use environment variables
const API_KEY = 'YOUR_GEMINI_API_KEY_HERE';

const getAI = () => {
  if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    console.warn('Gemini API key not configured');
    return null;
  }
  return new GoogleGenerativeAI(API_KEY);
};

export const generateNoorResponse = async (
  userMessage: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
) => {
  const ai = getAI();
  if (!ai) {
    return "I'm currently offline. Please configure the Gemini API key.";
  }

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({
      history: history,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return "I'm having trouble connecting right now. Please try again.";
  }
};

export const summarizeThread = async (messages: string[]) => {
  const ai = getAI();
  if (!ai) {
    return 'Summary unavailable - API not configured.';
  }

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-pro' });
    const textToSummarize = messages.join('\n');
    const prompt = `Please summarize the following women's community chat thread into 3 short bullet points (max 150 characters total):\n\n${textToSummarize}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini summarize error:', error);
    return 'Unable to generate summary at this time.';
  }
};

export const checkHateSpeech = async (text: string): Promise<boolean> => {
  // Simple client-side check - in production, use proper moderation API
  const badWords = ['hate', 'kill', 'stupid', 'ugly'];
  return badWords.some((word) => text.toLowerCase().includes(word));
};
