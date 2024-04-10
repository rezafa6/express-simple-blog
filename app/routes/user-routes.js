const express = require("express");
const router = express.Router();
const Users = require('@controllers/users-controller');
const usersController = new Users();

router.get("/", usersController.index);
router.get('/create-user' , usersController.createUserPage);
router.post('/create-user' , usersController.addNewUser);
router.get('/delete/:userID' , usersController.deleteUser);
// router.get('/edit/:userID' , articlesController.editArticle);
// router.post('/edit/submit/:userD' , articlesController.submitEdit);

module.exports = router;

