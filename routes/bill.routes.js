module.exports = app => {
  const bills = require("../controllers/bill.controller.js");

  var router = require("express").Router();
  var bodyParser = require('body-parser');
  
  // Create a new Tutorial
  router.post("/", bills.create);

  app.use('/api/bills', router);
};