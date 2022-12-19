module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define('Producto', {
      id_producto:{
        type: DataTypes.INTEGER,
        primaryKey: true
      },  
      nombre: DataTypes.STRING,
      precio: DataTypes.FLOAT,
      descripcion: DataTypes.STRING,
      id_color: DataTypes.INTEGER,
      id_categoria: DataTypes.INTEGER,
      medidas: DataTypes.STRING,
      
    }, { tableName: 'productos', timestamps: false});
    
    return Producto;
  };