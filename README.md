# lumina

Grab frames from a video of a theatre performance and keep a record of the show's lighting states.

**Live:** https://memoriainfinita.github.io/lumina/

A single HTML file with no server, no install and no dependencies. The video never leaves your machine.

## Use

Open `index.html` (or the live page) and drop an mp4 on the window, or click the empty stage.

- Step through the video with J / K / L and the arrow keys, capture with C
- Mark the in point with I: show time counts from there and starts at 00:00:00.00
- Give each capture a cue, title, description, notes and a color from an editable palette
- Put the captures below or beside the video, drag the bar between them to resize, and hide the video (V) to review the captures full size
- Open a capture in the lightbox to see it large and edit its notes
- Download all captures as a zip, named `Q012.5_title.jpg`
- Save the session as JSON, images included, to reopen it without the video

Open Options (or press `?`) for session actions, layout, colors and every shortcut.

## Storage

Captures autosave in the browser (IndexedDB) and survive a reload. Browser storage can be cleared, so save the session as JSON when you finish. The local file and the live page keep separate storage.

## Browsers

Tested with Chrome. Firefox is in daily use. Reverse playback is not available: Chrome and Firefox do not support it, so J steps back frame by frame.

`test/test-2997.mp4` is a generated 29.97 fps test video with frame numbers burned in.

## License

[GNU GPL v3](LICENSE)
