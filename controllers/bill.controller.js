const db = require("../models");
const Bill = db.bills;

// Create and Save a new Bill
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body.billFromId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create Bill
  const Bill = new Bill({
	  billFromId : req.body.id,
		billName : req.body.billName,
		billTo : req.body.billedTo[i],
		billFrom : req.body.email,
		billAmount : req.body.billAmt.toFixed(2),
		groupName : req.body.groupName,
		_partition: 'Bill'
  });

  bill.save(Bill).then(data => {
  	res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial."
    });
  });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  
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

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};
