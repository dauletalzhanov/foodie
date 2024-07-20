const mongoose = require("mongoose")
const mongoDB = process.env.MONGO_STRING

const Schema = mongoose.Schema

const CustomerSchema = new Schema({
	OrderID: { type: mongoose.Types.ObjectId, ref: "Order" },
	CustomerType: { type: String, enum: [ "Guest", "Online" ] },
	CustomerEmail: { type: String }
})

module.exports = mongoose.model("Customer", CustomerSchema)