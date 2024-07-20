const mongoose = require("mongoose")
const mongoDB = process.env.MONGO_STRING

const Schema = mongoose.Schema

const IngredientSchema = new Schema({
	IngredientName: { type: String, required: true },
	PurchaseDate: { type: Number },
	Expiry: { type: Number },
	Cost: { type: Number },
	SupplierID: { type: mongoose.Types.ObjectId, ref: "Supplier" }
})

module.exports = mongoose.model("Ingredient", IngredientSchema)