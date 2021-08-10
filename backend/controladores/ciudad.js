Ciudad = require('../modelos/ciudad');

exports.index = function(req, res) {

    Ciudad.get(function(err, ciudades) {

        if (err) {

            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            status: "success",
            message: "Ciudades listadas correctamente",
            data: ciudades

        });


    });

};


exports.new = function(req, res) {

    var ciudad = new Ciudad();
    ciudad.nombre = req.body.nombre;
    ciudad.activo = true;

    // save the ciudad and check for errors
    ciudad.save(function(err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'Nueva ciudad creada!',
                data: ciudad
            });
    });
};


exports.view = function(req, res) {
    Ciudad.findById(req.params.ciudad_id, function(err, ciudad) {
        if (err)
            res.send(err);
        res.json({
            message: 'cargando detalles de la ciudad..',
            data: ciudad
        });
    });
};
// Handle update ciudad info
exports.update = function(req, res) {
    Ciudad.findById(req.params.ciudad_id, function(err, ciudad) {
        if (err)
            res.send(err);
        ciudad.nombre = req.body.nombre;
        ciudad.activo = req.body.activo;
        // save the ciudad and check for errors
        ciudad.save(function(err) {
            // Check for validation error
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'Ciudad actualizada!',
                    data: ciudad
                });
        });
    });
};
// Handle delete ciudad
exports.delete = function(req, res) {
    Ciudad.remove({
        _id: req.params.ciudad_id
    }, function(err, ciudad) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Ciudad borrada'
        });
    });
};