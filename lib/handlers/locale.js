import { osLocaleSync } from 'os-locale';
import locales from '../locales.js';
const osLocale = osLocaleSync();
/**
 * A function for grabbing the language file.
 *
 * @return {*}
 */
export const Locale = () => {
    return locales[osLocale] || locales.en_US;
};
