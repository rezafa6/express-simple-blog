const express = require('express');
const router = express.Router();
const statictics  = require('@models/statictics');
const Settings = require('@controllers/settings-controller');
const SettingsController = new Settings();
const authService = require('@services/auth-service')

// Define admin routes
 router.get("/", async (req, res) => {
  if(!req.session.user) {
    authService.onLogout(req,res);
    return
  }
    res.mainRenderer(
      "dashboardData",
      {
        allPosts: await statictics.getPostsCount(),
        allComments: await statictics.getCommentsCounts(),
        getUsersCounts: await statictics.getUsersCounts(),
      }
    );
  });

  router.get('/settings' , SettingsController.index);

  router.get('/logout' , authService.onLogout)

module.exports = router;