import { ChangeEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Search } from "./Search"

export const Header = () => {
    return (
        <div className="w-full flex flex-col items-center gap-y-8">
            <RenderNavs />
            <div className="flex xxs:flex-col md:flex-row xxs:items-center md:items-start xxs:gap-y-8 md:gap-x-8 justify-around">
                <LanguageSelection />
                <Search />
            </div>
        </div>
    )
}

const LanguageSelection = () => {

    const languages = [
        { value: '', text: "Options" },
        { value: 'en', text: "English" },
        { value: 'ku', text: "Kurdish" },
        { value: 'bn', text: "Bengali" },
        { value: 'nl', text: "Dutch" }
    ]

    // It is a hook imported from 'react-i18next'
    const { t } = useTranslation();

    const [lang, setLang] = useState('');

    // This function put query that helps to
    // change the language
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setLang(e.target.value);
        // let loc = "http://localhost:5173/";
        let loc = import.meta.env.VITE_I18N_LOC_URL;
        window.location.replace(loc + "?lng=" + e.target.value);
    }

    return (
        <div className="flex xxs:flex-col md:flex-row xxs:items-center gap-y-1 gap-x-4 h-fit">

            <label className="xxs:text-xl md:text-2xl w-fit">{t('Choose')}</label>
            <select className="xxs:text-xl md:text-2xl bg-slate-600 xxs:w-44 sm:w-36 h-fit" value={lang} onChange={handleChange}>
                {languages.map(item => {
                    return (<option className="xxs:text-xl md:text-2xl" key={item.value}
                        value={item.value}>{item.text}</option>);
                })}
            </select>
        </div>
    );
}

const RenderNavs = () => {
    const { t } = useTranslation()
    return (
        <div className="flex xxs:gap-x-8 lg:gap-x-16 justify-center xxs:text-xl md:text-4xl px-4 flex-wrap">
            <Link to={"/"}>{t("Home")}</Link>
            <Link to={"/cuisines"}>{t('Cuisines')}</Link>
            <Link to={"/categories"}>{t("Categories")}</Link>
            <Link to={"/ingredients"}>{t("Ingredients")}</Link>
            <Link to={"/popularMeals"}>{t("Popular Meals")}</Link>
        </div>
    )
}
