import { apiKey } from '../key';
import axios from 'axios';

export default class Recipe {
	constructor(id) {
		this.id = id;
		this.time = [30, 60, 90][Math.floor(Math.random() * 3)]; // Placeholder - no data provided
		this.servings = [4, 6, 8][Math.floor(Math.random() * 3)]; // Placeholder - no data provided
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
			alert('Unable to retrieve recipe(s). Please try again later.');
		}
	}

	parseIngredients() {
		const result = this.result;
		const table = [
			['tablespoons', 'tbsp'],
			['tablespoon', 'tbsp'],
			['tbsp', 'tbsp'],
			['teaspoons', 'tsp'],
			['teaspoon', 'tsp'],
			['cups', 'cups'],
			['cup', 'cup'],
			['pounds', 'lbs'],
			['pound', 'lb'],
			['ounces', 'oz'],
			['ounce', 'oz'],
			['kilograms', 'kg'],
			['kilogram', 'kg'],
			['grams', 'g'],
			['gram', 'g'],
			['liters', 'l'],
			['liter', 'l'],
			['milliliters', 'ml'],
			['milliliter', 'ml']
		];

		// Helper functions
		const fn = {
			// Standardize units of measure on ingredient
			convertUnits: ingredient => {
				table.forEach(unit => {
					const regex = new RegExp(unit[0], 'gi');
					ingredient = ingredient.replace(regex, unit[1]);
				});
				return ingredient;
			},
			// Remove parenthesis block the converts measurements into ounces, grams or milliliters
			removeConversionTo: ingredient =>
				ingredient.replace(/ \([^()]*?(oz|g|ml)\)/i, ''),
			// Locate position of unit of measure in ingredients array
			getUnitIndex: array => {
				// Create array of unit abbreviations
				const unitAbbreviations = table.map(unit => unit[1]);
				return array.findIndex(element => unitAbbreviations.includes(element));
			},
			// Return ingredient array as a structured object
			createIngredientObj: (index, array, ingredient) => {
				let count, unit;
				if (index >= 1 && index <= 2) {
					// Unit could consist of one or more array elements
					// Ex. 4 1/2 cups is [4, 1/2]
					count = array.slice(0, index);
					// Handle cases where measurements are represented as 1-1/4 cups
					return {
						count:
							count.length === 1
								? eval(count[0].replace('-', '+'))
								: eval(count.join('+')),
						unit: array[index],
						ingredient: array.slice(index + 1).join(' ')
					};
				} else if (parseInt(array[0], 10)) {
					// There is no unit, but first element is a number
					return {
						count: parseInt(array[0], 10),
						unit: null,
						ingredient: array.slice(1).join(' ')
					};
				} else {
					// There is no unit and no number in first position
					return {
						count: null,
						unit: null,
						ingredient
					};
				}
			}
		};

		const revisedIngredients = result.ingredients.map(i => {
			let ingredient = fn.convertUnits(i.trim());
			ingredient = fn.removeConversionTo(ingredient);

			// Parse ingredients into count, unit, and ingredient
			const ingredientArray = ingredient.split(' ');
			const unitIndex = fn.getUnitIndex(ingredientArray);
			const ingredientObject = fn.createIngredientObj(
				unitIndex,
				ingredientArray,
				ingredient
			);
			return ingredientObject;
		});
		this.revisedIngredients = revisedIngredients;
	}

	updateServings(type) {
		// Increase or decrease new serving amount by 2
		const newServings = type === 'inc' ? this.servings + 2 : this.servings - 2;
		// Ingredients
		this.revisedIngredients.forEach(i => {
			i.count *= newServings / this.servings;
		});

		this.servings = newServings;
	}
}
