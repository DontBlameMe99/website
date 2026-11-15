# Montserrat source

- Upstream: https://github.com/JulietaUla/Montserrat (SIL Open Font License 1.1;
  see OFL.txt, copied from https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/OFL.txt).
- Input: the Google Fonts **latin** variable subset (`wght` 100–900), downloaded
  once and committed as-is. There is no local subset step.
- Embedded version: `Version 9.000`.
- SHA-256: `06b16db7a969135d48d38c49183be7fb88d4452e2a3011957c7851941f4e4879`.

Coverage policy: Basic Latin, Latin-1 and the punctuation and symbols the site
copy uses. A character outside the subset would fall back per glyph, which
`app/lib/__tests__/montserrat_glyph_coverage.test.ts` guards against. Montserrat
is not an emoji or music font, so unsupported characters keep the system
fallback.
