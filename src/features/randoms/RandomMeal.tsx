import { fetchOneRandomMeal } from "../../data_fetching"
import { useToDispatchFetching, useToGetAnRandomMeal, useToIncreaseCategoryAndCuisineCounts } from "../../hooks/forComponents"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { RenderMeal } from "../category/CategoryViewPage"

export const RandomMeal = () => {
    const [wait, setWait] = useState<boolean>(true)

    const {t} = useTranslation()

    useToDispatchFetching(fetchOneRandomMeal)

    const { category, cuisine, mealId, mealName, mealThumb } = useToGetAnRandomMeal()

    useEffect(() => {
        const timer = setTimeout(() => setWait(false), 999)
        return () => clearTimeout(timer)
    }, [])

    const { handleCategoryClick, handleCuisineClick } = useToIncreaseCategoryAndCuisineCounts(category, cuisine)

    const content = (
        wait
            ? null
            :
            <div className="flex flex-col items-center">
                <RenderMeal id={mealId} mealImg={mealThumb} mealName={mealName} />
                <div className="self-start">
                    <button onClick={handleCategoryClick}>{t(`${category}`)}</button>
                    <button onClick={handleCuisineClick}>{t(`${cuisine}`)}</button>
                </div>
            </div>
    )

    return (
        <div className="flex flex-col items-center">
            <h2 className="xxs:text-xl md:text-2xl lg:text-4xl">{t("Randomly Selected Food")}</h2>
            {content}
        </div>
    )
}
