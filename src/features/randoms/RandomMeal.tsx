import { fetchOneRandomMeal } from "../../data_fetching"
import { useToDispatchFetching, useToGetAnRandomMeal } from "../../hooks/forComponents"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { RenderMeal } from "../category/CategoryViewPage"
import { CategoryAndCuisineButton } from "../meals/MealDetails"

export const RandomMeal = () => {
    const [wait, setWait] = useState<boolean>(true)

    const {t} = useTranslation()

    useToDispatchFetching(fetchOneRandomMeal)

    const { category, cuisine, mealId, mealName, mealThumb } = useToGetAnRandomMeal()

    useEffect(() => {
        const timer = setTimeout(() => setWait(false), 999)
        return () => clearTimeout(timer)
    }, [])

    const content = (
        wait
            ? null
            :
            <div className="flex flex-col z-10">
                <RenderMeal id={mealId} mealImg={mealThumb} mealName={mealName} />
                <CategoryAndCuisineButton category={category} cuisine={cuisine} />
            </div>
    )

    return (
        <div className="flex flex-col items-center">
            <h2 className="xxs:text-xl md:text-2xl lg:text-4xl z-10">{t("Randomly Selected Food")}</h2>
            {content}
        </div>
    )
}
