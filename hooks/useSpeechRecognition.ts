'use client';

import { useEffect, useRef, useState } from 'react';

type UseSpeechRecognitionReturn = {
  transcript: string;
  isListening: boolean;
  start: () => void;
  stop: () => void;
  resetTranscript: () => void;
};

export default function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isSupported = typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  useEffect(() => {
    if (!isSupported) {
      console.warn('Web Speech API not supported in this browser.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition: SpeechRecognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let interim = '';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      // Append final result to transcript; show interim appended for live feel
      if (final.trim()) {
        setTranscript((prev) => (prev ? prev + ' ' + final.trim() : final.trim()));
      } else {
        // Show interim appended (not stored permanently)
        setTranscript((prev) => {
          // If there is an existing final chunk, append interim visually but don't persist separate
          const base = prev.replace(/ \[interim:.*\]$/, '');
          return interim ? `${base} [interim:${interim.trim()}]` : base;
        });
      }
    };

    recognition.onend = () => {
      // automatic restart to keep listening in long sessions
      if (isListening) {
        try {
          recognition.start();
        } catch (e) {
          // ignore start errors
        }
      }
    };

    recognition.onerror = (e) => {
      // For common intermittent errors, restart if listening
      console.warn('SpeechRecognition error', e);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognitionRef.current?.stop();
      recognitionRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = () => {
    if (!isSupported || !recognitionRef.current) return;
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (e) {
      // ignore if already started
      setIsListening(true);
    }
  };

  const stop = () => {
    if (!isSupported || !recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch (e) {
      // ignore
    } finally {
      setIsListening(false);
    }
  };

  const resetTranscript = () => {
    setTranscript('');
  };

  return { transcript, isListening, start, stop, resetTranscript };
}
