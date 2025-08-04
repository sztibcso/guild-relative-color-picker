import { ColorTransform } from "./color-transform";

export type ColorPlaneProps = {
  sourceColor: string;
  transform: ColorTransform;
  onPlaneChange: (lDelta: number, sDelta: number) => void;
  size?: number;
};
