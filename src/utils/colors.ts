export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export function brightnessToPct(brightness?: number): number {
  if (brightness === undefined || brightness === null) return 0;
  return Math.round((brightness / 255) * 100);
}

export function pctToBrightness(pct: number): number {
  return Math.max(0, Math.min(255, Math.round((pct / 100) * 255)));
}

export function hsvToRgb(h: number, s: number, v: number): RGB {
  const normS = Math.max(0, Math.min(100, s)) / 100;
  const normV = Math.max(0, Math.min(100, v)) / 100;
  const c = normV * normS;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = normV - c;
  let r = 0, g = 0, b = 0;
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

export function rgbToHsv(r: number, g: number, b: number): HSV {
  const normR = r / 255;
  const normG = g / 255;
  const normB = b / 255;
  const max = Math.max(normR, normG, normB);
  const min = Math.min(normR, normG, normB);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case normR: h = (normG - normB) / d + (normG < normB ? 6 : 0); break;
      case normG: h = (normB - normR) / d + 2; break;
      case normB: h = (normR - normG) / d + 4; break;
    }
    h *= 60;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
}

export const TEMP_COLOR_STOPS = [
  { ratio: 0.00, r: 255, g: 140, b: 26 },   // ~2000K: warm amber (#ff8c1a)
  { ratio: 0.15, r: 255, g: 167, b: 70 },   // ~2700K: warm incandescent (#ffa746)
  { ratio: 0.33, r: 255, g: 212, b: 156 },  // ~3500K: neutral warm halogen (#ffd49c)
  { ratio: 0.55, r: 244, g: 246, b: 255 },  // ~4500K: crisp natural white (#f4f6ff)
  { ratio: 0.78, r: 179, g: 212, b: 255 },  // ~5500K: cool daylight (#b3d4ff)
  { ratio: 1.00, r: 126, g: 172, b: 255 }   // ~6500K: cool ice blue (#7eacff)
];

export function kelvinToRgb(kelvin: number, minKelvin = 2000, maxKelvin = 6500): RGB {
  const minK = Math.min(minKelvin, maxKelvin);
  const maxK = Math.max(minKelvin, maxKelvin);
  const ratio = Math.max(0, Math.min(1, maxK === minK ? 0.5 : (kelvin - minK) / (maxK - minK)));

  for (let i = 0; i < TEMP_COLOR_STOPS.length - 1; i++) {
    const s1 = TEMP_COLOR_STOPS[i];
    const s2 = TEMP_COLOR_STOPS[i + 1];
    if (ratio >= s1.ratio && ratio <= s2.ratio) {
      const t = (ratio - s1.ratio) / (s2.ratio - s1.ratio);
      return {
        r: Math.round(s1.r + t * (s2.r - s1.r)),
        g: Math.round(s1.g + t * (s2.g - s1.g)),
        b: Math.round(s1.b + t * (s2.b - s1.b))
      };
    }
  }

  const last = TEMP_COLOR_STOPS[TEMP_COLOR_STOPS.length - 1];
  return { r: last.r, g: last.g, b: last.b };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, "0").toUpperCase();
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function resolvePresetRgb(preset: any): RGB | null {
  if (!preset) return null;

  // 1. If preset.rgb is [r, g, b]
  if (Array.isArray(preset.rgb) && preset.rgb.length >= 3) {
    return { r: Number(preset.rgb[0]), g: Number(preset.rgb[1]), b: Number(preset.rgb[2]) };
  }

  // 2. If preset.rgb_color is [r, g, b]
  if (Array.isArray(preset.rgb_color) && preset.rgb_color.length >= 3) {
    return { r: Number(preset.rgb_color[0]), g: Number(preset.rgb_color[1]), b: Number(preset.rgb_color[2]) };
  }

  // 3. If preset.color is [r, g, b]
  if (Array.isArray(preset.color) && preset.color.length >= 3) {
    return { r: Number(preset.color[0]), g: Number(preset.color[1]), b: Number(preset.color[2]) };
  }

  // 4. If preset.color is hex string "#ff0000" or "#f00"
  if (typeof preset.color === "string" && preset.color.startsWith("#")) {
    const hex = preset.color.replace("#", "");
    if (hex.length === 6) {
      return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
      };
    } else if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16)
      };
    }
  }

  // 5. Named CSS colors
  if (typeof preset.color === "string" && !preset.icon_color) {
    const namedColors: Record<string, RGB> = {
      red: { r: 255, g: 0, b: 0 },
      green: { r: 0, g: 255, b: 0 },
      blue: { r: 0, g: 150, b: 255 },
      cyan: { r: 0, g: 255, b: 255 },
      magenta: { r: 255, g: 0, b: 255 },
      purple: { r: 168, g: 85, b: 247 },
      yellow: { r: 255, g: 235, b: 59 },
      orange: { r: 255, g: 152, b: 0 },
      pink: { r: 244, g: 114, b: 182 }
    };
    const lower = preset.color.toLowerCase();
    if (namedColors[lower]) {
      return namedColors[lower];
    }
  }

  return null;
}

export function parseColorInput(input: string): RGB | null {
  if (!input) return null;
  const trimmed = input.trim();

  // If combined "RGB: ... | #HEX", extract the hex or rgb part
  if (trimmed.includes("|")) {
    const parts = trimmed.split("|");
    const hexPart = parts.find((p) => p.trim().startsWith("#"));
    if (hexPart) return parseColorInput(hexPart.trim());
    return parseColorInput(parts[0].trim());
  }

  // Hex format "#RRGGBB" or "RRGGBB" or "#RGB"
  if (trimmed.startsWith("#") || /^[0-9a-fA-F]{6}$/.test(trimmed) || /^[0-9a-fA-F]{3}$/.test(trimmed)) {
    const hex = trimmed.replace("#", "");
    if (hex.length === 6) {
      return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
      };
    } else if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16)
      };
    }
  }

  // RGB format "r, g, b" or "RGB: r, g, b" or "rgb(r, g, b)"
  const rgbMatch = trimmed.match(/(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/);
  if (rgbMatch) {
    return {
      r: Math.max(0, Math.min(255, parseInt(rgbMatch[1], 10))),
      g: Math.max(0, Math.min(255, parseInt(rgbMatch[2], 10))),
      b: Math.max(0, Math.min(255, parseInt(rgbMatch[3], 10)))
    };
  }

  // Named colors
  return resolvePresetRgb({ color: trimmed });
}
