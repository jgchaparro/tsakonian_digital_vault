# tsakonian_digital_vault

## Overview
Repository containing Tsakonian linguistic reference materials, published as a static site via [Quartz](https://quartz.jzhao.xyz) (Markdown → digital garden). This is the ground-truth linguistic reference used by the other Tsakonio repos/agents.

## Architecture
* `tsakonian_vault/` — the actual content (Quartz "vault"), one folder per language: `English/`, `Español/`, `Ελληνικά/`
* `tsakonian_vault/0. Sources/` — source intake and archive (see "Sources" below)
* `tsakonian_vault/Utils/` — helper scripts (`process_ocr.py`)
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
8. Sources
9. Dictionary

## Commands
* `npx quartz build --serve --directory tsakonian_vault` — local dev server
* `npm run check` — typecheck + format check

---

# Knowledge base rules

## 1. Objectives

The vault collects, organizes and maintains information about the Tsakonian language and culture. All information must be documented and cited.

## 2. Vault structure

The vault is organized into files (specific pieces of information) and directories (groups of related information). You may create new files and directories as needed, as long as the taxonomy stays clear and logical.

### 2.1. The `tsakonian_vault/0. Sources` directory

Intake and tracking hub for all external materials:

- **`Master sources.md`**: table of all processed sources. Columns: _Title, Author, Date, Summary, Link, Page offset_. Use "N/A" for missing data. Page offset is explained in Section 5.
- **`Requiring OCR/`**: scanned PDFs without a text layer. `tsakonian_vault/Utils/process_ocr.py` OCRs them one page at a time with the Gemini CLI, writes the Markdown to `Pending/`, and moves the PDF to `Archive/`.
- **`Pending/`**: raw files waiting to be processed.
- **`Archive/`**: processed sources. Each source has a `.md` file (and its PDF, if any).
  - **Every `Archive/*.md` must be the complete text of the source, never a summary.** This applies to all sources (PDFs, web articles, etc.).

## 3. Source ingestion workflow

Process files in `Pending/` one at a time:

1. **Extract content:** save the _complete text_ (not a summary) as a Markdown file in `Archive/`. For paginated sources, include page markers (see Section 5).
2. **Integrate information:** add the information to the relevant vault articles. Expand existing files or create new ones as needed.
3. **Apply citations:** follow Section 5, including the page of every cited statement.
4. **Rename the original source:** give it a short, clean name that reflects its content.
   - _Example:_ "Tsakonian Studies: The State-of-the-Art" → `Tsakonian Studies State of the Art.md`.
5. **Archive:** move the renamed original into `Archive/`.
6. **Update trackers:**
   - Add the source to `Master sources.md`, with a backlink to the archived file and its page offset.
   - Add a row to the `8. Sources` page in all three languages (`English/8. Sources.md`, `Español/8. Fuentes.md`, `Ελληνικά/8. Πηγές.md`).

## 4. Content standards

### 4.1. Accuracy and detail

- **No assumptions:** don't fill gaps with assumptions or invented context.
- **High fidelity:** extract as much relevant information as possible. Keep specific details and explanations; drop unnecessary prose.
- **Use source evidence:** include specific examples and quotes from the source. Don't add general statements not supported by the text.

### 4.2. Language and tone

- **Primary language:** the working language is English. Translate information from other languages into English, keeping the original meaning.
- **Multilingual examples:** quotes and examples may stay in their original language (mainly Tsakonian and Greek), but the surrounding explanation must be in English.
- **Accessibility:** clear, concise style for non-experts. Use academic terms where needed, but avoid dense jargon.

### 4.3. Formatting

- **Data presentation:** prefer tables over prose for structured data.
- **Spacing:** always leave a blank line between headings and the following text.
- **Article organization:** don't add an H1 header to new articles. If articles are numbered, renumber the following ones to keep the order consistent.

## 5. Citations and references

- **In-text citations:** cite specific statements in APA format, as an internal link to the source in `Archive/`, **including the page**.
  - _Format:_ `[[Filename.md|(Author, Year, p. Page)]]`
  - _Example:_ `[[Tsakonian Studies State of the Art.md|(Liosis, 2017, p. 12)]]`
  - Use `p.` for one page and `pp.` for a range: `[[Filename.md|(Kostakis, 1951, pp. 12-14)]]`.
- **Which page number:** always cite the **page number printed in the work itself**, never the PDF/file page index.
  - Covers, blank pages and unnumbered front matter don't count as pages.
  - Journal articles and book chapters use the journal/book pagination (e.g. an article printed on pp. 177–188 starts at p. 177, not p. 1).
- **Page markers:** paginated archive texts contain markers `------- Page {printed} (PDF {n}) -----------`. Cite the `Page` value. Unnumbered pages are marked `------- Page – (PDF {n}) -----------` and shouldn't be cited by page.
- **Page offset:** for each source, `Master sources.md` records the offset between PDF and printed pages: `printed page = PDF page − offset`. Find it by checking the printed number on a few pages (start, middle, end). If numbering restarts or has gaps, note it in the Summary column.
- **Exception:** omit the page only for sources that genuinely have no pagination, such as web articles.
- **Sources page:** every citation key (Author, Year) must appear in the `8. Sources` page of each language, in a table with columns _Author, Year, Publication name_.
- **Special author rule:** the author of all _Tsakonian Digital_ articles is Jaime García Chaparro. Cite them as `(García Chaparro, {year})`.
