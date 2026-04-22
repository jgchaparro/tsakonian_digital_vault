type Lang = "en" | "es" | "el"

const LANGS: Lang[] = ["en", "es", "el"]

const T: Record<
  Lang,
  {
    explorerTitle: string
    graphTitle: string
    backlinksTitle: string
    noBacklinks: string
    tocTitle: string
    searchTitle: string
    searchPlaceholder: string
    createdWith: string
    minRead: (m: number) => string
  }
> = {
  en: {
    explorerTitle: "Explorer",
    graphTitle: "Graph View",
    backlinksTitle: "Backlinks",
    noBacklinks: "No backlinks found",
    tocTitle: "Table of Contents",
    searchTitle: "Search",
    searchPlaceholder: "Search for something",
    createdWith: "Created with",
    minRead: (m) => `${m} min read`,
  },
  es: {
    explorerTitle: "Explorador",
    graphTitle: "Vista Gráfica",
    backlinksTitle: "Retroenlaces",
    noBacklinks: "No se han encontrado retroenlaces",
    tocTitle: "Tabla de Contenidos",
    searchTitle: "Buscar",
    searchPlaceholder: "Busca algo",
    createdWith: "Creado con",
    minRead: (m) => `Se lee en ${m} min`,
  },
  el: {
    explorerTitle: "Εξερευνητής",
    graphTitle: "Γραφική Προβολή",
    backlinksTitle: "Αντίστροφοι σύνδεσμοι",
    noBacklinks: "Δεν βρέθηκαν αντίστροφοι σύνδεσμοι",
    tocTitle: "Πίνακας Περιεχομένων",
    searchTitle: "Αναζήτηση",
    searchPlaceholder: "Αναζητήστε κάτι",
    createdWith: "Δημιουργήθηκε με",
    minRead: (m) => `${m} λεπτά ανάγνωσης`,
  },
}

function detectLang(): Lang {
  const saved = localStorage.getItem("vault-lang") as Lang | null
  if (saved && LANGS.includes(saved)) return saved
  const browser = navigator.language.toLowerCase()
  if (browser.startsWith("es")) return "es"
  if (browser.startsWith("el")) return "el"
  return "en"
}

function nextLang(current: Lang): Lang {
  return LANGS[(LANGS.indexOf(current) + 1) % LANGS.length]
}

// Try to extract reading-time minutes from text in any supported language
function extractMinutes(text: string): number | null {
  const patterns: RegExp[] = [
    /^(\d+)\s+min\s+read$/,
    /^Se lee en (\d+)\s+min$/,
    /^(\d+)\s+λεπτά\s+ανάγνωσης$/,
  ]
  for (const re of patterns) {
    const m = text.match(re)
    if (m) return parseInt(m[1])
  }
  return null
}

const INDEX_TITLES: Record<Lang, string> = {
  en: "Καούρ εκάνατε! - Welcome!",
  es: "Καούρ εκάνατε! - ¡Bienvenido!",
  el: "Καούρ εκάνατε! - Καλώς ήρθατε!",
}

function applyLang(lang: Lang): void {
  const t = T[lang]

  // Explorer title
  const explorerH2 = document.querySelector<HTMLElement>(".desktop-explorer h2")
  if (explorerH2) explorerH2.textContent = t.explorerTitle

  // Graph title
  const graphH3 = document.querySelector<HTMLElement>(".graph h3")
  if (graphH3) graphH3.textContent = t.graphTitle

  // Backlinks title
  const backlinksH3 = document.querySelector<HTMLElement>(".backlinks h3")
  if (backlinksH3) backlinksH3.textContent = t.backlinksTitle

  // "No backlinks found" — the li that has no <a> inside
  for (const li of document.querySelectorAll(".backlinks li")) {
    if (!li.querySelector("a")) {
      li.textContent = t.noBacklinks
      break
    }
  }

  // Table of contents title
  const tocH3 = document.querySelector<HTMLElement>(".toc-header h3")
  if (tocH3) tocH3.textContent = t.tocTitle

  // Search button label
  const searchP = document.querySelector<HTMLElement>(".search .search-button p")
  if (searchP) searchP.textContent = t.searchTitle

  // Search placeholder
  const searchInput = document.querySelector<HTMLInputElement>("input.search-bar")
  if (searchInput) {
    searchInput.placeholder = t.searchPlaceholder
    searchInput.setAttribute("aria-label", t.searchPlaceholder)
  }

  // Footer "Created with" — the first text node inside the footer <p>
  const footerP = document.querySelector("footer p")
  if (footerP) {
    const first = footerP.childNodes[0]
    if (first?.nodeType === Node.TEXT_NODE) {
      first.textContent = t.createdWith + " "
    }
  }

  // Reading time spans
  for (const span of document.querySelectorAll(".content-meta span")) {
    const text = (span.textContent ?? "").trim()
    const minutes = extractMinutes(text)
    if (minutes !== null) {
      span.textContent = t.minRead(minutes)
    }
  }

  // Index page title
  if (document.querySelector("[data-lc]")) {
    const articleTitle = document.querySelector<HTMLElement>(".article-title")
    if (articleTitle) articleTitle.textContent = INDEX_TITLES[lang]
  }

  // TOC: hide items whose heading lives in a different language block
  for (const li of document.querySelectorAll<HTMLElement>(".toc-content li")) {
    const anchor = li.querySelector("a")
    if (!anchor) continue
    const targetId = anchor.getAttribute("href")?.slice(1)
    if (!targetId) continue
    const heading = document.getElementById(targetId)
    if (!heading) continue
    const block = heading.closest("[data-lc]")
    if (!block) continue
    li.style.display = block.getAttribute("data-lc") === lang ? "" : "none"
  }

  // Update all toggle button indicators
  for (const indicator of document.querySelectorAll(".language-toggle .lang-indicator")) {
    indicator.textContent = lang.toUpperCase()
  }

  // Persist and signal
  localStorage.setItem("vault-lang", lang)
  document.documentElement.setAttribute("data-lang", lang)
}

// Set data-lang early to avoid layout shift on future CSS hooks
document.documentElement.setAttribute("data-lang", detectLang())

document.addEventListener("nav", () => {
  const lang = detectLang()
  applyLang(lang)

  // External URL redirect: open in new tab if this page declares one
  const extEl = document.querySelector<HTMLElement>("[data-external-url]")
  if (extEl) {
    const url = extEl.getAttribute("data-external-url")
    if (url) window.open(url, "_blank")
  }

  const handleClick = () => {
    const current = (localStorage.getItem("vault-lang") as Lang) ?? "en"
    applyLang(nextLang(current))
  }

  for (const btn of document.querySelectorAll(".language-toggle")) {
    btn.addEventListener("click", handleClick)
    window.addCleanup(() => btn.removeEventListener("click", handleClick))
  }
})
