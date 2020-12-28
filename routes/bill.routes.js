module.exports = app => {
  const bills = require("../controllers/bill.controller.js");

  var router = require("express").Router();
  
  // Create a new Tutorial
  router.post("/", bills.create);

  // Retreive all Bills realted to user
	router.get("/", bills.findAll);

  app.use('/api/bills', router);
};