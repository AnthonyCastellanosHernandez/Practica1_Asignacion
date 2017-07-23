function ajaxHelper(uri, method, data) {
  return $.ajax({
    url: uri,
    type: method,
    dataType: 'json',
    contentType: 'application/json',
    data: data ? JSON.stringify(data) : null
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(errorThrown);
  });
}

var Seccion = function() {
  var main = this;
  var seccionUri = "http://localhost:3000/api/seccion/";
  main.secciones = ko.observableArray([]);

  main.getsecciones = function() {
    ajaxHelper(seccionUri, 'GET').done(function(data) {
      main.secciones(data);
      });
  }

  
   main.eliminar = function (item) {
        var id = item.idSeccion;
        var uri = seccionUri + id;
        ajaxHelper(uri, 'DELETE').done(function () {
            main.getsecciones();
        });
    }
  main.getsecciones();
}


$(document).ready(function() {
  var seccion = new Seccion();
  ko.applyBindings(seccion);
})
