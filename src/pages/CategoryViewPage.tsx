import { useParams } from "react-router-dom"
import { useAppDispatch } from "../hooks"
import { useEffect } from "react";
import { fetchFilterByCategory } from "../data_fetching";

export const CategoryViewPage = () => {
    const { categoryName } = useParams()
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchFilterByCategory(categoryName || ""))
        // dispatch(fetchFilterByCategory())
    }, [categoryName])

    return (
        <div>CategoryViewPage -- {categoryName}</div>
    )
}
