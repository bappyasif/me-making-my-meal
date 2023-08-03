import { Link, useParams } from "react-router-dom"
// import { useAppDispatch } from "../hooks"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchFilterByCategory } from "../../data_fetching";
import { MealItemType } from "./categorySlice";
import { useConfirmUserAuth, useToDispatchFetching } from "../../hooks/forComponents";
import { useTranslation } from "react-i18next";
import { increaseMealCount } from "../meals/mealsSlice";

export const CategoryViewPage = () => {
    useToDispatchFetching(fetchFilterByCategory)

    const { name } = useParams()
    const { t } = useTranslation()

    return (
        <div>
            <h1>{t(`${name}`)} : {t("Meals List")}</h1>
            <CategoryMeals />
        </div>
    )
}

const CategoryMeals = () => {
    const meals = useAppSelector(state => state.category.meals)

    const renderMeals = (
        meals.map(item => <RenderMeal id={item.id} mealImg={item.mealImg} mealName={item.mealName} key={item.id} />)
    )

    return (
        <div className="grid xxs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-x-4 gap-y-4 w-max">{renderMeals}</div>
    )
}

export const RenderMeal = ({ ...item }: MealItemType) => {
    const { id, mealImg, mealName } = item;

    const dispatch = useAppDispatch();

    const { ready } = useConfirmUserAuth()

    const clickHandler = () => {
        ready && dispatch(increaseMealCount({ id, name: mealName, imgSrc: mealImg }))
        // console.log("DISPATCHED!!", {mealId:id, mealName, mealThumb: mealImg})
    }

    return (
        <Link className="mx-auto" onClick={clickHandler} to={`/meals/${id}`} key={id}>
            <h2 className="text-center bg-slate-600 px-4 text-slate-200 hover:text-slate-400 flex justify-center place-items-center h-12 xxs:w-64 sm:w-96">{mealName}</h2>
            <img className="xxs:text-xl md:text-2xl xxs:w-64 sm:w-96 xl:w-full h-fit xl:h-96" src={mealImg} alt={mealName} />
        </Link>
    )
}