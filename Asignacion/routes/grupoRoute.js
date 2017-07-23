var express = require('express');
var grupo = require('../model/grupo');
var router = express.Router();
var idGrupo = 1;

router.get('/api/grupo/', function(req, res, next) {
  grupo.select(idGrupo, function(grupos) {
    if(typeof grupos !== 'undefined') {
      res.json(grupos);
    } else {
      res.json({"mensaje" : "No hay grupos"});
    }
  });
});

router.get('/api/grupo/:id', function(req, res, next) {
  var idgrupo = req.params.idGrupo;
  grupo.select(idgrupo, function(grupos) {
    if(typeof grupos !== 'undefined') {
      res.json(grupos);
    } else {
      res.json({"mensaje" : "No hay grupos"});
    }
  });
});

router.post('/api/grupo', function(req, res, next) {
  var data = {
    nombreGrupo : req.body.nombreGrupo,
    idSeccion : req.body.idSeccion
  };

  grupo.insert(data, function(resultado){
    if(resultado && resultado.affectedRows > 0) {
      res.redirect("/grupos");
    } else {
      res.json({"mensaje":"No se ingreso el grupo"});
    }
  });
});

router.put('/api/grupo/:idgrupo', function(req, res, next){
  var idgrupo = req.params.idgrupo;
  var data = {
    idgrupo : req.body.idgrupo,
    nombreGrupo : req.body.nombreGrupo,
    idSeccion : req.body.idSeccion
  }
  if(idgrupo == data.idgrupo) {
    grupo.update(data, function(resultado){
      if(resultado.length > 0) {
        res.json(resultado);
      } else {
        console.log("NO: " + resultado.length);
        res.end();
      }
    });
  } else {
    res.json({"mensaje": "No coinciden los identificadores"});
  }
});

router.delete('/api/grupo/:idgrupo', function(req, res, next){
  var idgrupoUri = req.params.idgrupo;
  var idgrupoBody = req.body.idgrupo;

  if(idgrupoUri == idgrupoBody) {
    grupo.delete(idgrupoBody, function(resultado){
      if(resultado && resultado.mensaje ===	"Eliminado") {
        res.json({"mensaje":"Se elimino la grupo correctamente"});
      } else {
        res.json({"mensaje":"Se elimino la grupo"});
      }
    });
  }
});

module.exports = router;
