const express = require('express');
const router = express.Router();

const Ingredient = require("../models/Ingredient")
const Supplier = require("../models/Supplier");

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.redirect("/ingredient/all")
});

router.get("/all", async function(req, res, next){
  const allIngredients = await Ingredient.find({})

  res.render("ingredient_all", { 
    title: "Foodie - All Ingredients", 
    allIngredients 
  })

})

router.get("/create", async function(req, res, next){
  const allSupplier = await Supplier.find({})

  res.render("ingredient_form", {
    title: "Foodie - New Ingredient",
    allSupplier
  })
})

router.post("/create", async function(req, res, next){
  const newIngred = req.body
  console.log(newIngred)

  const ingred = new Ingredient({
    IngredientName: newIngred["ingredient_name"],
    PurchaseDate:   new Date(newIngred["purchase_date"]),
    Expiry:         new Date(newIngred["expiry"]),
    Cost:           newIngred["cost"],
    SupplierID:     newIngred["supplier"]
  })

  await ingred.save()

  res.redirect("/ingredient")
})

// delete
router.get("/delete/:id", async function(req, res, next){
  const id = req.params.id
  const ingred = await Ingredient.findById(id)

  res.render("ingredient_delete", { title: `Delete Ingredient: ${ingred.IngredientName}` })
})

router.post("/delete/:id", async function(req, res, next){
  const id = req.params.id
  await Ingredient.findByIdAndDelete(id)

  res.redirect("/ingredient/")
})

// update
router.get("/update/:id", async function(req, res, next){
  const id = req.params.id
  const ingred = await Ingredient.findById(id)
  const allSupplier = await Supplier.find({})

  console.log(ingred)

  res.render("ingredient_form", {
    title: `Update Ingredient: ${ ingred.IngredientName }`,
    ingred,
    allSupplier
  })
})

router.post("/update/:id", async function(req, res, next){
  const id = req.params.id
  const body = req.body

  const newIngred = {
    IngredientName: body["ingredient_name"],
    PurchaseDate:   new Date(body["purchase_date"]),
    Expiry:         new Date(body["expiry"]),
    Cost:           body["cost"],
    SupplierID:     body["supplier"]
  }


  console.log(body)

  await Ingredient.findByIdAndUpdate(id, newIngred)

  res.redirect("/ingredient/")
})

module.exports = router;
