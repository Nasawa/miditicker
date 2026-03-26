# miditicker

Converts MIDI files into a printable dot grid for DIY music boxes. Feed it a `.mid` file, get back a visual layout of when each note should be punched.

## What It Does

Music boxes work by plucking metal tines as a rotating drum (or strip of paper) passes by. To make a custom strip, you need to know *which notes* to punch and *when*. MIDI files already encode exactly that information.

miditicker reads a MIDI file, extracts all the note events, and renders them as dots on an HTML5 canvas — X position maps to pitch, Y position maps to time. The result is a scrollable dot grid you can use as a punch guide.

## Architecture

| File | Purpose |
|------|---------|
| `translator.js` | Node.js script — reads a `.mid` file using the `midifile` library, extracts note events, writes them as a JSON array to a `.js` file |
| `client.js` | Browser-side renderer — reads the note array and draws dots on a canvas (1024×4096px) |
| `index.html` | Loads the generated note JS file and runs `draw()` on page load |

The workflow is two-step:
1. Run `translator.js` with Node to convert your MIDI to a JSON note array
2. Open `index.html` in a browser to see the dot grid

The example in the repo uses "Dragon Roost Island" from *The Legend of Zelda: The Wind Waker*.

## How to Run

```bash
# Install dependencies
npm install

# Convert a MIDI file (outputs ./midis/YourSong.js)
node translator.js "YourSong"

# Then open index.html in a browser
# (update the <script src> tag to point to your generated file)
```

## Notes

Built in 2017. The canvas is 4096px tall to accommodate longer pieces. The coordinate scaling (`param1 * 12` for X, `playTime / 12` for Y) is tuned for typical music box note ranges and strip lengths — you may need to adjust these for your specific box format.
