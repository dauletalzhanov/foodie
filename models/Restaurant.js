const mongoose = require("mongoose")
const mongoDB = process.env.MONGO_STRING

const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
	RestaurantName: { type: String },
	MenuID: { type: mongoose.Types.ObjectId, ref: "Menu" },
	Address: { type: String, required: true },
	SupplierList: { type: [ { type: mongoose.Types.ObjectId, ref: "Supplier" } ] }
})

module.exports = mongoose.model("Restaurant", RestaurantSchema)