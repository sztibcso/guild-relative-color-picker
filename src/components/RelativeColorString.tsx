import { RelativeColorStringProps } from "@/types/relative-color-string-props";


export const RelativeColorString: React.FC<RelativeColorStringProps> = ({ cssString }) => (
  <div className="mt-6">
    <label className="font-semibold text-sm mb-2 block">CSS color(from …):</label>
    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-mono text-sm flex items-center justify-between select-all">
      <span>{cssString}</span>
      {/* Később ide jöhet copy gomb */}
    </div>
  </div>
);
