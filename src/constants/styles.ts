// Consistent style definitions across the app
export const STYLES = {
  // Button styles
  button: {
    base: "cursor-pointer rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-[#1d1f24]",
    primary: "bg-sky-500 px-2 py-1.5 text-sm text-white hover:bg-sky-600 active:bg-sky-700",
    secondary: "bg-white/5 px-2 py-1.5 text-sm text-slate-200 hover:bg-white/10",
    ghost: "text-slate-300 hover:text-white px-2 py-1",
    danger: "hover:bg-red-600 hover:text-white",
  },

  // Input styles
  input: {
    base: "w-full rounded-md border border-white/10 bg-[#1d1f24] px-2 py-1.5 text-sm text-slate-100 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500",
  },

  // NavLink/Link styles
  link: {
    base: "rounded px-3 py-0.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500",
    hover: "hover:bg-white/10",
    active: "bg-sky-500/20 text-sky-400 font-semibold",
  },

  // Form group styles
  form: {
    container: "space-y-2",
    buttonGroup: "flex items-center gap-3",
  },
};

// Color palettes for board backgrounds
export const COLOR_PALETTE = {
  gradients: [
    "linear-gradient(135deg, #1e3a8a 0%, #0ea5e9 100%)", // Blue gradient
    "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)", // Cyan to Green
    "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)", // Purple to Pink
    "linear-gradient(135deg, #f97316 0%, #facc15 100%)", // Orange to Yellow
    "linear-gradient(135deg, #dc2626 0%, #8b5cf6 100%)", // Red to Purple
    "linear-gradient(135deg, #1f2937 0%, #6b4226 100%)", // Dark Gray to Brown
  ],
  solidColors: [
    "#1a583e",
    "#664c01",
    "#7e3d00",
    "#8b251d",
    "#663284",
    "#114696",
    "#1a5569",
    "#3d5619",
    "#76315c",
    "#4e5457",
  ],
};
