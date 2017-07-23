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

var Curso = function() {
  var main = this;
  var cursoUri = "http://localhost:3000/api/curso/";
  main.cursoes = ko.observableArray([]);
  main.cursoCargado = ko.observable();

  main.getcursoes = function() {
    ajaxHelper(cursoUri, 'GET').done(function(data) {
      main.cursoes(data);
      });
  }

  main.editar = function (formElement) {
        var ed = {
            nombre: main.cursoCargado().nombre
        }
        var uri = cursoUri + ed.idCurso;
        ajaxHelper(uri, 'PUT', ed)
            .done(function (data) {
                main.getcursoes();
                $("#ModalCursoEditar").modal('hide');
            })
    }


   main.eliminar = function (item) {
        var id = item.idCurso;
        var uri = cursoUri + id;
        ajaxHelper(uri, 'DELETE').done(function () {
            main.getcursoes();
        });
    }

  main.getcursoes();
}


$(document).ready(function() {
  var curso = new Curso();
  ko.applyBindings(curso);
})
