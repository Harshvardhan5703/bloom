"use client";
import React from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QuestionsDisplay: React.FC = () => {
  const { questions, isLoading, jobRole } = useResumeContext();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (questions.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Interview Questions for {jobRole}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {questions.map((question, index) => (
            <li key={index} className="p-3 bg-slate-700 rounded-md">
              <span className="font-bold mr-2">Q{index + 1}:</span>
              {question}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default QuestionsDisplay;