const express = require('express');
const router = express.Router();

const Food = require("../models/Food")
const Ingredient = require("../models/Ingredient")

/* GET home page. */
router.get('/', async function(req, res, next) {
	const allIngredient = await Ingredient.find({})

  res.render('food_form', { 
		title: 'Add Food', 
		allIngredient 
	});
});

router.post("/", async function(req, res, next){
	const content = req.body
	
	const newFood = new Food({
		FoodName: content["food_name"],
		isLimited: content["is_limited"],
		FoodPrice: content["food_price"],
		TimeTakes: content["time_takes"],
	})

	await newFood.save()

	res.redirect("/")
})

router.get("/all", async function(req, res, next){
	const foods = await Food.find({})

	res.render("food_all", { title: "All Food", foods })
})

module.exports = router;
