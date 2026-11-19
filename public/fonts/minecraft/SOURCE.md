# Minecraft font source

- Upstream: https://github.com/IdreesInc/Minecraft-Font (SIL Open Font License
  1.1; see OFL.txt, copied from the repository's LICENSE).
- Input: `Minecraft.otf` and `Minecraft-Bold.otf`, downloaded once and committed
  as-is. The project is a fan recreation and is not affiliated with Mojang.
- SHA-256:
  - `Minecraft.otf`: `ebc7a7be9f69479f02875af1fe79a2b93cc868b83be4f6369ecceb45fabe5ee6`
  - `Minecraft-Bold.otf`: `2a7216d047fd2991aa8a2fcbc002e0782a903d68de3cc248092ffa88aa941b4f`

Coverage policy: the face maps Basic Latin (0x20 to 0x7E), Latin-1 (0xA0 to 0xAC
and 0xAE to 0xFD), U+20AC, U+263A to U+263B, U+2665, and U+3000. Punctuation
outside those ranges, such as the em dash, en dash, ellipsis, and arrow, falls
back per glyph to Montserrat.
