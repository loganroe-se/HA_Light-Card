import { LitElement, html, css, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCard } from "../../ha/types";
import { fireEvent } from "../../ha/fire-event";
import {
  LightCardConfig, DEFAULT_PRESETS, PresetConfig,
  BrightnessSubpreset, TemperatureSubpreset, ColorSubpreset,
  DEFAULT_BRIGHTNESS_SUBPRESETS, DEFAULT_TEMPERATURE_SUBPRESETS, DEFAULT_COLOR_SUBPRESETS,
  CustomToggleConfig,
  getMainEntityIds,
  resolveDefaultSelectionEntities,
  resolveImageCanvasHeight,
  resolveImageObjectFit
} from "./light-card-config";
import { SliderMode, ColorTextFormat, formatSubtitle } from "../../utils/format";
import { ICONS, renderIcon, resolvePresetIcon, renderSvgIcon } from "../../utils/icons";
import {
  RGB,
  brightnessToPct,
  pctToBrightness,
  kelvinToRgb,
  hsvToRgb,
  rgbToHsv,
  resolvePresetRgb,
  rgbToHex,
  parseColorInput
} from "../../utils/colors";

import "../../shared/action-button";
import "../../shared/slider";
import "../../shared/preset-pill";
import "../../shared/subpreset-bubble";
import { SliderEventDetail } from "../../shared/slider";

@customElement("ha-light-card")
export class HaLightCard extends LitElement implements LovelaceCard {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: LightCardConfig;

  private _hasCustomMinKelvin = false;
  private _hasCustomMaxKelvin = false;

  @state()
  private _mode: SliderMode = "brightness";

  @state()
  private _isDragging = false;

  @state()
  private _liveBrightness: number | null = null;

  @state()
  private _liveKelvin: number | null = null;

  @state()
  private _liveHue: number | null = null;

  @state()
  private _liveRgb: RGB | null = null;

  @state()
  private _liveIsOn: boolean | null = null;

  @state()
  private _localAdaptiveState = false;

  @state()
  private _isEditingSubtitle = false;

  @state()
  private _editBrightness = "";

  @state()
  private _editKelvin = "";

  @state()
  private _editR = "";

  @state()
  private _editG = "";

  @state()
  private _editB = "";

  @state()
  private _editHex = "";

  @state()
  private _lastColorFieldEdited: "rgb" | "hex" = "rgb";

  @state()
  private _selectedEntities: string[] = [];

  @state()
  private _isDragSelecting = false;

  @state()
  private _selectionBox: { x: number; y: number; width: number; height: number } | null = null;

  @state()
  private _imageLightRegions: Record<string, boolean> = {};

  private _clickTimer: any = null;
  private _lastClickedEntity: string | null = null;
  private _blurTimer: any = null;
  private _prevAvailableIdsKey = "";
  private _lastImageAnalysisKey = "";

  private _dragStartPos: { x: number; y: number } | null = null;
  private _dragContainerRect: DOMRect | null = null;
  private _holdTimer: any = null;
  private _hasDragExceededThreshold = false;
  private _suppressClickUntil = 0;
  private _dragInitialSelection: string[] = [];
  private _onWindowPointerMoveBound = (e: PointerEvent) => this._onSelectionPointerMove(e);
  private _onWindowPointerUpBound = (e: PointerEvent) => this._onSelectionPointerUp(e);
  private _optimisticTimer: any = null;

