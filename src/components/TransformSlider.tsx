import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { TransformSliderProps } from "@/types/transform-slider-props";


export const TransformSlider: React.FC<TransformSliderProps> = ({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  unit = "",
  disabled = false,
  onReset,
  fixable = false,
  isFixed = false,
  onFixToggle,
  style = {},
  className = "",
}) => {
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between">
        <span
          className="text-lg font-bold"
          style={{
            fontFamily: "'VT323', monospace",
          }}>{label}</span>
        <div className="flex items-center gap-2">
          <span
            className="text-md font-bold, text-slate-500"
            style={{
              fontFamily: "'VT323', monospace"
            }}>{value}{unit}</span>
          {onReset && (
            <button
              type="button"
              className="text-xs text-blue-500 hover:underline"
              style={{
                fontFamily: "'VT323', monospace"
              }}
              onClick={onReset}
            >
              Reset
            </button>
          )}
        </div>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        disabled={disabled}
        style={style}
        className={className}
      />
      {fixable && (
        <label className="flex items-center gap-1 text-xs ml-2">
          <input
            type="checkbox"
            checked={isFixed}
            onChange={e => onFixToggle?.(e.target.checked)}
            className="accent-blue-500"
          />
          Fix
        </label>
      )}
    </div>
  );
};
