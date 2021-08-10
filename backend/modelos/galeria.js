//creamos el modelo de base de datos

mongoose = require('mongoose');

var esquemaGaleria = mongoose.Schema({

    descripcion: {
        type: String,
        required: true

    },

    idsitio: {
        type: String,
        required: true

    },

    imagen: {
        type: String,
        required: true

    },

    activo: {
        type: Boolean,
        required: true

    },
    create_date: {
        type: Date,
        default: Date.now
    }


});


var Galeria = module.exports = mongoose.model('galeria', esquemaGaleria);

module.exports.get = function(callback, limit) {

    Galeria.find(callback).limit(limit);

}