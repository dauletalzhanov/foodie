var express = require('express');
var router = express.Router();

const Restaurant = require("../models/Restaurant")
const Supplier = require("../models/Supplier")
const Menu = require("../models/Menu")

router.get("/", async function(req, res, next){
	const allRestaurants = await Restaurant.find()//.populate("SupplierList").exec()

	res.render("restaurant", { 
		title: "All Restaurants",
		allRestaurants
	})
})

router.get('/add', async function(req, res, next) {
	const allSuppliers = await Supplier.find({})
	const allMenu = await Menu.find({})
	
  res.render('restaurant_form', { 
		title: 'Add a Restaurant',
		allSuppliers,
		allMenu
	});
})

router.post("/add", async function(req, res, next){
	const content = req.body

	console.log(content)

	const newRestaurant = new Restaurant({
		"RestaurantName": content["restaurant_name"],
		"MenuID": content["menu"],
		"SupplierList": content["supplier"],
		"Address": content["address"]

	})

	await newRestaurant.save()

	res.redirect("/")
})

module.exports = router;
