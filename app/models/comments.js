const connectToDatabase = require('@database/mysql');

module.exports.getAllComments = async () => {
    const [result] = await connectToDatabase
    .query(`
        SELECT c.*,p.title as postTitle
        FROM
        comments c 
        JOIN
        posts p
        WHERE c.post_id = p.id
    `);
    return result;
}

module.exports.handleCommentStatus = async (status , commentID) => {
    const [result] = await connectToDatabase
    .query(`
    UPDATE comments SET status=? WHERE id =? LIMIT 1
    ` , [status , commentID]);
    return result.affectedRows
}

module.exports.addComment = async (commentData) => {
    const [result] = await connectToDatabase
    .query(`
    INSERT INTO comments SET ?
    ` , [commentData]);
    return result.affectedRows
}

module.exports.getCommentsStatusList = () => {
    return {
        ACCEPT: 1,
        REJECT: 0
    }
}
