const connectToDatabase = require("@database/mysql");

module.exports.getAllUsers = async () => {
    const [users] = await connectToDatabase.query('SELECT * FROM users');
    return users;
}

module.exports.addNewUserInDB = async (newUser) => {
    const [results] = await connectToDatabase.query(
        `
        INSERT INTO users SET ?
        `,
        [newUser]
        );
    return results;
}

module.exports.findSingleUserByEmail = async (email) => {
    const [result] = await connectToDatabase.query(
        `
    SELECT * FROM users WHERE email=? LIMIT 1
    ` , [email]);
    return result[0];
}

module.exports.deleteUser = async(userID) => {
    const [results] = await connectToDatabase.query(`
    DELETE FROM users WHERE id=?
    ` , userID)
    return results[0]; 
}