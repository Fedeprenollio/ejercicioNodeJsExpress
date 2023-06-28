const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db-config')
// const Ticket = require("./ticket")

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true

  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      noSpaces (value) {
        if (/\s/.test(value)) {
          throw new Error('Username cannot contain spaces')
        }
      }
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'The field must be a email valid'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'User',
    validate: {
      isIn: {
        args: [['User', 'Admin']],
        msg: 'Invalid role. Only "User" or "Admin" are allowed.'
      }
    }

  }
},

{
  paranoid: true // Habilita el borrado lógico
}
)

module.exports = User
