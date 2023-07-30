import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchMealDetails } from "../../data_fetching";
import { useEffect } from "react";
import { IAMType } from "./mealsSlice";
import { useConfirmUserAuth, useToDispatchFetching, useToIncreaseCategoryAndCuisineCounts } from "../../hooks/forComponents";
import { increaseCountForIngredient } from "../ingredients/ingredientSlice";
import { TranslateMealsDetails } from "./TranslateMealsDetails";
import { useTranslation } from "react-i18next";
import { RenderIngredientsAndMeasurements } from "./TranslateIngredientsAndMeasurements";
import { FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import { Share, ShareableOptions } from "../../utils/shareInSocialMedia";
import { Helmet } from "react-helmet"
import { increaseCategoryItemCount } from "../categories/categoriesSlice";
import { inCreaseCountForCuisine } from "../area/areaSlices";
// import testImg from "../../assets/react.svg"

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

    // const navigate = useNavigate()

    // const dispatch = useAppDispatch()

    // const { ready } = useConfirmUserAuth()

    // const handleCategoryClick = (itemName:string) => {
    //     ready && dispatch(increaseCategoryItemCount(itemName))
    //     navigate(`/categories/${category}`)
    // }

    // const handleCuisineClick = (name:string) => {
    //     ready && dispatch(inCreaseCountForCuisine(name))
    //     navigate(`/cuisines/${cuisine}`)
    // }

    const { handleCategoryClick, handleCuisineClick } = useToIncreaseCategoryAndCuisineCounts(category, cuisine)

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
                    {/* <button onClick={() => handleCategoryClick(category)}>{t(`${category}`)}</button>
                    <button onClick={() => handleCuisineClick(cuisine)}>{t(`${cuisine}`)}</button> */}
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

    return (
        <>
            <Helmet>
                <meta name="keywords" content={mealName} />
                {/* <meta http-equiv="X-UA-Compatible" content={mealSource} /> */}
                <meta name="Description" content={`View Recipe, Instruction and Video, to make ${mealName}`} />
                <title>Meal Details: {mealName}</title>
                <meta property="og:type" content="article" />
                <meta property="og:video" content="https://example.com/bond/trailer.swf" />
                {/* <meta property="og:image" content="../../assets/react.svg" /> */}
                <meta property="og:image" content={mealThumb} />
                <meta name="twitter:card" content="summary_large_image" />
                {/* <meta name="twitter:card" content={mealThumb} /> */}
                <meta property="og:URL" content={mealThumb} />
                <meta property="og:image" content="http://www.vandal.com.br/products/15171-cine-grow" />
                <meta name="keywords" content={`${mealName}, ${category}`} />
                {/* <meta property="og:locale" content="en_GB" />
                <meta property="og:locale:alternate" content="fr_FR" />
                <meta property="og:locale:alternate" content="es_ES" /> */}
            </Helmet>

            {content}
        </>
    )
}

const RenderIngredientsAndMeasures = () => {
    const measures = useAppSelector(state => state.meal.measures);
    const ingredients = useAppSelector(state => state.meal.ingredients)

    // console.log(measures, ingredients);

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
