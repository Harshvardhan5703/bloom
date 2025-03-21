"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ResumeContextType = {
  resumeText: string;
  jobRole: string;
  questions: string[];
  setResumeText: (text: string) => void;
  setJobRole: (role: string) => void;
  setQuestions: (questions: string[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeText, setResumeText] = useState<string>("");
  const [jobRole, setJobRole] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ResumeContext.Provider value={{
      resumeText,
      jobRole,
      questions,
      setResumeText,
      setJobRole,
      setQuestions,
      isLoading,
      setIsLoading
    }}>
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