require("dotenv").config()

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const mongoDB = process.env.MONGO_STRING

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


async function main(){
	await mongoose.connect(mongoDB)

	const foodModel = mongoose.model("Food", Food)

	const food = new foodModel({
		FoodName: "Taco",
		Ingredients: [],
		isLimited: true,
		FoodPrice: 9.10,
		TimeTakes: 300,
	})

	await food.save()

	mongoose.connection.close()
}

main()