import { osLocaleSync } from 'os-locale';
import locales from '../locales.js';
const osLocale = osLocaleSync();
/**
 * A function for grabbing the language file.
 *
 * @returns The locale of given location if it is created under `locales.ts`.
 */
export const Locale = () => {
    return locales[osLocale] || locales.en_US;
};
