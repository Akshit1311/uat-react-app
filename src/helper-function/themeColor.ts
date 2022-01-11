export function ThemeColorIdentifier(value: string) {
  value = value.toLowerCase();
  if (value === "theme-1") return "#0177FA";
  if (value === "theme-3") return "#ED8E00";
  if (value === "theme-4") return "#7838E0";
  if (value === "theme-5") return "#BDAA00";
  if (value === "theme-6") return "#CB3535";
  if (value === "theme-7") return "#00AD11";
}

export function ThemeShadowIdentifier(value: string) {
  value = value.toLowerCase();
  if (value === "theme-1") return "0px 0px 20px rgba(1, 119, 250, 0.25)";
  if (value === "theme-3") return "0px 0px 20px rgba(237, 142, 0, 0.2)";
  if (value === "theme-4") return "0px 0px 20px rgba(120, 56, 224, 0.2);";
  if (value === "theme-5") return "0px 0px 20px rgba(189, 170, 0, 0.2)";
  if (value === "theme-6") return "0px 0px 20px rgba(203, 53, 53, 0.2)";
  if (value === "theme-7") return "0px 0px 20px rgba(0, 173, 17, 0.2)";
}

export function ThemeShadowColorIdentifier(value: string) {
  value = value.toLowerCase();
  if (value === "theme-1") return "rgba(1, 119, 250, 0.2)";
  if (value === "theme-3") return "rgba(237, 142, 0, 0.2)";
  if (value === "theme-4") return "rgba(120, 56, 224, 0.2);";
  if (value === "theme-5") return "rgba(189, 170, 0, 0.2)";
  if (value === "theme-6") return "rgba(203, 53, 53, 0.2)";
  if (value === "theme-7") return "rgba(0, 173, 17, 0.2)";
}
