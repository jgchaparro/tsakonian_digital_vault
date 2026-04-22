// @ts-ignore
import script from "./scripts/languagetoggle.inline"
import styles from "./styles/languagetoggle.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const LanguageToggle: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <button class={classNames(displayClass, "language-toggle")} aria-label="Change language">
      <span class="lang-indicator">EN</span>
    </button>
  )
}

LanguageToggle.beforeDOMLoaded = script
LanguageToggle.css = styles

export default (() => LanguageToggle) satisfies QuartzComponentConstructor
