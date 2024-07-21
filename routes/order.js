const express = require('express');
const router = express.Router();

const Order = require("../models/Order")
const Restaurant = require("../models/Restaurant")
const Food = require("../models/Food")
const Menu = require("../models/Menu")

/* GET home page. */
router.get('/restaurant=:restaurant', async function(req, res, next) {
  const restaurant = await Restaurant.findById(req.params.restaurant)
  const menu = await Menu.findById(restaurant.MenuID).populate("FoodAvailable")
  
  console.log(menu)

  res.render('order_form', { 
    title: `Add Order from ${restaurant.RestaurantName}`, 
    restaurant,
    menu 
  });
});

module.exports = router;
