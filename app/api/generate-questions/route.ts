import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobRole } = await request.json();

    if (!resumeText || !jobRole) {
      return NextResponse.json(
        { error: 'Resume text and job role are required' },
        { status: 400 }
      );
    }
    // const models = await genAI.getAvailableModels();
    // console.log("Available models:", models);

    // Use the latest model name and configuration
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.5,
      },
    });

    const prompt = `Act as an expert technical interviewer. Analyze this resume for a ${jobRole} position:
    
    ${resumeText}
    
    Generate 5 technical interview questions specifically tailored to the candidate's experience and skills. Focus on:
    - Technologies mentioned in their resume
    - Job-specific technical requirements
    - Potential skill gaps in their experience`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    console.log(response)
    // Improved question parsing
    const questions = response.split('\n')
      .filter(line => /^\d+\./.test(line))
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .slice(0, 5); // Ensure exactly 5 questions

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    return NextResponse.json(
      { error: 'Failed to generate questions' },
      { status: 500 }
    );
  }
}