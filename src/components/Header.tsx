import { ChangeEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Search } from "./Search"

export const Header = () => {
    return (
        <div className="w-max flex flex-col items-center gap-y-8">
            <RenderNavs />
            <HamburgerMenu />
            <div className="flex flex-col items-start xxs:gap-y-8 md:gap-x-8 justify-around">
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
        let loc = import.meta.env.PROD ? import.meta.env.VITE_I18N_LOC_URL : "http://localhost:5173/";
        window.location.replace(loc + "?lng=" + e.target.value);
    }

    return (
        <div className="flex xxs:flex-col md:flex-row gap-y-1 gap-x-4 h-fit">

            <label className="xxs:text-xl md:text-2xl w-fit">{t('Choose')}</label>
            <select className="xxs:text-xl md:text-2xl bg-slate-600 xxs:w-48 h-fit" value={lang} onChange={handleChange}>
                {languages.map(item => {
                    return (<option className="xxs:text-xl md:text-2xl" key={item.value}
                        value={item.value}>{t(`${item.text}`)}</option>);
                })}
            </select>
        </div>
    );
}

const RenderNavs = () => {
    return (
        <div className="xxs:hidden lg:flex xxs:gap-x-8 lg:gap-x-8 gap-y-2 xxs:justify-evenly lg:justify-center xxs:text-xl md:text-4xl flex-wrap my-0.5">
            <AllNavs />
        </div>
    )
}

const AllNavs = () => {
    const { t } = useTranslation()
    return (
        <>
            <Link className="xxs:w-full lg:w-max xxs:px-1 lg:px-4 xxs:py-0.5 lg:py-2 font-bold hover:text-blue-200 nav-item" to={"/"}>{t("Home")}</Link>
            <Link className="xxs:w-full lg:w-max xxs:px-1 lg:px-4 xxs:py-0.5 lg:py-2 font-bold hover:text-blue-200 nav-item" to={"/cuisines"}>{t('Cuisines')}</Link>
            <Link className="xxs:w-full lg:w-max xxs:px-1 lg:px-4 xxs:py-0.5 lg:py-2 font-bold hover:text-blue-200 nav-item" to={"/categories"}>{t("Categories")}</Link>
            <Link className="xxs:w-full lg:w-max xxs:px-1 lg:px-4 xxs:py-0.5 lg:py-2 font-bold hover:text-blue-200 nav-item" to={"/ingredients"}>{t("Ingredients")}</Link>
            <Link className="xxs:w-full lg:w-max xxs:px-1 lg:px-4 xxs:py-0.5 lg:py-2 font-bold hover:text-blue-200 nav-item" to={"/popularMeals"}>{t("Popular Meals")}</Link>
        </>
    )
}

const HamburgerMenu = () => {
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(prev => !prev);
    
    const handleClose = () => setShow(false);
    
    return (
        <div className="xxs:block lg:hidden self-end absolute">
            <p className="hover:text-blue-200 nav-item px-2" onClick={handleToggle}>Menu</p>
            {
                show
                ? <div onClick={handleClose} className="absolute right-0 bg-gray-400 flex flex-col gap-y-2 w-max text-right">
                    <AllNavs />
                </div>
                : null
            }
        </div>
    )
}