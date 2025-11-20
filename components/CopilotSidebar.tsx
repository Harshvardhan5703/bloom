'use client';

import React, { useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { suggestFollowUp, summarizeAnswer } from '@/lib/mockApi';

type Props = {
  open: boolean;
  onClose: () => void;
  transcript: string;
  resetTranscript: () => void;
};

const CopilotSidebar: React.FC<Props> = ({ open, onClose, transcript, resetTranscript }) => {
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const trimmedTranscript = useMemo(() => transcript.replace(/\[interim:.*\]/, '').trim(), [transcript]);

  const handleSuggest = async () => {
    setLoading(true);
    setAiOutput(null);
    setLastAction('suggest');
    try {
      const res = await suggestFollowUp(trimmedTranscript);
      setAiOutput(res.suggestion);
    } catch (e) {
      setAiOutput('Failed to get suggestion. (mock)');
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    setLoading(true);
    setAiOutput(null);
    setLastAction('summarize');
    try {
      const res = await summarizeAnswer(trimmedTranscript);
      setAiOutput(res.summary);
    } catch (e) {
      setAiOutput('Failed to summarize. (mock)');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    resetTranscript();
    setAiOutput(null);
    setLastAction(null);
  };

  return (
    <>
      {/* drawer */}
      <aside
        className={`fixed top-0 left-0 z-[2000] h-screen w-[360px] transform bg-dark-2 p-4 text-white transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-[100%]'
        }`}
        style={{ boxShadow: 'rgba(0,0,0,0.6) 4px 0px 20px' }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">AI Copilot</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="rounded-md px-2 py-1 text-sm hover:bg-white/5"
              title="Reset transcript"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="rounded-md px-2 py-1 text-sm hover:bg-white/5"
              title="Close"
            >
              Close
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <div className="rounded-md border border-white/6 p-3 text-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Live transcript</span>
              <span className="text-xs text-white/60">{trimmedTranscript.length ? `${trimmedTranscript.length} chars` : '0'}</span>
            </div>
            <div className="max-h-[48vh] overflow-auto whitespace-pre-wrap break-words text-sm leading-6">
              {transcript ? (
                <p className="text-sm">{transcript}</p>
              ) : (
                <p className="text-sm text-white/60">No transcript yet — ask the candidate a question or speak to test.</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSuggest}
              className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium hover:bg-blue-700"
              disabled={loading}
            >
              {loading && lastAction === 'suggest' ? <Loader2 className="inline-block h-4 w-4 animate-spin" /> : 'Suggest Follow-up'}
            </button>
            <button
              onClick={handleSummarize}
              className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium hover:bg-indigo-700"
              disabled={loading}
            >
              {loading && lastAction === 'summarize' ? <Loader2 className="inline-block h-4 w-4 animate-spin" /> : 'Summarize'}
            </button>
          </div>

          <div className="rounded-md border border-white/6 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">AI Output</span>
              <span className="text-xs text-white/60">{aiOutput ? 'Result' : 'Idle'}</span>
            </div>
            <div className="min-h-[6rem]">
              {loading && <p className="text-sm text-white/60">Thinking...</p>}
              {!loading && aiOutput && <p className="text-sm">{aiOutput}</p>}
              {!loading && !aiOutput && <p className="text-sm text-white/60">No AI output yet. Press a button to generate.</p>}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CopilotSidebar;
