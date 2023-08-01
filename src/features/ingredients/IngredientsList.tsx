import { Link } from "react-router-dom"
import { useAppDispatch } from "../../hooks"
import { useConfirmUserAuth, useToGetIngredients } from "../../hooks/forComponents"
import { increaseCountForIngredient } from "./ingredientSlice"

export const IngredientsList = () => {
  const list = useToGetIngredients()

  // console.log(list, "ingredients!!")

  return (
    <div>
      <h1>IngredientsList -- {list.length}</h1>
      <RenderList />
    </div>
  )
}

const RenderList = () => {
  const list = useToGetIngredients()
  
  const dispatch = useAppDispatch();

  const { ready } = useConfirmUserAuth()

  const handleClick = (ingredientName: string) => {
    ready && dispatch(increaseCountForIngredient(ingredientName))
  }

  const content = (
    list.map(item => {
      return (
        <div key={item.id} className="w-60">
          <Link onClick={() => handleClick(item.name)} to={`/ingredients/${item.name}`}>{item.name}</Link>
        </div>
      )
    })
  )

  return <div className="flex flex-wrap gap-8 justify-between text-2xl">{content}</div>
}
