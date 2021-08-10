let rutas = require('express').Router();;
rutas.get('/', function(req, res) {
    res.json({
        status: 'Api funcionando',
        message: 'Bienvenido'
    });
});

var controladorSitio = require('../controladores/sitio');
//var controladorCiudad = require('../controladores/ciudad');
//var controladorGaleria = require('../controladores/galeria');


rutas.route('/sitios')
    .get(controladorSitio.index)
    .post(controladorSitio.new);

rutas.route('/sitio/:sitio_id')
    .get(controladorSitio.view)
    .patch(controladorSitio.update)
    .put(controladorSitio.update)
    .delete(controladorSitio.delete); // Export API routes


module.exports = rutas;