"use client";
import { OpacitySliderProps } from "@/types/opacitsy-slider-props";
import * as Slider from "@radix-ui/react-slider";

export const OpacitySlider: React.FC<OpacitySliderProps> = ({
  value,
  onChange,
  previewColor,
}) => {
  // Állítsd elő a gradientet: bal oldal teljesen átlátszó (white), jobb oldal a preview szín
  // Azért nem teljesen fehér az eleje, hanem previewColor alpha=0
  const color0 = previewColor.replace(/, *[\d\.]+\)$/, ",0)");
  const color1 = previewColor.replace(/, *[\d\.]+\)$/, ",1)");
  const gradient = `linear-gradient(to right, ${color0}, ${color1})`;

  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-sm font-medium">Opacity</span>
      <Slider.Root
        min={0}
        max={1}
        step={0.01}
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        className="relative flex items-center w-full h-7"
      >
        <Slider.Track
          className="h-4 w-full rounded-full"
          style={{
            background: gradient,
            borderRadius: 9999,
            height: 16,
          }}
        >
          <Slider.Range className="absolute h-full rounded-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block h-7 w-7 rounded-full border-2 border-blue-500 bg-white shadow-lg cursor-pointer"
          style={{
            boxShadow: "0 2px 8px #0003",
          }}
        />
      </Slider.Root>
      <span className="text-xs text-slate-500">{Math.round(value * 100)}%</span>
    </div>
  );
};
