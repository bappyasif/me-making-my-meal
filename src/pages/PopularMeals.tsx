import { useTranslation } from "react-i18next";
import { RenderMeal } from "../features/category/CategoryViewPage";
import { useAppSelector } from "../hooks"

export const PopularMeals = () => {
    const mealsViewed = useAppSelector(state => state.meal.mealsViewed);

    const renderMeals = () => mealsViewed.map(item => <RenderMeal id={item.id} mealImg={item.imgSrc} mealName={item.name} key={item.id} />)

    // console.log("meals viewed....", mealsViewed)

    const { t } = useTranslation()

    return (
        <div>
            <h1>{t("Popular Meals")}</h1>
            {/* <div className="flex flex-wrap gap-8">{renderMeals()}</div> */}
            <div className="flex flex-wrap gap-8">{mealsViewed.length ? renderMeals() : <h2>No Meal Items been Viewed Yet....</h2>}</div>
        </div>
    )
}
