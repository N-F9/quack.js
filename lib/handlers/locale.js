import { osLocaleSync } from 'os-locale';
import locales from '../locales.js';
const osLocale = osLocaleSync();
const Locale = () => {
    return locales[osLocale] || locales.en_US;
};
export default Locale;
