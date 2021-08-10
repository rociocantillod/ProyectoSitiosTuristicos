Galeria = require('../modelos/galeria');

exports.index = function(req, res) {

    Galeria.get(function(err, galerias) {

        if (err) {

            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            status: "success",
            message: "Galerias listadas correctamente",
            data: galerias

        });


    });

};


exports.new = function(req, res) {

    var galeria = new Galeria();
    galeria.descripcion = req.body.descripcion;
    galeria.sitio = req.body.sitio;
    galeria.imagen = req.body.imagen;
    galeria.activo = req.body.activo;

    // save the galeria and check for errors
    galeria.save(function(err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'Nueva galeria creada!',
                data: galeria
            });
    });
};


exports.view = function(req, res) {
    Galeria.findById(req.params.galeria_id, function(err, galeria) {
        if (err)
            res.send(err);
        res.json({
            message: 'cargando detalles de la galeria..',
            data: galeria
        });
    });
};
// Handle update galeria info
exports.update = function(req, res) {
    Galeria.findById(req.params.galeria_id, function(err, galeria) {
        if (err)
            res.send(err);
        galeria.descripcion = req.body.descripcion;
        galeria.sitio = req.body.sitio;
        galeria.imagen = req.body.imagen;
        galeria.activo = req.body.activo;
        // save the galeria and check for errors
        galeria.save(function(err) {
            // Check for validation error
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'Creada nueva galeria!',
                    data: galeria
                });
        });
    });
};
// Handle delete galeria
exports.delete = function(req, res) {
    Galeria.remove({
        _id: req.params.galeria_id
    }, function(err, galeria) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Galeria borrada'
        });
    });
};