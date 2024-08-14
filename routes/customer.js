var express = require('express');
var router = express.Router();

const Customer = require("../models/Customer")

router.get('/', function(req, res, next) {
	res.redirect("/customer/all")
});

/// creating
router.get('/add', function(req, res, next) {
  res.render('customer_form', { title: 'Add customer' });
});

router.post("/add", async function(req, res, next){
	const content = req.body
	console.log(content)

	const customer = new Customer({
		CustomerName: 	content["customer_name"],
		CustomerEmail: 	content["customer_email"],
		CustomerType:		content["customer_type"]
	})

	await customer.save()

	res.redirect("/customer/all")
})

// reading
router.get("/all", async function(req, res, next){
	const allCustomers = await Customer.find() // find all
	
	res.render("customers", { 
		title: "All Customers",
		allCustomers,
	})
})

// updating
router.get('/update/:id', async function(req, res, next) {
	const id = req.params.id
	const customer = await Customer.findById(id)

  res.render('customer_form', { 
		title: `Updating Customer: ${customer.CustomerEmail}`,
		customer
	});
});

router.post('/update/:id', async function(req, res, next) {
	const id = req.params.id
	const body = req.body
	
	console.log(body)

	const content = {
		CustomerName:  body["customer_name"],
		CustomerType:  body["customer_type"],
		CustomerEmail: body["customer_email"]
	}

	await Customer.findByIdAndUpdate(id, content)

  res.redirect("/customer/")
});

// deleting
router.get('/delete/:id', async function(req, res, next) {
	const id = req.params.id
	const customer = await Customer.findById(id)

  res.render('customer_delete', { 
		title: 'Delete Customer',
		customer
	});
});

router.post('/delete/:id', async function(req, res, next) {
	const id = req.params.id
	const customer = await Customer.findByIdAndDelete(id)

  res.redirect("/customer/")
});

module.exports = router;
