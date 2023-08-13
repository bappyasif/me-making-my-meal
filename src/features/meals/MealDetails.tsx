import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchMealDetails } from "../../data_fetching";
import { useToDispatchFetching, useToIncreaseCategoryAndCuisineCounts } from "../../hooks/forComponents";
import { increaseCountForIngredient } from "../ingredients/ingredientSlice";
import { TranslateMealsDetails } from "./TranslateMealsDetails";
import { useTranslation } from "react-i18next";
import { ShareableOptions } from "../../utils/shareInSocialMedia";
import { Helmet } from "react-helmet"

export const MealDetails = () => {
    useToDispatchFetching(fetchMealDetails)

    return <RenderMealBasicInfo />
}

// type IAMT = {
//     measures: IAMType[],
//     ingredients: IAMType[]
// }

export const RenderMealBasicInfo = () => {
    const meal = useAppSelector(state => state.meal.meal)

    const { category, cuisine, instructions, mealId, mealName, mealSource, mealThumb, mealTube } = meal

    // const renderTags = mealTags?.split(",").map(name => <span key={name}>{name}</span>)

    const { t } = useTranslation()

    const content = (
        <div key={mealId} className="flex flex-col items-center gap-y-8 mx-auto z-10">

            <h1 className="text-center bg-slate-600 px-4 text-slate-200 hover:text-slate-400 flex justify-center place-items-center xxs:h-fit xxs:text-2xl xl:text-4xl xxl:text-6xl mx-auto rounded">{mealName}</h1>

            <a className="nav-item px-2 rounded" target="_blank" href={mealSource}>{t("Visit Source Website")}</a>

            {/* <Share description={mealName} /> */}

            <ShareableOptions category={category} mealName={mealName} img={mealThumb} />

            <div className="mx-auto xxs:text-xl md:text-2xl">
                <img className="xxs:w-64 sm:w-96 xl:w-full rounded-lg" src={mealThumb} alt={mealName} />

                <CategoryAndCuisineButton category={category} cuisine={cuisine} />
            </div>

            {/* <RenderIngredientsAndMeasurements /> */}
            <RenderIngredientsAndMeasures />

            {/* {renderInstructions} */}
            <TranslateMealsDetails qStr={instructions} />
            {/* <TranslateMealsDetails qStr={instructions.split(".").join(" *")} /> */}

            <iframe className="xxs:w-5/6 lg:w-1/2 lg:h-96" width="720" height="315"
                src={`${mealTube.replace("watch?v=", "embed/")}`}>
            </iframe>
        </div>
    )

    // console.log(mealThumb, "mealThumb")

    return (
        <>
            <Helmet>
                <meta name="keywords" content={mealName} />
                {/* <meta http-equiv="X-UA-Compatible" content={mealSource} /> */}
                <meta name="Description" content={`View Recipe, Instruction And Video, How To Make ${mealName}`} />
                <title>Meal Details: {mealName}</title>
                <meta property="og:type" content="article" />
                {/* <meta property="og:video" content="https://example.com/bond/trailer.swf" /> */}
                {/* <meta property="og:image" content="../../assets/react.svg" /> */}
                <meta property="og:image" content={mealThumb} />

                {/* <meta name="twitter:image" content="summary_large_image" />
                <meta name="twitter:image:src" content="https://www.themealdb.com/images/media/meals/uyqrrv1511553350.jpg" />
                <meta name="twitter:image:src" content={mealThumb} />
                <meta name="twitter:image" content="https://www.themealdb.com/images/media/meals/uyqrrv1511553350.jpg" />
                <meta name="twitter:image" content={mealThumb} />
                <meta name="twitter:card" content={mealThumb} /> */}

                {/* <meta property="og:URL" content={mealThumb} /> */}
                {/* <meta property="og:image" content="http://www.vandal.com.br/
                products/15171-cine-grow" /> */}
                <meta property="og:image" content={mealThumb} />
                <meta name="keywords" content={`${mealName}, ${category}`} />
                {/* <meta property="og:locale" content="en_GB" />
                <meta property="og:locale:alternate" content="fr_FR" />
                <meta property="og:locale:alternate" content="es_ES" /> */}
            </Helmet>

            {content}
        </>
    )
}

export const CategoryAndCuisineButton = ({ category, cuisine }: { category: string, cuisine: string }) => {
    const { handleCategoryClick, handleCuisineClick } = useToIncreaseCategoryAndCuisineCounts(category, cuisine)

    const { t } = useTranslation()

    return (
        <p className="flex gap-4">
            <button className="text-center xxs:text-xl xl:text-2xl xxs:py-1 sm:py-1.5 md:py-2" onClick={handleCategoryClick}>{t(`${category}`)}</button>
            <button className="text-center xxs:text-xl xl:text-2xl xxs:py-1 sm:py-1.5 md:py-2" onClick={handleCuisineClick}>{t(`${cuisine}`)}</button>
        </p>
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
                <div
                    key={item.text + idx}
                    className="flex justify-center gap-x-2 xxs:text-lg md:text-2xl w-full"
                >
                    <Link className="nav-item px-2 opacity-80 h-fit rounded text-center w-96" to={`/ingredients/${item.text}`} onClick={() => handleClick(item.text)} title={item.text}>{item.text.length > 11 ? item.text.slice(0, 11) + "...." : item.text}</Link>
                    <span className="w-9">--</span>
                    <span className="w-full h-fit bg-slate-800 text-slate-400 text-center" title={measures[idx].text}>{measures[idx].text.length > 12 ? measures[idx].text.slice(0, 12) + "...." : measures[idx].text}</span>
                </div>
            )
        })
    )

    const contentForSmallerScreens = (
        ingredients.map((item, idx) => {
            return (
                <div
                    key={item.text + idx}
                    className="flex justify-center gap-x-2 xxs:text-lg md:text-2xl w-full"
                >
                    <Link className="nav-item px-2 opacity-80 h-fit rounded text-center w-96" to={`/ingredients/${item.text}`} onClick={() => handleClick(item.text)} title={item.text}>{item.text}</Link>
                    <span className="w-9">--</span>
                    <span className="w-full h-fit bg-slate-800 text-slate-400 text-center" title={measures[idx].text}>{measures[idx].text}</span>
                </div>
            )
        })
    )

    const { t } = useTranslation()

    // const btnElement = (
    //     <>
    //         <button>{t("Translate Me")}</button>
    //     </>
    // )

    return (
        <div className="flex flex-col items-center gap-y-8 mx-auto">
            <div className="flex gap-4">
                <h2 className="text-4xl">{t("Ingredients And Measurements")}</h2>
                {/* {btnElement} */}
            </div>
            {/* <div className="grid xxs:grid-cols-1 lg:grid-cols-2 xxl:grid-cols-3 gap-x-6 gap-y-2 xxs:text-xl md:text-2xl w-full">
                {content}
            </div> */}

            <div className="xxs:hidden xl:grid xxs:grid-cols-1 lg:grid-cols-2 xxl:grid-cols-3 gap-x-6 gap-y-2 xxs:text-xl md:text-2xl w-full">
                {content}
            </div>

            <div className="xxs:grid xl:hidden xxs:grid-cols-1 lg:grid-cols-2 xxl:grid-cols-3 gap-x-6 gap-y-2 xxs:text-xl md:text-2xl w-full">
                {contentForSmallerScreens}
            </div>
        </div>
    )
}
