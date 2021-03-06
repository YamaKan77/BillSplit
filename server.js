const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = __dirname + '/build/';
const app = express();

var corsOptions = {
  // origin: "http://localhost:3000/api"
  // origin: "http://192.168.0.18:3000/api"
  origin: "https://divyup.herokuapp.com"
};

app.use(express.static(path));

app.use('/public', express.static(__dirname + '/public'));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/*", (req, res) => {
  res.sendFile(path + "index.html");
});

// set port, listen for requests
require("./routes/bill.routes")(app);
require("./routes/group.routes")(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
