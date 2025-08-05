"use client";
import { OpacitySliderProps } from "@/types/opacitsy-slider-props";
import * as Slider from "@radix-ui/react-slider";

export const OpacitySlider: React.FC<OpacitySliderProps> = ({
  value,
  onChange,
  previewColor,
}) => {
  const color0 = previewColor.replace(/, *[\d\.]+\)$/, ",0)");
  const color1 = previewColor.replace(/, *[\d\.]+\)$/, ",1)");
  const gradient = `linear-gradient(to right, ${color0}, ${color1})`;

  return (
    <div className="w-full flex flex-col mb-1">
      <span
        className="text-lg font-bold"
        style={{
          fontFamily: "'VT323', monospace",
        }}>Opacity</span>
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
            height: 10,
          }}
        >
          <Slider.Range className="absolute h-full rounded-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block h-6 w-6 rounded-full border-2 border-blue-500 bg-white shadow-lg cursor-pointer"
          style={{
            boxShadow: "0 2px 8px #0003",
          }}
        />
      </Slider.Root>
      <span
        className="text-md font-bold, text-slate-500"
        style={{
          fontFamily: "'VT323', monospace"
        }}>{Math.round(value * 100)}%</span>
    </div>
  );
};
