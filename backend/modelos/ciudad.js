//creamos el modelo de base de datos

mongoose = require('mongoose');

var esquemaCiudad = mongoose.Schema({

    nombre: {
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


var Ciudad = module.exports = mongoose.model('ciudad', esquemaCiudad);

module.exports.get = function(callback, limit) {

    Ciudad.find(callback).limit(limit);

}