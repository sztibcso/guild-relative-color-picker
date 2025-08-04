import { colord } from "colord";
import { ColorTransform } from "@/types/color-transform";

export function applyColorTransform(
  sourceColor: string,
  transform: ColorTransform
): string {
  const sourceHsl = colord(sourceColor).toHsl();
  const sourceAlpha = colord(sourceColor).alpha();

  const hue = (sourceHsl.h + transform.hue) % 360;
  const saturation = Math.max(0, Math.min(100, sourceHsl.s + transform.saturation));
  const lightness = Math.max(0, Math.min(100, sourceHsl.l + transform.lightness));
  const alpha = Math.max(0, Math.min(1, sourceAlpha + transform.opacity));

  return colord({ h: hue, s: saturation, l: lightness, a: alpha }).toHslString();
}
