import { elements } from './base';
import { limitRecipeTitle } from './searchView';

export const toggleLikeBtn = isLiked => {
	const icon = isLiked ? 'icon-heart' : 'icon-heart-outlined';

	// Set icon based on whether recipe was liked
	document
		.querySelector('.recipe__likes use')
		.setAttribute('href', `img/icons.svg#${icon}`);
};

export const toggleLikesMenu = likesCount => {
	elements.likesMenu.style.visibility = likesCount > 0 ? 'visible' : 'hidden';
};

export const renderLike = like => {
	const { id, image_url, title, publisher } = like;
	const markup = `
	<li>
		<a class="likes__link" href="#${id}">
				<figure class="likes__fig">
						<img src="${image_url}" alt="${title}">
				</figure>
				<div class="likes__data">
						<h4 class="likes__name">${limitRecipeTitle(title)}</h4>
						<p class="likes__author">${publisher}</p>
				</div>
		</a>
	</li>
	`;

	elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
	const like = document.querySelector(`.likes__link[href="#${id}"]`)
		.parentElement;
	like.remove();
};
