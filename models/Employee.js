const mongoose = require("mongoose")
const mongoDB = process.env.MONGO_STRING

const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
	EmployeeName: { type: String, required: true },
	RestaurantID: { type: Schema.Types.ObjectId, ref: "Restaurant" },
	Manager: { type: Schema.Types.ObjectId }
})

module.exports = mongoose.model("Employee", EmployeeSchema)