import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { useToGetFourPopularItems, useToIncreaseCountsFromMostLikedItems } from "../../hooks/forComponents"
import { useTranslation } from "react-i18next"

export const MostPopularIngredients = () => {
    const ingredients = useAppSelector(state => state.ingredient.list)
    
    // const {names} = useToGetFourRandomItems(ingredients)
    const { names } = useToGetFourPopularItems(ingredients)

    const { handleClick } = useToIncreaseCountsFromMostLikedItems("ingredients")

    const renderContent = (
        names.map(name => {
            return (
                <Link onClick={() => handleClick(name)} key={name} to={`/ingredients/${name || "Lime"}`}>{name || "Lime"}</Link>
            )
        })
    )

    const { t } = useTranslation()

    return (
        <div>
            <h2 className="xxs:text-xl md:text-2xl lg:text-4xl text-center">{t("Most Popular Ingredients")}</h2>
            <div className="flex gap-x-4 gap-y-2 xxs:text-xl md:text-2xl flex-wrap justify-center">{renderContent}</div>
        </div>
    )
}