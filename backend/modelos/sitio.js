//creamos el modelo de base de datos

mongoose = require('mongoose');

var esquemaSitio = mongoose.Schema({

    nombre: {
        type: String,
        required: true

    },

    descripcion: {
        type: String,
        required: true

    },
    calificacion: {
        type: Number,
        required: true

    },
    ciudad: {
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


var Sitio = module.exports = mongoose.model('sitio', esquemaSitio);

module.exports.get = function(callback, limit) {

    Sitio.find(callback).limit(limit);

}