Sitio = require('../modelos/sitio');

exports.index = function(req, res) {

    Sitio.get(function(err, sitios) {

        if (err) {

            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            status: "success",
            message: "Sitios listados correctamente",
            data: sitios

        });


    });

};


exports.new = function(req, res) {

    var sitio = new Sitio();
    sitio.nombre = req.body.nombre;
    sitio.descripcion = req.body.descripcion;
    sitio.calificacion = req.body.calificacion;
    sitio.ciudad = req.body.ciudad;
    sitio.imagen = req.body.imagen;
    sitio.activo = true;

    // save the sitio and check for errors
    sitio.save(function(err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'Nuevo sitio creado!',
                data: sitio
            });
    });
};


exports.view = function(req, res) {
    Sitio.findById(req.params.sitio_id, function(err, sitio) {
        if (err)
            res.send(err);
        res.json({
            message: 'cargando detalles del sitio..',
            data: sitio
        });
    });
};
// Handle update sitio info
exports.update = function(req, res) {
    Sitio.findById(req.params.sitio_id, function(err, sitio) {
        if (err)
            res.send(err);
        sitio.nombre = req.body.nombre ? req.body.nomobre : sitio.nombre;
        sitio.descripcion = req.body.descripcion;
        sitio.calificacion = req.body.calificacion;
        sitio.ciudad = req.body.ciudad;
        sitio.imagen = req.body.imagen;
        sitio.activo = req.body.activo;
        // save the tripulante and check for errors
        sitio.save(function(err) {
            // Check for validation error
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'Sitio actualizado!',
                    data: sitio
                });
        });
    });
};
// Handle delete sitio
exports.delete = function(req, res) {
    Sitio.remove({
        _id: req.params.sitio_id
    }, function(err, sitio) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Sitio borrado'
        });
    });
};