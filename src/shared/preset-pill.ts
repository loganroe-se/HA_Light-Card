import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { renderSvgIcon, resolvePresetIcon } from "../utils/icons";

@customElement("ha-light-preset-pill")
export class HaLightPresetPill extends LitElement {
  @property({ type: String })
  public name = "";

  @property({ type: String })
  public icon = "";

  @property({ type: String })
  public color = "#f5b72e";

  @property({ type: Boolean, reflect: true })
  public active = false;

  static override styles = css`
    :host {
      display: inline-block;
      user-select: none;
      -webkit-user-select: none;
    }

    button {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      height: 32px;
      padding: 0 14px 0 10px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.05);
      color: #ffffff;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      outline: none;
      white-space: nowrap;
      flex-shrink: 0;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: inherit;
    }

    button:hover {
      background: rgba(255, 255, 255, 0.14);
      border-color: rgba(255, 255, 255, 0.15);
    }

    button:active {
      transform: scale(0.95);
    }

    :host([active]) button {
      background: rgba(245, 158, 11, 0.2);
      border-color: rgba(245, 158, 11, 0.45);
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.25);
    }

    .preset-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
  `;

  protected override render() {
    const iconPath = resolvePresetIcon(this.icon);

    return html`
      <button part="button" title=${this.name}>
        <span class="preset-icon" style="color: ${this.color};">
          ${renderSvgIcon(iconPath, 16)}
        </span>
        <span>${this.name}</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-light-preset-pill": HaLightPresetPill;
  }
}
