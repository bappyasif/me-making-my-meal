import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { increaseCountForIngredient } from "../ingredients/ingredientSlice";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { translateContent, translateOptions } from "../../utils/rapidApiTextTranslation";
import i18next from "i18next";
import { IAMType } from "./mealsSlice";

export const RenderIngredientsAndMeasurements = () => {
    const measures = useAppSelector(state => state.meal.measures);
    const ingredients = useAppSelector(state => state.meal.ingredients);

    const [translatedIngredients, setTranslatedIngredients] = useState<IAMType[]>([])
    const [translatedMeasurements, setTranslatedMeasurements] = useState<IAMType[]>([])

    const [translate, setTranslate] = useState(false)
    // const [translateMeasurements, setTranslateMeasurements] = useState(false)

    console.log(measures, ingredients);

    const dispatch = useAppDispatch();

    const handleClick = (ingredientName: string) => {
        dispatch(increaseCountForIngredient(ingredientName))
        // navigate(`/ingredients/${ingredientName}`)
    }

    const renderItems = (data: IAMType[], data2: IAMType[]) => {
        return data.map((item, idx) => {
            return (
                <div key={item.text + idx} className="flex gap-4 text-2xl w-96">
                    <Link to={`/ingredients/${item.text}`} onClick={() => handleClick(item.text)}>{item.text}</Link> -- <span>{data2[idx].text}</span>
                </div>
            )
        })
    }

    const content = (
        translatedIngredients.length && translatedMeasurements.length
            ? renderItems(translatedIngredients, translatedMeasurements)
            : ingredients.length
                ? renderItems(ingredients, measures)
                : null
    )

    const { t } = useTranslation()

    // const beginTranslationsForMeasurements = () => {
    //     translateContent().then(data => {
    //         if (data?.data?.translatedText) {
    //             const convertedArr = data.data.translatedText.split("*").map((item: string) => ({ text: item }))
    //             console.log(convertedArr, "coverted arr!!", data.data.translatedText)
    //             setTranslatedMeasurements(convertedArr)
    //             // setTranslatedMeasurements(data.data.translatedText)
    //         }
    //     }).catch(err => console.log(err.message))
    // }

    // const makeReadyOptionsAgain = () => {
    //     translateOptions.body = new URLSearchParams({
    //         // text: 'Bye Bye!',
    //         text: measures.map(item => item.text).join("*"),
    //         // text: 'Bye, Bye!'.split(",").join("*"),
    //         target_language: i18next.language,
    //         source_language: 'en'
    //     })

    //     setTranslateMeasurements(true)
    // }

    const beginTranslations = () => {
        translateContent().then(data => {
            if (data?.data?.translatedText) {
                console.log(data.data.translatedText, "RESUKLTSSS")
                // setTranslatedIngredients(data.data.translatedText)
                // const convertedArr = data.data.translatedText.split("*").map((item: string) => ({ text: item }))
                // console.log(convertedArr, "coverted arr!!", data.data.translatedText)
                // setTranslatedIngredients(convertedArr)
                // !translatedIngredients?.length && makeReadyOptionsAgain()
            }
        }).catch(err => console.log(err.message))
    }

    const handleTranslate = () => {
        let newDataset = ingredients.map(item => item.text).join("_*_")
        const newMeasurements = measures.map(item => item.text).join("_#_")
        newDataset = newDataset.concat(newMeasurements)
        console.log(newDataset, "newDataset")
        if (translatedIngredients.length) {
            alert("already translated")
        } else {
            translateOptions.body = new URLSearchParams({
                // text: 'Hello, world!',
                // text: ingredients.map(item => item.text).join("*"),
                text: newDataset,
                // text: 'funck, off!'.split(",").join("*"),
                target_language: i18next.language,
                source_language: 'en'
            })

            setTranslate(true);
            // beginTranslations()
        }
    }

    useEffect(() => {
        translate && beginTranslations()
    }, [translate])

    // useEffect(() => {
    //     translateMeasurements && beginTranslationsForMeasurements()
    // }, [translateMeasurements])

    const btnElement = (
        <>
            <button onClick={handleTranslate}>{t("Translate Me")}</button>
        </>
    )

    // console.log(translatedIngredients, translatedMeasurements, "what what!!", measures.map(item => item.text).join("*"), ingredients.map(item => item.text).join("*"))

    useEffect(() => {
        setTranslatedIngredients([])
        setTranslatedMeasurements([])
    }, [])

    return (
        <div className="flex flex-col items-center gap-y-8">
            <div className="flex gap-4">
                <h2 className="text-4xl">{t("Ingredients And Measurements")}</h2>
                {btnElement}
            </div>
            <div className="flex gap-x-8 gap-y-4 flex-wrap justify-center w-5/6">
                {content}
            </div>
        </div>
    )
}


/**
 * 
 * 
 const beginTranslationsForMeasurements = () => {
        translateContent().then(data => {
            if (data?.data?.translatedText) {
                const convertedArr = data.data.translatedText.split("*").map((item: string) => ({ text: item }))
                console.log(convertedArr, "coverted arr!!", data.data.translatedText)
                setTranslatedMeasurements(convertedArr)
                // setTranslatedMeasurements(data.data.translatedText)
            }
        }).catch(err => console.log(err.message))
    }

    const makeReadyOptionsAgain = () => {
        translateOptions.body = new URLSearchParams({
            // text: 'Bye Bye!',
            text: measures.map(item => item.text).join("*"),
            // text: 'Bye, Bye!'.split(",").join("*"),
            target_language: i18next.language,
            source_language: 'en'
        })

        setTranslateMeasurements(true)
    }

    const beginTranslations = () => {
        translateContent().then(data => {
            if (data?.data?.translatedText) {
                // setTranslatedIngredients(data.data.translatedText)
                const convertedArr = data.data.translatedText.split("*").map((item: string) => ({ text: item }))
                console.log(convertedArr, "coverted arr!!", data.data.translatedText)
                setTranslatedIngredients(convertedArr)
                !translatedIngredients?.length && makeReadyOptionsAgain()
            }
        }).catch(err => console.log(err.message))
    }

    const handleTranslate = () => {
        if (translatedIngredients.length) {
            alert("already translated")
        } else {
            translateOptions.body = new URLSearchParams({
                // text: 'Hello, world!',
                text: ingredients.map(item => item.text).join("*"),
                // text: 'funck, off!'.split(",").join("*"),
                target_language: i18next.language,
                source_language: 'en'
            })

            setTranslate(true);
            // beginTranslations()
        }
    }

    useEffect(() => {
        translate && beginTranslations()
    }, [translate])

    useEffect(() => {
        translateMeasurements && beginTranslationsForMeasurements()
    }, [translateMeasurements])
 */