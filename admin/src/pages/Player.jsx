import "./Player.css";
import { useRef } from "react";

function App() {
    const videoRef = useRef(null);
    const videoHandler = (control) => {
        if (control === "play") {
          videoRef.current.play();
        } else if (control === "pause") {
          videoRef.current.pause();
        }
      };
  return <div className="app">
      <video
    ref={videoRef}
    className="video"
    src="https://res.cloudinary.com/dssvrf9oz/video/upload/v1635662987/pexels-pavel-danilyuk-5359634_1_gmixla.mp4"
 ></video>
  <div className="controlsContainer">
        <div className="controls">
          <img className="controlsIcon" alt="" src="/backward-5.svg" />
          <img className="controlsIcon--small" alt="" src="/play.svg" />
          <img className="controlsIcon" alt="" src="/forward-5.svg" />
        </div>
  </div>

  <div className="timecontrols">
        <p className="controlsTime">1:02</p>
        <div className="time_progressbarContainer">
          <div style={{ width: "40%" }} className="time_progressBar"></div>
        </div>
        <p className="controlsTime">2:05</p>
   </div>







  </div>;
}

export default App;