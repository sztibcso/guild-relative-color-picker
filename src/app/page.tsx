"use client";

import { useState } from "react";
import { guilds } from "@/data/guilds";
import { GuildSelector } from "@/components/GuildSelector";
import { SourceColorPreview } from "@/components/SourceColorPreview";
import { TransformSlider } from "@/components/TransformSlider";
import { ColorTransform } from "@/types/color-transform";
import { ColorPlane } from "@/components/ColorPlane";
import { OpacitySlider } from "@/components/ui/OpacitySlider";
import { colord } from "colord";
import { HueSlider } from "@/components/ui/HueSlider";
import { DontClickModal } from "@/components/SecretModal";

function getTransformedColor(
  baseColor: string,
  transform: ColorTransform,
  alphaOverride?: number
) {
  let c = colord(baseColor)
    .hue((colord(baseColor).toHsl().h + transform.hue) % 360)
    .saturate(1 + transform.saturation / 100)
    .lighten(transform.lightness / 100); 
  const rgb = c.toRgb();
  const a = typeof alphaOverride === "number" ? alphaOverride : transform.opacity;
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${a})`;
}

export default function Home() {
  const [selectedGuildId, setSelectedGuildId] = useState(guilds[0].id);
  const selectedGuild = guilds.find((g) => g.id === selectedGuildId)!;
  const [transform, setTransform] = useState<ColorTransform>({
    lightness: 0,
    saturation: 0,
    hue: 0,
    opacity: 1,
  });
  const [fixed, setFixed] = useState<Record<keyof ColorTransform, boolean>>({
    lightness: false,
    saturation: false,
    hue: false,
    opacity: false,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const previewColor = getTransformedColor(selectedGuild.surfaceColor, { ...transform, opacity: 1 }, 1);

  const previewColorWithOpacity = getTransformedColor(
    selectedGuild.surfaceColor,
    transform
  );

  const sourceHue = colord(selectedGuild.surfaceColor).toHsl().h;

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${previewColorWithOpacity} 0%, #fff 100%)`,
        transition: "background 0.3s",
      }}
    >
      <main className="bg-white/90 rounded-3xl shadow-2xl border border-gray-200 max-w-screen-sm w-full px-6 py-10 flex flex-col">
        <h1
          className="text-center text-2xl mb-6"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            letterSpacing: "2px",
            textShadow: "0 2px 6px #0001",
          }}
        >
          RELATIVE COLOR PICKER
        </h1>
        <GuildSelector
          guilds={guilds}
          selectedGuildId={selectedGuildId}
          onChange={setSelectedGuildId}
        />
        <SourceColorPreview color={previewColorWithOpacity} />
        <div className="flex justify-center mb-4">
          <ColorPlane
            sourceColor={selectedGuild.surfaceColor}
            transform={{ ...transform, opacity: 1 }}
            onPlaneChange={(lDelta, sDelta) => {
              setTransform((t) => ({
                ...t,
                lightness: lDelta,
                saturation: sDelta,
                hue: 0,
                opacity: 1,
              }));
              setFixed((f) => ({
                ...f,
                hue: true,
                opacity: true,
              }));
            }}
          />
        </div>
        {/* Sliderek */}
        <TransformSlider
          label="Lightness"
          min={-50}
          max={50}
          value={transform.lightness}
          onChange={(val) => setTransform((t) => ({ ...t, lightness: val }))}
          unit="%"
          onReset={() => setTransform((t) => ({ ...t, lightness: 0 }))}
        />
        <TransformSlider
          label="Saturation"
          min={-200}
          max={200}
          value={transform.saturation}
          onChange={(val) => setTransform((t) => ({ ...t, saturation: val }))}
          unit="%"
          onReset={() => setTransform((t) => ({ ...t, saturation: 0 }))}
        />
        <HueSlider
          value={transform.hue}
          onChange={val => setTransform(t => ({ ...t, hue: val }))}
          sourceHue={sourceHue}
        />
        <OpacitySlider
          value={transform.opacity}
          onChange={(val) => setTransform((t) => ({ ...t, opacity: val }))}
          previewColor={previewColor}
        />
        {/* Reset */}
        <div className="flex justify-center">
          <button
            className="max-w-sm mt-4 px-6 py-3 font-bold text-lg rounded-xl bg-black text-white shadow-md hover:bg-gray-800 transition-all"
            type="button"
            onClick={() => {
              setTransform({
                lightness: 0,
                saturation: 0,
                hue: 0,
                opacity: 1,
              });
              setFixed({
                lightness: false,
                saturation: false,
                hue: false,
                opacity: false,
              });
            }}
          >
            Reset all
          </button>
        </div>
        <div className="fixed bottom-6 right-6 z-40">
          <button
            className="px-6 py-3 rounded-2xl bg-red-500 text-white font-bold shadow-lg border-2 border-black hover:bg-red-600 active:scale-95 transition-all cursor-pointer"
            style={{
              fontFamily: "'VT323', monospace",
            }}
            onClick={() => setModalOpen(true)}
          >
            Don't click Me!
          </button>
        </div>
        <DontClickModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </main>
    </div>
  );
}
