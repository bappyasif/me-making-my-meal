import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { useAppSelector } from "../hooks";
import { CategoryItemType } from "../features/categories/categoriesSlice";
import { CuisineNameType } from "../features/area/areaSlices";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Search = () => {
    const [name, setName] = useState<string>("Categories");

    return (
        <div className="flex flex-col gap-y-2">
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
    } else if (name === "Viewed Meals") {
        items = useAppSelector(state => state.meal.mealsViewed)
    }

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => setText(evt.target.value)

    const filterMatches = () => {
        const filtered = items.filter(item => {
            return item.name.toLocaleLowerCase().includes(text.toLowerCase()) ? item : null
        })
        console.log(filtered, "FILTYERED", items)
        setPartialMatch(filtered)
    }

    const renderPartials = () => partialMatch.map(item => {
        // console.log(item.name, "url")
        return (
            <Link key={item.name} onClick={() => setText("")} to={`/${name}/${item.name}`}>{item.name}</Link>
        )
    })

    useEffect(() => {
        text.length >= 1 && filterMatches()
        text.length == 0 && setPartialMatch([])
    }, [text])

    return (
        <div className="w-full xxs:text-xl md:text-2xl relative">
            {/* Items - {items.length} */}
            <input className="xxs:w-fit sm:w-full text-xl text-blue-200 bg-slate-900 opacity-60 outline outline-1 rounded" type="text" value={text} onChange={handleChange} placeholder="type here to search" />
            {
                partialMatch.length
                    ?
                    <div className="absolute w-full flex flex-col gap-y-4 bg-slate-800 text-slate-400 h-60 overflow-y-scroll scroll-smooth">{renderPartials()}</div>
                    : null
            }
        </div>
    )
}

const ChooseSearchDomainOption = ({ name, setName }: { name: string, setName: Dispatch<SetStateAction<string>> }) => {
    const {t} = useTranslation()

    const options = ["Categories", "Cuisines", "Ingredients", "Viewed Meals"];

    const handleClick = (nm: string) => setName(nm)

    const renderOptions = options.map(optName => {
        return (
            <fieldset title={optName} key={optName} className="flex gap-2 items-center xxs:w-fit" onClick={() => handleClick(optName)}>
                <input type="radio" name="option" id={optName}
                    defaultChecked={optName === name} value={name} />
                <label className="" htmlFor={optName}>{t(`${optName}`)}</label>
            </fieldset>
        )
    })

    const content = (
        <div className="grid xxs:grid-cols-1 sm:grid-cols-2 gap-x-6 xxs:text-lg md:text-xl">
            {renderOptions}
        </div>
    )

    return (
        <div className="">
            <h2 className="xxs:text-xl md:text-2xl text-start">{t("Select Search Type")}</h2>
            {/* <h3>{name}</h3> */}
            {content}
        </div>
    )
}