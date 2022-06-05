import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import SearchView from "./views/searchView.js";
import RecipeView from "./views/recipeView.js";
import ResultsView from "./views/resultsView.js";
import PaginationView from "./views/paginationView.js";
import BookmarksView from "./views/bookmarksView.js";
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    RecipeView.renderSpinner();
    ResultsView.render(model.getSearchResultPage());
    BookmarksView.render(model.state.bookmarks);
    await model.loadRecipe(id);
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError();
    console.error(err);
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
    PaginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

const controlPagination = function (goToPage) {
  ResultsView.render(model.getSearchResultPage(goToPage));
  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  RecipeView.render(model.state.recipe);
};

const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  RecipeView.render(model.state.recipe);

  BookmarksView.render(model.state.bookmarks);
};

const init = function () {
  BookmarksView.addHandlerRender(controlBookmarks);
  RecipeView.addHandelerRender(controlRecipes);
  RecipeView.addHandelerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandelerSearch(controlSearchResult);
  PaginationView.addHndlerClick(controlPagination);
};

init();
