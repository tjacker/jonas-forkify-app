import { elements } from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
	// Wrapped in curly braces so there is no implicit return
	elements.searchInput.value = '';
};
export const clearResults = () => {
	elements.searchResultList.innerHTML = '';
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
	elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => recipes.forEach(renderRecipe);
