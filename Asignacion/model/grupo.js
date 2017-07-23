var database = require("./database");
var grupo = {};

grupo.select = function(idSeccion, callback) {
  if(database) {
		database.query('CALL sp_selectGrupo(?)', idSeccion,
     function(error, resultados){
			if(error) {
				throw error;
			} else {
				callback(resultados[0]);
			}
		});
	}
}

grupo.insert = function(data, callback) {
  if(database) {
    database.query('CALL sp_insertGrupo(?,?)',
    [data.nombreGrupo,data.idSeccion],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"affectedRows": resultado.affectedRows});
      }
    });
  }
}

grupo.update = function(data, callback){
	if(database) {
		database.query('CALL sp_updateGrupo(?,?,?)',
		[data.idGrupo, data.nombreGrupo, data.idSeccion],
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(resultado[0]);
			}
		});
	}
}

grupo.delete = function(idgrupo, callback) {
	if(database) {
		database.query('CALL sp_deleteGrupo(?)', idgrupo,
		function(error, resultado){
			if(error){
				throw error;
			} else {
				callback({"mensaje":"Eliminado"});
			}
		});
	}
}

module.exports = grupo;
