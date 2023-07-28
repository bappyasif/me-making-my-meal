# Me Making My Meal - 4M

api: https://www.themealdb.com/

## core functionalities:
### from api
* view by meal categories
* view by meal regions
* view by meal Ingredients
* search meal by name
* search meal by id
* search a meal randomly
* seatch meal by first letter
### for app
* single page application
* show most popular searches - involves db - maybe firebase
* show most popular categories - involves db - maybe firebase
* show most popular cuisine - involves db - maybe firebase
* make recipes shareable (if possible without nextjs - something new)
* make recipes emailable
* make app diferent language friendly - something new
* make user annonymously authenticated on visit and interactions -- something new
### app stack
* tailwindcss
* firebase - for user data (wont be making a backend services for this app)
* typescript
* react
* reducx-toolkits
* react-router-dom
* react-icons
* tanstack react queries / redux-toolkits provided optimistic fetching
### app ui - brainstorming
* header
    * 4M - app name
    * search - show example search terms
    * Filters modal - by category, area, ingredients
* each modal options will show bare minimuum results after taking them to their designated route page
    * in that route page there will be a big carousel kinds of views with various items list
    * users can click on those items and go to their respective route page
* landing page
    * bare minimum items with recipe cards for each category
* recipe card
    * each recipe will have many available data points
    * each recipe will have image
    * each recipe will have ingredients
    * each recipe will have instructions
* footer page
    * stack in use
    * copyrights
    * get in touch 
* firebase:
    * for each increment function firebase will make stores value
    * for rendering firebase will fetch those related data from there

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
