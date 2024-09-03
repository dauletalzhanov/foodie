var express = require('express');
var router = express.Router();

const Customer = require("../models/Customer")
const bcrypt = require("bcryptjs")

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


// REST API
// registering
router.post("/register/", async function(req, res, next){
	//console.log(req.body)
	const content = req.body.body
	const ifExists = await Customer.find({ 
		$or: [
			{ CustomerEmail: 		content["email"] 		},
			{ CustomerUsername: content["username"] }
		]
	})

	if(ifExists.length > 0)
		return res.json({ error: "User Exists" })
	
	const customer = new Customer({
		CustomerName: 		content["name"],
		CustomerEmail: 		content["email"],
		CustomerUsername: content["username"],
		CustomerPassword: content["password"],
		CustomerType:			"Online"
	})

	await customer.save()

	const passData = {
		...customer._doc
	}

	res.json({ ...passData })
})

// log in
router.post("/login/", async function(req, res, next){
	const body = req.body

	console.log(body)

	const customerResults = await Customer.find({ CustomerEmail: body["email"] })
	let data = {}

	if(customerResults.length){
		const customer = customerResults[0]
		const match = await bcrypt.compare( body["password"], customer.CustomerPassword )
		console.log( customer )
		
		data = {
			status: match,
			id : 		match ? customer._id : "", 
			username : match ? customer.CustomerUsername : "" 
		}
	} else {
		data = { status: false }
	}
	

	res.json({ ...data })
})

// profile section
router.post("/profile/", async function(req, res, next){
	const body = req.body

	console.log(body)

	const customerResults = await Customer.find({ CustomerUsername: body["id"] })

	if(customerResults.length == 0)
		return res.json({ status: false })
	
	const customer = customerResults[0]

	let data = {
		name: customer["CustomerName"],
		type: customer["CustomerType"],
		email: customer["CustomerEmail"],
		username: customer["CustomerUsername"],

		status: true
	}

	//console.log(customerResults)

	res.json({ ...data })
})

// profile 
router.post("/profile/id/", async function(req, res, next){
	const body = req.body
	console.log(body)
	const customer = await Customer.findById( body["id"] )

	//if(customerResults.length == 0)
	//	return res.json({ status: false })
	
	//const customer = customerResults[0]

	let data = {
		name: customer["CustomerName"],
		type: customer["CustomerType"],
		email: customer["CustomerEmail"],
		username: customer["CustomerUsername"]
	}

	//console.log(customerResults)

	res.json({ ...data })
})

router.put("/profile/id/", async function(req, res, next){
	const body = req.body
	const id = body["id"]
	console.log(body)


	const content = {
		CustomerName:  body["name"],
		CustomerEmail:  body["email"],
		CustomerUsername: body["username"]
	}

	const updated = await Customer.findByIdAndUpdate(id, content)
	console.log(updated)


	res.json({ status: true })
})

module.exports = router;
