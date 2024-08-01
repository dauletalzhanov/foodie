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

module.exports = router;
