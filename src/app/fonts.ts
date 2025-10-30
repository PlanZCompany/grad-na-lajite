import localFont from "next/font/local";

export const kolka = localFont({
  src: [
    { path: "./fonts/Kolka-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Kolka-Medium.woff2",  weight: "500", style: "normal" },
    { path: "./fonts/Kolka-Bold.woff2",    weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-kolka",
  fallback: ["ui-sans-serif", "system-ui", "Arial"],
  adjustFontFallback: "Arial",
});

export const sansation = localFont({
  src: [
    { path: "./fonts/Sansation-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Sansation-Bold.woff2",    weight: "700", style: "normal" },
    { path: "./fonts/Sansation-Italic.woff2",  weight: "400", style: "italic" },
    { path: "./fonts/Sansation-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  display: "swap",
  variable: "--font-sansation",
  fallback: ["ui-sans-serif", "system-ui", "Arial"],
  adjustFontFallback: "Arial",
});

export const greatVibes = localFont({
  src: [{ path: "./fonts/GreatVibes-Regular.woff2", weight: "400", style: "normal" }],
  display: "swap",
  variable: "--font-great-vibes",
  fallback: ["ui-serif", "Georgia", "Times New Roman"],
  adjustFontFallback: "Arial",
});
