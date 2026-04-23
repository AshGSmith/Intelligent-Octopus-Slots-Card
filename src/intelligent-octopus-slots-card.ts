import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  CardHelpersFormSchema,
  HassEntity,
  HomeAssistant,
  IntelligentOctopusSlotsCardConfig,
  LovelaceCardEditor,
} from "./types";

const CARD_TYPE = "custom:intelligent-octopus-slots-card";

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

const friendlyState = (entity?: HassEntity): string => {
  if (!entity) {
    return "Unavailable";
  }

  const friendlyName = entity.attributes.friendly_name;
  return typeof friendlyName === "string" && friendlyName.trim() ? friendlyName : entity.entity_id;
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
    const isConfigured = Boolean(this._config.dispatching_entity);
    const slotCount = slots.length;
    const summaryDate = slotGroups.length === 1 && slotCount ? formatSummaryDate(slots[0].startDate) : undefined;
    const title = this._config.title || "Intelligent Octopus Slots";

    return html`
      <ha-card>
        <div class="card-shell">
          <div class="header">
            <div class="header-main">
              <div class="icon-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path
                    d="M7 4a2 2 0 0 0-2 2v11a3 3 0 0 0 3 3h5v-2H8a1 1 0 0 1-1-1v-4h5a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H7Zm0 2h5v5H7V6Zm10.59 1L14 12h3v5h2v-5h3l-4.59-5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div class="title-block">
                <div class="eyebrow">Intelligent Charging</div>
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

          <div class="hero">
            <div class="hero-copy">
              <div class="label">Dispatching Entity</div>
              <div class="value">${isConfigured ? friendlyState(entity) : "Not configured"}</div>
            </div>
            ${this._config.dispatching_entity
              ? html`<div class="entity-id">${this._config.dispatching_entity}</div>`
              : html`<div class="entity-id">Use the visual editor to select an entity</div>`}
          </div>

          <div class="section">
            ${slots.length
              ? html`
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
                `
              : html`
                  <div class="empty-state">
                    <div class="empty-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path
                          d="M7 4a2 2 0 0 0-2 2v11a3 3 0 0 0 3 3h5v-2H8a1 1 0 0 1-1-1v-4h5a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H7Zm0 2h5v5H7V6Zm11.71 8.29-1.42-1.42L15 15.17l-1.29-1.3-1.42 1.42L15 18l3.71-3.71Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div class="empty-title">No charging slots scheduled</div>
                    <div class="empty-copy">Your upcoming off-peak dispatches will appear here automatically.</div>
                  </div>
                `
            }
          </div>
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
      border: 1px solid rgba(150, 175, 196, 0.24);
      border-radius: 22px;
      background:
        radial-gradient(circle at top right, rgba(173, 216, 255, 0.5), transparent 36%),
        radial-gradient(circle at bottom left, rgba(210, 244, 235, 0.6), transparent 34%),
        linear-gradient(180deg, #f9fbfe 0%, #f2f7fb 100%);
      color: #163047;
      box-shadow: 0 14px 34px rgba(75, 102, 129, 0.14);
    }

    .card-shell {
      padding: 16px;
      display: grid;
      gap: 12px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .header-main {
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .icon-badge {
      width: 42px;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      color: #2464a9;
      background: linear-gradient(135deg, rgba(188, 222, 255, 0.95), rgba(225, 246, 255, 0.92));
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
      flex: 0 0 auto;
    }

    .icon-badge svg {
      width: 22px;
      height: 22px;
    }

    .title-block {
      min-width: 0;
    }

    .eyebrow,
    .label {
      font-size: 0.68rem;
      line-height: 1.1;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(38, 72, 101, 0.58);
    }

    h2 {
      margin: 4px 0 0;
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.2;
      color: #163047;
    }

    .summary-line {
      margin-top: 5px;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      font-size: 0.84rem;
      color: rgba(22, 48, 71, 0.76);
    }

    .summary-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(36, 100, 169, 0.35);
    }

    .status-pill {
      padding: 7px 10px;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: capitalize;
      background: rgba(255, 255, 255, 0.7);
      color: rgba(22, 48, 71, 0.7);
      white-space: nowrap;
      border: 1px solid rgba(137, 173, 198, 0.28);
    }

    .status-pill.active {
      background: rgba(212, 246, 229, 0.95);
      color: #16734c;
      border-color: rgba(96, 193, 141, 0.34);
    }

    .hero,
    .section {
      padding: 12px 14px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.62);
      border: 1px solid rgba(163, 191, 212, 0.22);
      backdrop-filter: blur(10px);
    }

    .hero {
      display: grid;
      gap: 8px;
    }

    .value {
      margin-top: 4px;
      font-size: 0.96rem;
      font-weight: 600;
      color: #163047;
    }

    .entity-id {
      font-size: 0.78rem;
      color: rgba(22, 48, 71, 0.58);
      word-break: break-word;
    }

    .slot-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .slot-groups {
      display: grid;
      gap: 10px;
    }

    .slot-group {
      display: grid;
      gap: 8px;
    }

    .group-label {
      font-size: 0.72rem;
      line-height: 1.1;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(38, 72, 101, 0.58);
      padding-left: 4px;
    }

    .slot-chip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      min-width: min(100%, 148px);
      padding: 9px 12px;
      border-radius: 999px;
      background: linear-gradient(180deg, rgba(233, 245, 255, 0.95), rgba(245, 251, 255, 0.98));
      border: 1px solid rgba(160, 196, 221, 0.42);
      color: #163047;
    }

    .slot-times {
      min-width: 0;
      font-size: 0.86rem;
      font-weight: 600;
    }

    .slot-meta {
      font-size: 0.74rem;
      color: rgba(22, 48, 71, 0.58);
      white-space: nowrap;
    }

    .empty-state {
      display: grid;
      gap: 6px;
      min-height: 94px;
      justify-items: start;
      align-content: center;
      padding: 6px 2px;
    }

    .empty-icon {
      width: 34px;
      height: 34px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      color: #2464a9;
      background: linear-gradient(135deg, rgba(226, 240, 255, 0.95), rgba(237, 248, 255, 0.98));
      border: 1px solid rgba(160, 196, 221, 0.42);
    }

    .empty-icon svg {
      width: 18px;
      height: 18px;
    }

    .empty-title {
      font-size: 0.92rem;
      font-weight: 600;
      color: #163047;
    }

    .empty-copy {
      font-size: 0.8rem;
      color: rgba(22, 48, 71, 0.58);
    }

    @media (max-width: 480px) {
      .header {
        align-items: flex-start;
      }

      .header-main {
        gap: 10px;
      }

      .icon-badge {
        width: 38px;
        height: 38px;
        border-radius: 12px;
      }

      .slot-chip {
        width: 100%;
      }

      .summary-line {
        gap: 6px;
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
  type: CARD_TYPE,
  name: "Intelligent Octopus Slots",
  description: "A compact card for Octopus intelligent dispatching information.",
});
