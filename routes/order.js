const express = require('express');
const router = express.Router();

const Order = require("../models/Order")
const Restaurant = require("../models/Restaurant")
const Food = require("../models/Food")
const Menu = require("../models/Menu")

/* GET home page. */
router.get("/", async function(req, res, next){

  res.render("order_all", {
    title: `All Orders`
  })
})

router.get("/add", async function(req, res, next){
  const menu = await Menu.findById(restaurant.MenuID).populate("FoodAvailable")
  
  res.render("order_form", {
    title: "Order Form",
  })
})

router.get('/:restaurant', async function(req, res, next){
  const id = req.params.restaurant
  const restaurant = await Restaurant.findById(id)
  const menu = await Menu.findById(restaurant.MenuID).populate("FoodAvailable")

  // all orders
  const orders = await Order.find({ RestaurantID: id })

  res.render("order_by_restaurant", {
    title: `Add Order from ${restaurant.RestaurantName}`, 
    restaurant,
    menu,
    orders
  })
})

router.get('/:restaurant/add', async function(req, res, next) {
  const restaurant = await Restaurant.findById(req.params.restaurant)
  const menu = await Menu.findById(restaurant.MenuID).populate("FoodAvailable")
  
  //console.log(menu)

  res.render('order_form', { 
    title: `Add Order from ${restaurant.RestaurantName}`, 
    restaurant,
    menu 
  });
});

router.post('/:restaurant/add', async function(req, res, next) {
  const id = req.params.restaurant
  const restaurant = await Restaurant.findById(id)
  const menu = await Menu.findById(restaurant.MenuID).populate("FoodAvailable")
  const foodAvail = menu.FoodAvailable
  
  //console.log(foodAvail)
  //console.log(req.body)

  const body = req.body

  let billing = 0
  let duration = 0
  let items = []

  for (const [key, value] of Object.entries(body)) {
    if(value<1)
      continue

    items.push(key)

    for(let i=0; i<foodAvail.length; i++){      
      if(foodAvail[i]._id == key){
        billing  += foodAvail[i].FoodPrice * value 
        duration += foodAvail[i].TimeTakes * value
      }
    }

  }


  const data = {
    RestaurantID: id,
    Billing: billing,
    TotalTime: duration,
    OrderDatetime: new Date(),
    FoodList: items
  }

  const order = new Order(data)
  await order.save()

  console.log(data)


  res.redirect(`/order/${id}/`)
});

module.exports = router;
