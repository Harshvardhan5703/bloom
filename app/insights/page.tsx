'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useResumeContext } from '@/context/ResumeContext'; // Adjust the import path as needed

// Types for candidate data
interface CandidateData {
  personalInfo: {
    name: string;
    position?: string;
    appliedDays?: number;
    avatar: string;
  };
  hireabilityScore: number;
  hireabilityTrend: number[];
  technicalScore: string;
  culturalFit: string;
  communicationScore: string;
  stressLevel: number;
  confidenceLevel: number;
  performanceTrend: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
  interviewAreas: {
    labels: string[];
    scores: number[];
  };
  redFlags: string[];
  strengths: string[];
}

// Types for technical skills
interface TechnicalSkill {
  skill: string;
  score: number;
}

// Mock data for development
const mockCandidateData: CandidateData = {
  personalInfo: {
    name: "Anant",
    avatar: "A"
  },
  hireabilityScore: 75,
  hireabilityTrend: [65, 70, 75, 85],
  technicalScore: "-",
  culturalFit: "-",
  communicationScore: "-",
  stressLevel: 42,
  confidenceLevel: 85,
  performanceTrend: {
    labels: ["Technical", "Behavioral", "Coding Test", "System Design", "Final"],
    datasets: [
      {
        label: "Anant",
        data: [92, 78, 85, 65, 85]
      },
      {
        label: "Average Hire",
        data: [80, 75, 75, 78, 80]
      }
    ]
  },
  interviewAreas: {
    labels: [
      'Problem Solving',
      'Technical Knowledge',
      'Communication',
      'Cultural Fit',
      'Leadership',
      'Learning Ability'
    ],
    scores: [90, 85, 70, 80, 65, 85]
  },
  redFlags: [
    "Struggled with system design questions",
    "Limited DevOps experience",
    "Higher than average stress level"
  ],
  strengths: [
    "Strong JavaScript and React skills",
    "Clear communication of technical concepts",
    "Good problem-solving approach",
    "Previous experience in similar role"
  ]
};

// Helper function to determine score color class
const getScoreColorClass = (score: number): string => {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

// Component for skill bar
const SkillBar: React.FC<{ skill: string; score: number }> = ({ skill, score }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{skill}</span>
        <span>{score}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded">
        <div 
          className={`h-full rounded ${getScoreColorClass(score)}`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

// Card component
interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg p-4 ${className}`}>
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      <div className="h-full">{children}</div>
    </div>
  );
};

// MetricDisplay component
interface MetricDisplayProps {
  label: string;
  value: number;
  unit?: string;
}

const MetricDisplay: React.FC<MetricDisplayProps> = ({ label, value, unit = "" }) => {
  return (
    <div className="text-center mb-4">
      <div className="text-sm text-gray-400">{label}</div>
      <div className={`text-3xl font-bold mt-1 ${value >= 80 ? 'text-green-500' : value >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
        {value}{unit}
      </div>
    </div>
  );
};

// Main dashboard component
const RecruitmentDashboard: React.FC = () => {
  const [candidate, setCandidate] = useState<CandidateData | null>(null);
  const [technicalSkills, setTechnicalSkills] = useState<TechnicalSkill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { resumeText, jobRole, jobDescription } = useResumeContext(); // Access context data

  useEffect(() => {
    const fetchTechnicalSkills = async () => {
      try {
        // Fetch technical skills from the API
        const response = await fetch('/api/resume-insights', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resumeText,
            jobRole,
            jobDescription,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch technical skills');
        }

        const data = await response.json();

        // Set technical skills independently
        setTechnicalSkills(
          data.skills.map((skill: { skill: string; proficiency: string }) => ({
            skill: skill.skill,
            score: parseInt(skill.proficiency.replace('%', '')),
          }))
        );

      } catch (error) {
        console.error('Error fetching technical skills:', error);
        // Fallback to mock data if API fails
        setTechnicalSkills([]);
      } finally {
        setLoading(false);
      }
    };

    if (resumeText && jobRole && jobDescription) {
      fetchTechnicalSkills();
    }
  }, [resumeText, jobRole, jobDescription]); // Re-run effect when context data changes

  useEffect(() => {
    // Set candidate data (without technical skills)
    setCandidate(mockCandidateData);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white">Loading candidate data...</div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white">Failed to load candidate data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className='items-center text-white text-center text-2xl'>
        <Link href={'/'}>Home</Link>
      </div>
      {/* Header with candidate info */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
            {candidate.personalInfo.avatar}
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{candidate.personalInfo.name}</h1>
            <p className="text-gray-400">
              {/* {candidate.personalInfo.position} • Applied {candidate.personalInfo.appliedDays} days ago */}
            </p>
          </div>
        </div>

        <div className={`text-2xl font-bold py-1 px-4 rounded-full ${getScoreColorClass(candidate.hireabilityScore)}`}>
          {candidate.hireabilityScore}%
        </div>
      </div>

      {/* Dashboard grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hireability score */}
        <Card title="Hireability Score" className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-500">{candidate.hireabilityScore}%</div>
              <div className="text-sm text-gray-400 mt-2">Overall match for this position</div>
            </div>
          </div>
        </Card>

        {/* Stress & Confidence */}
        <Card title="Stress & Confidence Levels">
          <div className="flex justify-around h-full items-center">
            <div className="text-center">
              <div className="inline-block w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center">
                <span className="text-xl font-bold">{candidate.stressLevel}%</span>
              </div>
              <div className="text-sm text-gray-400 mt-2">Stress Level</div>
            </div>
            <div className="text-center">
              <div className="inline-block w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
                <span className="text-xl font-bold">{candidate.confidenceLevel}%</span>
              </div>
              <div className="text-sm text-gray-400 mt-2">Confidence</div>
            </div>
          </div>
        </Card>

        {/* Key metrics */}
        <Card title="Key Metrics">
          <div className="h-full flex flex-col justify-between">
           {/* @ts-ignore rule */}
            <MetricDisplay label="Technical Score" value={candidate.technicalScore} />
              {/* @ts-ignore rule */}
            <MetricDisplay label="Cultural Fit" value={candidate.culturalFit} />
              {/* @ts-ignore rule */}
            <MetricDisplay label="Communication" value={candidate.communicationScore} />
          </div>
        </Card>

        {/* Technical skills */}
        <Card title="Technical Skills" className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {technicalSkills.map((skill, index) => (
              <SkillBar key={index} skill={skill.skill} score={skill.score} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RecruitmentDashboard;