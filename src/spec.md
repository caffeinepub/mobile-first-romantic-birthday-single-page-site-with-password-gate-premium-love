# Specification

## Summary
**Goal:** Fix background music asset/pathing and resolve build/runtime issues so the app deploys successfully with background music enabled.

**Planned changes:**
- Add a valid local MP3 file at `frontend/public/background.mp3`.
- Ensure `BackgroundMusicPlayer` references the root-relative path `src="/background.mp3"` (no missing or external URLs).
- Update background music playback handling to avoid build/runtime errors, including handling autoplay-blocked scenarios without unhandled promise rejections.
- Add a subtle English helper message near the music controls when audio can’t load or start (e.g., prompting the user to press Play), while keeping the rest of the app usable.

**User-visible outcome:** The deployed app loads without errors, background music controls work with the local `/background.mp3` file, and users see a small English prompt near the controls if they need to press Play to start music.
