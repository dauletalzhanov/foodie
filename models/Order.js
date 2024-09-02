const mongoose = require("mongoose")
const mongoDB = process.env.MONGO_STRING

const Schema = mongoose.Schema

const OrderSchema = new Schema({
	FoodList: [{ type: Schema.Types.ObjectId, ref: "Food" }],
	RestaurantID: { type: Schema.Types.ObjectId, ref: "Restaurant" },
	TotalTime: { type: Number },
	Billing: { type: Number },
	OrderDatetime: { type: Date, required: true },
	CustomerID: { type: Schema.Types.ObjectId, ref: "Customer" }
})

OrderSchema.virtual("details").get(function(){
	return `${this.Billing} @${this.OrderDatetime} located at ${this.RestaurantID}`
})

module.exports = mongoose.model("Order", OrderSchema)