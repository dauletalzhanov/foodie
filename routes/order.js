const express = require('express');
const router = express.Router();

const Order = require("../models/Order")
const Restaurant = require("../models/Restaurant")
const Food = require("../models/Food")
const Menu = require("../models/Menu")
const Customer = require("../models/Customer")

/* GET home page. */
router.get("/", async function(req, res, next){
  res.render("order_all", {
    title: `All Orders`
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

router.post("/create/", async function(req, res, next){
  const body = req.body
  const basket =  [ ...body["basket"] ]
  const address = { ...body["address"] }
  const payment = { ...body["payment"] }
  const total = body["total"]

  let duration = 0
  let items = []

  for(let i=0; i<basket.length; i++){
    items.push( basket[i]._id )
    duration += basket[i].TimeTakes
  }

  const data = {
    RestaurantID: body["restaurant"],
    Billing: total,
    TotalTime: duration,
    OrderDatetime: new Date(),
    FoodList: items,
    CustomerID: body["customerID"] ? body["customerID"] : "66d8b7a6bceb367cb05169ae" // guest
  }
  
  console.log( data )

  const order = new Order(data)
  await order.save()

  res.json({ status:true })
})

router.post("/profile/", async function(req, res, next){
  const body = req.body
  console.log(body)
  
  let customer = await Customer.find({ "CustomerUsername": body["id"] })
  if(customer.length == 0){
    return res.json({ status: false })
  }
  customer = customer[0]
  const allOrders = await Order.find({ "CustomerID": customer._id })
    //.populate("CustomerID")
    .populate("FoodList")

  console.log(allOrders)

  res.json([ ...allOrders ])
})

router.delete("/delete/", async function(req, res, next){
  const id = req.body["id"]
  const order = await Order.findByIdAndDelete(id)
  res.json({})
})

module.exports = router;
