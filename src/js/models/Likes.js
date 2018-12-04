export default class Likes {
	constructor() {
		this.likes = [];
	}

	addLike(id, image_url, title, publisher) {
		const like = { id, image_url, title, publisher };
		this.likes.push(like);

		// Persist date in local storage
		this.storeLikes();

		return like;
	}

	deleteLike(id) {
		// Return index of element with matching id
		const index = this.likes.findIndex(element => element.id === id);

		// Update likes array by removing deleted like
		this.likes.splice(index, 1);

		// Persist date in local storage
		this.storeLikes();
	}

	isLiked(id) {
		// Check if id already exists in likes array
		return this.likes.findIndex(element => element.id === id) !== -1;
	}

	getLikesLength() {
		return this.likes.length;
	}

	storeLikes() {
		localStorage.setItem('likes', JSON.stringify(this.likes));
	}

	retrieveLikes() {
		const storage = JSON.parse(localStorage.getItem('likes'));

		// Restore from local storage
		if (storage) this.likes = storage;
	}
}
