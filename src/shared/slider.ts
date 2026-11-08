import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { SliderMode } from "../utils/format";

export interface SliderEventDetail {
  ratio: number;
  mode: SliderMode;
  isFinal: boolean;
}

@customElement("ha-light-slider")
export class HaLightSlider extends LitElement {
  @property({ type: String })
  public mode: SliderMode = "brightness";

  @property({ type: Number })
  public brightnessPct = 60;

  @property({ type: Number })
  public minBrightness = 0;

  @property({ type: Number })
  public maxBrightness = 100;

  @property({ type: Number })
  public kelvin = 2700;

  @property({ type: Number })
  public minKelvin = 2000;

  @property({ type: Number })
  public maxKelvin = 6500;

  @property({ type: Number })
  public hue = 30;

  @property({ type: Boolean })
  public isOn = true;

  @property({ type: String })
  public fillColor = "#f8a555";

  @state()
  private _isDragging = false;

  @state()
  private _dragRatio: number | null = null;

  private _onWindowMoveBound = this._onWindowPointerMove.bind(this);
  private _onWindowUpBound = this._onWindowPointerUp.bind(this);

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._removeWindowListeners();
  }

  static override styles = css`
    :host {
      display: block;
      width: 100%;
      height: 48px;
      user-select: none;
      -webkit-user-select: none;
      box-sizing: border-box;
    }

    .slider-track {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 24px;
      overflow: hidden;
      cursor: pointer;
      touch-action: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
      transition: background 0.2s ease;
    }

    .slider-track.mode-brightness {
      background: #2c241d;
    }

    .slider-track.mode-temp {
      background: linear-gradient(to right, #ff8c1a 0%, #ffa746 15%, #ffd49c 33%, #f4f6ff 55%, #b3d4ff 78%, #7eacff 100%);
    }

    .slider-track.mode-color {
      background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
    }

    .slider-fill {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      border-radius: 24px;
      pointer-events: none;
    }

    .slider-indicator {
      position: absolute;
      top: 4px;
      bottom: 4px;
      width: 14px;
      border-radius: 7px;
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(0, 0, 0, 0.15);
      transform: translateX(-50%);
      pointer-events: none;
    }
  `;

  private _addWindowListeners() {
    window.addEventListener("pointermove", this._onWindowMoveBound, { passive: false });
    window.addEventListener("pointerup", this._onWindowUpBound, { passive: false });
    window.addEventListener("pointercancel", this._onWindowUpBound, { passive: false });
  }

  private _removeWindowListeners() {
    window.removeEventListener("pointermove", this._onWindowMoveBound);
    window.removeEventListener("pointerup", this._onWindowUpBound);
    window.removeEventListener("pointercancel", this._onWindowUpBound);
  }

  private _onPointerDown(e: PointerEvent) {
    e.preventDefault();
    this._isDragging = true;
    this._addWindowListeners();
    this._handlePointer(e, false);
  }

  private _onWindowPointerMove(e: PointerEvent) {
    if (!this._isDragging) return;
    e.preventDefault();
    this._handlePointer(e, false);
  }

  private _onWindowPointerUp(e: PointerEvent) {
    if (!this._isDragging) return;
    e.preventDefault();
    this._isDragging = false;
    this._removeWindowListeners();
    this._handlePointer(e, true);
    this._dragRatio = null;
  }

  private _handlePointer(e: PointerEvent, isFinal: boolean) {
    const track = this.shadowRoot?.querySelector(".slider-track") as HTMLElement;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    this._dragRatio = ratio;

    this.dispatchEvent(
      new CustomEvent<SliderEventDetail>(isFinal ? "slider-change" : "slider-input", {
        bubbles: true,
        composed: true,
        detail: {
          ratio,
          mode: this.mode,
          isFinal
        }
      })
    );
  }

  protected override render() {
    let fillWidth = "0%";
    let indicatorLeft = "0%";
    const showFill = this.mode === "brightness";
    const showIndicator = this.mode !== "brightness";

    if (this.mode === "brightness") {
      let visualRatio: number;
      if (this._isDragging && this._dragRatio !== null) {
        visualRatio = this._dragRatio;
      } else {
        const span = Math.max(1, this.maxBrightness - this.minBrightness);
        visualRatio = Math.max(0, Math.min(1, (this.brightnessPct - this.minBrightness) / span));
      }
      fillWidth = `${visualRatio * 100}%`;
    } else if (this.mode === "temp") {
      const span = Math.max(1, this.maxKelvin - this.minKelvin);
      const ratio =
        this._isDragging && this._dragRatio !== null
          ? this._dragRatio
          : (this.kelvin - this.minKelvin) / span;
      indicatorLeft = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
    } else if (this.mode === "color") {
      const ratio = this._isDragging && this._dragRatio !== null ? this._dragRatio : this.hue / 360;
      indicatorLeft = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
    }

    const currentFillColor = this.isOn ? this.fillColor : "#4a3c30";

    return html`
      <div
        class="slider-track mode-${this.mode}"
        @pointerdown=${this._onPointerDown}
      >
        ${showFill
          ? html`
              <div
                class="slider-fill"
                style="width: ${fillWidth}; background-color: ${currentFillColor}; transition: ${this._isDragging
                  ? "none"
                  : "width 0.15s ease-out, background-color 0.2s ease"};"
              ></div>
            `
          : null}
        ${showIndicator
          ? html`
              <div
                class="slider-indicator"
                style="left: ${indicatorLeft}; transition: ${this._isDragging ? "none" : "left 0.15s ease-out"};"
              ></div>
            `
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-light-slider": HaLightSlider;
  }
}
