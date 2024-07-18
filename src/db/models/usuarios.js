module.exports = (sequelize, DataTypes)=>{

    let alias = "usuarios";
    let cols = {

      sku: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
      },
      contraseña: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      categoria_sku: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        },
    };
    
    let config = {
      tableName: "usuarios",
      timestamps: false
    };

   let  usuarios = sequelize.define(alias, cols, config);
  
    usuarios.associate = function (models) {
      usuarios.belongsTo(models.Product, {
        as:"product",
        foreignKey: "name_teacher"});
    }
  
    return usuarios;

  }

