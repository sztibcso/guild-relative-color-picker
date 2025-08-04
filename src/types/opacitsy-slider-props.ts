export type OpacitySliderProps = {
  value: number; // 0...1
  onChange: (val: number) => void;
  previewColor: string; // 'rgba(r, g, b, 1)' - az opacity nélkül!
};
