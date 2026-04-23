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

## Configuration

- `title`
- `show_title`
- `dispatching_entity`
