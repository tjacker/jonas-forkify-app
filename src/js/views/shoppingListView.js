import { elements } from './base';

export const renderItem = item => {
	const { id, count, unit, ingredient } = item;

	const includeInput = (count, unit) => `
		<div class="shopping__count">
			<input class="shopping__count-value" type="number" value="${count}" step="0.25">
			<p>${unit ? unit : ''}</p>
		</div>
	`;

	const markup = `
		<li class="shopping__item" data-id=${id}>
			${count ? includeInput(count, unit) : ''}
			<p class="shopping__description">${ingredient}</p>
			<button class="shopping__delete btn-tiny">
				<svg>
					<use href="img/icons.svg#icon-circle-with-cross"></use>
				</svg>
			</button>
		</li>
	`;
	elements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
	const item = document.querySelector(`[data-id="${id}"]`);
	item.remove();
};
