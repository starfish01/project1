var express = require('express');
var router = express.Router();

router.all('/*', (req, res, next)=>{
  req.app.locals.layout = 'home';
  next();
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home/index', { title: 'Express' });
});

module.exports = router;
