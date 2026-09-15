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
- Frame-by-frame stepping with the arrow keys, or K held + J/L
- L plays forward, each further press speeds up: 1x, 2x, 4x, 8x
- J steps down: one rate slower while faster than 1x, pause at 1x, one frame back when paused. No reverse playback: Chrome and Firefox do not support it
- K pauses and resets to 1x
- Frame rate read from the mp4 header; manual selector as fallback and override (variable frame rate videos get an average)
- Capture the current frame at the video's native resolution, as JPG
- Each capture has its own fields: cue, title, description, notes, all optional, plus the video timestamp
- Cue is a separate field because cues get renumbered. Decimals allowed: `12`, `12.5`
- Captures are ordered by timestamp
- Capture view: video and a strip of captures with editable cue, title and description
- Contact sheet view: thumbnail grid with editable cue, title and description; notes only in the lightbox
- Clicking a capture's timestamp, or Go to frame in the lightbox, moves the video to that frame (disabled when no video is loaded)
- Lightbox: click a thumbnail; arrows to navigate, edit all fields, Delete removes, Esc goes back
- Editing = the text fields only. Image retouching is out of scope
- Download all: zip of images named `Q012.5_title.jpg`; without cue or title, the timestamp fills in
- Zip written in-house, uncompressed (JPG is already compressed), so the app stays a single file with no dependencies
- Save and open sessions as JSON with images and all fields embedded, to reopen without the video
- Autosave to IndexedDB: captures, fields, fps and video name survive a reload. The video itself is not stored; the app asks to re-open it by name
- IndexedDB, not localStorage: localStorage caps an origin at ~5 MB and a few dozen JPGs fill it (same reason titulus moved to IndexedDB)
- Clear button removes all captures, with confirmation
- If IndexedDB is unavailable, a warning shows in the header and closing the tab asks for confirmation
- Browser storage is not guaranteed: Chrome returns `false` to `navigator.storage.persist()` on `file://`. The JSON session is the durable record
