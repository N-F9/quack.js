import { osLocaleSync } from 'os-locale'
import locales from '../locales.js'

const osLocale: string = osLocaleSync()

/**
 * A function for grabbing the language file.
 *
 * @return {*}
 */
const Locale = () => {
	return locales[osLocale as keyof typeof locales] || locales.en_US
}

export default Locale
