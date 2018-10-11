import Search from './models/Search';

// Store global state of the app
const state = {};

const controlSearch = async () => {
	// Get query from view
	const query = 'pizza'; //TODO:

	if (query) {
		// New search object to add to state
		state.search = new Search(query);
		// Prepare UI for results

		// Search for recipes
		await state.search.getResults();

		// Render results in UI
		console.log(state.search.result);
	}
};

document.querySelector('.search').addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});
