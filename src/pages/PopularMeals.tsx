import { useTranslation } from "react-i18next";
import { RenderMeal } from "../features/category/CategoryViewPage";
import { useAppSelector } from "../hooks"
import { useForNextAndPrevTraversal } from "../hooks/forComponents";
import { ViewedMealType } from "../features/meals/mealsSlice";
import { PrevAndNextButtons } from "../features/ingredients/IngredientsList";

export const PopularMeals = () => {
    const mealsViewed = useAppSelector(state => state.meal.mealsViewed);

    const { handleNext, handlePrev, showNow, startsEnds, disableBtn } = useForNextAndPrevTraversal(mealsViewed, 15)

    const renderMeals = () => (
        (showNow as ViewedMealType[])?.map(item => <RenderMeal id={item.id} mealImg={item.imgSrc} mealName={item.name} key={item.id} />)
    )

    const { t } = useTranslation()

    const headingsContent = (
        <div className="flex justify-between gap-x-2 items-baseline w-full">

            <h2 className="xxs:text-xl md:text-2xl xl:text-4xl">{t("Total")} - {mealsViewed.length} - {t("Recipes")} {t("Found")}</h2>

            <h2 className="xxs:text-lg md:text-xl xl:text-2xl">{t("Currently Showing")} {startsEnds[0]} - {startsEnds[1] < mealsViewed.length ? startsEnds[1] : mealsViewed.length} </h2>
        </div>
    )

    return (
        <div className="flex flex-col gap-y-2 z-10 items-center">
            <h1 className="xxs:text-2xl md:text-4xl xl:text-6xl">{t("Popular Meals")}</h1>

            {headingsContent}

            {
                mealsViewed.length
                    ? <div className="grid xxs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-x-4 gap-y-4">{renderMeals()}</div>
                    : <h2>No Meal Items been Viewed Yet....</h2>
            }

            {
                mealsViewed.length > 15
                    ? <PrevAndNextButtons btnName={disableBtn} handleNext={handleNext} handlePrev={handlePrev} />
                    : null
            }
        </div>
    )
}
