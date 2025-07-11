import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import it from "./translations/it.json";

const resources = {
    en: {
        translation: en
    },
    it: {
        translation: it
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "it", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option
        fallbackLng: "it",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    }).catch(e => console.log(e));

export default i18n;
