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
                <Link onClick={() => handleClick(name)} key={name} to={`/cuisines/${name || "Thai"}`}>{t(`${name}`) || "Thai"}</Link>
            )
        })
    )

    return (
        <div className="">
            <h2 className="xxs:text-xl md:text-2xl lg:text-4xl text-center">{t("Most Popular Cuisines")}</h2>

            <div className="flex gap-4 xxs:text-xl md:text-2xl flex-wrap">{renderContent}</div>
        </div>
    )
}