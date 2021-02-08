module.exports = app => {

  const groups = require("../controllers/group.controller.js");

  let router = require("express").Router();
	let multer = require('multer');
	let { v4: uuidv4 } = require('uuid');
	const DIR = './public/';

	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, DIR);
		},
		filename: (req, file, cb) => {
			const fileName = file.originalname.toLowerCase().split(' ').join('-');
			cb(null, uuidv4() + '-' + fileName); 
		}
	});

	var upload = multer({
		storage: storage,
		fileFilter: (req, file, cb) => {
			if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
				cb(null, true);
			} else {
				cb(null, false);
				return cb(new Error('Only .png, .jpg, and .jpeg format allowed'));
			}
		}
	});

  // Retreive all Bills realted to user
	router.post("/", groups.findUserList);

	router.post("/getGroups", groups.findUserGroups);

	router.post("/insert", groups.insert);

	router.post("/update", groups.update);

	router.post('/upload', upload.single('img'), groups.upload);

	router.delete("/:id", groups.delete);

  app.use('/api/groups', router);
};