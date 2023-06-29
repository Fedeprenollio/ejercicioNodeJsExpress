const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db-config')
// const Ticket = require("./ticket")

// id Int El identificador de este libro en particular
// isbn Int Este identificador es único en todo el mundo y representa el

// libro, la versión del autor y el año de edición

// titulo String Título del libro
// autor String Autor del libro
// year String Año de edición del libro
// library Int El identificador de la librería en donde este libro se encuentra

const Book = sequelize.define(
  'Books',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    isbn: {
      type: DataTypes.INTEGER
      // unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // deleted: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // }
  },
  {
    paranoid: true // Habilita el borrado lógico
  }
)

module.exports = Book
