export type TransformSliderProps = {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (newValue: number) => void;
  unit?: string;
  disabled?: boolean;
  onReset?: () => void;
  fixable?: boolean;
  isFixed?: boolean;
  onFixToggle?: (fixed: boolean) => void;
  style?: React.CSSProperties;
  className?: string;
};