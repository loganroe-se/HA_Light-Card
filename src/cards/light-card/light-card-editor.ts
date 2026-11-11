import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardEditor } from "../../ha/types";
import { fireEvent } from "../../ha/fire-event";
import { ICONS, renderIcon } from "../../utils/icons";
import {
  LightCardConfig,
  CustomToggleConfig,
  LightEntityConfig,
  getMainEntityIds,
  resolveDefaultSelectionEntities,
  resolveImageCanvasHeight,
  resolveImageObjectFit
} from "./light-card-config";

const SUPPORTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml"
]);

@customElement("ha-light-card-editor")
export class HaLightCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: LightCardConfig;

  @state()
  private _mainEntitySearch = "";

  @state()
  private _mainEntityDropdownOpen = false;

  @state()
  private _adaptiveSearch = "";

  @state()
  private _adaptiveDropdownOpen = false;

  @state()
  private _addLightSearch = "";

  @state()
  private _addLightDropdownOpen = false;

  @state()
  private _uploadError = "";

  @state()
  private _isDraggingFile = false;

  @state()
  private _newToggleEntities = "";

  @state()
  private _newToggleIcon = "";

  @state()
  private _newToggleName = "";

  @state()
  private _dragEntityIdx: number | null = null;

  @state()
  private _dragEntityCoords: { x: number; y: number } | null = null;

  private _dragGrabOffset = { dx: 0, dy: 0 };
  private _onEditorDragMoveBound = (e: PointerEvent) => this._onEditorOrbDragMove(e);
  private _onEditorDragEndBound = (e: PointerEvent) => this._onEditorOrbDragEnd(e);

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("pointermove", this._onEditorDragMoveBound);
    window.removeEventListener("pointerup", this._onEditorDragEndBound);
    window.removeEventListener("pointercancel", this._onEditorDragEndBound);
  }

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

  private _getFilteredHassEntities(query: string, domainFilter?: string) {
    const states = this.hass?.states || {};
    const q = query.trim().toLowerCase();

    const entries = Object.values(states).filter((stateObj) => {
      const id = stateObj.entity_id;
      if (domainFilter && !id.startsWith(`${domainFilter}.`)) return false;
      if (!q) return true;
      const name = String(stateObj.attributes?.friendly_name || "").toLowerCase();
      return id.toLowerCase().includes(q) || name.includes(q);
    });

    entries.sort((a, b) => {
      const aId = a.entity_id;
      const bId = b.entity_id;

      if (domainFilter === "switch") {
        const aAdapt = aId.includes("adaptive_lighting") ? 0 : 1;
        const bAdapt = bId.includes("adaptive_lighting") ? 0 : 1;
        if (aAdapt !== bAdapt) return aAdapt - bAdapt;
      } else if (!domainFilter) {
        const domainRank = (id: string) =>
          id.startsWith("light.") ? 0 : id.startsWith("group.") ? 1 : 2;
        const rA = domainRank(aId);
        const rB = domainRank(bId);
        if (rA !== rB) return rA - rB;
      }

      const aName = String(a.attributes?.friendly_name || aId).toLowerCase();
      const bName = String(b.attributes?.friendly_name || bId).toLowerCase();
      return aName.localeCompare(bName);
    });

    return entries;
  }

  private _setMainEntities(ids: string[]): void {
    if (!this._config) return;
    const unique = Array.from(new Set(ids.filter((s) => s.trim().length > 0)));
    const nextEntity: string | string[] =
      unique.length === 1 ? unique[0] : unique;

    this._config = {
      ...this._config,
      entity: nextEntity
    };
    fireEvent(this, "config-changed", { config: this._config });
    this.requestUpdate();
  }

  private _toggleMainEntity(entityId: string): void {
    const current = getMainEntityIds(this._config?.entity);
    if (current.includes(entityId)) {
      this._setMainEntities(current.filter((id) => id !== entityId));
    } else {
      this._setMainEntities([...current, entityId]);
    }
  }

  private _removeMainEntity(entityId: string): void {
    const current = getMainEntityIds(this._config?.entity);
    this._setMainEntities(current.filter((id) => id !== entityId));
  }

  private _selectAdaptiveEntity(entityId?: string): void {
    if (!this._config) return;
    const newConfig = { ...this._config };
    if (entityId) {
      newConfig.adaptive_lighting_entity = entityId;
    } else {
      delete newConfig.adaptive_lighting_entity;
    }
    this._config = newConfig;
    this._adaptiveSearch = "";
    this._adaptiveDropdownOpen = false;
    fireEvent(this, "config-changed", { config: this._config });
    this.requestUpdate();
  }

  private _getEffectiveSelectionEntities(): (string | LightEntityConfig)[] {
    if (!this._config) return [];
    if (Array.isArray(this._config.entities)) {
      return this._config.entities;
    }
    return resolveDefaultSelectionEntities(this._config.entity, this.hass?.states);
  }

  private _commitSelectionEntities(list: (string | LightEntityConfig)[]): void {
    if (!this._config) return;
    this._config = {
      ...this._config,
      entities: list
    };
    fireEvent(this, "config-changed", { config: this._config });
    this.requestUpdate();
  }

  private _resetSelectionEntitiesToDefault(): void {
    if (!this._config) return;
    const newConfig = { ...this._config };
    delete newConfig.entities;
    this._config = newConfig;
    fireEvent(this, "config-changed", { config: this._config });
    this.requestUpdate();
  }

  private _moveEntity(index: number, direction: -1 | 1): void {
    const list = [...this._getEffectiveSelectionEntities()];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    this._commitSelectionEntities(list);
  }

  private _updateEntityField(index: number, field: "name" | "icon", rawValue: string): void {
    const list = [...this._getEffectiveSelectionEntities()];
    const current = list[index];
    if (current === undefined) return;

    const val = rawValue;
    const trimmed = rawValue.trim();

    if (typeof current === "string") {
      if (trimmed === "") return;
      list[index] = {
        entity: current,
        [field]: val
      };
    } else {
      const updated: LightEntityConfig = {
        ...current,
        [field]: val
      };
      if (trimmed === "") {
        delete (updated as any)[field];
      }
      list[index] = updated;
    }
    this._commitSelectionEntities(list);
  }

  private _updateEntityCoord(index: number, axis: "x" | "y", e: Event): void {
    const list = [...this._getEffectiveSelectionEntities()];
    const current = list[index];
    if (current === undefined) return;

    const val = (e.target as HTMLInputElement).value.trim();
    const numVal = val === "" ? undefined : Math.max(0, Math.min(100, Number(val)));

    if (typeof current === "string") {
      if (numVal === undefined) return;
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
    this._commitSelectionEntities(list);
  }

  private _setEntityCoords(index: number, x: number, y: number): void {
    const list = [...this._getEffectiveSelectionEntities()];
    const current = list[index];
    if (current === undefined) return;

    const clampedX = Math.round(Math.max(0, Math.min(100, x)));
    const clampedY = Math.round(Math.max(0, Math.min(100, y)));

    if (typeof current === "string") {
      list[index] = {
        entity: current,
        x: clampedX,
        y: clampedY
      };
    } else {
      list[index] = {
        ...current,
        x: clampedX,
        y: clampedY
      };
    }
    this._commitSelectionEntities(list);
  }

  private _onEditorOrbDragStart(index: number, curX: number, curY: number, e: PointerEvent): void {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    const stage = this.shadowRoot?.querySelector<HTMLElement>(".editor-image-stage");
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const centerPxX = rect.left + (curX / 100) * rect.width;
    const centerPxY = rect.top + (curY / 100) * rect.height;
    this._dragGrabOffset = {
      dx: e.clientX - centerPxX,
      dy: e.clientY - centerPxY
    };

    this._dragEntityIdx = index;
    this._dragEntityCoords = { x: curX, y: curY };

    window.removeEventListener("pointermove", this._onEditorDragMoveBound);
    window.removeEventListener("pointerup", this._onEditorDragEndBound);
    window.removeEventListener("pointercancel", this._onEditorDragEndBound);

    window.addEventListener("pointermove", this._onEditorDragMoveBound);
    window.addEventListener("pointerup", this._onEditorDragEndBound);
    window.addEventListener("pointercancel", this._onEditorDragEndBound);
  }

  private _onEditorOrbDragMove(e: PointerEvent): void {
    if (this._dragEntityIdx === null) return;
    e.preventDefault();

    const stage = this.shadowRoot?.querySelector<HTMLElement>(".editor-image-stage");
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const centerPxX = e.clientX - this._dragGrabOffset.dx;
    const centerPxY = e.clientY - this._dragGrabOffset.dy;

    const x = Math.round(Math.max(0, Math.min(100, ((centerPxX - rect.left) / rect.width) * 100)));
    const y = Math.round(Math.max(0, Math.min(100, ((centerPxY - rect.top) / rect.height) * 100)));

    this._dragEntityCoords = { x, y };
  }

  private _onEditorOrbDragEnd(_e: PointerEvent): void {
    window.removeEventListener("pointermove", this._onEditorDragMoveBound);
    window.removeEventListener("pointerup", this._onEditorDragEndBound);
    window.removeEventListener("pointercancel", this._onEditorDragEndBound);

    if (this._dragEntityIdx !== null && this._dragEntityCoords) {
      const idx = this._dragEntityIdx;
      const { x, y } = this._dragEntityCoords;
      this._dragEntityIdx = null;
      this._dragEntityCoords = null;
      this._setEntityCoords(idx, x, y);
    } else {
      this._dragEntityIdx = null;
      this._dragEntityCoords = null;
    }
  }

  private _removeEntity(index: number): void {
    const list = this._getEffectiveSelectionEntities().filter((_, i) => i !== index);
    this._commitSelectionEntities(list);
  }

  private _addEntity(entityId?: string): void {
    const trimmed = (entityId ?? this._addLightSearch).trim();
    if (!trimmed) return;
    const list = [...this._getEffectiveSelectionEntities()];
    list.push(trimmed);
    this._addLightSearch = "";
    this._addLightDropdownOpen = false;
    this._commitSelectionEntities(list);
  }

  private _handleImageFile(file?: File): void {
    if (!file || !this._config) return;
    const isSupportedMime = SUPPORTED_IMAGE_TYPES.has(file.type.toLowerCase());
    const hasSupportedExt = /\.(jpe?g|png|webp|gif|svg)$/i.test(file.name);

    if (!isSupportedMime && !hasSupportedExt) {
      this._uploadError = `Unsupported file "${file.name}". Supported formats: JPEG, PNG, WebP, GIF, SVG.`;
      return;
    }

    this._uploadError = "";
    const reader = new FileReader();
    reader.onload = () => {
      if (!this._config || typeof reader.result !== "string") return;
      this._config = {
        ...this._config,
        light_selection_image: reader.result
      };
      fireEvent(this, "config-changed", { config: this._config });
      this.requestUpdate();
    };
    reader.onerror = () => {
      this._uploadError = "Failed to read the selected image file.";
    };
    reader.readAsDataURL(file);
  }

  private _onImageFileInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    this._handleImageFile(file);
    input.value = "";
  }

  private _onImageDrop(e: DragEvent): void {
    e.preventDefault();
    this._isDraggingFile = false;
    const file = e.dataTransfer?.files?.[0];
    this._handleImageFile(file);
  }

  private _clearImage(): void {
    if (!this._config) return;
    const newConfig = { ...this._config };
    delete newConfig.light_selection_image;
    delete newConfig.light_image;
    delete newConfig.image;
    delete newConfig.floorplan_image;
    this._config = newConfig;
    this._uploadError = "";
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

    .selected-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 4px;
    }

    .entity-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      background: rgba(245, 158, 11, 0.16);
      border: 1px solid rgba(245, 158, 11, 0.45);
      color: #fde68a;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      max-width: 100%;
    }

    .entity-chip-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .chip-remove {
      background: none;
      border: none;
      color: #fde68a;
      cursor: pointer;
      padding: 0 2px;
      font-size: 12px;
      line-height: 1;
      opacity: 0.8;
    }

    .chip-remove:hover {
      opacity: 1;
      color: #ffffff;
    }

    .dropdown-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .search-input-row {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-input-row input {
      width: 100%;
      box-sizing: border-box;
      padding-right: 32px;
    }

    .clear-input-btn {
      position: absolute;
      right: 8px;
      background: none;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      font-size: 13px;
      padding: 4px;
      line-height: 1;
    }

    .clear-input-btn:hover {
      color: #ffffff;
    }

    .entity-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      max-height: 240px;
      overflow-y: auto;
      background: #27272a;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.55);
      z-index: 50;
      padding: 4px;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      border-radius: 6px;
      cursor: pointer;
      gap: 8px;
      transition: background 0.12s ease;
    }

    .dropdown-item:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    .dropdown-item.is-selected {
      background: rgba(245, 158, 11, 0.14);
    }

    .dropdown-item-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
      flex: 1;
    }

    .dropdown-item-name {
      font-size: 13px;
      font-weight: 600;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .dropdown-item-id {
      font-size: 11px;
      color: #9ca3af;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .dropdown-item-meta {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .domain-badge {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.08);
      color: #d4d4d8;
    }

    .domain-badge.is-group {
      background: rgba(59, 130, 246, 0.2);
      color: #93c5fd;
    }

    .dropdown-empty {
      padding: 10px 12px;
      font-size: 12px;
      color: #9ca3af;
      font-style: italic;
      text-align: center;
    }

    .light-edit-row {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
    }

    .entity-row-top {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }

    .entity-label-input {
      flex: 1;
      min-width: 100px;
      padding: 6px 8px !important;
      font-size: 13px !important;
      font-weight: 600;
      border-radius: 6px !important;
      background: rgba(0, 0, 0, 0.25) !important;
    }

    .entity-icon-input {
      width: 120px;
      padding: 6px 8px !important;
      font-size: 12px !important;
      border-radius: 6px !important;
      background: rgba(0, 0, 0, 0.25) !important;
    }

    .entity-row-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
    }

    .reset-defaults-btn {
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 600;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #e4e4e7;
      cursor: pointer;
    }

    .reset-defaults-btn:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    .image-upload-zone {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px 12px;
      border: 1.5px dashed rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.03);
      text-align: center;
      transition: all 0.2s ease;
    }

    .image-upload-zone.dragging {
      border-color: #f59e0b;
      background: rgba(245, 158, 11, 0.1);
    }

    .upload-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background: #f59e0b;
      color: #18181b;
      border-radius: 8px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .upload-btn:hover {
      background: #d97706;
    }

    .image-preview-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      width: 100%;
      padding: 8px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.25);
      box-sizing: border-box;
    }

    .image-preview-thumb {
      max-height: 80px;
      max-width: 140px;
      border-radius: 6px;
      object-fit: contain;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .upload-error {
      font-size: 12px;
      color: #f87171;
      margin-top: 2px;
    }

    .editor-image-placer {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 4px;
    }

    .editor-placer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .editor-drag-readout {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 999px;
      background: rgba(245, 158, 11, 0.18);
      border: 1px solid rgba(245, 158, 11, 0.45);
      color: #fde68a;
    }

    .editor-image-stage {
      position: relative;
      width: 100%;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: #18181b;
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
      line-height: 0;
    }

    .editor-stage-img {
      width: 100%;
      height: auto;
      display: block;
      pointer-events: none;
      user-select: none;
      max-height: 360px;
      object-fit: cover;
    }

    .editor-drag-orb {
      position: absolute;
      transform: translate(-50%, -19px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      cursor: grab;
      z-index: 2;
      touch-action: none;
      user-select: none;
    }

    .editor-drag-orb:hover {
      z-index: 5;
    }

    .editor-drag-orb.is-dragging {
      cursor: grabbing;
      z-index: 10;
    }

    .editor-orb-circle {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #fed166;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.55), 0 0 14px rgba(254, 209, 102, 0.5);
      border: 2px solid rgba(255, 255, 255, 0.85);
      transition: transform 0.12s ease, box-shadow 0.12s ease;
    }

    .editor-drag-orb.is-dragging .editor-orb-circle {
      transform: scale(1.14);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.65), 0 0 22px rgba(245, 158, 11, 0.85);
      border-color: #ffffff;
    }

    .editor-orb-circle svg,
    .editor-orb-circle ha-icon {
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
    }

    .editor-orb-badge {
      padding: 2px 6px;
      border-radius: 5px;
      background: rgba(24, 24, 27, 0.92);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #ffffff;
      font-size: 10px;
      font-weight: 600;
      line-height: 1.2;
      white-space: nowrap;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.45);
      pointer-events: none;
    }
  `;

  private _renderMainEntityPicker() {
    if (!this._config) return html``;
    const selectedIds = getMainEntityIds(this._config.entity);
    const matches = this._getFilteredHassEntities(this._mainEntitySearch).slice(0, 80);

    return html`
      <div class="form-row">
        <label>Entity (Required — Select one or multiple)</label>

        ${selectedIds.length > 0
          ? html`
              <div class="selected-chips">
                ${selectedIds.map((id) => {
                  const stateObj = this.hass?.states[id];
                  const friendlyName = stateObj?.attributes?.friendly_name;
                  const label = friendlyName ? `${friendlyName} (${id})` : id;
                  return html`
                    <span class="entity-chip" title="${id}">
                      <span class="entity-chip-text">${label}</span>
                      <button
                        type="button"
                        class="chip-remove"
                        @click=${() => this._removeMainEntity(id)}
                        title="Remove ${id}"
                      >
                        ✕
                      </button>
                    </span>
                  `;
                })}
              </div>
            `
          : null}

        <div class="dropdown-wrap">
          <div class="search-input-row">
            <input
              type="text"
              .value=${this._mainEntitySearch}
              @focus=${() => (this._mainEntityDropdownOpen = true)}
              @input=${(e: Event) => {
                this._mainEntitySearch = (e.target as HTMLInputElement).value;
                this._mainEntityDropdownOpen = true;
              }}
              @blur=${() => {
                setTimeout(() => {
                  this._mainEntityDropdownOpen = false;
                }, 160);
              }}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === "Escape") {
                  this._mainEntityDropdownOpen = false;
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  const q = this._mainEntitySearch.trim();
                  if (q) {
                    this._toggleMainEntity(q);
                    this._mainEntitySearch = "";
                  }
                }
              }}
              placeholder="Search all Home Assistant entities (name or ID)..."
            />
            ${this._mainEntitySearch
              ? html`
                  <button
                    type="button"
                    class="clear-input-btn"
                    @mousedown=${(e: MouseEvent) => {
                      e.preventDefault();
                      this._mainEntitySearch = "";
                    }}
                    title="Clear search"
                  >
                    ✕
                  </button>
                `
              : null}
          </div>

          ${this._mainEntityDropdownOpen
            ? html`
                <div class="entity-dropdown">
                  ${matches.length > 0
                    ? matches.map((stateObj) => {
                        const id = stateObj.entity_id;
                        const name = stateObj.attributes?.friendly_name || id;
                        const domain = id.split(".")[0];
                        const isGroup = Array.isArray(stateObj.attributes?.entity_id);
                        const isSelected = selectedIds.includes(id);

                        return html`
                          <div
                            class="dropdown-item ${isSelected ? "is-selected" : ""}"
                            @mousedown=${(e: MouseEvent) => {
                              e.preventDefault();
                              this._toggleMainEntity(id);
                            }}
                          >
                            <div class="dropdown-item-text">
                              <span class="dropdown-item-name">${name}</span>
                              <span class="dropdown-item-id">${id}</span>
                            </div>
                            <div class="dropdown-item-meta">
                              ${isGroup
                                ? html`<span class="domain-badge is-group">Group</span>`
                                : html`<span class="domain-badge">${domain}</span>`}
                              ${isSelected
                                ? html`<span style="color: #f59e0b; font-weight: 700;">✓</span>`
                                : null}
                            </div>
                          </div>
                        `;
                      })
                    : html`
                        <div class="dropdown-empty">
                          No matching entities found. Press Enter to add "${this._mainEntitySearch}".
                        </div>
                      `}
                </div>
              `
            : null}
        </div>
      </div>
    `;
  }

  private _renderAdaptiveEntityPicker() {
    if (!this._config) return html``;
    const current = this._config.adaptive_lighting_entity || "";
    const currentName = current ? this.hass?.states[current]?.attributes?.friendly_name : undefined;
    const switches = this._getFilteredHassEntities(this._adaptiveSearch, "switch");

    return html`
      <div class="form-row">
        <label>Adaptive Lighting Entity (switch.* — Auto-detects if blank)</label>
        <div class="dropdown-wrap">
          <div class="search-input-row">
            <input
              type="text"
              .value=${this._adaptiveDropdownOpen
                ? this._adaptiveSearch
                : currentName
                ? `${currentName} (${current})`
                : current}
              @focus=${() => {
                this._adaptiveSearch = "";
                this._adaptiveDropdownOpen = true;
              }}
              @input=${(e: Event) => {
                this._adaptiveSearch = (e.target as HTMLInputElement).value;
                this._adaptiveDropdownOpen = true;
              }}
              @blur=${() => {
                setTimeout(() => {
                  this._adaptiveDropdownOpen = false;
                }, 160);
              }}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === "Escape") {
                  this._adaptiveDropdownOpen = false;
                }
              }}
              placeholder="Auto-detect (Default) — Click or type to search switch.* entities"
            />
            ${current
              ? html`
                  <button
                    type="button"
                    class="clear-input-btn"
                    @mousedown=${(e: MouseEvent) => {
                      e.preventDefault();
                      this._selectAdaptiveEntity(undefined);
                    }}
                    title="Reset to Auto-detect"
                  >
                    ✕
                  </button>
                `
              : null}
          </div>

          ${this._adaptiveDropdownOpen
            ? html`
                <div class="entity-dropdown">
                  <div
                    class="dropdown-item ${!current ? "is-selected" : ""}"
                    @mousedown=${(e: MouseEvent) => {
                      e.preventDefault();
                      this._selectAdaptiveEntity(undefined);
                    }}
                  >
                    <div class="dropdown-item-text">
                      <span class="dropdown-item-name">Auto-detect (Default)</span>
                      <span class="dropdown-item-id">Automatically matches switch.adaptive_lighting_*</span>
                    </div>
                    ${!current
                      ? html`<span style="color: #f59e0b; font-weight: 700;">✓</span>`
                      : null}
                  </div>
                  ${switches.length > 0
                    ? switches.map((stateObj) => {
                        const id = stateObj.entity_id;
                        const name = stateObj.attributes?.friendly_name || id;
                        const isSelected = current === id;

                        return html`
                          <div
                            class="dropdown-item ${isSelected ? "is-selected" : ""}"
                            @mousedown=${(e: MouseEvent) => {
                              e.preventDefault();
                              this._selectAdaptiveEntity(id);
                            }}
                          >
                            <div class="dropdown-item-text">
                              <span class="dropdown-item-name">${name}</span>
                              <span class="dropdown-item-id">${id}</span>
                            </div>
                            <div class="dropdown-item-meta">
                              <span class="domain-badge">switch</span>
                              ${isSelected
                                ? html`<span style="color: #f59e0b; font-weight: 700;">✓</span>`
                                : null}
                            </div>
                          </div>
                        `;
                      })
                    : html`
                        <div class="dropdown-empty">No matching switch.* entities found.</div>
                      `}
                </div>
              `
            : null}
        </div>
      </div>
    `;
  }

  private _renderInteractiveImagePlacer() {
    if (!this._config) return null;
    const bgImage =
      this._config.light_selection_image ||
      this._config.light_image ||
      this._config.image ||
      this._config.floorplan_image;
    if (!bgImage) return null;

    const effectiveList = this._getEffectiveSelectionEntities();
    if (effectiveList.length === 0) return null;

    const dragItem =
      this._dragEntityIdx !== null ? effectiveList[this._dragEntityIdx] : undefined;
    const dragEntityId =
      dragItem !== undefined
        ? typeof dragItem === "string"
          ? dragItem
          : dragItem.entity
        : "";
    const dragLabel =
      dragItem !== undefined && typeof dragItem === "object" && dragItem.name
        ? dragItem.name
        : this.hass?.states[dragEntityId]?.attributes?.friendly_name ||
          dragEntityId.replace(/^[^.]+\./, "").replace(/_/g, " ");

    const canvasHeight = resolveImageCanvasHeight(
      this._config.light_selection_image_height ?? this._config.image_height
    );
    const imageFit = resolveImageObjectFit(
      this._config.light_selection_image_fit ?? this._config.image_fit
    );
    const stageStyle = canvasHeight ? `height: ${canvasHeight};` : "";
    const stageImgStyle = canvasHeight
      ? `height: 100%; max-height: none; object-fit: ${imageFit};`
      : "";

    return html`
      <div class="editor-image-placer">
        <div class="editor-placer-header">
          <label style="font-size: 13px; font-weight: 600;">Drag Icons on Image to Reposition</label>
          ${this._dragEntityIdx !== null && this._dragEntityCoords
            ? html`
                <span class="editor-drag-readout">
                  ${dragLabel}: X ${this._dragEntityCoords.x}% • Y ${this._dragEntityCoords.y}%
                </span>
              `
            : html`
                <span style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
                  Syncs with X% / Y% below
                </span>
              `}
        </div>
        <div class="editor-image-stage" style="${stageStyle}">
          <img class="editor-stage-img" src="${bgImage}" style="${stageImgStyle}" alt="Interactive position map" />
          ${effectiveList.map((item, idx) => {
            const entityId = typeof item === "string" ? item : item.entity;
            const customName = typeof item === "object" ? item.name : undefined;
            const customIcon = typeof item === "object" ? item.icon : undefined;
            const stateObj = this.hass?.states[entityId];
            const label =
              customName ||
              stateObj?.attributes?.friendly_name ||
              entityId.replace(/^[^.]+\./, "").replace(/_/g, " ");
            const iconPath = customIcon || stateObj?.attributes?.icon;

            const rawX =
              typeof item === "object"
                ? (item.x ?? (item as any).x_position ?? (item as any).left)
                : undefined;
            const rawY =
              typeof item === "object"
                ? (item.y ?? (item as any).y_position ?? (item as any).top)
                : undefined;

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

            const defaultX =
              effectiveList.length > 1
                ? Math.round((100 / (effectiveList.length + 1)) * (idx + 1))
                : 50;
            const defaultY = 50;

            const isDraggingThis = this._dragEntityIdx === idx && this._dragEntityCoords !== null;
            const posX = isDraggingThis
              ? this._dragEntityCoords!.x
              : parsedX !== undefined && !isNaN(parsedX)
              ? Math.max(0, Math.min(100, parsedX))
              : defaultX;
            const posY = isDraggingThis
              ? this._dragEntityCoords!.y
              : parsedY !== undefined && !isNaN(parsedY)
              ? Math.max(0, Math.min(100, parsedY))
              : defaultY;

            return html`
              <div
                class="editor-drag-orb ${isDraggingThis ? "is-dragging" : ""}"
                style="left: ${posX}%; top: ${posY}%;"
                @pointerdown=${(e: PointerEvent) => this._onEditorOrbDragStart(idx, posX, posY, e)}
                title="Drag ${label} (${posX}%, ${posY}%)"
              >
                <div class="editor-orb-circle">
                  ${renderIcon(iconPath, ICONS.lightbulb, 20)}
                </div>
                <span class="editor-orb-badge">${label}</span>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  protected override render() {
    if (!this.hass || !this._config) return html``;

    return html`
      <div class="card-config">
        <!-- Main Entity Picker (Multi-select Searchable Dropdown) -->
        ${this._renderMainEntityPicker()}

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

        <!-- Adaptive Lighting Entity (switch.* picker) -->
        ${this._renderAdaptiveEntityPicker()}

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
          <label>Background Image (Optional Floorplan / Room Overlay)</label>
          <div
            class="image-upload-zone ${this._isDraggingFile ? "dragging" : ""}"
            @dragover=${(e: DragEvent) => {
              e.preventDefault();
              this._isDraggingFile = true;
            }}
            @dragleave=${() => (this._isDraggingFile = false)}
            @drop=${this._onImageDrop}
          >
            ${this._config.light_selection_image || this._config.light_image || this._config.image
              ? html`
                  <div class="image-preview-wrap">
                    <img
                      class="image-preview-thumb"
                      src=${this._config.light_selection_image || this._config.light_image || this._config.image}
                      alt="Uploaded background preview"
                    />
                    <div style="display: flex; flex-direction: column; gap: 6px; align-items: flex-end;">
                      <label class="upload-btn">
                        Replace Image
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.jpg,.jpeg,.png,.webp,.gif,.svg"
                          @change=${this._onImageFileInput}
                          hidden
                        />
                      </label>
                      <button
                        type="button"
                        class="reset-defaults-btn"
                        @click=${this._clearImage}
                      >
                        ✕ Remove Image
                      </button>
                    </div>
                  </div>
                `
              : html`
                  <label class="upload-btn">
                    Upload Image File
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.jpg,.jpeg,.png,.webp,.gif,.svg"
                      @change=${this._onImageFileInput}
                      hidden
                    />
                  </label>
                  <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
                    Drag & drop or choose an image. Supported formats: JPEG (.jpg, .jpeg), PNG (.png), WebP (.webp), GIF (.gif), SVG (.svg).
                  </div>
                `}
            ${this._uploadError
              ? html`<div class="upload-error">${this._uploadError}</div>`
              : null}
          </div>
          <input
            type="text"
            .value=${(() => {
              const img = this._config?.light_selection_image || this._config?.light_image || this._config?.image || "";
              return img.startsWith("data:") ? "" : img;
            })()}
            .configValue=${"light_selection_image"}
            @change=${this._valueChanged}
            placeholder="Or enter image URL / local path (e.g. /local/floorplan.png)"
            style="margin-top: 2px; font-size: 12px; padding: 8px 10px;"
          />
          <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
            When an image is set, lights overlay onto it at their X% / Y% coordinates (0 - 100%).
          </div>

          ${(() => {
            const rawHeight = this._config?.light_selection_image_height ?? this._config?.image_height;
            const parsedHeight =
              rawHeight !== undefined && rawHeight !== "" ? parseFloat(String(rawHeight)) : undefined;
            const hasHeight = parsedHeight !== undefined && !isNaN(parsedHeight) && parsedHeight > 0;
            const currentFit =
              this._config?.light_selection_image_fit || this._config?.image_fit || "fill";

            return html`
              <div class="form-row-grid" style="margin-top: 6px;">
                <div class="form-row">
                  <label>Canvas Height (px, Optional)</label>
                  <input
                    type="number"
                    min="50"
                    max="1200"
                    step="10"
                    .value=${hasHeight ? String(parsedHeight) : ""}
                    .configValue=${"light_selection_image_height"}
                    @input=${this._valueChanged}
                    placeholder="Auto (Image ratio)"
                  />
                </div>
                ${hasHeight
                  ? html`
                      <div class="form-row">
                        <label>Image Fit Mode</label>
                        <select
                          .value=${currentFit === "cover" ? "fill" : currentFit}
                          .configValue=${"light_selection_image_fit"}
                          @change=${this._valueChanged}
                        >
                          <option value="fill">Fill (Crop to fit)</option>
                          <option value="contain">Contain (Fit inside)</option>
                          <option value="stretch">Stretch (Exact size)</option>
                        </select>
                      </div>
                    `
                  : html`<div></div>`}
              </div>
            `;
          })()}

          ${this._renderInteractiveImagePlacer()}
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
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
            <label>Selection Lights (Labels, Order & Coordinates)</label>
            ${Array.isArray(this._config.entities)
              ? html`
                  <button
                    type="button"
                    class="reset-defaults-btn"
                    @click=${this._resetSelectionEntitiesToDefault}
                    title="Restore default lights derived from the main entity/entities"
                  >
                    ↺ Reset to Defaults
                  </button>
                `
              : html`
                  <span style="font-size: 11px; color: #f59e0b;">Using defaults from main entity</span>
                `}
          </div>
          <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af); margin-bottom: 4px;">
            Edit labels directly, set optional icons & X%/Y% image positions, or remove/reorder lights.
          </div>

          <div class="entity-list">
            ${(() => {
              const effectiveList = this._getEffectiveSelectionEntities();
              const addMatches = this._getFilteredHassEntities(this._addLightSearch).slice(0, 60);

              return html`
                ${effectiveList.length > 0
                  ? effectiveList.map((item, idx) => {
                      const entityId = typeof item === "string" ? item : item.entity;
                      const customName = typeof item === "object" ? item.name : undefined;
                      const customIcon = typeof item === "object" ? item.icon : undefined;
                      const coordX =
                        typeof item === "object"
                          ? (item.x ?? (item as any).x_position ?? (item as any).left)
                          : undefined;
                      const coordY =
                        typeof item === "object"
                          ? (item.y ?? (item as any).y_position ?? (item as any).top)
                          : undefined;
                      const stateObj = this.hass?.states[entityId];
                      const fallbackName =
                        stateObj?.attributes?.friendly_name ||
                        entityId.replace(/^[^.]+\./, "").replace(/_/g, " ");
                      const fallbackIcon = stateObj?.attributes?.icon || "mdi:lightbulb";
                      const isFirst = idx === 0;
                      const isLast = idx === effectiveList.length - 1;

                      return html`
                        <div class="entity-item-row light-edit-row">
                          <div class="entity-row-top">
                            <input
                              type="text"
                              class="entity-label-input"
                              .value=${customName ?? ""}
                              @input=${(e: Event) =>
                                this._updateEntityField(idx, "name", (e.target as HTMLInputElement).value)}
                              placeholder=${fallbackName}
                              title="Hand-editable display label (leave blank for default)"
                            />
                            <input
                              type="text"
                              class="entity-icon-input"
                              .value=${customIcon ?? ""}
                              @input=${(e: Event) =>
                                this._updateEntityField(idx, "icon", (e.target as HTMLInputElement).value)}
                              placeholder=${fallbackIcon}
                              title="Optional MDI icon (e.g. mdi:lamp)"
                            />
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

                          <div class="entity-row-bottom">
                            <span class="entity-item-id">${entityId}</span>
                            <div class="entity-coord-inputs">
                              <div class="coord-field">
                                <span>X%</span>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  step="1"
                                  .value=${this._dragEntityIdx === idx && this._dragEntityCoords
                                    ? String(this._dragEntityCoords.x)
                                    : coordX !== undefined
                                    ? String(coordX)
                                    : ""}
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
                                  .value=${this._dragEntityIdx === idx && this._dragEntityCoords
                                    ? String(this._dragEntityCoords.y)
                                    : coordY !== undefined
                                    ? String(coordY)
                                    : ""}
                                  @change=${(e: Event) => this._updateEntityCoord(idx, "y", e)}
                                  placeholder="auto"
                                  title="Y position on image (0 - 100%)"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      `;
                    })
                  : html`
                      <div style="font-size: 12px; color: var(--secondary-text-color, #9ca3af); font-style: italic; padding: 4px 0;">
                        No lights in selection list. Add one below or click Reset to Defaults.
                      </div>
                    `}

                <div class="dropdown-wrap" style="margin-top: 4px;">
                  <div class="add-entity-row">
                    <input
                      type="text"
                      .value=${this._addLightSearch}
                      @focus=${() => (this._addLightDropdownOpen = true)}
                      @input=${(e: Event) => {
                        this._addLightSearch = (e.target as HTMLInputElement).value;
                        this._addLightDropdownOpen = true;
                      }}
                      @blur=${() => {
                        setTimeout(() => {
                          this._addLightDropdownOpen = false;
                        }, 160);
                      }}
                      @keydown=${(e: KeyboardEvent) => {
                        if (e.key === "Escape") {
                          this._addLightDropdownOpen = false;
                        } else if (e.key === "Enter") {
                          e.preventDefault();
                          this._addEntity();
                        }
                      }}
                      placeholder="Search Home Assistant entities to add..."
                    />
                    <button type="button" class="add-btn" @click=${() => this._addEntity()}>
                      + Add Light
                    </button>
                  </div>

                  ${this._addLightDropdownOpen
                    ? html`
                        <div class="entity-dropdown">
                          ${addMatches.length > 0
                            ? addMatches.map((stateObj) => {
                                const id = stateObj.entity_id;
                                const name = stateObj.attributes?.friendly_name || id;
                                const domain = id.split(".")[0];
                                return html`
                                  <div
                                    class="dropdown-item"
                                    @mousedown=${(e: MouseEvent) => {
                                      e.preventDefault();
                                      this._addEntity(id);
                                    }}
                                  >
                                    <div class="dropdown-item-text">
                                      <span class="dropdown-item-name">${name}</span>
                                      <span class="dropdown-item-id">${id}</span>
                                    </div>
                                    <div class="dropdown-item-meta">
                                      <span class="domain-badge">${domain}</span>
                                    </div>
                                  </div>
                                `;
                              })
                            : html`
                                <div class="dropdown-empty">
                                  No matching entities. Click "+ Add Light" or press Enter to add manually.
                                </div>
                              `}
                        </div>
                      `
                    : null}
                </div>
              `;
            })()}
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
