const articlesModel = require("@models/articles");
const commentsModel = require("@models/comments");
const usersModel = require("@models/users");
const {
  makeRecursiveCommentsStructure,
} = require("@services/data-helper-service");

class LandingController {

  async postsList(req, res) {
    const page = req.query.page || 1;
    const limit = 10;
    const posts = await articlesModel.getAllArticles(+page, +limit);
    const { allPostsCount } = await articlesModel.getAllArticlesCount();
    const pagesOptions = {
      totalPages: Math.ceil(+allPostsCount / limit),
      nextPage: +page + 1,
      currentPage: +page,
      prevPage: +page - 1 < 1 ? 1 : +page - 1,
    };
    res.landingRenderer("postsList", {
      totalPages: allPostsCount,
      posts,
      pagesOptions,
    });
  }

  async singlePost(req, res) {
    const postID = req.params.postID;
    const postComments = await articlesModel.getPostComments(postID);
    let singlePost = await articlesModel.getArticleByID(postID);
    // * #start make recursive structure
    const structredComments = await makeRecursiveCommentsStructure(
      postComments
    );
    // res.send( structredComments )
    // * #end ***************************
    res.landingRenderer("singlePost", {
      message: req.session.message,
      post: singlePost,
      comments: postComments,
    });
  }

  async addComment(req, res) {
    let userID = null;
    // if user logged in get userID
    if (req.session.user) {
      const { email } = req.session.user;
      const user = await usersModel.findSingleUserByEmail(email);
      userID = user.id;
    }

    const { email, comment } = req.body;
    const body = {
      email: email,
      comment: comment,
      status: 0, // default status
      post_id: +req.params.postID,
      author_id: userID,
    };
    const result = await commentsModel.addComment(body, +req.params.postID);
    result < 1
      ? (req.session.message = "err occoured !")
      : (req.session.message = "comment addedd !");
    res.redirect(`/single-post/${+req.params.postID}`);
  }
}
module.exports = LandingController;
