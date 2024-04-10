const connectToDatabase = require("@database/mysql");

exports.getPostsCount = async () => {
  const [data] = await connectToDatabase.query("SELECT COUNT(id) as allPosts from posts");
  return data[0].allPosts;
}

exports.getCommentsCounts = async () => {
  const [data] = await connectToDatabase.query("SELECT COUNT(id) as allComments from comments");
  return data[0].allComments;
} 

exports.getUsersCounts = async () => {
  const [data] = await connectToDatabase.query('SELECT COUNT(id) as allUsers from users');
  return data[0].allUsers;
}
