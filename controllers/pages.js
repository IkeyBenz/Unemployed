module.exports = function (app) {
     
    app.get('/', (req, res) => {
        res.render('login');
    });
    
}