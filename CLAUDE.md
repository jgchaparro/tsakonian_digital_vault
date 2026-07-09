# tsakonian_digital_vault

## Overview
Repository containing Tsakonian linguistic reference materials, published as a static site via [Quartz](https://quartz.jzhao.xyz) (Markdown → digital garden). This is the ground-truth linguistic reference used by the other Tsakonio repos/agents.

## Architecture
* `tsakonian_vault/` — the actual content (Quartz "vault"), one folder per language: `English/`, `Español/`, `Ελληνικά/`
* `quartz/` — Quartz engine (plugins, build/serve pipeline) — vendored, not project content
* `quartz.config.ts` — site config (title, plugins, layout)
* `quartz.layout.ts` — page layout definitions
* `public/` — built static site output
* `docs/` — Quartz's own documentation (not Tsakonian content)

## Content structure (`tsakonian_vault/<language>/`)
1. Introduction
2. Phonology
3. Writing
   * 3.1 Orthography
   * 3.2 Transliteration
4. Dialects
5. Grammar
6. Resources
7. Vocabulary
8. Dictionary

## Commands
* `npx quartz build --serve --directory tsakonian_vault` — local dev server
* `npm run check` — typecheck + format check
