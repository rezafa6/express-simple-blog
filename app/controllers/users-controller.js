const usersModel = require('@models/users');
const {hashPassword} = require('@services/hash-use-bcrypt-lib');
class Users {
    async index(req,res) {
        res.mainRenderer('users' , {
            allUsersList: await usersModel.getAllUsers(),
            message: req.session.message
        })
    }

    async createUserPage(req,res) {
        res.mainRenderer('createUserPage' , { message: req.session.message});
    }

    async addNewUser(req,res) {
        if(!req.body.password || !req.body.full_name) {
            req.session.message = `Fill all inputs`
            res.redirect('create-user');
            return
        }
        const hashedPassword = hashPassword(req.body.password.toString());
        const body = { ... req.body , password: hashedPassword }
        const {affectedRows , insertId} = await usersModel.addNewUserInDB(body);
        if(affectedRows > 0) {
            req.session.message = `User added successfully, new user id => ${insertId}`;
            res.redirect('/users');
        }
    }

    async deleteUser(req,res) {
        const userID = req.params.userID;
        const {affectedRows} = await usersModel.deleteUser(userID);
        if(affectedRows > 0) {
            req.session.message = 'user deleted successfully';
            res.redirect('/users');
        }
    }
    
}

module.exports = Users;