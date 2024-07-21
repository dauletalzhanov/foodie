const express = require('express');
const router = express.Router();

const Order = require("../models/Order")
const Restaurant = require("../models/Restaurant")
const Food = require("../models/Food")
const Menu = require("../models/Menu")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('order_form', { title: 'Add Order' });
});

module.exports = router;
