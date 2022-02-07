import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter, faGithub, faDiscord, faSpotify, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {
  faEnvelope,
  faSearch,
  faCalendarDay,
  faGlobeEurope,
  faHome,
  faMoon,
  faSun,
  faAnchor,
  faCode,
  faPlus,
  faGavel,
  faBook,
  faCaretDown as faSolidCaretDown,
  faCaretUp as faSolidCaretUp,
  faVoteYea,
  faDonate,
} from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'

import '@fortawesome/fontawesome-svg-core/styles.css'
// Prevent Font Awesome from adding its CSS since we did it manually above:
config.autoAddCss = false

// Import @fortawesome/free-brands-svg-icons
library.add(faTwitter, faGithub, faDiscord, faSpotify, faLinkedin)

// Import @fortawesome/free-solid-svg-icons
library.add(faEnvelope, faSearch, faCalendarDay, faGlobeEurope, faHome, faSolidCaretDown, faSolidCaretUp, faMoon, faSun, faAnchor, faCode, faPlus, faGavel, faBook)

// Import @fortawesome/free-regular-svg-icons
library.add(faClock, faVoteYea, faDonate)