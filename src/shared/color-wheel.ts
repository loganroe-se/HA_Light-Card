import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { hsvToRgb, RGB } from "../utils/colors";

export interface ColorWheelEventDetail {
  hue: number;
  saturation: number;
  rgb: RGB;
  isFinal: boolean;
}

@customElement("ha-light-color-wheel")
export class HaLightColorWheel extends LitElement {
  @property({ type: Number })
  public hue = 0;

  @property({ type: Number })
  public saturation = 100;

  @property({ type: Number })
  public size = 160;

  @state()
  private _isDragging = false;

  @state()
  private _dragHue: number | null = null;

  @state()
  private _dragSat: number | null = null;

  static override styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      -webkit-user-select: none;
      box-sizing: border-box;
    }

    .wheel-container {
      position: relative;
      border-radius: 50%;
      cursor: pointer;
      touch-action: none;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
      /* Conic gradient for 360° hue + radial gradient for saturation from center (white) to edge */
      background:
        radial-gradient(circle closest-side, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
        conic-gradient(from 0deg, #ff0000 0deg, #ffff00 60deg, #00ff00 120deg, #00ffff 180deg, #0000ff 240deg, #ff00ff 300deg, #ff0000 360deg);
    }

    .wheel-thumb {
      position: absolute;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 2.5px solid #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), inset 0 0 2px rgba(0, 0, 0, 0.3);
      transform: translate(-50%, -50%);
      pointer-events: none;
      transition: transform 0.08s ease;
    }

    :host([dragging]) .wheel-thumb {
      transform: translate(-50%, -50%) scale(1.15);
    }
  `;

  private _onPointerDown(e: PointerEvent) {
    e.preventDefault();
    const container = e.currentTarget as HTMLElement;
    container.setPointerCapture(e.pointerId);
    this._isDragging = true;
    this.setAttribute("dragging", "");
    this._handlePointer(e, false);
  }

  private _onPointerMove(e: PointerEvent) {
    if (!this._isDragging) return;
    e.preventDefault();
    this._handlePointer(e, false);
  }

  private _onPointerUp(e: PointerEvent) {
    if (!this._isDragging) return;
    e.preventDefault();
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (_) {}
    this._isDragging = false;
    this.removeAttribute("dragging");
    this._handlePointer(e, true);
    this._dragHue = null;
    this._dragSat = null;
  }

  private _onPointerCancel(e: PointerEvent) {
    if (!this._isDragging) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (_) {}
    this._isDragging = false;
    this.removeAttribute("dragging");
    this._dragHue = null;
    this._dragSat = null;
    this.requestUpdate();
  }

  private _handlePointer(e: PointerEvent, isFinal: boolean) {
    const container = this.shadowRoot?.querySelector(".wheel-container") as HTMLElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = rect.width / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Saturation: 0 at center, 100 at circumference
    const saturation = Math.max(0, Math.min(100, Math.round((distance / radius) * 100)));

    // Hue angle: 0deg is Top (12 o'clock)
    const angleRad = Math.atan2(dy, dx);
    let angleDeg = Math.round((angleRad * 180) / Math.PI) + 90;
    if (angleDeg < 0) angleDeg += 360;
    const hue = angleDeg % 360;

    this._dragHue = hue;
    this._dragSat = saturation;

    const rgb = hsvToRgb(hue, saturation, 100);

    this.dispatchEvent(
      new CustomEvent<ColorWheelEventDetail>(isFinal ? "color-wheel-change" : "color-wheel-input", {
        bubbles: true,
        composed: true,
        detail: {
          hue,
          saturation,
          rgb,
          isFinal
        }
      })
    );
  }

  protected override render() {
    const currentHue = this._isDragging && this._dragHue !== null ? this._dragHue : this.hue;
    const currentSat = this._isDragging && this._dragSat !== null ? this._dragSat : this.saturation;

    const radius = this.size / 2;
    // Math angle from Top (12 o'clock)
    const mathAngleRad = ((currentHue - 90) * Math.PI) / 180;
    const thumbDistance = (currentSat / 100) * (radius - 4);

    const thumbX = radius + thumbDistance * Math.cos(mathAngleRad);
    const thumbY = radius + thumbDistance * Math.sin(mathAngleRad);

    const activeRgb = hsvToRgb(currentHue, currentSat, 100);
    const thumbColor = `rgb(${activeRgb.r}, ${activeRgb.g}, ${activeRgb.b})`;

    return html`
      <div
        class="wheel-container"
        style="width: ${this.size}px; height: ${this.size}px;"
        @pointerdown=${this._onPointerDown}
        @pointermove=${this._onPointerMove}
        @pointerup=${this._onPointerUp}
        @pointercancel=${this._onPointerCancel}
      >
        <div
          class="wheel-thumb"
          style="left: ${thumbX}px; top: ${thumbY}px; background-color: ${thumbColor};"
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-light-color-wheel": HaLightColorWheel;
  }
}
