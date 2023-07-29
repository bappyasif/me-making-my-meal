import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchMealDetails } from "../../data_fetching";
import { useEffect } from "react";
import { IAMType } from "./mealsSlice";
import { useToDispatchFetching } from "../../hooks/forComponents";
import { increaseCountForIngredient } from "../ingredients/ingredientSlice";
import { TranslateMealsDetails } from "./TranslateMealsDetails";
import { useTranslation } from "react-i18next";
import { RenderIngredientsAndMeasurements } from "./TranslateIngredientsAndMeasurements";
import { FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import { Share, ShareableOptions } from "../../utils/shareInSocialMedia";

export const MealDetails = () => {
    // const { mealId } = useParams()
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(fetchMealDetails(mealId || ""))
    // }, [mealId])

    useToDispatchFetching(fetchMealDetails)

    return (
        <div>
            {/* <h1>MealDetails</h1> */}
            {/* {measures.length} -- {ingredients.length} */}
            <RenderMealBasicInfo
            // ingredients={ingredients} measures={measures} 
            />
        </div>
    )
}

type IAMT = {
    measures: IAMType[],
    ingredients: IAMType[]
}

export const RenderMealBasicInfo = () => {
    const meal = useAppSelector(state => state.meal.meal)

    const { category, cuisine, instructions, mealId, mealName, mealSource, mealTags, mealThumb, mealTube } = meal

    // const renderIAMT = ()

    const navigate = useNavigate()

    const handleCategoryClick = () => navigate(`/categories/${category}`)

    const handleCuisineClick = () => navigate(`/cuisines/${cuisine}`)

    const renderTags = mealTags?.split(",").map(name => <span key={name}>{name}</span>)

    const { t } = useTranslation()

    const content = (
        <div key={mealId} className="flex flex-col items-center gap-y-8">
            <h1>{mealName}</h1>

            <a target="_blank" href={mealSource}>{t("Visit Source Website")}</a>

            {/* <Share description={mealName} /> */}

            <ShareableOptions category={category} mealName={mealName} img={mealThumb} />

            <div className="mx-auto">
                <img className="aspect-square h-96" src={mealThumb} alt={mealName} />

                <p className="flex gap-4">
                    <button onClick={handleCategoryClick}>{t(`${category}`)}</button>
                    <button onClick={handleCuisineClick}>{t(`${cuisine}`)}</button>
                </p>
                {/* <p className="flex gap-4">{renderTags}</p> */}
            </div>

            {/* <RenderIngredientsAndMeasurements /> */}
            <RenderIngredientsAndMeasures />

            {/* {renderInstructions} */}
            <TranslateMealsDetails qStr={instructions} />
            {/* <TranslateMealsDetails qStr={instructions.split(".").join(" *")} /> */}

            <iframe width="720" height="315"
                src={`${mealTube.replace("watch?v=", "embed/")}`}>
            </iframe>
        </div>
    )

    return content
}

const RenderIngredientsAndMeasures = () => {
    const measures = useAppSelector(state => state.meal.measures);
    const ingredients = useAppSelector(state => state.meal.ingredients)

    console.log(measures, ingredients);

    const dispatch = useAppDispatch();

    const handleClick = (ingredientName: string) => {
        dispatch(increaseCountForIngredient(ingredientName))
        // navigate(`/ingredients/${ingredientName}`)
    }

    const content = (
        ingredients.map((item, idx) => {
            return (
                <div key={item.text + idx} className="flex gap-4 text-2xl w-96">
                    <Link to={`/ingredients/${item.text}`} onClick={() => handleClick(item.text)}>{item.text}</Link> -- <span>{measures[idx].text}</span>
                </div>
            )
        })
    )

    const { t } = useTranslation()

    const btnElement = (
        <>
            <button>{t("Translate Me")}</button>
        </>
    )

    return (
        <div className="flex flex-col items-center gap-y-8">
            <div className="flex gap-4">
                <h2 className="text-4xl">{t("Ingredients And Measurements")}</h2>
                {/* {btnElement} */}
            </div>
            <div className="flex gap-x-8 gap-y-4 flex-wrap justify-center w-5/6">
                {content}
            </div>
        </div>
    )
}
