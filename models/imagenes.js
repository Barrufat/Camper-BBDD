
module.exports = (sequelize, DataTypes) => {
    const Imagen = sequelize.define('Imagen', {
        id_imagen: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_producto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_color: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        img3d: DataTypes.INTEGER,
        archivo: DataTypes.STRING,


    }, { tableName: 'imagenes', timestamps: false });

    return Imagen;
};
