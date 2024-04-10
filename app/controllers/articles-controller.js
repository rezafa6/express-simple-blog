const articlesModel = require("@models/articles");
const usersModel = require("@models/users");
const { convertDateToFormat } = require("@services/date-service");
const { fileUploader } = require("@services/file-uploader");

class Articles {

  // #start index
  async index(req, res) {
    const search = 'search' in req.query ? req.query.search : '';
    // * start pagination calculates
    const page = 'page' in req.query ? req.query.page : 1;
    const limit = 10;
    const posts = await articlesModel.getAllArticles(page,limit,search);
    const {allPostsCount} = await articlesModel.getAllArticlesCount();
    const totalPages = Math.ceil(allPostsCount / limit);
    //* end pagination calculates

    const users = await usersModel.getAllUsers();
    const presentPosts = posts.map((item, i) => {
      // convert date
      item.created_at_persian = convertDateToFormat(
        item.created_at,
        "HH:mm jYYYY/jMM/jDD"
      );
      // set index
      item.index = i + 1;
      return item;
    });
    res.mainRenderer("articles", {
      allPostsList: presentPosts,
      usersList: users,
      error: req.session.error,
      message: req.session.error,
      searchValue: '',
      pagesOptions : {
        totalPages: totalPages,
        currentPage: page,
        nextPage: page+1,
        prevPage: page-1,
      }
    });
  }
  // #end index

  // #start createPost
  async createPost(req, res) {
    
    let file = null;
    // * upload file in 'uploads' folder
    if (req.files.postImg) {
      file = await fileUploader(req.files.postImg);
    }

    const newArticle = { ...req.body, post_image: file };
    if (!newArticle.title) {
      req.session.error = "title is required";
      res.redirect("/articles");
      return;
    }
    articlesModel.addNewArticle(newArticle).then(
      (success) => {
        delete req.session.error;
        res.redirect("/articles");
      },
      (failed) => {
        console.log(failed, "failed");
      }
    );
  }
  // #end createPost

  // #start delete post
  async deleteArticle(req, res) {
    const postID = req.params.postID;
    if (!postID) {
      res.session.error = "There is no post id";
    }
    await articlesModel.removeArticle(postID);
    res.redirect("/articles");
    delete res.session.error;
  }
  // #end deelte post

  // #start edit
  async editArticle(req, res) {
    const postID = req.params.postID;
    let posts = await articlesModel.getAllArticles();
    const users = await usersModel.getAllUsers();
    const selectedPost =
      posts[posts.findIndex((x) => x.id === parseInt(postID))];
    res.mainRenderer("edit", { selectedPost: selectedPost, usersList: users });
  }

  async submitEdit(req, res) {
    const body = {
      ...req.body,
    };
    await articlesModel.editArticle(req.params.postID, body);
    req.session.message = "Post successfully updated !!!";
    res.redirect("/articles");
    delete req.session.message;
  }
  // #end edit
}

module.exports = new Articles();
