const mustacheExpress = require("mustache-express");
const { ENV } = require("@env/env");
const session = require("express-session");
const adminMiddleware = require("@middleware/admin-middleware");
const landingMiddleware = require("@middleware/landing-middleware");
const expressFileupload = require('express-fileupload')
// body parser configs
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// session store use session-mysql-session
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(ENV.database);

module.exports = (application) => {
  // template engine
  application.engine("mustache", mustacheExpress());
  application.set("view engine", "mustache");
  application.set("views", ENV.viewFilesPathList);
  // Add a custom partials directory
  application.set("partials", ENV.partialsFilePath);
  application.engine("mustache", mustacheExpress(application.get("partials")));
  // body parser
  application.use(jsonParser);
  application.use(urlencodedParser);
  // middleware for set layout globally
  
  // session configs
  application.use(
    session({
      secret: "your_secret_key",
      resave: false,
      saveUninitialized: true,
      store: sessionStore
    })
  );
  // middlewares
  adminMiddleware(application);
  landingMiddleware(application);
    // file uploader  
  application.use(expressFileupload({
    createParentPath: true,
    useTempFiles: false
  }));
};
