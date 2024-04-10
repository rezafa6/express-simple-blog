const { ENV } = require("@env/env");

module.exports = (app) => {
  app.use((req, res, next) => {
    // Add this middleware to your Node.js server
    // if there is CROS error in front
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    let loggedInUser = null;
    if (req.session.hasOwnProperty("user")) {
      loggedInUser = req.session.user;
    }
    res.mainRenderer = (template, options, selectedLayout = "layout") => {
      const { error, message } = req.session;
      options = {
        ...options,
        error: error,
        message: message,
        user: loggedInUser,
      };
      res.render(template, options, (err, html) => {
        setLayout(res, html, selectedLayout, options);
      });
    };
    next();
  });
};

function setLayout(res, html, selectedLayout, options) {
  res.render(selectedLayout, {
    title: ENV.appName,
    body: html,
    ...options,
  });
}
