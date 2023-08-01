import { useAppSelector } from "../../hooks"
import { fetchCuisineMeals } from "../../data_fetching";
import { useParams } from "react-router-dom";
import { useToDispatchFetching } from "../../hooks/forComponents";
import { useTranslation } from "react-i18next";
import { RenderMeal } from "../category/CategoryViewPage";

export const CuisineMeals = () => {
    useToDispatchFetching(fetchCuisineMeals)

    const meals = useAppSelector(state => state.cuisine.meals)

    const renderMeals = (
        meals.map(item => <RenderMeal id={item.id} mealImg={item.mealImg} mealName={item.mealName} key={item.id} />)
    )

    const {name} = useParams()
    const {t} = useTranslation()
    
    return (
        <div>
            <h1>{t(`${name}`)} {t("Meals List")} -- {meals.length}</h1>
            <div className="flex flex-wrap gap-8">{renderMeals}</div>
        </div>
    )
}
