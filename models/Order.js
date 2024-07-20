const mongoose = require("mongoose")
const mongoDB = process.env.MONGO_STRING

const Schema = mongoose.Schema

const OrderSchema = new Schema({
	FoodList: { type: [ { type: mongoose.Types.ObjectId, ref: "Food" } ] },
	RestaurantID: { type: mongoose.Types.ObjectId, ref: "Restaurant" },
	TotalTime: { type: Number },
	Billing: { type: Number },
	OrderDatetime: { type: Date }
})

module.exports = mongoose.model("Order", OrderSchema)