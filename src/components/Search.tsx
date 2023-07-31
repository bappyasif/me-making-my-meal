import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { useAppSelector } from "../hooks";
import { CategoryItemType } from "../features/categories/categoriesSlice";
import { CuisineNameType } from "../features/area/areaSlices";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Search = () => {
    const [name, setName] = useState<string>("Categories");

    return (
        <div className="flex flex-col">
            {/* <p>Search</p> */}
            <ChooseSearchDomainOption name={name} setName={setName} />
            <SearchView name={name} />
        </div>
    )
}

const SearchView = ({ name }: { name: string }) => {
    const [text, setText] = useState<string>("")

    const [partialMatch, setPartialMatch] = useState<(CategoryItemType | CuisineNameType)[]>([])

    let items: (CategoryItemType | CuisineNameType)[] = [];

    if (name === "Categories") {
        items = useAppSelector(state => state.categories.list)
    } else if (name === "Cuisines") {
        items = useAppSelector(state => state.cuisine.list)
    } else if (name === "Ingredients") {
        items = useAppSelector(state => state.ingredient.list)
    } else if (name === "Popular Meals") {
        items = useAppSelector(state => state.meal.mealsViewed)
    }

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => setText(evt.target.value)

    const filterMatches = () => {
        const filtered = items.filter(item => {
            return item.name.includes(text) ? item : null
        })
        // console.log(filtered, "FILTYERED")
        setPartialMatch(filtered)
    }

    const renderPartials = () => partialMatch.map(item => {
        return (
            <Link key={item.name} onClick={() => setText("")} to={`/${name}/${item.name}`}>{item.name}</Link>
        )
    })

    useEffect(() => {
        text.length >= 1 && filterMatches()
        text.length == 0 && setPartialMatch([])
    }, [text])

    return (
        <div className="w-96 xxs:text-xl md:text-2xl">
            {/* Items - {items.length} */}
            <input className="w-full text-xl text-blue-900" type="text" value={text} onChange={handleChange} placeholder="type here to search" />
            {
                partialMatch.length
                    ?
                    <div className="flex flex-col gap-y-4 bg-slate-800 text-slate-400 h-60 overflow-y-scroll scroll-smooth">{renderPartials()}</div>
                    : null
            }
        </div>
    )
}

const ChooseSearchDomainOption = ({ name, setName }: { name: string, setName: Dispatch<SetStateAction<string>> }) => {
    const {t} = useTranslation()

    const options = ["Categories", "Cuisines", "Ingredients", "Popular Meals"];

    const handleClick = (nm: string) => setName(nm)

    const renderOptions = options.map(optName => {
        return (
            <fieldset key={optName} className="flex gap-2 items-center w-36" onClick={() => handleClick(optName)}>
                <input type="radio" name="option" id="option"
                    defaultChecked={optName === name} value={name} />
                <label className="" htmlFor={optName}>{t(`${optName}`)}</label>
            </fieldset>
        )
    })

    const content = (
        <div className="flex gap-x-6 xxs:w-full sm:w-96 flex-wrap text-xl">
            {renderOptions}
        </div>
    )

    return (
        <div className="">
            <h2 className="text-2xl">{t("Select Search Type")}</h2>
            {/* <h3>{name}</h3> */}
            {content}
        </div>
    )
}