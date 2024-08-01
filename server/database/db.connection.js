const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017');
    console.log('Estamos conectados a la base de datos');
  } catch (error) {
    console.log(error.message);
  }
};

dbConnection();