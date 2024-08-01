const express = require('express');
const { Router } = require('express');
const app = express();
const bodyParser = require('body-parser')
require('./database/db.connection');
const User = require('./models/model');
const route = Router();
const port = 3000;

app.use('/usuario', route);
app.use(express.json());
app.use(bodyParser.json());

route.get('/obtener-usuarios', async (req, res) => {
    try {
      const resp = await User.find({});
      res.status(200).json(resp);
    } catch (error) {
      console.log(error.message);
    }
});

route.get('/obtener-usuario-por-id/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const resp = await User.findById(id);
    res.status(200).json(resp);
  } catch (error) {
    console.log(error.message);
  }
});

route.post('/crear-usuario', async (req, res) => {
  try {
    const datosUsuario = req.body;
    console.log(datosUsuario);

    const camposRequeridos = ['nombre', 'empresa', 'domicilio', 'telefono', 'email', 'propietario', 'contrasena'];
    for (const campo of camposRequeridos) {
      if (!datosUsuario[campo]) {
        return res.status(400).json({ error: `El campo ${campo} es requerido` });
      }
    }

    const nuevoUsuario = new User(datosUsuario);
    const resp = await nuevoUsuario.save();
    res.status(201).json(resp);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

route.patch('/editar-usuario/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const userData = req.body;

    const resp = await User.findByIdAndUpdate(id, userData, { new:'true'});
    res.status(200).json(resp);
  } catch (error) {
    console.log(error.message);
  }
});

route.delete('/eliminar-usuario/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const resp = await User.findByIdAndDelete(id);
    res.status(200).json('Usuario eliminado con éxito');
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, ()=> {
  console.log(`Estamos conectados al puerto ${port}`);
});
