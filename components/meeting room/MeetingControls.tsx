import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
    onToggleSideBar: (type: 'participants' | 'chat') => void;
}

export const MeetingControls = ({ onToggleSideBar }: Props) => {
  const call = useCall();
  const router = useRouter();
  
  // Get State
  const { useMicrophoneState, useCameraState } = useCallStateHooks();
  const { isEnabled: isMicOn } = useMicrophoneState();
  const { isEnabled: isCamOn } = useCameraState();

  return (
    <div className="fixed bottom-8 left-1/2 flex -translate-x-1/2 transform items-center gap-4 rounded-full bg-[#19232d]/90 px-6 py-3 shadow-2xl backdrop-blur-lg border border-white/10">
      
      {/* Mic Toggle */}
      <button
        onClick={() => call?.microphone.toggle()}
        className={`flex h-12 w-12 items-center justify-center rounded-full transition-all ${
          isMicOn ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
      </button>

      {/* Camera Toggle */}
      <button
        onClick={() => call?.camera.toggle()}
        className={`flex h-12 w-12 items-center justify-center rounded-full transition-all ${
          isCamOn ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {isCamOn ? <Video size={20} /> : <VideoOff size={20} />}
      </button>

      {/* Leave Button */}
      <button
        onClick={() => {
            call?.leave();
            router.push('/');
        }}
        className="flex h-12 w-20 items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition-all"
      >
        <PhoneOff size={24} />
      </button>
      
      <div className="h-8 w-[1px] bg-white/20 mx-2" /> {/* Divider */}

      {/* Custom Sidebar Toggles (mapped to your props) */}
      <button onClick={() => onToggleSideBar('participants')} className="p-3 hover:bg-white/10 rounded-full">
         <Users size={20} />
      </button>
      
    </div>
  );
};