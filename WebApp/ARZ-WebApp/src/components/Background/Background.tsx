import { Box } from "@chakra-ui/react";

import "./Background.css";
import WaveAnimation from "./WaveAnimation";
import { useBackgroundBlurStore } from "../../hooks/useBackgroundBlurStore";

const width = 500;
const height = 500;

function Background() {
  const bgBlur = useBackgroundBlurStore();
  return (
    <Box className="svg-container" backdropBlur={`${bgBlur}px`}>
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
    </Box>
  );
}

export default Background;
