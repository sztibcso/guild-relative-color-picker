import * as Slider from "@radix-ui/react-slider";

type HueSliderProps = {
  value: number; 
  onChange: (val: number) => void;
  sourceHue: number; 
};

export function HueSlider({ value, onChange, sourceHue }: HueSliderProps) {
  const HUE_SLIDER_RANGE = 180; 
  const sliderMin = -HUE_SLIDER_RANGE;
  const sliderMax = HUE_SLIDER_RANGE;

  function makeHueGradient(sourceHue: number) {
    const stops = [];
    for (let i = 0; i <= 6; i++) {
      const h = (sourceHue + (i - 3) * 60 + 360) % 360;
      stops.push(`hsl(${h}, 100%, 50%) ${(i * 100) / 6}%`);
    }
    return `linear-gradient(to right, ${stops.join(",")})`;
  }

  return (
    <div className="mb-1">
      <span
        className="text-lg font-bold"
        style={{
          fontFamily: "'VT323', monospace",
        }}>Hue</span>
      <Slider.Root
        className="relative flex items-center select-none w-full h-7"
        min={sliderMin}
        max={sliderMax}
        step={1}
        value={[value]}
        onValueChange={([val]) => onChange(val)}
      >
        <Slider.Track
          className="relative h-4 w-full rounded-full"
          style={{
            background: makeHueGradient(sourceHue),
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
        }}>{value > 0 ? `+${value}` : value}°</span>
    </div>
  );
}
