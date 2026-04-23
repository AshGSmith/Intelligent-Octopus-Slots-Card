import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  CardHelpersFormSchema,
  HomeAssistant,
  IntelligentOctopusSlotsCardConfig,
  LovelaceCardEditor,
} from "./types";

const CARD_TYPE = "custom:intelligent-octopus-slots-card";
const DEFAULT_ICON = "mdi:ev-station";

const AUTO_DETECT_PATTERNS = [
  "intelligent_dispatch",
  "intelligent_dispatching",
  "intelligent_dispatching_status",
  "octopus_intelligent_dispatch",
];

const editorSchema: CardHelpersFormSchema[] = [
  {
    name: "title",
    label: "Title",
    selector: {
      text: {},
    },
  },
  {
    name: "show_title",
    label: "Show Title",
    selector: {
      boolean: {},
    },
  },
  {
    name: "icon",
    label: "Icon",
    selector: {
      icon: {},
    },
  },
  {
    name: "dispatching_entity",
    label: "Intelligent Dispatching Entity",
    selector: {
      entity: {},
    },
  },
];

const fireEvent = (node: HTMLElement, type: string, detail?: Record<string, unknown>) => {
  node.dispatchEvent(
    new CustomEvent(type, {
      detail,
      bubbles: true,
      composed: true,
    }),
  );
};

interface PlannedDispatchSlot {
  start: string;
  end: string;
  startDate: Date;
  endDate: Date;
}

interface PlannedDispatchGroup {
  key: string;
  label: string;
  slots: PlannedDispatchSlot[];
}

const parsePlannedDispatches = (value: unknown): PlannedDispatchSlot[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  const now = Date.now();

  return value
    .map((slot) => {
      if (!slot || typeof slot !== "object") {
        return null;
      }

      const start = (slot as Record<string, unknown>).start;
      const end = (slot as Record<string, unknown>).end;

      if (typeof start !== "string" || typeof end !== "string") {
        return null;
      }

      const startDate = new Date(start);
      const endDate = new Date(end);

      if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        return null;
      }

      if (endDate.getTime() <= now) {
        return null;
      }

      return { start, end, startDate, endDate };
    })
    .filter((slot): slot is PlannedDispatchSlot => slot !== null)
    .sort((left, right) => left.startDate.getTime() - right.startDate.getTime());
};

const formatTime = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

const formatSummaryDate = (value: Date): string =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(value);

const formatGroupDate = (value: Date): string =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(value);

const getSlotDateKey = (value: Date): string => value.toISOString().slice(0, 10);

const groupSlotsByDate = (slots: PlannedDispatchSlot[]): PlannedDispatchGroup[] => {
  const groups = new Map<string, PlannedDispatchGroup>();

  for (const slot of slots) {
    const key = getSlotDateKey(slot.startDate);
    const existing = groups.get(key);

    if (existing) {
      existing.slots.push(slot);
      continue;
    }

    groups.set(key, {
      key,
      label: formatGroupDate(slot.startDate),
      slots: [slot],
    });
  }

  return Array.from(groups.values());
};

const formatTimeRange = (slot: PlannedDispatchSlot): string => `${formatTime(slot.start)} - ${formatTime(slot.end)}`;

