const mongoose = require("mongoose")
const mongoDB = process.env.MONGO_STRING

const Schema = mongoose.Schema

const FoodSchema = new Schema({
	FoodName: { type: String, required: true },
	IngredientsAvailable: { type: [ { type: mongoose.Types.ObjectId, ref: "Ingredient" } ] },
	isLimited: { type: Boolean },
	FoodPrice: { type: Number },
	TimeTakes: { type: Number }
})

module.exports = mongoose.model("Food", FoodSchema)