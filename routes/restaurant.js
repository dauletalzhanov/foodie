var express = require('express');
var router = express.Router();

const Restaurant = require("../models/Restaurant")
const Supplier = require("../models/Supplier")
const Menu = require("../models/Menu")


router.get('/', async function(req, res, next) {
	const allSuppliers = await Supplier.find({})
	const allMenu = await Menu.find({})
	
  res.render('restaurant_form', { 
		title: 'Add a Restaurant',
		allSuppliers,
		allMenu
	});

})

module.exports = router;
