export interface HomeAssistant {
  states: Record<string, HassEntity>;
  localize: (key: string, ...args: unknown[]) => string;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: unknown): void;
}

export interface LovelaceCard {
  hass?: HomeAssistant;
  setConfig(config: unknown): void;
  getCardSize(): number;
}

export interface IntelligentOctopusSlotsCardConfig {
  type: string;
  title?: string;
  show_title?: boolean;
  icon?: string;
  condensed_view?: boolean;
  test_data?: boolean;
  dispatching_entity?: string;
}

export interface CardHelpersFormSchema {
  name: keyof Omit<IntelligentOctopusSlotsCardConfig, "type">;
  label: string;
  selector: Record<string, unknown>;
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }

  interface HTMLElementTagNameMap {
    "ha-card": HTMLElement;
    "ha-icon": HTMLElement & {
      icon?: string;
    };
    "ha-form": HTMLElement & {
      hass?: HomeAssistant;
      data?: Record<string, unknown>;
      schema?: CardHelpersFormSchema[];
      computeLabel?: (schema: CardHelpersFormSchema) => string;
    };
    "intelligent-octopus-slots-card": LovelaceCard;
    "intelligent-octopus-slots-card-editor": LovelaceCardEditor;
  }
}
