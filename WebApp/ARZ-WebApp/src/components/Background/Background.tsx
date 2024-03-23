import "./Background.css";
import WaveAnimation from "./WaveAnimation";

const width = 500;
const height = 500;

function Background() {
  return (
    <div className="svg-container">
      <svg
        className="svg-background"
        preserveAspectRatio="none"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="500" height="500" fill="#B0CBFC" />
        <WaveAnimation
          width={width}
          height={height}
          numberOfCycles={10}
          speed={5}
        ></WaveAnimation>
      </svg>
    </div>
  );
}

export default Background;
