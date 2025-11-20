'use client';
import { useEffect, useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList, Slack } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';
import QuestionsDisplay from './QuestionsDisplay'; // UPDATED COMPONENT
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import CopilotSidebar from '@/components/CopilotSidebar';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

type MeetingRoomProps = {
  candidateVideoRef: any;
};

const MeetingRoom = ({ candidateVideoRef }: MeetingRoomProps) => {
  useEffect(() => {
    const elements = document.querySelectorAll('[class*="str-video__participant-view"]');
    const videoElement = Array.from(elements).find((el) =>
      el.classList.contains('str-video__participant-view'),
    );
    if (videoElement) candidateVideoRef.current = videoElement;
  }, [candidateVideoRef]);

  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  // sidebars state
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isQuestionsOpen, setIsQuestionsOpen] = useState(false);

  // speech recognition
  const { transcript, start, stop, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (callingState === CallingState.JOINED) start();
    else stop();
  }, [callingState]);

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">

      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[950px] items-center">
          <CallLayout />
        </div>

        <div
          className={cn('h-[calc(100vh-86px)] hidden ml-2', {
            'show-block': showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* video call controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={() => router.push(`/`)} />

        {/* layout dropdown */}
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        {/* participants list */}
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] cursor-pointer">
            <Users size={20} className="text-white" />
          </div>
        </button>

        {!isPersonalRoom && <EndCallButton />}

        {/* QUESTIONS sidebar button */}
        <button
          onClick={() => {
            setIsQuestionsOpen((prev) => {
              if (!prev) setIsCopilotOpen(false);
              return !prev;
            });
          }}
          title="Initial Questions"
          className="ml-2 rounded-2xl bg-[#0f1724] px-4 py-2 hover:bg-[#14202b]"
        >
          <span className="text-white">Questions</span>
        </button>

        {/* COPILOT sidebar button */}
        <button
          onClick={() => {
            setIsCopilotOpen((prev) => {
              if (!prev) setIsQuestionsOpen(false);
              return !prev;
            });
          }}
          title="Open AI Copilot"
          className="ml-2 rounded-2xl bg-[#0f1724] px-4 py-2 hover:bg-[#14202b]"
        >
          <div className="flex items-center gap-2">
            <Slack size={18} />
            <span className="text-white">Copilot</span>
          </div>
        </button>
      </div>

      {/* overlay (shows only when ANY sidebar is open) */}
      {(isCopilotOpen || isQuestionsOpen) && (
        <div
          className="fixed inset-0 z-50 bg-black/45"
          onClick={() => {
            setIsCopilotOpen(false);
            setIsQuestionsOpen(false);
          }}
        />
      )}

      {/* QUESTONS SIDEBAR */}
      <QuestionsDisplay
        open={isQuestionsOpen}
        onClose={() => setIsQuestionsOpen(false)}
      />

      {/* COPILOT SIDEBAR */}
      <CopilotSidebar
        open={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        transcript={transcript}
        resetTranscript={resetTranscript}
      />
    </section>
  );
};

export default MeetingRoom;
