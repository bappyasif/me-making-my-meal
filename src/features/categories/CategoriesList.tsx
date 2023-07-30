import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks"
import { useConfirmUserAuth, useToGetCategories } from "../../hooks/forComponents"
import { CategoryItemType, increaseCategoryItemCount } from "./categoriesSlice";
import { useTranslation } from "react-i18next";

// type CategoryApiListType = {
//     strCategory: string,
//     strCategoryThumb: string,
//     idCategory: string
// }

export const CategoriesList = () => {
    const categories = useToGetCategories()

    const renderCategories = (
        categories?.map((item) => <RenderCategoryMeal count={item.count} id={item.id} imgSrc={item.imgSrc} name={item.name} key={item.id + item.name} />)
    )

    const { t } = useTranslation()

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-6xl">{t("Categories")} {t("List")}</h2>
            <div className="flex gap-4 justify-around flex-wrap w-full">{renderCategories}</div>
        </div>
    )
}

const RenderCategoryMeal = ({ ...item }: CategoryItemType) => {
    const { id, imgSrc, name, count } = item

    const dispatch = useAppDispatch();

    const { ready } = useConfirmUserAuth()

    const handleClicked = (itemName: string) => {
        ready && dispatch(increaseCategoryItemCount(itemName))
        // console.log(ready, "READY!!")
    }

    const { t } = useTranslation()

    return (
        <div key={id} className="w-96 h-96 aspect-square flex flex-col gap-4" onClick={() => handleClicked(`${name}`)}>
            <h2 className="text-center text-4xl">
                <Link 
                    to={`/categories/${name}`}
                    // style={{
                    //     pointerEvents: !ready ? "none" : "auto"
                    // }}
                >
                    <h2>{t(`${name}`)} - {count}</h2>
                    <img src={`${imgSrc}`} alt={`${name}`} />
                </Link>
                {/* <div>{name} - {count}</div> */}
            </h2>
            {/* <img src={`${imgSrc}`} alt={`${name}`} /> */}
        </div>
    )
}

export const FirstEightList = () => {
    const categories = useToGetCategories()

    const renderCategories = (
        categories?.map((item, idx) => idx < 8 && <RenderCategoryMeal id={item.id} imgSrc={item.imgSrc} name={item.name} key={item.id + item.name} count={item.count} />)
    )

    const { t } = useTranslation()

    return (
        <div className="flex flex-col gap-8 w-5/6 mx-auto">
            <div className="flex justify-between">
                <h2 className="text-4xl">{t(`Meal Categories`)}</h2>
                {/* <Link className="text-2xl" to={"/categories"}>{t("See All Available Categories")}</Link> */}
                <Link className="text-2xl" to={"/categories"}>{t("See All")}</Link>
            </div>
            <div className="flex gap-4 justify-around flex-wrap w-full">{renderCategories}</div>
        </div>
    )
}