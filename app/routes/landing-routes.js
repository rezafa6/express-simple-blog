const express = require('express');
const router = express.Router();
const LandingController = require('@controllers/landing-controller');
const landingController = new LandingController()
const articlesModel = require("@models/articles");

router.get(['/home' , '/'] , async (req,res) => {
    const posts = await articlesModel.getAllArticles();
    res.landingRenderer('homePage' , {posts: posts.slice(0,3)});
})

router.get('/posts-list' , landingController.postsList );
router.get('/single-post/:postID' , landingController.singlePost );
router.post('/add-comment/:postID' , landingController.addComment);
module.exports = router;
