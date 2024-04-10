const landingRoutes = require("@routes/landing-routes");
const adminRoutes = require("@routes/admin-routes");
const articleRoutes = require("@routes/article-routes");
const commentsRoutes = require("@routes/comment-routes");
const userRoutes = require("@routes/user-routes");
const authRoutes = require("@routes/auth-routes");

const routesGuard = require("@middleware/auth-middleware");
const guestGuard = require("@middleware/guest-middleware");

module.exports = (application) => {
  application.use("/", landingRoutes);
  application.use("/admin", adminRoutes);
  application.use("/articles", [routesGuard], articleRoutes);
  application.use("/comments", [routesGuard], commentsRoutes);
  application.use("/users", [routesGuard], userRoutes);
  application.use("/auth", [guestGuard] , authRoutes);
};
