// module.exports = {
//     ///Create CheckAuth Middleware
//     const checkAuth = (req, res, next) => {
//         if(!req.user) {
//             res.redirect('/')
//             console.log('user is not logged in')
//         } else {
//             next();
//         }
//     }
// }

const checkAuth = function(req, res, next) {
    if(!req.user) {
        res.redirect('/');
        console.log('')
    } else {
        return next();
    }
}

module.exports = checkAuth 
