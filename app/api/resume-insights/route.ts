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
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.5,
      },
    });

    const prompt = `Act as an expert technical recruiter. Analyze the skills mentioned in the following resume and assess their proficiency level in percentage based on the context provided:

Candidate Resume:
${resumeText}

Job Description:
${jobDescription}

Generate a list of technical skills along with their proficiency percentage based on the following criteria:
1. Identify all technical skills mentioned in the resume.
2. Assess the proficiency level of each skill based on the context, experience, and frequency of mention in the resume.
3. Provide the proficiency percentage for each skill, ensuring it reflects the candidate's expertise level.
4. Highlight any skills that are crucial for the ${jobRole} position but are missing or weak in the resume.

Format requirements:

- Order the skills by their relevance to the ${jobRole} position.
- Include a brief explanation for the proficiency assessment if necessary.
- Keep in mind to adhere strictly to this format:{
  "skills": [
    { "skill": "JavaScript", "proficiency": "92%" },
    { "skill": "React", "proficiency": "88%" },
    { "skill": "Node.js", "proficiency": "75%" },
    { "skill": "SQL", "proficiency": "80%" }
  ]
},
- There should be no other text in the response apart from the above format.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    console.log(response);

    // Parse the response to extract skills and proficiency percentages
    const skills = response.split('\n')
      .filter(line => line.includes('Proficiency'))
      .map(line => {
        const [skill, proficiency] = line.split(': Proficiency ');
        return {
          skill: skill.trim(),
          proficiency: proficiency.trim()
        };
      });

    return NextResponse.json({ skills });
  } catch (error) {
    console.error('Error analyzing skills:', error);
    return NextResponse.json(
      { error: 'Failed to analyze skills' },
      { status: 500 }
    );
  }
}