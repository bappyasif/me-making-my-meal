import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import store from './app/store.ts'
import { fetchCategories, fetchCuisines, fetchIngredients, fetchViewedMealsList } from './data_fetching/index.ts'
import "./i18n.ts"
// import { IntlProvider } from 'react-intl'
store.dispatch(fetchCuisines())
store.dispatch(fetchCategories())
store.dispatch(fetchIngredients())
store.dispatch(fetchViewedMealsList())
// store.dispatch(fetchOneRandomMeal())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<h1>Loading I18n</h1>}>
      {/* <IntlProvider locale='en' defaultLocale="es"> */}
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path='/*' element={<App />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      {/* </IntlProvider> */}
    </Suspense>
  </React.StrictMode>,
)
