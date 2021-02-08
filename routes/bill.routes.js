module.exports = app => {
  const bills = require("../controllers/bill.controller.js");

  var router = require("express").Router();

  // Retreive all Bills realted to user
	router.post("/", bills.findAll);

  // Create a new Tutorial
  router.post("/insert", bills.insert);

	router.delete("/:id", bills.delete);

  app.use('/api/bills', router);
};