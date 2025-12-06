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
  useCall, // Import useCall
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
import QuestionsDisplay from './QuestionsDisplay';
import CopilotSidebar from '@/components/CopilotSidebar';
import LiveTranscript from '../components/Transcript'; // Make sure you have the new LiveTranscript

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

type MeetingRoomProps = {
  candidateVideoRef: any;
};

const MeetingRoom = ({ candidateVideoRef }: MeetingRoomProps) => {
  const call = useCall(); // Access the call instance
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  // Sidebars state
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isQuestionsOpen, setIsQuestionsOpen] = useState(false);

  // 1. AUTO-START STREAM TRANSCRIPTION
  useEffect(() => {
    if (callingState === CallingState.JOINED && call) {
        const startTranscription = async () => {
            try {
                // Check if already transcribing to avoid errors
                const state = call.state.settings?.transcription;
                if (state?.mode === 'available' || state?.mode === 'auto-on') return;

                console.log("📝 Requesting Stream Transcription...");
                await call.startTranscription({ language: 'en' });
                console.log("✅ Stream Transcription Active");
            } catch (err) {
                console.error("❌ Failed to start transcription:", err);
            }
        };
        startTranscription();
    }
  }, [callingState, call]);

  // Handle participant video ref (your existing logic)
  useEffect(() => {
    const elements = document.querySelectorAll('[class*="str-video__participant-view"]');
    const videoElement = Array.from(elements).find((el) =>
      el.classList.contains('str-video__participant-view'),
    );
    if (videoElement) candidateVideoRef.current = videoElement;
  }, [candidateVideoRef]);

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

      {/* 2.  LIVE TRANSCRIPT OVERLAY */}
      
<LiveTranscript />
   
      

      {/* video call controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={() => router.push(`/`)} />

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

        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] cursor-pointer">
            <Users size={20} className="text-white" />
          </div>
        </button>

        {!isPersonalRoom && <EndCallButton />}

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

      {(isCopilotOpen || isQuestionsOpen) && (
        <div
          className="fixed inset-0 z-50 bg-black/45"
          onClick={() => {
            setIsCopilotOpen(false);
            setIsQuestionsOpen(false);
          }}
        />
      )}

      <QuestionsDisplay
        open={isQuestionsOpen}
        onClose={() => setIsQuestionsOpen(false)}
      />

      {/* <CopilotSidebar
        open={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        // 3. REMOVED OLD PROPS (transcript/resetTranscript)
        // because CopilotSidebar should now likely subscribe to Stream's transcription
        // or just read from the transcript history if you implement that later.
      /> */}
    </section>
  );
};

export default MeetingRoom;