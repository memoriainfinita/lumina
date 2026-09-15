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
- Shift+Left/Right jumps 1 s, Ctrl+Left/Right jumps 5 s
- Frame rate read from the mp4 header; manual selector as fallback and override (variable frame rate videos get an average)
- In point: I or Set in marks the current frame, or type it as video time (HH:MM:SS.ff); × resets to 0. No out point
- Show time counts from the in point and starts at 00:00:00.00; negative before it. Used in the timecode, thumbnails, lightbox and zip names
- Captures store the real video time, so moving the in point relabels them and Go to frame stays exact
- The in point is kept in browser storage and in the JSON session; opening a different video resets it to 0
- Capture the current frame at the video's native resolution, as JPG
- Each capture has its own fields: cue, title, description, notes, all optional, plus the video timestamp
- Cue is a separate field because cues get renumbered. Decimals allowed: `12`, `12.5`
- Captures are ordered by timestamp
- Capture view: video and a strip of captures with editable cue, title and description
- Contact sheet view: thumbnail grid with editable cue, title and description; notes only in the lightbox. Title and description wrap and the card grows, so no text is cut; the capture strip keeps single-line fields
- Capture time is read at the moment the frame is drawn, before JPG encoding, so captures taken while playing or seeking are labelled with their own frame
- Shortcut legend: ? key or the ? button in the header; Esc, ? or a click outside closes it
- Clicking a capture's timestamp, or Go to frame in the lightbox, moves the video to that frame (disabled when no video is loaded)
- Lightbox: click a thumbnail; arrows to navigate, edit all fields, Delete key removes, Esc goes back
- Delete from every view (× on each thumbnail, Delete in the lightbox) without confirmation: an Undo toast shows for 8 s and Ctrl+Z restores deletions one by one during the session. Clear keeps its confirmation
- Editing = the text fields only. Image retouching is out of scope
- Download all: zip of images named `Q012.5_title.jpg`; without cue or title, the timestamp fills in
- Zip written in-house, uncompressed (JPG is already compressed), so the app stays a single file with no dependencies
- Save and open sessions as JSON with images and all fields embedded, to reopen without the video
- Autosave to IndexedDB: captures, fields, fps and video name survive a reload. The video itself is not stored; the app asks to re-open it by name
- IndexedDB, not localStorage: localStorage caps an origin at ~5 MB and a few dozen JPGs fill it (same reason titulus moved to IndexedDB)
- Clear button removes all captures, with confirmation
- If IndexedDB is unavailable, a warning shows in the header and closing the tab asks for confirmation
- Browser storage is not guaranteed: Chrome returns `false` to `navigator.storage.persist()` on `file://`. The JSON session is the durable record
