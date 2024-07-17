var express = require('express');
var router = express.Router();

const Employee = require("../models/Employee")

router.get('/', function(req, res, next) {
  res.render('employee', { title: 'Add employee' });
});

router.post("/", async function(req, res, next){
	const content = req.body
	console.log(content)

	const employee = new Employee({
		EmployeeName: content["employee_name"],
		//RestaurantID: content["restaurant_id"],
		//Manager: 			content["manager"]
	})
	await employee.save()

	res.redirect("/employee")
})

router.get("/all", async function(req, res, next){
	const allEmployees = await Employee.find() // find all
	
	res.render("employees", { 
		title: "All Employees",
		allEmployees,
	})
})

module.exports = router;