const formatDuration = (startDate: Date, endDate: Date): string => {
  const minutes = Math.max(0, Math.round((endDate.getTime() - startDate.getTime()) / 60000));
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours}h ${remainder}m` : `${hours}h`;
};

const detectDispatchingEntity = (hass?: HomeAssistant): string | undefined => {
  if (!hass) {
    return undefined;
  }

  const entities = Object.values(hass.states);

  const exactMatch = entities.find((entity) => {
    const attributes = entity.attributes;
    const integration = attributes.integration;
    const deviceClass = attributes.device_class;
    const uniqueId = attributes.unique_id;

    const text = [
      entity.entity_id,
      typeof integration === "string" ? integration : "",
      typeof deviceClass === "string" ? deviceClass : "",
      typeof uniqueId === "string" ? uniqueId : "",
    ]
      .join(" ")
      .toLowerCase();

    return text.includes("octopus") && AUTO_DETECT_PATTERNS.some((pattern) => text.includes(pattern));
  });

  if (exactMatch) {
    return exactMatch.entity_id;
  }

  return entities.find((entity) => {
    const id = entity.entity_id.toLowerCase();
    return id.includes("octopus") && id.includes("dispatch");
  })?.entity_id;
};

@customElement("intelligent-octopus-slots-card")
export class IntelligentOctopusSlotsCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: IntelligentOctopusSlotsCardConfig;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("intelligent-octopus-slots-card-editor");
  }

  public static getStubConfig(hass?: HomeAssistant): IntelligentOctopusSlotsCardConfig {
    return {
      type: CARD_TYPE,
      title: "Intelligent Octopus Slots",
      show_title: true,
      icon: DEFAULT_ICON,
      dispatching_entity: detectDispatchingEntity(hass),
    };
  }

  public setConfig(config: IntelligentOctopusSlotsCardConfig): void {
    if (!config?.type) {
      throw new Error("Invalid configuration");
    }

    this._config = {
      show_title: true,
      ...config,
    };
  }

  public getCardSize(): number {
    return 2;
  }

  protected render() {
    if (!this._config) {
      return nothing;
    }

    const entity = this._config.dispatching_entity ? this.hass?.states[this._config.dispatching_entity] : undefined;
    const slots = parsePlannedDispatches(entity?.attributes.planned_dispatches);
    const slotGroups = groupSlotsByDate(slots);
    const slotCount = slots.length;
    const summaryDate = slotGroups.length === 1 && slotCount ? formatSummaryDate(slots[0].startDate) : undefined;
    const title = this._config.title || "Intelligent Octopus Slots";
    const icon = this._config.icon || DEFAULT_ICON;

    return html`
      <ha-card>
        <div class="card-shell">
          <div class="header">
            <div class="header-main">
              <div class="icon-badge" aria-hidden="true">
                <ha-icon .icon=${icon}></ha-icon>
              </div>
              <div class="title-block">
                ${this._config.show_title ? html`<h2>${title}</h2>` : nothing}
                <div class="summary-line">
                  ${slotCount
                    ? html`
                        ${slotCount} upcoming slot${slotCount === 1 ? "" : "s"}
                        ${summaryDate
                          ? html`<span class="summary-dot"></span>${summaryDate}`
                          : html`<span class="summary-dot"></span>${slotGroups.length} scheduled day${slotGroups.length === 1 ? "" : "s"}`}
                      `
                    : html`No charging slots scheduled`}
                </div>
              </div>
            </div>

            <div class="status-pill ${entity?.state === "on" ? "active" : ""}">
              ${entity?.state ?? "unknown"}
            </div>
          </div>

          ${slots.length
            ? html`
                <div class="section">
                  <div class="slot-groups">
                    ${slotGroups.map(
                      (group) => html`
                        <section class="slot-group" aria-label=${group.label}>
                          ${slotGroups.length > 1 ? html`<div class="group-label">${group.label}</div>` : nothing}
                          <div class="slot-list">
                            ${group.slots.map(
                              (slot) => html`
                                <div class="slot-chip">
                                  <div class="slot-times">${formatTimeRange(slot)}</div>
                                  <div class="slot-meta">${formatDuration(slot.startDate, slot.endDate)}</div>
                                </div>
                              `,
                            )}
                          </div>
                        </section>
                      `,
                    )}
                  </div>
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color);
      box-shadow: var(--ha-card-box-shadow, none);
    }

    .card-shell {
      padding: 12px;
      display: grid;
      gap: 10px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .header-main {
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .icon-badge {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      display: grid;
      place-items: center;
      color: var(--primary-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      flex: 0 0 auto;
    }

    .icon-badge ha-icon {
      width: 18px;
      height: 18px;
      display: block;
    }

    .title-block {
      min-width: 0;
    }

    h2 {
      margin: 0;
      font-size: 0.96rem;
      font-weight: 600;
      line-height: 1.2;
      color: var(--primary-text-color);
    }

    .summary-line {
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      font-size: 0.8rem;
      color: var(--secondary-text-color);
    }

    .summary-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--secondary-text-color);
      opacity: 0.5;
    }

    .status-pill {
      padding: 5px 8px;
      border-radius: 999px;
      font-size: 0.68rem;
      font-weight: 600;
      text-transform: capitalize;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    .status-pill.active {
      background: color-mix(in srgb, var(--success-color, #43a047) 16%, var(--secondary-background-color, transparent));
      color: var(--success-color, #43a047);
    }

    .section {
      padding: 0;
    }

    .slot-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .slot-groups {
      display: grid;
      gap: 8px;
    }

    .slot-group {
      display: grid;
      gap: 6px;
    }

    .group-label {
      font-size: 0.68rem;
      line-height: 1.1;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      padding-left: 2px;
    }

    .slot-chip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-width: min(100%, 148px);
      padding: 7px 10px;
      border-radius: 999px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      color: var(--primary-text-color);
    }

    .slot-times {
      min-width: 0;
      font-size: 0.82rem;
      font-weight: 600;
    }

    .slot-meta {
      font-size: 0.7rem;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    @media (max-width: 480px) {
      .header {
        align-items: flex-start;
      }

      .header-main {
        gap: 8px;
      }

      .icon-badge {
        width: 32px;
        height: 32px;
        border-radius: 10px;
      }

      .slot-chip {
        width: 100%;
      }
    }
  `;
}

@customElement("intelligent-octopus-slots-card-editor")
export class IntelligentOctopusSlotsCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: IntelligentOctopusSlotsCardConfig;

  public setConfig(config: IntelligentOctopusSlotsCardConfig): void {
    this._config = {
      show_title: true,
      ...config,
      type: CARD_TYPE,
    };
  }

  private _computeLabel = (schema: CardHelpersFormSchema): string => schema.label;

  private _valueChanged(event: CustomEvent): void {
    const value = (event.detail?.value ?? {}) as Partial<IntelligentOctopusSlotsCardConfig>;
    this._config = {
      ...this._config,
      ...value,
      type: CARD_TYPE,
    };

    fireEvent(this, "config-changed", {
      config: this._config,
    });
  }

  private _autoDetect(): void {
    const detected = detectDispatchingEntity(this.hass);
    if (!detected) {
      fireEvent(this, "hass-notification", {
        message: "No Octopus intelligent dispatching entity found.",
      });
      return;
    }

    this._config = {
      ...this._config,
      type: CARD_TYPE,
      dispatching_entity: detected,
    };

    fireEvent(this, "config-changed", {
      config: this._config,
    });
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    return html`
      <div class="editor-shell">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${editorSchema}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <button class="detect-button" type="button" @click=${this._autoDetect}>Auto-detect</button>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .editor-shell {
      display: grid;
      gap: 16px;
    }

    .detect-button {
      justify-self: start;
      border: 0;
      border-radius: 999px;
      padding: 10px 14px;
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font: inherit;
      cursor: pointer;
    }
  `;
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "intelligent-octopus-slots-card",
  name: "Intelligent Octopus Slots Card",
  description: "Displays Intelligent Octopus charging slots.",
});
