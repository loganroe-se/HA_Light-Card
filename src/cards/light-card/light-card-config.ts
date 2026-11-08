import { LovelaceCardConfig } from "../../ha/types";

export interface PresetConfig {
  name: string;
  icon?: string;
  color?: string | [number, number, number];
  icon_color?: string;
  brightness?: number;
  kelvin?: number;
  rgb?: [number, number, number];
  rgb_color?: [number, number, number];
  scene?: string;
  service?: string;
  service_data?: Record<string, any>;
  effect?: string;
}

export interface BrightnessSubpreset {
  value: number;
  label?: string;
}

export interface TemperatureSubpreset {
  kelvin: number;
  label?: string;
}

export interface ColorSubpreset {
  color: string;
  label?: string;
}

export interface SubpresetsConfig {
  show?: boolean;
  brightness?: (number | BrightnessSubpreset)[];
  temperature?: (number | TemperatureSubpreset)[];
  temp?: (number | TemperatureSubpreset)[];
  color?: (string | ColorSubpreset)[];
}

export interface CustomToggleConfig {
  icon?: string;
  name?: string;
  title?: string;
  entity?: string | string[];
  entities?: string[];
  entity_id?: string | string[];
  service?: string;
  service_data?: Record<string, any>;
  color?: string;
  icon_color?: string;
}

export interface LightEntityConfig {
  entity: string;
  name?: string;
  icon?: string;
  show_label?: boolean;
  showLabel?: boolean;
  x?: number;
  y?: number;
  x_position?: number;
  y_position?: number;
  left?: number;
  top?: number;
}

export interface LightCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
  entities?: (string | LightEntityConfig)[];
  show_light_selection?: boolean;
  enable_light_selection?: boolean;
  light_label_mode?: "always" | "hover" | "selected" | "never";
  light_selection_image?: string;
  light_image?: string;
  image?: string;
  floorplan_image?: string;
  light_selection_image_height?: string;
  vibrate?: boolean;
  enable_vibrate?: boolean;
  haptic?: boolean;
  custom_toggles?: CustomToggleConfig[];
  toggles?: CustomToggleConfig[];
  name?: string;
  icon?: string;
  adaptive_lighting_entity?: string;
  adaptive_lighting_icon?: string;
  power_icon?: string;
  brightness_icon?: string;
  temperature_icon?: string;
  temp_icon?: string;
  color_icon?: string;
  show_adaptive_lighting?: boolean;
  show_presets?: boolean;
  preset_max_rows?: number;
  show_all_mode_buttons?: boolean;
  show_all_sliders?: boolean;
  all_sliders?: boolean;
  show_brightness?: boolean;
  show_temperature?: boolean;
  show_temp?: boolean;
  show_color?: boolean;
  highlight_mode_buttons?: boolean;
  mode_button_highlights?: boolean;
  color_format?: "rgb" | "hex" | "both";
  color_text_format?: "rgb" | "hex" | "both";
  editable_subtitle?: boolean;
  enable_subtitle_editing?: boolean;
  show_subtitle?: boolean;
  show_subpresets?: boolean;
  subpresets?: SubpresetsConfig;
  brightness_presets?: (number | BrightnessSubpreset)[];
  temperature_presets?: (number | TemperatureSubpreset)[];
  temp_presets?: (number | TemperatureSubpreset)[];
  color_presets?: (string | ColorSubpreset)[];
  min_brightness?: number;
  max_brightness?: number;
  presets?: PresetConfig[];
  min_kelvin?: number;
  max_kelvin?: number;
}

export const DEFAULT_BRIGHTNESS_SUBPRESETS: (number | BrightnessSubpreset)[] = [1, 25, 50, 75, 100];
export const DEFAULT_TEMPERATURE_SUBPRESETS: (number | TemperatureSubpreset)[] = [2200, 2700, 3500, 4500, 6500];
export const DEFAULT_COLOR_SUBPRESETS: (string | ColorSubpreset)[] = [
  "#FF3B30",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#00C7BE",
  "#007AFF",
  "#5856D6",
  "#AF52DE"
];

export const DEFAULT_PRESETS: PresetConfig[] = [
  {
    name: "Default",
    icon: "mdi:palette",
    brightness: 60,
    kelvin: 2700,
    rgb: [255, 166, 87]
  },
  {
    name: "Relax",
    icon: "mdi:weather-sunset",
    brightness: 35,
    kelvin: 2200,
    rgb: [255, 146, 39]
  },
  {
    name: "Read",
    icon: "mdi:book-open",
    brightness: 80,
    kelvin: 4000,
    rgb: [255, 205, 166]
  },
  {
    name: "Night",
    icon: "mdi:weather-night",
    brightness: 5,
    kelvin: 2000,
    rgb: [255, 137, 14]
  }
];
