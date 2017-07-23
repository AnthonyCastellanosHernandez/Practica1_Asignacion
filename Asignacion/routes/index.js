var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/secciones', function(req, res, next) {
  res.render('default/seccion');
});

router.get('/grupos', function(req, res, next) {
  res.render('default/grupo');
});

router.get('/cursos', function(req, res, next) {
  res.render('default/cursos');
});
module.exports = router;
