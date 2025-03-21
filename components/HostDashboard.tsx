import EmotionDetection from './EmotionDetection';

type HostDashProps = {
    candidateVideoRef: any
  };
const HostDashboard = ({ candidateVideoRef }:HostDashProps) => {
  return (
    <section className="host-dashboard">
      <h1>Host Dashboard</h1>
      {/* Add other dashboard elements */}
      <EmotionDetection videoElement={candidateVideoRef.current} />
    </section>
  );
};

export default HostDashboard;