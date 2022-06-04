import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import paginationView from "./views/paginationView.js";
import RecipeView from "./views/recipeView.js";
import ResultsView from "./views/resultsView.js";
import SearchView from "./views/searchView.js";

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    ResultsView.render(model.getSearchResultPage());
    RecipeView.renderSpinner();
    // 1. loading Recipe
    await model.loadRecipe(id);
    // 2. rendering recipe
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError();
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
    ResultsView.render(model.getSearchResultPage());
    // 4. Render paginination
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

const controlPagination = function (goToPage) {
  ResultsView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  // RecipeView.render(model.state.recipe);
  RecipeView.render(model.state.recipe);
};

const init = function () {
  RecipeView.addHandelerRender(controlRecipes);
  RecipeView.addHandelerUpdateServings(controlServings);
  SearchView.addHandelerSearch(controlSearchResult);
  paginationView.addHndlerClick(controlPagination);
};

init();
