var Grupo = function () {
    var main = this;
    var grupoUri = "http://localhost:3000/api/grupo/";
    var seccionUri = "http://localhost:3000/api/seccion/";
    main.grupos = ko.observableArray([]);
    main.secciones = ko.observableArray([]);
    main.error = ko.observable();
    main.grupoCargado = ko.observable();
    main.grupoNuevo = {
        nombreGrupo: ko.observable(),
        seccion: ko.observable()
    }

     function ajaxHelper(uri, method, data) {
        main.error('');
        return $.ajax({
            url: uri,
            type: method,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            main.error(errorThrown);
        });
    }

       main.editar = function (formElement) {
        var ed = {
            nombreGrupo: main.grupoCargado().nombreGrupo,
            idSeccion: main.grupoCargado().seccion.idSeccion
        }
        var uri = grupoUri + ed.idGrupo;
        ajaxHelper(uri, 'PUT', ed)
            .done(function (data) {
                main.getGrupos();
                $("#modalRolEditar").modal('hide');
            })
    }

    main.eliminar = function (item) {
        var id = item.idGrupo;
        var uri = grupoUri + id;
        ajaxHelper(uri, 'DELETE').done(function () {
            main.getGrupos();
        });
    }

    main.agregar = function (formElement) {
        var grupo = {
            nombreGrupo: main.grupoNuevo.nombreGrupo(),
            idSeccion: main.grupoNuevo.seccion().idSeccion
        }
        console.log(grupo);
        ajaxHelper(grupoUri, 'POST', grupo)
            .done(function (data) {
               main.getGrupos();
                $('#modalGrupo').modal('hide');
            });
    }

 
  main.getGrupos = function() {
    ajaxHelper(grupoUri, 'GET').done(function(data) {
      main.grupos(data);
      });
  }
    main.getSecciones= function () {
        ajaxHelper(seccionUri, 'GET')
            .done(function (data) {
                main.secciones(data);
            });
    }


    function limpiar() {
        main.grupoNuevo.nombreGrupo(null);
        main.grupoNuevo.seccion(null);
        main.grupoCargado(null);
    }
    main.getGrupos();
    main.getSecciones();
}


$(document).ready(function() {
  var grupo = new Grupo();
  ko.applyBindings(grupo);
})