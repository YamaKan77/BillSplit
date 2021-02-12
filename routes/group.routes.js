module.exports = app => {

  const groups = require("../controllers/group.controller.js");

  let router = require("express").Router();
	let multer = require('multer');
	let aws = require('aws-sdk');
	let multerS3 = require('multer-s3');

	require('dotenv').config();
	let s3 = new aws.S3({
	    region: 'us-west-1',
	    accessKeyId: process.env.AWSAccessKeyId,
	    secretAccessKey: process.env.AWSSecretKey,
	    signatureVersion: 'v4'
	  });

	var upload = multer({
		storage: multerS3({
			acl: "public-read",
			s3: s3,
			bucket: process.env.Bucket,
			metadata: function (req, file, cb) {
				cb(null, {fieldName: file.originalname});
			},
			key: function (req, file, cb) {
				cb(null, file.originalname)
			}

		}),
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