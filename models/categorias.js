
module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
      id_categoria:{
        type: DataTypes.INTEGER,
        primaryKey: true
      },  
      nombre: DataTypes.STRING,
      
    }, { tableName: 'categorias', timestamps: false});
    
    return Categoria;
  };
  