import { Link } from "react-router-dom"
import { useAppDispatch } from "../../hooks"
import { useConfirmUserAuth, useToGetIngredients } from "../../hooks/forComponents"
import { increaseCountForIngredient } from "./ingredientSlice"

export const IngredientsList = () => {
  const list = useToGetIngredients()

  // console.log(list, "ingredients!!")

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="xxs:text-2xl md:text-4xl">Total - {list.length} - Ingredients Found</h1>
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
    // <div className="flex flex-wrap justify-around gap-4">{content}</div>

    <div className="grid xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-4 xxs:text-xl md:text-2xl">
      {content}
    </div>
  )
}
