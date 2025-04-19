import { GoogleGenerativeAI } from '@google/generative-ai';

// Function to initialize the Gemini model with an API key
export function initializeGeminiModel(apiKey: string) {
  if (!apiKey) {
    throw new Error('API key is required to initialize Gemini model');
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
}

// Function to generate a study plan based on user preferences
export async function generateStudyPlan(
  apiKey: string,
  subject: string,
  learningStyle: 'visual' | 'text' | 'interactive',
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
): Promise<string> {
  try {
    const model = initializeGeminiModel(apiKey);
    
    const prompt = `
      Create a detailed study plan for ${subject} at the ${skillLevel} level.
      The user prefers ${learningStyle} learning style.
      
      Include:
      1. A brief introduction to the subject
      2. Key concepts to focus on
      3. Recommended study resources
      4. Practice exercises or activities
      5. A suggested timeline
      
      Format the response in a clear, structured way with headings and bullet points.
      Keep the tone encouraging and supportive.
      Focus on ethical learning practices and critical thinking.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating study plan:', error);
    return 'Sorry, there was an error generating your study plan. Please try again later.';
  }
}

// Function to generate quiz questions for a specific topic
export async function generateQuizQuestions(
  apiKey: string,
  topic: string,
  difficulty: 'easy' | 'medium' | 'hard',
  count: number = 3
): Promise<Array<{
  question: string;
  options: string[];
  correctAnswer: number;
}>> {
  try {
    const model = initializeGeminiModel(apiKey);
    
    const prompt = `
      Generate ${count} multiple-choice questions about ${topic} at ${difficulty} difficulty level.
      Each question should have 4 options with one correct answer.
      Format the response as a JSON array with the following structure:
      [
        {
          "question": "The question text",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "correctAnswer": 0 (index of the correct option)
        }
      ]
      
      Make sure the questions test understanding rather than just memorization.
      Include an explanation for why the correct answer is right.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract the JSON part from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Failed to parse quiz questions from response');
    }
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    return [];
  }
}

// Function to get an ethical AI tip
export async function getEthicalTip(
  apiKey: string,
  category?: string
): Promise<string> {
  try {
    const model = initializeGeminiModel(apiKey);
    
    const prompt = `
      Provide a short, insightful tip about ethical AI use in education.
      ${category ? `Focus on the category: ${category}` : 'Choose any relevant category'}.
      Keep it concise (1-2 sentences) and practical.
      Make it encouraging and actionable for students.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating ethical tip:', error);
    return 'Remember to always verify information from AI sources.';
  }
} 