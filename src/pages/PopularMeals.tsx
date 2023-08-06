import { useTranslation } from "react-i18next";
import { RenderMeal } from "../features/category/CategoryViewPage";
import { useAppSelector } from "../hooks"

export const PopularMeals = () => {
    const mealsViewed = useAppSelector(state => state.meal.mealsViewed);

    const renderMeals = () => mealsViewed.map(item => <RenderMeal id={item.id} mealImg={item.imgSrc} mealName={item.name} key={item.id} />)

    // console.log("meals viewed....", mealsViewed)

    const { t } = useTranslation()

    return (
        <div className="flex flex-col gap-6 z-10">
            <h1 className="xxs:text-2xl md:text-4xl xl:text-6xl">{t("Popular Meals")}</h1>
            {
                mealsViewed.length
                    ? <div className="grid xxs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-x-4 gap-y-4">{renderMeals()}</div>
                    : <h2>No Meal Items been Viewed Yet....</h2>
            }
        </div>
    )
}
