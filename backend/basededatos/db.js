const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/travelus', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conected MongoDB..."))
    .catch((err) => console.log('Error connect MongoDB...', err));

const ciudadSchema = new mongoose.Schema({
    nombre: String,
    estado: { type: Boolean, default: true },
    date: { type: Date, default: Date.now }
});

const sitioSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    calificacion: Number,
    // idCiudad: [{
    //    type: mongoose.Schema.Types.ObjectId,
    //   ref: "Ciudad"
    //}],
    ciudad: String,
    imagen: String,
    estado: { type: Boolean, default: true },
    date: { type: Date, default: Date.now }
});
console.log("Esquema sitio creado");
const Sitio = mongoose.model('Sitio', sitioSchema);

async function createSitio() {
    const _sitio = new Sitio({
        nombre: "Islas del Rosario",
        descripcion: "Bello grupo de islas de arenas blancas y aguas cristalinas del caribe Colombiano",
        calificacion: 10,
        // idCiudad: [{
        //    type: mongoose.Schema.Types.ObjectId,
        //   ref: "Ciudad"
        //}],
        imagen: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcolombia.travel%2Fes%2Fcartagena%2Fplayas-e-islas-del-rosario&psig=AOvVaw3vjD4I_uvHX96COv6-6Mkw&ust=1628784276469000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOCSj7asqfICFQAAAAAdAAAAABAI",
    });

    const savedSitio = await _sitio.save();

    console.log(savedSitio);
}
createSitio();