const express = require('express');
const router = express.Router();

const Food = require("../models/Food")
const Ingredient = require("../models/Ingredient")

/* GET home page. */
router.get('/', function(req, res, next) {
	const allIngredient = Ingredient.find({})

  res.render('food_form', { title: 'Add Food', allIngredient });
});

module.exports = router;
