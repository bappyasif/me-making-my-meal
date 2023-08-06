import { Link, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchFilterByCategory } from "../../data_fetching";
import { MealItemType } from "./categorySlice";
import { useForNextAndPrevTraversal, useConfirmUserAuth, useToCheckDataExistsOnFirebase, useToDispatchFetching } from "../../hooks/forComponents";
import { useTranslation } from "react-i18next";
import { increaseMealCount } from "../meals/mealsSlice";
import { PrevAndNextButtons } from "../ingredients/IngredientsList";

export const CategoryViewPage = () => {
    useToDispatchFetching(fetchFilterByCategory)

    const { name } = useParams()
    const { t } = useTranslation()

    return (
        <div className="z-10">
            <h1 className="text-center">{t(`${name}`)} : {t("Meals List")}</h1>
            <CategoryMeals />
        </div>
    )
}

const CategoryMeals = () => {
    const meals = useAppSelector(state => state.category.meals)

    const { handleNext, handlePrev, showNow, startsEnds } = useForNextAndPrevTraversal(meals, 15)

    const renderMeals = (
        (showNow as MealItemType[]).map(item => <RenderMeal id={item.id} mealImg={item.mealImg} mealName={item.mealName} key={item.id} />)
    )

    const { t } = useTranslation()

    const headingsContent = (
        <div className="flex justify-between gap-x-2 items-baseline w-full">

            <h2 className="xxs:text-xl md:text-2xl xl:text-4xl">{t("Total")} - {meals.length} - {t("Recipes")} {t("Found")}</h2>

            <h2 className="xxs:text-lg md:text-xl xl:text-2xl">{t("Currently Showing")} {startsEnds[0]} - {startsEnds[1] < meals.length ? startsEnds[1] : meals.length} </h2>
        </div>
    )

    return (
        <div className="flex flex-col gap-y-4 items-center">
            {headingsContent}
            <div className="grid xxs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-x-4 gap-y-4">{renderMeals}</div>
            <PrevAndNextButtons handleNext={handleNext} handlePrev={handlePrev} />
        </div>
    )
}

export const RenderMeal = ({ ...item }: MealItemType) => {
    const { id, mealImg, mealName } = item;

    const dispatch = useAppDispatch();

    const { ready } = useConfirmUserAuth()

    const { found } = useToCheckDataExistsOnFirebase("Meals", "Meal", mealName)

    const clickHandler = () => {
        ready && dispatch(increaseMealCount({ id, name: mealName, imgSrc: mealImg, update: found }))
    }

    return (
        <Link
            className="flex flex-col gap-x-4 text-center xxs:text-xl md:text-2xl lg:text-4xl w-fit opacity-80"
            onClick={clickHandler}
            to={`/meals/${id}`}
            title={mealName}
        >
            <h2 className="text-center bg-slate-600 px-4 text-slate-200 hover:text-slate-400 flex justify-center place-items-center xxs:h-fit xxs:text-xl xl:text-2xl xxs:w-fit sm:w-full mx-auto">{mealName.length > 15 ? mealName.slice(0, 15) + "...." : mealName}</h2>
            <img className="xxs:w-96 h-fit mx-auto rounded-lg" src={`${mealImg}`} alt={`${mealName}`} />
        </Link>
    )
}