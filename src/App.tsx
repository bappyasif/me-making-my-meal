import { Route, Routes } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { HomePage } from "./pages/HomePage"
import { CategoryViewPage } from "./features/category/CategoryViewPage"
import { MealDetails } from "./features/meals/MealDetails"
import { CuisineMeals } from "./features/area/CuisineMeals"
import { IngredientMeals } from "./features/ingredients/IngredientMeals"
import { CategoriesList } from "./features/categories/CategoriesList"
import { CuisinesList } from "./features/area/CuisinesList"
import { PopularMeals } from "./pages/PopularMeals"
import { useEffect } from "react"
import { checkUserAuthStatus } from "./firebase/utils"
import { useToCheckIfUrlHasMealIdAsShallowRouting } from "./hooks/forComponents"
import { IngredientsList } from "./features/ingredients/IngredientsList"
import { HeaderImage } from "./components/SomeImages"
import appBg from "./assets/app_bg.jpg"
function App() {
  useToCheckIfUrlHasMealIdAsShallowRouting()

  useEffect(() => {
    checkUserAuthStatus()
    // annoymousAuth()
    // onFo()
  }, [])

  // console.log(window.location.pathname, window.location.href.split("?")[1].split("=")[1])

  return (
    <div
      className="flex flex-col gap-11"
      style={{
        backgroundImage: `url("${appBg}")`,
        objectFit: "fill",
        backgroundRepeat: "repeat",
        backgroundSize: "100% 100%",
        backgroundColor: "rgba(17,17,17,0.6)",
        // backgroundColor: "burlywood",
        backgroundBlendMode: "darken"
      }}
    >
      <HeaderImage />
      {/* <AppBackgroundImage /> */}
      <div
        className="flex flex-col gap-y-24 items-center justify-between min-h-full xxs:w-full md:w-5/6 mx-auto"
      >
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/categories">
            <Route index element={<CategoriesList />} />
            <Route path=":name" element={<CategoryViewPage />} />
          </Route>
          <Route path="/cuisines">
            <Route index element={<CuisinesList />} />
            <Route path=":name" element={<CuisineMeals />} />
          </Route>
          <Route path="/ingredients">
            <Route index element={<IngredientsList />} />
            <Route path=":name" element={<IngredientMeals />} />
          </Route>
          <Route path="meals">
            <Route index element={"Meals Route"} />
            <Route path=":id" element={<MealDetails />} />
          </Route>
          <Route path="popularMeals">
            <Route index element={<PopularMeals />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </div>
      <Footer />
    </div>
  )
}

export default App
