import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

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

		// Search for recipes
		await state.search.getResults();

		// Render results in UI
		searchView.renderResults(state.search.result);
	}
};

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});
