import CircularProgress from "./header";
import Profile from "./profile";
import LiveVitalsMonitor from "./LiveVitalsMonitor";
import CircularHealthScores from "./CircularHealthScores"
import HealthScoreTimeline from "./HealthScoreTimeline"
import Healthmetrics from "./Healthmetrics"







export default function patientinfo() {
  return (
    <main>
      <CircularProgress  />
       <Profile />
       <LiveVitalsMonitor />
        <CircularHealthScores />
         <HealthScoreTimeline />
        <Healthmetrics />
      
    </main>
  );
}
