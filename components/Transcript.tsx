"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

type CaptionItem = {
  id: string;
  speakerName: string;
  speakerImage?: string;
  text: string;
  timestamp: number;
};

export default function LiveTranscript() {
  const call = useCall();
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();
  
  const [captions, setCaptions] = useState<CaptionItem[]>([]);

  useEffect(() => {
    if (!call) return;

    const handleCaption = (event: any) => {
      const caption = event.closed_caption;
      if (caption) {
        // Find participant to get name and avatar
        const speaker = participants.find((p) => p.userId === caption.speaker_id);
        const readableName = speaker?.name || speaker?.userId || "Unknown";
        const image = speaker?.image; // Stream provides user images if set

        setCaptions((prev) => {
           const newItem = {
             id: Math.random().toString(36),
             speakerName: readableName,
             speakerImage: image,
             text: caption.text,
             timestamp: Date.now()
           };

           // Keep last 3 items for a "stack" effect
           const newHistory = [...prev, newItem];
           return newHistory.slice(-3); 
        });
      }
    };

    call.on("call.closed_caption", handleCaption);
    return () => call.off("call.closed_caption", handleCaption);
  }, [call, participants]);

  if (captions.length === 0) return null;

  return (
    <div className="absolute bottom-[100px] left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl flex flex-col items-start md:items-center justify-end pointer-events-none z-40 gap-2">
      
      {captions.map((item, index) => {
        // LOGIC: The last item is "Active" (big opacity), older ones are faded
        const isLast = index === captions.length - 1;
        const opacity = isLast ? "opacity-100" : index === captions.length - 2 ? "opacity-60" : "opacity-30";
        const scale = isLast ? "scale-100" : "scale-95";
        
        return (
          <div 
            key={item.id}
            className={`flex items-start gap-3 transition-all duration-500 ease-out ${opacity} ${scale} origin-bottom`}
          >
            {/* Avatar Circle */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-lg border border-white/20">
              {item.speakerImage ? (
                <img src={item.speakerImage} alt={item.speakerName} className="w-full h-full rounded-full object-cover" />
              ) : (
                item.speakerName.charAt(0).toUpperCase()
              )}
            </div>

            {/* Message Bubble */}
            <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl rounded-tl-none shadow-lg">
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="text-blue-300 text-xs font-bold uppercase tracking-wider">
                  {item.speakerName}
                </span>
                <span className="text-gray-400 text-[10px]">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
                </span>
              </div>
              <p className="text-white text-sm md:text-base font-medium leading-relaxed">
                {item.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}