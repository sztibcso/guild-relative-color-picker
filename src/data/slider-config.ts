import { ColorTransform } from "@/types/color-transform";

export const sliderConfigs: {
  key: keyof ColorTransform;
  label: string;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}[] = [
  { key: "lightness", label: "Lightness", min: -50, max: 50, unit: "%" },
  { key: "saturation", label: "Saturation", min: -50, max: 50, unit: "%" },
  // { key: "hue", label: "Hue", min: -180, max: 180, unit: "°" },
  // { key: "opacity", label: "Opacity", min: -1, max: 1, step: 0.01 },
];
