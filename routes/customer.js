var express = require('express');
var router = express.Router();

const Customer = require("../models/Customer")

router.get('/', function(req, res, next) {
  res.render('customer_form', { title: 'Add customer' });
});

router.post("/", async function(req, res, next){
	const content = req.body
	console.log(content)

	const customer = new Customer({
		EmployeeName: content["customer_name"],
		//RestaurantID: content["restaurant_id"],
		//Manager: 			content["manager"]
	})
	await customer.save()

	res.redirect("/customer/all")
})

router.get("/all", async function(req, res, next){
	const allCustomers = await Customer.find() // find all
	
	res.render("customers", { 
		title: "All Customers",
		allCustomers,
	})
})

module.exports = router;
