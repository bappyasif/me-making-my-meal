import { Link } from "react-router-dom"
import { useAppDispatch } from "../../hooks"
import { useConfirmUserAuth, useToGetIngredients } from "../../hooks/forComponents"
import { increaseCountForIngredient } from "./ingredientSlice"

export const IngredientsList = () => {
  const list = useToGetIngredients()

  // console.log(list, "ingredients!!")

  return (
    <div className="flex flex-col gap-y-8 w-full">
        <h1>Total - {list.length} - Ingredients Found</h1>
        <RenderList />
      </div>
  )
}

export const RenderList = () => {
  const list = useToGetIngredients()

  const dispatch = useAppDispatch();

  const { ready } = useConfirmUserAuth()

  const handleClick = (ingredientName: string) => {
    ready && dispatch(increaseCountForIngredient(ingredientName))
  }

  const content = (
    list.map(item => {
      return (
        <div key={item.id} className="h-20 bg-slate-600 px-2 flex justify-center items-center">
          <Link className="text-slate-400 hover:text-blue-200" onClick={() => handleClick(item.name)} to={`/ingredients/${item.name}`}>{item.name}</Link>
        </div>
      )
    })
  )

  return (
    <div className="grid xxs:1 sm:grid-cols-2 md:grid-cols-3 xxl:grid-cols-4 gap-4 text-2xl">
      {content}
    </div>
  )
}
