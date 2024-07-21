const mongoose = require("mongoose")
const mongoDB = process.env.MONGO_STRING

const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
	RestaurantName: { type: String },
	MenuID: { type: Schema.Types.ObjectId, ref: "Menu" },
	Address: { type: String, required: true },
	SupplierList: [{ type: Schema.Types.ObjectId, ref: "Supplier" }]
})

module.exports = mongoose.model("Restaurant", RestaurantSchema)