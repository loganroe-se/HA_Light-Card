import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardEditor } from "../../ha/types";
import { fireEvent } from "../../ha/fire-event";
import { LightCardConfig, CustomToggleConfig } from "./light-card-config";

@customElement("ha-light-card-editor")
export class HaLightCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: LightCardConfig;

  @state()
  private _newEntityInput = "";

  @state()
  private _newToggleEntities = "";

  @state()
  private _newToggleIcon = "";

  @state()
  private _newToggleName = "";

  public setConfig(config: LightCardConfig): void {
    this._config = config;
  }

  private _valueChanged(ev: CustomEvent | Event): void {
    if (!this._config || !this.hass) return;
    const target = ev.target as any;
    const configValue = target.configValue;
    let value = target.type === "checkbox" ? target.checked : ((ev as CustomEvent).detail?.value ?? target.value);

    if (target.type === "number") {
      value = value === "" ? undefined : Number(value);
    }

    if (this._config[configValue] === value) return;

    const newConfig = {
      ...this._config,
      [configValue]: value
    };

    if (value === "" || value === undefined) {
      delete (newConfig as any)[configValue];
    }

    this._config = newConfig;
    fireEvent(this, "config-changed", { config: this._config });
  }

  private _moveEntity(index: number, direction: -1 | 1): void {
    if (!this._config || !Array.isArray(this._config.entities)) return;
    const list = [...this._config.entities];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    this._config = {
      ...this._config,
      entities: list
    };
    fireEvent(this, "config-changed", { config: this._config });
    this.requestUpdate();
  }

  private _updateEntityCoord(index: number, axis: "x" | "y", e: Event): void {
    if (!this._config || !Array.isArray(this._config.entities)) return;
    const val = (e.target as HTMLInputElement).value.trim();
    const numVal = val === "" ? undefined : Math.max(0, Math.min(100, Number(val)));
    const list = [...this._config.entities];
    const current = list[index];
    if (typeof current === "string") {
      list[index] = {
        entity: current,
        [axis]: numVal
      };
    } else {
      const updated = {
        ...current,
        [axis]: numVal
      };
      if (numVal === undefined) {
        delete (updated as any)[axis];
      }
      list[index] = updated;
    }
    this._config = {
      ...this._config,
      entities: list
    };
    fireEvent(this, "config-changed", { config: this._config });
    this.requestUpdate();
  }

  private _removeEntity(index: number): void {
    if (!this._config || !Array.isArray(this._config.entities)) return;
    const list = this._config.entities.filter((_, i) => i !== index);
    this._config = {
      ...this._config,
      entities: list.length > 0 ? list : undefined
    };
    fireEvent(this, "config-changed", { config: this._config });
    this.requestUpdate();
  }

  private _addEntity(): void {
    if (!this._config) return;
    const trimmed = this._newEntityInput.trim();
    if (!trimmed) return;
    const current = Array.isArray(this._config.entities) ? [...this._config.entities] : [];
    current.push(trimmed);
    this._config = {
      ...this._config,
      entities: current
    };
    this._newEntityInput = "";
    fireEvent(this, "config-changed", { config: this._config });
    this.requestUpdate();
  }

  private _addCustomToggle(): void {
    if (!this._config) return;
    const entitiesStr = this._newToggleEntities.trim();
    if (!entitiesStr) return;

    const entities = entitiesStr
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const newToggle: CustomToggleConfig = {
      entities: entities.length > 1 ? entities : undefined,
      entity: entities.length === 1 ? entities[0] : undefined,
      icon: this._newToggleIcon.trim() || undefined,
      name: this._newToggleName.trim() || undefined
    };

    const current = Array.isArray(this._config.custom_toggles)
      ? [...this._config.custom_toggles]
      : [];
    current.push(newToggle);

    this._config = {
      ...this._config,
      custom_toggles: current
    };
    this._newToggleEntities = "";
    this._newToggleIcon = "";
    this._newToggleName = "";
    fireEvent(this, "config-changed", { config: this._config });
    this.requestUpdate();
  }

  private _removeCustomToggle(index: number): void {
    if (!this._config || !Array.isArray(this._config.custom_toggles)) return;
    const list = this._config.custom_toggles.filter((_, i) => i !== index);
    this._config = {
      ...this._config,
      custom_toggles: list.length > 0 ? list : undefined
    };
    fireEvent(this, "config-changed", { config: this._config });
    this.requestUpdate();
  }

  private _onEntitiesListInput(ev: Event): void {
    if (!this._config) return;
    const val = (ev.target as HTMLInputElement).value;
    const entities = val
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const newConfig = {
      ...this._config,
      entities: entities.length > 0 ? entities : undefined
    };
    if (entities.length === 0) {
      delete newConfig.entities;
    }
    this._config = newConfig;
    fireEvent(this, "config-changed", { config: this._config });
  }

  static override styles = css`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 12px 0;
    }

    .form-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-row label {
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color, #ffffff);
    }

    .form-row input[type="text"],
    .form-row input[type="number"],
    .form-row select {
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      background: var(--card-background-color, #1c1c1e);
      color: var(--primary-text-color, #ffffff);
      font-size: 14px;
      outline: none;
    }

    .form-row select option {
      background: #1c1c1e;
      color: #ffffff;
    }

    .form-row input:focus,
    .form-row select:focus {
      border-color: var(--primary-color, #f59e0b);
    }

    .form-row-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .section-title {
      font-size: 14px;
      font-weight: 700;
      color: #f59e0b;
      margin-top: 6px;
      padding-bottom: 4px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 0;
    }

    .switch-row span {
      font-size: 14px;
      color: var(--primary-text-color, #ffffff);
    }

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: #f59e0b;
      cursor: pointer;
    }

    .entity-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 6px;
    }

    .entity-item-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      gap: 10px;
    }

    .entity-item-info {
      display: flex;
      flex-direction: column;
      min-width: 0;
      flex: 1;
    }

    .entity-item-name {
      font-size: 13px;
      font-weight: 600;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-item-id {
      font-size: 11px;
      color: var(--secondary-text-color, #9ca3af);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-item-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }

    .entity-coord-inputs {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .coord-field {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 11px;
      font-weight: 500;
      color: var(--secondary-text-color, #9ca3af);
    }

    .coord-field input {
      width: 44px;
      padding: 3px 4px;
      font-size: 11px;
      text-align: center;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: #27272a;
      color: #ffffff;
      outline: none;
    }

    .coord-field input:focus {
      border-color: #f59e0b;
    }

    .icon-btn {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      line-height: 1;
      padding: 0;
      transition: background 0.15s ease, opacity 0.15s ease;
    }

    .icon-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.16);
      border-color: rgba(255, 255, 255, 0.24);
    }

    .icon-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .icon-btn.delete-btn:hover:not(:disabled) {
      background: rgba(239, 68, 68, 0.3);
      border-color: rgba(239, 68, 68, 0.6);
      color: #ef4444;
    }

    .add-entity-row {
      display: flex;
      gap: 8px;
      margin-top: 4px;
    }

    .add-entity-row input {
      flex: 1;
      min-width: 0;
    }

    .add-btn {
      padding: 0 16px;
      background: #f59e0b;
      color: #18181b;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: background 0.15s ease;
      white-space: nowrap;
    }

    .add-btn:hover {
      background: #d97706;
    }
  `;

  protected override render() {
    if (!this.hass || !this._config) return html``;

    return html`
      <div class="card-config">
        <!-- Entity Picker / Input -->
        <div class="form-row">
          <label>Entity (Required)</label>
          <input
            type="text"
            .value=${this._config.entity || ""}
            .configValue=${"entity"}
            @input=${this._valueChanged}
            placeholder="light.main_bedroom"
          />
        </div>

        <!-- Custom Title -->
        <div class="form-row">
          <label>Name (Optional)</label>
          <input
            type="text"
            .value=${this._config.name || ""}
            .configValue=${"name"}
            @input=${this._valueChanged}
            placeholder="Main Bedroom"
          />
        </div>

        <!-- Main Header Icon -->
        <div class="form-row">
          <label>Main Header Icon (Optional)</label>
          <input
            type="text"
            .value=${this._config.icon || ""}
            .configValue=${"icon"}
            @input=${this._valueChanged}
            placeholder="mdi:bed"
          />
        </div>

        <!-- Section: Custom Button Icons -->
        <div class="section-title">Button Icons</div>

        <div class="form-row-grid">
          <div class="form-row">
            <label>Adaptive Lighting Icon</label>
            <input
              type="text"
              .value=${this._config.adaptive_lighting_icon || ""}
              .configValue=${"adaptive_lighting_icon"}
              @input=${this._valueChanged}
              placeholder="mdi:weather-sunny"
            />
          </div>
          <div class="form-row">
            <label>Power Button Icon</label>
            <input
              type="text"
              .value=${this._config.power_icon || ""}
              .configValue=${"power_icon"}
              @input=${this._valueChanged}
              placeholder="mdi:power"
            />
          </div>
        </div>

        <div class="form-row-grid">
          <div class="form-row">
            <label>Brightness Button Icon</label>
            <input
              type="text"
              .value=${this._config.brightness_icon || ""}
              .configValue=${"brightness_icon"}
              @input=${this._valueChanged}
              placeholder="mdi:brightness-6"
            />
          </div>
          <div class="form-row">
            <label>Temperature Button Icon</label>
            <input
              type="text"
              .value=${this._config.temperature_icon || this._config.temp_icon || ""}
              .configValue=${"temperature_icon"}
              @input=${this._valueChanged}
              placeholder="mdi:thermometer"
            />
          </div>
        </div>

        <div class="form-row">
          <label>Color Button Icon</label>
          <input
            type="text"
            .value=${this._config.color_icon || ""}
            .configValue=${"color_icon"}
            @input=${this._valueChanged}
            placeholder="mdi:palette"
          />
        </div>

        <!-- Section: Settings -->
        <div class="section-title">Settings & Limits</div>

        <!-- Color Text Format -->
        <div class="form-row">
          <label>Color Subtitle Format</label>
          <select
            .value=${this._config.color_format || this._config.color_text_format || "rgb"}
            .configValue=${"color_format"}
            @change=${this._valueChanged}
          >
            <option value="rgb">RGB (RGB: 255, 166, 87)</option>
            <option value="hex">Hex (#FFA657)</option>
            <option value="both">RGB & Hex (RGB: 255, 166, 87 | #FFA657)</option>
          </select>
        </div>

        <!-- Min & Max Brightness -->
        <div class="form-row-grid">
          <div class="form-row">
            <label>Min Brightness (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              .value=${this._config.min_brightness !== undefined ? String(this._config.min_brightness) : "0"}
              .configValue=${"min_brightness"}
              @input=${this._valueChanged}
              placeholder="0"
            />
          </div>
          <div class="form-row">
            <label>Max Brightness (%)</label>
            <input
              type="number"
              min="1"
              max="100"
              .value=${this._config.max_brightness !== undefined ? String(this._config.max_brightness) : "100"}
              .configValue=${"max_brightness"}
              @input=${this._valueChanged}
              placeholder="100"
            />
          </div>
        </div>

        <!-- Max Preset Rows -->
        <div class="form-row">
          <label>Max Preset Rows (Default: 3)</label>
          <input
            type="number"
            min="1"
            max="10"
            .value=${this._config.preset_max_rows !== undefined ? String(this._config.preset_max_rows) : "3"}
            .configValue=${"preset_max_rows"}
            @input=${this._valueChanged}
            placeholder="3"
          />
        </div>

        <!-- Adaptive Lighting Entity -->
        <div class="form-row">
          <label>Adaptive Lighting Entity (Optional - auto-detects if blank)</label>
          <input
            type="text"
            .value=${this._config.adaptive_lighting_entity || ""}
            .configValue=${"adaptive_lighting_entity"}
            @input=${this._valueChanged}
            placeholder="switch.adaptive_lighting_main_bedroom"
          />
        </div>

        <!-- Mode Enables: Brightness / Temp / Color -->
        <div class="switch-row">
          <div>
            <span>Enable Brightness Mode</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Show brightness slider and control (default: on)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_brightness !== false}
            .configValue=${"show_brightness"}
            @change=${this._valueChanged}
          />
        </div>

        <div class="switch-row">
          <div>
            <span>Enable Color Temperature Mode</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Show Kelvin temperature slider and control (default: on)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_temperature !== false && this._config.show_temp !== false}
            .configValue=${"show_temperature"}
            @change=${this._valueChanged}
          />
        </div>

        <div class="switch-row">
          <div>
            <span>Enable Color Mode</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Show RGB/HSV color slider and control (default: on)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_color !== false}
            .configValue=${"show_color"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Show All Mode Buttons -->
        <div class="switch-row">
          <div>
            <span>Show All Mode Buttons</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              If off, hides the active mode's button (default)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_all_mode_buttons === true}
            .configValue=${"show_all_mode_buttons"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Show All Sliders (Stacked) -->
        <div class="switch-row">
          <div>
            <span>Show All Sliders (Stacked)</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Stack all enabled sliders vertically on top of one another simultaneously (default: off)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_all_sliders === true || (this._config as any).all_sliders === true}
            .configValue=${"show_all_sliders"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Show Subtitle -->
        <div class="switch-row">
          <div>
            <span>Show Subtitle</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Show or hide the state subtitle text under the title (default: on)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_subtitle !== false}
            .configValue=${"show_subtitle"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Editable Subtitle -->
        <div class="switch-row">
          <div>
            <span>Editable Subtitle</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Click subtitle to type exact values (default: on)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.editable_subtitle !== false}
            .configValue=${"editable_subtitle"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Adaptive Lighting Button -->
        <div class="switch-row">
          <span>Show Adaptive Lighting Button</span>
          <input
            type="checkbox"
            .checked=${this._config.show_adaptive_lighting !== false}
            .configValue=${"show_adaptive_lighting"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Presets Row -->
        <div class="switch-row">
          <span>Show Presets / Scenes Row</span>
          <input
            type="checkbox"
            .checked=${this._config.show_presets !== false}
            .configValue=${"show_presets"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Subpresets Row -->
        <div class="switch-row">
          <div>
            <span>Show Subpresets</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Quick-access bubbles for brightness / temp / color (default: on)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_subpresets !== false}
            .configValue=${"show_subpresets"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Highlight Mode Buttons -->
        <div class="switch-row">
          <div>
            <span>Highlight Mode Buttons</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Replicate brightness, temp color, and active color on mode buttons (default: on)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.highlight_mode_buttons !== false && this._config.mode_button_highlights !== false}
            .configValue=${"highlight_mode_buttons"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Section: Multi-Light Group Selection -->
        <div class="section-title">Light Group Selection</div>

        <div class="switch-row">
          <div>
            <span>Show Light Selection Bar</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Display interactive pills above the card to select/control individual or multiple lights (default: off)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_light_selection === true || this._config.enable_light_selection === true}
            .configValue=${"show_light_selection"}
            @change=${this._valueChanged}
          />
        </div>

        <div class="form-row">
          <label>Light Labels Mode</label>
          <select
            .value=${this._config.light_label_mode || "always"}
            .configValue=${"light_label_mode"}
            @change=${this._valueChanged}
          >
            <option value="always">Always Show Labels</option>
            <option value="hover">Show Labels On Hover</option>
            <option value="selected">Show Labels Only When Selected</option>
            <option value="never">Never Show Labels (Icons Only)</option>
          </select>
        </div>

        <div class="form-row">
          <label>Light Selection Image (Optional Floorplan / Room Overlay)</label>
          <input
            type="text"
            .value=${this._config.light_selection_image || this._config.light_image || this._config.image || ""}
            .configValue=${"light_selection_image"}
            @change=${this._valueChanged}
            placeholder="/local/floorplan.png or https://..."
          />
          <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
            When an image is provided, lights are placed directly on the image at their X/Y positions (0 - 100%).
          </div>
        </div>

        <div class="switch-row">
          <div>
            <span>Vibrate on Drag Select</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Trigger a brief haptic vibration on mobile devices when hold-to-drag selection activates (default: off)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.vibrate === true || (this._config as any).enable_vibrate === true || (this._config as any).haptic === true}
            .configValue=${"vibrate"}
            @change=${this._valueChanged}
          />
        </div>

        <div class="form-row">
          <label>Configured Lights (Re-order & Manage)</label>
          <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af); margin-bottom: 4px;">
            Use the ▲ and ▼ buttons to re-order lights. Set X% and Y% coordinates (0 - 100%) to position them on the image.
          </div>

          <div class="entity-list">
            ${Array.isArray(this._config.entities) && this._config.entities.length > 0
              ? this._config.entities.map((item, idx) => {
                  const entityId = typeof item === "string" ? item : item.entity;
                  const customName = typeof item === "object" ? item.name : undefined;
                  const coordX = typeof item === "object" ? (item.x ?? (item as any).x_position ?? (item as any).left) : undefined;
                  const coordY = typeof item === "object" ? (item.y ?? (item as any).y_position ?? (item as any).top) : undefined;
                  const stateObj = this.hass?.states[entityId];
                  const displayName = customName || stateObj?.attributes?.friendly_name || entityId;
                  const isFirst = idx === 0;
                  const isLast = idx === (this._config!.entities!.length - 1);

                  return html`
                    <div class="entity-item-row">
                      <div class="entity-item-info">
                        <span class="entity-item-name">${displayName}</span>
                        <span class="entity-item-id">${entityId}</span>
                      </div>
                      <div class="entity-coord-inputs">
                        <div class="coord-field">
                          <span>X%</span>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            .value=${coordX !== undefined ? String(coordX) : ""}
                            @change=${(e: Event) => this._updateEntityCoord(idx, "x", e)}
                            placeholder="auto"
                            title="X position on image (0 - 100%)"
                          />
                        </div>
                        <div class="coord-field">
                          <span>Y%</span>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            .value=${coordY !== undefined ? String(coordY) : ""}
                            @change=${(e: Event) => this._updateEntityCoord(idx, "y", e)}
                            placeholder="auto"
                            title="Y position on image (0 - 100%)"
                          />
                        </div>
                      </div>
                      <div class="entity-item-actions">
                        <button
                          type="button"
                          class="icon-btn"
                          ?disabled=${isFirst}
                          @click=${() => this._moveEntity(idx, -1)}
                          title="Move light earlier (Up)"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          ?disabled=${isLast}
                          @click=${() => this._moveEntity(idx, 1)}
                          title="Move light later (Down)"
                        >
                          ▼
                        </button>
                        <button
                          type="button"
                          class="icon-btn delete-btn"
                          @click=${() => this._removeEntity(idx)}
                          title="Remove light"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `;
                })
              : html`
                  <div style="font-size: 12px; color: var(--secondary-text-color, #9ca3af); font-style: italic; padding: 4px 0;">
                    No child lights added yet. The main entity will be used unless you add lights below.
                  </div>
                `}

            <div class="add-entity-row">
              <input
                type="text"
                .value=${this._newEntityInput}
                @input=${(e: Event) => (this._newEntityInput = (e.target as HTMLInputElement).value)}
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this._addEntity();
                  }
                }}
                placeholder="light.bedroom_lamp_left"
              />
              <button type="button" class="add-btn" @click=${this._addEntity}>
                + Add Light
              </button>
            </div>
          </div>
        </div>

        <!-- Section: Custom Header Toggles -->
        <div class="section-title">Custom Header Toggles</div>
        <div style="font-size: 12px; color: var(--secondary-text-color, #9ca3af); margin-top: -8px;">
          Add custom toggle buttons displayed to the left of the adaptive/power buttons (e.g. to toggle 2 specific lights together).
        </div>

        <div class="entity-list">
          ${Array.isArray(this._config.custom_toggles) && this._config.custom_toggles.length > 0
            ? this._config.custom_toggles.map((item, idx) => {
                const raw = item.entities || item.entity || item.entity_id;
                const entitiesStr = Array.isArray(raw) ? raw.join(", ") : (raw || "");
                const name = item.name || item.title || entitiesStr;
                const icon = item.icon || "mdi:lightbulb-outline";

                return html`
                  <div class="entity-item-row">
                    <div class="entity-item-info">
                      <span class="entity-item-name">${name}</span>
                      <span class="entity-item-id">${icon} • ${entitiesStr}</span>
                    </div>
                    <div class="entity-item-actions">
                      <button
                        type="button"
                        class="icon-btn delete-btn"
                        @click=${() => this._removeCustomToggle(idx)}
                        title="Remove custom toggle"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                `;
              })
            : html`
                <div style="font-size: 12px; color: var(--secondary-text-color, #9ca3af); font-style: italic; padding: 4px 0;">
                  No custom header toggles configured. Add one below to display next to the power button.
                </div>
              `}

          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px; padding: 10px; background: rgba(255, 255, 255, 0.03); border: 1px dashed rgba(255, 255, 255, 0.12); border-radius: 8px;">
            <div class="form-row">
              <label style="font-size: 12px;">Target Entities (e.g. light.lamp_left, light.lamp_right)</label>
              <input
                type="text"
                .value=${this._newToggleEntities}
                @input=${(e: Event) => (this._newToggleEntities = (e.target as HTMLInputElement).value)}
                placeholder="light.bedroom_lamp_left, light.bedroom_lamp_right"
              />
            </div>
            <div class="form-row-grid">
              <div class="form-row">
                <label style="font-size: 12px;">Icon (Optional)</label>
                <input
                  type="text"
                  .value=${this._newToggleIcon}
                  @input=${(e: Event) => (this._newToggleIcon = (e.target as HTMLInputElement).value)}
                  placeholder="mdi:lamp"
                />
              </div>
              <div class="form-row">
                <label style="font-size: 12px;">Label / Tooltip (Optional)</label>
                <input
                  type="text"
                  .value=${this._newToggleName}
                  @input=${(e: Event) => (this._newToggleName = (e.target as HTMLInputElement).value)}
                  placeholder="Toggle Lamps"
                />
              </div>
            </div>
            <button
              type="button"
              class="add-btn"
              style="padding: 8px 16px; align-self: flex-start;"
              @click=${this._addCustomToggle}
            >
              + Add Custom Toggle Button
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-light-card-editor": HaLightCardEditor;
  }
}
