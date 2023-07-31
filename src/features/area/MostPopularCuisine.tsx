import { Link } from "react-router-dom"
import { useToGetCuisines, useToGetFourPopularItems, useToIncreaseCountsFromMostLikedItems } from "../../hooks/forComponents"
import { useTranslation } from "react-i18next"

export const MostPopularCuisine = () => {
    const cuisines = useToGetCuisines()

    const { names } = useToGetFourPopularItems(cuisines)

    const {handleClick} = useToIncreaseCountsFromMostLikedItems("cuisines")

    const renderContent = (
        names.map(name => {
            return (
                <Link onClick={() => handleClick(name)} key={name} to={`/cuisines/${name || "Thai"}`}>{name || "Thai"}</Link>
            )
        })
    )


    const { t } = useTranslation()

    return (
        <div>
            <h2 className="text-4xl">{t("Most Popular Cuisines")}</h2>

            <div className="flex gap-4 text-2xl">{renderContent}</div>
        </div>
    )
}