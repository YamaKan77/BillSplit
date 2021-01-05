module.exports = app => {
  const groups = require("../controllers/group.controller.js");

  var router = require("express").Router();

  // Retreive all Bills realted to user
	router.post("/", groups.findUserList);

	router.post("/getGroups", groups.findUserGroups);

  app.use('/api/groups', router);
};