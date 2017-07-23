var express = require('express');
var seccion = require('../model/seccion');
var router = express.Router();

router.get('/api/seccion/', function(req, res) {
  seccion.selectAll(function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay secciones"});
    }
  });
});



router.get('/api/seccion/:idseccion',
  function(req, res) {
    var idseccion = req.params.idseccion;
    seccion.select(idseccion,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay secciones"});
      }
  });
});

router.post('/seccions', function(req, res) {
  var data = {
    idseccion : null,
    nombre: req.body.nombre
  }
  seccion.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.redirect("/");
    } else {
      res.json({"Mensaje": "No se ingreso la Usuario"});
    }
  });
});

router.post('/api/seccion', function(req, res) {
  var data = {
    idseccion : null,
    nombre: req.body.nombre
  }
  seccion.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.redirect('/secciones');    //cambioDeRuta
    } else {
      res.json({"Mensaje": "No se ingreso la seccion"});
    }
  });
});

router.put('/api/seccion/:idseccion', function(req, res) {
  var idseccion = req.params.idseccion;
  var data = {
    idseccion : req.body.idseccion,
    nombre: req.body.nombre
  }

  if(idseccion === data.idseccion) {
    seccion.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la seccion"});
      }
    });
  } else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

router.delete('/api/seccion/:idseccion',
  function(req, res) {
    var idseccion = req.params.idseccion;
    seccion.delete(idseccion,
      function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.redirect("/api/seccion");
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});


module.exports = router;
