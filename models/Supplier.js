const mongoose = require("mongoose")
const mongoDB = process.env.MONGO_STRING

const Schema = mongoose.Schema

const SupplierSchema = new Schema({
	SupplierName: { type: String, required: true },
	IngredientsAvailable: { type: [ { type: String } ] },
	SupplierPhone: { type: Number },
})

module.exports = mongoose.model("Supplier", SupplierSchema)