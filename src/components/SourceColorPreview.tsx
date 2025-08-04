import { SourceColorPreviewProps } from "@/types/source-color-preview-props";

export const SourceColorPreview: React.FC<SourceColorPreviewProps> = ({ color }) => {
  return (
    <div className="my-6 flex items-center gap-4">
      <span className="font-semibold">Current Source Color:</span>
      <span
        className="w-8 h-8 rounded-full border border-slate-300"
        style={{ background: color }}
        title={color}
      />
      <span className="text-xs text-slate-500">{color}</span>
    </div>
  );
};