export const runtime = "nodejs";

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobRole, jobDescription } = await request.json();

    if (!resumeText || !jobRole) {
      return NextResponse.json(
        { error: 'Resume text and job role are required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { temperature: 0.5 },
    });

    const prompt = `Act as an expert technical interviewer...`; // same as before

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    const questions = response
      .split("\n")
      .filter((line) => /^\d+\./.test(line))
      .map((line) => line.replace(/^\d+\.\s*/, "").trim())
      .slice(0, 10);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
