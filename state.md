---
created: 2026-09-15
last_updated: 2026-09-15
---

# lumina — project state

## Status
Draft. v0 written in index.html, tested with a generated 29.97 fps mp4.

## What it is
Web app to grab frames from a video of a theatre performance and keep a record of the show's lighting states.

`lumina`: Latin for "lights". Discarded: `lux`, `lumen`, `vestigium`, `tabella`, `lucerna`, `luminaria`, `scaena`.

## Design
- Single HTML file, no server, no install. The video never leaves the machine
- UI, code and documentation in English
- Load an mp4 and play it with standard controls
- Frame-by-frame stepping with the arrow keys
- Frame rate read from the mp4 header; manual selector as fallback and override (variable frame rate videos get an average)
- Capture the current frame at the video's native resolution, as JPG
- Each capture has its own fields: cue, title, description, notes, all optional, plus the video timestamp
- Cue is a separate field because cues get renumbered. Decimals allowed: `12`, `12.5`
- Captures are ordered by timestamp
- Capture view: video and a strip with the latest captures
- Contact sheet view: thumbnail grid with cue and title
- Lightbox: click a thumbnail; arrows to navigate, edit all fields, Delete removes, Esc goes back
- Editing = the text fields only. Image retouching is out of scope
- Download all: zip of images named `Q012.5_title.jpg`; without cue or title, the timestamp fills in
- Zip written in-house, uncompressed (JPG is already compressed), so the app stays a single file with no dependencies
- Save and open sessions as JSON with images and all fields embedded, to reopen without the video
- No autosave: warn before closing the tab with unsaved captures
