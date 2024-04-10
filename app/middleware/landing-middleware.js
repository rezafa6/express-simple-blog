const { ENV } = require("@env/env");
module.exports = (app) => {
    app.use((req,res,next) => {
        res.landingRenderer = (template , options) => {
            res.render(template,options , (err , html) => {
                setLayout(res, html, options);
            })
        }
        next();
    })
}
const LANDING_LAYOUT = 'landingLayout'
function setLayout(res, html, options) {
    res.render(LANDING_LAYOUT, {
      title: ENV.appName,
      body: html,
      ...options,
    });
  }