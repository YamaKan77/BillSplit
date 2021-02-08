const db = require("../models");
const Bill = db.bills;

// Create and Save a new Bill
exports.insert = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  Bill.insertMany(req.body).then(data => {
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
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
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

// Update a Bill by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Bill with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Bill.findByIdAndRemove(id)
    .then(data => {
      res.send({
        message: "Bill deleted."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete bill"
      });
    });
};
