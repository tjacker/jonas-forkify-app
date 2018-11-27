export default class Likes {
	constructor() {
		this.likes = [];
	}

	addLike(id, image_url, title, publisher) {
		const like = { id, image_url, title, publisher };
		this.likes.push(like);
		return like;
	}

	deleteLike(id) {
		// Return index of element with matching id
		const index = this.likes.findIndex(element => element.id === id);

		// Update likes array by removing deleted like
		this.likes.splice(index, 1);
	}

	isLiked(id) {
		// Check if id already exists in likes array
		return this.likes.findIndex(element => element.id === id) !== -1;
	}

	getLikesLength() {
		return this.likes.length;
	}
}
