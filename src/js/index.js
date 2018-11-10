import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

// Store global state of the app
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
	// Get query from view
	const query = searchView.getInput();

	if (query) {
		// New search object to add to state
		state.search = new Search(query);

		// Prepare UI for results
		searchView.clearResults();
		searchView.clearInput();
		renderLoader(elements.searchResults);

		try {
			// Search for recipes
			await state.search.getResults();

			// Clear loading indicator
			clearLoader();

			// Render results in UI
			searchView.renderResults(state.search.result);
		} catch (error) {
			console.error(error);
			alert('There was a problem with your search. Please try again.');
			// Clear loading indicator
			clearLoader();
		}
	}
};

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

elements.searchResultsPages.addEventListener('click', e => {
	// Store button closest to element clicked
	const btn = e.target.closest('.btn-inline');

	// Get page number from data attribute
	if (btn) {
		const gotoPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, gotoPage);
	}
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
	const id = window.location.hash.substring(1);

	if (id) {
		// Prepare UI for changes

		// Create new recipe object
		state.recipe = new Recipe(id);

		try {
			// Get recipe data
			await state.recipe.getRecipe();

			// Calculate time and get servings
			state.recipe.calcTime();
			state.recipe.servings;

			// Render recipe
			console.dir(state.recipe);
		} catch (error) {
			console.error(error);
			alert('Unable to retrieve selected recipe. Please try again.');
		}
	}
};
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

// The above event listeners can be created using forEach
['hashchange', 'load'].forEach(event =>
	window.addEventListener(event, controlRecipe)
);
