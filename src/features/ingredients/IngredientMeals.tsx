import { useParams } from "react-router-dom"
import { fetchMealsByIngredient } from "../../data_fetching"
import { useToDispatchFetching } from "../../hooks/forComponents"
import { useAppSelector } from "../../hooks"
import { RenderMeal } from "../category/CategoryViewPage"
import { useTranslation } from "react-i18next"

export const IngredientMeals = () => {
    // const { name } = useParams()
    // useToDispatchFetching(fetchMealsByIngredient, name || "")
    useToDispatchFetching(fetchMealsByIngredient)

    const meals = useAppSelector(state => state.ingredient.meals)

    const renderMeals = (
        meals.map(item => <RenderMeal id={item.id} mealImg={item.mealImg} mealName={item.mealName} key={item.id} />)
    )

    const { name } = useParams()

    const list = useAppSelector(state => state.ingredient.list)
    const ingredientDescription = list.find(item => item.name === name)?.description

    const {t} = useTranslation()

    return (
        <div className="flex flex-col gap-y-8">
            {
                ingredientDescription
                    ?
                    <>
                        <h1>{t("About")} : {t(`${name}`)}</h1>
                        <p className="text-justify text-2xl">{ingredientDescription}</p>
                    </>
                    : null
            }
            <h1>{t(`${name}`)} : {t("Meals Cooked With")}</h1>
            <div className="flex flex-wrap gap-8">{renderMeals}</div>
        </div>
    )
}
