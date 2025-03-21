'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ResumeContextType {
  resumeText: string;
  jobRole: string;
  jobDescription: string; // Added job description
  isLoading: boolean;
  questions: any[];
  setResumeText: (text: string) => void;
  setJobRole: (role: string) => void;
  setJobDescription: (description: string) => void; // Added setter
  setIsLoading: (loading: boolean) => void;
  setQuestions: (questions: any[]) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeText, setResumeText] = useState<string>('');
  const [jobRole, setJobRole] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>(''); // Added state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<any[]>([]);

  return (
    <ResumeContext.Provider
      value={{
        resumeText,
        jobRole,
        jobDescription, // Added to context
        isLoading,
        questions,
        setResumeText,
        setJobRole,
        setJobDescription, // Added setter to context
        setIsLoading,
        setQuestions,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};