var express = require('express');
var router = express.Router();
const { userAuthenticated } = require('../../helpers/authentication');


router.all('/*', userAuthenticated, (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
});

/* GET home page. */
router.get('/', function(req, res) {
    console.log('helllooooooo')
    res.render('admin/electrical-configuration/index');
});


module.exports = router;