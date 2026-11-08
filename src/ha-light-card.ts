import "./cards/light-card/light-card";
import "./cards/light-card/light-card-editor";

declare global {
  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-light-card",
  name: "HA Light Card",
  description: "A sleek, modern custom light card with real-time brightness, temp, color, and presets",
  preview: true,
  documentationURL: "https://github.com/loganroe-se/HA_Light-Card"
});

console.info(
  `%c HA-LIGHT-CARD %c v1.0.0 `,
  "color: white; background: #f59e0b; font-weight: 700;",
  "color: #f59e0b; background: #1c1c1e; font-weight: 700;"
);
