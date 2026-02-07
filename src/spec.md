# Specification

## Summary
**Goal:** Add a smooth fade-in effect to the looping background music each time playback starts, without changing existing controls or locked-screen behavior.

**Planned changes:**
- Update the background music playback logic to ramp volume from near-silent to the intended level over a short fade-in whenever playback begins (autoplay or user-initiated).
- Ensure the fade-in is applied again when the track restarts due to looping so the loop transition is not abrupt.
- Preserve current Play/Pause and Mute/Unmute behavior, including ensuring fade-in does not produce sound when muted.
- Limit changes to existing frontend code while avoiding edits to `frontend/src/components/ui` and avoiding any passcode/locked-screen behavior changes.

**User-visible outcome:** Background music starts and restarts on loop with a gentle fade-in, while existing Play/Pause and Mute/Unmute controls behave the same as before.
