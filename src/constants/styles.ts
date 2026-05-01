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
    base: "rounded px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500",
    hover: "hover:bg-white/10",
    active: "bg-sky-500/20 text-sky-400",
  },

  // Form group styles
  form: {
    container: "space-y-2",
    buttonGroup: "flex items-center gap-3",
  },
};
