"use client";
import React, { useEffect } from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  open: boolean;
  onClose: () => void;
};

const QuestionsDisplay: React.FC<Props> = ({ open, onClose }) => {
  const { questions, isLoading, jobRole } = useResumeContext();

  // Keep your custom scrollbar CSS exactly as before
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

  // Loading state
  if (isLoading) {
    return (
      <aside
        className={`
          fixed top-0 left-0 z-[2000] h-screen w-[360px]
          transform bg-dark-2 p-4 text-white
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-[100%]'}
        `}
        style={{ boxShadow: 'rgba(0,0,0,0.6) 4px 0px 20px' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Initial Questions</h2>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-sm hover:bg-white/10">
            Close
          </button>
        </div>

        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </aside>
    );
  }

  // No questions? Still render sidebar shell for consistency
  if (questions.length === 0) {
    return (
      <aside
        className={`
          fixed top-0 left-0 z-[2000] h-screen w-[360px]
          transform bg-dark-2 p-4 text-white
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-[100%]'}
        `}
        style={{ boxShadow: 'rgba(0,0,0,0.6) 4px 0px 20px' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Initial Questions</h2>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-sm hover:bg-white/10">
            Close
          </button>
        </div>
        <p className="text-white/60 text-sm">No questions available.</p>
      </aside>
    );
  }

  // MAIN SIDEBAR UI
  return (
    <aside
      className={`
        fixed top-0 left-0 z-[2000] h-screen w-[360px]
        transform bg-dark-2 p-4 text-white
        transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-[100%]'}
      `}
      style={{ boxShadow: 'rgba(0,0,0,0.6) 4px 0px 20px' }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Initial Questions</h2>
        <button onClick={onClose} className="rounded-md px-2 py-1 text-sm hover:bg-white/10">
          Close
        </button>
      </div>

      {/* Your original card UI remains untouched */}
      <Card className="shadow-md bg-white text-black">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium text-slate-800">
            Interview Questions for {jobRole}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="max-h-[65vh] overflow-y-auto pr-2 questions-container">
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
    </aside>
  );
};

export default QuestionsDisplay;
