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

	console.log(content)

	/*
	const newMenu = new Menu({
		MenuName: content["menu_name"],
		FoodAvailable: content[""]
	})
	*/

	//await newMenu.save()

	res.redirect("/")
})

module.exports = router;
