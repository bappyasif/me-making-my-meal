import { Link } from "react-router-dom"
import { useToGetCuisines, useToGetFourPopularItems, useToIncreaseCountsFromMostLikedItems } from "../../hooks/forComponents"
import { useTranslation } from "react-i18next"

export const MostPopularCuisine = () => {
    const cuisines = useToGetCuisines()

    const { names } = useToGetFourPopularItems(cuisines)

    const {handleClick} = useToIncreaseCountsFromMostLikedItems("cuisines")

    const {t} = useTranslation()

    const renderContent = (
        names.map(name => {
            return (
                <Link className="text-center bg-slate-600 px-4 text-slate-200 hover:text-slate-400 xxs:w-fit sm:w-48" title={t(`${name}`)} onClick={() => handleClick(name)} key={name} to={`/cuisines/${name || "Thai"}`}>{t(`${name}`) || "Thai"}</Link>
            )
        })
    )

    return (
        <div className="xxs:w-full lg:w-1/2 flex flex-col gap-y-4 opacity-80">
            <h2 className="xxs:text-xl md:text-2xl lg:text-4xl text-center bg-slate-600 py-2 rounded-e-full">{t("Most Popular Cuisines")}</h2>

            <div className="flex gap-x-4 gap-y-2 xxs:text-xl md:text-2xl flex-wrap justify-center">{renderContent}</div>
        </div>
    )
}