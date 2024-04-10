// express app
const express = require("express");
const application = express();
const { ENV } = require("@env/env");
const path = require('path')
// Set view engine
require("./bootstrap/index")(application);

// Serve static files from the 'assets' directory
application.use("/assets", express.static("assets"));
application.use('/uploads', express.static(path.join(__dirname, '..' ,'uploads')));

// Set routes module
require("@routes/app-router")(application);

// Export application module to run
module.exports = () => {
  application.listen(ENV.port, () => {
    console.log(`APP RUN ON ${ENV.port}`);
  });
};

