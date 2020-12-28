const db = require("../models");
const Bill = db.bills;

// Create and Save a new Bill
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create Bill
  const newBill = new Bill({
	  billFromId : req.body.id,
		billName : req.body.billName,
		billTo : req.body.billedTo,
		billFrom : req.body.email,
		billAmount : req.body.billAmt,
		groupName : req.body.groupName,
		_partition: 'Bill'
  });

  Bill.save(newBill).then(data => {
  	res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Bill."
    });
  });
};

// Retrieve all bills from the database.
exports.findAll = (req, res) => {
	var condition = { $or: [{billFrom: req.body.email}, 
													{billTo: req.body.email}],
										groupName: req.body.groupName,
										_partition: "Bill" };

	Bill.find(condition).then(data => {
		res.send(data);
	})
	.catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving bills."
    });
  });
};

// Find a single Bill with an id
exports.findOne = (req, res) => {
  
};

// Update a Bill by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Bill with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};
