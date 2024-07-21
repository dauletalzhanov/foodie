const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

require("dotenv").config()

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
mongoose.set("strictPopulate", false)
const mongoDB = process.env.MONGO_STRING

main().catch((err) => console.log(err));
async function main(){
  await mongoose.connect(mongoDB);
}

// routing
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const employeeRouter = require("./routes/employee");
const supplierRouter = require("./routes/supplier");
const customerRouter = require("./routes/customer");
const restaurantRouter = require("./routes/restaurant");
const menuRouter = require("./routes/menu")
const foodRouter = require("./routes/food")
const ingredientRouter = require("./routes/ingredient")
const orderRouter = require("./routes/order")

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/supplier", supplierRouter)
app.use("/employee", employeeRouter)
app.use("/customer", customerRouter)
app.use("/restaurant", restaurantRouter)
app.use("/menu", menuRouter)
app.use("/food", foodRouter)
app.use("/ingredient", ingredientRouter)
app.use("/order", orderRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { err });
});

module.exports = app;
