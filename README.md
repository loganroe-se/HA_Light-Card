# HA Light Card

A sleek, modern custom light card for [Home Assistant](https://www.home-assistant.io/) Lovelace dashboards, designed with minimalist pill controls, real-time responsive sliders, and scene presets.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge)](https://github.com/hacs/default)
[![GitHub Release](https://img.shields.io/github/v/release/loganroe-se/HA_Light-Card?style=for-the-badge)](https://github.com/loganroe-se/HA_Light-Card/releases)
[![License](https://img.shields.io/github/license/loganroe-se/HA_Light-Card?style=for-the-badge)](https://github.com/loganroe-se/HA_Light-Card/blob/main/LICENSE)

---

## DISCLAIMER
This is almost 100% AI-written, human-tested code.

---

## Features

- **Multi-Light Group Selection Bar**:
  - Optional interactive selection row seamlessly integrated into the top of the card (`show_light_selection`, default: `false`).
  - Perfect for light groups: configure an array of member lights (`entities`) to control together or independently.
  - **Single Click**: Multi-select toggle (add or remove lights to control multiple simultaneously).
  - **Double Click**: Solo / exclusive select (selects ONLY that light, deselecting all others; double-clicking again toggles back to selecting all).
  - **Drag Selection**: Left-click and drag on PC, or touch-and-hold (~250ms) then drag on mobile, to draw a smooth golden marquee box and select multiple lights quickly across the floorplan image or shelf. Shift+drag on PC adds to the current selection.
  - **Customizable Labels (`light_label_mode`)**:
    - `always` (default): Show icon and custom name on all lights.
    - `hover`: Show label on hover under each light orb.
    - `selected`: Show name only when selected, hiding unselected labels.
    - `never`: Compact icon-only orbs for all lights.
  - **Interactive Re-ordering**: Drag the ⋮⋮ handle on lights or presets anytime in the visual card editor to re-order them, or customize the YAML array order.
  - Per-light custom `name`, `icon`, and `show_label` overrides.
- **Minimalist Pill Design**: Rounded corners, warm amber glowing active states, and balanced geometry.
- **Top-Left Dual-Line Header**:
  - Configurable entity icon (e.g. `mdi:bed`, `mdi:lightbulb`) and custom display title.
  - Subtitle updates **in real time** as the slider is dragged without delay:
    - **Brightness Mode**: Shows percentage (e.g. `60%`, or `Off` when turned off).
    - **Temperature Mode**: Shows Kelvin (e.g. `2700 K`).
    - **Color Mode**: Configurable format (`rgb`, `hex`, or `both`):
      - `rgb`: `RGB: 255, 166, 87` (default)
      - `hex`: `#FFA657`
      - `both`: `RGB: 255, 166, 87 | #FFA657`
  - **Inline Editable Text**: Click the subtitle at any time to type an exact value!
    - **Brightness**: Enter any percentage (e.g. `75` or `75%`). Clamped to min/max brightness. Setting `0` turns the light off.
    - **Temperature**: Enter any Kelvin value (e.g. `3000` or `3000 K`). Clamped to min/max Kelvin.
    - **Color**: Enter Hex (e.g. `#FFA657`), RGB (e.g. `255, 166, 87`), or named colors.
    - Press **Enter** or click outside to apply immediately; press **Escape** to cancel.
- **Fully Customizable Icons**:
  - Configurable icons for **Adaptive Lighting**, **Power button**, **Brightness button**, **Temperature button**, and **Color button**.
- **Header Actions**:
  - **Adaptive Lighting Toggle**: Circular sun button to the left of the power button with glowing warm yellow active styling. Automatically detects `switch.adaptive_lighting_<light_name>` or binds to a specified entity.
  - **Power Button**: Circular button with warm amber illumination and glow when the light is on.
- **Multi-Mode Bar Slider**:
  - **Brightness Mode**: Solid warm peach/amber fill bar with configurable `min_brightness` and `max_brightness`.
  - **Temperature Mode**: Warm-to-cool Kelvin gradient track with a white capsule indicator.
  - **Color Mode**: Full 360-degree rainbow hue gradient with real-time RGB color indicator.
  - Bulletproof window-level pointer event listeners preventing slider lockup.
  - **Commit-on-Release Updates**: Smooth 60fps local preview while dragging, sending a single Home Assistant service call only on release (mouseup/touchend) with optimistic value hold to eliminate slider jumping.
- **Smart Quick-Swap Mode Buttons**:
  - By default (`show_all_mode_buttons: false`), the active mode's button is hidden to save space (matching the bottom reference card: in Brightness mode, only Temp & Color buttons are shown; in Temp mode, only Brightness & Color buttons are shown).
  - Can optionally show all 3 buttons simultaneously (`show_all_mode_buttons: true`).
- **Context-Aware Subpresets Row**:
  - Quick-access bubble pills placed right beneath the slider and above regular presets, matching the active mode:
    - **Brightness**: Pills (`1%`, `25%`, `50%`, `75%`, `100%`) with background brightness and glow dynamically scaling from dim to bright.
    - **Temperature**: Pills (`2200K`, `2700K`, `3500K`, `4500K`, `6500K`) with glowing color-calibrated temperature dots and subtle warm/cool background tints.
    - **Color**: Crisp color circle bubbles filled with the preset color with glowing active indicator rings.
    - Seamlessly configurable or toggleable via `show_subpresets: true/false`.
- **Multi-Row Expanding & Scrollable Presets**:
  - Presets wrap into multiple rows, expanding dynamically up to `preset_max_rows` (default: 3 rows).
  - If presets exceed `preset_max_rows`, the row scrolls vertically with a clean unobtrusive scrollbar.
  - Presets support exact matching on all configured fields (`brightness`, `kelvin`, and `rgb`). A preset only highlights when all of its defined fields match the light state.
- **Visual GUI Configuration Editor**:
  - First-class Home Assistant Lovelace card editor support (`<ha-light-card-editor>`) for configuring entities, custom button icons, brightness limits, preset row limits, and options in the UI without touching YAML.

---

## Configuration

### Visual Editor

Configure the card directly using the Home Assistant visual editor when adding or editing a card.

### YAML Configuration

```yaml
type: custom:ha-light-card
entity: light.main_bedroom
name: "Main Bedroom"
icon: mdi:bed

# Multi-Light Group Selection (Optional)
show_light_selection: false              # false (default): hides selection bar; true: displays interactive light pills
light_label_mode: always                 # always (default), hover, selected, or never
light_selection_image: /local/floorplan.png # optional image or floorplan to overlay lights onto
vibrate: false                           # false (default): off; true: triggers brief vibration on mobile when hold-drag activates
entities:                                # optional list of entities (strings or objects)
  - entity: light.bedroom_lamp_left
    name: "Lamp Left"
    icon: mdi:lamp
    x: 25                                # X position on image (0 - 100%)
    y: 60                                # Y position on image (0 - 100%)
  - entity: light.bedroom_lamp_right
    name: "Lamp Right"
    icon: mdi:lamp
    x: 75
    y: 60
  - entity: light.bedroom_ceiling
    name: "Ceiling"
    icon: mdi:ceiling-light
    x: 50
    y: 20

# Custom Button Icons
adaptive_lighting_icon: mdi:weather-sunny # or mdi:sun-wireless, mdi:brightness-auto
power_icon: mdi:power                     # or mdi:power-cycle, mdi:lightbulb
brightness_icon: mdi:brightness-6         # or mdi:white-balance-sunny
temperature_icon: mdi:thermometer         # or mdi:temperature-kelvin
color_icon: mdi:palette                   # or mdi:palette-outline

# Custom Header Toggles (Optional buttons shown to the left of adaptive/power)
custom_toggles:
  - name: "Both Lamps"
    icon: mdi:lamps
    entities:
      - light.bedroom_lamp_left
      - light.bedroom_lamp_right

# Behavior & Limits
show_all_mode_buttons: false              # false (default): hides active mode button; true: shows all 3
show_all_sliders: false                  # false (default): single slider with mode swap; true: stacks all enabled sliders
show_brightness: true                    # true (default): enables brightness mode slider
show_temperature: true                   # true (default): enables color temperature mode slider (alias show_temp)
show_color: true                         # true (default): enables RGB/HSV color mode slider
highlight_mode_buttons: true             # true (default): replicates brightness, temp color, and active color on mode buttons
editable_subtitle: true                   # true (default): allows clicking subtitle to type exact values
show_subtitle: true                       # true (default): shows subtitle; false: disables subtitle entirely
color_format: rgb                         # rgb (default), hex, or both (RGB | Hex)
preset_max_rows: 3                        # maximum rows before scrolling (default: 3)
min_brightness: 5                         # optional minimum brightness limit (0-100)
max_brightness: 90                        # optional maximum brightness limit (0-100)
adaptive_lighting_entity: switch.adaptive_lighting_main_bedroom
show_adaptive_lighting: true
show_subpresets: true                     # true (default): displays mode subpreset bubbles
brightness_presets: [1, 25, 50, 75, 100]  # optional custom brightness subpresets
temperature_presets: [2200, 2700, 3500, 4500, 6500] # optional custom temp subpresets (K)
color_presets: ["#FF3B30", "#FF9500", "#FFCC00", "#34C759", "#00C7BE", "#007AFF", "#5856D6", "#AF52DE"]
show_presets: true
presets:
  - name: Default
    icon: mdi:palette
    brightness: 60
    kelvin: 2700
    rgb: [255, 166, 87]
  - name: Relax
    icon: mdi:weather-sunset
    brightness: 35
    kelvin: 2200
    rgb: [255, 146, 39]
  - name: Read
    icon: mdi:book-open
    brightness: 80
    kelvin: 4000
    rgb: [255, 205, 166]
  - name: Night
    icon: mdi:weather-night
    brightness: 5
    kelvin: 2000
    rgb: [255, 137, 14]
```

### Configuration Options

#### Core Settings

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | `string \| list` | **Required** | Primary entity ID or list of entity IDs (e.g. `light.main_bedroom` or `['light.orb', 'light.lamp']`), searchable in the visual editor across all Home Assistant entities. |
| `name` | `string` | Entity name | Custom card title displayed in the header. |
| `icon` | `string` | `mdi:bed` / Entity icon | Custom header icon. |

#### Multi-Light Group & Floorplan Selection

| Option | Type | Default | Description |
|---|---|---|---|
| `show_light_selection` | `boolean` | `false` | Enable or disable the interactive light selection shelf above the card (alias `enable_light_selection`). |
| `entities` | `list` | Auto-resolved from `entity` | Array of child entities (`string` or `{entity, name?, icon?, show_label?, x?, y?}`) with hand-editable labels and optional X%/Y% image positions (0-100%). Defaults automatically populate from selected entities/groups. |
| `light_selection_image` | `string` | `undefined` | Uploaded background image (JPEG, PNG, WebP, GIF, SVG) or URL/path (`/local/...`) to overlay light icons onto (alias `light_image`, `image`, `floorplan_image`). If omitted, uses standard horizontal shelf layout. |
| `light_selection_image_height` | `number \| string` | `undefined` | Optional fixed canvas height in pixels (e.g. `250`). When omitted, height matches the image's natural aspect ratio. (Alias `image_height`). |
| `light_selection_image_fit` | `string` | `fill` | How the image fits when a fixed height is defined: `fill` (`cover` crop to fill), `contain` (fit inside preserving aspect ratio), or `stretch` (stretch to exact dimensions). (Alias `image_fit`). |
| `light_label_mode` | `string` | `always` | Display mode for light labels: `always` (always show), `hover` (show on hover), `selected` (show only when selected), `never` (never show). |
| `vibrate` | `boolean` | `false` | Enable or disable haptic vibration feedback on mobile when hold-to-drag selection engages (alias `enable_vibrate`, `haptic`). Default: `false`. |

#### Header & Subtitle Settings

| Option | Type | Default | Description |
|---|---|---|---|
| `show_subtitle` | `boolean` | `true` | Show or hide the state subtitle text under the title. |
| `editable_subtitle` | `boolean` | `true` | Enable or disable clicking the subtitle to edit values directly (alias `enable_subtitle_editing`). |
| `color_format` | `string` | `rgb` | Color subtitle format: `rgb`, `hex`, or `both` (displays `RGB: ... \| #HEX`). (Alias `color_text_format`). |

#### Header Actions & Custom Toggles

| Option | Type | Default | Description |
|---|---|---|---|
| `show_adaptive_lighting` | `boolean` | `true` | Show or hide the adaptive lighting sun button. |
| `adaptive_lighting_entity` | `string` | Auto-detected | Adaptive lighting switch entity ID. Auto-detects matching `switch.adaptive_lighting_<light_name>` if blank. |
| `custom_toggles` | `list` | `[]` | Array of custom toggle buttons shown to the left of the adaptive/power buttons (`{name?, icon?, entities?: string[], entity?: string, color?}`). (Alias `toggles`). |
| `power_icon` | `string` | `mdi:power` | Custom icon for the power button. |
| `adaptive_lighting_icon` | `string` | `mdi:weather-sunny` | Custom icon for the adaptive lighting button. |
| `brightness_icon` | `string` | `mdi:brightness-6` | Custom icon for the brightness selection button. |
| `temperature_icon` | `string` | `mdi:thermometer` | Custom icon for the color temperature button (alias `temp_icon`). |
| `color_icon` | `string` | `mdi:palette` | Custom icon for the color selection button. |

#### Sliders & Mode Controls

| Option | Type | Default | Description |
|---|---|---|---|
| `show_all_sliders` | `boolean` | `false` | If `true`, displays all enabled sliders (brightness, temperature, color) simultaneously stacked vertically on top of one another (alias `all_sliders`). |
| `show_all_mode_buttons` | `boolean` | `false` | If `false` (default), hides the active mode's button to save space. If `true`, displays all enabled buttons with the active one highlighted. |
| `highlight_mode_buttons` | `boolean` | `true` | Replicate brightness level, temp color, and active color directly on the mode buttons (alias `mode_button_highlights`). |
| `show_brightness` | `boolean` | `true` | Enable or disable brightness mode slider and button. |
| `show_temperature` | `boolean` | `true` | Enable or disable color temperature mode slider and button (alias `show_temp`). |
| `show_color` | `boolean` | `true` | Enable or disable RGB/HSV color mode slider and button. |
| `min_brightness` | `number` | `0` | Minimum brightness limit percentage (0-100). |
| `max_brightness` | `number` | `100` | Maximum brightness limit percentage (1-100). |
| `min_kelvin` | `number` | `2000` (or attribute) | Minimum Kelvin color temperature limit. |
| `max_kelvin` | `number` | `6500` (or attribute) | Maximum Kelvin color temperature limit. |

#### Presets & Subpresets

| Option | Type | Default | Description |
|---|---|---|---|
| `show_subpresets` | `boolean` | `true` | Show or hide the mode-specific subpreset bubble row beneath the slider. |
| `brightness_presets` | `list` | `[1, 25, 50, 75, 100]` | Array of brightness numbers or `{value, label}` objects. |
| `temperature_presets` | `list` | `[2200, 2700, 3500, 4500, 6500]` | Array of Kelvin numbers or `{kelvin, label}` objects (alias `temp_presets`). |
| `color_presets` | `list` | 8 rainbow colors | Array of hex color strings or `{color, label}` objects. |
| `subpresets` | `object` | `{}` | Optional nested object containing `brightness`, `temperature`, and `color` subpreset configurations. |
| `show_presets` | `boolean` | `true` | Show or hide the main preset pills row. |
| `preset_max_rows` | `number` | `3` | Maximum number of preset rows to display before scrolling vertically. |
| `presets` | `list` | Default presets | Array of preset items (`{name, icon?, brightness?, kelvin?, rgb?, scene?}`). |

---

## Development

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server with HMR
npm run dev

# 3. Build production bundle into dist/ha-light-card.js
npm run build
```

---

## License

MIT License. See [LICENSE](LICENSE) for details.
