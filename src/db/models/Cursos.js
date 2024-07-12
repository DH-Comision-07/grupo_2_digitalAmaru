  module.exports = (sequelize, DataTypes)=>{

     let alias = "Cursos";
     let cols = {

      sku: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      categoria_sku: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'sku',
        },
      },
     };
    
    let config = {
      tableName: "cursos",
      timestamps: false
    };
    
    let Cursos = sequelize.define(alias, cols, config);
  
    return Cursos;
  }