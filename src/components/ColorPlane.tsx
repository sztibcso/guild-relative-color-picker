import React, { useRef, useEffect } from "react";
import { colord } from "colord";
import { ColorPlaneProps } from "@/types/color-plane-props";

export const ColorPlane: React.FC<ColorPlaneProps> = ({
  sourceColor,
  transform,
  onPlaneChange, // ÚJ: erre nevezd át, hogy ne keveredjen!
  size = 200,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Forrás szín HSL-ben
  const hsl = colord(sourceColor).toHsl();

  // Canvas kirajzolása
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const s = (x / size) * 100;
        const l = (y / size) * 100;
        ctx.fillStyle = `hsl(${hsl.h}, ${s}%, ${l}%)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [sourceColor, size, hsl.h]);

  // Pozíció a plane-en
  const currentS = Math.max(0, Math.min(100, hsl.s + transform.saturation));
  const currentL = Math.max(0, Math.min(100, hsl.l + transform.lightness));
  const xPos = (currentS / 100) * size;
  const yPos = (currentL / 100) * size;

  // Plane-re kattintás
  function handlePlaneClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newS = Math.round((x / size) * 100);
    const newL = Math.round((y / size) * 100);
    const lDelta = newL - hsl.l;
    const sDelta = newS - hsl.s;
    // ÚJ: átadjuk a plane változást (a page komponens dönti el, mit fixál)
    onPlaneChange(lDelta, sDelta);
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium">Color Plane</span>
        <span className="text-xs text-slate-500">
          S: {currentS.toFixed(0)}% &nbsp; L: {currentL.toFixed(0)}%
        </span>
      </div>
      <div style={{ position: "relative", width: size, height: size }}>
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          style={{
            borderRadius: 8,
            boxShadow: "0 2px 8px 0 #0001",
            width: size,
            height: size,
            cursor: "crosshair",
            border: "1px solid #e5e7eb",
          }}
          onClick={handlePlaneClick}
        />
        {/* Jelölő: csak ha hue és opacity 0 */}
        {transform.hue === 0 && transform.opacity === 0 && (
          <div
            style={{
              position: "absolute",
              left: xPos - 7,
              top: yPos - 7,
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: "2px solid #2563eb",
              background: "#fff",
              pointerEvents: "none",
              boxSizing: "border-box",
            }}
          />
        )}
      </div>
      <p className="text-xs text-slate-400 mt-1">X: Saturation, Y: Lightness</p>
    </div>
  );
};
