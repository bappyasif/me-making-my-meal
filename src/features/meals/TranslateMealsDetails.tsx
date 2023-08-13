import { useEffect, useState } from "react"
// import { FormattedMessage, IntlProvider } from "react-intl";
import { translateContent, translateOptions } from "../../utils/rapidApiTextTranslation";
import i18next from 'i18next';
import { useTranslation } from "react-i18next";

export const TranslateMealsDetails = ({ qStr }: { qStr: string }) => {
    const [translate, setTranslate] = useState<boolean>(false);
    const [translatedText, setTranslatedText] = useState<string>("")
    const [translateBack, setTranslateBack] = useState<boolean>(false)

    const beginTranslation = async () => {
        translateContent().then((data: any) => {
            // const formattedText = data.translatedText.split()
            // console.log(data, "DATATA", data.data.translatedText)
            if (data.data?.translatedText) {
                setTranslatedText(data.data.translatedText || "")
                handleToggle()
            }
            setTranslate(false);
            // setTranslateBack(false)
        }).catch((err: any) => console.log(err.message))

        // const res = await fetch("https://libretranslate.com/translate", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         q: "Hello World!",
        //         source: "en",
        //         target: "es"
        //     }),
        //     headers: { "Content-Type": "application/json" }
        // });

        // console.log(await res.json(), "LIBREEEE");

    }

    const configureOptions = () => {
        if (qStr.split("").length > 2000) {
            alert("please consider to use google transolator, using free tier translation service")
        } else {
            translateOptions.body = new URLSearchParams({
                // text: 'Hello, world!',
                text: qStr.split(".").join("*"),
                target_language: i18next.language,
                source_language: 'en'
            })

            setTranslate(true)
            translatedText && handleToggle()
        }
    }

    useEffect(() => {
        !translatedText && translate && beginTranslation()
    }, [translate])

    // useEffect(() => {
    //     configureOptions()
    // }, [])

    const renderInstructions = () => {
        if (translatedText.length && translateBack) {
            return translatedText.split("*").map((text, idx) => text && <li className="w-full" key={idx}>{text}</li>)
        } else {
            return qStr.split(".").map((text, idx) => text && <li key={idx}>{text}</li>)
        }
    }

    const handleToggle = () => setTranslateBack(prev => !prev)

    const { t } = useTranslation()

    console.log(i18next.language, "i18next.language")

    const translateBtn = (
        translatedText?.length && translateBack
            ? <button onClick={handleToggle}>{t("To English")}</button>
            : <button onClick={configureOptions}>{t("Translate Me")}</button>
    )

    const content = (
        <div className="flex flex-col items-center gap-y-4">
            <div className="flex gap-4">
                <h2 className="text-4xl">{t("Instructions")}</h2>
                
                {
                    i18next.language !== "en"
                    ? translateBtn
                    : null
                }
            </div>

            <ul className="flex gap-x-8 gap-y-2 flex-wrap w-3/4 list-disc xxs:text-xl md:text-2xl">{renderInstructions()}</ul>
            {/* <ul className="text-2xl list-disc flex flex-wrap gap-x-8 gap-y-6 w-5/6">{renderInstructions()}</ul> */}
        </div>
    )

    return (
        <div>
            {content}
        </div>
    )
}
