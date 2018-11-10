import { apiKey } from '../key';
import axios from 'axios';

export default class Recipe {
	constructor(id) {
		this.id = id;
		this.servings = 4; // Placeholder - no date provided
	}

	async getRecipe() {
		const key = apiKey;
		try {
			const res = await axios(
				`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`
			);
			this.result = res.data.recipe;
		} catch (error) {
			console.error(error);
			alert('Unable to retrieve recipes. Please try again.');
		}
	}

	calcTime() {
		// Simulated cooking time calculation
		// 15 minutes for every 3 ingredients
		const r = this.result;
		console.log(r);
		const numberOfIngredients = r.ingredients.length;
		const timePeriods = Math.ceil(numberOfIngredients / 3);
		this.time = timePeriods * 15;
	}
}
