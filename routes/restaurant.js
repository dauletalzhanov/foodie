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

// removing restaurant
router.post("/", async function(req, res, next){
	const restaurant_id = req.body["delete"]
	await Restaurant.findByIdAndDelete(restaurant_id)
	
	res.redirect("/restaurant/")
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

/////////////////////////////////////////////
router.get("/:restaurant_id/food", async function(req, res, next){
	const restaurant_id = req.params.restaurant_id
	const restaurant = await Restaurant.findById(restaurant_id)

	const menu = await Menu.findById(restaurant.MenuID).populate("FoodAvailable")

	res.send(menu.FoodAvailable)
})

/////////////////////////////////////////
// update restaurant
router.get("/update/:id", async function(req, res, next){
	const id = req.params.id
	const restaurant = await Restaurant.findById(id)
	
	const allMenu = await Menu.find({})
	const allSuppliers = await Supplier.find({})

	console.log(restaurant)

	res.render("restaurant_form", {
		title: `Update Restaurant: ${restaurant.RestaurantName}`,
		restaurant,
		
		allMenu,
		allSuppliers
	})
})

//
router.post("/update/:id", async function(req, res, next){
	const id = req.params.id
	const body = req.body

	console.log(body)

	const content = {
		RestaurantName: body["restaurant_name"],
		MenuID: body["menu"],
		Address: body["address"],
		SupplierList: [body["supplier"]]
	}

	const restaurant = await Restaurant.findByIdAndUpdate(id, content)
	
	res.redirect("/restaurant/")
})

module.exports = router;
