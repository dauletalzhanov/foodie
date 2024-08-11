const express = require('express');
const router = express.Router()
const colors = require("colors")

const Employee = require("../models/Employee")
const Supplier = require("../models/Supplier")

router.get("/", async function(req, res, next){

	const allSuppliers = await Supplier.find({})

	res.render("suppliers", { 
		title: "Suppliers", 
		allSuppliers
	 })
})

// creating a supplier
router.get("/create", async function(req, res, next){
	res.render("supplier_form", { title: "Supplier Form" })
})

router.post("/create", async function(req, res, next){
	const content = req.body
	const ingredients = content["ingredients"].split("")
	console.log(content)

	const supplier = new Supplier({
		SupplierName: content["supplier name"],
		Ingredients: ingredients,
		SupplierPhone: content["phone number"]
	})

	await supplier.save()

	res.redirect("/supplier")
})


// deleting a supplier
router.get("/delete/:id", async function(req, res, next){
	const id = req.params.id
	const supplier = await Supplier.findById(id)

	res.render("supplier_delete", {
		title: `Delete - ${supplier.SupplierName}`,
		supplier
	})
})

router.post(`/delete/:id`, async function(req, res, next){
	const id = req.params.id
	const supplier = await Supplier.findByIdAndDelete(id)
	
	res.redirect("/supplier/")
})

// updating a supplier
router.get("/update/:id", async function(req, res, next){
	const id = req.params.id
	const supplier = await Supplier.findById(id)


	res.render("supplier_form", {
		title: "Updating",
		supplier
	})
})

router.post("/update/:id", async function(req, res, next){
	const id = req.params.id
	const body = req.body

	const updatedSupplier = {
		SupplierName: body["supplier name"],
		IngredientsAvailable: body["ingredients"].split(","),
		SupplierPhone: body["phone number"]
	}

	const supplier = await Supplier.findByIdAndUpdate(id, updatedSupplier)

	console.log(supplier)


	res.redirect("/supplier/")
})

module.exports = router;