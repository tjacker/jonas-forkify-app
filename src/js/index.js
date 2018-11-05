import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

// Store global state of the app
const state = {};

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

		// Search for recipes
		await state.search.getResults();

		// Clear loading indicator
		clearLoader();

		// Render results in UI
		searchView.renderResults(state.search.result);
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
