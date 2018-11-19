import nanoid from 'nanoid';

export default class ShoppingList {
	constructor() {
		this.items = [];
	}

	addItem(count, unit, ingredient) {
		const item = {
			id: nanoid(10),
			count,
			unit,
			ingredient
		};
		this.items.push(item);
		return item;
	}

	deleteItem(id) {
		// Return index of element with matching id
		const index = this.items.findIndex(element => element.id === id);

		// Update items array by removing deleted item
		this.items.splice(index, 1);
	}

	updateCount(id, newCount) {
		this.items.find(element => element.id === id).count = newCount;
	}
}
