import { ColorTransform } from "@/types/color-transform";

export function getColorFromString(
  sourceColor: string,
  transform: ColorTransform
): string {
  const { lightness, saturation, hue, opacity } = transform;

  const lStr = lightness === 0 ? "" : `l ${lightness > 0 ? "+" : ""}${lightness}%`;
  const sStr = saturation === 0 ? "" : `s ${saturation > 0 ? "+" : ""}${saturation}%`;
  const hStr = hue === 0 ? "" : `h ${hue > 0 ? "+" : ""}${hue}`;
  const oStr = opacity === 0 ? "" : `/${opacity > 0 ? "+" : ""}${opacity}`;

  const ops = [lStr, sStr, hStr].filter(Boolean).join(" ");
  const base = sourceColor.startsWith("#") ? sourceColor : `'${sourceColor}'`; 

  return `color(from ${base} ${ops}${oStr ? " " + oStr : ""})`;
}
