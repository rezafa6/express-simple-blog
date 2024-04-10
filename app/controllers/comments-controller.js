const commentsModel = require("@models/comments");
const dateService = require("@services/date-service");
class CommentController {
  async index(req, res) {
    const statusEnums = commentsModel.getCommentsStatusList();
    const comments = await commentsModel.getAllComments();
    res.mainRenderer("comments", {
      commentsList: comments.map((c) => {
        c.created_at_persian = dateService.convertDateToFormat(
          c.created_at,
          "HH:mm jYYYY/jMM/jDD"
        );
        c.statusTitle = c.status == statusEnums.ACCEPT ? 'Accepted' : 'Rejected' 
        return c;
      }),
      commentsStatus: statusEnums
    });
  }

  async handleCommentStatus(req,res) {
    const {commentID , commentStatus} = req.params
    await commentsModel.handleCommentStatus(+commentStatus , +commentID)
    res.redirect('/comments');
  }
}

module.exports = new CommentController();
