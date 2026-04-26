# Intelligent Octopus Slots Card

A compact Home Assistant Lovelace card for displaying Intelligent Octopus dispatching information with a simple visual editor.

## Features

- Minimal, modern card layout
- Lovelace card picker support
- Visual editor with no YAML required for normal setup
- Auto-detect for Octopus Energy intelligent dispatching entities
- Manual entity override
- HACS-ready metadata

## Installation

1. Build the card:

   ```bash
   npm install
   npm run build
   ```

2. Add `dist/intelligent-octopus-slots-card.js` as a Lovelace resource.
3. Add the `Intelligent Octopus Slots` card from the card picker.

## Post-Install Setup

The card works with just your Octopus intelligent dispatching entity, but the optional `used` time display needs Home Assistant-side helpers or sensors.

### Basic Card Setup

In the visual editor:

1. Set `Intelligent Dispatching Entity` to your Octopus intelligent dispatching binary sensor.
2. Optionally use `Auto-detect` to populate it automatically.
3. Optionally configure:
   - `Used Slot Time Today Entity`
   - `Used Slot Time Tomorrow Entity`

If the used-time entities are not configured, the card will still show generated slot totals from `planned_dispatches`, but it will not show a used-time value.

### Create the Helpers in Home Assistant

The simplest setup is to create the tracking helpers in the Home Assistant UI:

1. Go to `Settings > Devices & Services > Helpers`.
2. Create a `Number` helper:
   - Name: `Intelligent Octopus Used Minutes Today`
   - Minimum: `0`
   - Maximum: `1440`
   - Step size: `1`
3. Create a second `Number` helper if you also want tomorrow tracked separately:
   - Name: `Intelligent Octopus Used Minutes Tomorrow`
   - Minimum: `0`
   - Maximum: `1440`
   - Step size: `1`
4. Create a `Date and/or time` helper:
   - Name: `Intelligent Octopus Last Counted Minute`
   - Enable both date and time

You can then select the resulting entities in the card editor:

- `Used Slot Time Today Entity` -> your today helper or sensor
- `Used Slot Time Tomorrow Entity` -> your tomorrow helper or sensor

### Supported Used-Time Units

The card accepts Home Assistant entities that expose used slot time in:

- minutes
- hours
- seconds

It reads `unit_of_measurement` and converts values internally before displaying compact text such as `45m`, `2h`, or `2h 30m`.

### Tracking Automation

To keep the helper values updated independently of `planned_dispatches` history, create:

1. A template binary sensor that reports whether the current time is inside an active Intelligent Octopus slot
2. An automation that runs every minute and increments the helper when a slot is active
3. A midnight reset automation

This keeps used slot time accurate even when the Octopus integration regenerates and replaces old `planned_dispatches` entries.

If you want to build this entirely in the Home Assistant UI:

1. Create the helpers above
2. Create the template binary sensor in `Settings > Devices & Services > Helpers`
3. Create the minute-tracking automation in `Settings > Automations & Scenes`
4. Create the midnight reset automation in `Settings > Automations & Scenes`

### Recommended Entity Mapping

- `dispatching_entity`: your Octopus intelligent dispatching binary sensor
- `used_slot_time_today_entity`: a Home Assistant helper or sensor that tracks used minutes for today
- `used_slot_time_tomorrow_entity`: an optional Home Assistant helper or sensor that tracks used minutes for tomorrow

## Configuration

- `title`
- `show_title`
- `dispatching_entity`
- `icon`
- `time_format`
- `condensed_view`
- `show_completed_slots`
- `used_slot_time_today_entity`
- `used_slot_time_tomorrow_entity`
