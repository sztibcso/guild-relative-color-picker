import { Guild } from "@/types/guild";

export const guilds: Guild[] = [
  {
    id: "frontend-wizards",
    name: "Frontend Wizards",
    logoUrl: "/guilds/frontend.png", // ha akarod, de nem kötelező, lehet csak emoji is
    surfaceColor: "#3b82f6", // Tailwind blue-500
  },
  {
    id: "design-ninjas",
    name: "Design Ninjas",
    logoUrl: "/guilds/design.png",
    surfaceColor: "#f59e42", // narancsos szín
  },
  {
    id: "devops-masters",
    name: "DevOps Masters",
    logoUrl: "/guilds/devops.png",
    surfaceColor: "hsl(160, 67%, 47%)", // zöld, most HSL formátum
  },
];