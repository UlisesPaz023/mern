const {Schema, model} = require('mongoose');

const usuarioEsquema = new Schema(
  {
    nombre: { type: String, required: true },
    empresa: { type: String, required: true },
    domicilio: { type: String, required: true },
    telefono: { type: Number, required: true },
    email: { type: String, required: true },
    propietario: { type: String, required: true },
    esPublico: { type: Boolean, default: true },
    esVisible: { type: Boolean, default: true },
    contrasena: { type: String, required: true }
  }
);

module.exports = model('usuario', usuarioEsquema);