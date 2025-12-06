'use client';
import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import Alert from './Alert';
import { Button } from './ui/button';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }

  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      // SAFE CAMERA ENABLE: Won't crash if camera is broken
      call.camera.enable().catch((err) => {
          console.warn("⚠️ Camera failed to start (likely defective), continuing with Audio only.", err);
      });
      call.microphone.enable().catch((err) => console.error("Mic failed", err));
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  // SAFE JOIN FUNCTION
  const handleJoin = async () => {
    try {
        await call.join();
        setIsSetupComplete(true);
    } catch (err: any) {
        console.warn("⚠️ Standard Join Failed, trying Audio-Only mode...", err);
        // If join fails (e.g. video constraint error), try turning off video and joining again
        try {
            await call.camera.disable(); 
            await call.join();
            setIsSetupComplete(true);
        } catch (retryErr) {
            console.error("❌ Critical Join Error:", retryErr);
            alert("Failed to join meeting. Please check microphone permissions.");
        }
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      
      {/* Video Preview might show black if camera is broken, that's fine */}
      <VideoPreview />

      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={handleJoin} // Use safe join handler
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;