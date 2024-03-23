import anime from "animejs/lib/anime.es.js";
import { WavePath, WaveProps } from "./Wave";
import { useEffect, useState } from "react";

interface WaveAnimationProps {
  width: number;
  height: number;
  numberOfCycles: number;
  speed: number;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({
  width,
  height,
  numberOfCycles,
  speed,
}) => {
  const wave1: WaveProps = {
    wave: {
      complexity: 5,
      curve: "wave",
      direction: "up",
      color: "#004CBB",
      opacity: 100,
      waveHeight: 200,
      amplitude: 5,
    },
    height: height,
    width: width,
  };

  const wave2: WaveProps = {
    wave: {
      complexity: 5,
      curve: "wave",
      direction: "up",
      color: "#0056D6",
      opacity: 100,
      waveHeight: 300,
      amplitude: 5,
    },
    height: height,
    width: width,
  };

  const wave3: WaveProps = {
    wave: {
      complexity: 5,
      curve: "wave",
      direction: "up",
      color: "#0061F1",
      opacity: 100,
      waveHeight: 400,
      amplitude: 5,
    },
    height: height,
    width: width,
  };

  const [wavePath1, setWavePath1] = useState(WavePath(wave1));
  const [wavePath2, setWavePath2] = useState(WavePath(wave2));
  const [wavePath3, setWavePath3] = useState(WavePath(wave3));

  useEffect(() => {
    const initWavesAnimation = async () => {
      const tl1 = anime.timeline({
        duration: 3500 * speed,
        loop: true,
        easing: "linear",
        direction: "alternate",
      });
      const tl2 = anime.timeline({
        duration: 2600 * speed,
        loop: true,
        easing: "linear",
        direction: "alternate",
      });
      const tl3 = anime.timeline({
        duration: 2300 * speed,
        loop: true,
        easing: "linear",
        direction: "alternate",
      });

      for (let i = 0; i < numberOfCycles; i++) {
        tl1.add({
          targets: "#wave1",
          d: [{ value: WavePath(wave1) }],
        });
        tl2.add({
          targets: "#wave2",
          d: [{ value: WavePath(wave2) }],
        });
        tl3.add({
          targets: "#wave3",
          d: [{ value: WavePath(wave3) }],
        });
      }
    };

    initWavesAnimation().catch(console.error);
  });

  return (
    <>
      <path
        id="wave1"
        fill={wave1.wave.color}
        fillOpacity={wave1.wave.opacity / 100}
        d={wavePath1}
      ></path>
      <path
        id="wave2"
        fill={wave2.wave.color}
        fillOpacity={wave2.wave.opacity / 100}
        d={wavePath2}
      ></path>
      <path
        id="wave3"
        fill={wave3.wave.color}
        fillOpacity={wave3.wave.opacity / 100}
        d={wavePath3}
      ></path>
    </>
  );
};

export default WaveAnimation;
