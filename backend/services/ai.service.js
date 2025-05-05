import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_key });

export async function getAIGeneratedContent(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    systemInstruction: "You are an expert in MERN and Development. You have an experience of 10 years in the development. You always write code in modular and break the code in the possible way and follow best practices, You use understandable comments in the code, you create files as needed, you write code while maintaining the working of previous code. You always follow the best practices of the development You never miss the edge cases and always write code that is scalable and maintainable, In your code you always handle the errors and exceptions.",
  });

  return response.text
}