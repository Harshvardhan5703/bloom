import { ParticipantView } from '@stream-io/video-react-sdk';
import { StreamVideoParticipant } from '@stream-io/video-react-sdk';
import { MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  participant: StreamVideoParticipant;
  isLocal?: boolean;
};

export const ParticipantCard = ({ participant, isLocal }: Props) => {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[#19232d]',
        // Add a glow effect when the participant is speaking
        participant.isSpeaking && 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
      )}
    >
      {/* Stream's Low-Level Video Element */}
      <ParticipantView
        participant={participant}
        className="h-full w-full object-cover"
        // This mirrors video logic (local user sees themselves mirrored)
        mirror={isLocal} 
      />

      {/* Custom Overlay: Name & Mute Status */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-1.5 backdrop-blur-md">
        <span className="text-sm font-medium text-white">
          {isLocal ? 'You' : participant.name || 'Unknown User'}
        </span>
        {!participant.isMicEnabled && (
           <div className="rounded-full bg-red-500/80 p-1">
             <MicOff size={12} className="text-white" />
           </div>
        )}
      </div>

      {/* Speaking Indicator (Visualizer-style bars could go here) */}
      {participant.isSpeaking && (
        <div className="absolute top-4 right-4 z-10">
          <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
        </div>
      )}
    </div>
  );
};