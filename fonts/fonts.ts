import localFont from "next/font/local";

export const aeonik = localFont({
  src: [
    {
      path: "./AeonikTRIAL-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./AeonikTRIAL-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./AeonikTRIAL-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./AeonikTRIAL-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./AeonikTRIAL-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./AeonikTRIAL-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-aeonik",
  display: "swap",
});