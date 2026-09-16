---
created: 2026-09-15
last_updated: 2026-09-16
---

# lumina — project state

## Status
Published on GitHub with GitHub Pages.

## What it is
Web app to grab frames from a video of a theatre performance and keep a record of the show's lighting states.

`lumina`: Latin for "lights". Discarded: `lux`, `lumen`, `vestigium`, `tabella`, `lucerna`, `luminaria`, `scaena`.

## Design
- Single HTML file, no server, no install. The video never leaves the machine
- UI, code and documentation in English
- Load an mp4 and play it with standard controls: Open video in the header, drop it on the window, or click the empty stage (only while no video is loaded, so clicks on the video still reach its controls)
- Empty stage: a dashed box with Open video and Open session, so a session opens without going through Options. The stage around the box still opens the file dialog; clicks on the two buttons do not reach it. With captures restored and no video, the box asks for the video by name
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
- Each capture has its own fields: cue, title, description, notes, color, all optional, plus the video timestamp
- Cue is a separate field because cues get renumbered. Decimals allowed: `12`, `12.5`
- Captures are ordered by timestamp
- One view: video and controls, a draggable splitter, and a grid of captures. The separate contact sheet view was removed: with a resizable grid it duplicated the capture strip
- Layout: captures below the video or on its right (Options > Layout). The splitter sets the height or the width of the captures; the grid fits as many thumbnails as there is room for. Windows narrower than 700 px always put the captures below
- Hide video: header button or V. Hides video, controls and splitter so the captures fill the view, and pauses the video. Go to frame and opening a video show it again
- Thumbnail size: two sliders, with video (120-400 px) and without video (160-480 px)
- Layout, splitter position, thumbnail sizes, hidden video, lightbox strip and cue sheet format are browser preferences in localStorage (`lumina-prefs`), not part of the session
- Card: image with the time (click goes to the frame), a notes icon when the capture has notes (hover shows them), delete and the color dot. Below: Q + cue and title on one line, description underneath. Title and description wrap and the card grows, so no text is cut. Notes are edited in the lightbox
- The card fields are real inputs, but their border only shows on hover and while editing: the grid reads as a record, not as a page of forms. Delete and the color dot appear on the card under the pointer; a capture with a color keeps its dot visible
- The Q in front of the cue is drawn by the card; the stored value stays as typed
- Colors: palette of 8 slots with editable color and name (Options > Colors). A capture takes a palette slot, a custom color or none, from the dot on the card or the row in the lightbox
- A palette capture stores the slot (`p0`-`p7`), so editing the palette recolors it; a custom one stores `#rrggbb`
- The palette belongs to the session: autosaved and in the JSON. Sessions without a palette open with the default one; Clear keeps it
- Color shows only on the dot. A colored frame around the card was tried and dropped
- Capture time is read at the moment the frame is drawn, before JPG encoding, so captures taken while playing or seeking are labelled with their own frame
- Options panel: one modal with categories in a side menu, fixed size (720 x 520 px max); the content scrolls, the panel does not grow. Opens with the Options button (last section seen) or ? (straight to Shortcuts); Esc, ? or a click outside closes it. App shortcuts are off while open; Tab, Enter and Space work on its buttons
- Options > Session: Open session, Save session, Download all, Print cue sheet, Clear, plus the show name and date. Each action closes the panel
- Header: `lumina`, the video name, its resolution and frame rate, the capture count, and Open video, Hide video and Options as icon buttons with title and aria-label. It says nothing about storage while captures are being autosaved; if IndexedDB fails, an amber badge reads "Not saved in this browser", with the full sentence in its tooltip
- Options > Shortcuts: read-only legend. Custom shortcuts planned for later
- Favicon: `favicon.svg`, amber spotlight on a dark rounded square, checked rasterized at 16 and 32 px
- Clicking a capture's timestamp, or Go to frame in the lightbox, moves the video to that frame (disabled when no video is loaded)
- Lightbox: click a thumbnail; arrows to navigate, edit all fields, Delete key removes, Esc goes back
- Lightbox layout: prev, next, the counter and close as icons at the top of the panel; cue and title share a row; the time and Go to frame sit under the image; Delete stands alone at the bottom, away from Close
- Lightbox strip: the captures in order under the image, the open one marked, click to jump. Toggles with its button or F and the choice is kept in `lumina-prefs`
- Delete without leaving the view (× on each thumbnail, Delete in the lightbox) without confirmation: an Undo toast shows for 8 s and Ctrl+Z restores deletions one by one during the session. Clear keeps its confirmation
- Editing = the text fields only. Image retouching is out of scope
- Download all: zip of images named `Q012.5_title.jpg`; without cue or title, the timestamp fills in
- Zip written in-house, uncompressed (JPG is already compressed), so the app stays a single file with no dependencies
- Cue sheet: printable A4 record of the captures, as a table (one row each) or a grid (two per row). The format is a browser preference; Print cue sheet fills a hidden container on ink colors and calls the browser's print dialog, which also gives Save as PDF. No PDF library, so the app stays a single file
- Show name and date live in Options > Session, feed the cue sheet header and are saved with the session. Without them the header falls back to the video name
- Save and open sessions as JSON with images and all fields embedded, to reopen without the video. Format 2 adds the show block; format 1 sessions open unchanged
- Autosave to IndexedDB: captures, fields, fps and video name survive a reload. The video itself is not stored; the app asks to re-open it by name
- IndexedDB, not localStorage: localStorage caps an origin at ~5 MB and a few dozen JPGs fill it (same reason titulus moved to IndexedDB)
- Clear button removes all captures, with confirmation
- If IndexedDB is unavailable, a warning shows in the header and closing the tab asks for confirmation
- Browser storage is not guaranteed: Chrome returns `false` to `navigator.storage.persist()` on `file://`. The JSON session is the durable record
- Autosave confirmed working in the user's Firefox on file:// (reload keeps everything). Automated tests run in Chrome only
