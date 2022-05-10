const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

//   ID: *
// Nombre *
// Resumen del plato *
// Puntuación
// Nivel de "comida saludable"
// Paso a paso
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true, 
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    spoonacularScore: {
      type: DataTypes.INTEGER,
    },
    healthyLevel: {
      type: DataTypes.INTEGER,
    },
    steps: {
      type: DataTypes.STRING,
    },
    image:{
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: false
  });
};
