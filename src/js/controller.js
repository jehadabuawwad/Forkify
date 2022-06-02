import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import ResultsView from "./views/resultsView.js";
import SearchView from "./views/searchView.js";

if (module.hot) {
  module.hot.accept();
}
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // 1. loading Recipe
    await model.loadRecipe(id);
    // 2. rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    ResultsView.renderSpinner();
    // 1. get search query
    const query = SearchView.getQuery();
    if (!query) return;
    // 2. load search results
    await model.loadSearchResult(query);
    // 3. render search results
    ResultsView.render(model.state.search.results);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  recipeView.addHandelerRender(controlRecipes);
  SearchView.addHandelerSearch(controlSearchResult);
};

init();
