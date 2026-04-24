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

const primaryEditorSchema: CardHelpersFormSchema[] = [
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
];

const condensedEditorSchema: CardHelpersFormSchema[] = [
  {
    name: "condensed_view",
    label: "Condensed View",
    selector: {
      boolean: {},
    },
  },
];

const completedSlotsEditorSchema: CardHelpersFormSchema[] = [
  {
    name: "show_completed_slots",
    label: "Show Completed Slots",
    selector: {
      boolean: {},
    },
  },
];

const testDataEditorSchema: CardHelpersFormSchema[] = [
  {
    name: "test_data",
    label: "Test Data",
    selector: {
      boolean: {},
    },
  },
];

const entityEditorSchema: CardHelpersFormSchema[] = [
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

interface DurationSummary {
  totalMinutes: number;
  longestDayMinutes: number;
  dayCount: number;
}

const parsePlannedDispatches = (value: unknown, options?: { includePast?: boolean }): PlannedDispatchSlot[] => {
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

      if (!options?.includePast && endDate.getTime() <= now) {
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

const formatCondensedDate = (value: Date): string =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(value);

const formatDuration = (startDate: Date, endDate: Date): string => {
  const minutes = Math.max(0, Math.round((endDate.getTime() - startDate.getTime()) / 60000));
  return formatMinutes(minutes);
};

const formatMinutes = (minutes: number): string => {
  const safeMinutes = Math.max(0, Math.round(minutes));
  if (safeMinutes < 60) {
    return `${safeMinutes}m`;
  }

  const hours = Math.floor(safeMinutes / 60);
  const remainder = safeMinutes % 60;
  return remainder ? `${hours}h ${remainder}m` : `${hours}h`;
};

const getDurationSummary = (slotGroups: PlannedDispatchGroup[]): DurationSummary => {
  let totalMinutes = 0;
  let longestDayMinutes = 0;

  for (const group of slotGroups) {
    const dayMinutes = group.slots.reduce(
      (sum, slot) => sum + Math.max(0, Math.round((slot.endDate.getTime() - slot.startDate.getTime()) / 60000)),
      0,
    );

    totalMinutes += dayMinutes;
    longestDayMinutes = Math.max(longestDayMinutes, dayMinutes);
  }

  return {
    totalMinutes,
    longestDayMinutes,
    dayCount: slotGroups.length,
  };
};

const formatSummaryDuration = (summary: DurationSummary): string => {
  if (summary.dayCount <= 1) {
    return formatMinutes(summary.totalMinutes);
  }

  return `${formatMinutes(summary.totalMinutes)} total`;
};

// TEMP TEST DATA - remove before stable release
const toLocalIsoString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absOffset = Math.abs(offsetMinutes);
  const offsetHours = String(Math.floor(absOffset / 60)).padStart(2, "0");
  const offsetMins = String(absOffset % 60).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMins}`;
};

// TEMP TEST DATA - remove before stable release
const createSamplePlannedDispatches = (): Array<{ start: string; end: string }> => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const samples: Array<[number, number, number, number, number]> = [
    [0, 30, 2, 30, 0],
    [3, 0, 5, 0, 0],
    [6, 0, 8, 0, 0],
    [23, 0, 0, 0, 1],
    [0, 30, 2, 0, 1],
    [3, 0, 4, 30, 1],
  ];

  return samples.map(([startHour, startMinute, endHour, endMinute, dayOffset]) => ({
    start: toLocalIsoString(new Date(year, month, day + dayOffset - (endHour === 0 && endMinute === 0 && dayOffset === 1 ? 1 : 0), startHour, startMinute, 0, 0)),
    end: toLocalIsoString(new Date(year, month, day + dayOffset, endHour, endMinute, 0, 0)),
  }));
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
      condensed_view: false,
      show_completed_slots: true,
      test_data: false,
      dispatching_entity: detectDispatchingEntity(hass),
    };
  }

  public setConfig(config: IntelligentOctopusSlotsCardConfig): void {
    if (!config?.type) {
      throw new Error("Invalid configuration");
    }

    this._config = {
      show_title: true,
      show_completed_slots: true,
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
    const rawPlannedDispatches = this._config.test_data
      ? createSamplePlannedDispatches()
      : entity?.attributes.planned_dispatches;
    const allSlots = parsePlannedDispatches(rawPlannedDispatches, {
      includePast: true,
    });
    const now = Date.now();
    const includeCompletedSlots = this._config.condensed_view ? false : this._config.show_completed_slots !== false;
    const slots = includeCompletedSlots ? allSlots : allSlots.filter((slot) => slot.endDate.getTime() > now);
    const summarySlotGroups = groupSlotsByDate(allSlots);
    const durationSummary = getDurationSummary(summarySlotGroups);
    const slotCount = allSlots.length;
    const summaryDate =
      summarySlotGroups.length === 1 && slotCount ? formatSummaryDate(allSlots[0].startDate) : undefined;
    const slotGroups = groupSlotsByDate(slots);
    const title = this._config.title || "Intelligent Octopus Slots";
    const icon = this._config.icon || DEFAULT_ICON;
    const showCondensedDate = slotGroups.length > 1;
    const isActiveSampleSlot = this._config.test_data
      ? allSlots.some((slot) => {
          return slot.startDate.getTime() <= now && now < slot.endDate.getTime();
        })
      : false;
    const statusText = this._config.test_data ? (isActiveSampleSlot ? "on" : "off") : entity?.state ?? "unknown";
    const statusIsActive = this._config.test_data ? isActiveSampleSlot : entity?.state === "on";
    // Long-day warnings are based on any single day's generated slot total.
    // Exactly 6h does not warn; only totals greater than 6h trigger the badge.
    const hasLongDay = durationSummary.longestDayMinutes > 360;

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
                        <span>${slotCount} slot${slotCount === 1 ? "" : "s"}</span>
                        <span class="summary-dot"></span>
                        <span class="duration-total">${formatSummaryDuration(durationSummary)}</span>
                        ${summaryDate
                          ? html`<span class="summary-dot"></span>${summaryDate}`
                          : html`<span class="summary-dot"></span>${summarySlotGroups.length} scheduled day${summarySlotGroups.length === 1 ? "" : "s"}`}
                        ${hasLongDay
                          ? html`
                              <span class="summary-dot"></span>
                              <span class="duration-alert">
                                <span>${formatMinutes(durationSummary.longestDayMinutes)} today</span>
                              </span>
                            `
                          : nothing}
                      `
                    : html`No charging slots scheduled`}
                </div>
              </div>
            </div>

            <div class="status-pill ${statusIsActive ? "active" : ""}">
              ${statusText}
            </div>
          </div>

          ${slots.length
            ? html`
                <div class="section">
                  ${this._config.condensed_view
                    ? html`
                        <div class="slot-list slot-list-condensed" role="list">
                          ${slots.map(
                            (slot) => html`
                              <div class="slot-chip slot-chip-condensed" role="listitem">
                                <div class="slot-times">
                                  ${showCondensedDate
                                    ? html`<span class="slot-date">${formatCondensedDate(slot.startDate)}</span>`
                                    : nothing}
                                  <span>${formatTimeRange(slot)}</span>
                                </div>
                              </div>
                            `,
                          )}
                        </div>
                      `
                    : html`
                        <div class="slot-groups">
                          ${slotGroups.map(
                            (group) => html`
                              <section class="slot-group" aria-label=${group.label}>
                                ${slotGroups.length > 1 ? html`<div class="group-label">${group.label}</div>` : nothing}
                                <div class="slot-list slot-list-regular">
                                  ${group.slots.map(
                                    (slot) => {
                                      const isPast = slot.endDate.getTime() <= now;

                                      return html`
                                      <div class="slot-chip ${isPast ? "past" : ""}">
                                        <div class="slot-times">${formatTimeRange(slot)}</div>
                                        <div class="slot-meta-wrap">
                                          ${isPast ? html`<span class="past-badge">Complete</span>` : nothing}
                                          <div class="slot-meta">${formatDuration(slot.startDate, slot.endDate)}</div>
                                        </div>
                                      </div>
                                    `;
                                    },
                                  )}
                                </div>
                              </section>
                            `,
                          )}
                        </div>
                      `}
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

    .duration-total,
    .duration-alert {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: var(--secondary-text-color);
      line-height: 1.1;
      white-space: nowrap;
    }

    .duration-alert {
      padding: 2px 7px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--warning-color, #f59e0b) 16%, var(--secondary-background-color, transparent));
      color: var(--warning-color, #f59e0b);
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
      flex: 0 0 auto;
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

    .slot-list-regular {
      display: grid;
      gap: 3px;
      padding-right: 2px;
    }

    .slot-list-condensed {
      flex-wrap: wrap;
      align-items: center;
      column-gap: 4px;
      row-gap: 2px;
      width: 100%;
    }

    .slot-groups {
      display: grid;
      gap: 4px;
    }

    .slot-group {
      display: grid;
      gap: 3px;
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
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      width: 100%;
      min-width: 0;
      padding: 4px 10px;
      border-radius: 999px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      color: var(--primary-text-color);
    }

    .slot-chip.past {
      opacity: 0.68;
      color: var(--secondary-text-color);
    }

    .slot-chip-condensed {
      width: auto;
      flex: 0 0 auto;
      max-width: fit-content;
      min-width: 0;
      padding: 4px 7px;
      gap: 6px;
    }

    .slot-times {
      min-width: 0;
      font-size: 0.82rem;
      font-weight: 600;
    }

    .slot-chip-condensed .slot-times {
      font-size: 0.76rem;
      line-height: 1.05;
      white-space: normal;
      overflow-wrap: anywhere;
    }

    .slot-date {
      color: var(--secondary-text-color);
      font-weight: 500;
      margin-right: 4px;
    }

    .slot-meta {
      font-size: 0.7rem;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    .slot-meta-wrap {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .past-badge {
      display: inline-flex;
      align-items: center;
      padding: 2px 5px;
      border-radius: 999px;
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--secondary-text-color) 10%, transparent);
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

      .slot-chip-condensed {
        width: auto;
        max-width: fit-content;
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
      show_completed_slots: true,
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
          .schema=${primaryEditorSchema}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${condensedEditorSchema}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Displays slots in a more compact inline layout.</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${completedSlotsEditorSchema}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Completed slots will not be shown in the condensed view</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${testDataEditorSchema}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Temporary testing option. Uses sample slots instead of the selected entity.</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${entityEditorSchema}
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
      gap: 10px;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      overflow-x: hidden;
    }

    ha-form {
      display: block;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      overflow: hidden;
    }

    .helper-text {
      margin-top: -10px;
      font-size: 0.76rem;
      line-height: 1.25;
      color: var(--secondary-text-color);
      opacity: 0.82;
      max-width: 100%;
      min-width: 0;
      overflow-wrap: anywhere;
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

    @media (max-width: 480px) {
      :host {
        display: block;
        max-width: 100%;
        min-width: 0;
        overflow-x: hidden;
      }

      .editor-shell {
        gap: 8px;
      }

      ha-form,
      .helper-text {
        max-width: 100%;
        min-width: 0;
      }

      .helper-text {
        margin-top: -12px;
        font-size: 0.72rem;
      }

      .detect-button {
        max-width: 100%;
      }
    }
  `;
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "intelligent-octopus-slots-card",
  name: "Intelligent Octopus Slots Card",
  description: "Displays Intelligent Octopus charging slots.",
});
