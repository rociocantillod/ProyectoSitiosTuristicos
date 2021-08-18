const express = require('express');
const tokkenRequire = require('./middlewares/auth');
const Joi = require('joi');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(tokkenRequire);

const data = [{
        "name": 'Rocio',
        "cc": "1234567"
    },
    { "name": 'Diana', "cc": "4567123" },
    { "name": 'Juan', "cc": "3876234" },
]

app.get('/', function(req, res) {
    res.send('GET request to homepage');
})

app.get('api/users', function(req, res) {
    res.send(data);
})
app.get('api/users/:cc', function(req, res) {
    let user = existUser(req.params, cc);
    if (!user) {
        res.status(404).send('El usuario no fue encontrado');
        return;
    }

    res.send(user);
})

app.post('api/users/:cc', function(req, res) {

    const user = {
        cc: req.body.cc,
        name: req.body.name
    }

    const { value, error } = validateUser(user);
    if (!error) {
        data.push(value);
    } else {
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
        return;
    }

    res.send('Guardado con exito')

})


//UPDATE
app.put('api/users/:cc', function(req, res) {

    const { value, error } = validateUser({
        cc: req.body.cc,
        name: req.body.name
    })
    if (error) {
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
        return;
    }
    let user = existUser(req.params, cc);
    if (!user) {
        res.status(404).send('El usuario no fue encontrado');
        return;
    }
    user.name = req.body.name;
    user.cc = req.body.cc;
    res.send(user);
})

//DELETE
app.delete('api/users/:cc', function(req, res) {
    let user = existUser(req.params, cc);
    if (!user) {
        res.status(404).send('El usuario no fue encontrado');
        return;
    }

    const index = data.indexOf(user);
    data.splice(index, 1);

    res.send(user);
})

app.listen(5000, () => {
    console.log("Corriendo server en el puerto 5000");
})

function existUser(cc) {
    return data.find(u => u.cc === cc);
}


function validateUser(user) {
    const schema = Joi.object({
        cc: Joi.string().alphanum().min(7).required(),
        name: Joi.string().min(3).required(),

    })
    return schema.validate(user);
}