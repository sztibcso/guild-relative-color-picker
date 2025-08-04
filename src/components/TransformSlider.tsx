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
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">{value}{unit}</span>
          {onReset && (
            <button
              type="button"
              className="text-xs text-blue-500 hover:underline"
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
