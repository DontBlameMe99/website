# Minecraft dirt source

- Source: the attached Minecraft menu-backdrop screenshot, whose tile period is
  64px (the vanilla 16x16 dirt tile at 4x). One tile was sampled at the center of
  each 4x4 block, and the few dark UI-gray pixels in that capture were snapped
  to the nearest of the four dirt tones.
- The committed `dirt.png` (64x64), `dirt@2x.png` (128x128), and `dirt@3x.png`
  (192x192) are that 16x16 tile nearest-neighbor scaled 4x, 8x, and 12x, so the
  browser reaches it at a whole device pixel per texel on 1x, 2x, and 3x.
- Minecraft and the dirt texture are Mojang Studios properties. This is a fan
  site, not an official Minecraft page.
