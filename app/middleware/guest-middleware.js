module.exports = (req,res,next) => {
    if(!req.session.hasOwnProperty('user')) {
        next()
    }else {res.redirect('/admin')}
}