import { useAppSelector } from "../../hooks"
import { fetchCuisineMeals } from "../../data_fetching";
import { useParams } from "react-router-dom";
import { useForNextAndPrevTraversal, useToDispatchFetching } from "../../hooks/forComponents";
import { useTranslation } from "react-i18next";
import { RenderMeal } from "../category/CategoryViewPage";
import { PrevAndNextButtons } from "../ingredients/IngredientsList";
import { MealItemType } from "../category/categorySlice";

export const CuisineMeals = () => {
    useToDispatchFetching(fetchCuisineMeals)

    const meals = useAppSelector(state => state.cuisine.meals)

    const { handleNext, handlePrev, showNow, startsEnds, disableBtn } = useForNextAndPrevTraversal(meals, 20)

    const renderMeals = (
        (showNow as MealItemType[]).map(item => <RenderMeal id={item.id} mealImg={item.mealImg} mealName={item.mealName} key={item.id} />)
    )

    const { name } = useParams()
    const { t } = useTranslation()

    const headingsContent = (
        <div className="flex justify-between gap-x-2 items-baseline w-full">
            <h1 className="xxs:text-xl md:text-2xl xl:text-4xl">{meals.length} {t("Recipes")} {t("Found")}</h1>
            <h2 className="xxs:text-lg md:text-xl xl:text-2xl">{t("Currently Showing")} {startsEnds[0]} - {startsEnds[1] < meals.length ? startsEnds[1] : meals.length} </h2>
        </div>
    )

    return (
        <div className="flex flex-col gap-y-4 items-center z-10">
            <h1 className="xxs:text-2xl md:text-4xl xl:text-6xl">{t(`${name}`)} {t("Meals List")}</h1>

            {headingsContent}

            <div className="grid xxs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-4 xxs:text-xl md:text-2xl">
                {renderMeals}
            </div>

            {
                meals.length > 20
                ? <PrevAndNextButtons btnName={disableBtn} handleNext={handleNext} handlePrev={handlePrev} />
                : null
            }
        </div>
    )
}
