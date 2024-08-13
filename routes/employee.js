var express = require('express');
var router = express.Router();

const Employee = require("../models/Employee")
const Restaurant = require("../models/Restaurant")

router.get("/", function(req, res, next){
	res.redirect("/employee/all/")
})

// adding employees
router.get('/add', async function(req, res, next) {
	const allRestaurant = await Restaurant.find({})
	const Employees = await Employee.find({})

  res.render('employee_form', { 
		title: 'Add employee',
		allRestaurant,
		Employees
	});
});

router.post("/add", async function(req, res, next){
	const content = req.body
	const manager = content["manager"]==""?null:content["manager"]
	
	console.log(content)

	const employee = new Employee({
		EmployeeName: 	content["employee_name"],
		RestaurantID: 	content["restaurant"],
		Manager: 				manager
	})
	await employee.save()

	res.redirect("/employee")
})

// all employees
router.get("/all", async function(req, res, next){
	const allEmployees = await Employee.find() // find all
	
	res.render("employees", { 
		title: "All Employees",
		allEmployees,
	})
})


// deleting employees
router.get("/delete/:id", async function(req, res, next){
	const id = req.params.id
	const employee = await Employee.findById(id)

	res.render("employee_delete", {
		title: `Delete Employee: ${ employee.EmployeeName }?`
	})
})

router.post("/delete/:id", async function(req, res, next){
	const id = req.params.id
	await Employee.findByIdAndDelete(id)

	res.redirect("/employee/")
})

// updating employee
router.get("/update/:id", async function(req, res, next){
	const id = req.params.id
	const worker = await Employee.findById(id)

	const allRestaurant = await Restaurant.find({})
	const Employees = await Employee.find({})

	console.log(worker)

	res.render("employee_form", {
		title: `Update Employee: ${ worker.EmployeeName }?`,
		allRestaurant,
		Employees,
		worker
	})
})

router.post("/update/:id", async function(req, res, next){
	const id = req.params.id
	const body = req.body

	const content = {
		EmployeeName: body["employee_name"],
		RestaurantID: body["restaurant"],
		Manager:			body["manager"]==""?null:body["manager"]
	}

	await Employee.findByIdAndUpdate(id, content)

	res.redirect("/employee/")
})

module.exports = router;
