const connectionToDB = require("@database/mysql");
const commentsModel = require("@models/comments");
const statusEnums = commentsModel.getCommentsStatusList();
 
module.exports.getAllArticles = async (page = 1, limit = 10, search = "") => {

  //  ! set a new route for search to handle pagination whene searching
  const searchQuery = search
    ? `WHERE p.title LIKE '%${search}%' OR p.slug LIKE '%${search}%'`
    : "";

  page = (page - 1) * limit;
  const [data] = await connectionToDB.query(`
    SELECT p.*,u.full_name
    FROM posts p
    JOIN users u ON p.author_id = u.id
    ${searchQuery}
    LIMIT ${page}, ${limit}
    `);
  return data;
};

module.exports.getAllArticlesCount = async () => {
  const [data] = await connectionToDB.query(
    `SELECT COUNT(*) as allPostsCount FROM posts`
  );
  return data[0];
};

module.exports.addNewArticle = async (articleData) => {
  const { author_id, title, slug, content, status, post_image } = articleData;
  const QUERY = `
  INSERT INTO posts (author_id , title , slug , content , status , post_image)
  VALUES(?,?,?,?,?,?)
  `;
  return await connectionToDB.query(QUERY, [
    author_id,
    title,
    slug,
    content,
    status,
    post_image,
  ]);
};

module.exports.removeArticle = async (postID) => {
  const result = await connectionToDB.query("DELETE FROM posts WHERE id=?", [
    postID,
  ]);
  return result;
};

module.exports.editArticle = async (postID, body) => {
  const SQL = `
  UPDATE posts
  SET ? 
  WHERE id = ?
  `;
  const result = await connectionToDB.query(SQL, [body, postID]);
  return result;
};

module.exports.getArticleByID = async (postID) => {
  // if there is author id for post so send full_name , else send null
  const SQL = `
  SELECT 
  p.*, 
  CASE 
      WHEN p.author_id=u.id THEN u.full_name
      ELSE NULL
  END AS full_name
FROM 
  posts p
LEFT JOIN 
  users u ON p.author_id=u.id
WHERE 
  p.id = ?
LIMIT 1
  `;
  const [result] = await connectionToDB.query(SQL, [postID]);
  return result[0];
};

module.exports.getPostComments = async (postID) => {
  const [result] = await connectionToDB.query(
    `
  SELECT * FROM comments WHERE post_id=? AND status = ${statusEnums.ACCEPT}
  `,
    [postID]
  );
  return result;
};
