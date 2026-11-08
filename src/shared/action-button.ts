import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ha-light-action-button")
export class HaLightActionButton extends LitElement {
  @property({ type: Boolean, reflect: true })
  public active = false;

  @property({ type: String })
  public variant: "power" | "adaptive" | "mode" | "toggle" = "mode";

  @property({ type: String })
  public customColor = "";

  @property({ type: String })
  public customBg = "";

  @property({ type: String })
  public customBorder = "";

  @property({ type: String })
  public customShadow = "";

  static override styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }

    button {
      border: 1px solid rgba(255, 255, 255, 0.05);
      background: rgba(255, 255, 255, 0.08);
      color: #9ca3af;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      outline: none;
      padding: 0;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
      -webkit-user-select: none;
      box-sizing: border-box;
    }

    button:hover {
      background: rgba(255, 255, 255, 0.14);
      color: #ffffff;
      transform: scale(1.04);
    }

    button:active {
      transform: scale(0.92);
    }

    /* Circle action buttons (Sun, Power, Custom Toggles) */
    :host([variant="power"]) button,
    :host([variant="adaptive"]) button,
    :host([variant="toggle"]) button {
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }

    /* Mode switcher buttons (Brightness, Temp, Color) */
    :host([variant="mode"]) button {
      width: 42px;
      height: 48px;
      border-radius: 14px;
      background: var(--mode-btn-bg, rgba(255, 255, 255, 0.08));
      border: 1px solid var(--mode-btn-border, rgba(255, 255, 255, 0.06));
      color: var(--mode-btn-color, #9ca3af);
      box-shadow: var(--mode-btn-shadow, none);
    }

    :host([variant="mode"]) button:hover {
      filter: brightness(1.22);
      transform: scale(1.05);
      border-color: var(--mode-btn-border, rgba(255, 255, 255, 0.35));
    }

    /* Active Power Button */
    :host([variant="power"][active]) button {
      background: #3d2616;
      border-color: rgba(245, 158, 11, 0.45);
      color: #f59e0b;
      box-shadow: 0 0 14px rgba(245, 158, 11, 0.28);
    }

    /* Active Adaptive Lighting Button */
    :host([variant="adaptive"][active]) button {
      background: #382a0e;
      border-color: rgba(245, 183, 46, 0.4);
      color: #f5b72e;
      box-shadow: 0 0 14px rgba(245, 183, 46, 0.28);
    }

    /* Active Custom Toggle Button */
    :host([variant="toggle"][active]) button {
      background: var(--toggle-btn-bg, #3d2616);
      border-color: var(--toggle-btn-border, rgba(245, 158, 11, 0.45));
      color: var(--toggle-btn-color, #f59e0b);
      box-shadow: var(--toggle-btn-shadow, 0 0 14px rgba(245, 158, 11, 0.28));
    }

    /* Active Mode Button */
    :host([variant="mode"][active]) button {
      border: 1.5px solid #ffffff;
      box-shadow: var(--mode-btn-shadow, 0 2px 8px rgba(0, 0, 0, 0.3)), 0 0 12px rgba(255, 255, 255, 0.45);
      transform: scale(1.05);
    }
  `;

  protected override render() {
    const inlineStyles: string[] = [];
    if (this.customColor) {
      inlineStyles.push(`--mode-btn-color: ${this.customColor};`);
      inlineStyles.push(`--toggle-btn-color: ${this.customColor};`);
    }
    if (this.customBg) {
      inlineStyles.push(`--mode-btn-bg: ${this.customBg};`);
      inlineStyles.push(`--toggle-btn-bg: ${this.customBg};`);
    }
    if (this.customBorder) {
      inlineStyles.push(`--mode-btn-border: ${this.customBorder};`);
      inlineStyles.push(`--toggle-btn-border: ${this.customBorder};`);
    }
    if (this.customShadow) {
      inlineStyles.push(`--mode-btn-shadow: ${this.customShadow};`);
      inlineStyles.push(`--toggle-btn-shadow: ${this.customShadow};`);
    }

    return html`
      <button part="button" style=${inlineStyles.length ? inlineStyles.join(" ") : null}>
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-light-action-button": HaLightActionButton;
  }
}
