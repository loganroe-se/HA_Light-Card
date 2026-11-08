import { html, TemplateResult } from "lit";

export const ICONS: Record<string, string> = {
  bed: "M19 7h-8v7H3V5H1v15h2v-3h18v3h2v-9a4 4 0 0 0-4-4m-2 5h-4V9h4zM7 7a3 3 0 0 0-3 3v2h6v-2a3 3 0 0 0-3-3",
  lightbulb: "M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z",
  power: "M16.56,5.44L15.11,6.89C16.84,8.63 17.63,11.09 17.26,13.62C16.73,17.24 13.72,20.08 10.09,20.44C6.07,20.84 2.6,17.65 2.5,13.62C2.42,10.61 4.09,7.94 6.72,6.72L5.89,5.89C2.78,7.37 0.77,10.72 1,14.5C1.34,19.34 5.22,23.23 10.06,23.57C15.65,23.96 20.35,19.78 20.5,14.22C20.6,10.59 18.91,7.24 16.56,5.44M11,1V12H13V1H11Z",
  sun: "M12,7 A5,5 0 0,0 7,12 A5,5 0 0,0 12,17 A5,5 0 0,0 17,12 A5,5 0 0,0 12,7 M12,9 A3,3 0 0,1 15,12 A3,3 0 0,1 12,15 A3,3 0 0,1 9,12 A3,3 0 0,1 12,9 M12,2 L12,4 M12,20 L12,22 M2,12 L4,12 M20,12 L22,12 M4.93,4.93 L6.34,6.34 M17.66,17.66 L19.07,19.07 M4.93,19.07 L6.34,17.66 M17.66,6.34 L19.07,4.93",
  thermometer: "M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z",
  palette: "M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z",
  brightness: "M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z",
  night: "M12.3,2A10,10 0 0,0 2,12.3A10,10 0 0,0 12,22A10,10 0 0,0 22,12.3C21.4,12.4 20.7,12.5 20,12.5A9.5,9.5 0 0,1 10.5,3C10.5,2.3 10.6,1.6 10.7,1C11.3,1.3 11.8,1.6 12.3,2Z",
  sunset: "M5.07,4.35L6.49,5.76L4.05,8.2L2.64,6.79L5.07,4.35M18.93,4.35L21.36,6.79L19.95,8.2L17.51,5.76L18.93,4.35M12,2V5H11V2H12M2,18V16H22V18H2M12,7A5,5 0 0,1 17,12H7A5,5 0 0,1 12,7Z",
  book: "M13,12H20V13.5H13V12M13,9.5H20V11H13V9.5M13,7H20V8.5H13V7M21,4H13A1,1 0 0,0 12,5V19A1,1 0 0,0 13,20H21A1,1 0 0,0 22,19V5A1,1 0 0,0 21,4M11,4H3A1,1 0 0,0 2,5V19A1,1 0 0,0 3,20H11A1,1 0 0,0 12,19V5A1,1 0 0,0 11,4Z",
  flash: "M7,2V13H10V22L17,10H13L17,2H7Z",
  pencil: "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
};

export function renderSvgIcon(path: string, size = 24): TemplateResult {
  return html`
    <svg viewBox="0 0 24 24" style="width:${size}px; height:${size}px; display:block; fill:currentColor;">
      <path d="${path}" />
    </svg>
  `;
}

export function resolvePresetIcon(iconName?: string, fallback = ICONS.palette): string {
  if (!iconName) return fallback;
  const lower = iconName.toLowerCase();
  if (lower.includes("pencil") || lower.includes("edit")) return ICONS.pencil;
  if (lower.includes("bed")) return ICONS.bed;
  if (lower.includes("bulb") || lower.includes("light")) return ICONS.lightbulb;
  if (lower.includes("sun") || lower.includes("day") || lower.includes("adaptive")) return ICONS.sun;
  if (lower.includes("sunset") || lower.includes("dusk") || lower.includes("relax")) return ICONS.sunset;
  if (lower.includes("night") || lower.includes("moon")) return ICONS.night;
  if (lower.includes("book") || lower.includes("read")) return ICONS.book;
  if (lower.includes("flash") || lower.includes("energy") || lower.includes("bolt")) return ICONS.flash;
  if (lower.includes("temp") || lower.includes("thermometer")) return ICONS.thermometer;
  if (lower.includes("palette") || lower.includes("color")) return ICONS.palette;
  if (lower.includes("power")) return ICONS.power;
  if (lower.includes("bright")) return ICONS.brightness;
  return fallback;
}

export function renderIcon(
  iconName: string | undefined,
  defaultSvgPath: string,
  size = 22
): TemplateResult {
  // If running inside Home Assistant and <ha-icon> is registered, use it!
  if (iconName && customElements.get("ha-icon")) {
    return html`
      <ha-icon
        .icon=${iconName}
        style="--mdc-icon-size: ${size}px; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center;"
      ></ha-icon>
    `;
  }
  // Fallback to SVG path
  const path = resolvePresetIcon(iconName, defaultSvgPath);
  return renderSvgIcon(path, size);
}
