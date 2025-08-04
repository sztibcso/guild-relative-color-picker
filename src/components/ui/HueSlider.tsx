import * as Slider from "@radix-ui/react-slider";

export function HueSlider({ value, onChange }: { value: number; onChange: (val: number) => void }) {
  return (
    <Slider.Root
      className="relative flex items-center select-none w-full h-7"
      min={-180}
      max={180}
      step={1}
      value={[value]}
      onValueChange={([val]) => onChange(val)}
    >
      {/* Track */}
      <Slider.Track
        className="relative h-7 w-full rounded-full"
        style={{
          background:
            "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)",
        }}
      >
        {/* Range (nem feltétlen kell ide, de lehet) */}
        <Slider.Range className="absolute h-full rounded-full" />
      </Slider.Track>
      {/* Thumb */}
      <Slider.Thumb
        className="block h-8 w-8 rounded-full border-4 border-white shadow-lg bg-white cursor-pointer"
        style={{
          boxShadow: "0 2px 12px #0004",
        }}
      />
    </Slider.Root>
  );
}
