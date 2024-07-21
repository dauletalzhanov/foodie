const mongoose = require("mongoose")
const mongoDB = process.env.MONGO_STRING

const Schema = mongoose.Schema

const MenuSchema = new Schema({
	MenuName: { type: String, required: true },
	FoodAvailable: [{ type: Schema.Types.ObjectId, ref: "Food"}]
})

module.exports = mongoose.model("Menu", MenuSchema)