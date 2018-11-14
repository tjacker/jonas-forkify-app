import { apiKey } from '../key';
import axios from 'axios';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async getResults() {
		const key = apiKey;
		try {
			const res = await axios(
				`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`
			);
			if (res.data.error === 'limit')
				throw "Your free plan's search limit has been reached.";
			this.result = res.data.recipes;
		} catch (error) {
			alert(error);
		}
	}
}
