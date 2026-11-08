import { RGB, rgbToHex } from "./colors";

export type SliderMode = "brightness" | "temp" | "color";
export type ColorTextFormat = "rgb" | "hex" | "both";

export function formatSubtitle(
  mode: SliderMode,
  isOn: boolean,
  isDragging: boolean,
  liveBrightness: number,
  liveKelvin: number,
  liveRgb: RGB,
  colorFormat: ColorTextFormat = "rgb"
): string {
  if (mode === "brightness") {
    if (isDragging || isOn) {
      return `${Math.round(liveBrightness)}%`;
    }
    return "Off";
  }

  if (mode === "temp") {
    return `${Math.round(liveKelvin)} K`;
  }

  if (mode === "color") {
    const rgbStr = `RGB: ${liveRgb.r}, ${liveRgb.g}, ${liveRgb.b}`;
    const hexStr = rgbToHex(liveRgb.r, liveRgb.g, liveRgb.b);
    if (colorFormat === "hex") {
      return hexStr;
    }
    if (colorFormat === "both") {
      return `${rgbStr} | ${hexStr}`;
    }
    return rgbStr;
  }

  return "";
}

export function throttle<T extends (...args: any[]) => void>(fn: T, wait: number): T {
  let timer: any = null;
  let lastArgs: any = null;

  const throttled = (...args: any[]) => {
    lastArgs = args;
    if (timer) return;

    timer = setTimeout(() => {
      timer = null;
      if (lastArgs) {
        fn(...lastArgs);
        lastArgs = null;
      }
    }, wait);
  };

  return throttled as T;
}
