const express = require('express');
const router = express.Router();

const Food = require("../models/Food")
const Ingredient = require("../models/Ingredient")

/* GET home page. */
router.get("/", async function(req, res, next){
	res.redirect("/food/all")
})

router.get('/add', async function(req, res, next) {
	const allIngredient = await Ingredient.find({})

  res.render('food_form', { 
		title: 'Add Food', 
		allIngredient 
	});
});

router.post("/add", async function(req, res, next){
	const content = req.body
	
	const newFood = new Food({
		FoodName:  content["food_name"],
		isLimited: content["is_limited"],
		FoodPrice: content["food_price"],
		TimeTakes: content["time_takes"],
	})

	await newFood.save()

	res.redirect("/")
})

////////////////////////////////////////////////////
router.get("/all", async function(req, res, next){
	const foods = await Food.find({})

	res.render("food_all", { title: "All Food", foods })
})

//////	DELETE
router.get("/delete/:id", async function(req, res, next){
	const id = req.params.id
	const food = await Food.findById(id)

	res.render("food_delete", {
		title: `Delete: ${food.FoodName}`
	})
})

router.post("/delete/:id", async function(req, res, next){
	const id = req.params.id
	const food = await Food.findByIdAndDelete(id)

	res.redirect("/food/")
})

///// UPDATE
router.get("/update/:id", async function(req, res, next){
	const id = req.params.id
	const food = await Food.findById(id)
	const allIngredient = await Ingredient.find({})

	res.render("food_form", {
		title: `Update: ${food.FoodName}`,

		food,
		allIngredient
	})
})

router.post("/update/:id", async function(req, res, next){
	const id = req.params.id
	const body = req.body

	console.log(body)

	const content = {
		FoodName: 							body["food_name"],
		IngredientsAvailable: 	body["ingredient_list"],
		isLimited: 							body["is_limited"],
		FoodPrice: 							body["food_price"],
		TimeTakes: 							body["time_takes"]
	}

	await Food.findByIdAndUpdate(id, content)

	res.redirect("/food/")
})


module.exports = router;
