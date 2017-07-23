var express = require('express');
var curso = require('../model/curso');
var router = express.Router();

router.get('/api/curso/', function(req, res) {
  curso.selectAll(function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay cursos"});
    }
  });
});



router.get('/api/curso/:idcurso',
  function(req, res) {
    var idcurso = req.params.idcurso;
    curso.select(idcurso,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay cursos"});
      }
  });
});

router.post('/curso', function(req, res) {
  var data = {
    idcurso : null,
    nombre: req.body.nombre
  }
  curso.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {

    } else {
      res.json({"Mensaje": "No se ingreso la Usuario:v"});
    }
  });
});

router.post('/api/curso', function(req, res) {
  var data = {
    idcurso : null,
    nombre: req.body.nombre
  }
  curso.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.redirect('/Cursos');
    } else {
      res.json({"Mensaje": "No se ingreso la curso"});
    }
  });
});

router.put('/api/curso/:idcurso', function(req, res) {
  var idcurso = req.params.idcurso;
  var data = {
    idcurso : req.body.idcurso,
    nombre: req.body.nombre
  }

  if(idcurso === data.idcurso) {
    curso.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la curso"});
      }
    });
  } else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

router.delete('/api/curso/:idcurso',
  function(req, res) {
    var idcurso = req.params.idcurso;
    curso.delete(idcurso,
      function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.redirect("/api/curso");
      } else {
        res.json({"Mensaje": "No se puede eliminar, lo siento"});
      }
  });
});


module.exports = router;
