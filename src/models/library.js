const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db-config')
const Book = require('./book')
// const Ticket = require("./ticket")

// id Int El identificador de la librería
// name String Nombre de la librería. Eg: El Librote
// location String Dirección física de la librería. Eg: Av. Libertador 1460
// telefono String Número de teléfono. Eg: 3514563344

const Library = sequelize.define('Libraries', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true

  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  }
})

Library.hasMany(Book) // Una librería puede tener muchos libros
Book.belongsTo(Library) // Un libro pertenece a una librería

module.exports = Library
