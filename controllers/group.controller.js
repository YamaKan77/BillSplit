const db = require("../models");
const Group = db.groups;

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
  const url = 'https://' + req.get('host');
  let condition = { _partition: "Group", groupName: req.body.groupName};
  let img = url + '/public/' + req.file.filename;
  Group.findOneAndUpdate(condition, { img: img}).then(data => {
    res.send(data);
  })
  
}
