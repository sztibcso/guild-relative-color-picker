export type HueSliderProps = {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
};