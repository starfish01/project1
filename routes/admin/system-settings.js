var express = require('express');
var router = express.Router();
const { userAuthenticated } = require('../../helpers/authentication');


router.all('/*', userAuthenticated, (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
});

/* GET home page. */
router.get('/', function(req, res) {
    res.render('admin/system-settings/index');
});


module.exports = router;