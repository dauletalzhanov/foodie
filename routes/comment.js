var express = require('express');
var router = express.Router();

const Comment = require("../models/Comment")

router.get('/', function(req, res, next) {
  res.render('customer_form', { title: 'Add a comment' });
});


module.exports = router;
