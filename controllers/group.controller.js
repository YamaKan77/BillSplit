const db = require("../models");
const Group = db.groups;
var aws = require('aws-sdk');
require('dotenv').config();

// Create and Save a new Bill
exports.insert = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  Group.insertMany(req.body).then(data => {
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
exports.findUserList = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
	var condition = { groupName: req.body.groupName,
										_partition: "Group" };

	Group.find(condition).then(data => {
		res.send(data);
	})
	.catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving bills."
    });
  });
};

// Find the group that he user belongs to
exports.findUserGroups = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  let user = req.body.user;
  let condition = { _partition: "Group", participants: user};

  Group.find(condition).then(data => {
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
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  let condition = { _partition: "Group", groupName: req.body.groupName};
  Group.findOneAndUpdate(condition, { participants: req.body.participants }).then(data => {
    res.send(data);
  });

};

// Upload image for card overlay
exports.upload = (req, res, next) => {
  let condition = { _partition: "Group", groupName: req.body.groupName};
  // Location of S3 location, find way to pass as variable 
  let img = "https://divyupbucket.s3-us-west-1.amazonaws.com/" + req.body.fileName;
  Group.findOneAndUpdate(condition, { img: img}).then(data => {
    res.send(data);
  })
}

exports.delete = (req, res) => {
  const id = req.params.id;

  Group.findByIdAndRemove(id)
    .then(data => {
      res.send({
        message: "Group deleted."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete group"
      });
    });
};
