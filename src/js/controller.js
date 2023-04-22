import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookMarksView from './views/bookMarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;

    recipeView.renderSpinner();
    resultView.update(model.getSearchResultPage());
    bookMarksView.update(model.state.bookMarks);
    ///getting data
    await model.loadRecipe(id);

    /////rendering data
    recipeView.render(model.state.recipe);
    //Test
    // controllServings();
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    //getting query
    resultView.renderSpinner();
    const query = SearchView.getQuery();
    if (!query) return;
    //loading data
    await model.loadSearchResults(query);
    //rendering data
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  // console.log('page controller');
  resultView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
};
const controllServings = function (newServings) {
  model.updateServing(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlAddBookMarks = function () {
  if (!model.state.recipe.bookMarks) model.addBookMarks(model.state.recipe);
  else model.deleteBookMarks(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookMarksView.render(model.state.bookMarks);

  // console.log(model.state.recipe);
};
const controlBookMarks = function () {
  bookMarksView.render(model.state.bookMarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    // console.log(newRecipe);
    await model.addRecipe(newRecipe);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderSuccess();
    bookMarksView.render(model.state.bookMarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
    // addRecipeView._parentElement.innerHTML = '';
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookMarksView.addHandlerRender(controlBookMarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controllServings);
  recipeView.addHandlerAddBookMarks(controlAddBookMarks);
  SearchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerPagination(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('Welcome');
};
init();
