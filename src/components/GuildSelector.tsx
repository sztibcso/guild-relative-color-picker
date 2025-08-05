import React from "react";
import { GuildSelectorProps } from "@/types/guild-selector-props";

export const GuildSelector: React.FC<GuildSelectorProps> = ({
  guilds,
  selectedGuildId,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-lg font-bold"
        style={{
          fontFamily: "'VT323', monospace",
        }}>Select a Guild</label>
      <div className="flex gap-2 justify-center">
        {guilds.map((guild) => (
          <button
            key={guild.id}
            onClick={() => onChange(guild.id)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-xl border
              transition
              ${guild.id === selectedGuildId
                ? "border-slate-800 bg-slate-100 dark:bg-slate-800 font-bold"
                : "border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 hover:dark:bg-slate-800"
              }
            `}
            type="button"
          >
            <span
              className="text-lg font-bold"
              style={{
                fontFamily: "'VT323', monospace",
              }}>{guild.name}</span>
            <span
              className="w-4 h-4 rounded-full border border-slate-300 ml-2"
              style={{ background: guild.surfaceColor }}
              title={guild.surfaceColor}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
