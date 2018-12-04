import { elements } from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
	// Wrapped in curly braces so there is no implicit return statement
	elements.searchInput.value = '';
};

export const clearResults = () => {
	elements.searchResultsList.innerHTML = '';
	elements.searchResultsPages.innerHTML = '';
};

export const highlightSelected = id => {
	// Remove active class from any prior selected recipes
	// Convert HTMLCollection to an array
	const recipeListItems = Array.from(
		document.getElementsByClassName('results__link--active')
	);

	// Remove active class from any prior selected recipes
	if (recipeListItems) {
		recipeListItems.forEach(item =>
			item.classList.remove('results__link--active')
		);
	}

	// Add active class to currently selected recipe
	const selectedRecipe = document.querySelector(
		`.results__link[href="#${id}"]`
	);
	if (selectedRecipe) {
		selectedRecipe.classList.add('results__link--active');
	}
};

export const limitRecipeTitle = (title, limit = 30) => {
	const truncTitle = [];
	if (title.length > limit) {
		title.split(' ').reduce((acc, cur) => {
			if (acc + cur.length <= limit) {
				truncTitle.push(cur);
			}
			return acc + cur.length;
		}, 0);
		return `${truncTitle.join(' ')} ...`;
	}
	return title;
};

const renderRecipe = recipe => {
	const { recipe_id: id, image_url: image, title, publisher } = recipe;
	// Hash symbol in front of id prevents a page load
	const markup = `
		<li>
				<a class="results__link" href="#${id}" title="${title}">
						<figure class="results__fig">
								<img src="${image}" alt="${title}">
						</figure>
						<div class="results__data">
								<h4 class="results__name">${limitRecipeTitle(title)}</h4>
								<p class="results__author">${publisher}</p>
						</div>
				</a>
		</li>
		`;
	elements.searchResultsList.insertAdjacentHTML('beforeend', markup);
};

// Type: 'prev' or 'next'
const createPageButton = (page, type) =>
	`
	<button class="btn-inline results__btn--${type}" data-goto=${
		type === 'prev' ? page - 1 : page + 1
	}>
		<span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
		<svg class="search__icon">
				<use href="img/icons.svg#icon-triangle-${
					type === 'prev' ? 'left' : 'right'
				}"></use>
		</svg>
	</button>
`;

const renderPageButtons = (page, numberOfResults, resultPerPage) => {
	const pages = Math.ceil(numberOfResults / resultPerPage);
	let btn;

	if (page === 1 && pages > 1) {
		// Only show next page button
		btn = createPageButton(page, 'next');
	} else if (page < pages) {
		// Display previous and next page buttons
		btn = `
			${createPageButton(page, 'prev')}
			${createPageButton(page, 'next')}
		`;
	} else if (page === pages && pages) {
		// Only show previous page button
		btn = createPageButton(page, 'prev');
	}
	elements.searchResultsPages.insertAdjacentHTML('afterbegin', btn);
};

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
	// Render results of current page
	const start = (page - 1) * resultsPerPage;
	const end = page * resultsPerPage;

	recipes.slice(start, end).forEach(renderRecipe);

	// Render pagination button(s)
	renderPageButtons(page, recipes.length, resultsPerPage);
};
