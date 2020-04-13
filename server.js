const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Test route using http://localhost:3000/
app.get("/", (req, res) => {
  res.json({ message: "Welcome to GovTech's Teacher Admin Application." });
});

// Application routes for all rest endpoints
require("./app/route/api.route.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
