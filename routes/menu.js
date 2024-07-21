const express = require('express');
const router = express.Router();

const Menu = require("../models/Menu")
const Food = require("../models/Food")

/* GET home page. */
router.get('/', async function(req, res, next) {
	const allFood = await Food.find({})

  res.render('menu_form', { 
		title: 'Add Menu', 
		allFood 
	});
});


router.post("/", async function(req, res, next){
	const content = req.body

	let foods = []
	for(let key in content){
		if(key !== "menu_name")
			foods.push(key)
	}

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

module.exports = router;
