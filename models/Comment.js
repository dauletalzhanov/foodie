const mongoose = require("mongoose")
const mongoDB = process.env.MONGO_STRING

const Schema = mongoose.Schema

const CommentSchema = new Schema({
	CustomerID: { type: mongoose.Types.ObjectId, ref: "Customer" },
	CommentContent: { type: String },
	CommentDatetime: { type: Date }
})

module.exports = mongoose.model("Comment", CommentSchema)