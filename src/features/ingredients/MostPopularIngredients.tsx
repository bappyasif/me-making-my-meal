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
                <Link className="text-center w-fit bg-slate-600 xxs:px-1 sm:px-4 text-slate-200 hover:text-slate-400 xxs:w-fit sm:w-48" title={name} onClick={() => handleClick(name)} key={name} to={`/ingredients/${name || "Lime"}`}>{name.length > 11 ? name.slice(0,7)+"...." : name}</Link>
            )
        })
    )

    const { t } = useTranslation()

    return (
        <div className="xxs:w-full lg:w-1/2 flex flex-col gap-y-4 opacity-80">
            <h2 className="xxs:text-xl md:text-2xl lg:text-4xl text-center bg-slate-600 py-2 rounded-s-full">{t("Most Popular Ingredients")}</h2>
            <div className="flex gap-x-4 gap-y-2 xxs:text-xl md:text-2xl flex-wrap justify-center">{renderContent}</div>
        </div>
    )
}