import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ha-light-subpreset-bubble")
export class HaLightSubpresetBubble extends LitElement {
  @property({ type: String })
  public variant: "brightness" | "temp" | "color" = "brightness";

  @property({ type: String })
  public label = "";

  @property({ type: String })
  public color = "";

  @property({ type: Number })
  public brightnessValue = 0;

  @property({ type: Boolean, reflect: true })
  public active = false;

  static override styles = css`
    :host {
      display: inline-block;
      user-select: none;
      -webkit-user-select: none;
      cursor: pointer;
    }

    button {
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.08);
      color: var(--primary-text-color, #ffffff);
      cursor: pointer;
      outline: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-sizing: border-box;
    }

    button:hover {
      border-color: rgba(255, 255, 255, 0.25);
    }

    button:active {
      transform: scale(0.92);
    }

    /* Brightness variant */
    :host([variant="brightness"]) button {
      height: 24px;
      min-width: 36px;
      padding: 0 7px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: -0.01em;
    }

    :host([variant="brightness"][active]) button {
      border-color: #ffffff;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.6), 0 0 0 1px #ffffff;
      transform: scale(1.05);
    }

    /* Temperature variant */
    :host([variant="temp"]) button {
      height: 24px;
      min-width: 44px;
      padding: 0 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      gap: 5px;
      letter-spacing: -0.01em;
    }

    :host([variant="temp"]) .temp-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    :host([variant="temp"][active]) button {
      border-color: #ffffff;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.4), 0 0 0 1px #ffffff;
      transform: scale(1.05);
    }

    /* Color variant (circles) */
    :host([variant="color"]) button {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      padding: 0;
      border: 2px solid rgba(255, 255, 255, 0.15);
      flex-shrink: 0;
    }

    :host([variant="color"]) button:hover {
      transform: scale(1.15);
      border-color: rgba(255, 255, 255, 0.6);
    }

    :host([variant="color"][active]) button {
      border-color: #ffffff;
      box-shadow: 0 0 12px rgba(255, 255, 255, 0.8), 0 0 0 1.5px #ffffff;
      transform: scale(1.18);
    }
  `;

  protected override render() {
    if (this.variant === "color") {
      return html`
        <button
          part="button"
          title=${this.label || this.color}
          style="background-color: ${this.color};"
        ></button>
      `;
    }

    if (this.variant === "temp") {
      return html`
        <button
          part="button"
          title=${this.label}
          style="background: color-mix(in srgb, ${this.color} 18%, rgba(255, 255, 255, 0.08)); border-color: color-mix(in srgb, ${this.color} 30%, rgba(255, 255, 255, 0.12));"
        >
          <span class="temp-dot" style="background-color: ${this.color}; box-shadow: 0 0 6px ${this.color};"></span>
          <span>${this.label}</span>
        </button>
      `;
    }

    // Brightness variant with dimmer/brighter indication
    const b = Math.max(0, Math.min(100, this.brightnessValue));
    const opacity = 0.1 + (b / 100) * 0.65;
    const glow = Math.round((b / 100) * 8);

    return html`
      <button
        part="button"
        title=${this.label || `${b}%`}
        style="background: rgba(245, 158, 11, ${opacity}); box-shadow: 0 0 ${glow}px rgba(245, 158, 11, ${(b / 100) * 0.35}); color: ${b > 50 ? '#ffffff' : 'rgba(255, 255, 255, 0.85)'};"
      >
        <span>${this.label || `${b}%`}</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-light-subpreset-bubble": HaLightSubpresetBubble;
  }
}
