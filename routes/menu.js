const express = require('express');
const router = express.Router();

const Menu = require("../models/Menu")
const Food = require("../models/Food")

/* GET home page. */
router.get("/", async function(req, res, next){
	res.redirect("/menu/all")
})

router.get('/add', async function(req, res, next) {
	const allFood = await Food.find({})

  res.render('menu_form', { 
		title: 'Add Menu', 
		allFood 
	});
});


router.post("/add", async function(req, res, next){
	const content = req.body


	console.log(content)

	let foods = []
	
	foods = content["food_items"]

	const newMenu = new Menu({
		MenuName: content["menu_name"],
		FoodAvailable: foods
	})
	await newMenu.save()

	res.redirect("/")
})

router.get("/all", async function(req, res, next){
	const allMenu = await Menu.find({}).populate("FoodAvailable")

	res.render("menu", {
		title: "All Menu",
		allMenu
	})
})


router.post("/all", async function(req, res, next){
	const menu_id = req.body["menu_id"]
	await Menu.findByIdAndDelete(menu_id)

	res.redirect("/menu/all")
})

// update
router.get("/update/:id", async function(req, res, next){
	const id = req.params.id
	const menu = await Menu.findById(id)
	const allFood = await Food.find({})

	res.render("menu_form", {
		title: `Update Menu: ${ menu.MenuName }`,
		menu,
		allFood
	})
})

router.post("/update/:id", async function(req, res, next){
	const id = req.params.id

	const body = req.body

	console.log(body)
	
	const content = {
		MenuName: body["menu_name"],
		FoodAvailable: [...body["food_items"]]
	}

	await Menu.findByIdAndUpdate(id, content)

	res.redirect("/menu/")
})

module.exports = router;
