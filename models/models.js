const mongoose = require("mongoose")

const Schema = mongoose.Schema

const Food = new Schema({
	FoodName: String,
	Ingredients: [ Schema.Types.ObjectId ], //Ingredients Foreign Key
	isLimited: Boolean,
	FoodPrice: Number,
	TimeTakes: Number,
})

const Ingredient = new Schema({
	IngredientName: String,
	PurchaseDate: { type: Date, default: Date.now() },
	PurchaseDate: { type: Date, default: Date.now() },
	IngredientCost: Number,
	SupplierID: Schema.Types.ObjectId // Supplier Foreign Key
})

const Menu = new Schema({
	MenuName: String, // Branding 	e.g. Taco Bell, Pizza Hut
	FoodAvailable: [ Schema.Types.ObjectId ], //Foreign Keys from Food
})

S

