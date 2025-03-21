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
    // const models = await genAI.getAvailableModels();
    // console.log("Available models:", models);

   
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.5,
      },
    });

    const prompt = `Act as an expert technical interviewer. Analyze this resume and job description for a ${jobRole} position:

Candidate Resume:
${resumeText}

Job Description:
${jobDescription}

Generate 10 technical interview questions that:
1. Focus on overlapping technical requirements between the resume and JD
2. Probe areas where the resume's experience directly matches the JD's key requirements
3. Explore technologies mentioned in both documents (prioritizing JD's primary tech stack)
4. Identify crucial JD requirements that appear in the resume
5. Highlight any important JD requirements that are missing/weak in the resume
6. Include scenario-based questions using the candidate's specific experience

Format requirements:
- Questions should be ordered by JD priority
- Avoid generic questions
- Include at least 2 questions about potential skill gaps
- Make questions specific to technologies/experiences mentioned in both documents`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    console.log(response)
    // Improved question parsing
    const questions = response.split('\n')
      .filter(line => /^\d+\./.test(line))
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .slice(0, 10); 

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    return NextResponse.json(
      { error: 'Failed to generate questions' },
      { status: 500 }
    );
  }
}