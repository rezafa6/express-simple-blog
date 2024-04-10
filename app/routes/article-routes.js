const express = require("express");
const router = express.Router();
const articlesController = require('@controllers/articles-controller');
// const articlesController = new Articles();

router.get("/", articlesController.index);
router.post("/", articlesController.createPost);
router.get('/delete/:postID' , articlesController.deleteArticle);
router.get('/edit/:postID' , articlesController.editArticle);
router.post('/edit/submit/:postID' , articlesController.submitEdit);

module.exports = router;

