# 🎨 Relative Color Picker

A modern, pixelart-inspired color transformation tool – built with Next.js, Tailwind CSS, and Radix UI.


## Features

- **Guild-based Source Color**: Select a guild to instantly use its surface color.
- **Relative Color Transformations**: Adjust Lightness, Saturation, Hue, and Opacity _relatively_ (not absolutely!).
- **Live 2D Color Plane**: Visual, interactive picker for fast color targeting.
- **Custom Sliders**: Form controls for each transformation, always in sync with the color plane.
- **CSS Syntax Display**: Instantly copy the CSS `color(from ...)` or `rgba(...)` string.
- **Easter Egg**: Don’t click the button in the corner... (Or do. 😁)
- **Pixelart/Retro UI**: VT323 font, gradients, responsive, with a hint of Tibcsó humor.

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI Slider](https://www.radix-ui.com/primitives/docs/components/slider)
- [colord](https://github.com/omgovich/colord) (for color math)

## Setup & Development

1. **Clone the repo:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/relative-color-picker.git
   cd relative-color-picker


2. **Install dependencies:**
   ```bash
   npm install


3. **Start the dev server::**
   ```bash
   npm run dev

   
Open http://localhost:3000 in your browser.

Deployment
Recommended: Vercel

Zero-config, one-click deployment – see below for step-by-step guide.

Design notes
All color adjustments are relative to the currently selected guild's surface color.

Changing the source color preserves your relative transformations.

Sliders and the color plane are always synchronized.

Fully responsive, works on desktop & mobile. 

Made with ❤️ and a pixel of humor by Tibcsó.