  private _clearLiveState(): void {
    if (this._optimisticTimer) {
      clearTimeout(this._optimisticTimer);
      this._optimisticTimer = null;
    }
    this._liveBrightness = null;
    this._liveKelvin = null;
    this._liveHue = null;
    this._liveRgb = null;
    this._liveIsOn = null;
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._clickTimer) {
      clearTimeout(this._clickTimer);
      this._clickTimer = null;
    }
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
      this._blurTimer = null;
    }
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
    this._clearLiveState();
    window.removeEventListener("pointermove", this._onWindowPointerMoveBound);
    window.removeEventListener("pointerup", this._onWindowPointerUpBound);
    window.removeEventListener("pointercancel", this._onWindowPointerUpBound);
  }

  public setConfig(config: LightCardConfig): void {
    if (!config || config.entity === undefined) {
      throw new Error("Please define an entity (e.g. light.main_bedroom)");
    }

    this._config = {
      name: undefined,
      icon: undefined,
      adaptive_lighting_entity: undefined,
      adaptive_lighting_icon: "mdi:weather-sunny",
      power_icon: "mdi:power",
      brightness_icon: "mdi:brightness-6",
      temperature_icon: "mdi:thermometer",
      color_icon: "mdi:palette",
      show_adaptive_lighting: true,
      show_presets: true,
      preset_max_rows: 3,
      show_all_mode_buttons: false,
      color_format: "rgb",
      editable_subtitle: true,
      min_brightness: 0,
      max_brightness: 100,
      presets: DEFAULT_PRESETS,
      min_kelvin: 2000,
      max_kelvin: 6500,
      ...config
    };

    this._hasCustomMinKelvin = config.min_kelvin !== undefined && Number.isFinite(Number(config.min_kelvin));
    this._hasCustomMaxKelvin = config.max_kelvin !== undefined && Number.isFinite(Number(config.max_kelvin));

    if (config.color_text_format && !this._config.color_format) {
      this._config.color_format = config.color_text_format;
    }

    if (config.enable_subtitle_editing !== undefined && config.editable_subtitle === undefined) {
      this._config.editable_subtitle = config.enable_subtitle_editing;
    }

    if (config.temp_icon && !config.temperature_icon) {
      this._config.temperature_icon = config.temp_icon;
    }

    if (this._config.presets === undefined || this._config.presets === null) {
      this._config.presets = DEFAULT_PRESETS;
    }

    // Default show_subpresets to true
    if (this._config.show_subpresets === undefined) {
      this._config.show_subpresets = true;
    }

    // Default highlight_mode_buttons to true
    if (
      this._config.highlight_mode_buttons === undefined &&
      this._config.mode_button_highlights === undefined
    ) {
      this._config.highlight_mode_buttons = true;
    }

    // Default show_light_selection to false
    if (
      this._config.show_light_selection === undefined &&
      this._config.enable_light_selection === undefined
    ) {
      this._config.show_light_selection = false;
    }

    // Default show_subtitle to true
    if (this._config.show_subtitle === undefined) {
      this._config.show_subtitle = true;
    }

    // Default light_label_mode to "always"
    if (!this._config.light_label_mode) {
      this._config.light_label_mode = "always";
    }

    if (!this._config.custom_toggles && (this._config as any).toggles) {
      this._config.custom_toggles = (this._config as any).toggles;
    }

    this.requestUpdate();
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (!this._config) return;

    const isSelectionEnabled = Boolean(
      this._config.show_light_selection || this._config.enable_light_selection
    );
    if (isSelectionEnabled) {
      const available = this._getAvailableEntities();
      const availableIds = available.map((a) => a.entity);
      const idsKey = availableIds.join(",");
      if (idsKey !== this._prevAvailableIdsKey) {
        this._prevAvailableIdsKey = idsKey;
        this._selectedEntities = [...availableIds];
      } else if (this._selectedEntities.length === 0) {
        this._selectedEntities = [...availableIds];
      } else {
        const validSelected = this._selectedEntities.filter((id) =>
          availableIds.includes(id)
        );
        if (validSelected.length === 0 && availableIds.length > 0) {
          this._selectedEntities = [...availableIds];
        } else if (validSelected.length !== this._selectedEntities.length) {
          this._selectedEntities = validSelected;
        }
      }
    }

    const data = this._getLightData();

    if (changedProperties.has("hass") && !this._isDragging && this._optimisticTimer) {
      let matched = true;
      if (this._liveBrightness !== null) {
        matched =
          this._liveBrightness === 0
            ? !data.isOn
            : data.isOn && Math.abs(data.brightnessPct - this._liveBrightness) <= 2;
      }
      if (matched && this._liveKelvin !== null) {
        matched = data.isOn && Math.abs(data.kelvin - this._liveKelvin) <= 50;
      }
      if (matched && this._liveRgb !== null) {
        matched =
          data.isOn &&
          Math.abs(data.rgb.r - this._liveRgb.r) <= 5 &&
          Math.abs(data.rgb.g - this._liveRgb.g) <= 5 &&
          Math.abs(data.rgb.b - this._liveRgb.b) <= 5;
      }
      if (matched) {
        this._clearLiveState();
      }
    }

    const allowBrightness = this._config.show_brightness !== false;
    const allowTemp =
      data.supportsTemp &&
      this._config.show_temperature !== false &&
      this._config.show_temp !== false;
    const allowColor = data.supportsColor && this._config.show_color !== false;

    const availableModes: SliderMode[] = [];
    if (allowBrightness) availableModes.push("brightness");
    if (allowTemp) availableModes.push("temp");
    if (allowColor) availableModes.push("color");

    if (availableModes.length > 0 && !availableModes.includes(this._mode)) {
      this._mode = availableModes[0];
    }
  }

  private _getImageCanvasHeight(): string | undefined {
    return resolveImageCanvasHeight(
      this._config?.light_selection_image_height ?? this._config?.image_height
    );
  }

  private _getImageObjectFit(): "contain" | "cover" | "fill" {
    return resolveImageObjectFit(
      this._config?.light_selection_image_fit ?? this._config?.image_fit
    );
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    const bgImage = this._getLightSelectionImage();
    const isSelectionEnabled = Boolean(
      this._config?.show_light_selection || this._config?.enable_light_selection
    );
    if (isSelectionEnabled && bgImage) {
      const lights = this._getAvailableEntities();
      const h = this._getImageCanvasHeight() || "";
      const fit = this._getImageObjectFit();
      const analysisKey = `${bgImage}|${h}|${fit}|${lights.map((l) => `${l.entity}:${l.x ?? ""},${l.y ?? ""}`).join(";")}`;
      if (analysisKey !== this._lastImageAnalysisKey) {
        const img = this.shadowRoot?.querySelector<HTMLImageElement>(".light-selection-image");
        if (img && img.complete && img.naturalWidth > 0) {
          this._analyzeSelectionImage(img, analysisKey);
        }
      }
    } else if (this._lastImageAnalysisKey !== "") {
      this._lastImageAnalysisKey = "";
      this._imageLightRegions = {};
    }
  }

  private _analyzeSelectionImage(img: HTMLImageElement, forceKey?: string): void {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const lights = this._getAvailableEntities();
    if (!lights.length) return;

    const bgImage = this._getLightSelectionImage() || img.src;
    const h = this._getImageCanvasHeight();
    const fit = h ? this._getImageObjectFit() : "cover";
    const analysisKey =
      forceKey || `${bgImage}|${h || ""}|${fit}|${lights.map((l) => `${l.entity}:${l.x ?? ""},${l.y ?? ""}`).join(";")}`;
    this._lastImageAnalysisKey = analysisKey;

    try {
      const canvas = document.createElement("canvas");
      const dispW = img.clientWidth || img.naturalWidth;
      const dispH = img.clientHeight || img.naturalHeight;
      const sampleW = 200;
      const sampleH = Math.max(40, Math.min(400, Math.round(sampleW * (dispH / Math.max(1, dispW)))));
      canvas.width = sampleW;
      canvas.height = sampleH;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      ctx.fillStyle = "#18181b";
      ctx.fillRect(0, 0, sampleW, sampleH);

      let drawX = 0;
      let drawY = 0;
      let drawW = sampleW;
      let drawH = sampleH;

      if (h && fit === "contain") {
        const scale = Math.min(sampleW / img.naturalWidth, sampleH / img.naturalHeight);
        drawW = img.naturalWidth * scale;
        drawH = img.naturalHeight * scale;
        drawX = (sampleW - drawW) / 2;
        drawY = (sampleH - drawH) / 2;
      } else if (h && fit === "cover") {
        const scale = Math.max(sampleW / img.naturalWidth, sampleH / img.naturalHeight);
        drawW = img.naturalWidth * scale;
        drawH = img.naturalHeight * scale;
        drawX = (sampleW - drawW) / 2;
        drawY = (sampleH - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      const imgData = ctx.getImageData(0, 0, sampleW, sampleH).data;

      const getRegionLuminance = (x0: number, y0: number, x1: number, y1: number) => {
        const minX = Math.max(0, Math.floor(x0));
        const minY = Math.max(0, Math.floor(y0));
        const maxX = Math.min(sampleW - 1, Math.ceil(x1));
        const maxY = Math.min(sampleH - 1, Math.ceil(y1));
        let totalLum = 0;
        let count = 0;
        for (let y = minY; y <= maxY; y++) {
          for (let x = minX; x <= maxX; x++) {
            const idx = (y * sampleW + x) * 4;
            const r = imgData[idx];
            const g = imgData[idx + 1];
            const b = imgData[idx + 2];
            const a = imgData[idx + 3] / 255;
            const effR = r * a + 24 * (1 - a);
            const effG = g * a + 24 * (1 - a);
            const effB = b * a + 24 * (1 - a);
            totalLum += 0.299 * effR + 0.587 * effG + 0.114 * effB;
            count++;
          }
        }
        return count > 0 ? totalLum / count : 0;
      };

      const nextMap: Record<string, boolean> = {};
      lights.forEach((light, index) => {
        const posX =
          light.x !== undefined
            ? light.x
            : lights.length > 1
            ? Math.round((100 / (lights.length + 1)) * (index + 1))
            : 50;
        const posY = light.y !== undefined ? light.y : 50;

        const cx = (posX / 100) * sampleW;
        const cy = (posY / 100) * sampleH;
        const radiusX = sampleW * 0.1;
        const radiusY = sampleH * 0.12;
        const lum = getRegionLuminance(
          cx - radiusX,
          cy - radiusY * 0.4,
          cx + radiusX,
          cy + radiusY * 1.3
        );
        nextMap[light.entity] = lum > 140;
      });

      this._imageLightRegions = nextMap;
    } catch (_) {
      this._imageLightRegions = {};
    }
  }

  public getCardSize(): number {
    return 2;
  }

  public static async getConfigElement(): Promise<HTMLElement> {
    await import("./light-card-editor");
    return document.createElement("ha-light-card-editor");
  }

  public static getStubConfig(): Record<string, any> {
    return {
      entity: "light.main_bedroom",
      name: "Main Bedroom",
      icon: "mdi:bed",
      show_adaptive_lighting: true,
      adaptive_lighting_icon: "mdi:weather-sunny",
      power_icon: "mdi:power",
      brightness_icon: "mdi:brightness-6",
      temperature_icon: "mdi:thermometer",
      color_icon: "mdi:palette",
      show_all_mode_buttons: false,
      color_format: "rgb",
      editable_subtitle: true,
      preset_max_rows: 3,
      min_brightness: 0,
      max_brightness: 100,
      presets: DEFAULT_PRESETS
    };
  }

  private _getAdaptiveLightingEntity(): string | null {
    if (this._config?.adaptive_lighting_entity) {
      return this._config.adaptive_lighting_entity;
    }
    if (this.hass && this._config?.entity) {
      const mainIds = getMainEntityIds(this._config.entity);
      for (const id of mainIds) {
        const lightName = id.replace(/^[^.]+\./, "");
        const candidates = [
          `switch.adaptive_lighting_${lightName}`,
          `switch.adaptive_lighting_adapt_color_${lightName}`,
          `switch.adaptive_lighting_adapt_brightness_${lightName}`
        ];
        for (const cand of candidates) {
          if (this.hass.states[cand]) return cand;
        }
      }
    }
    return null;
  }

  private _isAdaptiveLightingOn(): boolean {
    const adaptEntity = this._getAdaptiveLightingEntity();
    if (adaptEntity && this.hass?.states[adaptEntity]) {
      return this.hass.states[adaptEntity].state === "on";
    }
    return this._localAdaptiveState;
  }

  private _getAvailableEntities(): {
    entity: string;
    name: string;
    icon?: string;
    showLabel?: boolean;
    x?: number;
    y?: number;
  }[] {
    if (!this._config) return [];
    const rawEntities = this._config.entities;
    if (Array.isArray(rawEntities)) {
      return rawEntities.map((item) => {
        if (typeof item === "string") {
          const stateObj = this.hass?.states[item];
          const friendlyName =
            stateObj?.attributes?.friendly_name ||
            item.replace(/^[^.]+\./, "").replace(/_/g, " ");
          const icon = stateObj?.attributes?.icon;
          return {
            entity: item,
            name: friendlyName,
            icon,
            showLabel: undefined,
            x: undefined,
            y: undefined
          };
        } else {
          const stateObj = this.hass?.states[item.entity];
          const friendlyName =
            item.name ||
            stateObj?.attributes?.friendly_name ||
            item.entity.replace(/^[^.]+\./, "").replace(/_/g, " ");
          const icon = item.icon || stateObj?.attributes?.icon;

          const rawX =
            item.x !== undefined
              ? item.x
              : item.x_position !== undefined
              ? item.x_position
              : item.left;
          const rawY =
            item.y !== undefined
              ? item.y
              : item.y_position !== undefined
              ? item.y_position
              : item.top;

          const parsedX =
            typeof rawX === "number"
              ? rawX
              : typeof rawX === "string" && (rawX as string).trim() !== ""
              ? parseFloat(rawX)
              : undefined;
          const parsedY =
            typeof rawY === "number"
              ? rawY
              : typeof rawY === "string" && (rawY as string).trim() !== ""
              ? parseFloat(rawY)
              : undefined;

          return {
            entity: item.entity,
            name: friendlyName,
            icon,
            showLabel: item.show_label ?? item.showLabel,
            x: parsedX !== undefined && !isNaN(parsedX) ? Math.max(0, Math.min(100, parsedX)) : undefined,
            y: parsedY !== undefined && !isNaN(parsedY) ? Math.max(0, Math.min(100, parsedY)) : undefined
          };
        }
      });
    }

    const defaultIds = resolveDefaultSelectionEntities(this._config.entity, this.hass?.states);
    return defaultIds.map((id) => {
      const stateObj = this.hass?.states[id];
      const friendlyName =
        stateObj?.attributes?.friendly_name ||
        id.replace(/^[^.]+\./, "").replace(/_/g, " ");
      const icon = stateObj?.attributes?.icon;
      return {
        entity: id,
        name: friendlyName,
        icon,
        showLabel: undefined,
        x: undefined,
        y: undefined
      };
    });
  }

  private _getLightSelectionImage(): string | undefined {
    return (
      this._config?.light_selection_image ||
      this._config?.light_image ||
      this._config?.image ||
      this._config?.floorplan_image
    );
  }

  private _getTargetEntityIds(): string[] {
    const isSelectionEnabled = Boolean(
      this._config?.show_light_selection || this._config?.enable_light_selection
    );
    if (isSelectionEnabled && this._selectedEntities.length > 0) {
      return this._selectedEntities;
    }
    return getMainEntityIds(this._config?.entity);
  }

  private _getTargetEntityId(): string | string[] {
    const ids = this._getTargetEntityIds();
    return ids.length === 1 ? ids[0] : ids;
  }

  private _onSelectionPointerDown(e: PointerEvent): void {
    if (e.button !== 0) return;

    const sectionEl = this.shadowRoot?.querySelector(".light-selection-section") as HTMLElement;
    if (!sectionEl) return;

    this._dragContainerRect = sectionEl.getBoundingClientRect();
    this._dragStartPos = { x: e.clientX, y: e.clientY };
    this._hasDragExceededThreshold = false;
    this._dragInitialSelection = [...this._selectedEntities];

    window.removeEventListener("pointermove", this._onWindowPointerMoveBound);
    window.removeEventListener("pointerup", this._onWindowPointerUpBound);
    window.removeEventListener("pointercancel", this._onWindowPointerUpBound);

    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }

    if (e.pointerType === "mouse") {
      window.addEventListener("pointermove", this._onWindowPointerMoveBound);
      window.addEventListener("pointerup", this._onWindowPointerUpBound);
    } else {
      // Mobile / touch: require slight hold (250ms) before drag select engages
      this._holdTimer = setTimeout(() => {
        this._holdTimer = null;
        this._isDragSelecting = true;
        this._hasDragExceededThreshold = true;
        this._suppressClickUntil = Date.now() + 500;
        const shouldVibrate = Boolean(
          this._config?.vibrate ||
          this._config?.enable_vibrate ||
          (this._config as any)?.haptic
        );
        if (shouldVibrate) {
          try {
            if (navigator.vibrate) navigator.vibrate(35);
          } catch (_) {}
        }

        const rect = this._dragContainerRect || sectionEl.getBoundingClientRect();
        const startX = this._dragStartPos ? this._dragStartPos.x - rect.left : 0;
        const startY = this._dragStartPos ? this._dragStartPos.y - rect.top : 0;
        this._selectionBox = { x: startX, y: startY, width: 0, height: 0 };
        if (this._dragStartPos) {
          this._updateDragSelection(this._dragStartPos.x, this._dragStartPos.y, false);
        }
      }, 250);

      window.addEventListener("pointermove", this._onWindowPointerMoveBound);
      window.addEventListener("pointerup", this._onWindowPointerUpBound);
      window.addEventListener("pointercancel", this._onWindowPointerUpBound);
    }
  }

  private _onSelectionPointerMove(e: PointerEvent): void {
    if (!this._dragStartPos) return;

    const distX = e.clientX - this._dragStartPos.x;
    const distY = e.clientY - this._dragStartPos.y;
    const dist = Math.hypot(distX, distY);

    if (!this._isDragSelecting) {
      if (e.pointerType === "mouse") {
        if (dist > 6) {
          this._isDragSelecting = true;
          this._hasDragExceededThreshold = true;
          this._suppressClickUntil = Date.now() + 500;
        }
      } else {
        if (dist > 10 && this._holdTimer) {
          clearTimeout(this._holdTimer);
          this._holdTimer = null;
          return;
        }
      }
    }

    if (this._isDragSelecting) {
      e.preventDefault();
      const sectionEl = this.shadowRoot?.querySelector(".light-selection-section") as HTMLElement;
      if (!sectionEl) return;

      const rect = this._dragContainerRect || sectionEl.getBoundingClientRect();
      const startRelX = Math.max(0, Math.min(rect.width, this._dragStartPos.x - rect.left));
      const startRelY = Math.max(0, Math.min(rect.height, this._dragStartPos.y - rect.top));
      const curRelX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const curRelY = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

      const boxX = Math.min(startRelX, curRelX);
      const boxY = Math.min(startRelY, curRelY);
      const boxW = Math.abs(curRelX - startRelX);
      const boxH = Math.abs(curRelY - startRelY);

      this._selectionBox = { x: boxX, y: boxY, width: boxW, height: boxH };
      this._updateDragSelection(e.clientX, e.clientY, e.shiftKey);
    }
  }

  private _updateDragSelection(curClientX: number, curClientY: number, shiftKey: boolean): void {
    const sectionEl = this.shadowRoot?.querySelector(".light-selection-section") as HTMLElement;
    if (!sectionEl) return;

    const items = sectionEl.querySelectorAll<HTMLElement>(".light-item");
    if (!items || items.length === 0) return;

    const startX = this._dragStartPos ? this._dragStartPos.x : curClientX;
    const startY = this._dragStartPos ? this._dragStartPos.y : curClientY;

    const selLeft = Math.min(startX, curClientX);
    const selTop = Math.min(startY, curClientY);
    const selRight = Math.max(startX, curClientX);
    const selBottom = Math.max(startY, curClientY);

    const intersected: string[] = [];

    items.forEach((item) => {
      const entityId = item.getAttribute("data-entity");
      if (!entityId) return;

      const itemRect = item.getBoundingClientRect();

      const isPointInside =
        (curClientX >= itemRect.left && curClientX <= itemRect.right &&
         curClientY >= itemRect.top && curClientY <= itemRect.bottom) ||
        (startX >= itemRect.left && startX <= itemRect.right &&
         startY >= itemRect.top && startY <= itemRect.bottom);

      const intersects = !(
        selRight < itemRect.left ||
        selLeft > itemRect.right ||
        selBottom < itemRect.top ||
        selTop > itemRect.bottom
      );

      if (intersects || isPointInside) {
        intersected.push(entityId);
      }
    });

    if (intersected.length > 0) {
      if (shiftKey && this._dragInitialSelection.length > 0) {
        const combined = new Set([...this._dragInitialSelection, ...intersected]);
        this._selectedEntities = Array.from(combined);
      } else {
        this._selectedEntities = intersected;
      }
    }
  }

  private _onSelectionPointerUp(e: PointerEvent): void {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }

    window.removeEventListener("pointermove", this._onWindowPointerMoveBound);
    window.removeEventListener("pointerup", this._onWindowPointerUpBound);
    window.removeEventListener("pointercancel", this._onWindowPointerUpBound);

    if (this._isDragSelecting) {
      this._isDragSelecting = false;
      this._selectionBox = null;
      this._suppressClickUntil = Date.now() + 400;
    }

    this._dragStartPos = null;
    this._dragContainerRect = null;
  }

  private _handleLightClick(entityId: string, e: MouseEvent): void {
    if (this._isDragSelecting || Date.now() < this._suppressClickUntil) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    e.stopPropagation();
    if (this._isEditingSubtitle) {
      this._commitSubtitleEdit();
    }

    if (this._clickTimer && this._lastClickedEntity === entityId) {
      // Double click detected on same entity!
      clearTimeout(this._clickTimer);
      this._clickTimer = null;
      this._lastClickedEntity = null;
      this._selectExclusive(entityId);
    } else {
      if (this._clickTimer) {
        clearTimeout(this._clickTimer);
        if (this._lastClickedEntity) {
          this._toggleEntitySelection(this._lastClickedEntity);
        }
      }
      this._lastClickedEntity = entityId;
      this._clickTimer = setTimeout(() => {
        this._toggleEntitySelection(entityId);
        this._clickTimer = null;
        this._lastClickedEntity = null;
      }, 250);
    }
  }

  private _toggleEntitySelection(entityId: string): void {
    const current = new Set(this._selectedEntities);
    if (current.has(entityId)) {
      if (current.size > 1) {
        current.delete(entityId);
      }
    } else {
      current.add(entityId);
    }
    this._selectedEntities = Array.from(current);
  }

  private _selectExclusive(entityId: string): void {
    const available = this._getAvailableEntities().map((e) => e.entity);
    if (
      this._selectedEntities.length === 1 &&
      this._selectedEntities[0] === entityId &&
      available.length > 1
    ) {
      // Double clicking the solo light toggles back to selecting all
      this._selectedEntities = [...available];
    } else {
      this._selectedEntities = [entityId];
    }
  }

  private _getLightData() {
    const isSelectionEnabled = Boolean(
      this._config?.show_light_selection || this._config?.enable_light_selection
    );
    const mainIds = getMainEntityIds(this._config?.entity);
    const activeIds =
      isSelectionEnabled && this._selectedEntities.length > 0
        ? this._selectedEntities
        : mainIds;

    let primaryEntityId = mainIds[0] || "";
    if (isSelectionEnabled && this._selectedEntities.length === 1) {
      primaryEntityId = this._selectedEntities[0];
    } else if (activeIds.length > 0 && this.hass) {
      const onEntity = activeIds.find((id) => this.hass?.states[id]?.state === "on");
      primaryEntityId = onEntity || activeIds[0];
    }

    const stateObj = primaryEntityId ? this.hass?.states[primaryEntityId] : undefined;
    let isOn = stateObj?.state === "on";
    if (activeIds.length > 0 && this.hass) {
      isOn = activeIds.some(
        (id) => this.hass?.states[id]?.state === "on"
      );
    }
    const attrs = stateObj?.attributes || {};

    const rawBrightness = attrs.brightness !== undefined ? attrs.brightness : (isOn ? 255 : 0);
    const brightnessPct = brightnessToPct(rawBrightness);

    const entityMinKelvin =
      attrs.min_color_temp_kelvin ||
      (attrs.max_mireds ? Math.round(1000000 / attrs.max_mireds) : this._config?.min_kelvin || 2000);
    const entityMaxKelvin =
      attrs.max_color_temp_kelvin ||
      (attrs.min_mireds ? Math.round(1000000 / attrs.min_mireds) : this._config?.max_kelvin || 6500);
    const rawMinKelvin =
      this._hasCustomMinKelvin && this._config?.min_kelvin !== undefined
        ? Number(this._config.min_kelvin)
        : entityMinKelvin;
    const rawMaxKelvin =
      this._hasCustomMaxKelvin && this._config?.max_kelvin !== undefined
        ? Number(this._config.max_kelvin)
        : entityMaxKelvin;
    const minKelvin = Math.min(rawMinKelvin, rawMaxKelvin);
    const maxKelvin = Math.max(rawMinKelvin, rawMaxKelvin);

    let kelvin = attrs.color_temp_kelvin;
    if (!kelvin && attrs.color_temp) {
      kelvin = Math.round(1000000 / attrs.color_temp);
    }
    if (!kelvin) kelvin = 2700;
    kelvin = Math.max(minKelvin, Math.min(maxKelvin, kelvin));

    let rgb: RGB = { r: 255, g: 160, b: 64 };
    let hue = 30;

    if (attrs.rgb_color && Array.isArray(attrs.rgb_color) && attrs.rgb_color.length >= 3) {
      rgb = {
        r: Math.round(Number(attrs.rgb_color[0])),
        g: Math.round(Number(attrs.rgb_color[1])),
        b: Math.round(Number(attrs.rgb_color[2]))
      };
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      hue = hsv.h;
    } else if (attrs.hs_color && Array.isArray(attrs.hs_color)) {
      hue = attrs.hs_color[0];
      rgb = hsvToRgb(hue, attrs.hs_color[1] || 100, 100);
    } else {
      rgb = kelvinToRgb(kelvin, minKelvin, maxKelvin);
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      hue = hsv.h;
    }

    const supportedModes = attrs.supported_color_modes || [];
    const supportsTemp =
      supportedModes.includes("color_temp") ||
      attrs.color_temp_kelvin !== undefined ||
      attrs.color_temp !== undefined ||
      supportedModes.length === 0;
    const supportsColor =
      supportedModes.includes("hs") ||
      supportedModes.includes("rgb") ||
      supportedModes.includes("rgbw") ||
      supportedModes.includes("rgbww") ||
      supportedModes.includes("xy") ||
      supportedModes.length === 0;

    return {
      primaryEntityId,
      stateObj,
      isOn,
      attrs,
      brightnessPct,
      minKelvin,
      maxKelvin,
      kelvin,
      rgb,
      hue,
      supportsTemp,
      supportsColor
    };
  }

  private _togglePower(e: Event): void {
    e.stopPropagation();
    if (!this.hass || !this._config) return;
    this._isDragging = false;
    this._clearLiveState();
    this.hass.callService("light", "toggle", {
      entity_id: this._getTargetEntityId()
    });
  }

  private _toggleAdaptiveLighting(e: Event): void {
    e.stopPropagation();
    const adaptEntity = this._getAdaptiveLightingEntity();
    if (adaptEntity && this.hass) {
      this.hass.callService("switch", "toggle", {
        entity_id: adaptEntity
      });
    } else {
      this._localAdaptiveState = !this._localAdaptiveState;
    }
  }

  private _getCustomToggles(): CustomToggleConfig[] {
    return (this._config?.custom_toggles || (this._config as any)?.toggles || []) as CustomToggleConfig[];
  }

  private _isCustomToggleActive(toggle: CustomToggleConfig): boolean {
    if (!this.hass) return false;
    const raw = toggle.entities || toggle.entity || toggle.entity_id;
    const targetEntities: string[] = Array.isArray(raw)
      ? raw
      : typeof raw === "string" && raw
      ? [raw]
      : [];

    if (targetEntities.length === 0) return false;

    return targetEntities.some((id) => this.hass?.states[id]?.state === "on");
  }

  private _handleCustomToggle(toggle: CustomToggleConfig, e: Event): void {
    e.stopPropagation();
    if (!this.hass) return;

    if (toggle.service) {
      const parts = toggle.service.split(".");
      if (parts.length === 2) {
        this.hass.callService(parts[0], parts[1], toggle.service_data || {});
        return;
      }
    }

    const raw = toggle.entities || toggle.entity || toggle.entity_id;
    const targetEntities: string[] = Array.isArray(raw)
      ? raw
      : typeof raw === "string" && raw
      ? [raw]
      : [];

    if (targetEntities.length > 0) {
      const allLights = targetEntities.every((id) => id.startsWith("light."));
      const domain = allLights ? "light" : "homeassistant";
      this.hass.callService(domain, "toggle", {
        entity_id: targetEntities.length === 1 ? targetEntities[0] : targetEntities
      });
    }
  }

  private _renderCustomToggles() {
    const toggles = this._getCustomToggles();
    if (!toggles || toggles.length === 0) return null;

    return html`
      ${toggles.map((toggle) => {
        const isActive = this._isCustomToggleActive(toggle);
        const raw = toggle.entities || toggle.entity || toggle.entity_id;
        const targetEntities = Array.isArray(raw) ? raw : raw ? [raw] : [];
        const tooltip =
          toggle.title ||
          toggle.name ||
          (targetEntities.length > 0 ? targetEntities.join(", ") : "Toggle");
        const iconName = toggle.icon || "mdi:lightbulb-outline";

        let customBg = "";
        let customBorder = "";
        let customColor = "";
        let customShadow = "";

        if (toggle.color && isActive) {
          customColor = toggle.color;
          customBorder = toggle.color;
          customShadow = `0 0 12px ${toggle.color}`;
        }

        return html`
          <ha-light-action-button
            variant="toggle"
            ?active=${isActive}
            .customBg=${customBg}
            .customBorder=${customBorder}
            .customColor=${customColor}
            .customShadow=${customShadow}
            @click=${(e: Event) => this._handleCustomToggle(toggle, e)}
            title="${tooltip}"
          >
            ${renderIcon(iconName, ICONS.lightbulb, 20)}
          </ha-light-action-button>
        `;
      })}
    `;
  }

  private _fireMoreInfo(e: Event): void {
    e.stopPropagation();
    if (!this._config) return;
    const targetIds = this._getTargetEntityIds();
    const mainIds = getMainEntityIds(this._config.entity);
    const entityId = targetIds[0] || mainIds[0];
    if (entityId) {
      fireEvent(this, "hass-more-info", { entityId });
    }
  }

  private _setMode(mode: SliderMode): void {
    this._mode = mode;
  }

  private _isSubtitleEditable(): boolean {
    if (this._config?.editable_subtitle !== undefined) {
      return this._config.editable_subtitle;
    }
    if ((this._config as any)?.enable_subtitle_editing !== undefined) {
      return (this._config as any).enable_subtitle_editing;
    }
    return true;
  }

  private async _startSubtitleEdit(e: Event): Promise<void> {
    e.stopPropagation();
    if (!this._isSubtitleEditable()) return;

    const data = this._getLightData();
    const colorFormat = (this._config?.color_format || this._config?.color_text_format || "rgb") as ColorTextFormat;

    const currentBrightness =
      this._isDragging && this._liveBrightness !== null ? this._liveBrightness : data.brightnessPct;
    const currentKelvin =
      this._isDragging && this._liveKelvin !== null ? this._liveKelvin : data.kelvin;
    const currentRgb =
      this._isDragging && this._liveRgb !== null ? this._liveRgb : data.rgb;

    this._editBrightness = String(Math.round(currentBrightness));
    this._editKelvin = String(Math.round(currentKelvin));
    this._editR = String(currentRgb.r);
    this._editG = String(currentRgb.g);
    this._editB = String(currentRgb.b);
    this._editHex = rgbToHex(currentRgb.r, currentRgb.g, currentRgb.b).replace("#", "");
    this._lastColorFieldEdited = colorFormat === "hex" ? "hex" : "rgb";

    this._isEditingSubtitle = true;
    await this.updateComplete;

    const selector =
      this._mode === "color" && colorFormat === "hex"
        ? ".hex-input"
        : this._mode === "color"
        ? ".rgb-input"
        : ".subtitle-input";

    const inputEl = this.shadowRoot?.querySelector<HTMLInputElement>(selector);
    if (inputEl) {
      inputEl.focus();
      inputEl.select();
    }
  }

  private _onBrightnessInput(e: Event): void {
    const val = (e.target as HTMLInputElement).value;
    this._editBrightness = val.replace(/[^0-9]/g, "");
  }

  private _onKelvinInput(e: Event): void {
    const val = (e.target as HTMLInputElement).value;
    this._editKelvin = val.replace(/[^0-9]/g, "");
  }

  private _onRgbFieldInput(channel: "r" | "g" | "b", e: Event): void {
    const target = e.target as HTMLInputElement;
    const val = target.value.replace(/[^0-9]/g, "").slice(0, 3);
    target.value = val;
    if (channel === "r") this._editR = val;
    else if (channel === "g") this._editG = val;
    else if (channel === "b") this._editB = val;

    this._lastColorFieldEdited = "rgb";

    // Auto sync hex when in both mode
    const r = Math.min(255, parseInt(this._editR || "0", 10));
    const g = Math.min(255, parseInt(this._editG || "0", 10));
    const b = Math.min(255, parseInt(this._editB || "0", 10));
    this._editHex = rgbToHex(r, g, b).replace("#", "");
  }

  private _onHexInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    const val = target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6).toUpperCase();
    target.value = val;
    this._editHex = val;
    this._lastColorFieldEdited = "hex";

    if (val.length === 6 || val.length === 3) {
      const parsed = parseColorInput("#" + val);
      if (parsed) {
        this._editR = String(parsed.r);
        this._editG = String(parsed.g);
        this._editB = String(parsed.b);
      }
    }
  }

  private _onInputFocus(): void {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
      this._blurTimer = null;
    }
  }

  private _onInputBlur(): void {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
    }
    this._blurTimer = setTimeout(() => {
      const active = this.shadowRoot?.activeElement;
      if (!active || !active.classList.contains("subtitle-input")) {
        this._commitSubtitleEdit();
      }
    }, 150);
  }

  private _onSubtitleKeyDown(e: KeyboardEvent): void {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (this._blurTimer) clearTimeout(this._blurTimer);
      this._commitSubtitleEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      if (this._blurTimer) clearTimeout(this._blurTimer);
      this._cancelSubtitleEdit();
    }
  }

  private _onNumericKeyDown(e: KeyboardEvent): void {
    if (["e", "E", "+", "-", "."].includes(e.key)) {
      e.preventDefault();
      return;
    }
    this._onSubtitleKeyDown(e);
  }

  private _commitSubtitleEdit(): void {
    if (!this._isEditingSubtitle || !this.hass || !this._config) {
      this._isEditingSubtitle = false;
      return;
    }

    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
      this._blurTimer = null;
    }

    this._isEditingSubtitle = false;
    this._clearLiveState();
    const data = this._getLightData();

    if (this._mode === "brightness") {
      const val = parseInt(this._editBrightness, 10);
      if (!isNaN(val)) {
        const minB = this._config.min_brightness ?? 0;
        const maxB = this._config.max_brightness ?? 100;
        const clamped = Math.max(minB, Math.min(maxB, val));
        if (clamped === 0) {
          this.hass.callService("light", "turn_off", { entity_id: this._getTargetEntityId() });
        } else {
          this.hass.callService("light", "turn_on", {
            entity_id: this._getTargetEntityId(),
            brightness_pct: clamped
          });
        }
      }
    } else if (this._mode === "temp") {
      const val = parseInt(this._editKelvin, 10);
      if (!isNaN(val)) {
        const clamped = Math.max(data.minKelvin, Math.min(data.maxKelvin, val));
        this.hass.callService("light", "turn_on", {
          entity_id: this._getTargetEntityId(),
          color_temp_kelvin: clamped
        });
      }
    } else if (this._mode === "color") {
      const colorFormat = (this._config.color_format || this._config.color_text_format || "rgb") as ColorTextFormat;
      let rgb: RGB | null = null;

      if (colorFormat === "hex") {
        rgb = parseColorInput("#" + this._editHex);
      } else if (colorFormat === "both" && this._lastColorFieldEdited === "hex") {
        rgb = parseColorInput("#" + this._editHex);
      } else {
        const r = Math.max(0, Math.min(255, parseInt(this._editR || "0", 10)));
        const g = Math.max(0, Math.min(255, parseInt(this._editG || "0", 10)));
        const b = Math.max(0, Math.min(255, parseInt(this._editB || "0", 10)));
        rgb = { r, g, b };
      }

      if (rgb) {
        this.hass.callService("light", "turn_on", {
          entity_id: this._getTargetEntityId(),
          rgb_color: [rgb.r, rgb.g, rgb.b]
        });
      }
    }
  }

  private _cancelSubtitleEdit(): void {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
      this._blurTimer = null;
    }
    this._isEditingSubtitle = false;
  }

  private _onSliderInput(e: CustomEvent<SliderEventDetail>): void {
    const { ratio, mode } = e.detail;
    if (this._optimisticTimer) {
      clearTimeout(this._optimisticTimer);
      this._optimisticTimer = null;
    }
    this._isDragging = true;
    this._mode = mode;
    const data = this._getLightData();

    if (mode === "brightness") {
      const minB = this._config?.min_brightness ?? 0;
      const maxB = this._config?.max_brightness ?? 100;
      const pct = Math.round(minB + ratio * (maxB - minB));
      this._liveBrightness = pct;
      this._liveIsOn = pct > 0;
    } else if (mode === "temp") {
      const kelvin = Math.round(data.minKelvin + ratio * (data.maxKelvin - data.minKelvin));
      this._liveKelvin = kelvin;
      this._liveIsOn = true;
    } else if (mode === "color") {
      const hue = Math.round(ratio * 360) % 360;
      const rgb = hsvToRgb(hue, 100, 100);
      this._liveHue = hue;
      this._liveRgb = rgb;
      this._liveIsOn = true;
    }
  }

  private _onSliderChange(e: CustomEvent<SliderEventDetail>): void {
    const { ratio, mode } = e.detail;
    this._isDragging = false;
    this._mode = mode;
    const data = this._getLightData();

    if (this._optimisticTimer) {
      clearTimeout(this._optimisticTimer);
      this._optimisticTimer = null;
    }

    if (mode === "brightness") {
      const minB = this._config?.min_brightness ?? 0;
      const maxB = this._config?.max_brightness ?? 100;
      const pct = Math.round(minB + ratio * (maxB - minB));
      this._liveBrightness = pct;
      this._liveIsOn = pct > 0;

      if (this.hass && this._config) {
        if (pct === 0) {
          this.hass.callService("light", "turn_off", { entity_id: this._getTargetEntityId() });
        } else {
          this.hass.callService("light", "turn_on", {
            entity_id: this._getTargetEntityId(),
            brightness_pct: pct
          });
        }
      }
    } else if (mode === "temp") {
      const kelvin = Math.round(data.minKelvin + ratio * (data.maxKelvin - data.minKelvin));
      this._liveKelvin = kelvin;
      this._liveIsOn = true;
      if (this.hass && this._config) {
        this.hass.callService("light", "turn_on", {
          entity_id: this._getTargetEntityId(),
          color_temp_kelvin: kelvin
        });
      }
    } else if (mode === "color") {
      const hue = Math.round(ratio * 360) % 360;
      const rgb = hsvToRgb(hue, 100, 100);
      this._liveHue = hue;
      this._liveRgb = rgb;
      this._liveIsOn = true;
      if (this.hass && this._config) {
        this.hass.callService("light", "turn_on", {
          entity_id: this._getTargetEntityId(),
          rgb_color: [rgb.r, rgb.g, rgb.b]
        });
      }
    }

    // Keep the released value held briefly until Home Assistant finishes applying the update
    this._optimisticTimer = setTimeout(() => {
      this._clearLiveState();
    }, 1500);
  }

  private _applyPreset(preset: PresetConfig): void {
    if (!this.hass || !this._config) return;

    this._isDragging = false;
    this._clearLiveState();

    if (preset.scene) {
      this.hass.callService("scene", "turn_on", { entity_id: preset.scene });
      return;
    }

    if (preset.service) {
      const parts = preset.service.split(".");
      if (parts.length === 2) {
        this.hass.callService(parts[0], parts[1], preset.service_data || { entity_id: this._getTargetEntityId() });
        return;
      }
    }

    const serviceData: Record<string, any> = {
      entity_id: this._getTargetEntityId()
    };

    const presetRgb = resolvePresetRgb(preset);

    if (preset.brightness !== undefined) {
      serviceData.brightness_pct = preset.brightness;
    }

    if (preset.kelvin !== undefined) {
      serviceData.color_temp_kelvin = preset.kelvin;
    } else if (presetRgb) {
      serviceData.rgb_color = [presetRgb.r, presetRgb.g, presetRgb.b];
    }

    if (preset.effect) {
      serviceData.effect = preset.effect;
    }

    this.hass.callService("light", "turn_on", serviceData);
  }

  private _isPresetActive(preset: PresetConfig, data: any): boolean {
    if (!data.isOn) return false;

    const presetRgb = resolvePresetRgb(preset);
    let hasAnyField = false;

    if (preset.brightness !== undefined) {
      hasAnyField = true;
      if (data.brightnessPct !== preset.brightness) {
        return false;
      }
    }

    if (preset.kelvin !== undefined) {
      hasAnyField = true;
      if (data.kelvin !== preset.kelvin) {
        return false;
      }
    } else if (presetRgb) {
      hasAnyField = true;
      if (
        !data.rgb ||
        data.rgb.r !== presetRgb.r ||
        data.rgb.g !== presetRgb.g ||
        data.rgb.b !== presetRgb.b
      ) {
        return false;
      }
    }

    return hasAnyField;
  }

  // ─── Subpreset helpers ───────────────────────────────────────────────────

  private _normalizeBrightnessSubpresets(): { value: number; label: string }[] {
    const cfg = this._config!;
    const raw: (number | BrightnessSubpreset)[] =
      cfg.brightness_presets ??
      cfg.subpresets?.brightness ??
      DEFAULT_BRIGHTNESS_SUBPRESETS;
    return raw.map((item) => {
      if (typeof item === "number") return { value: item, label: `${item}%` };
      return { value: item.value, label: item.label ?? `${item.value}%` };
    });
  }

  private _normalizeTempSubpresets(): { kelvin: number; label: string }[] {
    const cfg = this._config!;
    const raw: (number | TemperatureSubpreset)[] =
      cfg.temperature_presets ??
      cfg.temp_presets ??
      cfg.subpresets?.temperature ??
      cfg.subpresets?.temp ??
      DEFAULT_TEMPERATURE_SUBPRESETS;
    return raw.map((item) => {
      if (typeof item === "number") return { kelvin: item, label: `${item}K` };
      return { kelvin: item.kelvin, label: item.label ?? `${item.kelvin}K` };
    });
  }

  private _normalizeColorSubpresets(): { color: string; label: string }[] {
    const cfg = this._config!;
    const raw: (string | ColorSubpreset)[] =
      cfg.color_presets ??
      cfg.subpresets?.color ??
      DEFAULT_COLOR_SUBPRESETS;
    return raw.map((item) => {
      if (typeof item === "string") return { color: item, label: item };
      return { color: item.color, label: item.label ?? item.color };
    });
  }

  private _applyBrightnessSubpreset(value: number): void {
    if (!this.hass || !this._config) return;
    this._isDragging = false;
    this._clearLiveState();
    if (value === 0) {
      this.hass.callService("light", "turn_off", { entity_id: this._getTargetEntityId() });
    } else {
      this.hass.callService("light", "turn_on", {
        entity_id: this._getTargetEntityId(),
        brightness_pct: value
      });
    }
  }

  private _applyTempSubpreset(kelvin: number): void {
    if (!this.hass || !this._config) return;
    this._isDragging = false;
    this._clearLiveState();
    this.hass.callService("light", "turn_on", {
      entity_id: this._getTargetEntityId(),
      color_temp_kelvin: kelvin
    });
  }

  private _applyColorSubpreset(hexColor: string): void {
    if (!this.hass || !this._config) return;
    this._isDragging = false;
    this._clearLiveState();
    const rgb = parseColorInput(hexColor);
    if (rgb) {
      this.hass.callService("light", "turn_on", {
        entity_id: this._getTargetEntityId(),
        rgb_color: [rgb.r, rgb.g, rgb.b]
      });
    }
  }

  private _isBrightnessSubpresetActive(value: number, data: any): boolean {
    if (value === 0) return !data.isOn;
    return data.isOn && data.brightnessPct === value;
  }

  private _isTempSubpresetActive(kelvin: number, data: any): boolean {
    return data.isOn && data.kelvin === kelvin;
  }

  private _isColorSubpresetActive(hexColor: string, data: any): boolean {
    if (!data.isOn) return false;
    const rgb = parseColorInput(hexColor);
    if (!rgb || !data.rgb) return false;
    return data.rgb.r === rgb.r && data.rgb.g === rgb.g && data.rgb.b === rgb.b;
  }

  static override styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      --card-bg: var(--ha-card-background, var(--card-background-color, #18181b));
      --card-radius: var(--ha-card-border-radius, 22px);
      --primary-text: var(--primary-text-color, #ffffff);
      --secondary-text: var(--secondary-text-color, #9ca3af);
    }

    .card-container {
      background-color: var(--card-bg);
      border-radius: var(--card-radius);
      padding: 18px 20px 20px 20px;
      border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, rgba(255, 255, 255, 0.06));
      box-shadow: var(--ha-card-box-shadow, 0 8px 24px rgba(0, 0, 0, 0.3));
      font-family: var(--ha-card-header-font-family, inherit, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: var(--primary-text);
      box-sizing: border-box;
    }

    .light-selection-section {
      display: flex;
      align-items: flex-start;
      position: relative;
      gap: 18px;
      overflow-x: auto;
      scrollbar-width: none;
      margin: -18px -20px 18px -20px;
      padding: 16px 20px 14px 20px;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, rgba(255, 255, 255, 0.08));
      border-top-left-radius: var(--card-radius);
      border-top-right-radius: var(--card-radius);
      box-sizing: border-box;
      touch-action: pan-x pan-y;
    }

    .light-selection-section.is-drag-selecting {
      touch-action: none !important;
      user-select: none;
      -webkit-user-select: none;
      cursor: crosshair;
    }

    .selection-marquee {
      position: absolute;
      background: rgba(254, 209, 102, 0.18);
      border: 1.5px solid rgba(254, 209, 102, 0.85);
      border-radius: 6px;
      box-shadow: 0 0 16px rgba(254, 209, 102, 0.35);
      pointer-events: none;
      z-index: 20;
    }

    .light-selection-section.has-image {
      display: block;
      position: relative;
      margin: -18px -20px 18px -20px;
      padding: 0;
      overflow: hidden;
      line-height: 0;
      background: #18181b;
      border-bottom: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, rgba(255, 255, 255, 0.08));
      border-top-left-radius: var(--card-radius);
      border-top-right-radius: var(--card-radius);
      box-sizing: border-box;
    }

    .light-selection-image {
      width: 100%;
      height: auto;
      display: block;
      pointer-events: none;
      user-select: none;
      object-fit: cover;
      max-height: var(--light-selection-image-max-height, 500px);
    }

    .light-selection-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .light-selection-overlay .light-item {
      position: absolute;
      pointer-events: auto;
      transform: translate(-50%, -26px);
      z-index: 2;
    }

    .light-selection-section::-webkit-scrollbar {
      display: none;
    }

    .light-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      outline: none;
      flex-shrink: 0;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .light-item.unselected {
      opacity: 0.38;
      filter: grayscale(0.5);
    }

    .light-item.unselected:hover {
      opacity: 0.85;
      filter: none;
    }

    .light-item.selected {
      opacity: 1;
      filter: none;
    }

    .light-circle-btn {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-sizing: border-box;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      --light-active-color: #fed166;
    }

    .light-item.light-on .light-circle-btn {
      background-color: var(--light-active-color);
      box-shadow: 0 0 18px rgba(254, 209, 102, 0.45), 0 0 32px rgba(254, 209, 102, 0.20);
      color: #ffffff;
    }

    .light-item.light-off .light-circle-btn {
      background-color: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #71717a;
    }

    .light-item.selected.light-off .light-circle-btn {
      border: 2px solid rgba(245, 158, 11, 0.8);
      box-shadow: 0 0 12px rgba(245, 158, 11, 0.3);
      color: #e4e4e7;
    }

    .light-item.selected.light-on .light-circle-btn {
      box-shadow: 0 0 24px rgba(254, 209, 102, 0.65), 0 0 42px rgba(254, 209, 102, 0.3);
    }

    .light-item:hover .light-circle-btn {
      transform: scale(1.06);
    }

    .light-circle-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
    }

    .light-item.light-on .light-circle-icon svg,
    .light-item.light-on .light-circle-icon ha-icon {
      filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.25));
    }

    .light-label-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 22px;
    }

    .light-label-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 3px 8px;
      border-radius: 6px;
      background: #27272a;
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #ffffff;
      font-size: 11px;
      font-weight: 600;
      line-height: 1.2;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
      transition: opacity 0.2s ease, transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
    }

    .light-item.selected .light-label-badge {
      background: #35353c;
      border-color: rgba(255, 255, 255, 0.30);
      color: #ffffff;
    }

    .light-item.bg-is-light .light-label-badge {
      background: rgba(24, 24, 27, 0.88);
      border-color: rgba(0, 0, 0, 0.25);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.30);
    }

    .light-item.bg-is-light.selected .light-label-badge {
      background: #18181b;
      border-color: rgba(245, 158, 11, 0.85);
      color: #ffffff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.42);
    }

    .light-item.bg-is-light.light-off .light-circle-btn {
      background-color: rgba(24, 24, 27, 0.72);
      border: 1px solid rgba(0, 0, 0, 0.25);
      color: #d4d4d8;
    }

    .light-item.bg-is-light.selected.light-off .light-circle-btn {
      background-color: rgba(24, 24, 27, 0.88);
      border: 2px solid rgba(245, 158, 11, 0.9);
      color: #ffffff;
    }

    /* Label Modes: always, hover, selected, never */
    .light-item.mode-always .light-label-badge {
      opacity: 1;
      transform: translateY(0);
    }

    .light-item.mode-hover .light-label-badge {
      opacity: 0;
      transform: translateY(-3px);
      pointer-events: none;
    }

    .light-item.mode-hover:hover .light-label-badge {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .light-item.mode-selected.unselected .light-label-badge {
      opacity: 0;
      transform: translateY(-3px);
      pointer-events: none;
    }

    .light-item.mode-selected.selected .light-label-badge {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 14px;
      min-width: 0;
      flex: 1;
    }

    .main-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      flex-shrink: 0;
      cursor: pointer;
    }

    .header-text-group {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 0;
    }

    .title {
      font-size: 19px;
      font-weight: 700;
      color: var(--primary-text);
      letter-spacing: -0.015em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.25;
    }

    .subtitle {
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.25;
      margin-top: 2px;
      transition: color 0.15s ease;
    }

    .subtitle.editable {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      user-select: none;
      border-radius: 4px;
      padding: 1px 4px;
      margin-left: -4px;
      transition: background 0.15s ease, color 0.15s ease;
      width: fit-content;
      max-width: 100%;
    }

    .subtitle.editable:hover {
      color: var(--primary-text);
      background: rgba(255, 255, 255, 0.08);
    }

    .subtitle-edit-icon {
      display: inline-flex;
      align-items: center;
      opacity: 0;
      transition: opacity 0.15s ease;
      color: var(--secondary-text);
      flex-shrink: 0;
    }

    .subtitle.editable:hover .subtitle-edit-icon {
      opacity: 0.8;
      color: var(--primary-text);
    }

    .subtitle-edit-container {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      margin-top: 1px;
    }

    .unit-prefix,
    .unit-suffix,
    .edit-separator {
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text);
      user-select: none;
      line-height: 1;
    }

    .edit-separator {
      margin: 0 4px;
      opacity: 0.5;
    }

    .subtitle-input {
      font-family: inherit;
      font-size: 12px;
      font-weight: 600;
      color: var(--primary-text);
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 4px;
      padding: 1px 3px;
      outline: none;
      text-align: center;
      line-height: 18px;
      height: 22px;
      box-sizing: border-box;
      transition: border-color 0.15s ease, background 0.15s ease;
    }

    .subtitle-input:focus {
      border-color: #f59e0b;
      background: rgba(255, 255, 255, 0.18);
    }

    .subtitle-input[type="number"]::-webkit-outer-spin-button,
    .subtitle-input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .subtitle-input[type="number"] {
      -moz-appearance: textfield;
      appearance: textfield;
    }

    .brightness-input {
      width: 38px;
    }

    .kelvin-input {
      width: 50px;
    }

    .rgb-input {
      width: 35px;
    }

    .hex-input {
      width: 62px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      margin-left: 14px;
    }

    .slider-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 18px;
      width: 100%;
    }

    .slider-row ha-light-slider {
      flex: 1;
      min-width: 0;
      height: 48px;
    }

    .sliders-stack {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-top: 18px;
      width: 100%;
    }

    .slider-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
    }

    .slider-group ha-light-slider {
      display: block;
      width: 100%;
      height: 48px;
      flex: 0 0 48px;
    }

    .slider-group .subpresets-row {
      margin-top: 2px;
    }

    .mode-buttons {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    /* Multi-row expanding & vertically scrollable presets */
    .presets-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-top: 14px;
      overflow-y: auto;
      overflow-x: hidden;
      max-height: calc(var(--preset-max-rows, 3) * 40px + 4px);
      padding: 2px 2px;
      box-sizing: border-box;
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
    }

    .presets-row::-webkit-scrollbar {
      width: 4px;
    }

    .presets-row::-webkit-scrollbar-track {
      background: transparent;
    }

    .presets-row::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }

    .presets-row::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.35);
    }

    /* Subpresets row */
    .subpresets-row {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      gap: 6px;
      margin-top: 10px;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 2px 1px;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .subpresets-row::-webkit-scrollbar {
      display: none;
    }
  `;

  private _renderSubtitleEditor(colorFormat: ColorTextFormat) {
    if (this._mode === "brightness") {
      return html`
        <div class="subtitle-edit-container" @click=${(e: Event) => e.stopPropagation()}>
          <input
            type="number"
            inputmode="numeric"
            min="0"
            max="100"
            class="subtitle-input brightness-input"
            .value=${this._editBrightness}
            @input=${this._onBrightnessInput}
            @focus=${this._onInputFocus}
            @blur=${this._onInputBlur}
            @keydown=${this._onNumericKeyDown}
            placeholder="0"
          />
          <span class="unit-suffix">%</span>
        </div>
      `;
    }

    if (this._mode === "temp") {
      return html`
        <div class="subtitle-edit-container" @click=${(e: Event) => e.stopPropagation()}>
          <input
            type="number"
            inputmode="numeric"
            min="1000"
            max="10000"
            class="subtitle-input kelvin-input"
            .value=${this._editKelvin}
            @input=${this._onKelvinInput}
            @focus=${this._onInputFocus}
            @blur=${this._onInputBlur}
            @keydown=${this._onNumericKeyDown}
            placeholder="2700"
          />
          <span class="unit-suffix">K</span>
        </div>
      `;
    }

    if (this._mode === "color") {
      const showRgb = colorFormat === "rgb" || colorFormat === "both";
      const showHex = colorFormat === "hex" || colorFormat === "both";

      return html`
        <div class="subtitle-edit-container" @click=${(e: Event) => e.stopPropagation()}>
          ${showRgb
            ? html`
                <span class="unit-prefix">RGB:</span>
                <input
                  type="number"
                  inputmode="numeric"
                  min="0"
                  max="255"
                  class="subtitle-input rgb-input"
                  .value=${this._editR}
                  @input=${(e: Event) => this._onRgbFieldInput("r", e)}
                  @focus=${this._onInputFocus}
                  @blur=${this._onInputBlur}
                  @keydown=${this._onNumericKeyDown}
                  placeholder="R"
                  title="Red (0-255)"
                />
                <input
                  type="number"
                  inputmode="numeric"
                  min="0"
                  max="255"
                  class="subtitle-input rgb-input"
                  .value=${this._editG}
                  @input=${(e: Event) => this._onRgbFieldInput("g", e)}
                  @focus=${this._onInputFocus}
                  @blur=${this._onInputBlur}
                  @keydown=${this._onNumericKeyDown}
                  placeholder="G"
                  title="Green (0-255)"
                />
                <input
                  type="number"
                  inputmode="numeric"
                  min="0"
                  max="255"
                  class="subtitle-input rgb-input"
                  .value=${this._editB}
                  @input=${(e: Event) => this._onRgbFieldInput("b", e)}
                  @focus=${this._onInputFocus}
                  @blur=${this._onInputBlur}
                  @keydown=${this._onNumericKeyDown}
                  placeholder="B"
                  title="Blue (0-255)"
                />
              `
            : null}
          ${showRgb && showHex ? html`<span class="edit-separator">|</span>` : null}
          ${showHex
            ? html`
                <span class="unit-prefix">#</span>
                <input
                  type="text"
                  class="subtitle-input hex-input"
                  .value=${this._editHex}
                  @input=${this._onHexInput}
                  @focus=${this._onInputFocus}
                  @blur=${this._onInputBlur}
                  @keydown=${this._onSubtitleKeyDown}
                  maxlength="6"
                  placeholder="FFA657"
                  title="Hex (e.g. FFA657)"
                />
              `
            : null}
        </div>
      `;
    }

    return html``;
  }

  private _renderSubpresetsForMode(mode: SliderMode, data: ReturnType<typeof this._getLightData>) {
    if (this._config?.show_subpresets === false) return null;

    if (mode === "brightness") {
      const items = this._normalizeBrightnessSubpresets();
      if (!items.length) return null;
      return html`
        <div class="subpresets-row">
          ${items.map(
            (item) => html`
              <ha-light-subpreset-bubble
                variant="brightness"
                .label=${item.label}
                .brightnessValue=${item.value}
                ?active=${this._isBrightnessSubpresetActive(item.value, data)}
                @click=${() => this._applyBrightnessSubpreset(item.value)}
              ></ha-light-subpreset-bubble>
            `
          )}
        </div>
      `;
    }

    if (mode === "temp") {
      const items = this._normalizeTempSubpresets();
      if (!items.length) return null;
      return html`
        <div class="subpresets-row">
          ${items.map((item) => {
            const rgb = kelvinToRgb(item.kelvin, data.minKelvin, data.maxKelvin);
            const color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
            return html`
              <ha-light-subpreset-bubble
                variant="temp"
                .label=${item.label}
                .color=${color}
                ?active=${this._isTempSubpresetActive(item.kelvin, data)}
                @click=${() => this._applyTempSubpreset(item.kelvin)}
              ></ha-light-subpreset-bubble>
            `;
          })}
        </div>
      `;
    }

    if (mode === "color") {
      const items = this._normalizeColorSubpresets();
      if (!items.length) return null;
      return html`
        <div class="subpresets-row">
          ${items.map(
            (item) => html`
              <ha-light-subpreset-bubble
                variant="color"
                .label=${item.label}
                .color=${item.color}
                ?active=${this._isColorSubpresetActive(item.color, data)}
                @click=${() => this._applyColorSubpreset(item.color)}
              ></ha-light-subpreset-bubble>
            `
          )}
        </div>
      `;
    }

    return null;
  }

  private _renderLightSelectionBar() {
    const isSelectionEnabled = Boolean(
      this._config?.show_light_selection || this._config?.enable_light_selection
    );
    if (!isSelectionEnabled) return null;

    const lights = this._getAvailableEntities();
    if (!lights || lights.length === 0) return null;

    const labelMode = this._config?.light_label_mode || "always";
    const bgImage = this._getLightSelectionImage();

    if (bgImage) {
      const canvasHeight = this._getImageCanvasHeight();
      const imageFit = this._getImageObjectFit();
      const containerStyle = canvasHeight ? `height: ${canvasHeight};` : "";
      const imgStyle = canvasHeight
        ? `height: 100%; max-height: none; object-fit: ${imageFit};`
        : "";

      return html`
        <div
          class="light-selection-section has-image ${this._isDragSelecting ? "is-drag-selecting" : ""}"
          style="${containerStyle}"
          @pointerdown=${this._onSelectionPointerDown}
        >
          <img
            class="light-selection-image"
            src="${bgImage}"
            style="${imgStyle}"
            alt="Light selection floorplan"
            @load=${(e: Event) => this._analyzeSelectionImage(e.target as HTMLImageElement)}
          />
          <div class="light-selection-overlay">
            ${lights.map((light, index) => {
              const posX =
                light.x !== undefined
                  ? light.x
                  : lights.length > 1
                  ? Math.round((100 / (lights.length + 1)) * (index + 1))
                  : 50;
              const posY = light.y !== undefined ? light.y : 50;

              return this._renderLightItem(light, labelMode, true, posX, posY);
            })}
          </div>
          ${this._selectionBox && (this._selectionBox.width > 2 || this._selectionBox.height > 2)
            ? html`
                <div
                  class="selection-marquee"
                  style="left: ${this._selectionBox.x}px; top: ${this._selectionBox.y}px; width: ${this._selectionBox.width}px; height: ${this._selectionBox.height}px;"
                ></div>
              `
            : null}
        </div>
      `;
    }

    return html`
      <div
        class="light-selection-section ${this._isDragSelecting ? "is-drag-selecting" : ""}"
        @pointerdown=${this._onSelectionPointerDown}
      >
        ${lights.map((light) => this._renderLightItem(light, labelMode, false))}
        ${this._selectionBox && (this._selectionBox.width > 2 || this._selectionBox.height > 2)
          ? html`
              <div
                class="selection-marquee"
                style="left: ${this._selectionBox.x}px; top: ${this._selectionBox.y}px; width: ${this._selectionBox.width}px; height: ${this._selectionBox.height}px;"
              ></div>
            `
          : null}
      </div>
    `;
  }

  private _renderLightItem(
    light: {
      entity: string;
      name: string;
      icon?: string;
      showLabel?: boolean;
      x?: number;
      y?: number;
    },
    labelMode: "always" | "hover" | "selected" | "never",
    isOverlay: boolean,
    posX?: number,
    posY?: number
  ) {
    const isSelected = this._selectedEntities.includes(light.entity);
    const stateObj = this.hass?.states[light.entity];
    const isOn = stateObj?.state === "on";
    const attrs = stateObj?.attributes || {};

    let lightColor = "#fed166";
    if (attrs.rgb_color && Array.isArray(attrs.rgb_color) && attrs.rgb_color.length >= 3) {
      lightColor = `rgb(${attrs.rgb_color[0]}, ${attrs.rgb_color[1]}, ${attrs.rgb_color[2]})`;
    }

    let showLabelBadge = labelMode !== "never";
    if (light.showLabel !== undefined) {
      showLabelBadge = light.showLabel;
    }

    const overlayStyle =
      isOverlay && posX !== undefined && posY !== undefined
        ? `left: ${posX}%; top: ${posY}%;`
        : "";

    const isLightBg = isOverlay && Boolean(this._imageLightRegions[light.entity]);

    return html`
      <div
        class="light-item ${isSelected ? "selected" : "unselected"} ${isOn ? "light-on" : "light-off"} ${isLightBg ? "bg-is-light" : ""} mode-${labelMode}"
        data-entity="${light.entity}"
        style="${overlayStyle}"
        @click=${(e: MouseEvent) => this._handleLightClick(light.entity, e)}
        @dblclick=${(e: MouseEvent) => e.preventDefault()}
        title="${light.name} (${isOn ? "On" : "Off"})${isSelected ? " • Selected" : ""} (Click to toggle, double-click to solo)"
      >
        <div
          class="light-circle-btn"
          style="${isOn ? `--light-active-color: ${lightColor};` : ""}"
        >
          <span class="light-circle-icon">
            ${renderIcon(light.icon, ICONS.lightbulb, 28)}
          </span>
        </div>
        ${showLabelBadge
          ? html`
              <div class="light-label-slot">
                <span class="light-label-badge">${light.name}</span>
              </div>
            `
          : null}
      </div>
    `;
  }

  protected override render() {
    if (!this._config) return html``;

    const data = this._getLightData();
    const isAdaptiveOn = this._isAdaptiveLightingOn();
    const isEditable = this._isSubtitleEditable();

    const minB = this._config.min_brightness ?? 0;
    const maxB = this._config.max_brightness ?? 100;
    const maxRows = Math.max(1, this._config.preset_max_rows ?? 3);

    const effectiveIsOn = this._liveIsOn !== null ? this._liveIsOn : data.isOn;
    const currentBrightness =
      this._liveBrightness !== null ? this._liveBrightness : data.brightnessPct;
    const currentKelvin =
      this._liveKelvin !== null ? this._liveKelvin : data.kelvin;
    const currentHue =
      this._liveHue !== null ? this._liveHue : data.hue;
    const currentRgb =
      this._liveRgb !== null ? this._liveRgb : data.rgb;

    const currentData = {
      ...data,
      isOn: effectiveIsOn,
      brightnessPct: currentBrightness,
      kelvin: currentKelvin,
      rgb: currentRgb
    };

    const mainIds = getMainEntityIds(this._config.entity);
    const firstMainId = mainIds[0] || "";
    const title =
      this._config.name ||
      (mainIds.length === 1 ? this.hass?.states[firstMainId]?.attributes?.friendly_name : undefined) ||
      data.attrs.friendly_name ||
      data.primaryEntityId?.replace(/^[^.]+\./, "").replace(/_/g, " ") ||
      firstMainId.replace(/^[^.]+\./, "").replace(/_/g, " ") ||
      "Light";

    const colorFormat = (this._config.color_format || this._config.color_text_format || "rgb") as ColorTextFormat;

    const allowBrightness = this._config.show_brightness !== false;
    const allowTemp =
      data.supportsTemp &&
      this._config.show_temperature !== false &&
      this._config.show_temp !== false;
    const allowColor = data.supportsColor && this._config.show_color !== false;

    const availableModes: SliderMode[] = [];
    if (allowBrightness) availableModes.push("brightness");
    if (allowTemp) availableModes.push("temp");
    if (allowColor) availableModes.push("color");

    if (availableModes.length === 0) {
      availableModes.push("brightness");
    }

    const effectiveMode = availableModes.includes(this._mode) ? this._mode : availableModes[0];

    const subtitleText = formatSubtitle(
      effectiveMode,
      effectiveIsOn,
      this._isDragging,
      currentBrightness,
      currentKelvin,
      currentRgb,
      colorFormat
    );

    const iconPath = this._config.icon || data.attrs.icon || "mdi:bed";
    const presetsList =
      this._config.show_presets !== false && Array.isArray(this._config.presets)
        ? this._config.presets
        : [];

    const showAll = this._config.show_all_mode_buttons === true;
    const showAllSliders = this._config.show_all_sliders === true || (this._config as any).all_sliders === true;

    // Only show mode buttons if there is more than 1 mode available
    const hasMultipleModes = availableModes.length > 1;
    const showBrightnessBtn = hasMultipleModes && allowBrightness && (showAll ? true : effectiveMode !== "brightness");
    const showTempBtn = hasMultipleModes && allowTemp && (showAll ? true : effectiveMode !== "temp");
    const showColorBtn = hasMultipleModes && allowColor && (showAll ? true : effectiveMode !== "color");
    const hasAnyModeButtons = showBrightnessBtn || showTempBtn || showColorBtn;

    // Brightness slider fill color: fixed warm amber/peach when on, dark amber/brown when off (does not change based on light color)
    const fillColor = effectiveIsOn ? "#f8a555" : "#4a3c30";

    const shouldHighlightModeButtons =
      this._config.highlight_mode_buttons !== false &&
      this._config.mode_button_highlights !== false;

    // Replicate brightness level on the Brightness swap button
    let brightnessBtnBg = "";
    let brightnessBtnBorder = "";
    let brightnessBtnColor = "";
    let brightnessBtnShadow = "";
    if (shouldHighlightModeButtons && effectiveIsOn) {
      const bRatio = Math.max(0.01, Math.min(1, currentBrightness / 100));
      brightnessBtnBg = `rgba(245, 158, 11, ${0.08 + bRatio * 0.32})`;
      brightnessBtnBorder = `rgba(245, 158, 11, ${0.20 + bRatio * 0.45})`;
      brightnessBtnColor = bRatio > 0.35 ? "#ffffff" : "rgba(255, 235, 200, 0.85)";
      brightnessBtnShadow = `0 0 ${Math.round(bRatio * 12)}px rgba(245, 158, 11, ${bRatio * 0.5})`;
    }

    // Replicate temperature color on the Temperature swap button
    let tempBtnBg = "";
    let tempBtnBorder = "";
    let tempBtnColor = "";
    let tempBtnShadow = "";
    if (shouldHighlightModeButtons && effectiveIsOn && data.supportsTemp) {
      const tempRgb = kelvinToRgb(currentKelvin, data.minKelvin, data.maxKelvin);
      tempBtnBg = `rgba(${tempRgb.r}, ${tempRgb.g}, ${tempRgb.b}, 0.20)`;
      tempBtnBorder = `rgba(${tempRgb.r}, ${tempRgb.g}, ${tempRgb.b}, 0.45)`;
      tempBtnColor = `rgb(${tempRgb.r}, ${tempRgb.g}, ${tempRgb.b})`;
      tempBtnShadow = `0 0 10px rgba(${tempRgb.r}, ${tempRgb.g}, ${tempRgb.b}, 0.35)`;
    }

    // Replicate active color on the Color swap button
    let colorBtnBg = "";
    let colorBtnBorder = "";
    let colorBtnColor = "";
    let colorBtnShadow = "";
    if (shouldHighlightModeButtons && effectiveIsOn && data.supportsColor) {
      const activeRgb = currentRgb || data.rgb || { r: 255, g: 160, b: 64 };
      colorBtnBg = `rgba(${activeRgb.r}, ${activeRgb.g}, ${activeRgb.b}, 0.22)`;
      colorBtnBorder = `rgba(${activeRgb.r}, ${activeRgb.g}, ${activeRgb.b}, 0.50)`;
      colorBtnColor = `rgb(${activeRgb.r}, ${activeRgb.g}, ${activeRgb.b})`;
      colorBtnShadow = `0 0 12px rgba(${activeRgb.r}, ${activeRgb.g}, ${activeRgb.b}, 0.40)`;
    }

    return html`
      <div class="card-container">
        ${this._renderLightSelectionBar()}
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <div
              class="main-icon-wrap"
              style="color: ${effectiveIsOn ? 'var(--primary-text)' : 'var(--secondary-text)'};"
              @click=${this._fireMoreInfo}
            >
              ${renderIcon(iconPath, ICONS.bed, 28)}
            </div>
            <div class="header-text-group">
              <div class="title">${title}</div>
              ${this._config.show_subtitle !== false
                ? this._isEditingSubtitle
                  ? this._renderSubtitleEditor(colorFormat)
                  : isEditable
                  ? html`
                      <div
                        class="subtitle editable"
                        @click=${this._startSubtitleEdit}
                        title="Click to edit value"
                      >
                        <span>${subtitleText}</span>
                        <span class="subtitle-edit-icon">${renderSvgIcon(ICONS.pencil, 12)}</span>
                      </div>
                    `
                  : html`
                      <div class="subtitle">${subtitleText}</div>
                    `
                : null}
            </div>
          </div>

          <div class="header-actions">
            ${this._renderCustomToggles()}
            ${this._config.show_adaptive_lighting
              ? html`
                  <ha-light-action-button
                    variant="adaptive"
                    ?active=${isAdaptiveOn}
                    @click=${this._toggleAdaptiveLighting}
                    title="Adaptive Lighting"
                  >
                    ${renderIcon(this._config.adaptive_lighting_icon, ICONS.sun, 22)}
                  </ha-light-action-button>
                `
              : null}
            <ha-light-action-button
              variant="power"
              ?active=${effectiveIsOn}
              @click=${this._togglePower}
              title="Power Toggle"
            >
              ${renderIcon(this._config.power_icon, ICONS.power, 22)}
            </ha-light-action-button>
          </div>
        </div>

        <!-- Slider Controls -->
        ${showAllSliders
          ? html`
              <!-- Stacked Sliders (All enabled sliders on top of one another with subpresets under each) -->
              <div class="sliders-stack">
                ${allowBrightness
                  ? html`
                      <div class="slider-group">
                        <ha-light-slider
                          .mode=${"brightness"}
                          .brightnessPct=${currentBrightness}
                          .minBrightness=${minB}
                          .maxBrightness=${maxB}
                          .kelvin=${currentKelvin}
                          .minKelvin=${data.minKelvin}
                          .maxKelvin=${data.maxKelvin}
                          .hue=${currentHue}
                          .isOn=${effectiveIsOn}
                          .fillColor=${fillColor}
                          @slider-input=${this._onSliderInput}
                          @slider-change=${this._onSliderChange}
                        ></ha-light-slider>
                        ${this._renderSubpresetsForMode("brightness", currentData)}
                      </div>
                    `
                  : null}
                ${allowTemp
                  ? html`
                      <div class="slider-group">
                        <ha-light-slider
                          .mode=${"temp"}
                          .brightnessPct=${currentBrightness}
                          .minBrightness=${minB}
                          .maxBrightness=${maxB}
                          .kelvin=${currentKelvin}
                          .minKelvin=${data.minKelvin}
                          .maxKelvin=${data.maxKelvin}
                          .hue=${currentHue}
                          .isOn=${effectiveIsOn}
                          .fillColor=${fillColor}
                          @slider-input=${this._onSliderInput}
                          @slider-change=${this._onSliderChange}
                        ></ha-light-slider>
                        ${this._renderSubpresetsForMode("temp", currentData)}
                      </div>
                    `
                  : null}
                ${allowColor
                  ? html`
                      <div class="slider-group">
                        <ha-light-slider
                          .mode=${"color"}
                          .brightnessPct=${currentBrightness}
                          .minBrightness=${minB}
                          .maxBrightness=${maxB}
                          .kelvin=${currentKelvin}
                          .minKelvin=${data.minKelvin}
                          .maxKelvin=${data.maxKelvin}
                          .hue=${currentHue}
                          .isOn=${effectiveIsOn}
                          .fillColor=${fillColor}
                          @slider-input=${this._onSliderInput}
                          @slider-change=${this._onSliderChange}
                        ></ha-light-slider>
                        ${this._renderSubpresetsForMode("color", currentData)}
                      </div>
                    `
                  : null}
              </div>
            `
          : html`
              <!-- Slider and Mode Controls (Single slider with quick-swap buttons) -->
              <div class="slider-row">
                <ha-light-slider
                  .mode=${effectiveMode}
                  .brightnessPct=${currentBrightness}
                  .minBrightness=${minB}
                  .maxBrightness=${maxB}
                  .kelvin=${currentKelvin}
                  .minKelvin=${data.minKelvin}
                  .maxKelvin=${data.maxKelvin}
                  .hue=${currentHue}
                  .isOn=${effectiveIsOn}
                  .fillColor=${fillColor}
                  @slider-input=${this._onSliderInput}
                  @slider-change=${this._onSliderChange}
                ></ha-light-slider>

                ${hasAnyModeButtons
                  ? html`
                      <div class="mode-buttons">
                        ${showBrightnessBtn
                          ? html`
                              <ha-light-action-button
                                variant="mode"
                                ?active=${effectiveMode === "brightness"}
                                .customBg=${brightnessBtnBg}
                                .customBorder=${brightnessBtnBorder}
                                .customColor=${brightnessBtnColor}
                                .customShadow=${brightnessBtnShadow}
                                @click=${() => this._setMode("brightness")}
                                title="Brightness"
                              >
                                ${renderIcon(this._config.brightness_icon, ICONS.brightness, 20)}
                              </ha-light-action-button>
                            `
                          : null}
                        ${showTempBtn
                          ? html`
                              <ha-light-action-button
                                variant="mode"
                                ?active=${effectiveMode === "temp"}
                                .customBg=${tempBtnBg}
                                .customBorder=${tempBtnBorder}
                                .customColor=${tempBtnColor}
                                .customShadow=${tempBtnShadow}
                                @click=${() => this._setMode("temp")}
                                title="Color Temperature"
                              >
                                ${renderIcon(this._config.temperature_icon, ICONS.thermometer, 20)}
                              </ha-light-action-button>
                            `
                          : null}
                        ${showColorBtn
                          ? html`
                              <ha-light-action-button
                                variant="mode"
                                ?active=${effectiveMode === "color"}
                                .customBg=${colorBtnBg}
                                .customBorder=${colorBtnBorder}
                                .customColor=${colorBtnColor}
                                .customShadow=${colorBtnShadow}
                                @click=${() => this._setMode("color")}
                                title="Color"
                              >
                                ${renderIcon(this._config.color_icon, ICONS.palette, 20)}
                              </ha-light-action-button>
                            `
                          : null}
                      </div>
                    `
                  : null}
              </div>

              <!-- Subpresets Row for Active Single Mode -->
              ${this._renderSubpresetsForMode(effectiveMode, currentData)}
            `}

        <!-- Presets Row (Multi-row expandable up to preset_max_rows, vertically scrollable past that) -->
        ${presetsList.length > 0
          ? html`
              <div class="presets-row" style="--preset-max-rows: ${maxRows};">
                ${presetsList.map((preset) => {
                  const isActive = this._isPresetActive(preset, currentData);
                  const presetRgb = resolvePresetRgb(preset);
                  const fallbackKelvinRgb =
                    preset.kelvin !== undefined
                      ? kelvinToRgb(preset.kelvin, currentData.minKelvin, currentData.maxKelvin)
                      : null;
                  const iconColor =
                    preset.icon_color ||
                    (typeof preset.color === "string" && !presetRgb
                      ? preset.color
                      : presetRgb
                      ? `rgb(${presetRgb.r}, ${presetRgb.g}, ${presetRgb.b})`
                      : fallbackKelvinRgb
                      ? `rgb(${fallbackKelvinRgb.r}, ${fallbackKelvinRgb.g}, ${fallbackKelvinRgb.b})`
                      : "#f5b72e");

                  return html`
                    <ha-light-preset-pill
                      .name=${preset.name}
                      .icon=${preset.icon || "mdi:palette"}
                      .color=${iconColor}
                      ?active=${isActive}
                      @click=${() => this._applyPreset(preset)}
                    ></ha-light-preset-pill>
                  `;
                })}
              </div>
            `
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-light-card": HaLightCard;
  }
}
