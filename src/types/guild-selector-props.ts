import type { Guild } from "@/types/guild";

export type GuildSelectorProps = {
  guilds: Guild[];
  selectedGuildId: string;
  onChange: (guildId: string) => void;
};