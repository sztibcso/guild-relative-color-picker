"use client";

import { useState } from "react";
import { guilds } from "@/data/guilds";
import { GuildSelector } from "@/components/GuildSelector";
import { SourceColorPreview } from "@/components/SourceColorPreview";
import { TransformSlider } from "@/components/TransformSlider";
import { ColorTransform } from "@/types/color-transform";
import { sliderConfigs } from "@/data/slider-config";
import { ColorPlane } from "@/components/ColorPlane";
import { OpacitySlider } from "@/components/ui/OpacitySlider";
import { colord } from "colord";
import { HueSlider } from "@/components/ui/HueSlider";
import { RelativeColorString } from "@/components/RelativeColorString";

function getTransformedColor(
  baseColor: string,
  transform: ColorTransform,
  alphaOverride?: number
) {
  // Alap szín-transzformáció: minden komponens ezt használja
  let c = colord(baseColor)
    .hue((colord(baseColor).toHsl().h + transform.hue) % 360)
    .saturate(1 + transform.saturation / 100)  // +50 → 1.5, -50 → 0.5
    .lighten(transform.lightness / 100);       // +50 → 0.5 (50%), 0 = semmi
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
    opacity: 1, // FONTOS: alapból 1 (teljesen látszik)
  });
  const [fixed, setFixed] = useState<Record<keyof ColorTransform, boolean>>({
    lightness: false,
    saturation: false,
    hue: false,
    opacity: false,
  });

  // Ez a previewColor lesz a legtöbb slider alapja, mindig alpha=1
  const previewColor = getTransformedColor(selectedGuild.surfaceColor, { ...transform, opacity: 1 }, 1);

  // Ez a tényleges preview, ami az opacity-t is mutatja (current color)
  const previewColorWithOpacity = getTransformedColor(
    selectedGuild.surfaceColor,
    transform
  );

  // Ez a relatív CSS string, ha kell:
  // (használd a saját logicodat, ha máshogy szeretnéd)
  // const cssString = ...;

  return (
    <main className="max-w-xl mx-auto p-8">
      <GuildSelector
        guilds={guilds}
        selectedGuildId={selectedGuildId}
        onChange={setSelectedGuildId}
      />

      {/* Szín preview (opacity-vel együtt) */}
      <SourceColorPreview color={previewColorWithOpacity} />

      {/* Sliderek */}
      <TransformSlider
        label="Lightness"
        min={-50}
        max={50}
        value={transform.lightness}
        onChange={(val) => setTransform((t) => ({ ...t, lightness: val }))}
        unit="%"
        onReset={() => setTransform((t) => ({ ...t, lightness: 0 }))}
        fixable
        isFixed={fixed.lightness}
        onFixToggle={(isFixed) => setFixed((f) => ({ ...f, lightness: isFixed }))}
      />
      <TransformSlider
        label="Saturation"
        min={-50}
        max={50}
        value={transform.saturation}
        onChange={(val) => setTransform((t) => ({ ...t, saturation: val }))}
        unit="%"
        onReset={() => setTransform((t) => ({ ...t, saturation: 0 }))}
        fixable
        isFixed={fixed.saturation}
        onFixToggle={(isFixed) => setFixed((f) => ({ ...f, saturation: isFixed }))}
      />

      {/* HUE: slider, previewColor (alpha=1) */}
      <HueSlider
        value={transform.hue}
        onChange={(val) => setTransform((t) => ({ ...t, hue: val }))}
      />

      {/* OPACITY: slider, previewColor (alpha=1, csak háttérhez kell) */}
      <OpacitySlider
        value={transform.opacity}
        onChange={(val) => setTransform((t) => ({ ...t, opacity: val }))}
        previewColor={previewColor}
      />

      {/* ColorPlane: mindig previewColor (alpha=1) */}
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

      {/* Ha akarod, itt lehet a relatív szintaxis preview */}
      {/* <RelativeColorString cssString={cssString} /> */}

      {/* RESET */}
      <button
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
        className="my-2 px-4 py-2 rounded bg-slate-200 hover:bg-slate-300 font-bold"
      >
        Reset all
      </button>
    </main>
  );
}
