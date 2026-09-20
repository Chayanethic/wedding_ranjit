# Section-wise music

This version uses the six-song setup only.

1. `assets/01-sanai-intro.mp3` — full-screen intro Sanai
2. `assets/02-bengali-wedding.mp3` — Story / Love Calculator
3. `assets/03-facts.mp3` — Facts
4. `assets/03-reception.mp3` — Reception / RSVP
5. `assets/04-fun.mp3` — Fun / Badam & Moyna
6. `assets/05-events.mp3` — Events / Countdown

Behavior:
- Enter button starts the Sanai directly from the user click.
- All section players are primed during that same click to avoid browser autoplay blocking after scrolling.
- When the visible section changes, the previous audio is paused and reset, and the new section's assigned song starts from 0.
- Scrolling back starts the previous section's assigned song again.
- The same song can be reused by multiple sections.

Important: `03-facts.mp3` and `03-reception.mp3` in the supplied v15 ZIP were only 4.3 KB silent placeholders. Replace those two files with your real MP3s using the exact filenames above if they are not already present in your local copy.
