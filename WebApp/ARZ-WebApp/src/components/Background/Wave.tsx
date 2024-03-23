import { area, curveBasis, curveLinear, curveStepBefore } from "d3-shape";
import { range } from "d3-array";
import { scaleLinear } from "d3-scale";

export interface WaveProps {
  wave: {
    complexity: number;
    curve: keyof typeof curves;
    direction: "up" | "down";
    data?: number[];
    color: string;
    opacity: number;
    waveHeight: number;
    amplitude: number;
  };
  height: number;
  width: number;
}

const curves = {
  wave: curveBasis,
  step: curveStepBefore,
  peak: curveLinear,
};

export const Wave: React.FC<WaveProps> = ({ wave, width, height }) => {
  wave.data = range(wave.complexity).map(() =>
    Math.round(Math.random() * wave.amplitude)
  );

  const scaleX = scaleLinear()
    .domain([0, wave.complexity - 1])
    .range([0, width]);

  const scaleY = scaleLinear()
    .domain([0, 10])
    .range([height - (height - wave.waveHeight), height]);

  const areaGenerator = area<number>()
    .x((d, i) => {
      return scaleX(i) || 0;
    })
    .y1((d) => {
      return scaleY(d) || 0;
    });

  const d =
    areaGenerator
      .curve(curves[wave.curve])
      .y0(wave.direction === "up" ? height : 0)(wave.data) || "";

  const roundedD = d
    .split(/M|Z/)
    .filter((d) => d)[0]
    .split(",")
    .map((d) => {
      if (d.indexOf("C") !== -1) {
        return d
          .split("C")
          .map((n) => Math.round(parseFloat(n) * 10) / 10)
          .join("C");
      } else if (d.indexOf("L") !== -1) {
        return d
          .split("L")
          .map((n) => Math.round(parseFloat(n) * 10) / 10)
          .join("L");
      } else {
        return Math.round(parseFloat(d)).toString();
      }
    });

  return (
    <path
      fill={wave.color}
      fillOpacity={wave.opacity / 100}
      d={"M" + roundedD.join(",") + "Z"}
    />
  );
};

export const WavePath = ({ wave, width, height }: WaveProps) => {
  wave.data = range(wave.complexity).map(() =>
    Math.round(Math.random() * wave.amplitude)
  );

  const scaleX = scaleLinear()
    .domain([0, wave.complexity - 1])
    .range([0, width]);

  const scaleY = scaleLinear()
    .domain([0, 10])
    .range([height - (height - wave.waveHeight), height]);

  const areaGenerator = area<number>()
    .x((d, i) => {
      return scaleX(i) || 0;
    })
    .y1((d) => {
      return scaleY(d) || 0;
    });

  const d =
    areaGenerator
      .curve(curves[wave.curve])
      .y0(wave.direction === "up" ? height : 0)(wave.data) || "";

  const roundedD = d
    .split(/M|Z/)
    .filter((d) => d)[0]
    .split(",")
    .map((d) => {
      if (d.indexOf("C") !== -1) {
        return d
          .split("C")
          .map((n) => Math.round(parseFloat(n) * 10) / 10)
          .join("C");
      } else if (d.indexOf("L") !== -1) {
        return d
          .split("L")
          .map((n) => Math.round(parseFloat(n) * 10) / 10)
          .join("L");
      } else {
        return Math.round(parseFloat(d)).toString();
      }
    });

  return "M" + roundedD.join(",") + "Z";
};
