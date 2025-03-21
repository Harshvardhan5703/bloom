import * as faceapi from 'face-api.js';
import { useEffect, useRef, useState } from 'react';

type EmoProps = {
    videoElement:any
}
const EmotionDetection = ({ videoElement }:EmoProps) => {
  const [emotions, setEmotions] = useState({});
  const isModelsLoaded = useRef(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      isModelsLoaded.current = true;
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (!videoElement || !isModelsLoaded.current) return;

    const analyzeEmotions = async () => {
      const detections = await faceapi.detectSingleFace(
        videoElement,
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceExpressions();

      if (detections && detections.expressions) {
        setEmotions(detections.expressions); // Update emotions
        console.log(emotions)
      }
    };

    const interval = setInterval(() => analyzeEmotions(), 5000); // Analyze every second
    return () => clearInterval(interval);
  }, [videoElement]);

  return (
    <div>
      <h3>Detected Emotions</h3>
      <ul>
        {Object.entries(emotions).map(([emotion, score]) => (
            // @ts-ignore
          <li key={emotion}>{emotion}: {(score * 100).toFixed(2)}%</li>
        ))}
      </ul>
    </div>
  );
};

export default EmotionDetection;
