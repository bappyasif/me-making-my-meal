import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const apiKey = import.meta.env.VITE_I18N_KEY;
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    ns: ["default"],
    defaultNS: "default",

    supportedLngs: ["en", "ku", "bn", "nl"],

    backend: {
      loadPath: loadPath
    }
  })

// import i18next from "i18next";
// import HttpBackend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";
// import { initReactI18next } from "react-i18next";

// const apiKey = "0dMAev9-s4kgqNzJZAWqDQ";
// const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

// i18next
//   .use(HttpBackend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: "en",

//     ns: ["default"],
//     defaultNS: "default",

//     supportedLngs: ["en", "ku", "bn", "nl"],

//     // resources: {
//     //   en: {
//     //     translation: {
//     //       welcome: "Testing bitch!!"
//     //     }
//     //   }
//     // },

//     // interpolation: {
//     //   welcome: {}
//     // },

//     // backend: {
//     //   loadPath: loadPath
//     // }
//   })

// i18next.changeLanguage("bn")

// console.log("I18N")

// export default i18next