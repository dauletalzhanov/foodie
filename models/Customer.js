const mongoose = require("mongoose")
const mongoDB = process.env.MONGO_STRING

const Schema = mongoose.Schema

const CustomerSchema = new Schema({
	OrderID: { type: mongoose.Types.ObjectId, ref: "Order" },
	CustomerName: { type: String },
	CustomerType: { type: String, enum: [ "Guest", "Online" ] },
	CustomerEmail: { type: String },
	CustomerPassword: { type: String },
	CustomerUsername: { type: String }
})

module.exports = mongoose.model("Customer", CustomerSchema)