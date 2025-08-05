import { SourceColorPreviewProps } from "@/types/source-color-preview-props";

export const SourceColorPreview: React.FC<SourceColorPreviewProps> = ({ color }) => {
  return (
    <div className="my-4 flex items-center gap-4">
      <span
        className="text-lg font-bold"
        style={{
          fontFamily: "'VT323', monospace",
        }}>Current Source Color:</span>
      <span
        className="w-8 h-8 rounded-full border border-slate-300"
        style={{ background: color }}
        title={color}
      />
      <span 
        className="text-md font-bold, text-slate-500"
        style={{
          fontFamily: "'VT323', monospace"}}>{color}</span>
    </div>
  );
};