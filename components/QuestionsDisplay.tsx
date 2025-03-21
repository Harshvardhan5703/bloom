"use client";
import React, { useEffect } from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QuestionsDisplay: React.FC = () => {
  const { questions, isLoading, jobRole } = useResumeContext();

  useEffect(() => {
    
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .questions-container::-webkit-scrollbar {
        width: 6px;
      }
      
      .questions-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }
      
      .questions-container::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 10px;
        transition: all 0.2s ease;
      }
      
      .questions-container::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
      }
      
      /* Firefox */
      .questions-container {
        scrollbar-width: thin;
        scrollbar-color: #cbd5e1 #f1f1f1;
      }
    `;
    
    styleElement.id = 'questions-display-styles';
    
    if (!document.getElementById('questions-display-styles')) {
      document.head.appendChild(styleElement);
    }
    
    return () => {
      const existingStyle = document.getElementById('questions-display-styles');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (questions.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6 ml-3 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-slate-800">
          Interview Questions for {jobRole}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto pr-2 questions-container">
          <ul className="space-y-3">
            {questions.map((question, index) => (
              <li 
                key={index} 
                className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm transition-all hover:shadow-md"
              >
                <span className="font-semibold text-blue-600 mr-2">Q{index + 1}:</span>
                <span className="text-slate-700">{question}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionsDisplay;