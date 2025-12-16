// backend/src/controllers/ai.controller.ts
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateCoverLetterController = async ({ user, body }: any) => {
  try {
    const { jobTitle, skills, experience } = body;
    const prompt = `Schreibe ein professionelles Anschreiben für die Bewerbung als ${jobTitle}.\nSkills: ${skills.join(', ')}\nErfahrung: ${experience}`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Du bist ein Karriere-Coach und Bewerbungsexperte.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500
    });
    const text = completion.choices[0]?.message?.content || '';
    return { success: true, coverLetter: text };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
