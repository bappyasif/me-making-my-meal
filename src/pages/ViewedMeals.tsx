import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../hooks';

const ViewedMeals = () => {
    const { name } = useParams();
    const viewedMeal = useAppSelector(state => state.meal.mealsViewed)

    const getMealId = () => {
        const foundMeal = viewedMeal.find(meal => meal.name === name)
        if (foundMeal?.name) {
            return foundMeal.id
        } 
    }

    const navigate = useNavigate();

    const navigateToMealRoute = () => {
        const mealId = getMealId()
        if(mealId) {
            navigate(`/meals/${getMealId()}`)
        } else {
            alert("meal is not found!!")
            navigate("/meals")
        }
    }

    useEffect(() => {
        navigateToMealRoute()
    }, [name])

    return (
        <div>
            <h2>Viewing Meal - {name}</h2>
            <h2>Loading Data....</h2>
        </div>
    )
}

export default ViewedMeals